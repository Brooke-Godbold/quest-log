import { useMutation } from '@tanstack/react-query';

import { signup as signupApi } from '../../services/apiAuth';

export function useSignup() {
  const { isLoading: isSigningUp, mutate: signup } = useMutation({
    mutationFn: ({ email, password, captchaToken }) =>
      signupApi({ email, password, captchaToken }),
    onError: (err) => console.log(err),
  });

  return { isSigningUp, signup };
}
