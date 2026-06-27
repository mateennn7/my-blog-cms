import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { useState } from "react"
import { useNavigate, Link } from "react-router"

const PURPLE = "#7c3aed"
const GRAD = "linear-gradient(135deg, #7c3aed, #a855f7)"

function CreatePost() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [editorContent, setEditorContent] = useState("")
  const navigate = useNavigate()
  const dark = localStorage.getItem("theme") === "dark"

  const t = dark
    ? { bg: "#0d0b14", card: "#131020", border: "#1e1a2e", text: "#f0eeff", muted: "#8a85a0", mutedBg: "#1a1628" }
    : { bg: "#f8f7fc", card: "#ffffff", border: "#e2dff0", text: "#0f0d1a", muted: "#6b6880", mutedBg: "#eeecf8" }

  function handlePublish() {
    if (!title.trim() || !author.trim()) {
      alert("Please fill in both title and author name.")
      return
    }
    const existing = JSON.parse(localStorage.getItem("posts") || "[]")
    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") + "-" + Date.now()
    const newPost = {
      title,
      author,
      slug,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      desc: editorContent.slice(0, 120) + "...",
      tag: "Article",
      tagStyle: { background: "rgba(124,58,237,0.1)", color: PURPLE },
      accent: GRAD,
      content: editorContent,
    }
    localStorage.setItem("posts", JSON.stringify([...existing, newPost]))
    navigate("/")
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: `1px solid ${t.border}`,
    borderRadius: "8px",
    padding: "11px 14px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "system-ui, sans-serif",
    background: t.mutedBg,
    color: t.text,
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  }

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "system-ui, sans-serif", color: t.text }}>

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
          <Link to="/" style={{ fontSize: 13, fontWeight: 600, color: t.muted, textDecoration: "none" }}>
            Cancel
          </Link>
          <button
            onClick={handlePublish}
            style={{ background: GRAD, color: "#fff", border: "none", padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em" }}
          >
            Publish
          </button>
        </div>
      </nav>

      {/* Top gradient bar */}
      <div style={{ height: 4, background: GRAD }} />

      {/* Content */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* Page heading */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "inline-block", fontSize: 11, fontWeight: 700, color: PURPLE, letterSpacing: "0.12em", textTransform: "uppercase", background: "rgba(124,58,237,0.08)", padding: "4px 14px", borderRadius: 999, marginBottom: 14 }}>
            New Post
          </div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em" }}>
            Write something{" "}
            <span style={{ background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              great.
            </span>
          </h1>
        </div>

        {/* Form card */}
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 28, marginBottom: 24 }}>

          {/* Title */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 8 }}>
              Post Title <span style={{ color: PURPLE }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = PURPLE}
              onBlur={e => e.target.style.borderColor = t.border}
            />
          </div>

          {/* Author */}
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: t.text, marginBottom: 8 }}>
              Author Name <span style={{ color: PURPLE }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Your name..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = PURPLE}
              onBlur={e => e.target.style.borderColor = t.border}
            />
          </div>
        </div>

        {/* Editor card */}
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 24 }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: GRAD }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: t.muted }}>Content Editor</span>
          </div>
          <div style={{ padding: "8px" }}>
            <SimpleEditor onChange={(html: string) => setEditorContent(html)} />
          </div>
        </div>

        {/* Publish button */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Link to="/" style={{ fontSize: 13, fontWeight: 600, color: t.muted, textDecoration: "none", padding: "10px 20px", borderRadius: 8, border: `1px solid ${t.border}`, background: t.card }}>
            Cancel
          </Link>
          <button
            onClick={handlePublish}
            style={{ background: GRAD, color: "#fff", border: "none", padding: "10px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em" }}
          >
            Publish Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreatePost