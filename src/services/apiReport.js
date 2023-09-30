import supabase from './supabase';

export async function addReport(reportData) {
  const { data: report, error } = await supabase
    .from('report')
    .insert(reportData)
    .select()
    .single();

  if (error) {
    console.error(error);
  }

  return report;
}
