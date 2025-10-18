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

    // --- 2. Transitions de page animées ---
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

    // --- 3. Galerie Photo Interactive (Lightbox) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').getAttribute('src');
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('show');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('show');
        }

        lightboxClose.addEventListener('click', closeLightbox);
        // Fermer aussi en cliquant sur le fond
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});