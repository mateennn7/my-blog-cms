import { BrowserRouter, Routes, Route } from "react-router"
import Posts from "./components/app/posts"
import CreatePost from "./components/app/create-posts"
import RenderPost from "./components/app/render-post"
import SignIn from "./components/app/sign-in"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:slug" element={<RenderPost />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}