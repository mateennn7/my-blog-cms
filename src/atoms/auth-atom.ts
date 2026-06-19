import { atom } from "jotai"

const getInitialAuth = () => {
  try {
    return localStorage.getItem("auth") === "true"
  } catch {
    return false
  }
}

export const authAtom = atom(getInitialAuth())