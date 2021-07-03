/* global fetch, FormData */

import { X_API_KEY, APP_END_POINT, APP_END_POINT_HISTORY, X_API_KEY_HISTORY} from '../constant/externalURLs'
export const fetchMarketValue = (file, params) => {
  const url = APP_END_POINT
  const x_api_key = X_API_KEY

console.log("env = ", process.env.NODE_ENV)

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

export const fetchHistory = ({id, url=APP_END_POINT_HISTORY, report_id}) => {
  // const url = APP_END_POINT_HISTORY
  const x_api_key = X_API_KEY_HISTORY


  const myHeaders = new Headers()
 
  // myHeaders.append('x-api-key', x_api_key)
  // myHeaders.append('X-Api-Key', x_api_key)
  // myHeaders.append('Authorization', x_api_key)
  // myHeaders.append('dcc', x_api_key)
  // myHeaders.append('DNT', '1')

  const formdata = new FormData()
  formdata.append('user_id', id)
  formdata.append('dcc', x_api_key)
  report_id && formdata.append('report_id', report_id)

 
  // Object.entries(params).forEach(([key, value]) => formdata.append(key, value))
  
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
    // mode: 'no-cors'
  }

  return fetch(url, requestOptions).then(checkStatus)
}