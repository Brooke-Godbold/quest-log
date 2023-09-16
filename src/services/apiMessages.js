import supabase from './supabase';

export async function GetMessagesByUserId(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .or(`userIdA.eq.${userId}, userIdB.eq.${userId}`);

  if (error) throw new Error(error.message);

  return data;
}

export async function UpdateMessagesById(conversationData) {
  const { data, error } = await supabase
    .from('messages')
    .update({ conversation: conversationData.data })
    .eq('id', conversationData.messagesId);

  if (error) throw new Error(error.message);

  return data;
}

export async function addMessage(conversationData) {
  const { data, error } = await supabase
    .from('messages')
    .insert(conversationData);

  if (error) throw new Error(error.message);

  return data;
}
