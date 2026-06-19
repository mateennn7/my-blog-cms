import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { AuthLayout } from "@/components/app/auth-layout.tsx"
import { SignIn } from "./components/app/sign-in.tsx"
import Posts from "./components/app/posts.tsx"
import RenderPost from "./components/app/render-post.tsx"
import Tiptap from "./components/app/create-posts.tsx"

const root = document.getElementById("root")
ReactDOM.createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route element={<AuthLayout />}>
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:slug" element={<RenderPost />} />
            <Route path="/create-post" element={<Tiptap />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)