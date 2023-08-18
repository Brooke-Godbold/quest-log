import supabase from "./supabase";

export async function getProfileByEmail(email) {
  if (!email || email === "") return null;

  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("email", email);

  if (error) throw new Error(error.message);

  return data;
}

export async function addProfile(profileData) {
  console.log("PROFILE ADD: ", profileData);

  const { data, error } = await supabase
    .from("profile")
    .insert(profileData)
    .select();

  if (error) throw new Error(error.message);

  return data;
}
