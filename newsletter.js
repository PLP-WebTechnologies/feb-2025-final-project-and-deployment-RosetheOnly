import { showToast } from './utils.js';

export function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById('newsletter-email');
        const email = emailInput.value.trim();
        
        if (!email) {
            showToast('Please enter your email address', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        try {
            // In a real app, this would be an API call
            // const response = await fetch('/api/newsletter', {
            //     method: 'POST',
            //     body: JSON.stringify({ email }),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });
            
            // Mock success response
            showToast('Thanks for subscribing!', 'success');
            form.reset();
        } catch (error) {
            console.error('Error submitting newsletter form:', error);
            showToast('Failed to subscribe. Please try again later.', 'error');
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}