// ========================================
// COOKIE CONSENT MANAGEMENT - RGPD Compliant
// ========================================

// Cookie settings structure
const defaultCookieSettings = {
    essential: true,      // Toujours actifs
    analytics: true,      // Google Analytics, etc.
    marketing: false,     // Publicités personnalisées
    preferences: true     // Préférences utilisateur
};

// Fonction de nettoyage et validation des donnees localStorage
function cleanupCorruptedData() {
    const consentData = localStorage.getItem("cookieConsent");
    if (consentData) {
        try {
            // Tentative de parsing pour valider
            const data = JSON.parse(consentData);
            // Verifier la structure des donnees
            if (!data.consent || !data.settings || !data.timestamp) {
                throw new Error("Structure invalide");
            }
        } catch (e) {
            console.warn("Nettoyage des donnees cookies corrompues au demarrage...");
            localStorage.removeItem("cookieConsent");
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Nettoyer les donnees corrompues au demarrage
    cleanupCorruptedData();
    
    const cookieNotice = document.getElementById("cookieNotice");
    
    // Charger les preferences existantes
    loadCookiePreferences();
    
    // Verifier si l'utilisateur a deja fait un choix (verifier uniquement localStorage pour persistance)
    const hasConsent = localStorage.getItem("cookieConsent");
    
    if (!hasConsent && cookieNotice) {
        // L'utilisateur n'a jamais fait de choix, afficher le popup apres 0.8 seconde
        setTimeout(() => {
            cookieNotice.classList.add("show");
            document.body.style.overflow = "hidden"; // Bloquer le scroll tant que le popup est visible
        }, 800);
    } else {
        // L'utilisateur a deja fait un choix, ne rien afficher
        if (cookieNotice) {
            cookieNotice.style.display = "none";
        }
    }
    
    // Charger les preferences dans le modal
    loadModalSettings();
});

// Accepter tous les cookies
function acceptCookies() {
    const consentData = {
        consent: "accepted",
        settings: {
            essential: true,
            analytics: true,
            marketing: true,
            preferences: true
        },
        timestamp: new Date().toISOString()
    };
    
    // Sauvegarder uniquement dans local storage pour la persistance
    localStorage.setItem("cookieConsent", JSON.stringify(consentData));
    
    // Activer tous les cookies
    enableAllCookies();
    
    // Cacher la banniere immediatement
    hideCookieNotice();
    console.log("Tous les cookies acceptes");
}

// Refuser les cookies non essentiels
function refuseCookies() {
    const consentData = {
        consent: "refused",
        settings: {
            essential: true,
            analytics: false,
            marketing: false,
            preferences: false
        },
        timestamp: new Date().toISOString()
    };
    
    // Sauvegarder uniquement dans local storage pour la persistance
    localStorage.setItem("cookieConsent", JSON.stringify(consentData));
    
    // Desactiver les cookies non essentiels
    disableNonEssentialCookies();
    
    // Cacher la banniere immediatement
    hideCookieNotice();
    console.log("Cookies non essentiels refuses");
}

// Cacher la banniere de cookies
function hideCookieNotice() {
    const cookieNotice = document.getElementById("cookieNotice");
    if (cookieNotice) {
        // Animation de sortie (fondu)
        cookieNotice.style.transition = "opacity 0.3s ease";
        cookieNotice.style.opacity = "0";
        
        // Cacher completement apres l'animation
        setTimeout(() => {
            cookieNotice.classList.remove("show");
            cookieNotice.style.opacity = "";
            cookieNotice.style.transition = "";
            document.body.style.overflow = "";
        }, 300);
    }
}

// Ouvrir le modal de parametres
function openCookieSettings() {
    const modal = document.getElementById("cookieSettingsModal");
    if (modal) {
        modal.classList.add("show");
        document.body.style.overflow = "hidden"; // Empecher le scroll
        loadModalSettings(); // Charger les parametres actuels
    }
}

// Fermer le modal de parametres
function closeCookieSettings() {
    const modal = document.getElementById("cookieSettingsModal");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = ""; // Reactiver le scroll
    }
}

// Charger les parametres dans le modal
function loadModalSettings() {
    const consentData = localStorage.getItem("cookieConsent");
    if (consentData) {
        try {
            const data = JSON.parse(consentData);
            const settings = data.settings || defaultCookieSettings;
            
            // Mettre a jour les checkboxes
            const analyticsCheckbox = document.getElementById("analyticsCookies");
            const marketingCheckbox = document.getElementById("marketingCookies");
            const preferencesCheckbox = document.getElementById("preferencesCookies");
            
            if (analyticsCheckbox) analyticsCheckbox.checked = settings.analytics;
            if (marketingCheckbox) marketingCheckbox.checked = settings.marketing;
            if (preferencesCheckbox) preferencesCheckbox.checked = settings.preferences;
        } catch (e) {
            console.warn("Donnees cookies corrompues detectees dans modal. Nettoyage automatique...");
            // Nettoyer les donnees corrompues
            localStorage.removeItem("cookieConsent");
            // Reinitialiser les checkboxes avec les valeurs par defaut
            const analyticsCheckbox = document.getElementById("analyticsCookies");
            const marketingCheckbox = document.getElementById("marketingCookies");
            const preferencesCheckbox = document.getElementById("preferencesCookies");
            
            if (analyticsCheckbox) analyticsCheckbox.checked = defaultCookieSettings.analytics;
            if (marketingCheckbox) marketingCheckbox.checked = defaultCookieSettings.marketing;
            if (preferencesCheckbox) preferencesCheckbox.checked = defaultCookieSettings.preferences;
        }
    }
}

// Sauvegarder les parametres personnalises
function saveCookieSettings() {
    const analyticsCheckbox = document.getElementById("analyticsCookies");
    const marketingCheckbox = document.getElementById("marketingCookies");
    const preferencesCheckbox = document.getElementById("preferencesCookies");
    
    const consentData = {
        consent: "custom",
        settings: {
            essential: true,
            analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
            marketing: marketingCheckbox ? marketingCheckbox.checked : false,
            preferences: preferencesCheckbox ? preferencesCheckbox.checked : false
        },
        timestamp: new Date().toISOString()
    };
    
    // Sauvegarder uniquement dans local storage pour la persistance
    localStorage.setItem("cookieConsent", JSON.stringify(consentData));
    
    // Appliquer les parametres
    applyCookieSettings(consentData.settings);
    
    // Fermer le modal et cacher la banniere
    closeCookieSettings();
    hideCookieNotice();
    
    // Afficher une confirmation
    showNotification("Vos preferences ont ete enregistrees", "success");
    console.log("Parametres de cookies sauvegardes:", consentData.settings);
}

// Accepter tous depuis le modal
function saveAllCookies() {
    // Cocher toutes les cases
    const analyticsCheckbox = document.getElementById("analyticsCookies");
    const marketingCheckbox = document.getElementById("marketingCookies");
    const preferencesCheckbox = document.getElementById("preferencesCookies");
    
    if (analyticsCheckbox) analyticsCheckbox.checked = true;
    if (marketingCheckbox) marketingCheckbox.checked = true;
    if (preferencesCheckbox) preferencesCheckbox.checked = true;
    
    // Sauvegarder
    saveCookieSettings();
}

// Refuser tous depuis le modal
function rejectAllCookies() {
    // Decocher toutes les cases optionnelles
    const analyticsCheckbox = document.getElementById("analyticsCookies");
    const marketingCheckbox = document.getElementById("marketingCookies");
    const preferencesCheckbox = document.getElementById("preferencesCookies");
    
    if (analyticsCheckbox) analyticsCheckbox.checked = false;
    if (marketingCheckbox) marketingCheckbox.checked = false;
    if (preferencesCheckbox) preferencesCheckbox.checked = false;
    
    // Sauvegarder
    saveCookieSettings();
}

// Charger les preferences de cookies
function loadCookiePreferences() {
    const consentData = localStorage.getItem("cookieConsent");
    if (consentData) {
        try {
            const data = JSON.parse(consentData);
            applyCookieSettings(data.settings || defaultCookieSettings);
        } catch (e) {
            console.warn("Donnees cookies corrompues detectees. Nettoyage automatique...");
            // Nettoyer les donnees corrompues
            localStorage.removeItem("cookieConsent");
            // Appliquer les parametres par defaut
            applyCookieSettings(defaultCookieSettings);
        }
    }
}

// Appliquer les parametres de cookies
function applyCookieSettings(settings) {
    console.log("Application des parametres de cookies:", settings);
    
    // Cookies analytiques (Google Analytics, etc.)
    if (settings.analytics) {
        enableAnalyticsCookies();
    } else {
        disableAnalyticsCookies();
    }
    
    // Cookies marketing
    if (settings.marketing) {
        enableMarketingCookies();
    } else {
        disableMarketingCookies();
    }
    
    // Cookies de preferences
    if (settings.preferences) {
        enablePreferencesCookies();
    } else {
        disablePreferencesCookies();
    }
}

// Activer tous les cookies
function enableAllCookies() {
    enableAnalyticsCookies();
    enableMarketingCookies();
    enablePreferencesCookies();
}

// Désactiver les cookies non essentiels
function disableNonEssentialCookies() {
    disableAnalyticsCookies();
    disableMarketingCookies();
    disablePreferencesCookies();
}

// Gestion des cookies analytiques
function enableAnalyticsCookies() {
    console.log("Cookies analytiques actives");
    // Ici, vous pouvez activer Google Analytics, Matomo, etc.
    // Exemple: window.dataLayer = window.dataLayer || [];
}

function disableAnalyticsCookies() {
    console.log("Cookies analytiques desactives");
    // Desactiver Google Analytics, etc.
    // Exemple: window['ga-disable-UA-XXXXX-Y'] = true;
}

// Gestion des cookies marketing
function enableMarketingCookies() {
    console.log("Cookies marketing actives");
    // Activer les pixels de tracking, Facebook Pixel, etc.
}

function disableMarketingCookies() {
    console.log("Cookies marketing desactives");
    // Desactiver les pixels de tracking
}

// Gestion des cookies de préférences
function enablePreferencesCookies() {
    console.log("Cookies de preferences actives");
    // Sauvegarder les preferences utilisateur (theme, langue, etc.)
}

function disablePreferencesCookies() {
    console.log("Cookies de preferences desactives");
}

// Afficher une notification
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `cookie-notification cookie-notification-${type}`;
    notification.innerHTML = `
        <div class="cookie-notification-content">
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#4caf50" : "#2196f3"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10001;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = "slideOutRight 0.3s ease-out";
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Fermer le modal en cliquant a l'exterieur
window.addEventListener("click", function(event) {
    const modal = document.getElementById("cookieSettingsModal");
    if (event.target === modal) {
        closeCookieSettings();
    }
});

// Ajouter les animations pour les notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for anchor links
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href !== "#" && href !== "") {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
        }
    });
}, observerOptions);

document.querySelectorAll(".entity-card, .about-content, .contact-wrapper").forEach(el => {
    observer.observe(el);
});

// Form validation enhancement
const forms = document.querySelectorAll("form");
forms.forEach(form => {
    form.addEventListener("submit", function(e) {
        const requiredFields = form.querySelectorAll("[required]");
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add("error");
            } else {
                field.classList.remove("error");
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
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Configuration adaptative des animations
const animationConfig = {
    mobile: {
        threshold: 0.2,
        rootMargin: "0px 0px -30px 0px",
        sequentialDelay: 400
    },
    tablet: {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px", 
        sequentialDelay: 300
    },
    desktop: {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
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

// ========================================
// Rendre les fonctions globales pour les onclick HTML
// ========================================
window.acceptCookies = acceptCookies;
window.refuseCookies = refuseCookies;
window.openCookieSettings = openCookieSettings;
window.closeCookieSettings = closeCookieSettings;
window.saveCookieSettings = saveCookieSettings;
window.saveAllCookies = saveAllCookies;
window.rejectAllCookies = rejectAllCookies;

// Fonction utilitaire pour nettoyer manuellement le localStorage (pour debug)
window.clearCookieData = function() {
    localStorage.removeItem("cookieConsent");
    console.log("Donnees cookies nettoyees. Rechargez la page.");
};
