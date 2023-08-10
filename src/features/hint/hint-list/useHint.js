import { useQuery } from "@tanstack/react-query";
import { getHints } from "../../../services/apiHints";

export function useHint(id) {
  const {
    isLoading,
    data: hintData,
    isError,
  } = useQuery({
    queryKey: ["hints"],
    queryFn: () => getHints(id),
  });

  return { isLoading, hintData, isError };
}
