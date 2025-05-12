import { getSupabaseClient } from '@/lib/supabase/client';
import { SignInData, SignUpData, User } from './auth-types';

// Client-side functions
export const clientAuthService = {
  async signUp(
    data: SignUpData
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          username: data.username,
          full_name: data.full_name,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  async signIn(
    data: SignInData
  ): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  async signOut(): Promise<void> {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
  },

  async getCurrentUser(): Promise<User | null> {
    const supabase = getSupabaseClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return null;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (!profile) {
      return null;
    }

    return {
      id: session.user.id,
      email: session.user.email!,
      username: profile.username,
      full_name: profile.full_name,
      avatar_url: profile.avatar_url,
      is_admin: profile.is_admin,
    };
  },
};
