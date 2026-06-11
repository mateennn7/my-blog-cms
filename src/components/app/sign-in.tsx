import { authAtom } from "@/atoms/auth-atom"
import { useSetAtom } from "jotai"
import { useEffect } from "react"
import { useNavigate } from "react-router"

export function SingUp() {
  const setAuth = useSetAtom(authAtom)
  const navigate = useNavigate()
  useEffect(() => {
    setAuth(true)
    navigate("/posts")
  }, [])

  return <></>
}
