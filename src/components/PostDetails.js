import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { postsContext } from "../contexts/postsContext.js";

function PostDetails() {
  let { postId } = useParams();
  const posts = useContext(postsContext);
  const post = posts.find((p) => p.id === Number(postId));

  if (post) {
    return (
      <div>
        <h1 style={{ color: "green" }}>Post Details</h1>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>
    );
  } else {
    return (
      <h1 style={{ textAlign: "center" }}>
        This post with id: {postId} is not exist
      </h1>
    );
  }
}

export default PostDetails;
