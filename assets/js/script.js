const music = document.getElementById("music");
const playButton = document.getElementById("playButton");
let isPlaying = 0;

const playPause = () => {
  if (isPlaying == 0) {
    isPlaying = 1;
    music.play();
    playButton.title = "Pause";
    playButton.src =
      "https://res.cloudinary.com/thepranaygupta/image/upload/v1642931820/moosync/pausebutton_kaq80l.svg";
  } else {
    isPlaying = 0;
    music.pause();
    playButton.title = "Play";
    playButton.src =
      "https://res.cloudinary.com/thepranaygupta/image/upload/v1642925133/moosync/playbutton_gbdn8n.svg";
  }
};

$(document).ready(function () {
  $("#download__btn").click(function () {
    $("html, body").animate(
      {
        scrollTop: $("#download").offset().top - 300,
      },
      "1000"
    );
  });
});

let toggleStatus = true;
const overlayElement = document.getElementById("menu-overlay");

function overlayHandler() {
  if (toggleStatus) {
    overlayElement.classList.remove("moosync__navbar-mobileScreen-overlayClose");
    overlayElement.classList.add("moosync__navbar-mobileScreen-overlayOpen");
    toggleStatus = false;
  } else {
    overlayElement.classList.remove("moosync__navbar-mobileScreen-overlayOpen");
    overlayElement.classList.add("moosync__navbar-mobileScreen-overlayClose");
    toggleStatus = true;
  }
}
