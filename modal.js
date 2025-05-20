export class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.init();
    }
    
    init() {
        // Close modal when clicking overlay or close button
        this.modal.querySelectorAll('[data-modal-close]').forEach(element => {
            element.addEventListener('click', () => this.close());
        });
        
        // Close modal when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }
    
    open() {
        document.body.style.overflow = 'hidden';
        this.modal.classList.add('active');
    }
    
    close() {
        document.body.style.overflow = '';
        this.modal.classList.remove('active');
    }
    
    toggle() {
        if (this.modal.classList.contains('active')) {
            this.close();
        } else {
            this.open();
        }
    }
}