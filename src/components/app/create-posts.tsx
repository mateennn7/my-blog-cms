import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { useEditor } from "@tiptap/react"
import { useState } from "react"
import { useNavigate, Link } from "react-router"

function CreatePost() {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [editorContent, setEditorContent] = useState("")
  const navigate = useNavigate()

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
      tagStyle: { background: "#fbeee8", color: "#c4622d" },
      accent: "linear-gradient(90deg,#c4622d,#d4943a)",
      content: editorContent,
    }

    localStorage.setItem("posts", JSON.stringify([...existing, newPost]))
    navigate("/posts")
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid #ede5d8",
    borderRadius: "8px",
    padding: "11px 14px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "'DM Sans', sans-serif",
    background: "#faf6f1",
    color: "#2c1a0e",
  }

  return (
    <div style={{ minHeight: "100vh", background: "#faf6f1", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: "1px solid #ede5d8", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#c4622d" }} />
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: "18px", color: "#2c1a0e" }}>Inkwell</span>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Link to="/posts" style={{ fontSize: "13px", color: "#a08060", textDecoration: "none" }}>
            ← Back
          </Link>
          <button
            onClick={handlePublish}
            style={{ background: "#c4622d", color: "#fff", border: "none", padding: "9px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            Publish →
          </button>
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "36px 24px" }}>
        <div style={{ marginBottom: "8px", fontSize: "11px", fontWeight: 600, color: "#c4622d", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          New Story
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "28px", color: "#2c1a0e", marginBottom: "28px" }}>
          What's on your <em style={{ color: "#c4622d", fontStyle: "italic" }}>mind?</em>
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#2c1a0e", marginBottom: "6px" }}>Post Title</label>
            <input
              type="text"
              placeholder="Give your story a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#2c1a0e", marginBottom: "6px" }}>Author Name</label>
            <input
              type="text"
              placeholder="Your name..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Editor */}
        <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ede5d8", overflow: "hidden" }}>
          <SimpleEditor onContentChange={setEditorContent} />
        </div>
      </div>
    </div>
  )
}

export default CreatePost