export function getProviderFromURL () {
  return window.location.pathname.match('youtube|spotify|lastfm|invidious') || []
}

export function getProviderColor (provider) {
  switch (provider) {
    case 'youtube':
    case 'invidious':
      return '#E62017'
    case 'spotify':
      return '#1ED760'
    case 'lastfm':
      return '#BA0000'
  }
}

export function getQueryParams () {
  return window.location.search
}

export function getProviderRedirectURL (provider) {
  switch (provider) {
    case 'youtube':
      return 'ytoauth2callback'
    case 'spotify':
      return 'spotifyoauthcallback'
    case 'lastfm':
      return 'lastfmCallback'
    case 'invidious':
      return 'invidiousCallback'
  }
}
