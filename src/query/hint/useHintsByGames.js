import { useQuery } from '@tanstack/react-query';
import { getHintsByGameIds } from '../../services/apiHints';

export function useHintsByGameIds(gameIds) {
  const {
    isLoading,
    isFetching,
    data: hintData,
    isError,
  } = useQuery({
    queryKey: ['hints', gameIds],
    queryFn: () => getHintsByGameIds(gameIds),
  });

  return { isLoading, isFetching, hintData, isError };
}
