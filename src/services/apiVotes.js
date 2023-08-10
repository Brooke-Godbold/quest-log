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
