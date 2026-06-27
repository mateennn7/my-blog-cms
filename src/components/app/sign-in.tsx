import { authAtom } from "@/atoms/auth-atom"
import { useSetAtom } from "jotai"
import { useState } from "react"
import { useNavigate } from "react-router"

const PURPLE = "#7c3aed"
const GRAD = "linear-gradient(135deg, #7c3aed, #a855f7)"

export function SignIn() {
  const setAuth = useSetAtom(authAtom)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [dark] = useState(() => localStorage.getItem("theme") === "dark")

  const t = dark
    ? { bg: "#0d0b14", card: "#131020", border: "#1e1a2e", text: "#f0eeff", muted: "#8a85a0", mutedBg: "#1a1628" }
    : { bg: "#f8f7fc", card: "#ffffff", border: "#e2dff0", text: "#0f0d1a", muted: "#6b6880", mutedBg: "#eeecf8" }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }
    localStorage.setItem("auth", "true")
    setAuth(true)
    navigate("/posts")
  }

  return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", padding: 24 }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "white", fontSize: 16, fontWeight: 700 }}>B</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: 20, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          BlogCMS
        </span>
      </div>

      {/* Heading */}
      <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 800, color: t.text, textAlign: "center", letterSpacing: "-0.02em" }}>
        Welcome{" "}
        <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>back.</span>
      </h1>
      <p style={{ margin: "0 0 36px", fontSize: 14, color: t.muted }}>Sign in to share your stories</p>

      {/* Card */}
      <div style={{ background: t.card, borderRadius: 16, padding: 32, width: "100%", maxWidth: 400, border: `1px solid ${t.border}` }}>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 8 }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", border: `1px solid ${t.border}`, borderRadius: 8, padding: "11px 14px", fontSize: 13, outline: "none", fontFamily: "inherit", background: t.mutedBg, color: t.text, boxSizing: "border-box" }}
            onFocus={e => e.target.style.borderColor = PURPLE}
            onBlur={e => e.target.style.borderColor = t.border}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 8 }}>
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", border: `1px solid ${t.border}`, borderRadius: 8, padding: "11px 14px", fontSize: 13, outline: "none", fontFamily: "inherit", background: t.mutedBg, color: t.text, boxSizing: "border-box" }}
            onFocus={e => e.target.style.borderColor = PURPLE}
            onBlur={e => e.target.style.borderColor = t.border}
          />
        </div>

        {error && <p style={{ fontSize: 12, color: "#ef4444", margin: "12px 0" }}>{error}</p>}

        <button
          onClick={handleLogin}
          style={{ width: "100%", background: GRAD, color: "#fff", border: "none", borderRadius: 8, padding: "12px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.05em", marginTop: 20 }}
        >
          SIGN IN
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: t.border }} />
          <span style={{ fontSize: 12, color: t.muted }}>or</span>
          <div style={{ flex: 1, height: 1, background: t.border }} />
        </div>

        {/* Demo box */}
        <div style={{ background: "rgba(124,58,237,0.06)", borderRadius: 10, padding: 14, textAlign: "center", border: `1px solid rgba(124,58,237,0.15)` }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 3 }}>🏷️ Demo Mode</div>
          <div style={{ fontSize: 12, color: PURPLE }}>Use any email & password to sign in</div>
        </div>
      </div>

      <p style={{ fontSize: 12, color: t.muted, marginTop: 24 }}>A modern place for your ideas ✦</p>
    </div>
  )
}