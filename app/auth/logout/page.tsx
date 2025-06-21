import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export default async function Logout() {
  const supabase = await createServerSupabaseClient();

  await supabase.auth.signOut();

  redirect('/');
}
