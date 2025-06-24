import { getSupabaseClient } from '@/lib/supabase/client';
import { LoginInput, SignUpData, User } from './auth-types';

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
          full_name: data.fullName,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  },

  async signIn(
    data: LoginInput
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
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!profile) {
      return null;
    }

    return {
      id: user.id,
      email: user.email!,
      profileId: profile.id,
      username: profile.username,
      fullName: profile.full_name,
      avatarUrl: profile.avatar_url,
      isAdmin: profile.is_admin,
      githubUsername: profile.github_username,
    };
  },
};
