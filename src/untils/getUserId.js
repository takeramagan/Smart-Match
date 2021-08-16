import { useRouter } from "next/router"

const getUserId = () => {
  const params = useRouter().query
  return params.id
}

export default getUserId