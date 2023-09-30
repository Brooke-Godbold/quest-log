import supabase from './supabase';

export async function getGames(searchQuery) {
  if (searchQuery?.length < 3) return null;

  const { data: games, error } = await supabase
    .from('game')
    .select('*')
    .ilike('name', `%${searchQuery}%`);

  if (error) {
    console.error(error);
  }

  return games;
}

export async function getGame(id) {
  if (!id) return null;

  const { data: games, error } = await supabase
    .from('game')
    .select('*')
    .eq('id', id)
    .limit(1)
    .single();

  if (error) {
    console.error(error);
  }

  return games;
}

export async function getGamesByIds(ids) {
  if (!ids) return [];

  const { data, error } = await supabase.from('game').select('*').in('id', ids);

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getAllGames() {
  const { data: games, error } = await supabase.from('game').select('*');

  if (error) {
    console.error(error);
  }

  return games;
}

export async function addGame(gameData) {
  const { data: game, error } = await supabase
    .from('game')
    .insert(gameData)
    .select()
    .single();

  if (error) {
    console.error(error);
  }

  return game;
}
