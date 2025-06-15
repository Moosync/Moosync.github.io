import {
  shouldRegenRequest,
  getExpiryTime,
  setCache,
  callElemMethod,
  setElemProperty,
} from "./commonUtils.js";

const OSEnum = Object.freeze({
  WINDOWS: "win",
  MACOS: "mac",
  LINUX: "linux",
  UNDEFINED: "undefined",
});

function getOS() {
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

function getReaderFriendlyName(os) {
  switch (os) {
    case OSEnum.WINDOWS:
      return "Windows";
    case OSEnum.MACOS:
      return "MacOS";
    case OSEnum.LINUX:
      return "Linux";
  }
}

function getLatestAsset(os, assets) {
  const extensions = {
    linux: ["deb", "rpm", "AppImage"],
    windows: ["exe", "msi"],
    macos: ["dmg"],
  };

  const extension = extensions[os];

  return assets.filter((val) => {
    for (const ext of extension) {
      if (val.name.endsWith(ext)) {
        return true;
      }
    }
    return false;
  });
}

async function getReleaseInfo(os, currentArch) {
  let cache = JSON.parse(localStorage.getItem("artifacts"));

  // Check if cache is missing required fields
  let cacheInvalid = false;
  if (
    !cache ||
    !cache.data ||
    !cache.platform ||
    !Array.isArray(cache.data) ||
    cache.data.some(
      (r) =>
        typeof r.version === "undefined" ||
        typeof r.url === "undefined" ||
        typeof r.ext === "undefined" ||
        !("arch" in r),
    )
  ) {
    cacheInvalid = true;
    localStorage.removeItem("artifacts");
    cache = null;
  }

  if (cacheInvalid || shouldRegenRequest(cache) || cache.platform !== os) {
    const resp = await (
      await fetch("https://api.github.com/repos/Moosync/Moosync/releases")
    ).json();
    console.log("got assets resp", resp);
    if (resp.length > 0) {
      const latest = resp[0];
      const downloadAssets = getLatestAsset(os, latest.assets);
      const ret = [];
      for (const asset of downloadAssets) {
        const ext = extractExtension(asset.name);
        let arch = null;
        const url = asset.browser_download_url;

        // Special case for rpm: Moosync-11.0.2-1.aarch64.rpm
        let match = url.match(/\.([^.]+)\.rpm$/i);
        if (match && match[1]) {
          arch = sanitizeArch(match[1]);
        } else if (
          (match = url.match(/Moosync_([\w\d]+)\.app\.tar\.gz$/i)) &&
          match[1]
        ) {
          arch = sanitizeArch(match[1]);
        } else if ((match = url.match(/_([\w\d]+)(?=\.[^.]+$)/i)) && match[1]) {
          arch = sanitizeArch(match[1]);
        }

        console.log(arch, currentArch, ext, url);
        if (arch && arch === currentArch) {
          ret.push({
            version: latest.name.replace("Moosync", "").trim(),
            url: url,
            ext: ext,
            arch: arch,
          });
        }
      }

      setCache("artifacts", {
        platform: os,
        data: ret,
        expiry: getExpiryTime(),
      });
      return ret;
    }
  }

  return cache.data;
}

function getIconClass(os) {
  switch (os) {
    case OSEnum.WINDOWS:
      return "icon-win";
    case OSEnum.MACOS:
      return "icon-mac";
    case OSEnum.LINUX:
      return "icon-linux";
  }
}

function extractExtension(fileName) {
  const split = fileName.split(".");
  if (split[split.length - 1] !== "gz") {
    return split[split.length - 1];
  }

  return split[split.length - 2] + "." + split[split.length - 1];
}

function sanitizeArch(arch) {
  if (arch === "amd64" || arch === "x86_64") {
    return "x64";
  } else if (arch === "aarch64") {
    return "armv8";
  }
  return arch;
}

function getCurrentArch() {
  if (navigator.userAgentData && navigator.userAgentData.architecture) {
    return sanitizeArch(navigator.userAgentData.architecture);
  }

  const ua = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  if (ua.includes("arm") || platform.includes("arm")) {
    if (ua.includes("aarch64") || platform.includes("aarch64")) {
      return "armv8";
    }
    return "arm";
  }
  if (
    ua.includes("x86_64") ||
    ua.includes("win64") ||
    platform.includes("x86_64") ||
    platform.includes("win64")
  ) {
    return "x64";
  }
  if (ua.includes("amd64") || platform.includes("amd64")) {
    return "x64";
  }
  if (
    ua.includes("i686") ||
    ua.includes("i386") ||
    platform.includes("i686") ||
    platform.includes("i386")
  ) {
    return "x86";
  }
  return "unknown";
}

function getSanitizedLinuxName(release) {
  let name;
  let ext = release.ext;
  let arch = release.arch;

  switch (ext) {
    case "deb":
      name = "Debian (.deb)";
      break;
    case "pacman":
      name = "Arch Linux (.pacman)";
      break;
    case "rpm":
      name = "Fedora (.rpm)";
      break;
    case "AppImage":
      name = "AppImage";
      break;
    default:
      name = ext;
  }
  return arch ? `${name} (${arch})` : name;
}

function getSanitizedName(release) {
  if (
    release.url.includes("rpm") ||
    release.url.includes("deb") ||
    release.url.includes("AppImage")
  ) {
    return getSanitizedLinuxName(release);
  }

  const match = release.url.match(/^.*\/.*-\d+\.\d+\.\d+-([^.]*)\.(.*)$/);

  return match && match.length === 3 ? `${match[1]}.${match[2]}` : release.ext;
}

export async function setupDownloadButton() {
  const os = getOS();
  const downloadParent = document.getElementById("downloads");
  const currentArch = getCurrentArch();

  if (os && os !== OSEnum.UNDEFINED) {
    const releases = await getReleaseInfo(os, currentArch);
    const osReadable = getReaderFriendlyName(os);

    if (releases.length === 1) {
      const release = releases[0];
      const buttonTemplate = document.getElementById(
        "download-template-single",
      ).content;
      const clone = buttonTemplate.cloneNode(true);
      const button = clone.getElementById("download-button");

      button.title = button.title.replace("${os}", osReadable);
      button.innerHTML = button.innerHTML.replace(
        "${version}",
        `${release.version}`,
      );
      button.id = `${release.version} ${release.ext}`;

      clone.getElementById("download-icon").classList.add(getIconClass(os));
      callElemMethod(
        "downloads",
        "appendChild",
        document.importNode(clone, true),
      );

      document.getElementById(`${release.version} ${release.ext}`).onclick =
        () => window.open(release.url);
    }

    if (releases.length > 1) {
      const buttonTemplate = document.getElementById(
        "download-template-multi",
      ).content;
      const clone = buttonTemplate.cloneNode(true);

      const downloadText = clone.getElementById("download-text");
      downloadText.innerHTML = downloadText.innerHTML
        .replace("${version}", releases[0].version)
        .replace("${os}", osReadable);

      callElemMethod(
        "downloads",
        "appendChild",
        document.importNode(clone, true),
      );
      const optionsContainer = document.getElementById("options-container");

      for (const release of releases) {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        optionDiv.innerHTML = `${getSanitizedName(release)}`;
        optionsContainer.appendChild(optionDiv);

        optionDiv.onclick = () => window.open(release.url);
      }

      const selected = document.querySelector(".selected");

      selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("options__active");
      });
    }
  } else {
    setElemProperty(
      "downloads",
      "innerHTML",
      "Sorry Moosync is not available for your platform yet",
    );
  }
}
