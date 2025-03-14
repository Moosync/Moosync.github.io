import { shouldRegenRequest, getExpiryTime, setCache } from "./commonUtils.js";
import { setElemProperty } from "./commonUtils.js";

// TODO: fetch this from all-contributors spec
const noCodeContributorsCount = 3;

async function getGithubDownloadCount() {
  const data = localStorage.getItem("downloads_counter");
  let shouldRegen = true;
  if (data != null) {
    const cache = JSON.parse(data);
    shouldRegen = shouldRegenRequest(cache);
  }

  if (shouldRegen) {
    const resp = await (
      await fetch("https://api.github.com/repos/Moosync/Moosync/releases")
    ).json();

    const resp1 = await (
      await fetch(
        "https://api.github.com/repos/Moosync/Moosync-electron/releases",
      )
    ).json();

    const consolidated = [...resp, ...resp1];
    console.log(consolidated);

    let downloadCount = 0;

    for (const release of consolidated) {
      for (const asset of release.assets) {
        if (!asset.name.match("blockmap|yml|json"))
          downloadCount += asset.download_count;
      }
    }

    setCache("downloads_counter", {
      count: downloadCount,
      expiry: getExpiryTime(),
    });
    return downloadCount;
  }

  return JSON.parse(data).count;
}

async function getGithubContributorsCount() {
  const data = localStorage.getItem("contributors_counter");
  let shouldRegen = true;
  if (data != null) {
    const cache = JSON.parse(data);
    shouldRegen = shouldRegenRequest(cache);
  }

  if (shouldRegen) {
    //TODO: Workaround rate limitation
    const resp = await (
      await fetch("https://api.github.com/orgs/Moosync/repos")
    ).json();

    let contributors = {};

    for (const repo of resp) {
      const resp = await (
        await fetch(
          `https://api.github.com/repos/Moosync/${repo.name}/contributors`,
        )
      ).json();

      for (const contri of resp) {
        contributors[contri.id] = 1;
      }
    }

    setCache("contributors_counter", {
      count: Object.keys(contributors).length,
      expiry: getExpiryTime(),
    });
    return Object.keys(contributors).length;
  }
  return JSON.parse(data).count;
}

async function getDiscordCount() {
  const resp = await (
    await fetch("https://discord.com/api/guilds/919246266167332894/widget.json")
  ).json();
  return resp.members.length || 0;
}

export function setupCounters() {
  (async () => {
    setElemProperty(
      "downloads__count",
      "innerHTML",
      Math.floor((await getGithubDownloadCount()) / 10) * 10 + "+",
    );
  })();

  (async () => {
    setElemProperty(
      "contri__count",
      "innerHTML",
      (await getGithubContributorsCount()) + noCodeContributorsCount + "+",
    );
  })();

  (async () => {
    setElemProperty(
      "discord__count",
      "innerHTML",
      (await getDiscordCount()) + "+",
    );
  })();
}
