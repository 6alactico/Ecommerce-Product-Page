const body = document.querySelector("body");
const nav = document.querySelector("nav");
const menuButtons = document.querySelectorAll('.navigation-button');
const cart = document.querySelector('#cart');
const cartBadge = document.querySelector('.cart-badge');
const carousel = document.querySelector('.carousel');
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
const carouselSlide = document.querySelector('.carousel-slides')
const mediaQuery = window.matchMedia('(min-width: 48rem');

let selectedQuantity = 0;
let cartQuantity = 0;

// Navigation menu
const navMenu = () => {
    nav.classList.toggle('active');
    body.classList.toggle('dimmed');
}

menuButtons.forEach(button => button.addEventListener('click', navMenu));

// Overlay
if (mediaQuery.matches) {
    carouselSlide.addEventListener('click', () => {
        lightbox.classList.add('active');
        body.classList.add('dimmed');
    })

    lightboxButton.addEventListener('click', () => {
        lightbox.classList.remove('active');
        body.classList.remove('dimmed');
    })

    console.log("Clicked", carousel);
}

// Cart Popup
cart.addEventListener('click', () => {
    basket.classList.toggle('active');
    updateDisplay();
    console.log('Cart toggled:', basket.classList.contains('active'));
});

// Carousel
function setupCarousel() {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.carousel-slides .slide');
    const track = document.querySelector('.carousel-slides');
    const buttons = document.querySelectorAll('[data-direction]');
    const thumbnails = document.querySelectorAll('.carousel-thumbnails .thumbnail');
    const thumbnailImg = document.querySelectorAll('.carousel-thumbnails .thumbnail img')

    function updateSlide() {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentIndex].classList.add('active');
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        console.log('Current slide', slides[currentIndex]);

        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        thumbnailImg.forEach(img => img.classList.remove('active'));

        if (thumbnails[currentIndex]) {
            thumbnails[currentIndex].classList.add('active');
            thumbnailImg[currentIndex].classList.add('active');
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const direction = parseInt(button.dataset.direction, 10);
            currentIndex = (currentIndex + direction + slides.length) % slides.length;
            updateSlide();
            console.log('button clicked', button.dataset.direction);
        });
    });

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentIndex = index;
            updateSlide();
        })
    })

    updateSlide();
}

setupCarousel(document.querySelector('.main-carousel'));
setupCarousel(document.querySelector('.lightbox'));

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
        console.log('Added to cart', cartQuantity);
    }
    updateDisplay();
}

deleteButton.addEventListener('click', handleCartUpdate);
addToCartButton.addEventListener('click', handleCartUpdate);