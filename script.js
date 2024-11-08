(function() {
    emailjs.init("8-eFLwo36LIBiK4l-"); 
})();

window.onload = function() {
    document.getElementById('form_page').addEventListener('submit', function(event) {
        event.preventDefault(); 

        
        const submitButton = event.target.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        emailjs.sendForm('service_k28kniq', 'template_qzzhflq', this)
            .then((response) => {
                console.log('SUCCESS!', response);
                alert("Your message has been sent successfully!");
            })
            .catch((error) => {
                console.error('FAILED...', error);

                
                if (error.status === 401 || error.status === 403) {
                    alert("Authorization error. Please check your EmailJS credentials.");
                } else if (error.status === 400) {
                    alert("Bad request. Please check your form data.");
                } else {
                    alert("Oops! Something went wrong. Please try again later.");
                }
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            });
    });
}
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
