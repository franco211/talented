"use strict";
window.onload = function () {
  document
    .getElementById("upload-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("title", document.getElementById("title").value);
      formData.append(
        "description",
        document.getElementById("description").value
      );
      formData.append("sport", document.getElementById("sport").value);
      formData.append("skill", document.getElementById("skill").value);
      formData.append("location", document.getElementById("location").value);
      formData.append("video", document.getElementById("video").files[0]);

      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          alert(this.responseText);
        }
      };
      xhttp.open("POST", "upload.php", true);
      xhttp.send(formData);
    });
};

function playPauseVideo(videoId) {
  const video = document.getElementById(videoId);
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

const video = document.getElementById("featured-video");
const tracks = video.textTracks;
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

for (let i = 0; i < tracks.length; i++) {
  if (tracks[i].kind === "subtitles") {
    const track = tracks[i];
    track.mode = "showing";
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
