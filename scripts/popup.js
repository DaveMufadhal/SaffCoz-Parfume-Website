document.addEventListener('DOMContentLoaded', function() {  
    // Safe popup function with error handling and animation  
    window.openProductPopup = function(name, price, description, imageUrl, type) {  
        try {  
            const popup = document.getElementById('productPopup');  
            const productName = document.getElementById('popupProductName');  
            const productImage = document.getElementById('popupProductImage');  
            const productPrice = document.getElementById('popupProductPrice');  
            const productType = document.getElementById('popupProductTypeValue');   
            const productDescription = document.getElementById('popupProductDescription');  
            
            // Null checks to prevent errors  
            if (!popup || !productName || !productImage || !productPrice || !productType || !productDescription) {  
                console.error('Popup elements not found');  
                return;  
            }  
            
            // Set content  
            productName.textContent = name || 'Product Name';  
            productImage.src = imageUrl || '';  
            productPrice.textContent = price || 'Price Not Available';  
            productType.textContent = type || 'No type available';
            productDescription.textContent = description || 'No description available';  
            
            // Display popup with animation  
            popup.style.display = 'flex';  
            
            // Add show class with a slight delay for smoother transition  
            setTimeout(() => {  
                popup.classList.add('show');  
            }, 10);  
        } catch (error) {  
            console.error('Error in openProductPopup:', error);  
        }  
    };

    // Close popup function with animation  
    function closePopup() {  
        const popup = document.getElementById('productPopup');  
        
        // Remove show class to trigger exit animation  
        popup.classList.remove('show');  
        
        // Hide popup after animation completes  
        setTimeout(() => {  
            popup.style.display = 'none';  
        }, 300);  
    }  

    // Close popup handlers  
    const closePopupBtn = document.querySelector('.close-popup');  
    const productPopup = document.getElementById('productPopup');  

    if (closePopupBtn) {  
        closePopupBtn.addEventListener('click', closePopup);  
    }  

    // Close when clicking outside popup  
    window.addEventListener('click', function(event) {  
        if (event.target === productPopup) {  
            closePopup();  
        }  
    });  

    // Close with Escape key  
    window.addEventListener('keydown', function(event) {  
        if (event.key === 'Escape' && productPopup.classList.contains('show')) {  
            closePopup();  
        }  
    });  
});