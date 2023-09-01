import { useQuery } from "@tanstack/react-query";
import { getHintsByListContainsValue } from "../../services/apiHints";

export function useHintsByVotes(data) {
  const {
    isLoading: isLoadingHints,
    isFetching: isFetchingHints,
    data: hintData,
    isError: isHintsError,
  } = useQuery({
    queryKey: ["hints", data.column, data.value],
    queryFn: () => getHintsByListContainsValue(data),
  });

  return {
    isLoadingHints,
    isFetchingHints,
    hintData,
    isHintsError,
  };
}
