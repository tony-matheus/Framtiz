import { createServerSupabaseClient } from "@/lib/supabase/server"
import { User } from "./auth-types"

// Server-side functions
export const serverAuthService = {
  async getCurrentUser(): Promise<User | null> {
    const supabase = await createServerSupabaseClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    const { data: profile, ...rest } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (!profile) {
      return null
    }

    return {
      id: user.id,
      email: user.email!,
      username: user.user_metadata.username,
      fullName: profile.full_name,
      avatarUrl: profile.avatar_url,
      isAdmin: profile.is_admin,
      githubUsername: profile.github_username,
      profileId: profile.id,
    }
  },

  async isAdmin(): Promise<boolean> {
    const user = await this.getCurrentUser()
    return !!user?.isAdmin
  },
}
