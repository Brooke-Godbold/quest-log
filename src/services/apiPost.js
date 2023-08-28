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

export async function getPostById(id) {
  if (!id) return null;

  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("id", id)
    .single()
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function getReplyByPostId(postId) {
  if (!postId) return null;

  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("postId", postId);

  if (error) throw new Error(error.message);

  return data;
}

export async function addPost(postData) {
  const { data, error } = await supabase.from("post").insert(postData).select();

  if (error) throw new Error(error.message);

  return data;
}
