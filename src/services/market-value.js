/* global fetch, FormData */

export const fetchMarketValue = (file) => {
  const url = 'https://api.metisign.com/koios/v1/market_value/'

  const myHeaders = new Headers()
  myHeaders.append('x-api-key', '9G3dp8le_wmc8An6ay5lj1J5Hu9baha8em3tvzppcgasiwmc8An6ay5lKa861')
  myHeaders.append('DNT', '1')

  const formdata = new FormData()
  formdata.append('resume_file', file, file.name)

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
