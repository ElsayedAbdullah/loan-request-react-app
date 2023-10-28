import React, { useContext } from "react";
import { postsContext } from "../contexts/postsContext.js";
import { Link } from "react-router-dom";

function PostsList() {
  const posts = useContext(postsContext);
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <div>
            <h2>{post.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PostsList;
