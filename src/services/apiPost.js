import supabase from "./supabase";

export async function getPostsByUserId(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("userId", userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function addPost(postData) {
  const { data, error } = await supabase.from("post").insert(postData).select();

  if (error) throw new Error(error.message);

  return data;
}
