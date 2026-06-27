import { Link } from "react-router"
import { useEffect, useState } from "react"

const defaultPosts = [
  { title: "Getting Started with React — The fundamentals you actually need", author: "Sarah Chen", slug: "post-1", date: "Mar 15, 2024", desc: "Skip the fluff. Learn the core concepts that make React click.", tag: "React", featured: true },
  { title: "Advanced TypeScript Patterns", author: "Mike Johnson", slug: "post-2", date: "Mar 12, 2024", desc: "Master patterns for scalable, type-safe applications.", tag: "TypeScript", featured: false },
  { title: "Web Performance Optimization", author: "Emma Rodriguez", slug: "post-3", date: "Mar 10, 2024", desc: "Essential techniques to make your web apps lightning fast.", tag: "Performance", featured: false },
  { title: "Building Real-time Apps", author: "David Kim", slug: "post-4", date: "Mar 8, 2024", desc: "Responsive, real-time applications with WebSockets.", tag: "WebSockets", featured: false },
  { title: "Improved UI", author: "You", slug: "post-5", date: "Jun 19, 2026", desc: "Finding bugs and improving the UI of this very platform.", tag: "CMS", featured: false },
  { title: "CI/CD Pipelines Simplified", author: "Arun Patel", slug: "post-6", date: "Mar 5, 2024", desc: "Automate your deployments with modern DevOps workflows.", tag: "DevOps", featured: false },
]

const tagColors: Record<string, { bg: string; color: string }> = {
  React:       { bg: "rgba(124,58,237,0.1)",  color: "#7c3aed" },
  TypeScript:  { bg: "rgba(59,130,246,0.1)",  color: "#3b82f6" },
  Performance: { bg: "rgba(16,185,129,0.1)",  color: "#10b981" },
  WebSockets:  { bg: "rgba(245,158,11,0.1)",  color: "#f59e0b" },
  CMS:         { bg: "rgba(236,72,153,0.1)",  color: "#ec4899" },
  DevOps:      { bg: "rgba(239,68,68,0.1)",   color: "#ef4444" },
}

type Post = {
  title: string
  author: string
  slug: string
  date: string
  desc: string
  tag: string
  featured?: boolean
  saved?: boolean
}

const PURPLE = "#7c3aed"
const PURPLE2 = "#a855f7"
const GRAD = `linear-gradient(135deg, ${PURPLE}, ${PURPLE2})`

function Posts() {
  const [posts, setPosts] = useState<Post[]>(defaultPosts)
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark")

  const t = dark
    ? { bg: "#0d0b14", card: "#131020", border: "#1e1a2e", text: "#f0eeff", muted: "#8a85a0", mutedBg: "#1a1628", sidebar: "#0f0d1a" }
    : { bg: "#f8f7fc", card: "#ffffff", border: "#e2dff0", text: "#0f0d1a", muted: "#6b6880", mutedBg: "#eeecf8", sidebar: "#f0edf8" }

  useEffect(() => {
    loadPosts()
  }, [])

  function toggleDark() {
    const next = !dark
    setDark(next)
    localStorage.setItem("theme", next ? "dark" : "light")
    document.documentElement.classList.toggle("dark", next)
  }

  function loadPosts() {
    const saved: Post[] = JSON.parse(localStorage.getItem("posts") || "[]").map((p: Post) => ({ ...p, saved: true }))
    const deletedHardcoded: string[] = JSON.parse(localStorage.getItem("deletedPosts") || "[]")
    const filteredDefaults = defaultPosts.filter(p => !deletedHardcoded.includes(p.slug))
    setPosts([...filteredDefaults, ...saved])
  }

  function handleDelete(slug: string) {
    const saved: Post[] = JSON.parse(localStorage.getItem("posts") || "[]")
    const updated = saved.filter((p: Post) => p.slug !== slug)
    localStorage.setItem("posts", JSON.stringify(updated))
    const deletedHardcoded: string[] = JSON.parse(localStorage.getItem("deletedPosts") || "[]")
    if (!deletedHardcoded.includes(slug)) {
      localStorage.setItem("deletedPosts", JSON.stringify([...deletedHardcoded, slug]))
    }
    loadPosts()
  }

  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => !p.featured)

  return (
    <div style={{ background: t.bg, minHeight: "100vh", color: t.text, fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* Navbar */}
      <nav style={{ background: t.card, borderBottom: `1px solid ${t.border}`, padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: GRAD, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: 14, fontWeight: 700 }}>B</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 17, background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            BlogCMS
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={toggleDark}
            style={{ padding: "6px 10px", borderRadius: 8, border: `1px solid ${t.border}`, background: t.mutedBg, color: t.muted, cursor: "pointer", fontSize: 14 }}
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <Link to="/create-post">
            <button style={{ background: GRAD, color: "#fff", border: "none", padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              + New Post
            </button>
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>

        {/* Hero */}
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, color: PURPLE, letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(124,58,237,0.08)", padding: "4px 14px", borderRadius: 999, marginBottom: 14 }}>
            Featured Collection
          </div>
          <h1 style={{ margin: "0 0 10px", fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em" }}>
            Ideas worth{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>reading.</span>
          </h1>
          <p style={{ margin: 0, fontSize: 15, color: t.muted }}>Handpicked stories from curious minds.</p>
        </div>

        {/* Featured post */}
        {featured && (
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 24, display: "flex", flexDirection: "column" }}>
            <div style={{ height: 4, background: GRAD }} />
            <div style={{ padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 999, background: tagColors[featured.tag]?.bg || "rgba(124,58,237,0.1)", color: tagColors[featured.tag]?.color || PURPLE }}>
                  {featured.tag}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, color: PURPLE, background: "rgba(124,58,237,0.08)", padding: "3px 10px", borderRadius: 999 }}>✦ Featured</span>
              </div>
              <h2 style={{ margin: "0 0 10px", fontSize: 24, fontWeight: 700, lineHeight: 1.3 }}>{featured.title}</h2>
              <p style={{ margin: "0 0 20px", fontSize: 14, color: t.muted, lineHeight: 1.7 }}>{featured.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: t.muted }}>{featured.author} · {featured.date}</span>
                <Link to={`/posts/${featured.slug}`} style={{ fontSize: 13, fontWeight: 600, color: PURPLE, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                  Read article →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {rest.map((post, i) => {
            const tc = tagColors[post.tag] || { bg: "rgba(124,58,237,0.1)", color: PURPLE }
            return (
              <div key={i} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, overflow: "hidden", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s" }}>
                <div style={{ height: 3, background: GRAD }} />
                <div style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: tc.bg, color: tc.color }}>{post.tag}</span>
                    <button
                      onClick={() => { if (confirm("Delete this post?")) handleDelete(post.slug) }}
                      style={{ fontSize: 11, color: "#ef4444", background: "rgba(239,68,68,0.08)", border: "none", borderRadius: 6, padding: "3px 10px", cursor: "pointer", fontWeight: 600 }}
                    >
                      Delete
                    </button>
                  </div>
                  <h3 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600, lineHeight: 1.4, flex: 1 }}>{post.title}</h3>
                  <p style={{ margin: "0 0 16px", fontSize: 12, color: t.muted, lineHeight: 1.65 }}>{post.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: t.muted }}>{post.author} · {post.date}</span>
                    <Link to={`/posts/${post.slug}`} style={{ fontSize: 11, fontWeight: 700, color: PURPLE, textDecoration: "none", letterSpacing: "0.04em" }}>
                      READ →
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Posts