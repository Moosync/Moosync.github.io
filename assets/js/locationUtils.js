export function getProviderFromURL () {
  return window.location.pathname.match('youtube|spotify|lastfm')
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