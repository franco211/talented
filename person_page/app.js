"use strict";
// Get stored data from local storage
const storedUsername = localStorage.getItem("username");
// Populate fields with stored data
if (storedUsername !== null) {
  document.getElementById("username").value = storedUsername;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("video-list").addEventListener("click", function () {
    scrollTo("videos");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contact").addEventListener("click", function () {
    scrollTo("contact");
  });
});

function scrollTo(elementId) {
  const element = document.getElementById(elementId);
  element.scrollIntoView({ behavior: "smooth" });
}

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent the form from submitting
    sendEmail();
  });

function sendEmail() {
  // Get the form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Use the Fetch API to send a POST request to the server with the form data
  fetch("/send-email", {
    method: "POST",
    body: JSON.stringify({ name, email, message }),
  }).then((response) => {
    if (response.ok) {
      // Email sent successfully
      alert("Your request has been sent!");
    } else {
      // There was an error sending the email
      alert("Error sending your request, please try again later.");
    }
  });
}

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent the form from submitting
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("message", message);
  });

document.getElementById("contact").addEventListener("click", function () {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const message = localStorage.getItem("message");
  const subject = "Contact Request";
  const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
  location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});

function playPauseVideo(videoId) {
  const video = document.getElementById("video-list-ul");
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function searchVideos() {
  const sport = document.getElementById("sport").value;
  const skill = document.getElementById("skill").value;
  const location = document.getElementById("location").value;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("video-list").innerHTML = this.responseText;
    }
  };
  xhttp.open(
    "GET",
    "searchVideos.php?sport=" +
      sport +
      "&skill=" +
      skill +
      "&location=" +
      location,
    true
  );
  xhttp.send();
}

const video = document.getElementById("video-list");
const videos = video;
const player = new shaka.Player();
// Attach the player to the <video> element
player.attach(video);

// Set the default video quality
player.configure({
  abr: { defaultBandwidthEstimate: 200000 },
});

// Set the maximum video quality
player.configure({
  abr: { maxWidth: 1920 },
});

// Enable network-aware ABR
player.configure({
  abr: { enabled: true },
});

player.configure({
  abr: { enabled: false },
});

// Enable auto-play
player.configure({
  autoPlay: true,
});
player.configure({
  streaming: {
    stallThreshold: 0.5,
  },
});

// Enable Stalling detection
player.configure({
  abr: { defaultBandwidthEstimate: 200000 },
  streaming: { stallThreshold: 0.5 },
  autoPlay: true,
});

// Load the video source
player.load(manifestUri).then(() => {
  console.log("The video has loaded!");
});

const manifestUri = "https://your-video-url.mpd";
player.load(manifestUri).then(() => {
  console.log("The video has loaded!");
});

for (let i = 0; i < video.length; i++) {
  if (video[i].kind === "subtitles") {
    video.mode = "showing";
    break;
  }
}

video.addEventListener("play", function () {
  // Send a request to the server when the video is played
  fetch("/track-event", {
    method: "POST",
    body: JSON.stringify({
      videoId: this.id,
      event: "play",
      timestamp: Date.now(),
    }),
  });
});

video.addEventListener("pause", function () {
  // Send a request to the server when the video is paused
  fetch("/track-event", {
    method: "POST",
    body: JSON.stringify({
      videoId: this.id,
      event: "pause",
      timestamp: Date.now(),
    }),
  });
});

video.addEventListener("ended", function () {
  // Send a request to the server when the video is completed
  fetch("/track-event", {
    method: "POST",
    body: JSON.stringify({
      videoId: this.id,
      event: "ended",
      timestamp: Date.now(),
    }),
  });
});

player.src({
  type: "video/mp4",
  src: "https://your-video-url.mp4",
});

player.textTracks([
  {
    kind: "subtitles",
    src: "featured-video-subtitles.vtt",
    srclang: "en",
    label: "English",
  },
  {
    kind: "subtitles",
    src: "featured-video-subtitles-fr.vtt",
    srclang: "fr",
    label: "French",
  },
  {
    kind: "descriptions",
    src: "featured-video-descriptions.vtt",
    srclang: "pr",
    label: "Portuguese",
  },
]);

const videoList = document.getElementById("video-list");

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes.length > 0) {
      // A new video has been added to the list
      fetch("/recent-videos")
        .then((response) => response.json())
        .then((data) => {
          videoList.innerHTML = "";
          data.forEach((video) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = "#" + video.id;
            a.innerText = video.title;
            li.appendChild(a);
            videoList.appendChild(li);
          });
        });
    }
  });
});

observer.observe(videoList, {
  childList: true,
});

fetch("/recent-videos")
  .then((response) => response.json())
  .then((data) => {
    const videoList = document.getElementById("video-list-ul");
    videoList.innerHTML = "";
    data.forEach((video) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + video.id;
      a.innerText = video.title;
      li.appendChild(a);
      videoList.appendChild(li);
    });
  });

const share = new Share(".sharing-container", {
  networks: {
    facebook: {
      app_id: "YOUR_APP_ID",
    },
    twitter: {},
    linkedin: {},
    instagram: {},
  },
});

const videoUrl = "https://www.yourwebsite.com/videos/featured-video";
share.update({
  url: videoUrl,
});
