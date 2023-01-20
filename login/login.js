"use strict";
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

document.getElementById("my-button").style.backgroundColor = "blue";

document.getElementById("my-button").addEventListener("click", function () {
  this.classList.toggle("active");
});

function enlarge(image) {
  const images = document.getElementsByClassName("image");
  for (let i = 0; i < images.length; i++) {
    if (images[i] !== image) {
      images[i].style.width = "25%";
    } else {
      image.style.width = "50%";
    }
  }
}

function goToSection(id) {
  const section = document.getElementById(id);
  section.scrollIntoView();
}

function updateHeading(img) {
  const heading = document.getElementById("spotlight");
  heading.innerHTML = "Spotlight";

  img.addEventListener("mouseover", function () {
    heading.innerHTML = img.alt;
  });

  img.addEventListener("mouseout", function () {
    heading.innerHTML = "Spotlight";
  });
}
