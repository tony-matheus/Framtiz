"use client"

import type React from "react"

import { useState } from "react"
import { Save, X, Plus, Trash2 } from "lucide-react"
import type { Project, ProjectInput } from "@/lib/services/project-service"

interface ProjectFormProps {
  project: Project | null
  onSave: (project: Project) => void
  onCancel: () => void
}

export default function ProjectForm({
  project,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectInput>({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    tech_stack: project?.tech_stack || [],
    github_url: project?.github_url || "",
    live_url: project?.live_url || "",
    image_url: project?.image_url || "/placeholder.svg?height=300&width=500",
    level: project?.level || "LVL 75",
    status: project?.status || "ONLINE",
    featured: project?.featured || false,
  })

  const [newTech, setNewTech] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({ ...formData, [name]: checked })
  }

  const handleAddTech = () => {
    if (newTech.trim() && !formData.tech_stack.includes(newTech.trim())) {
      setFormData({
        ...formData,
        tech_stack: [...formData.tech_stack, newTech.trim()],
      })
      setNewTech("")
    }
  }

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      tech_stack: formData.tech_stack.filter((t) => t !== tech),
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.slug.trim()) newErrors.slug = "Slug is required"
    else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug =
        "Slug must contain only lowercase letters, numbers, and hyphens"
    }
    if (!formData.description.trim())
      newErrors.description = "Description is required"
    if (!formData.github_url.trim())
      newErrors.github_url = "GitHub URL is required"
    if (formData.tech_stack.length === 0)
      newErrors.tech_stack = "At least one technology is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const url = project
        ? `/api/admin/projects/${project.id}`
        : "/api/admin/projects"

      const method = project ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to save project")
      }

      const savedProject = await response.json()
      onSave(savedProject)
    } catch (error) {
      console.error("Error saving project:", error)
      alert("An error occurred while saving the project")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border border-slate-800 bg-slate-900 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-mono text-lg text-slate-200">
          {project ? "EDIT_PROJECT" : "NEW_PROJECT"}
        </h3>
        <button
          onClick={onCancel}
          className="border border-slate-700 p-2 text-slate-400 transition-colors hover:border-red-600 hover:text-red-300"
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block font-mono text-sm text-slate-400">
                TITLE
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full border bg-slate-800 ${
                  errors.title ? "border-red-600" : "border-slate-700"
                } p-3 text-slate-200 outline-none transition-colors focus:border-purple-600`}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-400">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-mono text-sm text-slate-400">
                SLUG
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className={`w-full border bg-slate-800 ${
                  errors.slug ? "border-red-600" : "border-slate-700"
                } p-3 text-slate-200 outline-none transition-colors focus:border-purple-600`}
              />
              {errors.slug && (
                <p className="mt-1 text-xs text-red-400">{errors.slug}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-mono text-sm text-slate-400">
                DESCRIPTION
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full border bg-slate-800 ${
                  errors.description ? "border-red-600" : "border-slate-700"
                } p-3 text-slate-200 outline-none transition-colors focus:border-purple-600`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-mono text-sm text-slate-400">
                TECH_STACK
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="flex-1 border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600"
                  placeholder="Add technology..."
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="ml-2 border border-purple-600 bg-slate-800 px-4 text-purple-300"
                >
                  <Plus size={16} />
                </button>
              </div>
              {errors.tech_stack && (
                <p className="mt-1 text-xs text-red-400">{errors.tech_stack}</p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tech_stack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center border border-purple-900 bg-slate-800 px-2 py-1 text-xs text-purple-300"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="ml-2 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block font-mono text-sm text-slate-400">
                GITHUB_URL
              </label>
              <input
                type="text"
                name="github_url"
                value={formData.github_url}
                onChange={handleInputChange}
                className={`w-full border bg-slate-800 ${
                  errors.github_url ? "border-red-600" : "border-slate-700"
                } p-3 text-slate-200 outline-none transition-colors focus:border-purple-600`}
              />
              {errors.github_url && (
                <p className="mt-1 text-xs text-red-400">{errors.github_url}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-mono text-sm text-slate-400">
                LIVE_URL (OPTIONAL)
              </label>
              <input
                type="text"
                name="live_url"
                value={formData.live_url}
                onChange={handleInputChange}
                className="w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-sm text-slate-400">
                IMAGE_URL
              </label>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block font-mono text-sm text-slate-400">
                  LEVEL
                </label>
                <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600"
                />
              </div>

              <div>
                <label className="mb-2 block font-mono text-sm text-slate-400">
                  STATUS
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600"
                >
                  <option value="ONLINE">ONLINE</option>
                  <option value="STABLE">STABLE</option>
                  <option value="SECURE">SECURE</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="CONNECTED">CONNECTED</option>
                  <option value="DEPLOYED">DEPLOYED</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="size-4 border border-slate-700 bg-slate-800 focus:ring-purple-600"
              />
              <label
                htmlFor="featured"
                className="ml-2 font-mono text-sm text-slate-300"
              >
                FEATURED_PROJECT
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="mr-4 border border-slate-700 bg-transparent px-4 py-2 text-slate-300"
          >
            CANCEL
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center border-2 border-green-600 bg-transparent px-4 py-2 text-green-300 transition-colors hover:bg-green-900/30"
          >
            <Save size={16} className="mr-2" />
            <span className="font-mono">
              {isLoading ? "SAVING..." : "SAVE_PROJECT"}
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
