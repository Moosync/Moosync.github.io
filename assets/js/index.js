import {setupPageFunctionality} from  './domUtils.js'
import { getProviderFromURL, getProviderRedirectURL, getQueryParams } from './locationUtils.js'
import { setupDownloadButton } from './downloadUtils.js'

const providerMatch = getProviderFromURL()
if (providerMatch && providerMatch.length > 0) {
  const redirectPath = getProviderRedirectURL(providerMatch[0])

  window.location.href = 'moosync://' + redirectPath + getQueryParams()
}

setupPageFunctionality()
setupDownloadButton()

