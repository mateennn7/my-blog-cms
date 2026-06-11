import { authAtom } from "../../atoms/auth-atom"
import { useAtom } from "jotai"
import { useNavigate, Outlet } from "react-router"

export function AuthLayout() {
  const [auth] = useAtom(authAtom)
  const navigate = useNavigate()

  if (!auth) {
    return navigate("/login")
  }
  return <Outlet />
}
