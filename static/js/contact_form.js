import { getToken } from "./admin_list.js";

document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const form = event.target;
    const formData = new FormData(form);

    // Send the form data to your Django view
    fetch('/send-email/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': getToken('csrftoken'), // Send the token in the headers
        }
    })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
        if (data.success) {
            // Redirect to the custom success page
            window.location.href = "https://geratechservices.pythonanywhere.com/email-sent/";
        } else {
            // Handle error if submission fails
            alert("Error: " + data.message);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    });
});
