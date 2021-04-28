/* global fetch, FormData */

export const fetchMarketValue = (file) => {
  const formdata = new FormData()
  formdata.append('resume_file', file, 'BinYu_DS_202008.docx')

  const url = 'https://api.metisign.com/koios/v1/market_value'

  return fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
      'x-api-key': '9G3dp8le_wmc8An6ay5lj1J5Hu9baha8em3tvzppcgasiwmc8An6ay5lKa861'
    },
    body: formdata
  }).then(res => res.json())
}
