// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Animated Counter for Hero Statistics
async function animateCounters() {
    // Fetch real statistics from the API
    let stats = { students: 10000, courses: 500, instructors: 50 };
    
    try {
        const response = await fetch('/api/stats');
        if (response.ok) {
            const data = await response.json();
            stats = {
                students: data.students || 10000,
                courses: data.courses || 500,
                instructors: data.instructors || 50
            };
        }
    } catch (error) {
        console.log('Using default stats due to API error:', error);
    }
    
    const studentsTarget = stats.students;
    const coursesTarget = stats.courses;
    const instructorsTarget = stats.instructors;
    
    const studentsElement = document.getElementById('students-count');
    const coursesElement = document.getElementById('courses-count');
    const instructorsElement = document.getElementById('instructors-count');
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        // Easing function for smooth animation
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const studentsValue = Math.floor(studentsTarget * easeProgress);
        const coursesValue = Math.floor(coursesTarget * easeProgress);
        const instructorsValue = Math.floor(instructorsTarget * easeProgress);
        
        studentsElement.textContent = studentsValue.toLocaleString() + '+';
        coursesElement.textContent = coursesValue + '+';
        instructorsElement.textContent = instructorsValue + '+';
        
        if (currentStep >= steps) {
            studentsElement.textContent = studentsTarget.toLocaleString() + '+';
            coursesElement.textContent = coursesTarget + '+';
            instructorsElement.textContent = instructorsTarget + '+';
            clearInterval(timer);
        }
    }, stepDuration);
}

// Intersection Observer for Hero Statistics Animation
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'home') {
            animateCounters();
            heroObserver.unobserve(entry.target); // Only animate once
        }
    });
}, {
    threshold: 0.5
});

// Start observing the hero section
const heroSection = document.getElementById('home');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Load dynamic content when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
});

// Course Enrollment Function
async function enrollCourse(courseTitle, courseId) {
    const userConfirmed = confirm(`Are you ready to enroll in "${courseTitle}"?\n\nThis would create an enrollment record in the database.`);
    
    if (userConfirmed) {
        try {
            // For demo purposes, we'll use a dummy user ID (1)
            const response = await fetch('/api/enrollments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    userId: 1, 
                    courseId: courseId 
                }),
            });
            
            if (response.ok) {
                alert(`Great! You've successfully enrolled in "${courseTitle}".`);
                console.log(`User enrolled in course: ${courseTitle} (ID: ${courseId})`);
            } else {
                const error = await response.json();
                alert(`Enrollment failed: ${error.error || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Enrollment error:', error);
            alert('Failed to enroll. Please check your connection and try again.');
        }
    }
}

// Load courses dynamically from database
async function loadCourses() {
    try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        
        const courses = await response.json();
        const coursesContainer = document.querySelector('.courses-grid');
        
        if (coursesContainer && courses.length > 0) {
            coursesContainer.innerHTML = courses.map(course => `
                <div class="course-card">
                    <img src="${course.imageUrl || 'https://via.placeholder.com/800x400'}" 
                         alt="Course image for ${course.title}">
                    <div class="course-content">
                        <div class="course-header">
                            <span class="course-category ${getCategoryClass(course.category)}">${course.category}</span>
                            <div class="course-rating">
                                <i class="fas fa-star"></i>
                                <span>${course.rating}</span>
                            </div>
                        </div>
                        <h3>${course.title}</h3>
                        <p>${course.description}</p>
                        <div class="course-footer">
                            <span class="course-price">$${course.price}</span>
                            <button class="btn-enroll" onclick="enrollCourse('${course.title}', ${course.id})">Enroll Now</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading courses:', error);
        // Keep the existing static courses if API fails
    }
}

function getCategoryClass(category) {
    const categoryMap = {
        'Programming': 'brown',
        'Data Science': 'gold', 
        'Marketing': 'forest',
        'Design': 'brown'
    };
    return categoryMap[category] || 'brown';
}

// Newsletter Subscription
document.getElementById('newsletter-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email-input');
    const submitBtn = document.getElementById('subscribe-btn');
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email format.');
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    emailInput.disabled = true;
    
    try {
        const response = await fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(`Thank you for subscribing with ${email}! You'll receive our latest updates and course announcements.`);
            emailInput.value = '';
        } else if (response.status === 409) {
            alert('This email is already subscribed to our newsletter.');
        } else {
            alert('Failed to subscribe. Please try again.');
        }
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        alert('Failed to subscribe. Please check your connection and try again.');
    } finally {
        // Reset form state
        submitBtn.textContent = 'Subscribe';
        submitBtn.disabled = false;
        emailInput.disabled = false;
    }
});

// Scroll-triggered animations for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const elementsToAnimate = document.querySelectorAll('.feature-card, .course-card, .testimonial-card, .about-stat');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

elementsToAnimate.forEach(element => {
    scrollObserver.observe(element);
});

// Parallax effect for hero background circles
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.hero-circle');
    
    circles.forEach((circle, index) => {
        const speed = 0.5 + (index * 0.2);
        const yPos = -(scrolled * speed);
        circle.style.transform = `translateY(${yPos}px)`;
    });
});

// Dynamic text typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Add hover effects for interactive elements
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02) translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Add click effects for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Lazy loading for images (performance optimization)
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Add loading states and error handling for images
images.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.addEventListener('error', function() {
        this.alt = 'Image could not be loaded';
        this.style.backgroundColor = '#f0f0f0';
        this.style.border = '1px solid #ddd';
    });
});

// Console welcome message
console.log(`
🦉 Welcome to Old Owl Learning Platform!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is a demo website showcasing:
✓ Responsive design
✓ Smooth animations
✓ Interactive elements
✓ Modern web development practices

Built with HTML, CSS, and JavaScript
`);

// Performance monitoring (basic)
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

// Error handling for the entire application
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here in a production app
        console.log('Service Worker support detected');
    });
}