/* ========================================
   Contact Form Handling
   Form validation and submission
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            organization: document.getElementById('organization').value,
            interest: document.getElementById('interest').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Log form data (in production, send to backend)
            console.log('Form submitted:', formData);
            
            // Reset form after delay
            setTimeout(() => {
                contactForm.reset();
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
    });
    
    // Form validation
    function validateForm(data) {
        // Name validation
        if (data.name.trim().length < 2) {
            showError('name', 'Please enter a valid name');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showError('email', 'Please enter a valid email address');
            return false;
        }
        
        // Message validation
        if (data.message.trim().length < 10) {
            showError('message', 'Please enter a message with at least 10 characters');
            return false;
        }
        
        return true;
    }
    
    // Show error message
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        // Remove existing error
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
        
        // Highlight field
        field.style.borderColor = '#dc3545';
        
        // Remove error on input
        field.addEventListener('input', function() {
            field.style.borderColor = '';
            if (errorDiv) {
                errorDiv.remove();
            }
        }, { once: true });
    }
    
    // Real-time email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#ffc107';
            } else {
                this.style.borderColor = '';
            }
        });
    }
});
