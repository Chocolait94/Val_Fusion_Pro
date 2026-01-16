// Cookie Notice Management
document.addEventListener('DOMContentLoaded', function() {
    const cookieNotice = document.getElementById('cookieNotice');
    
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            if (cookieNotice) {
                cookieNotice.classList.add('show');
            }
        }, 1000);
    }
});

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    hideCookieNotice();
}

function refuseCookies() {
    localStorage.setItem('cookieConsent', 'refused');
    hideCookieNotice();
}

function hideCookieNotice() {
    const cookieNotice = document.getElementById('cookieNotice');
    if (cookieNotice) {
        cookieNotice.classList.remove('show');
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.entity-card, .about-content, .contact-wrapper').forEach(el => {
    observer.observe(el);
});

// Form validation enhancement
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
});

// ===== ANIMATIONS POUR VAL BTP =====

// Intersection Observer pour les animations au scroll
const btpScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('btp-visible');
            console.log('Animation déclenchée pour:', entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observer tous les éléments avec animation au scroll
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== INITIALISATION DES ANIMATIONS VAL BTP ===');
    
    // Éléments à animer au scroll
    const scrollElements = document.querySelectorAll('.btp-scroll-reveal, .btp-gallery-item');
    console.log('Nombre d\'éléments à animer:', scrollElements.length);
    
    scrollElements.forEach(el => {
        btpScrollObserver.observe(el);
        console.log('Observer ajouté pour:', el);
    });
    
    // Animation séquentielle pour les éléments de la galerie
    const galleryItems = document.querySelectorAll('.btp-gallery-item');
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('btp-visible');
                }, index * 100); // Délai progressif
            }
        });
    }, {
        threshold: 0.1
    });
    
    galleryItems.forEach(item => galleryObserver.observe(item));
    
    // Effet parallaxe simple pour le hero
    const heroSection = document.querySelector('.relative.bg-gradient-to-br');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            if (scrolled <= heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Animation des compteurs (si vous avez des chiffres à animer)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(start);
            }
        }, 16);
    }
    
    // Effet de typing pour les titres (optionnel)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Smooth reveal au chargement de la page
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
