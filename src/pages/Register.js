import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const REGISTER_USER_MUTATION = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const LoginPage = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const [handleRegister, { loading }] = useMutation(REGISTER_USER_MUTATION, {
    update(_, result) {
      const { token } = result.data.login;
      localStorage.setItem("__token", token);
      navigate("/");
    },

    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },

    variables: formData,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#E0E0E0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "450px",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            handleRegister();
          }}
        >
          <h3 className="text-center my-2">Register</h3>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              required
              onChange={onChange}
              name="email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              required
              onChange={onChange}
              name="username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={onChange}
              name="password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              required
              onChange={onChange}
              name="confirmPassword"
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Register"}
          </Button>
          <div className="my-2">
            {Object.keys(errors).length > 0 && (
              <div className="alert alert-danger" role="alert">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </div>
            )}
          </div>
        </Form>
        <Link to="/login">Already have an account? login</Link>
      </div>
    </div>
  );
};

export default LoginPage;
