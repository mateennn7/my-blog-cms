import React from "react"
import { useParams } from "react-router"

function RenderPost() {
  const { slug } = useParams()
  return <div>{slug}</div>
}

export default RenderPost
