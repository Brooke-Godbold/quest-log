import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://xhkwznfhytvgvorvkcdp.supabase.co';
export const supabaseStoragePath = 'storage/v1/object/public';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
