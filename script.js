
// Variables globales
let currentSection = 'accueil';
const typingTexts = [
    "Étudiant en Cybersécurité 🔒",
    "Passionné par la Sécurité Informatique 🛡️",
    "Futur Protecteur du Web Malagasy 🇲🇬",
    "Développeur Full-Stack en Formation 💻"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Animation Matrix
function createMatrixEffect() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()";
    const matrixArray = matrix.split("");
    
    const font_size = 10;
    const columns = canvas.width / font_size;
    
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = font_size + 'px courier';
        
        for(let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * font_size, drops[i] * font_size);
            
            if(drops[i] * font_size > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

// Animation de frappe
function typeWriter() {
    const current = typingTexts[textIndex];
    const typingElement = document.getElementById('typingText');
    
    if (isDeleting) {
        typingElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = 100;
    
    if (isDeleting) {
        typeSpeed /= 2;
    }
    
    if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Éléments flottants
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    
    for(let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(element);
    }
}

// Navigation entre sections
function showSection(sectionName) {
    // Cacher toutes les sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Afficher la section demandée
    document.getElementById(sectionName).classList.remove('hidden');
    currentSection = sectionName;
    
    // Animation d'apparition des cartes de compétences
    if (sectionName === 'apropos') {
        setTimeout(() => {
            document.querySelectorAll('.skill-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200);
            });
        }, 300);
    }
}

// Animation des lignes de code dans le terminal
function animateTerminalLines() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.animationDelay = (index * 0.3) + 's';
    });
}

// Gestion du formulaire de contact
function handleContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Animation de soumission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
        
        // Simulation d'envoi
        setTimeout(() => {
            submitBtn.textContent = 'Message envoyé! ✓';
            submitBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Effets de particules interactives
function createInteractiveParticles() {
    const particles = [];
    const maxParticles = 100;
    
    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.life = Math.random() * 100 + 50;
        this.maxLife = this.life;
    }
    
    function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            
            if (p.life <= 0) {
                particles.splice(i, 1);
            }
        }
    }
    
    document.addEventListener('mousemove', (e) => {
        if (particles.length < maxParticles) {
            particles.push(new Particle(e.clientX, e.clientY));
        }
    });
    
    setInterval(updateParticles, 16);
}

// Gestion du téléchargement CV
function setupCVDownload() {
    const downloadBtn = document.getElementById('downloadCV');
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Animation de téléchargement
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '⬇️ Téléchargement...';
        downloadBtn.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            downloadBtn.innerHTML = '✅ CV Téléchargé!';
            downloadBtn.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
            
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.style.background = '';
                downloadBtn.style.transform = '';
            }, 2000);
        }, 1000);
        
        // Ici vous pouvez ajouter le lien réel vers votre CV
        // window.open('chemin-vers-votre-cv.pdf', '_blank');
    });
}

// Gestion de l'upload de photo de profil
function setupProfileImageUpload() {
    const imageUpload = document.getElementById('imageUpload');
    const profileImage = document.getElementById('profileImage');
    
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                
                // Animation de changement de photo
                profileImage.style.transform = 'scale(0)';
                setTimeout(() => {
                    profileImage.style.transform = 'scale(1)';
                }, 200);
                
                // Notification
                showNotification('📸 Photo de profil mise à jour!', 'success');
            };
            reader.readAsDataURL(file);
        }
    });
}

// Animation des liens sociaux améliorée
function animateSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        // Animation d'apparition décalée
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.5s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, index * 100);
        
        // Effet de clic
        link.addEventListener('click', function(e) {
            if (this.href === '#' || this.href.includes('votre-profil') || this.href.includes('XXXXXXXXX')) {
                e.preventDefault();
                showNotification('⚠️ Veuillez configurer vos liens dans le code!', 'warning');
                return;
            }
            
            // Animation de clic
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Effet de survol amélioré
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Système de notifications amélioré
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    
    let bgColor, textColor;
    switch(type) {
        case 'success':
            bgColor = 'linear-gradient(45deg, #4CAF50, #45a049)';
            textColor = '#fff';
            break;
        case 'warning':
            bgColor = 'linear-gradient(45deg, #ff9800, #f57c00)';
            textColor = '#fff';
            break;
        case 'error':
            bgColor = 'linear-gradient(45deg, #f44336, #d32f2f)';
            textColor = '#fff';
            break;
        default:
            bgColor = 'rgba(0, 255, 65, 0.9)';
            textColor = '#000';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: ${textColor};
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Effet de hack/glitch sur le logo
function createGlitchEffect() {
    const logo = document.querySelector('.logo');
    const originalText = logo.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% de chance
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.1) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            logo.textContent = glitchedText;
            
            setTimeout(() => {
                logo.textContent = originalText;
            }, 100);
        }
    }, 2000);
}

// Scroll parallax effect
function createParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.cyber-grid, .floating-elements');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Détection de la visibilité des éléments
function createScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.project-card, .skill-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Système de notifications
function createNotificationSystem() {
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 255, 65, 0.9);
            color: #000;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-weight: bold;
            box-shadow: 0 5px 15px rgba(0, 255, 65, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Notifications contextuelles
    setTimeout(() => {
        showNotification('🔒 Bienvenue dans mon univers cybersécurité!');
    }, 2000);
}

// Raccourcis clavier
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    showSection('accueil');
                    break;
                case '2':
                    e.preventDefault();
                    showSection('apropos');
                    break;
                case '3':
                    e.preventDefault();
                    showSection('projets');
                    break;
                case '4':
                    e.preventDefault();
                    showSection('contact');
                    break;
            }
        }
    });
}

// Horloge binaire dans le terminal
function createBinaryClock() {
    const terminals = document.querySelectorAll('.terminal-content');
    if (terminals.length > 0) {
        const terminal = terminals[0];
        
        function updateBinaryClock() {
            const now = new Date();
            const hours = now.getHours().toString(2).padStart(8, '0');
            const minutes = now.getMinutes().toString(2).padStart(8, '0');
            const seconds = now.getSeconds().toString(2).padStart(8, '0');
            
            const clockLine = document.createElement('div');
            clockLine.className = 'code-line';
            clockLine.textContent = `$ date --binary ${hours}:${minutes}:${seconds}`;
            
            // Remplacer l'ancienne ligne d'horloge s'il y en a une
            const oldClock = terminal.querySelector('.binary-clock');
            if (oldClock) {
                terminal.removeChild(oldClock);
            }
            
            clockLine.classList.add('binary-clock');
            terminal.appendChild(clockLine);
        }
        
        setInterval(updateBinaryClock, 1000);
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser tous les effets
    createMatrixEffect();
    typeWriter();
    createFloatingElements();
    animateTerminalLines();
    handleContactForm();
    createInteractiveParticles();
    setupCVDownload();
    setupProfileImageUpload(); // Nouvelle fonction
    animateSocialLinks();
    createGlitchEffect();
    createParallaxEffect();
    createScrollAnimations();
    createNotificationSystem();
    setupKeyboardShortcuts();
    createBinaryClock();
    
    // Ajuster les dimensions sur redimensionnement
    window.addEventListener('resize', function() {
        const canvas = document.getElementById('matrixCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Démarrer avec la section accueil
    showSection('accueil');
});

// Ajout des styles d'animation pour les notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);