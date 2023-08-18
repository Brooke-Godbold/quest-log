import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "../../../services/apiAuth";

export function useSignup() {
  const { isLoading: isSigningUp, mutate: signup } = useMutation({
    mutationFn: ({ email, password }) => signupApi({ email, password }),
    onError: (err) => console.log(err),
  });

  return { isSigningUp, signup };
}
