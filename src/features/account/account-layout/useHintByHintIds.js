import { useQuery } from "@tanstack/react-query";
import { getHintsByHintIdList } from "../../../services/apiHints";

export function useHintByHintIds(hintIds) {
  const {
    isLoading,
    isFetching,
    data: hintData,
    isError,
  } = useQuery({
    queryKey: ["hints", hintIds],
    queryFn: () => getHintsByHintIdList(hintIds),
  });

  return { isLoading, isFetching, hintData, isError };
}
