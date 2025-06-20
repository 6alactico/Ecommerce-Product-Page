const container = document.querySelector(".container");
const nav = document.querySelector("nav");
const menuButtons = document.querySelectorAll('.navigation-button');
const cart = document.querySelector('#cart-btn');
const cartBadge = document.querySelector('#cart-badge');
const activeSlide = document.querySelector('.slide.active');
const slides = document.querySelectorAll('.slide');
const track = document.querySelector('.carousel-slides');
const carousel = document.querySelector('.carousel');
const deleteButton = document.querySelector('#delete-btn');

const basket = document.querySelector('.basket');

const emptyMessage = document.querySelector('.empty-message');
const cartItem = document.querySelector('.cart-item');


const counterValue = document.querySelector('#counter-value');
const totalPrice = document.getElementById('total-price');
const quantity = document.querySelector('.quantity');
const increase = document.getElementById('increase');
const decrease = document.getElementById('decrease');
const addToCartButton = document.querySelector('#add-to-cart');
const discountPriceText = document.querySelector('#discount-price');
const itemPrice = document.querySelector('#item-price');

let selectedQuantity = 0;
let cartQuantity = 0;
let currentIndex = 0;

// Navigation menu
const navMenu = () => {
    nav.classList.toggle('active');
    container.classList.toggle('dimmed');
}

menuButtons.forEach(button => button.addEventListener('click', navMenu));

// Cart Popup
cart.addEventListener('click', () => {
    basket.classList.toggle('active');
    updateDisplay();
    console.log('Cart toggled:', basket.classList.contains('active'));
});

// Carousel
function updateSlide() {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentIndex].classList.add('active');
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    console.log('Current slide', slides[currentIndex]);
}

document.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click', () => {
        const direction = parseInt(button.dataset.direction, 10);
        currentIndex = (currentIndex + direction + slides.length) % slides.length;
        updateSlide();
        console.log('button clicked', button.dataset.direction);
    });
});


// Counter
function updateQuantity(change) {
    selectedQuantity = Math.max(0, selectedQuantity + change);
    counterValue.textContent = selectedQuantity;
}

increase.addEventListener('click', () => updateQuantity(1));
decrease.addEventListener('click', () => updateQuantity(-1));

// Update cart display and prices
function updateDisplay() {
    const discountedPrice = parseFloat(discountPriceText.textContent.replace(/[^0-9.]/g, ''));

    if (cartQuantity > 0) {
        emptyMessage.classList.remove('active');
        cartItem.classList.add('active');
        cartBadge.classList.add('active');
        cartBadge.textContent = cartQuantity;
    } else {
        emptyMessage.classList.add('active');
        cartItem.classList.remove('active');
        cartBadge.classList.remove('active');
        cartBadge.textContent = '';
    }
    quantity.textContent = cartQuantity;
    itemPrice.textContent = `$${discountedPrice.toFixed(2)}`;
    totalPrice.textContent = `$${(cartQuantity * discountedPrice).toFixed(2)}`;
}


// Add to cart and delete buttons
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

updateSlide();