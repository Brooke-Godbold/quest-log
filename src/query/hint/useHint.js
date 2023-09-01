import { useQuery } from "@tanstack/react-query";
import { getHints } from "../../services/apiHints";

export function useHint(data) {
  const {
    isLoading,
    isFetching,
    data: hintData,
    isError,
  } = useQuery({
    queryKey: ["hints", data.id],
    queryFn: () => getHints(data),
  });

  return { isLoading, isFetching, hintData, isError };
}
