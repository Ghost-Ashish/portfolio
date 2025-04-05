// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0
        });
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    }
});

// Hover effect for links
const links = document.querySelectorAll('a, button');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        if (cursor && cursorFollower) {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        }
    });
    
    link.addEventListener('mouseleave', () => {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        if (cursor && cursorFollower) {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        }
    });
});

// Netflix-style navbar effect on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Parallax Effect for Hero Image
document.addEventListener('mousemove', (e) => {
    const heroImage = document.querySelector('.hero-image-container');
    
    if (heroImage) {
        const mouseX = (window.innerWidth / 2 - e.clientX) / 25;
        const mouseY = (window.innerHeight / 2 - e.clientY) / 25;
        
        gsap.to(heroImage, {
            x: mouseX,
            y: mouseY,
            duration: 0.5
        });
    }
});

// Initialize About Tabs
function setupAboutTabs() {
    const aboutTabBtns = document.querySelectorAll('.about-tab-btn');
    const aboutTabPanes = document.querySelectorAll('.about-tab-pane');
    
    // Set initial state
    aboutTabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            aboutTabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get tab id from data attribute
            const tabId = btn.getAttribute('data-about-tab');
            
            // Hide all tab panes
            aboutTabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show selected tab pane
            document.getElementById(tabId).classList.add('active');
            
            // Animate timeline items if experience or education tab
            if (tabId === 'experience' || tabId === 'education') {
                animateTimelineItems(tabId);
            }
        });
    });
}

// Animate timeline items
function animateTimelineItems(tabId) {
    const timelineItems = document.querySelectorAll(`#${tabId} .timeline-item`);
    
    gsap.set(timelineItems, {
        opacity: 0,
        x: -30
    });
    
    gsap.to(timelineItems, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
    });
}

// Initialize Project Tabs
function setupProjectTabs() {
    const projectTabBtns = document.querySelectorAll('.project-tab-btn');
    const projectTabPanes = document.querySelectorAll('.project-tab-pane');
    
    projectTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            projectTabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get tab id from data attribute
            const tabId = btn.getAttribute('data-project-tab');
            
            // Hide all tab panes
            projectTabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show selected tab pane
            document.getElementById(tabId).classList.add('active');
            
            // Animate project items
            animateProjectItems(tabId);
        });
    });
}

// Animate project items
function animateProjectItems(tabId) {
    const projectItems = document.querySelectorAll(`#${tabId} .project-item`);
    
    gsap.set(projectItems, {
        opacity: 0,
        y: 30
    });
    
    gsap.to(projectItems, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "power2.out"
    });
}

// Animate Skill Bars
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        const width = level.style.width;
        const parent = level.parentElement;
        
        gsap.fromTo(level, 
            { width: '0%' },
            { 
                width: width,
                duration: 1.5,
                scrollTrigger: {
                    trigger: parent,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                ease: "power3.out"
            }
        );
    });
}

// Animate Skill Boxes
function animateSkillBoxes() {
    const skillBoxes = document.querySelectorAll('.skill-box');
    
    gsap.from(skillBoxes, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        ease: "power3.out"
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Update active navigation link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Update active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animate contact cards
function animateContactCards() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    gsap.from(contactCards, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        ease: "power3.out"
    });
}

// Form focus animation
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    if (input && label) {
        input.addEventListener('focus', () => {
            label.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                label.classList.remove('active');
            }
        });
    }
});

// Hero section animations
function animateHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-container');
    const heroTitle = document.querySelector('.glitch-text');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    const tl = gsap.timeline();
    
    tl.from(heroImage, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    })
    .from(heroTitle, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .from(heroSubtitle, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .from(ctaButtons, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5");
}

// Section title animations
function animateSectionTitles() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    sectionTitles.forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            ease: "power3.out"
        });
    });
}

// Initialize everything on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup tabs
    setupAboutTabs();
    setupProjectTabs();
    
    // Animate hero section elements
    animateHeroSection();
    
    // Animate first visible tabs
    const activeAboutTab = document.querySelector('.about-tab-pane.active');
    if (activeAboutTab && (activeAboutTab.id === 'experience' || activeAboutTab.id === 'education')) {
        animateTimelineItems(activeAboutTab.id);
    }
    
    const activeProjectTab = document.querySelector('.project-tab-pane.active');
    if (activeProjectTab) {
        animateProjectItems(activeProjectTab.id);
    }
    
    // Setup scroll-triggered animations
    animateSectionTitles();
    animateSkillBars();
    animateSkillBoxes();
    animateContactCards();
}); 