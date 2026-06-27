import { useParams, Link } from "react-router"

const PURPLE = "#7c3aed"
const GRAD = "linear-gradient(135deg, #7c3aed, #a855f7)"

const tagColors: Record<string, { bg: string; color: string }> = {
  React:       { bg: "rgba(124,58,237,0.1)",  color: "#7c3aed" },
  TypeScript:  { bg: "rgba(59,130,246,0.1)",  color: "#3b82f6" },
  Performance: { bg: "rgba(16,185,129,0.1)",  color: "#10b981" },
  WebSockets:  { bg: "rgba(245,158,11,0.1)",  color: "#f59e0b" },
  CMS:         { bg: "rgba(236,72,153,0.1)",  color: "#ec4899" },
  DevOps:      { bg: "rgba(239,68,68,0.1)",   color: "#ef4444" },
}

const postData: Record<string, { title: string; author: string; date: string; tag: string; content: string }> = {
  "post-1": {
    title: "Getting Started with React - The fundamentals you actually need",
    author: "Sarah Chen", date: "Mar 15, 2024", tag: "React",
    content: `React is a JavaScript library for building user interfaces. At its core, it's about components - small, reusable pieces of UI that you compose together to build complex applications.\n\nThe most important mental shift when learning React is thinking in components. Instead of thinking about pages, think about small, isolated pieces: a button, a card, a navigation bar. Each component manages its own appearance and can receive data from its parent via props.\n\nState is what makes React powerful. When state changes, React automatically re-renders the component - you never have to manually update the DOM. This is the core idea behind React's declarative approach: you describe what the UI should look like, and React handles the rest.\n\nStart small. Build a counter. Then a todo list. Then something you actually want to use. The fundamentals click when you build real things.`,
  },
  "post-2": {
    title: "Advanced TypeScript Patterns",
    author: "Mike Johnson", date: "Mar 12, 2024", tag: "TypeScript",
    content: `TypeScript is more than just types on top of JavaScript. When used well, it shapes the architecture of your application and catches entire classes of bugs before they reach production.\n\nGeneric types are where TypeScript gets truly powerful. Instead of writing the same function five times for five different types, you write it once and let TypeScript infer the correct type at the call site.\n\nDiscriminated unions are another pattern worth mastering. They let you model state machines in a way that makes impossible states unrepresentable - a concept that eliminates a huge category of runtime errors.\n\nThe goal is not to make TypeScript happy. The goal is to write code that is correct by construction, where the types guide you toward the right implementation.`,
  },
  "post-3": {
    title: "Web Performance Optimization",
    author: "Emma Rodriguez", date: "Mar 10, 2024", tag: "Performance",
    content: `Performance is a feature. Users leave sites that feel slow - and they rarely come back. The good news is that most performance wins come from a small set of high-impact changes.\n\nStart with images. They are almost always the biggest contributor to page weight. Use modern formats like WebP, lazy load everything below the fold, and always specify width and height to prevent layout shifts.\n\nJavaScript bundle size is the next frontier. Code splitting lets you load only what a page needs, when it needs it. Dynamic imports are your best friend here - split at the route level first, then optimize further if needed.\n\nFinally, measure before you optimize. Chrome DevTools and Lighthouse give you a clear picture of where time is actually being spent. Gut feelings about performance are almost always wrong.`,
  },
  "post-4": {
    title: "Building Real-time Apps",
    author: "David Kim", date: "Mar 8, 2024", tag: "WebSockets",
    content: `Real-time applications feel alive. Whether it's a chat app, a live dashboard, or a collaborative editor, the ability to push updates instantly changes how users experience your product.\n\nWebSockets are the foundation. Unlike HTTP, which is request-response, WebSockets maintain a persistent connection between client and server. Either side can send data at any time, with no overhead of establishing a new connection.\n\nOn the client, the WebSocket API is surprisingly simple. You open a connection, listen for messages, and send data as needed. The complexity lies in handling reconnections, dealing with network interruptions, and scaling on the server side.\n\nFor most use cases, libraries like Socket.io abstract away the hard parts. But understanding the underlying protocol makes you a better debugger when things go wrong.`,
  },
  "post-5": {
    title: "Improved UI",
    author: "You", date: "Jun 19, 2026", tag: "CMS",
    content: `This blog started as a toy project with intentional bugs. The redirection was not working - authenticated routes would kick users back to login on every refresh. The UI was plain and lifeless.\n\nFixing the auth issue required understanding how Jotai atoms work with localStorage. The key insight was that atomWithStorage has a hydration delay, so reading directly from localStorage on initialization was the more reliable approach.\n\nThe UI redesign was guided by a simple principle: warmth. A cream background, terracotta accents, and a serif font for headings transform a functional app into something that feels considered and personal.\n\nGood UI is not about flashy effects. It's about making the person on the other side feel at home.`,
  },
  "post-6": {
    title: "CI/CD Pipelines Simplified",
    author: "Arun Patel", date: "Mar 5, 2024", tag: "DevOps",
    content: `Continuous Integration and Continuous Deployment sound intimidating, but the core idea is simple: automate the repetitive parts of getting code from your laptop to production.\n\nCI means every push to your repository triggers an automated run of your tests. If tests pass, you know the code works. If they fail, you know immediately - not three days later when a user reports a bug.\n\nCD takes it further: if tests pass, deploy automatically. No manual steps, no deployment checklists, no "who pushed what when." The pipeline is the source of truth.\n\nStart with GitHub Actions. It's free for public repos, deeply integrated with GitHub, and has a marketplace of pre-built actions for almost everything you need. Write your first workflow, watch it run, and you'll never want to go back to manual deployments.`,
  },
}

function RenderPost() {
  const { slug } = useParams()
  const dark = localStorage.getItem("theme") === "dark"

  const t = dark
    ? { bg: "#0d0b14", card: "#131020", border: "#1e1a2e", text: "#f0eeff", muted: "#8a85a0", mutedBg: "#1a1628" }
    : { bg: "#f8f7fc", card: "#ffffff", border: "#e2dff0", text: "#0f0d1a", muted: "#6b6880", mutedBg: "#eeecf8" }

  const hardcoded = slug ? postData[slug] : null
  const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]")
  const savedPost = savedPosts.find((p: { slug: string }) => p.slug === slug)
  const post = hardcoded || savedPost || null

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", background: t.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>✦</div>
        <div style={{ fontSize: 48, fontWeight: 800, color: t.border, marginBottom: 12 }}>404</div>
        <div style={{ fontSize: 16, color: t.muted, marginBottom: 28 }}>This post does not exist.</div>
        <Link to="/" style={{ fontSize: 13, fontWeight: 700, color: PURPLE, textDecoration: "none", background: "rgba(124,58,237,0.08)", padding: "10px 20px", borderRadius: 8 }}>
          Back to posts
        </Link>
      </div>
    )
  }

  const tc = tagColors[post.tag] || { bg: "rgba(124,58,237,0.1)", color: PURPLE }
  const paragraphs = String(post.content).split("\n\n").filter(Boolean) as string[]

  return (
    <div style={{ background: t.bg, minHeight: "100vh", fontFamily: "system-ui, sans-serif", color: t.text }}>

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
        <Link to="/" style={{ fontSize: 13, fontWeight: 600, color: t.muted, textDecoration: "none" }}>
          Back to posts
        </Link>
      </nav>

      {/* Top gradient bar */}
      <div style={{ height: 4, background: GRAD }} />

      {/* Article */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "52px 24px 80px" }}>

        {/* Tag + date */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 999, background: tc.bg, color: tc.color }}>
            {post.tag}
          </span>
          <span style={{ fontSize: 12, color: t.muted }}>{post.date}</span>
        </div>

        {/* Title */}
        <h1 style={{ margin: "0 0 20px", fontSize: 36, fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
          {post.title}
        </h1>

        {/* Author */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40, paddingBottom: 32, borderBottom: `1px solid ${t.border}` }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: GRAD, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
            {post.author[0]}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{post.author}</div>
            <div style={{ fontSize: 12, color: t.muted }}>Author</div>
          </div>
        </div>

        {/* Content */}
        <div>
          {paragraphs.map((para, i) => (
            <p key={i} style={{ margin: "0 0 24px", fontSize: 16, lineHeight: 1.8, color: i === 0 ? t.text : t.muted }}>
              {para}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ fontSize: 13, fontWeight: 700, color: PURPLE, textDecoration: "none", background: "rgba(124,58,237,0.08)", padding: "10px 18px", borderRadius: 8 }}>
            Back to posts
          </Link>
          <span style={{ fontSize: 12, color: t.muted }}>✦ BlogCMS</span>
        </div>
      </div>
    </div>
  )
}

export default RenderPost