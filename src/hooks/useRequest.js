import { useState } from "react"

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data
  } else if (response.status === 401) {
    console.error('Unauthenticated 401')
  } else if (response.status === 403) {
    console.error('Unauthenticated 403')
  } else {
    console.error(response)
  }
  const error = new Error(response.statusText)
  return Promise.reject(error)
}

export const useRequest = (func, initLoading = false) => {
  const [loading, setLoading] = useState(initLoading)
  const [error, setError] = useState(false)
  const requestHandler = async (...rest) => {
    try {
      setLoading(true)
      setError(false)
      const result = await func(...rest)
      const data = checkStatus(result)
      setLoading(false)
      console.log("data= ", data)
      return Promise.resolve(data)
    }catch(e){
      setLoading(false)
      setError(true)
      return Promise.reject(e.toString())
    }
      
  } 
  return {loading, error, requestHandler}
}