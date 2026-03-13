// ===================================
// Navigation Menu Toggle
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Sticky Header
// ===================================
const header = document.querySelector('.header');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ===================================
// Gallery Modal
// ===================================
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');

let currentImageIndex = 0;
const galleryImages = [];

// Collect all gallery images
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    galleryImages.push(img.src);
    
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openModal();
    });
});

function openModal() {
    modal.style.display = 'flex';
    modalImg.src = galleryImages[currentImageIndex];
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImg.src = galleryImages[currentImageIndex];
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    modalImg.src = galleryImages[currentImageIndex];
}

// Modal close events
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Modal navigation
modalPrev.addEventListener('click', showPrevImage);
modalNext.addEventListener('click', showNextImage);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showNextImage();
        if (e.key === 'ArrowRight') showPrevImage();
    }
});

// ===================================
// FAQ Accordion
// ===================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===================================
// WhatsApp integration
// ===================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 1. Validate form data first
    if (!validateForm()) return;

    // 2. Get values from fields
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // 3. Prepare WhatsApp link
    const whatsappNumber = "201202771983";
    const text = `*New Contact Request from the website*%0A%0A` +
                 `*Name:* ${encodeURIComponent(name)}%0A` +
                 `*Phone:* ${encodeURIComponent(phone)}%0A` +
                 `*Subject:* ${encodeURIComponent(subject)}%0A` +
                 `*Message:* ${encodeURIComponent(message)}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

    // 4. Show message to the user and clear the form
    formMessage.style.display = 'block';
    formMessage.className = 'form-message success';
    formMessage.textContent = 'Redirecting to WhatsApp to send your message...';
    
    // 5. Open WhatsApp in a new window after one second
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        contactForm.reset();
        formMessage.style.display = 'none';
    }, 1000);
});

// Form validation
const validateForm = () => {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    
    if (!name || !phone || !subject || !message) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please fill in all required fields.';
        return false;
    }
    
    return true;
};

// ===================================
// Back to Top Button
// ===================================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Smooth Scroll for All Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('.service-card, .step-item, .gallery-item, .faq-item, .feature-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Prevent Right Click on Images (Optional)
// ===================================
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        // e.preventDefault(); // Uncomment to disable right-click
    });
});

// ===================================
// Phone Number Click Handler
// ===================================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('Phone number clicked');
    });
});

// ===================================
// WhatsApp Click Handler
// ===================================
const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
whatsappLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('WhatsApp link clicked');
    });
});

// ===================================
// Console Welcome Message
// ===================================
console.log('%c🕌 أحمد الماجيكو - معالج بالقرآن الكريم والرقية الشرعية', 'color: #1e5631; font-size: 20px; font-weight: bold;');
console.log('%cللاستفسار والحجز، يرجى التواصل معنا عبر نموذج الاتصال', 'color: #8b7355; font-size: 14px;');