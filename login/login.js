document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var existingUsername = localStorage.getItem("username");
    if (existingUsername === username) {
      alert("User already exist, please sign-in");
      window.location.href = "login.html";
    } else {
      localStorage.setItem("username", username);
      window.location.href = "index.html";
    }
  });

document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    //Add your code here to handle login process
  });

document
  .getElementById("login-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
    document.getElementById("login-link").style.display = "none";
    document.getElementById("register-link").style.display = "block";
  });

document
  .getElementById("register-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("register-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-link").style.display = "none";
    document.getElementById("login-link").style.display = "block";
  });

document.getElementById("my-button").style.backgroundColor = "blue";

document.getElementById("my-button").addEventListener("click", function () {
  this.classList.toggle("active");
});

function enlarge(image) {
    var images = document.getElementsByClassName("image");
    for (var i = 0; i < images.length; i++) {
        if (images[i] !== image) {
            images[i].style.width = "25%";
        } else {
            image.style.width = "50%";
        }
    }
}

function goToSection(id) {
    var section = document.getElementById(id);
    section.scrollIntoView();
}
