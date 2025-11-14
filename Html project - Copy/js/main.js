// Main JavaScript for FreshBite Food Chain Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuIcon) {
        mobileMenuIcon.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
        }
    });
    
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            }
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your server
                // For now, we'll just show a success message
                
                // Clear the input
                emailInput.value = '';
                
                // Show success message
                const formParent = newsletterForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                successMessage.style.color = '#fff';
                successMessage.style.marginTop = '15px';
                successMessage.style.padding = '10px';
                successMessage.style.backgroundColor = 'rgba(46, 196, 182, 0.7)';
                successMessage.style.borderRadius = '5px';
                
                formParent.appendChild(successMessage);
                
                // Remove the message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }
    
    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-header, .hero-content, .hero-image, .category-card, .dish-card, .about-content, .about-image, .testimonial-card, .app-content, .app-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Video Modal
    const videoButton = document.querySelector('.btn-video');
    
    if (videoButton) {
        videoButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create modal overlay
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';
            modalOverlay.style.position = 'fixed';
            modalOverlay.style.top = '0';
            modalOverlay.style.left = '0';
            modalOverlay.style.width = '100%';
            modalOverlay.style.height = '100%';
            modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            modalOverlay.style.display = 'flex';
            modalOverlay.style.alignItems = 'center';
            modalOverlay.style.justifyContent = 'center';
            modalOverlay.style.zIndex = '9999';
            
            // Create video container
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';
            videoContainer.style.position = 'relative';
            videoContainer.style.width = '80%';
            videoContainer.style.maxWidth = '800px';
            
            // Create close button
            const closeButton = document.createElement('button');
            closeButton.className = 'close-button';
            closeButton.innerHTML = '&times;';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '-40px';
            closeButton.style.right = '0';
            closeButton.style.backgroundColor = 'transparent';
            closeButton.style.border = 'none';
            closeButton.style.color = '#fff';
            closeButton.style.fontSize = '30px';
            closeButton.style.cursor = 'pointer';
            
            // Create video iframe (replace with your actual video URL)
            const videoIframe = document.createElement('iframe');
            videoIframe.width = '100%';
            videoIframe.height = '450';
            videoIframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Replace with your video URL
            videoIframe.frameBorder = '0';
            videoIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            videoIframe.allowFullscreen = true;
            
            // Append elements
            videoContainer.appendChild(closeButton);
            videoContainer.appendChild(videoIframe);
            modalOverlay.appendChild(videoContainer);
            document.body.appendChild(modalOverlay);
            
            // Close modal when clicking close button or outside the video
            closeButton.addEventListener('click', function() {
                modalOverlay.remove();
            });
            
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    modalOverlay.remove();
                }
            });
        });
    }
});

// Add CSS animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        /* Animation styles */
        .section-header, .hero-content, .hero-image, .category-card, .dish-card, .about-content, .about-image, .testimonial-card, .app-content, .app-image {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-content {
            transition-delay: 0.2s;
        }
        
        .hero-image {
            transition-delay: 0.4s;
        }
        
        .category-card:nth-child(1) { transition-delay: 0.1s; }
        .category-card:nth-child(2) { transition-delay: 0.2s; }
        .category-card:nth-child(3) { transition-delay: 0.3s; }
        .category-card:nth-child(4) { transition-delay: 0.4s; }
        .category-card:nth-child(5) { transition-delay: 0.5s; }
        
        .dish-card:nth-child(1) { transition-delay: 0.1s; }
        .dish-card:nth-child(2) { transition-delay: 0.2s; }
        .dish-card:nth-child(3) { transition-delay: 0.3s; }
        
        .testimonial-card:nth-child(1) { transition-delay: 0.1s; }
        .testimonial-card:nth-child(2) { transition-delay: 0.2s; }
        .testimonial-card:nth-child(3) { transition-delay: 0.3s; }
    </style>
`);