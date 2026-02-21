import { createServerSupabaseClient } from "../supabase/server"

export type Profile = {
  username?: string
  full_name?: string
  avatar_url?: string
  github_username?: string
}

export type ProfileInput = Omit<Profile, "id" | "created_at">

export type ProfileOutput = {
  error?: {
    message: string
  }
  success: boolean
}

export const serverProfileService = {
  async updateProfile(
    profile: Partial<ProfileInput>,
    id: string,
  ): Promise<ProfileOutput> {
    const supabase = await createServerSupabaseClient()

    // TODO: Optmize this process
    if (profile.username) {
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", profile.username)
        .neq("id", id)
        .single()

      if (existingUser) {
        return {
          error: { message: "Username is already taken" },
          success: false,
        }
      }
    }

    const updates: Partial<ProfileInput> = {
      ...Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(profile).filter(([_, v]) => v !== undefined),
      ),
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      const isUniqueError = error.message.includes("duplicate key")

      return {
        error: {
          message: isUniqueError
            ? "Username is already taken"
            : "Something went wrong",
        },
        success: false,
      }
    }

    return { success: true }
  },
}
