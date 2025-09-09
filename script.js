// Cart functionality
let cartCount = 0;
let wishlistCount = 0;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize from localStorage if available
    if (localStorage.getItem('cartCount')) {
        cartCount = parseInt(localStorage.getItem('cartCount'));
        updateCartCount();
    }
    
    if (localStorage.getItem('wishlistCount')) {
        wishlistCount = parseInt(localStorage.getItem('wishlistCount'));
        updateWishlistCount();
    }
    
    // Add event listeners to buttons
    const cartButtons = document.querySelectorAll('.cart-btn');
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    cartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', addToWishlist);
    });
});

// Add to Cart function
function addToCart(event) {
    cartCount++;
    updateCartCount();
    localStorage.setItem('cartCount', cartCount);
    
    // Show notification
    showNotification('Item added to cart!');
}

// Add to Wishlist function
function addToWishlist(event) {
    const heartIcon = event.currentTarget.querySelector('i');
    
    // Toggle between outline and solid heart
    if (heartIcon.classList.contains('far')) {
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        wishlistCount++;
        showNotification('Item added to wishlist!');
    } else {
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        wishlistCount--;
    }
    
    updateWishlistCount();
    localStorage.setItem('wishlistCount', wishlistCount);
}

// Update Cart Count
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

// Update Wishlist Count
function updateWishlistCount() {
    const wishlistCountElement = document.getElementById('wishlist-count');
    if (wishlistCountElement) {
        wishlistCountElement.textContent = wishlistCount;
    }
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #d81b60;
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: opacity 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Search functionality
function searchProducts() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const products = document.querySelectorAll('.product');
            
            products.forEach(product => {
                const productName = product.querySelector('h3').textContent.toLowerCase();
                const productColors = product.querySelector('.product-colors').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productColors.includes(searchTerm)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    }
}

// Initialize when page loads
window.onload = function() {
    searchProducts();
};
