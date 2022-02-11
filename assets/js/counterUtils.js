import { shouldRegenRequest, getExpiryTime} from './commonUtils.js'

async function getGithubDownloadCount () {
  const cache = JSON.parse(localStorage.getItem('downloads_counter'))

  if (shouldRegenRequest(cache)) {
    const resp = await (await fetch('https://api.github.com/repos/Moosync/Moosync/releases')).json()

    let downloadCount = 0

    for (const release of resp) {
      for (const asset of release.assets) {
        if (!asset.name.match('blockmap|yml'))
          downloadCount += asset.download_count
      }
    }

    localStorage.setItem('downloads_counter', { count: downloadCount, expiry: getExpiryTime() })
    return downloadCount
  }

  return cache.count
}

async function getGithubContributorsCount () {
  const cache = JSON.parse(localStorage.getItem('contributors_counter'))

  if (shouldRegenRequest(cache)) {
    //TODO: Workaround rate limitation
    const resp = await (await fetch('https://api.github.com/orgs/Moosync/repos')).json()

    let contributors = {}

    for (const repo of resp) {
      const resp = await (await fetch(`https://api.github.com/repos/Moosync/${repo.name}/contributors`)).json()
      for (const contri of resp) {
        contributors[contri.id] = 1
      }
    }

    localStorage.setItem('contributors_counter', { count: Object.keys(contributors), expiry: getExpiryTime() })
    return Object.keys(contributors)
  }
  return cache.count
}

async function getDiscordCount () {
  const resp = await (await fetch('https://discord.com/api/guilds/919246266167332894/widget.json')).json()
  console.log(resp)
  return resp.members.length || 0
}

export function setupCounters () {
  (async () => {
    const downloadsCounter = document.getElementById('downloads__count')
    downloadsCounter.innerHTML = Math.floor((await getGithubDownloadCount()) / 10) * 10 + '+'
  })();

  (async () => {
    const activeContributorsCount = document.getElementById('contri__count')
    activeContributorsCount.innerHTML = (await getGithubContributorsCount()) + "+"
  })();

  (async () => {
    const discordCount = document.getElementById('discord__count')
    discordCount.innerHTML = (await getDiscordCount()) + "+"
  })();
}