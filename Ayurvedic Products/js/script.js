document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Product filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in the same group
                const filterGroup = this.closest('.filter-group');
                if (filterGroup) {
                    filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                }
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter values
                const doshaFilter = document.querySelector('.filter-btn[data-filter].active')?.getAttribute('data-filter') || 'all';
                const categoryFilter = document.querySelector('.filter-btn[data-category].active')?.getAttribute('data-category') || 'all';
                
                // Filter products
                productCards.forEach(card => {
                    const doshaMatch = doshaFilter === 'all' || card.getAttribute('data-dosha').includes(doshaFilter);
                    const categoryMatch = categoryFilter === 'all' || card.getAttribute('data-category') === categoryFilter;
                    
                    if (doshaMatch && categoryMatch) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productName = this.closest('.product-info').querySelector('h3').textContent;
                alert(`${productName} added to cart!`);
                // In a real implementation, this would add the product to a cart object/API
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`Thank you for subscribing with ${emailInput.value}!`);
                emailInput.value = '';
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
}); 