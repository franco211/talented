console.log($);

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
  var hasAccount = true; // replace this with your own logic

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
  heading.innerHTML = img.alt;
}
