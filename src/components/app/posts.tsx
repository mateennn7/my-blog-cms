import React from "react"
import { Link } from "react-router"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { Button } from "../ui/button"

function Posts() {
  const posts = [
    {
      title: "Post 1",
      author: "Author 1",
      slug: "post-1",
    },
    {
      title: "Post 2",
      author: "Author 2",
      slug: "post-2",
    },
    {
      title: "Post 3",
      author: "Author 3",
      slug: "post-3",
    },
    {
      title: "Post 3",
      author: "Author 1",
      slug: "post-3",
    },
    {
      title: "Post 4",
      author: "Author 2",
      slug: "post-4",
    },
    {
      title: "Create new Post",
      slug: "create-post",
      description: "Create a new post",
    },
  ]
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
      <Button variant={"secondary"}>
        <Link to="/create-post" className="text-blue-500">
          Create Post
        </Link>
      </Button>
      {posts.map((post, index) => (
        <Card key={index}>
          <CardHeader>{post.title}</CardHeader>
          <CardContent>
            <CardDescription>By {post.author}</CardDescription>
            <Button>
              <Link to={`/posts/${post.slug}`} className="text-blue-500">
                Read more
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Posts
