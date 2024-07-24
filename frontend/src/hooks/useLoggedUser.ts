import { useQuery } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { getLoggedUser } from "../services/apiUsers";

export function useLoggedUser() {
  const [cookies] = useCookies();

  const {
    data: loggedUser,
    error,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getLoggedUser(cookies.token),
    retry: 1,
  });

  return { loggedUser, error, isPending, isSuccess };
}
