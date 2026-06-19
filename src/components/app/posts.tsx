import { Link } from "react-router"
import { useEffect, useState } from "react"

const defaultPosts = [
  { title: "Getting Started with React — The fundamentals you actually need", author: "Sarah Chen", slug: "post-1", date: "Mar 15, 2024", desc: "Skip the fluff. Learn the core concepts that make React click.", tag: "React", tagStyle: { background: "#fbeee8", color: "#c4622d" }, accent: "linear-gradient(90deg,#c4622d,#d4943a)", featured: true },
  { title: "Advanced TypeScript Patterns", author: "Mike Johnson", slug: "post-2", date: "Mar 12, 2024", desc: "Master patterns for scalable, type-safe applications.", tag: "TypeScript", tagStyle: { background: "#fdf3e3", color: "#b07020" }, accent: "linear-gradient(90deg,#d4943a,#c4622d)", featured: false },
  { title: "Web Performance Optimization", author: "Emma Rodriguez", slug: "post-3", date: "Mar 10, 2024", desc: "Essential techniques to make your web apps lightning fast.", tag: "Performance", tagStyle: { background: "#fce8e8", color: "#b04040" }, accent: "linear-gradient(90deg,#b04040,#c4622d)", featured: false },
  { title: "Building Real-time Apps", author: "David Kim", slug: "post-4", date: "Mar 8, 2024", desc: "Responsive, real-time applications with WebSockets.", tag: "WebSockets", tagStyle: { background: "#fbeee8", color: "#c4622d" }, accent: "linear-gradient(90deg,#c4622d,#b07020)", featured: false },
  { title: "Improved UI", author: "You", slug: "post-5", date: "Jun 19, 2026", desc: "Finding bugs and improving the UI of this very platform.", tag: "CMS", tagStyle: { background: "#fdf3e3", color: "#b07020" }, accent: "linear-gradient(90deg,#d4943a,#c4622d)", featured: false },
  { title: "CI/CD Pipelines Simplified", author: "Arun Patel", slug: "post-6", date: "Mar 5, 2024", desc: "Automate your deployments with modern DevOps workflows.", tag: "DevOps", tagStyle: { background: "#fce8e8", color: "#b04040" }, accent: "linear-gradient(90deg,#b04040,#d4943a)", featured: false },
]

type Post = {
  title: string
  author: string
  slug: string
  date: string
  desc: string
  tag: string
  tagStyle: React.CSSProperties
  accent: string
  featured?: boolean
  saved?: boolean
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>(defaultPosts)

  useEffect(() => {
    loadPosts()
  }, [])

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

  // Also track deleted hardcoded posts
  const deletedHardcoded: string[] = JSON.parse(localStorage.getItem("deletedPosts") || "[]")
  if (!deletedHardcoded.includes(slug)) {
    localStorage.setItem("deletedPosts", JSON.stringify([...deletedHardcoded, slug]))
  }

  loadPosts()
}
  const s: Record<string, React.CSSProperties> = {
    page: { background: "#faf6f1", minHeight: "100vh", padding: "28px", fontFamily: "'DM Sans', sans-serif" },
    header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "36px", paddingBottom: "20px", borderBottom: "1px solid #ede5d8" },
    logoWrap: { display: "flex", alignItems: "center", gap: "8px" },
    logoDot: { width: "9px", height: "9px", borderRadius: "50%", background: "#c4622d" },
    logoText: { fontFamily: "'Fraunces', serif", fontSize: "18px", color: "#2c1a0e" },
    writeBtn: { background: "#c4622d", color: "#fff", border: "none", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
    heroLabel: { fontSize: "11px", fontWeight: 600, color: "#c4622d", letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: "8px" },
    heroTitle: { fontFamily: "'Fraunces', serif", fontSize: "32px", color: "#2c1a0e", lineHeight: 1.2, marginBottom: "6px" },
    heroSub: { fontSize: "14px", color: "#a08060", marginBottom: "32px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" },
    card: { background: "#fff", borderRadius: "14px", border: "1px solid #ede5d8", overflow: "hidden" },
    featuredCard: { background: "#fdf8f4", borderRadius: "14px", border: "1px solid #ede5d8", overflow: "hidden", gridColumn: "span 2" },
    cardBody: { padding: "16px" },
    tag: { display: "inline-block", fontSize: "11px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", marginBottom: "10px" },
    cardTitle: { fontFamily: "'Fraunces', serif", fontSize: "15px", color: "#2c1a0e", lineHeight: 1.35, marginBottom: "6px" },
    featuredTitle: { fontFamily: "'Fraunces', serif", fontSize: "19px", color: "#2c1a0e", lineHeight: 1.25, marginBottom: "6px" },
    cardDesc: { fontSize: "12px", color: "#a08060", lineHeight: 1.65, marginBottom: "14px" },
    cardFooter: { display: "flex", alignItems: "center", justifyContent: "space-between" },
    cardAuthor: { fontSize: "11px", color: "#c4a882" },
    readLink: { fontSize: "11px", fontWeight: 600, color: "#c4622d", letterSpacing: "0.04em", textDecoration: "none" },
    deleteBtn: { fontSize: "11px", fontWeight: 600, color: "#b04040", background: "#fce8e8", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },
  }

  return (
    <div style={s.page}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={s.header}>
          <div style={s.logoWrap}>
            <div style={s.logoDot} />
            <span style={s.logoText}>Inkwell</span>
          </div>
          <Link to="/create-post">
            <button style={s.writeBtn}>+ Write</button>
          </Link>
        </div>

        <div style={s.heroLabel}>Featured Collection</div>
        <div style={s.heroTitle}>Ideas worth <em style={{ color: "#c4622d", fontStyle: "italic" }}>reading.</em></div>
        <div style={s.heroSub}>Handpicked stories from curious minds.</div>

        <div style={s.grid}>
          {posts.map((post, i) => (
            <div key={i} style={post.featured ? s.featuredCard : s.card}>
              <div style={{ height: "3px", background: post.accent }} />
              <div style={s.cardBody}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ ...s.tag, marginBottom: 0, ...post.tagStyle }}>{post.tag}</span>
                  <button
  style={s.deleteBtn}
  onClick={() => {
    if (confirm("Delete this post?")) handleDelete(post.slug)
  }}
>
  Delete
</button>
                </div>
                <div style={post.featured ? s.featuredTitle : s.cardTitle}>{post.title}</div>
                <div style={s.cardDesc}>{post.desc}</div>
                <div style={s.cardFooter}>
                  <span style={s.cardAuthor}>{post.author} · {post.date}</span>
                  <Link to={`/posts/${post.slug}`} style={s.readLink}>READ →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Posts