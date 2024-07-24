import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signup as signupRequest } from "../services/apiUsers";
import { useCookies } from "react-cookie";
import { useAuth } from "../contexts/AuthContext";

export function useSignup() {
  const navigate = useNavigate();
  const [, setCookie] = useCookies();
  const { setUser } = useAuth();

  const {
    mutate: signup,
    data: user,
    error,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: signupRequest,
    onSuccess: (data) => {
      setUser(data.user);
      setCookie("token", data.token);
      navigate("/beers");
    },
    onError: (error) => {
      alert(error);
    },
  });

  return { signup, user, error, isPending, isSuccess };
}
