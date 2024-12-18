document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form form');
    
    // Function to create and show error messages
    function showError(element, message, isCheckbox = false) {
        // Remove any existing error elements
        let errorContainer;
        
        if (isCheckbox) {
            // For checkbox, find or create a specific error container
            const checkboxWrapper = element.closest('div');
            errorContainer = checkboxWrapper.querySelector('.error-message');
            
            if (!errorContainer) {
                errorContainer = document.createElement('div');
                errorContainer.className = 'error-message';
                errorContainer.style.color = 'red';
                errorContainer.style.fontSize = '0.8em';
                errorContainer.style.marginTop = '5px';
                checkboxWrapper.appendChild(errorContainer);
            }
        } else {
            // Remove existing error next to the input
            const existingError = element.nextElementSibling;
            if (existingError && existingError.classList.contains('error-message')) {
                existingError.remove();
            }
            
            // Create new error element
            errorContainer = document.createElement('div');
            errorContainer.className = 'error-message';
            errorContainer.style.color = 'red';
            errorContainer.style.fontSize = '0.8em';
            errorContainer.style.marginTop = '5px';
            
            // Insert error message after the input
            element.parentNode.insertBefore(errorContainer, element.nextSibling);
        }
        
        // Set error message
        errorContainer.textContent = message;
        
        // Add error styling
        if (!isCheckbox) {
            element.style.border = '2px solid red';
        }
    }

    // Function to remove error styling
    function clearError(element, isCheckbox = false) {
        if (isCheckbox) {
            const checkboxWrapper = element.closest('div');
            const errorContainer = checkboxWrapper.querySelector('.error-message');
            if (errorContainer) {
                errorContainer.remove();
            }
        } else {
            const errorElement = element.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error-message')) {
                errorElement.remove();
            }
            element.style.border = '';
        }
    }

    // Validate Full Name
    function validateFullName(name) {
        // Check if name is empty
        if (name.trim() === '') {
            return 'Full Name is required';
        }

        // Check for at least two words
        const words = name.trim().split(/\s+/);
        if (words.length < 2) {
            return 'Please enter full name (first and last name)';
        }

        // Check for only letters and spaces
        if (/[^a-zA-Z\s]/.test(name)) {
            return 'Name should contain only letters';
        }

        return '';
    }

    // Validate Email  
function validateEmail(email) {  
    // Check if email is empty  
    if (email.trim() === '') {  
        return 'Email is required';  
    }  

    // Remove leading and trailing spaces  
    email = email.trim();  

    // Check for @ symbol  
    const atIndex = email.indexOf('@');  
    if (atIndex === -1) {  
        return 'Email must contain @ symbol';  
    }  

    // Split email into username and domain  
    const username = email.slice(0, atIndex);  
    const domain = email.slice(atIndex + 1);  

    // Username validation  
    if (username.length === 0) {  
        return 'Username part of email is missing';  
    }  

    // Check for invalid characters in username  
    const invalidUsernameChars = ['@', ' ', ',', '(', ')', '[', ']'];  
    for (let char of invalidUsernameChars) {  
        if (username.includes(char)) {  
            return 'Invalid characters in email username';  
        }  
    }  

    // Domain validation  
    if (domain.length === 0) {  
        return 'Domain part of email is missing';  
    }  

    // Check for dot in domain  
    const dotIndex = domain.lastIndexOf('.');  
    if (dotIndex === -1) {  
        return 'Email domain must contain a dot';  
    }  

    // Check domain parts  
    const domainParts = domain.split('.');  
    if (domainParts.length < 2) {  
        return 'Invalid email domain';  
    }  

    // Check last part (TLD) length  
    const tld = domainParts[domainParts.length - 1];  
    if (tld.length < 2 || tld.length > 4) {  
        return 'Invalid top-level domain';  
    }  

    // Additional domain checks  
    const invalidDomainChars = ['@', ' ', ',', '(', ')', '[', ']'];  
    for (let part of domainParts) {  
        if (part.length === 0) {  
            return 'Invalid domain structure';  
        }  
        
        for (let char of invalidDomainChars) {  
            if (part.includes(char)) {  
                return 'Invalid characters in email domain';  
            }  
        }  
    }  

    return '';  
}
    // Validate Phone Number
    function validatePhoneNumber(phone) {
        // Check if phone is empty
        if (phone.trim() === '') {
            return 'Phone Number is required';
        }

        // Remove any spaces or dashes
        const cleanPhone = phone.replace(/[\s-]/g, '');

        // Check if contains only numbers
        if (!/^\d+$/.test(cleanPhone)) {
            return 'Phone number should contain only digits';
        }

        // Check phone number length (adjust as needed)
        if (cleanPhone.length < 10 || cleanPhone.length > 15) {
            return 'Invalid phone number length';
        }

        return '';
    }

    // Validate Gender Selection
    function validateGender() {
        const genderInputs = document.querySelectorAll('input[name="gender"]');
        const selected = Array.from(genderInputs).some(input => input.checked);
        return selected ? '' : 'Please select a gender';
    }

    // Validate Checkbox
    function validateCheckbox() {
        const checkbox = form.querySelector('input[type="checkbox"]');
        
        // Check if checkbox is checked
        if (!checkbox.checked) {
            return 'You must agree to receive news and offers';
        }
        
        return '';
    }

    // Form Submit Event Listener
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form inputs
        const nameInput = form.querySelector('input[placeholder="Full Name"]');
        const emailInput = form.querySelector('input[placeholder="Email"]');
        const phoneInput = form.querySelector('input[placeholder="Phone Number"]');
        const checkbox = form.querySelector('input[type="checkbox"]');

        // Clear previous errors
        clearError(nameInput);
        clearError(emailInput);
        clearError(phoneInput);
        clearError(checkbox, true);

        // Validate inputs
        const nameError = validateFullName(nameInput.value);
        const emailError = validateEmail(emailInput.value);
        const phoneError = validatePhoneNumber(phoneInput.value);
        const genderError = validateGender();
        const checkboxError = validateCheckbox();

        // Display errors or submit form
        let hasError = false;

        if (nameError) {
            showError(nameInput, nameError);
            hasError = true;
        }

        if (emailError) {
            showError(emailInput, emailError);
            hasError = true;
        }

        if (phoneError) {
            showError(phoneInput, phoneError);
            hasError = true;
        }

        if (genderError) {
            // For gender, we'll show an alert since radio buttons are typically grouped
            alert(genderError);
            hasError = true;
        }

        // Checkbox Validation Error Handling
        if (checkboxError) {
            showError(checkbox, checkboxError, true);
            hasError = true;
        }

        // If no errors, you can submit the form or perform further actions
        if (!hasError) {
            alert('Form submitted successfully!');
            form.reset(); // Optional: reset form after successful submission
        }
    });

    // Optional: Clear checkbox error when checked
    form.querySelector('input[type="checkbox"]').addEventListener('change', function() {
        clearError(this, true);
    });
});