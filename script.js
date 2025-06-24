const body = document.querySelector("body");
const nav = document.querySelector("nav");
const menuButtons = document.querySelectorAll('.navigation-button');
const cart = document.querySelector('.cart-icon');
const cartBadge = document.querySelector('.cart-badge');
const deleteButton = document.querySelector('#delete-btn');
const lightbox = document.querySelector('.lightbox');
const lightboxButton = document.querySelector('.lightbox-btn');
const basket = document.querySelector('.basket');
const emptyMessage = document.querySelector('.empty-message');
const product = document.querySelector('.product');
const counterValue = document.querySelector('#counter-value');
const totalPrice = document.getElementById('total-price');
const quantity = document.querySelector('.quantity');
const addToCartButton = document.querySelector('#add-to-cart');
const discountPriceText = document.querySelector('#discount-price');
const itemPrice = document.querySelector('#item-price');
const mainCarouselElement = document.querySelector('.main-carousel'); // Get the main carousel element
const mediaQuery = window.matchMedia('(min-width: 48rem)');

let selectedQuantity = 0;
let cartQuantity = 0;

// Navigation menu
const navMenu = () => {
    nav.classList.toggle('active');
    body.classList.toggle('dimmed');
}

menuButtons.forEach(button => button.addEventListener('click', navMenu));

// Carousel setup function
function setupCarousel(carouselElement, isLightbox = false) {
    let currentIndex = 0;
    const slides = carouselElement.querySelectorAll('.carousel-slides .slide');
    const track = carouselElement.querySelector('.carousel-slides');
    const buttons = carouselElement.querySelectorAll('[data-direction]');
    const thumbnails = carouselElement.querySelectorAll('.carousel-thumbnails .thumbnail');
    const thumbnailImg = carouselElement.querySelectorAll('.carousel-thumbnails .thumbnail img');

    function updateSlide() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentIndex].classList.add('active');
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnailImg.forEach(img => img.classList.remove('active'));

        if (thumbnails[currentIndex]) {
            thumbnails[currentIndex].classList.add('active');
            thumbnailImg[currentIndex].classList.add('active');
        }

        // If this is the main carousel, store its current index
        // so the lightbox can access it when opened.
        if (!isLightbox) {
            mainCarouselElement.dataset.currentIndex = currentIndex;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const direction = parseInt(button.dataset.direction, 10);
            currentIndex = (currentIndex + direction + slides.length) % slides.length;
            updateSlide();
        });
    });

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentIndex = index;
            updateSlide();
        });
    });

    // Function to set the current index from an external source
    carouselElement.setCurrentIndex = (newIndex) => {
        currentIndex = newIndex;
        updateSlide();
    };

    updateSlide(); // Initial update
}

// Initialize both carousels
setupCarousel(mainCarouselElement, false); // Main carousel
setupCarousel(lightbox, true); // Lightbox carousel

// Overlay and Lightbox
if (mediaQuery.matches) {
    mainCarouselElement.addEventListener('click', () => {
        // When the main carousel image is clicked, open the lightbox
        // and set its current index to match the main carousel's current index.
        const currentMainIndex = parseInt(mainCarouselElement.dataset.currentIndex || '0');
        lightbox.setCurrentIndex(currentMainIndex); // Sync lightbox with main carousel
        lightbox.classList.add('active');
        body.classList.add('dimmed');
    });

    lightboxButton.addEventListener('click', () => {
        lightbox.classList.remove('active');
        body.classList.remove('dimmed');
    });
}

// Cart Popup
cart.addEventListener('click', () => {
    basket.classList.toggle('active');
    updateDisplay();
});

// Counter
function updateQuantity(change) {
    selectedQuantity = Math.max(0, selectedQuantity + change);
    counterValue.textContent = selectedQuantity;
}

document.getElementById('increment').addEventListener('click', () => updateQuantity(1));
document.getElementById('decrement').addEventListener('click', () => updateQuantity(-1));

// Update cart display and prices
function updateDisplay() {
    const discountedPrice = parseFloat(discountPriceText.textContent.replace(/[^0-9.]/g, ''));

    if (cartQuantity > 0) {
        emptyMessage.classList.remove('active');
        product.classList.add('active');
        cartBadge.classList.add('active');
        cartBadge.textContent = cartQuantity;
    } else {
        emptyMessage.classList.add('active');
        product.classList.remove('active');
        cartBadge.classList.remove('active');
        cartBadge.textContent = '';
    }
    quantity.textContent = cartQuantity;
    itemPrice.textContent = `$${discountedPrice.toFixed(2)}`;
    totalPrice.textContent = `$${(cartQuantity * discountedPrice).toFixed(2)}`;
}

function handleCartUpdate(e) {
    if (e.currentTarget === deleteButton) {
        cartQuantity = 0;
    } else if (e.currentTarget === addToCartButton) {
        cartQuantity = selectedQuantity;
    }
    updateDisplay();
}

deleteButton.addEventListener('click', handleCartUpdate);
addToCartButton.addEventListener('click', handleCartUpdate);