import { shouldRegenRequest, getExpiryTime, setCache, callElemMethod, setElemProperty } from "./commonUtils.js";

const OSEnum = Object.freeze({
  WINDOWS: "win",
  MACOS: "mac",
  LINUX: "linux",
  UNDEFINED: "undefined",
});

function getOS () {
  // Lets be safe and get platform from deprecated field too
  // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/platform
  const platform = (
    (navigator.userAgentData && navigator.userAgentData.platform) ||
    navigator.platform
  ).toLowerCase();

  if (platform.startsWith("win")) {
    return OSEnum.WINDOWS;
  }

  if (platform.match("mac") || platform.match("darwin")) {
    return OSEnum.MACOS;
  }

  if (platform.startsWith("linux")) {
    return OSEnum.LINUX;
  }

  return OSEnum.UNDEFINED;
}

function getReaderFriendlyName (os) {
  switch (os) {
    case OSEnum.WINDOWS:
      return "Windows";
    case OSEnum.MACOS:
      return "MacOS";
    case OSEnum.LINUX:
      return "Linux";
  }
}

function getLatestAsset (os, assets) {
  return assets.filter(
    (val) => !val.name.match("blockmap|yml") && val.name.match(os)
  );
}

async function getReleaseInfo (os) {
  const cache = JSON.parse(localStorage.getItem("artifacts"));

  if (shouldRegenRequest(cache) || cache.platform !== os) {
    const resp = await (
      await fetch("https://api.github.com/repos/Moosync/Moosync/releases")
    ).json();
    if (resp.length > 0) {
      const latest = resp[0];
      const downloadAssets = getLatestAsset(os, latest.assets);
      const ret = [];
      for (const asset of downloadAssets) {
        ret.push({
          version: latest.name,
          url: asset.browser_download_url,
          ext: extractExtension(asset.name),
        });
      }

      setCache("artifacts", { platform: os, data: ret, expiry: getExpiryTime() });
      return ret;
    }
  }

  return cache.data;
}

function getIconClass (os) {
  switch (os) {
    case OSEnum.WINDOWS:
      return "icon-win";
    case OSEnum.MACOS:
      return "icon-mac";
    case OSEnum.LINUX:
      return "icon-linux";
  }
}

function extractExtension (fileName) {
  const split = fileName.split(".");
  if (split[split.length - 1] !== "gz") {
    return split[split.length - 1];
  }

  return split[split.length - 2] + "." + split[split.length - 1];
}

function getSanitizedLinuxName (ext) {
  switch (ext) {
    case 'deb':
      return 'Debian (.deb)'
    case 'pacman':
      return 'Arch Linux (.pacman)'
    default:
      return ext
  }
}

function getSanitizedName(release) {
  if (release.url.includes('linux')) {
    return getSanitizedLinuxName(release.ext)
  }

  const match = release.url.match(/^.*\/.*-\d+\.\d+\.\d+-([^.]*)\.(.*)$/)

  return match && match.length === 3 ? `${match[1]}.${match[2]}` : release.ext
}

export async function setupDownloadButton () {
  const os = getOS();
  const downloadParent = document.getElementById("downloads");

  if (os && os !== OSEnum.UNDEFINED) {
    const releases = await getReleaseInfo(os);
    const osReadable = getReaderFriendlyName(os)

    if (releases.length === 1) {
      const release = releases[0]
      const buttonTemplate = document.getElementById("download-template-single").content;
      const clone = buttonTemplate.cloneNode(true);
      const button = clone.getElementById("download-button");

      button.title = button.title.replace("${os}", osReadable);
      button.innerHTML = button.innerHTML.replace(
        "${version}",
        `${release.version}`
      );
      button.id = `${release.version} ${release.ext}`

      clone.getElementById("download-icon").classList.add(getIconClass(os));
      callElemMethod('downloads', 'appendChild', document.importNode(clone, true))

      document.getElementById(`${release.version} ${release.ext}`).onclick = () => window.open(release.url)
    }

    if (releases.length > 1) {
      const buttonTemplate = document.getElementById('download-template-multi').content
      const clone = buttonTemplate.cloneNode(true)

      const downloadText = clone.getElementById('download-text')
      downloadText.innerHTML = downloadText.innerHTML
        .replace('${version}', releases[0].version)
        .replace('${os}', osReadable)

      callElemMethod('downloads', 'appendChild', document.importNode(clone, true))
      const optionsContainer = document.getElementById('options-container')

      for (const release of releases) {
        const optionDiv = document.createElement('div')
        optionDiv.classList.add('option')
        optionDiv.innerHTML = `${getSanitizedName(release)}`
        optionsContainer.appendChild(optionDiv)

        optionDiv.onclick = () => window.open(release.url)
      }

      const selected = document.querySelector('.selected');

      selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("options__active");
      })

    }

  } else {
    setElemProperty('downloads', 'innerHTML', "Sorry Moosync is not available for your platform yet")
  }
}
