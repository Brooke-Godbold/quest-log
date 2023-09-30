import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addGame as addGameApi } from '../../services/apiGames';

export function useAddGame() {
  const queryClient = useQueryClient();

  const { mutate: addGame, isLoading } = useMutation({
    mutationFn: addGameApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['game'],
      });
    },
  });

  return { addGame, isLoading };
}
