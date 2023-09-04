import supabase from "./supabase";

export async function getGames(searchQuery) {
  const { data: games, error } = await supabase
    .from("game")
    .select("*")
    .ilike("name", `%${searchQuery}%`);

  if (error) {
    console.error(error);
  }

  return games;
}

export async function getGame(id) {
  const { data: games, error } = await supabase
    .from("game")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    console.error(error);
  }

  return games;
}

export async function getGamesByIds(ids) {
  if (!ids) return [];

  const { data, error } = await supabase.from("game").select("*").in("id", ids);

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getAllGames() {
  const { data: games, error } = await supabase.from("game").select("*");

  if (error) {
    console.error(error);
  }

  return games;
}
