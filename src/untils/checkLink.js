
/**
 * 
 * @param  link: string 
 * @returns boolean true:valid Link false invalid
 */
const checkLink = (link) => {
  return link?.trim().match(/^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
}

export default checkLink