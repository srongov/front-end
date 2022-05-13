import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("__token");
    navigate("/login");
  }, []);

  return <></>;
};

export default Logout;
