'use server';

import { SignInData } from '@/lib/services/auth/auth-types';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(data: SignInData) {
  const supabase = await createServerSupabaseClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

// export async function signup(formData: FormData) {
//   const supabase = await createServerSupabaseClient();

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   };

//   const { error } = await supabase.auth.signUp(data);

//   if (error) {
//     redirect('/error');
//   }

//   revalidatePath('/', 'layout');
//   redirect('/');
// }
