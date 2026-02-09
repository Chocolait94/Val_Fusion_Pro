// Cookie Notice Management
document.addEventListener('DOMContentLoaded', function() {
    const cookieNotice = document.getElementById('cookieNotice');
    
    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        setTimeout(() => {
            if (cookieNotice) {
                cookieNotice.classList.add('show');
            }
        }, 2000); // Augmenté à 2 secondes pour être moins intrusif
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

// Détection du type d'appareil pour optimiser les performances
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Configuration adaptative des animations
const animationConfig = {
    mobile: {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px',
        sequentialDelay: 400
    },
    tablet: {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px', 
        sequentialDelay: 300
    },
    desktop: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        sequentialDelay: 200
    }
};

// Choisir la configuration selon l'appareil
const config = isMobile ? animationConfig.mobile : 
               isTablet ? animationConfig.tablet : 
               animationConfig.desktop;

// Intersection Observer pour les animations au scroll - Optimisé
const btpScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !prefersReducedMotion) {
            entry.target.classList.add('btp-visible');
            console.log('Animation déclenchée pour:', entry.target);
        }
    });
}, {
    threshold: config.threshold,
    rootMargin: config.rootMargin
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
    
    // Animation séquentielle pour les éléments de la galerie - Adaptative
    const galleryItems = document.querySelectorAll('.btp-gallery-item');
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !prefersReducedMotion) {
                setTimeout(() => {
                    entry.target.classList.add('btp-visible');
                }, index * config.sequentialDelay); // Utilise la configuration adaptative
            }
        });
    }, {
        threshold: config.threshold
    });
    
    galleryItems.forEach(item => galleryObserver.observe(item));
    
    // Effet parallaxe simple pour le hero - Optimisé pour la performance
    const heroSection = document.querySelector('.relative.bg-gradient-to-br');
    if (heroSection) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3; // Réduit de 0.5 à 0.3 pour un effet plus doux
            
            if (scrolled <= heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
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
    
    // Smooth reveal au chargement de la page - Plus doux
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300); // Augmenté à 300ms pour éviter les saccades
    
    // ===== OPTIMISATIONS PERFORMANCE SUPPLÉMENTAIRES =====
    
    // Détection de performance faible et ajustements automatiques
    const performanceObserver = new PerformanceObserver((list) => {
        const longTasks = list.getEntries().filter(entry => entry.duration > 50);
        if (longTasks.length > 3) {
            // Performance faible détectée - Réduire les animations
            console.log('Performance faible détectée - Optimisation automatique');
            document.documentElement.style.setProperty('--animation-speed', '0.5x');
            
            // Désactiver les particules
            const particles = document.querySelectorAll('.particle, .particles-container');
            particles.forEach(particle => particle.style.display = 'none');
        }
    });
    
    // Observer les tâches longues si supporté
    if (window.PerformanceObserver && PerformanceObserver.supportedEntryTypes.includes('longtask')) {
        performanceObserver.observe({ entryTypes: ['longtask'] });
    }
    
    // Pause les animations quand l'onglet n'est pas visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.documentElement.style.animationPlayState = 'paused';
        } else {
            document.documentElement.style.animationPlayState = 'running';
        }
    });
    
    // Débouncer le scroll pour optimiser les performances
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Logique de scroll optimisée ici
        }, 16); // ~60fps
    }, { passive: true });
});
