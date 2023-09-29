import supabase from './supabase';

export async function getHints(data) {
  if (!data.id) return null;

  const { data: hints, error } = await supabase
    .from('hint')
    .select('*')
    .eq(data.by, data.id);

  if (error) {
    console.error(error);
  }

  return hints;
}

export async function getHintsByHintIdList(hintIds) {
  const { data: hints, error } = await supabase
    .from('hint')
    .select('*')
    .in('id', hintIds);

  if (error) {
    console.error(error);
  }

  return hints;
}

export async function getHintsByGameIds(gameIds) {
  if (!gameIds) return null;

  const { data, error } = await supabase
    .from('hint')
    .select('*')
    .in('gameId', gameIds);

  if (error) console.error(error);

  return data;
}

export async function getHintsByListContainsValue(data) {
  if (!data.value || data.column === 'user') return null;

  const { data: hints, error } = await supabase
    .from('hint')
    .select()
    .contains(data.column, data.value);

  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return hints;
}

export async function addHint(hintData) {
  const { data: hint, error } = await supabase
    .from('hint')
    .insert(hintData)
    .select()
    .single();

  if (error) {
    console.error(error);
  }

  return hint;
}

export async function updateHint(hintData) {
  const { data: hint, error } = await supabase
    .from('hint')
    .update(hintData.data)
    .eq(hintData.by, hintData.id)
    .select();

  if (error) {
    console.error(error);
  }

  return hint;
}

export async function deleteHint(id) {
  const { error } = await supabase.from('hint').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error(error);
  }
}
