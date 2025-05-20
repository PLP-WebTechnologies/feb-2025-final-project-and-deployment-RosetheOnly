class ProductService {
    constructor() {
        this.products = [];
        this.loading = false;
        this.error = null;
    }
    
    async fetchProducts() {
        this.loading = true;
        this.error = null;
        
        try {
            // Mock data - in a real app, this would be an API call
            this.products = [
                {
                    id: 1,
                    name: "Premium Wireless Headphones",
                    price: 349.99,
                    category: "audio",
                    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                    description: "Industry-leading noise cancellation with premium sound quality. 30-hour battery life.",
                    rating: 4.8,
                    stock: 15,
                    sku: "AUD-001",
                    brand: "SonicBeats"
                },
                {
                    id: 2,
                    name: "Pro Smart Watch",
                    price: 399.99,
                    category: "wearables",
                    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
                    description: "Health monitoring, GPS, and always-on display. Water resistant to 50m.",
                    rating: 4.6,
                    stock: 22,
                    sku: "WRB-002",
                    brand: "TechPulse"
                },
                {
                    id: 3,
                    name: "Gaming Laptop Pro",
                    price: 1899.99,
                    category: "computers",
                    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
                    description: "RTX 3080, 32GB RAM, 1TB SSD. 240Hz refresh rate display.",
                    rating: 4.9,
                    stock: 8,
                    sku: "COM-003",
                    brand: "NovaTech"
                },
                {
                    id: 4,
                    name: "4K DSLR Camera",
                    price: 1299.99,
                    category: "photography",
                    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
                    description: "24.2MP full-frame sensor. 4K video at 60fps. 5-axis stabilization.",
                    rating: 4.7,
                    stock: 12,
                    sku: "PHO-004",
                    brand: "FotoVision"
                },
                {
                    id: 5,
                    name: "Bluetooth Speaker",
                    price: 199.99,
                    category: "audio",
                    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1458&q=80",
                    description: "360° sound with deep bass. 20-hour playtime. IPX7 waterproof.",
                    rating: 4.5,
                    stock: 30,
                    sku: "AUD-005",
                    brand: "SoundSphere"
                },
                {
                    id: 6,
                    name: "VR Headset Pro",
                    price: 599.99,
                    category: "gaming",
                    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1478&q=80",
                    description: "4K resolution per eye. 120Hz refresh rate. Built-in spatial audio.",
                    rating: 4.4,
                    stock: 10,
                    sku: "GAM-006",
                    brand: "VisionX"
                }
            ];
            
            return this.products;
        } catch (error) {
            this.error = error;
            console.error('Error fetching products:', error);
            throw error;
        } finally {
            this.loading = false;
        }
    }
    
    getFeaturedProducts(limit = 4) {
        return this.products
            .sort((a, b) => b.rating - a.rating)
            .slice(0, limit);
    }
    
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }
    
    searchProducts(query, category = 'all') {
        const searchTerm = query.toLowerCase();
        
        return this.products.filter(product => {
            const matchesCategory = category === 'all' || product.category === category;
            const matchesSearch = 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm);
            
            return matchesCategory && matchesSearch;
        });
    }
}

// Export as singleton
const productService = new ProductService();
export default productService;