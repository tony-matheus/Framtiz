import { z } from "zod"

export const EMPLOYMENT_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
]

export const ExperienceInputSchema = z.object({
  company: z.string().min(1),
  position: z.string().min(1),
  location: z.string().min(1),
  employmentType: z.string().default(EMPLOYMENT_TYPES[0].value),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  isCurrentPosition: z.boolean().default(true),
  description: z.string().optional().default(""),
})

export type Experience = ExperienceInput & {
  id: number
}

export type ExperienceInput = z.infer<typeof ExperienceInputSchema>
