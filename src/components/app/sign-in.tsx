import { authAtom } from "@/atoms/auth-atom"
import { useSetAtom } from "jotai"
import { useState } from "react"
import { useNavigate } from "react-router"

export function SignIn() {
  const setAuth = useSetAtom(authAtom)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

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
    <div style={{ minHeight: "100vh", background: "#faf6f1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: "24px" }}>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#c4622d" }} />
        <span style={{ fontFamily: "'Fraunces', serif", fontSize: "22px", color: "#2c1a0e" }}>Inkwell</span>
      </div>

      {/* Heading */}
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", color: "#2c1a0e", marginBottom: "6px", textAlign: "center" }}>
        Welcome <em style={{ color: "#c4622d", fontStyle: "italic" }}>back.</em>
      </h1>
      <p style={{ fontSize: "14px", color: "#a08060", marginBottom: "32px" }}>Sign in to share your stories</p>

      {/* Card */}
      <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "400px", border: "1px solid #ede5d8" }}>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#2c1a0e", marginBottom: "8px" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", border: "1px solid #ede5d8", borderRadius: "8px", padding: "11px 14px", fontSize: "13px", outline: "none", fontFamily: "inherit", background: "#faf6f1", color: "#2c1a0e" }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#2c1a0e", marginBottom: "8px" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", border: "1px solid #ede5d8", borderRadius: "8px", padding: "11px 14px", fontSize: "13px", outline: "none", fontFamily: "inherit", background: "#faf6f1", color: "#2c1a0e" }}
            />
          </div>

          {error && <p style={{ fontSize: "12px", color: "#b04040", marginBottom: "14px" }}>{error}</p>}

          <button
            type="submit"
            style={{ width: "100%", background: "#c4622d", color: "#fff", border: "none", borderRadius: "8px", padding: "12px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}
          >
            SIGN IN
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "20px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "#ede5d8" }} />
          <span style={{ fontSize: "12px", color: "#c4a882" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "#ede5d8" }} />
        </div>

        <div style={{ background: "#faf6f1", borderRadius: "8px", padding: "14px", textAlign: "center", border: "1px solid #ede5d8" }}>
          <div style={{ fontSize: "13px", fontWeight: 600, color: "#2c1a0e", marginBottom: "3px" }}>🏷️ Demo Mode</div>
          <div style={{ fontSize: "12px", color: "#c4622d" }}>Use any email & password to sign in</div>
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "#c4a882", marginTop: "24px" }}>A warm place for your ideas</p>
    </div>
  )
}