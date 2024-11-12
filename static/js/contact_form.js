import { getToken } from "./admin_list.js";

const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", (event) => {
        console.log("Submit button clicked.");
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            console.log("Form is invalid; displaying validation messages.");
            const formDataString = buildFormDataString(form);
            console.log(formDataString);
            send_email(formDataString);
        } else {
            const formDataString = buildFormDataString(form);
            send_email(formDataString);
            console.log("Form is valid; submitting.");
        }
        form.classList.add("was-validated");
    });

    // Real-time validation feedback
    Array.from(form.elements).forEach((input) => {
        input.addEventListener("input", () => {
            if (input.checkValidity()) {
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
            } else {
                input.classList.remove("is-valid");
                input.classList.add("is-invalid");
            }
        });
    });
} else {
    console.log("Form not found. Check the form ID or ensure the script loads after the HTML content.");
}

function buildFormDataString() {
    let formDataString = "Form Contact Submission\n";
    const formControls = document.querySelectorAll(".form-control");

    formControls.forEach((control) => {
        const label = document.querySelector(`label[for="${control.id}"]`);
        const labelText = label ? label.textContent : control.id;
        formDataString += `${labelText}: ${control.value}\n`;
    });

    return formDataString;
}

function send_email(context) {
    const url = 'http://127.0.0.1:8000/send-email/';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getToken('csrftoken')
        },
        body: JSON.stringify(context),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok, status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => console.log('Email sent successfully:', data))
        .catch(error => console.error('There was an error sending the email:', error));
}
