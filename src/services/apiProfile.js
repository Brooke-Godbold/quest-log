import supabase, { supabaseStoragePath, supabaseUrl } from './supabase';

export async function getProfileByEmail(email) {
  if (!email || email === '') return null;

  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('email', email);

  if (error) throw new Error(error.message);

  return data;
}

export async function getProfileByUsername(username) {
  if (!username || username === '') return null;

  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('username', username)
    .single()
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getProfilesByUsername(username) {
  if (!username || username === '') return null;

  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .ilike('username', `%${username}%`);

  if (error) throw new Error(error.message);

  return data;
}

export async function getProfileByUserId(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .eq('userId', userId)
    .single()
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getProfilesByValues({ column, values }) {
  if (values.length === 0) return null;

  const { data, error } = await supabase
    .from('profile')
    .select('*')
    .contains(column, values);

  if (error) throw new Error(error.message);

  return data;
}

export async function addProfile(profileData) {
  const { data, error } = await supabase
    .from('profile')
    .insert(profileData)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function updateProfile(profileData) {
  let newProfileData = profileData;

  if (profileData.avatar) {
    const avatarName = `${Math.random()}`.replaceAll('.', '');

    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(avatarName, profileData.avatar);

    if (storageError) {
      console.error(storageError);
      throw new Error(storageError);
    } else {
      const avatarPath = `${supabaseUrl}/${supabaseStoragePath}/avatars/${avatarName}`;

      newProfileData = {
        ...newProfileData,
        data: { ...newProfileData.data, avatarUrl: avatarPath },
      };

      if (newProfileData.oldAvatarUrl) {
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove([
            `${newProfileData.oldAvatarUrl.replaceAll(
              `${supabaseUrl}/${supabaseStoragePath}/avatars/`,
              ''
            )}`,
          ]);

        if (deleteError) throw new Error(deleteError);
      }
    }
  }

  const { data, error } = await supabase
    .from('profile')
    .update(newProfileData.data)
    .eq('userId', newProfileData.userId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
