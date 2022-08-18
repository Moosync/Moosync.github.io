import {
  getProviderColor,
  getProviderFromURL,
  getProviderRedirectURL,
  getQueryParams,
} from './locationUtils.js';

import { setElemProperty, callElemMethod } from './commonUtils.js';
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

  let mouseMoveScrollEnabled = false
  document.onmousemove = (e) => {
    if (e.clientX >= document.body.clientWidth - scrollBarWidth) {
      enableScrolling(false)
      mouseMoveScrollEnabled = true
    } else {
      if (mouseMoveScrollEnabled) {
        enableScrolling(true)
        mouseMoveScrollEnabled = false
      }
    }
  }

  document.onmouseup = enableScrolling



  const music = document.getElementById('music');
  if (music) {
    music.volume = 0.2;
  }

  const playButtonContainer = document.getElementsByClassName('playbutton__container')[0];
  const playButton = document.getElementById('playButton');
  const playButtonIcon = document.getElementById('playButtonIcon');
  let isPlaying = false;

  const playPause = () => {
    if (playButton && playButtonIcon) {
      if (!isPlaying) {
        isPlaying = true;
        music.src = 'https://res.cloudinary.com/thepranaygupta/video/upload/v1643119296/moosync/bg-music_x3sspk.mp3'
        music.play();
        playButton.title = 'Pause';
        playButtonIcon.src = './assets/img/pausebutton.svg';
      } else {
        isPlaying = false;

        music.pause();
        playButton.title = 'Play';
        playButtonIcon.src = './assets/img/playbutton.svg';
      }
    }
  };

  if (playButtonContainer) {
    playButtonContainer.onclick = playPause;
  }

  setElemProperty('download__btn', 'onclick', () => {
    callElemMethod('downloads', 'scrollIntoView', {
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  });

  setElemProperty('hamburger-close', 'onclick', overlayHandler.bind(this))
  setElemProperty('hamburger-open', 'onclick', overlayHandler.bind(this))

  setElemProperty('home', 'onclick', overlayHandler.bind(this))
  setElemProperty('privacy', 'onclick', overlayHandler.bind(this))
  setElemProperty('documentation', 'onclick', overlayHandler.bind(this))
  setElemProperty('download', 'onclick', overlayHandler.bind(this))

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
    <div class='modal-content'>
      <span id='login-modal-close' class='close'>&times;</span>
      <div id='login-modal-postlogin'>
        <div class='modal-content-text' id='login-modal-content'>
          Thank you for logging in to
          <span id='login-modal-platform-text-post' style='color:${color};'>${providerMatch}</span>.<br />
          You may now close this window<br />
          and enjoy your experience.
          <br />
          <br />
          Alternatively, You may enter this code
          <div id='oauth-code' class='oauth-code'>${getQueryParams()}</div>
        </div>
      </div>
      <div id='login-modal-prelogin'>
        <p class='modal-content-text' id='login-modal-content'>
          Do you want to login to
          <span id='login-modal-platform-text-pre' style='color:${color};'>${providerMatch}</span>?
          <button title='Login' id='login-button' class='link__buttons login__button'>
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


    if (loginModalPostLogin, loginModalPreLogin, providerMatch) {
      // Try to open popup
      openPopupAndHandleModal(loginModalPostLogin, loginModalPreLogin, providerMatch, false)
    }

    if (loginButton) {
      loginButton.style.backgroundColor = color
      loginButton.onclick = () => openPopupAndHandleModal(loginModalPostLogin, loginModalPreLogin, providerMatch, true)
    }

    if (closeButton) {
      closeButton.onclick = () => loginModal.style.display = 'none'
    }

    if (loginModal) {
      loginModal.style.display = 'block'
    }
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
  const res = window.open('moosync://' + getProviderRedirectURL(provider) + getQueryParams())
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
  const overlayElement = document.getElementById('menu-overlay');

  if (overlayElement) {
    if (toggleStatus) {
      overlayElement.classList.remove(
        'moosync__navbar-mobileScreen-overlayClose'
      );
      overlayElement.classList.add('moosync__navbar-mobileScreen-overlayOpen');
      toggleStatus = false;
    } else {
      overlayElement.classList.remove('moosync__navbar-mobileScreen-overlayOpen');
      overlayElement.classList.add('moosync__navbar-mobileScreen-overlayClose');
      toggleStatus = true;
    }
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