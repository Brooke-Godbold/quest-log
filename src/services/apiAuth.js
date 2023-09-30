import supabase from './supabase';

export async function signup({ email, password, captchaToken }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { captchaToken },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password, captchaToken }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function updatePassword(passwordData) {
  const { data, error } = await supabase.auth.updateUser({
    password: passwordData.newPassword,
    options: { captchaToken: passwordData.captchaToken },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function forgottenPassword(emailData) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    emailData.email,
    {
      redirectTo: `${window.location.origin}/reset-password`,
      captchaToken: emailData.captchaToken,
    }
  );

  if (error) throw new Error(error.message);

  return data;
}
