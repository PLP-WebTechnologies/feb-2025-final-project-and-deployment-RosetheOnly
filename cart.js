class Cart {
    constructor() {
        this.cart = this.loadCart();
        this.cartUpdateCallbacks = [];
    }
    
    loadCart() {
        try {
            return JSON.parse(localStorage.getItem('techSphereCart')) || [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    }
    
    saveCart() {
        try {
            localStorage.setItem('techSphereCart', JSON.stringify(this.cart));
            this.notifyCartUpdate();
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }
    
    addItem(product, quantity = 1) {
        if (!product || !product.id) {
            throw new Error('Invalid product');
        }
        
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity
            });
        }
        
        this.saveCart();
        return this.cart;
    }
    
    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        return this.cart;
    }
    
    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            return this.removeItem(productId);
        }
        
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
        }
        
        return this.cart;
    }
    
    clearCart() {
        this.cart = [];
        this.saveCart();
        return this.cart;
    }
    
    getCartCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    getCartTotal() {
        return this.cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }
    
    onCartUpdate(callback) {
        if (typeof callback === 'function') {
            this.cartUpdateCallbacks.push(callback);
        }
    }
    
    notifyCartUpdate() {
        this.cartUpdateCallbacks.forEach(callback => {
            try {
                callback(this.cart);
            } catch (error) {
                console.error('Error in cart update callback:', error);
            }
        });
    }
}

// Export as singleton
const cartInstance = new Cart();
export default cartInstance;