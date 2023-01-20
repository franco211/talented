"use strict";

const images = document.querySelectorAll(".image");
for (let i = 0; i < images.length; i++) {
    images[i].addEventListener("mouseover", function() {
        enlarge(this);
        updateHeading(this);
    });
    images[i].addEvent


function updateHeading(img) {
  const heading = document.getElementById("image-gallery");
  heading.innerHTML = "image-gallery";

  img.addEventListener("mouseover", function () {
    heading.innerHTML = img.alt;
  });

  img.addEventListener("mouseout", function () {
    heading.innerHTML = "image-gallery";
  });
}

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

import { v4 as uuidv4 } from "uuid";

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

class MyDataTable extends HTMLElement {
  constructor() {
    super();
    // Create a shadow root
    this.attachShadow({ mode: "open" });
    // Get the data from the database
    this.getData();
  }
  async getData() {
    // Open a connection to the database
    const db = await openDB("myDatabase", 1);
    // Get the data from the 'data' object store
    const data = await db.getAll("data");
    // Render the data in the shadow root
    this.shadowRoot.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (item) => `
            <tr>
              <td>${item.id}</td>
              <td>${item.username}</td>
              <td>${item.email}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }
}

// Register the custom element
customElements.define("my-data-table", MyDataTable);

// Add the custom element to the HTML form
document.getElementById("login-form").innerHTML +=
  "<my-data-table></my-data-table>";

document.getElementById("my-button").style.backgroundColor = "blue";

document.getElementById("my-button").addEventListener("click", function () {
  this.classList.toggle("active");
});

function goToSection(id) {
  const section = document.getElementById(id);
  section.scrollIntoView();
}
