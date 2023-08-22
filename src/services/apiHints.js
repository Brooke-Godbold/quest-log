import supabase from "./supabase";

export async function getHints(data) {
  if (!data.id) return null;

  const { data: hints, error } = await supabase
    .from("hint")
    .select("*")
    .eq(data.by, data.id);

  if (error) {
    console.error(error);
  }

  return hints;
}

export async function getHintsByHintIdList(hintIds) {
  const { data: hints, error } = await supabase
    .from("hint")
    .select("*")
    .in("id", hintIds);

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

export async function deleteHint(id) {
  const { error } = await supabase.from("hint").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error);
  }
}
