
import { useParams, Link, useNavigate } from "react-router"

const postData: Record<string, { title: string; author: string; date: string; tag: string; tagStyle: React.CSSProperties; content: string }> = {
  "post-1": {
    title: "Getting Started with React — The fundamentals you actually need",
    author: "Sarah Chen",
    date: "Mar 15, 2024",
    tag: "React",
    tagStyle: { background: "#fbeee8", color: "#c4622d" },
    content: `React is a JavaScript library for building user interfaces. At its core, it's about components — small, reusable pieces of UI that you compose together to build complex applications.

The most important mental shift when learning React is thinking in components. Instead of thinking about pages, think about small, isolated pieces: a button, a card, a navigation bar. Each component manages its own appearance and can receive data from its parent via props.

State is what makes React powerful. When state changes, React automatically re-renders the component — you never have to manually update the DOM. This is the core idea behind React's declarative approach: you describe what the UI should look like, and React handles the rest.

Start small. Build a counter. Then a todo list. Then something you actually want to use. The fundamentals click when you build real things.`,
  },
  "post-2": {
    title: "Advanced TypeScript Patterns",
    author: "Mike Johnson",
    date: "Mar 12, 2024",
    tag: "TypeScript",
    tagStyle: { background: "#fdf3e3", color: "#b07020" },
    content: `TypeScript is more than just types on top of JavaScript. When used well, it shapes the architecture of your application and catches entire classes of bugs before they reach production.

Generic types are where TypeScript gets truly powerful. Instead of writing the same function five times for five different types, you write it once and let TypeScript infer the correct type at the call site.

Discriminated unions are another pattern worth mastering. They let you model state machines in a way that makes impossible states unrepresentable — a concept that eliminates a huge category of runtime errors.

The goal isn't to make TypeScript happy. The goal is to write code that is correct by construction, where the types guide you toward the right implementation.`,
  },
  "post-3": {
    title: "Web Performance Optimization",
    author: "Emma Rodriguez",
    date: "Mar 10, 2024",
    tag: "Performance",
    tagStyle: { background: "#fce8e8", color: "#b04040" },
    content: `Performance is a feature. Users leave sites that feel slow — and they rarely come back. The good news is that most performance wins come from a small set of high-impact changes.

Start with images. They are almost always the biggest contributor to page weight. Use modern formats like WebP, lazy load everything below the fold, and always specify width and height to prevent layout shifts.

JavaScript bundle size is the next frontier. Code splitting lets you load only what a page needs, when it needs it. Dynamic imports are your best friend here — split at the route level first, then optimize further if needed.

Finally, measure before you optimize. Chrome DevTools and Lighthouse give you a clear picture of where time is actually being spent. Gut feelings about performance are almost always wrong.`,
  },
  "post-4": {
    title: "Building Real-time Apps",
    author: "David Kim",
    date: "Mar 8, 2024",
    tag: "WebSockets",
    tagStyle: { background: "#fbeee8", color: "#c4622d" },
    content: `Real-time applications feel alive. Whether it's a chat app, a live dashboard, or a collaborative editor, the ability to push updates instantly changes how users experience your product.

WebSockets are the foundation. Unlike HTTP, which is request-response, WebSockets maintain a persistent connection between client and server. Either side can send data at any time, with no overhead of establishing a new connection.

On the client, the WebSocket API is surprisingly simple. You open a connection, listen for messages, and send data as needed. The complexity lies in handling reconnections, dealing with network interruptions, and scaling on the server side.

For most use cases, libraries like Socket.io abstract away the hard parts. But understanding the underlying protocol makes you a better debugger when things go wrong.`,
  },
  "post-5": {
    title: "Improved UI",
    author: "You",
    date: "Jun 19, 2026",
    tag: "CMS",
    tagStyle: { background: "#fdf3e3", color: "#b07020" },
    content: `This blog started as a toy project with intentional bugs. The redirection wasn't working — authenticated routes would kick users back to login on every refresh. The UI was plain and lifeless.

Fixing the auth issue required understanding how Jotai atoms work with localStorage. The key insight was that atomWithStorage has a hydration delay, so reading directly from localStorage on initialization was the more reliable approach.

The UI redesign was guided by a simple principle: warmth. A cream background, terracotta accents, and a serif font for headings transform a functional app into something that feels considered and personal.

Good UI isn't about flashy effects. It's about making the person on the other side feel at home.`,
  },
  "post-6": {
    title: "CI/CD Pipelines Simplified",
    author: "Arun Patel",
    date: "Mar 5, 2024",
    tag: "DevOps",
    tagStyle: { background: "#fce8e8", color: "#b04040" },
    content: `Continuous Integration and Continuous Deployment sound intimidating, but the core idea is simple: automate the repetitive parts of getting code from your laptop to production.

CI means every push to your repository triggers an automated run of your tests. If tests pass, you know the code works. If they fail, you know immediately — not three days later when a user reports a bug.

CD takes it further: if tests pass, deploy automatically. No manual steps, no deployment checklists, no "who pushed what when." The pipeline is the source of truth.

Start with GitHub Actions. It's free for public repos, deeply integrated with GitHub, and has a marketplace of pre-built actions for almost everything you need. Write your first workflow, watch it run, and you'll never want to go back to manual deployments.`,
  },
}

function RenderPost() {
  const { slug } = useParams()
  const navigate = useNavigate()

  // First check hardcoded posts, then check localStorage
  const hardcoded = slug ? postData[slug] : null
  const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]")
  const savedPost = savedPosts.find((p: { slug: string }) => p.slug === slug)

  const post = hardcoded || savedPost || null

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", background: "#faf6f1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: "48px", color: "#ede5d8", marginBottom: "16px" }}>404</div>
        <div style={{ fontSize: "16px", color: "#a08060", marginBottom: "24px" }}>This post doesn't exist.</div>
        <Link to="/posts" style={{ fontSize: "13px", fontWeight: 600, color: "#c4622d", textDecoration: "none" }}>← Back to stories</Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#faf6f1", fontFamily: "'DM Sans', sans-serif", padding: "28px 24px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>

        <Link to="/posts" style={{ fontSize: "13px", color: "#a08060", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "40px" }}>
          ← Back to stories
        </Link>

        <div style={{ marginBottom: "16px" }}>
          <span style={{ fontSize: "11px", fontWeight: 500, padding: "3px 10px", borderRadius: "20px", ...post.tagStyle }}>
            {post.tag}
          </span>
        </div>

        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "32px", color: "#2c1a0e", lineHeight: 1.2, marginBottom: "16px" }}>
          {post.title}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "40px", paddingBottom: "24px", borderBottom: "1px solid #ede5d8" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#fbeee8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 600, color: "#c4622d" }}>
            {post.author[0]}
          </div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 500, color: "#2c1a0e" }}>{post.author}</div>
            <div style={{ fontSize: "11px", color: "#c4a882" }}>{post.date}</div>
          </div>
        </div>

        <div>
          {post.content.split("\n\n").map((para: string, i: number) => (
            <p key={i} style={{ fontSize: "16px", color: "#4a3020", lineHeight: 1.85, marginBottom: "24px" }}>
              {para}
            </p>
          ))}
        </div>

        <div style={{ marginTop: "56px", paddingTop: "24px", borderTop: "1px solid #ede5d8", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "#c4a882" }}>Thanks for reading</span>
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {savedPost && (
              <button
                onClick={() => {
                  if (confirm("Delete this post?")) {
                    const saved = JSON.parse(localStorage.getItem("posts") || "[]")
                    const updated = saved.filter((p: { slug: string }) => p.slug !== slug)
                    localStorage.setItem("posts", JSON.stringify(updated))
                    navigate("/posts")
                  }
                }}
                style={{ fontSize: "12px", fontWeight: 600, color: "#b04040", background: "#fce8e8", border: "none", borderRadius: "6px", padding: "6px 14px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              >
                Delete post
              </button>
            )}
            <Link to="/posts" style={{ fontSize: "13px", fontWeight: 600, color: "#c4622d", textDecoration: "none" }}>
              More stories →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RenderPost