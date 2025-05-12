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

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      newErrors.slug = "Slug must contain only lowercase letters, numbers, and hyphens"
    }
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.github_url.trim()) newErrors.github_url = "GitHub URL is required"
    if (formData.tech_stack.length === 0) newErrors.tech_stack = "At least one technology is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const url = project ? `/api/admin/projects/${project.id}` : "/api/admin/projects"

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
    <div className="bg-slate-900 border border-slate-800 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-mono text-slate-200">{project ? "EDIT_PROJECT" : "NEW_PROJECT"}</h3>
        <button
          onClick={onCancel}
          className="p-2 border border-slate-700 text-slate-400 hover:border-red-600 hover:text-red-300 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm font-mono mb-2">TITLE</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full bg-slate-800 border ${
                  errors.title ? "border-red-600" : "border-slate-700"
                } p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors`}
              />
              {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-slate-400 text-sm font-mono mb-2">SLUG</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className={`w-full bg-slate-800 border ${
                  errors.slug ? "border-red-600" : "border-slate-700"
                } p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors`}
              />
              {errors.slug && <p className="mt-1 text-xs text-red-400">{errors.slug}</p>}
            </div>

            <div>
              <label className="block text-slate-400 text-sm font-mono mb-2">DESCRIPTION</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full bg-slate-800 border ${
                  errors.description ? "border-red-600" : "border-slate-700"
                } p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors`}
              />
              {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-slate-400 text-sm font-mono mb-2">TECH_STACK</label>
              <div className="flex">
                <input
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors"
                  placeholder="Add technology..."
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-4 bg-slate-800 border border-purple-600 text-purple-300 ml-2"
                >
                  <Plus size={16} />
                </button>
              </div>
              {errors.tech_stack && <p className="mt-1 text-xs text-red-400">{errors.tech_stack}</p>}

              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tech_stack.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center px-2 py-1 bg-slate-800 border border-purple-900 text-purple-300 text-xs"
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
              <label className="block text-slate-400 text-sm font-mono mb-2">GITHUB_URL</label>
              <input
                type="text"
                name="github_url"
                value={formData.github_url}
                onChange={handleInputChange}
                className={`w-full bg-slate-800 border ${
                  errors.github_url ? "border-red-600" : "border-slate-700"
                } p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors`}
              />
              {errors.github_url && <p className="mt-1 text-xs text-red-400">{errors.github_url}</p>}
            </div>

            <div>
              <label className="block text-slate-400 text-sm font-mono mb-2">LIVE_URL (OPTIONAL)</label>
              <input
                type="text"
                name="live_url"
                value={formData.live_url}
                onChange={handleInputChange}
                className="w-full bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-slate-400 text-sm font-mono mb-2">IMAGE_URL</label>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 text-sm font-mono mb-2">LEVEL</label>
                <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-400 text-sm font-mono mb-2">STATUS</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-slate-700 p-3 text-slate-200 focus:border-purple-600 outline-none transition-colors"
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

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="w-4 h-4 bg-slate-800 border border-slate-700 focus:ring-purple-600"
              />
              <label htmlFor="featured" className="ml-2 text-slate-300 text-sm font-mono">
                FEATURED_PROJECT
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-transparent border border-slate-700 text-slate-300 mr-4"
          >
            CANCEL
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-transparent border-2 border-green-600 text-green-300 flex items-center hover:bg-green-900/30 transition-colors"
          >
            <Save size={16} className="mr-2" />
            <span className="font-mono">{isLoading ? "SAVING..." : "SAVE_PROJECT"}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
