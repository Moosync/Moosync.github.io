const music = document.getElementById("music");
const playButton = document.getElementById("playButton");
let isPlaying = 0;

const playPause = () => {
  if (isPlaying == 0) {
    isPlaying = 1;
    music.play();
    playButton.src =
      "https://res.cloudinary.com/thepranaygupta/image/upload/v1642931820/moosync/pausebutton_kaq80l.svg";
  } else {
    isPlaying = 0;
    music.pause();
    playButton.src =
      "https://res.cloudinary.com/thepranaygupta/image/upload/v1642925133/moosync/playbutton_gbdn8n.svg";
  }
};
