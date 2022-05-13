import { ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";

// apollo
import { client } from "./Apollo";

// components
import App from "./App";

// css
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
