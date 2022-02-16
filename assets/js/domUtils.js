export function setupPageFunctionality() {
  const music = document.getElementById("music");
  music.volume = 0.2;
  const playButton = document.getElementById("playButton");
  let isPlaying = false;

  const playPause = () => {
    if (!isPlaying) {
      isPlaying = true;

      music.play();
      playButton.title = "Pause";
      playButton.src = "./assets/img/pausebutton_kaq80l.svg";
    } else {
      isPlaying = false;

      music.pause();
      playButton.title = "Play";
      playButton.src = "./assets/img/playbutton_gbdn8n.svg";
    }
  };

  playButton.onclick = playPause;

  document.getElementById("download__btn").onclick = () => {
    document.getElementById("downloads").scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };
}
