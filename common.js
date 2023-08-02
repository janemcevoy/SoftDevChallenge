emailjs.init("oqQJDG4y4dhzYeetS");

function showPleaseWaitMessage() {
    var messageElement = document.getElementById("message");
    messageElement.innerHTML = "Please wait..."; // Set the "Please wait..." message
    messageElement.style.display = "block";
}

async function sendEmail(formData) {
        showPleaseWaitMessage();


    await emailjs.send("service_8n3ydyp", "template_nyvxab6", {
        name: formData.get("name"),
        email: formData.get("email"),
        card: formData.get("card")
    });
    
    console.log("Email sent successfully!");

    var messageElement = document.getElementById("message");
    messageElement.innerHTML = "Form submitted successfully!";
    messageElement.style.display = "block";

    document.getElementById("sampleForm").reset();
}


document.getElementById("sampleForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    console.log("Form submission initiated.");

    var formData = new FormData(event.target);

    sendEmail(formData);
});


// Function to validate the name field
function validateName() {
    var nameInput = document.getElementById("name");
    var namePattern = /^(?!.*(?:SELECT\s\*|DROP\sTABLE|--|;|1=1))[a-zA-Z'-.]+(?:\s[a-zA-Z'-.]+){1,5}$/;
    var isValid = namePattern.test(nameInput.value);
    nameInput.classList.toggle("invalid", !isValid);
    nameInput.classList.toggle("valid", isValid);

    var errorMessage = document.getElementById("name-error-message");
    errorMessage.style.display = isValid ? "none" : "inline";

    validateForm();
}

// Function to validate the email field
function validateEmail() {
    var emailInput = document.getElementById("email");
    var emailPattern = /^(?!.*(?:SELECT\s\*|DROP\sTABLE|--|;|1=1))[a-zA-Z0-9~!$%^&*_=+.-]+@(?!.*(?:SELECT\s\*|DROP\sTABLE|--|;|1=1))[a-zA-Z0-9.-]+\.(?!.*(?:SELECT\s\*|DROP\sTABLE|--|;|1=1))[a-zA-Z]{2,}$/;
    var isValid = emailPattern.test(emailInput.value);
    emailInput.classList.toggle("invalid", !isValid);
    emailInput.classList.toggle("valid", isValid);

    var errorMessage = document.getElementById("email-error-message");
    errorMessage.style.display = isValid ? "none" : "inline";

    validateForm();
}

// Function to calculate the LUHN algorithm
function luhnAlgorithm(cardNumber) {
    var cleanNumber = cardNumber.replace(/-/g, '');
    if (!/^\d{16}$/.test(cleanNumber)) {
        return false;
    }

    var sum = 0;
    var digit;
    var even = false;

    for (var i = cleanNumber.length - 1; i >= 0; i--) {
        digit = parseInt(cleanNumber.charAt(i), 10);
        if (even) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        even = !even;
    }

    return sum % 10 === 0;
}

// Function to validate the card field
function validateCard() {
    var cardInput = document.getElementById("card");
    var cardValue = cardInput.value;
    var cardNumber = cardValue.replace(/\D/g, ''); // Remove all non-numeric characters

    // Automatically add hyphen after every 4 digits
    var formattedCardNumber = '';
    for (var i = 0; i < cardNumber.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedCardNumber += '-';
        }
        formattedCardNumber += cardNumber.charAt(i);
    }

    cardInput.value = formattedCardNumber;

    var isValid = luhnAlgorithm(cardNumber);
    cardInput.classList.toggle("invalid", !isValid);
    cardInput.classList.toggle("valid", isValid);

    var errorMessage = document.getElementById("card-error-message");
    errorMessage.style.display = isValid ? "none" : "inline";

    validateForm();
}

// Function to check the overall form validation status and enable/disable the Submit button
function validateForm() {
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var cardInput = document.getElementById("card");
    var submitButton = document.getElementById("submitBtn");

    var isFormValid = nameInput.classList.contains("valid") &&
        emailInput.classList.contains("valid") &&
        cardInput.classList.contains("valid");

    submitButton.disabled = !isFormValid;
}

// Attach event listeners to update name, email, and card field backgrounds in real-time
document.getElementById("name").addEventListener("input", validateName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("card").addEventListener("input", validateCard);
