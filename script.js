// ========== PRODUCT DATA ==========
// IMPORTANT: Replace image paths with YOUR actual photos
const products = [
    {
        id: 1,
        name: "Pandesal",
        category: "bread",
        description: "The classic Filipino breakfast roll, freshly baked every morning. Soft, slightly sweet, and perfectly golden with a breadcrumb coating that gives it that signature texture. Best enjoyed warm with butter or dipped in coffee.",
        image: "img/pandesal.jpg", // REPLACE WITH YOUR PHOTO
        tags: ["Iconic", "Breakfast", "Fresh Daily", "Filipino Classic"]
    },
    {
        id: 2,
        name: "Ube Croissant",
        category: "pastries",
        description: "Our signature fusion creation that has become a customer favorite. A buttery, flaky French croissant filled with vibrant purple yam (ube) halaya, marrying European technique with iconic Filipino flavor. Each bite offers layers of delicate pastry and sweet, earthy ube.",
        image: "img/ube.png", // REPLACE WITH YOUR PHOTO
        tags: ["Signature", "Fusion", "Best Seller", "Instagrammable"]
    },
    {
        id: 3,
        name: "Classic Butter Croissant",
        category: "european",
        description: "The quintessential French pastry made with pure butter dough, layered to perfection for that unmistakable flaky texture and rich, buttery flavor. We use European butter for authentic taste and texture. Perfect with coffee or as the base for sandwiches.",
        image: "img/butteredcroissant.jpg", // REPLACE WITH YOUR PHOTO
        tags: ["French Classic", "Buttery", "Flaky", "European"]
    },
    {
        id: 4,
        name: "Ensaymada",
        category: "pastries",
        description: "A soft, coiled brioche-like bread, a Filipino-Spanish heritage recipe that dates back centuries. Topped with butter, sugar, and grated cheese for a rich, comforting treat that's perfect for merienda (afternoon snack). Our version uses queso de bola for authentic flavor.",
        image: "img/ensaymada.jpg", // REPLACE WITH YOUR PHOTO
        tags: ["Heritage", "Cheesy", "Soft", "Merienda Favorite"]
    },
    {
        id: 5,
        name: "Bibingka",
        category: "kakanin",
        description: "Traditional Filipino rice cake baked in banana leaves, giving it a unique aromatic flavor. Topped with salted egg and grated coconut, this is a cherished holiday favorite that we make year-round. Cooked in our traditional clay oven for authentic texture.",
        image: "img/bibingka.png", // REPLACE WITH YOUR PHOTO
        tags: ["Festive", "Traditional", "Seasonal", "Clay Oven Baked"]
    },
    {
        id: 6,
        name: "Pain au Chocolat",
        category: "european",
        description: "Delicate croissant dough wrapped around two bars of premium dark chocolate. A perfect balance of buttery pastry and rich chocolate that melts in your mouth. We use 70% dark chocolate for a sophisticated, not-too-sweet flavor profile.",
        image: "img/pain-au-chocolat.png", // REPLACE WITH YOUR PHOTO
        tags: ["Chocolate", "French", "Decadent", "Dark Chocolate"]
    },
    {
        id: 7,
        name: "Pan de Coco",
        category: "bread",
        description: "Soft, sweet buns filled with a deliciously sticky shredded coconut filling. A comforting bakery classic enjoyed across the Philippines. Our version uses freshly grated coconut and muscovado sugar for a rich, caramel-like sweetness.",
        image: "img/pan-de-coco.png", // REPLACE WITH YOUR PHOTO
        tags: ["Sweet", "Coconut", "Classic", "Comfort Food"]
    },
    {
        id: 8,
        name: "Puto Bumbong",
        category: "kakanin",
        description: "A festive purple rice cake steamed in bamboo tubes, traditionally served during Christmas season with butter, grated coconut, and muscovado sugar. We use heirloom purple rice for authentic color and flavor. Available seasonally from November to January.",
        image: "img/puto-bumbong.png", // REPLACE WITH YOUR PHOTO
        tags: ["Holiday", "Traditional", "Steamed", "Seasonal Special"]
    }
];

// ========== CAROUSEL STATE ==========
let currentSlide = 0;
let filteredProducts = [...products];
let autoSlideInterval;

// ========== DOM ELEMENTS ==========
const carouselTrack = document.querySelector('.carousel-track');
const carouselIndicators = document.querySelector('.carousel-indicators');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const selectedProductName = document.querySelector('.selected-product-name');
const selectedProductDescription = document.querySelector('.selected-product-description');
const productTagsContainer = document.querySelector('.product-tags');
const categoryButtons = document.querySelectorAll('.category-btn');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const currentYearSpan = document.getElementById('currentYear');

// ========== INITIALIZATION ==========
function initWebsite() {
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Initialize carousel
    initCarousel();
    
    // Setup mobile navigation
    setupMobileNav();
    
    // Setup contact form
    setupContactForm();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
}

// ========== CAROUSEL FUNCTIONS ==========
function initCarousel() {
    renderCarousel();
    updateCarouselPosition();
    updateProductDetails(currentSlide);
    startAutoSlide();
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        moveToSlide(currentSlide - 1, 'left');
        resetAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        moveToSlide(currentSlide + 1, 'right');
        resetAutoSlide();
    });
    
    // Category Filtering
    setupCategoryFilters();
    
    // Touch events for mobile swipe
    setupTouchEvents();
}

function renderCarousel() {
    carouselTrack.innerHTML = '';
    carouselIndicators.innerHTML = '';
    
    filteredProducts.forEach((product, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.dataset.index = index;
        
        slide.innerHTML = `
            <div class="product-image-bg" style="background-image: url('${product.image}');"></div>
            <div class="product-overlay">
                <span class="category">${getCategoryName(product.category)}</span>
                <h3>${product.name}</h3>
                <p>${product.description.substring(0, 100)}...</p>
            </div>
        `;
        
        // Add click event to slide
        slide.addEventListener('click', () => {
            moveToSlide(index, index > currentSlide ? 'right' : 'left');
            resetAutoSlide();
        });
        
        carouselTrack.appendChild(slide);
        
        // Create indicator
        createIndicator(index);
    });
}

function createIndicator(index) {
    const indicator = document.createElement('div');
    indicator.className = `indicator ${index === currentSlide ? 'active' : ''}`;
    indicator.dataset.index = index;
    indicator.addEventListener('click', () => {
        const direction = index > currentSlide ? 'right' : 'left';
        moveToSlide(index, direction);
        resetAutoSlide();
    });
    carouselIndicators.appendChild(indicator);
}

function moveToSlide(slideIndex, direction = 'right') {
    if (filteredProducts.length === 0) return;
    
    // Handle wrap-around
    if (slideIndex < 0) slideIndex = filteredProducts.length - 1;
    if (slideIndex >= filteredProducts.length) slideIndex = 0;
    
    // Update current slide
    currentSlide = slideIndex;
    
    // Apply animation class
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach(slide => {
        slide.classList.remove('slide-right', 'slide-left');
        if (direction === 'right') {
            slide.classList.add('slide-right');
        } else {
            slide.classList.add('slide-left');
        }
    });
    
    // Update carousel position
    updateCarouselPosition();
    updateProductDetails(currentSlide);
}

function updateCarouselPosition() {
    const slideWidth = 100; // percentage
    carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    
    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function updateProductDetails(slideIndex) {
    if (filteredProducts.length === 0) return;
    
    const product = filteredProducts[slideIndex];
    selectedProductName.textContent = product.name;
    selectedProductDescription.textContent = product.description;
    
    // Update tags
    productTagsContainer.innerHTML = '';
    product.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'product-tag';
        tagElement.textContent = tag;
        productTagsContainer.appendChild(tagElement);
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveToSlide(currentSlide + 1, 'right');
    }, 5000); // Change slide every 5 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function setupCategoryFilters() {
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            const category = button.dataset.category;
            filteredProducts = category === 'all' 
                ? [...products] 
                : products.filter(product => product.category === category);
            
            // Reset to first slide
            currentSlide = 0;
            renderCarousel();
            updateProductDetails(currentSlide);
            resetAutoSlide();
        });
    });
}

function setupTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselTrack.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            moveToSlide(currentSlide - 1, 'left');
        } else {
            moveToSlide(currentSlide + 1, 'right');
        }
        resetAutoSlide();
    }
}

// ========== HELPER FUNCTIONS ==========
function getCategoryName(categoryKey) {
    const categoryNames = {
        'bread': 'Filipino Bread',
        'pastries': 'Pastries',
        'kakanin': 'Kakanin',
        'european': 'European Classics'
    };
    return categoryNames[categoryKey] || categoryKey;
}

// ========== MOBILE NAVIGATION ==========
function setupMobileNav() {
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ========== CONTACT FORM ==========
function setupContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just show a success message
        showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

function showFormMessage(text, type) {
    if (!formMessage) return;
    
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// ========== SMOOTH SCROLLING ==========
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveToSlide(currentSlide - 1, 'left');
        resetAutoSlide();
    } else if (e.key === 'ArrowRight') {
        moveToSlide(currentSlide + 1, 'right');
        resetAutoSlide();
    }
});

// ========== INITIALIZE WEBSITE ==========
document.addEventListener('DOMContentLoaded', initWebsite);