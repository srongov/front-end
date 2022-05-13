import React from "react";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";
import { POSTS_QUERY } from "../pages/Index";

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const PostCard = ({ post }) => {
  const editHandler = () => {};

  const [deleteHandler, { loading }] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId: post.id },
    refetchQueries: [POSTS_QUERY],
  });

  return (
    <div className="card my-5" style={{ width: "30rem", margin: "0 auto" }}>
      <div className="card-body">
        <p className="card-text" style={{ fontSize: "1.1rem" }}>
          {loading ? "Deleting..." : post.body}
        </p>

        <small
          className="text-muted d-block my-3 mt-4"
          style={{ alignContent: "end", textAlign: "end" }}
        >
          <p className="card-text">Posted by: {post.username}</p>
          {moment(post.createdAt).fromNow()}
        </small>
        <button
          disbaled={loading}
          className="btn btn-primary btn-sm mr-3"
          onClick={editHandler}
        >
          Edit
        </button>
        <button
          disabled={loading}
          className="btn btn-danger btn-sm"
          onClick={deleteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;
