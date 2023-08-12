import supabase from "./supabase";

export async function getHints(id) {
  const { data: hints, error } = await supabase
    .from("hint")
    .select("*")
    .eq("gameId", id);

  if (error) {
    console.error(error);
  }

  return hints;
}

export async function addHint(hintData) {
  const { data: hint, error } = await supabase
    .from("hint")
    .insert(hintData)
    .select()
    .single();

  if (error) {
    console.error(error);
  }

  return hint;
}

export async function updateHintPopularity(hintData) {
  const { data: hint, error } = await supabase
    .from("hint")
    .update({ popularity: hintData.popularity })
    .eq("id", hintData.hintId)
    .select();

  if (error) {
    console.error(error);
  }

  return hint;
}
