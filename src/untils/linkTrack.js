import { LINK_TRACK } from "../constant/externalURLs"
/**
 * 
 * @param {*} id :userID
 * @param {*} jumptoUrl : Url jumping to
 */
export const linkTrack = (id, jumptoUrl) => {
  const headers = new Headers()
  headers.append('canshu', 'E58Kw2W')

  const hyid = id ?? 10000010
  
  const formdata = new FormData()
  formdata.append('canshu', 'E58Kw2W')
  formdata.append('hyid', hyid)
  formdata.append('tzurl', jumptoUrl)
  // formdata.append('addtime', Date.now())

  const requestOptions = {
    mode: 'no-cors',
    method: 'POST',
    body: formdata
  }
  fetch(LINK_TRACK, requestOptions)
  // .then(res=>{return res?.json()})
  // .then(res => console.log('data=', res))
  .catch((e)=>{console.log("error happens ", e)})
}