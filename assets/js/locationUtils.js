export function getProviderFromURL () {
  return window.location.pathname.match('youtube|spotify|lastfm')
}

export function getProviderColor (provider) {
  switch (provider) {
    case 'youtube':
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
  }
}