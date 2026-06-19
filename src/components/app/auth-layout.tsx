import { authAtom } from "@/atoms/auth-atom"
import { useAtomValue } from "jotai"
import { Navigate, Outlet } from "react-router"

export function AuthLayout() {
  const auth = useAtomValue(authAtom)

  // Still loading from localStorage, don't redirect yet
  if (auth === undefined) {
    return null
  }

  if (!auth) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}