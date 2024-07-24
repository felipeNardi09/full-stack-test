import { useQuery } from "@tanstack/react-query";
import { getBeers as fetchBeers } from "../services/apiBeers";

export function useGetBeers() {
  const {
    data: beers,
    error,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: ["beers"],
    queryFn: fetchBeers,
  });

  return { beers, error, isPending, isSuccess };
}
