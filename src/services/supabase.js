import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://xhkwznfhytvgvorvkcdp.supabase.co";
export const supabaseStoragePath = "storage/v1/object/public";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhoa3d6bmZoeXR2Z3ZvcnZrY2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1OTM1MTksImV4cCI6MjAwNzE2OTUxOX0.fvTiNppwZ9dJUrQhujSe9C6q-d_8SjDSt-8ib7_RiWs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
