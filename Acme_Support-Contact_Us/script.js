// Ensure script code context loops stay clean
document.addEventListener('DOMContentLoaded', () => {
    
    // Grab the targeted main active form element
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (event) => {
        // Prevents the browser from instantly reloading the full page
        event.preventDefault();

        // Target active user values directly inside the DOM
        const nameValue = document.getElementById('fullName').value;
        const emailValue = document.getElementById('emailAddress').value;
        const subjectValue = document.getElementById('subjectTopic').value;
        const messageValue = document.getElementById('userMessage').value;
        
        // Grab the active checked radio selector option inside the dataset array
        const selectedRadio = document.querySelector('input[name="sourceDiscovery"]:checked');
        const discoverySource = selectedRadio ? selectedRadio.value : 'Not provided';
        
        // Read tracking parameters flag states
        const acceptsUpdates = document.getElementById('marketingUpdates').checked;

        // Bundle data into a structured submission object
        const formPayload = {
            fullName: nameValue,
            email: emailValue,
            subject: subjectValue,
            message: messageValue,
            heardFrom: discoverySource,
            marketingOptIn: acceptsUpdates,
            submittedAt: new Date().toISOString()
        };

        // Output data directly to the browser console for testing
        console.log('--- Form Submission Payload ---', formPayload);
        
        // Provide the user with feedback
        alert(`Thank you, ${nameValue}! Your support request has been logged successfully.`);
        
        // Reset the form entries clean back to baseline states
        contactForm.reset();
    });
});
// Complete js logic