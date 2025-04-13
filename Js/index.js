// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Animación simple para el título principal
    const heroTitle = document.querySelector('.hero h2');
    const heroText = document.querySelector('.hero p');
    const heroButtons = document.querySelector('.hero .buttons');

    // Aplicar animaciones con un pequeño retraso entre elementos
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);

    setTimeout(() => {
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
    }, 600);

    setTimeout(() => {
        heroButtons.style.opacity = '1';
        heroButtons.style.transform = 'translateY(0)';
    }, 900);

    // Manejar el carrito de compras (funcionalidad básica)
    const cartIcon = document.querySelector('.fa-shopping-cart');

    cartIcon.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Carrito de compras - Funcionalidad en desarrollo');
    });

    // Manejar la búsqueda (funcionalidad básica)
    const searchIcon = document.querySelector('.fa-search');

    searchIcon.addEventListener('click', function(e) {
        e.preventDefault();
        const searchTerm = prompt('¿Qué estás buscando?');
        if (searchTerm) {
            alert(`Buscando: ${searchTerm}`);
        }
    });
});

// Añadir estilos CSS adicionales para las animaciones
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .hero h2, .hero p, .hero .buttons {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
    </style>
`);

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del carrusel
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(document.querySelectorAll('.product-card'));
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');

    // Variables de control
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // Ancho + gap
    const visibleCards = Math.floor(track.offsetWidth / cardWidth);
    const maxIndex = cards.length - visibleCards;

    // Función para actualizar la posición del carrusel
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Actualizar estado de los botones
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= maxIndex;

        // Actualizar opacidad de los botones según su estado
        prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
        nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
    }

    // Manejar clic en botón anterior
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Manejar clic en botón siguiente
    nextButton.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Manejar clic en tarjetas
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Remover clase activa de todas las tarjetas
            cards.forEach(c => c.classList.remove('active'));

            // Añadir clase activa a la tarjeta seleccionada
            card.classList.add('active');

            // Si la tarjeta no está completamente visible, mover el carrusel
            if (index < currentIndex) {
                currentIndex = index;
                updateCarousel();
            } else if (index >= currentIndex + visibleCards) {
                currentIndex = index - visibleCards + 1;
                updateCarousel();
            }
        });
    });

    // Inicializar carrusel
    updateCarousel();

    // Actualizar carrusel cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {

        const newVisibleCards = Math.floor(track.offsetWidth / cardWidth);
        const newMaxIndex = cards.length - newVisibleCards;


        if (currentIndex > newMaxIndex) {
            currentIndex = Math.max(0, newMaxIndex);
        }


        updateCarousel();
    });

    // Función para detectar swipe en dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;

        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe izquierda (siguiente)
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        }

        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe derecha (anterior)
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos
    const tableRows = document.querySelectorAll('.table-row');
    const moreBtns = document.querySelectorAll('.more-btn');
    const viewAllBtn = document.querySelector('.view-all-btn');

    // Añadir efecto de hover a las filas
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)'; // Aumenta el tamaño un 5%
        });

        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)'; // Vuelve al tamaño normal
        });
    });

    // Funcionalidad para los botones "More"
    document.addEventListener('DOMContentLoaded', function() {
        const moreBtns = document.querySelectorAll('.more-btn');

        moreBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });
    });



    // Añadir estilos CSS adicionales para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        .table-row {
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        
        .view-all-btn.active {
            background-color: rgba(255, 255, 255, 0.2);
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);

    // Función para hacer las etiquetas interactivas
    const tags = document.querySelectorAll('.tag');

    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Alternar clase activa
            this.classList.toggle('active');

            if (this.classList.contains('active')) {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 2px 8px rgba(255, 107, 139, 0.4)';
            } else {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });

        // Añadir efecto hover
        tag.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'scale(1.05)';
            }
        });

        tag.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
});