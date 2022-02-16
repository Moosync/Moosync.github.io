import { setupPageFunctionality } from "./domUtils.js";
import {
  getProviderFromURL,
  getProviderRedirectURL,
  getQueryParams,
} from "./locationUtils.js";
import { setupDownloadButton } from "./downloadUtils.js";
import { setupCounters } from "./counterUtils.js";

const providerMatch = getProviderFromURL();
if (providerMatch && providerMatch.length > 0) {
  const redirectPath = getProviderRedirectURL(providerMatch[0]);

  window.location.href = "moosync://" + redirectPath + getQueryParams();
}

let toggleStatus = true;
const overlayElement = document.getElementById("menu-overlay");

function overlayHandler() {
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

setupPageFunctionality();
setupDownloadButton();
setupCounters();
