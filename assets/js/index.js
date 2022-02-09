import {setupPageFunctionality} from  './script.js'
import { getProviderFromURL, getProviderRedirectURL, getQueryParams } from './locationUtils.js'

const providerMatch = getProviderFromURL()
if (providerMatch && providerMatch.length > 0) {
  const redirectPath = getProviderRedirectURL(providerMatch[0])

  window.location.href = 'moosync://' + redirectPath + getQueryParams()
}

setupPageFunctionality()

