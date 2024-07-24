import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../services/apiUsers";
import { useCookies } from "react-cookie";
import { useAuth } from "../contexts/AuthContext";

export function useLogin() {
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    mutate: login,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (user) => {
      setCookie("token", user.token);
      setUser(user.user);
      navigate("/beers");
    },
    onError: (error) => {
      alert(error);
    },
  });

  return { login, error, isPending, isSuccess };
}
