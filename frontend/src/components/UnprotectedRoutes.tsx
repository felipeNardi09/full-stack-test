import { ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface IUnprotectedRoutes {
  children: ReactNode;
}

const UnprotectedRoutes = ({ children }: IUnprotectedRoutes) => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const auth = useAuth();

  useEffect(
    function () {
      if (cookies.token) {
        navigate("/beers");
      }

      auth?.setUser(null);
    },
    [cookies.token, navigate, auth],
  );

  return <>{children}</>;
};

export default UnprotectedRoutes;
