"use strict";

const images = document.querySelectorAll(".image");
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("mouseover", function() {
        enlarge(this);
        updateHeading(this);
    });
    images[i].addEvent
}
function updateHeading(img) {
  const heading = document.getElementById("image-gallery");
  heading.innerHTML = "image-gallery";

  img.addEventListener("mouseover", function () {
    heading.innerHTML = img.alt;
  });

  img.addEventListener("mouseout", function () {
    heading.innerHTML = "image-gallery";
  });
// Get form data
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const email = document.getElementById("email").value;

// Store form data in local storage
localStorage.setItem("username", username);
localStorage.setItem("password", password);
localStorage.setItem("email", email);

$(document).ready(function () {
  // hide the h1 element on page load
  $(".container h1#spotlight").hide();
  $(".container .image").mouseout(function () {
    $(".container h1#spotlight").show();
  });
});

$(document).ready(function () {
  // hide the login form on page load
  $(".container #login-form").hide();

  // handle clicks on the "Already have an account? Login" link
  $("#login-link").click(function () {
    $(".container #register-form").hide();
    $(".container #login-form").show();
  });
});

$(document).ready(function () {
  // check if the user already has an account
  const hasAccount = true; // replace this with your own logic

  if (hasAccount) {
    // hide the register form and show the login form
    $("#register-form").hide();
    $("#login-form").show();
    $("#login-link").hide();
    $("#register-link").show();
  } else {
    // hide the login form and show the register form
    $("#login-form").hide();
    $("#register-form").show();
    $("#register-link").hide();
    $("#login-link").show();
  }

  // handle clicks on the "Already have an account? Login" link
  $("#login-link").click(function () {
    $("#login-form").show();
    $("#register-form").hide();
    $("#login-link").hide();
    $("#register-link").show();
  });

  // handle clicks on the "Don't have an account? Register" link
  $("#register-link").click(function () {
    $("#register-form").show();
    $("#login-form").hide();
    $("#register-link").hide();
    $("#login-link").show();
  });
});

const form = document.getElementById("register-form");
// Listen for the submit event
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get the form data
  const formData = new FormData(form);

  // Perform validation
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!username || !email || !password) {
    alert("All fields are required");
    return;
  }

  // Perform desired action
  // for example sending data to server and displaying response
  fetch("/register", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Send a validation email to the user when they sign up
function sendValidationEmail(email) {
  // Generate a unique code or link to include in the email
  const validationCode = uuidv4();

  // Send the email with the validation code/link using nodemailer
  transport.sendMail({
    to: email,
    subject: "Email Validation Code",
    html: `Please click <a href="http://localhost:3000/verify?email=${email}&code=${validationCode}">here</a> to confirm your email address.`,
  });

  // Save the validation code in the database associated with the user's email
  db.get("validationCodes").push({ email, code: validationCode }).write();
}
// Verify the user's email address when they click on the validation link
function verifyEmail(email, validationCode) {
  // Look up the validation code in the database
  const savedCode = db
    .get("validationCodes")
    .find({ email, code: validationCode })
    .value();

  if (savedCode) {
    // Mark the user's account as verified
    db.get("users").find({ email }).assign({ isVerified: true }).write();

    // Delete the validation code from the database
    db.get("validationCodes").remove({ email, code: validationCode }).write();
    return true;
  } else {
    return false;
  }
}
// In your login function, check if the user's account is verified before allowing login
function login() {
  // Get the form data
  const form = document.getElementById("login-form");
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");

  // Perform validation
  if (!email || !password) {
    alert("All fields are required");
    return;
  }

  // Check if the user exists in the database
  const user = db.get("users").find({ email }).value();
  if (!user) {
    alert("Incorrect email or password.");
    return;
  }

  // Check if the account is verified
  if (!user.isVerified) {
    alert("Please verify your email address before logging in.");
    return;
  }

  // Verify the password
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  if (hashedPassword !== user.password) {
    alert("Incorrect email or password.");
    return;
  }

  // Login successful
  alert("Login successful!");
}

// Listen for the submit event on the login form
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting
  login();
});

document.getElementById("my-button").addEventListener("click", function () {
  this.classList.toggle("active");
  this.style.backgroundColor = "blue";
});

function goToSection(id) {
  const section = document.getElementById(id);
  section.scrollIntoView();
}

// Register the custom element
customElements.define("my-data-table", MyDataTable);

// Wait for the DOM to be loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the login form element
    var loginForm = document.getElementById("login-form");

    // Create a new instance of the custom element
    var table = document.createElement('my-data-table');

    // Append the custom element to the form
    loginForm.appendChild(table);
});

document.addEventListener("DOMContentLoaded", function() {
    // Get the login form element
    var loginForm = document.getElementById("login-form");

    if(loginForm){
        // Create a new instance of the custom element
        var table = document.createElement('my-data-table');
        // Append the custom element to the form
        loginForm.appendChild(table);
    }
});
