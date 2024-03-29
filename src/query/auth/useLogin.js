import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';

export function useLogin() {
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password, captchaToken }) =>
      loginApi({ email, password, captchaToken }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
    },
    onError: (err) => console.log(err),
  });

  return { login, isLoggingIn };
}
