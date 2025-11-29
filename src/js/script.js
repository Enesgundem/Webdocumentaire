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
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').getAttribute('src');
                const caption = item.querySelector('.gallery-caption')?.textContent || '';
                lightboxImg.setAttribute('src', imgSrc);
                if (lightboxCaption) {
                    lightboxCaption.textContent = caption;
                }
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

    // --- 4. Gestion des articles secondaires (boutons) ---
    const articleButtons = document.querySelectorAll('.article-btn');
    const articleTemplates = document.querySelectorAll('.article-template');
    const articleDisplayArea = document.getElementById('article-content');
    let currentOpenArticle = null;

    if (articleButtons.length > 0 && articleDisplayArea) {
        articleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const articleId = button.getAttribute('data-article');
                const articleTemplate = document.querySelector(`.article-template[data-article="${articleId}"]`);

                // Si on clique sur le même article, on le ferme
                if (currentOpenArticle === articleId) {
                    articleDisplayArea.innerHTML = '';
                    articleDisplayArea.style.display = 'none';
                    button.classList.remove('active');
                    currentOpenArticle = null;
                    return;
                }

                // Fermer l'article précédent si ouvert
                if (currentOpenArticle) {
                    const prevButton = document.querySelector(`.article-btn[data-article="${currentOpenArticle}"]`);
                    if (prevButton) prevButton.classList.remove('active');
                }

                // Ouvrir le nouvel article
                if (articleTemplate) {
                    articleDisplayArea.innerHTML = articleTemplate.innerHTML;
                    articleDisplayArea.style.display = 'block';
                    button.classList.add('active');
                    currentOpenArticle = articleId;

                    // Scroll vers l'article ouvert avec un petit délai pour l'animation
                    setTimeout(() => {
                        articleDisplayArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            });
        });
    }


});

