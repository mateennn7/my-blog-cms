import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

const root = document.getElementById("root")
ReactDOM.createRoot(root!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
