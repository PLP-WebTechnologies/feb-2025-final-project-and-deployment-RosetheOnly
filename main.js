import cart from './modules/cart.js';
import productService from './modules/products.js';
import { Modal } from './modules/modal.js';
import { initTestimonials } from './modules/testimonials.js';
import { initNewsletter } from './modules/newsletter.js';
import { debounce, showToast } from './modules/utils.js';

// DOM Elements
const DOM = {
    menuToggle: document.querySelector('.menu-toggle'),
    primaryNav: document.querySelector('.primary-nav'),
    cartCount: document.getElementById('cart-count'),
    featuredProducts: document.getElementById('featured-products'),
    currentYear: document.getElementById('current-year')
};

// Initialize Quick View Modal
const quickViewModal = new Modal('quick-view-modal');

// Initialize the application
class App {
    constructor() {
        this.initEventListeners();
        this.updateCartCount();
        this.loadProducts();
        this.setCurrentYear();
        
        // Initialize modules
        initTestimonials();
        initNewsletter();
        
        // Register cart update callback
        cart.onCartUpdate(this.handleCartUpdate.bind(this));
    }
    
    initEventListeners() {
        // Mobile menu toggle
        if (DOM.menuToggle) {
            DOM.menuToggle.addEventListener('click', () => {
                const isExpanded = DOM.menuToggle.getAttribute('aria-expanded') === 'true';
                DOM.menuToggle.setAttribute('aria-expanded', !isExpanded);
                DOM.primaryNav.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (DOM.primaryNav.classList.contains('active') && 
                !e.target.closest('.primary-nav') && 
                !e.target.closest('.menu-toggle')) {
                DOM.primaryNav.classList.remove('active');
                DOM.menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    async loadProducts() {
        try {
            await productService.fetchProducts();
            
            if (DOM.featuredProducts) {
                this.renderFeaturedProducts();
            }
        } catch (error) {
            showToast('Failed to load products. Please try again later.', 'error');
            console.error('Product loading error:', error);
        }
    }
    
    renderFeaturedProducts() {
        const featuredProducts = productService.getFeaturedProducts();
        
        if (featuredProducts.length === 0) {
            DOM.featuredProducts.innerHTML = '<p class="no-products">No featured products available</p>';
            return;
        }
        
        DOM.featuredProducts.innerHTML = featuredProducts.map(product => `
            <article class="product-card" role="listitem">
                <span class="product-badge">New</span>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <button class="btn btn-quick-view" data-id="${product.id}">Quick View</button>
                </div>
                <div class="product-info">
                    <p class="product-brand">${product.brand}</p>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        <div class="product-rating-stars">
                            ${this.renderRatingStars(product.rating)}
                        </div>
                        <span class="product-rating-count">${product.rating.toFixed(1)}</span>
                    </div>
                    <p class="product-description">${product.description}</p>
                    <div class="product-footer">
                        <div class="product-pricing">
                            <span class="product-price">$${product.price.toFixed(2)}</span>
                            <span class="product-price-original">$${(product.price * 1.2).toFixed(2)}</span>
                        </div>
                        <button class="btn-add-to-cart" data-id="${product.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add
                        </button>
                    </div>
                </div>
            </article>
        `).join('');
        
        // Add event listeners to product buttons
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', this.handleAddToCart.bind(this));
        });
        
        // Add event listeners to quick view buttons
        document.querySelectorAll('.btn-quick-view').forEach(button => {
            button.addEventListener('click', this.handleQuickView.bind(this));
        });
    }
    
    renderRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        return `
            ${'<span class="star full" aria-hidden="true">★</span>'.repeat(fullStars)}
            ${hasHalfStar ? '<span class="star half" aria-hidden="true">★</span>' : ''}
            ${'<span class="star empty" aria-hidden="true">★</span>'.repeat(emptyStars)}
        `;
    }
    
    handleAddToCart(event) {
        const productId = parseInt(event.target.dataset.id);
        const product = productService.getProductById(productId);
        
        if (!product) {
            showToast('Product not found', 'error');
            return;
        }
        
        try {
            cart.addItem(product);
            showToast(`${product.name} added to cart`, 'success');
        } catch (error) {
            console.error('Error adding to cart:', error);
            showToast('Failed to add item to cart', 'error');
        }
    }
    
    handleQuickView(event) {
        event.stopPropagation();
        const productId = parseInt(event.target.dataset.id);
        const product = productService.getProductById(productId);
        
        if (!product) {
            showToast('Product not found', 'error');
            return;
        }
        
        this.renderQuickView(product);
        quickViewModal.open();
    }
    
    renderQuickView(product) {
        const modalContent = document.getElementById('quick-view-content');
        
        modalContent.innerHTML = `
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="quick-view-details">
                    <span class="product-badge">New</span>
                    <h2>${product.name}</h2>
                    <p class="product-brand">${product.brand}</p>
                    <div class="quick-view-rating">
                        ${this.renderRatingStars(product.rating)}
                        <span>${product.rating.toFixed(1)} (${Math.floor(product.rating * 20)} reviews)</span>
                    </div>
                    <div class="quick-view-price">$${product.price.toFixed(2)} <span class="product-price-original">$${(product.price * 1.2).toFixed(2)}</span></div>
                    <p class="quick-view-description">${product.description}</p>
                    <div class="quick-view-actions">
                        <button class="btn btn-primary btn-add-to-cart" data-id="${product.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add to Cart
                        </button>
                        <button class="btn btn-outline">
                            View Full Details
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listener to the modal's add to cart button
        modalContent.querySelector('.btn-add-to-cart')?.addEventListener('click', (e) => {
            this.handleAddToCart(e);
            quickViewModal.close();
        });
    }
    
    handleCartUpdate(updatedCart) {
        this.updateCartCount();
    }
    
    updateCartCount() {
        const count = cart.getCartCount();
        DOM.cartCount.textContent = count;
        DOM.cartCount.setAttribute('aria-label', `${count} items in cart`);
    }
    
    setCurrentYear() {
        if (DOM.currentYear) {
            DOM.currentYear.textContent = new Date().getFullYear();
        }
    }
}

// Initialize the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});