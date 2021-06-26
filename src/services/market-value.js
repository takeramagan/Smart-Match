/* global fetch, FormData */

import { ENVIRONMENT, RESUME_ANASIS, RESUME_ANASIS_PRODUCTION, X_API_KEY_PRODUCTION, X_API_KEY_STAGING } from "../constant/externalURLs"

export const fetchMarketValue = (file, params) => {
  var url
  var x_api_key
  if (ENVIRONMENT == 'STAGING') {
    url = RESUME_ANASIS
    x_api_key = X_API_KEY_STAGING
  } else {
    url = RESUME_ANASIS_PRODUCTION
    x_api_key = X_API_KEY_PRODUCTION
  }
  // const url = RESUME_ANASIS

  const myHeaders = new Headers()
  myHeaders.append('x-api-key', x_api_key)
  myHeaders.append('DNT', '1')

  const formdata = new FormData()
  formdata.append('resume_file', file, file.name)

  Object.entries(params).forEach(([key, value]) => formdata.append(key, value))
  
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  }

  return fetch(url, requestOptions).then(checkStatus)
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  } else if (response.status === 401) {
    console.error('Unauthenticated')
  } else if (response.status === 403) {
    console.error('Unauthenticated')
  } else {
    console.error(response)
    const error = new Error(response.statusText)
    return Promise.reject(error)
  }
}
