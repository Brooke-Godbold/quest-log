import supabase from "./supabase";

export async function getVotes(id) {
  const { data: votes, error } = await supabase
    .from("vote")
    .select("*")
    .eq("hintId", id);

  if (error) {
    console.error(error);
  }

  return votes;
}

export async function addVote(voteData) {
  const { data: vote, error } = await supabase
    .from("vote")
    .insert(voteData)
    .select()
    .single();

  if (error) {
    console.error(error);
  }

  return vote;
}

export async function editVote(voteData) {
  const { data: vote, error } = await supabase
    .from("vote")
    .update({ isPositive: voteData.isPositive })
    .eq("id", voteData.voteId)
    .select()
    .single();

  if (error) {
    console.error(error);
  }

  return vote;
}

export async function deleteVote(id) {
  const { error } = await supabase.from("vote").delete().eq("id", id);

  if (error) {
    console.error(error);
  }
}
