(function() {
    // Initialize EmailJS with the public key
    emailjs.init("8-eFLwo36LIBiK4l-"); // Replace with your actual public key
})();

window.onload = function() {
    document.getElementById('form_page').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Disable the submit button to prevent duplicate submissions
        const submitButton = event.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        // Send the form data
        emailjs.sendForm('service_k28kniq', 'template_qzzhflq', this)
            .then((response) => {
                console.log('SUCCESS!', response);
                showStatusMessage("Your message has been sent successfully!", "green");
            })
            .catch((error) => {
                console.error('FAILED...', error);

                // Check if error response contains specific information
                if (error.status === 401 || error.status === 403) {
                    showStatusMessage("Authorization error. Please check your EmailJS credentials.", "red");
                } else if (error.status === 400) {
                    showStatusMessage("Bad request. Please check your form data.", "red");
                } else {
                    showStatusMessage("Oops! Something went wrong. Please try again later.", "red");
                }
            })
            .finally(() => {
                // Re-enable the submit button
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            });
    });
}

// Function to display status messages to the user
function showStatusMessage(message, color) {
    let statusMessageDiv = document.getElementById("status-message");
    if (!statusMessageDiv) {
        statusMessageDiv = document.createElement("div");
        statusMessageDiv.id = "status-message";
        document.getElementById('form_page').appendChild(statusMessageDiv);
    }
    statusMessageDiv.textContent = message;
    statusMessageDiv.style.color = color;
}
