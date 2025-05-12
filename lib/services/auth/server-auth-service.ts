import { createServerSupabaseClient } from '@/lib/supabase/server';
import { User } from './auth-types';

// Server-side functions
export const serverAuthService = {
  async getCurrentUser(): Promise<User | null> {
    const supabase = await createServerSupabaseClient();

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

  async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user?.is_admin;
  },
};
