import { useMutation } from "@tanstack/react-query"

type UpdateProfileInput = {
  username?: string
  full_name?: string
  github_username?: string
}

async function updateProfile(data: UpdateProfileInput) {
  const res = await fetch("/api/admin/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const { error } = await res.json()
    throw new Error(error || "Failed to update profile")
  }

  return res.json()
}

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: updateProfile,
  })
