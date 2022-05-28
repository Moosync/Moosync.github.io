import {
  getProviderColor,
  getProviderFromURL,
  getProviderRedirectURL,
  getQueryParams,
} from "./locationUtils.js";

export function setupPageFunctionality () {

  enableScrolling()
  document.body.onmousewheel = enableScrolling

  // Approximately
  const scrollBarWidth = 16

  document.onmousedown = (e) => {
    if (document.body.clientWidth <= e.clientX + scrollBarWidth) {
      enableScrolling(false)
    }
  }

  document.onmouseup = enableScrolling

  const music = document.getElementById("music");
  music.volume = 0.2;
  const playButtonContainer = document.getElementsByClassName("playbutton__container")[0];
  const playButton = document.getElementById("playButton");
  const playButtonIcon = document.getElementById("playButtonIcon");
  let isPlaying = false;

  const playPause = () => {
    if (!isPlaying) {
      isPlaying = true;
      music.src = 'https://res.cloudinary.com/thepranaygupta/video/upload/v1643119296/moosync/bg-music_x3sspk.mp3'
      music.play();
      playButton.title = "Pause";
      playButtonIcon.src = "./assets/img/pausebutton.svg";
    } else {
      isPlaying = false;

      music.pause();
      playButton.title = "Play";
      playButtonIcon.src = "./assets/img/playbutton.svg";
    }
  };

  playButtonContainer.onclick = playPause;

  document.getElementById("download__btn").onclick = () => {
    document.getElementById("downloads").scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  document.getElementById('hamburger-close').onclick = overlayHandler.bind(this)
  document.getElementById('hamburger-open').onclick = overlayHandler.bind(this)

  document.getElementById('home').onclick = overlayHandler.bind(this)
  document.getElementById('privacy').onclick = overlayHandler.bind(this)
  document.getElementById('documentation').onclick = overlayHandler.bind(this)
  document.getElementById('download').onclick = overlayHandler.bind(this)

}

let toggleStatus = true;

export function setupLoginModalFunctionality () {
  const providerMatch = getProviderFromURL()[0];
  if (providerMatch) {
    const color = getProviderColor(providerMatch)

    const loginModal = document.createElement('div')
    loginModal.classList.add('modal')
    loginModal.id = 'login-modal'
    loginModal.innerHTML = `
    <div class="modal-content">
      <span id="login-modal-close" class="close">&times;</span>
      <div id="login-modal-postlogin">
        <div class="modal-content-text" id="login-modal-content">
          Thank you for logging in to
          <span id="login-modal-platform-text-post" style="color:${color};">${providerMatch}</span>.<br />
          You may now close this window<br />
          and enjoy your experience.
          <br />
          <br />
          Alternatively, You may enter this code
          <div id="oauth-code" class="oauth-code">${getQueryParams()}</div>
        </div>
      </div>
      <div id="login-modal-prelogin">
        <p class="modal-content-text" id="login-modal-content">
          Do you want to login to
          <span id="login-modal-platform-text-pre" style="color:${color};">${providerMatch}</span>?
          <button title="Login" id="login-button" class="link__buttons login__button">
            Click to open Moosync
          </button>
        </p>
      </div>
    </div>`

    const body = document.getElementById('body')
    body.append(loginModal)

    const loginButton = document.getElementById('login-button')
    const loginModalPostLogin = document.getElementById('login-modal-postlogin')
    const loginModalPreLogin = document.getElementById('login-modal-prelogin')
    const closeButton = document.getElementById('login-modal-close')


    // Try to open popup
    openPopupAndHandleModal(loginModalPostLogin, loginModalPreLogin, providerMatch, false)

    loginButton.style.backgroundColor = color
    loginButton.onclick = () => openPopupAndHandleModal(loginModalPostLogin, loginModalPreLogin, providerMatch, true)
    closeButton.onclick = () => loginModal.style.display = 'none'

    loginModal.style.display = "block"
  }
}

function openPopupAndHandleModal (loginModalPostLogin, loginModalPreLogin, provider, showWarning) {
  if (openMoosync(provider, showWarning)) {
    loginModalPostLogin.style.display = 'block'
    loginModalPreLogin.style.display = 'none'
  } else {
    loginModalPostLogin.style.display = 'none'
    loginModalPreLogin.style.display = 'block'
  }
}

function openMoosync (provider, showWarning) {
  // const res = window.open("moosync://" + getProviderRedirectURL(provider) + getQueryParams())
  const res = true
  if (res) {
    // window.history.replaceState(null, null, '/')
  } else {
    if (showWarning) {
      alert('Failed to open Moosync. Check for blocked popup')
    }
  }

  return !!res
}

function overlayHandler () {
  const overlayElement = document.getElementById("menu-overlay");

  if (toggleStatus) {
    overlayElement.classList.remove(
      "moosync__navbar-mobileScreen-overlayClose"
    );
    overlayElement.classList.add("moosync__navbar-mobileScreen-overlayOpen");
    toggleStatus = false;
  } else {
    overlayElement.classList.remove("moosync__navbar-mobileScreen-overlayOpen");
    overlayElement.classList.add("moosync__navbar-mobileScreen-overlayClose");
    toggleStatus = true;
  }
}

let scrollTimeout

function enableScrolling (enableTimeout = true) {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }

  if (enableTimeout) {
    scrollTimeout = setTimeout(function () {
      document.body.style.color = 'transparent';
    }, 1000);
  }

  document.body.style.color = 'white';
}