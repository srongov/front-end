import { useMutation } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  FloatingLabel,
  Navbar,
} from "react-bootstrap";

// components
import PostCard from "../components/PostCard";

export const POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
    }
  }
`;

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
    }
  }
`;

const IndexPage = () => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { loading, data } = useQuery(POSTS_QUERY);

  const [handleCreateNewPost, { loading: creatingPost }] = useMutation(
    CREATE_POST_MUTATION,
    {
      variables: { body },
      update() {
        navigate("/");
      },
      onError(err) {
        setErrors("Cannot Create Post");
      },
      refetchQueries: [POSTS_QUERY],
    }
  );

  const user = localStorage.getItem("__token");

  if (user === null) {
    return (
      <div>
    
      </div>
    );
  }

  return (
    <>

      <Container>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            handleCreateNewPost();
          }}
          className="my-4"
        >
          <FloatingLabel
            controlId="floatingTextarea"
            label="Post Body"
            className="mb-3"
            id="body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          >
            <Form.Control as="textarea" placeholder="Create Post" />
          </FloatingLabel>
          <Button variant="primary" type="submit" disabled={loading}>
            {creatingPost ? "Creating Post..." : "Create Post"}
          </Button>
        </Form>
      </Container>

      {Object.keys(errors).length > 0 && (
        <div className="alert alert-danger" role="alert">
          {errors}
        </div>
      )}

      <h3 className="text-center">All Posts</h3>
      <div className="row mt-3">
        <div className="container">
          <div className="col-12">
            {loading ? (
              <h5 className="my-5">Loading posts...</h5>
            ) : (
              data?.getPosts?.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
