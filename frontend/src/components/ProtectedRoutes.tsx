import { ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useLoggedUser } from "../hooks/useLoggedUser";
import { useAuth } from "../contexts/AuthContext";

interface IProtectedRoutes {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: IProtectedRoutes) => {
  const { loggedUser, error, isPending } = useLoggedUser();
  const auth = useAuth();
  const navigate = useNavigate();
  const [cookies] = useCookies();

  useEffect(
    function () {
      if (!cookies.token) {
        navigate("/login");
      }

      auth?.setUser(loggedUser);
    },
    [cookies.token, auth, loggedUser, navigate],
  );

  if (isPending) return <p>Loading user</p>;

  if (error) return <p>Something went wrong</p>;

  return <>{children}</>;
};

export default ProtectedRoutes;
