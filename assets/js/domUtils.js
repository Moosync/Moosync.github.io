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
  const playButton = document.getElementById("playButton");
  const playButtonIcon = document.getElementById("playButtonIcon");
  let isPlaying = false;

  const playPause = () => {
    if (!isPlaying) {
      isPlaying = true;

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

  playButton.onclick = playPause;

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
  const loginModal = document.getElementById('login-modal')
  const loginModalPreLogin = document.getElementById('login-modal-prelogin')
  const loginModalPostLogin = document.getElementById('login-modal-postlogin')

  const loginModalCloseButton = document.getElementById('login-modal-close')
  const loginModalPlatformTextPost = document.getElementById('login-modal-platform-text-post')
  const loginModalPlatformTextPre = document.getElementById('login-modal-platform-text-pre')
  const loginButton = document.getElementById('login-button')

  const providerMatch = getProviderFromURL()[0];
  if (providerMatch) {
    const color = getProviderColor(providerMatch)
    loginModalPlatformTextPost.innerHTML = providerMatch
    loginModalPlatformTextPost.style.color = color

    loginModalPlatformTextPre.innerHTML = providerMatch
    loginModalPlatformTextPre.style.color = color

    // Try to open popup
    openPopupAndHandleModal(loginModalPostLogin, loginModalPreLogin, providerMatch, false)

    loginButton.style.backgroundColor = color
    loginButton.onclick = () => openPopupAndHandleModal(loginModalPostLogin, loginModalPreLogin, providerMatch, true)

    loginModal.style.display = "block"
  }

  loginModalCloseButton.onclick = () => loginModal.style.display = "none"
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
  const res = window.open("moosync://" + getProviderRedirectURL(provider) + getQueryParams())
  if (res) {
    window.history.replaceState(null, null, '/')
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