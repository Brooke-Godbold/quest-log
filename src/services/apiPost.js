import supabase, { supabaseStoragePath, supabaseUrl } from "./supabase";

export async function getAllPosts() {
  const { data, error } = await supabase.from("post").select("*");

  if (error) throw new Error(error.message);

  return data;
}

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

export async function getPostsByContent(content) {
  if (!content) return null;

  const { data, error } = await supabase
    .from("post")
    .select("*")
    .ilike("description", `%${content}%`);

  if (error) throw new Error(error.message);

  return data;
}

export async function addPost(postData) {
  let newPostData = postData;

  if (postData.image) {
    const imageName = `${Math.random()}`.replaceAll(".", "");

    const { error: storageError } = await supabase.storage
      .from("images")
      .upload(imageName, postData.image);

    if (storageError) {
      console.error(storageError);
      throw new Error("Could not upload Avatar");
    } else {
      const imageUrl = `${supabaseUrl}/${supabaseStoragePath}/images/${imageName}`;

      newPostData = {
        ...newPostData,
        data: { ...newPostData.data, imageUrl },
      };
    }
  }

  const { data, error } = await supabase
    .from("post")
    .insert(newPostData.data)
    .single()
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function updatePost(postData) {
  const { data, error } = await supabase
    .from("post")
    .update(postData.data)
    .eq(postData.by, postData.id);

  if (error) throw new Error(error.message);

  return data;
}
