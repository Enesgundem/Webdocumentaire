document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Animation de défilement (Scroll Reveal) ---
    const scrollElems = document.querySelectorAll('.scroll-reveal');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    scrollElems.forEach(elem => {
        observer.observe(elem);
    });

    // --- 2. Gestion des boutons d'articles sur la page histoire ---
    const articleButtons = document.querySelectorAll('.article-btn');
    const articleContentWrapper = document.getElementById('article-content');
    
    if (articleButtons.length > 0 && articleContentWrapper) {
        articleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const articleId = this.getAttribute('data-article');
                const articleTemplate = document.querySelector(`.article-template[data-article="${articleId}"]`);
                
                if (articleTemplate) {
                    // Retirer la classe active de tous les boutons
                    articleButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Ajouter la classe active au bouton cliqué
                    this.classList.add('active');
                    
                    // Copier le contenu du template vers la zone d'affichage
                    articleContentWrapper.innerHTML = articleTemplate.innerHTML;
                    
                    // Afficher la zone de contenu
                    articleContentWrapper.style.display = 'block';
                    
                    // Faire défiler jusqu'à la zone d'affichage avec un léger délai pour l'animation
                    setTimeout(() => {
                        articleContentWrapper.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                        });
                    }, 100);
                }
            });
        });
    }

    // --- 3. Transitions de page animées ---
    const internalLinks = document.querySelectorAll('a:not([href^="#"]):not([href^="http"])');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const destination = link.getAttribute('href');
            // Si le lien mène à la page actuelle, ne rien faire
            if (window.location.pathname.endsWith(destination.split('/').pop())) {
                return;
            }
            e.preventDefault();
            document.body.classList.add('page-fade-out');
            setTimeout(() => {
                window.location.href = destination;
            }, 500); // Durée de l'animation de sortie
        });
    });

    // --- 4. Carrousel de galerie ---
    const carousel = document.querySelector('.gallery-carousel');
    if (carousel) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const prevButton = document.querySelector('.carousel-arrow-left');
        const nextButton = document.querySelector('.carousel-arrow-right');
        let currentIndex = 0;

        const showSlide = (index) => {
            galleryItems.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
            currentIndex = index;
        };

        const nextSlide = () => {
            const nextIndex = (currentIndex + 1) % galleryItems.length;
            showSlide(nextIndex);
        };

        const prevSlide = () => {
            const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            showSlide(prevIndex);
        };

        // Afficher la première image au chargement
        if (galleryItems.length > 0) {
            showSlide(0);
        }

        // Navigation avec les flèches
        if (nextButton) {
            nextButton.addEventListener('click', nextSlide);
        }
        if (prevButton) {
            prevButton.addEventListener('click', prevSlide);
        }

        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (carousel && carousel.offsetParent !== null) {
                if (e.key === 'ArrowLeft') {
                    prevSlide();
                } else if (e.key === 'ArrowRight') {
                    nextSlide();
                }
            }
        });
    }

    // --- 5. Galerie Photo Interactive (Lightbox) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Ne pas ouvrir le lightbox si on clique sur les flèches
                if (e.target.closest('.carousel-arrow')) {
                    return;
                }
                const imgSrc = item.querySelector('img')?.getAttribute('src');
                const caption = item.querySelector('.gallery-caption')?.textContent || '';
                if (imgSrc) {
                    lightboxImg.setAttribute('src', imgSrc);
                    if (lightboxCaption) {
                        lightboxCaption.textContent = caption;
                    }
                    lightbox.classList.add('show');
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        // Fermer aussi en cliquant sur le fond
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});
