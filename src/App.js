import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Nav from "./components/Nav";

// pages
import IndexPage from "./pages/Index";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import LogoutPage from "./pages/Logout";

const Routing = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
