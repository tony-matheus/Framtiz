import {
  CyberFormControl,
  CyberFormField,
  CyberFormItem,
  CyberFormLabel,
  CyberFormMessage,
  CyberFormProvider,
} from "@/components/ui-custom/cyber-form/cyber-form"
import Input from "@/components/ui/input"
import {
  CyberSelect,
  CyberSelectContent,
  CyberSelectItem,
  CyberSelectTrigger,
  CyberSelectValue,
} from "@/components/ui-custom/cyber-select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Briefcase, Building, CalendarIcon, MapPin } from "lucide-react"
import { useForm } from "react-hook-form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/primitives/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  EMPLOYMENT_TYPES,
  ExperienceInput,
  ExperienceInputSchema,
} from "@/lib/schemas/experience-schemas"

export interface ExperienceFormProps {
  editingId?: number | null | undefined
  defaultValues?: ExperienceInput | undefined
  onSubmit: (arg0: ExperienceInput) => void
  onCancel: () => void
  loading: boolean
}

export default function ExpForm({
  editingId,
  defaultValues,
  onSubmit,
  onCancel,
  loading,
}: ExperienceFormProps) {
  const expForm = useForm({
    resolver: zodResolver(ExperienceInputSchema),
    defaultValues: defaultValues,
  })

  const handleConfirm = (exp: ExperienceInput) => {
    onSubmit(exp)
  }

  return (
    <CyberFormProvider {...expForm}>
      <form
        onSubmit={expForm.handleSubmit(handleConfirm)}
        className="space-y-4 p-4"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <CyberFormField
            control={expForm.control}
            name="company"
            render={({ field }) => (
              <CyberFormItem>
                <CyberFormLabel>COMPANY</CyberFormLabel>
                <CyberFormControl>
                  <Input
                    icon={<Building size={16} />}
                    {...field}
                    value={field.value ?? ""}
                  />
                </CyberFormControl>
                <CyberFormMessage />
              </CyberFormItem>
            )}
          />
          <CyberFormField
            control={expForm.control}
            name="position"
            render={({ field }) => (
              <CyberFormItem>
                <CyberFormLabel>POSITION</CyberFormLabel>
                <CyberFormControl>
                  <Input
                    icon={<Briefcase size={16} />}
                    {...field}
                    value={field.value ?? ""}
                  />
                </CyberFormControl>
                <CyberFormMessage />
              </CyberFormItem>
            )}
          />
          <CyberFormField
            control={expForm.control}
            name="location"
            render={({ field }) => (
              <CyberFormItem>
                <CyberFormLabel>LOCATION</CyberFormLabel>
                <CyberFormControl>
                  <Input
                    icon={<MapPin size={16} />}
                    {...field}
                    value={field.value ?? ""}
                  />
                </CyberFormControl>
                <CyberFormMessage />
              </CyberFormItem>
            )}
          />
          <CyberFormField
            control={expForm.control}
            name="employmentType"
            render={({ field }) => (
              <CyberFormItem>
                <CyberFormLabel>EMPLOYMENT_TYPE</CyberFormLabel>

                <CyberSelect
                  value={field.value ?? EMPLOYMENT_TYPES[0].value}
                  onValueChange={field.onChange}
                >
                  <CyberFormControl>
                    <CyberSelectTrigger>
                      <CyberSelectValue />
                    </CyberSelectTrigger>
                  </CyberFormControl>
                  <CyberSelectContent>
                    {EMPLOYMENT_TYPES.map((type) => (
                      <CyberSelectItem key={type.value} value={type.value}>
                        {type.label}
                      </CyberSelectItem>
                    ))}
                  </CyberSelectContent>
                </CyberSelect>
                <CyberFormMessage />
              </CyberFormItem>
            )}
          />

          <CyberFormField
            control={expForm.control}
            name="startDate"
            render={({ field }) => (
              <CyberFormItem>
                <CyberFormLabel>START_DATE</CyberFormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <CyberFormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left h-9 font-mono bg-slate-800 border-slate-700 hover:border-slate-600",
                          !field.value && "text-slate-500",
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4 text-slate-500" />

                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </CyberFormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value ?? "")}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>

                <CyberFormMessage />
              </CyberFormItem>
            )}
          />
          <div>
            <CyberFormField
              control={expForm.control}
              name="endDate"
              render={({ field }) => (
                <CyberFormItem>
                  <CyberFormLabel>END_DATE</CyberFormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <CyberFormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-mono h-9 bg-slate-800 border-slate-700 hover:border-slate-600",
                            !field.value && "text-slate-500",
                          )}
                          disabled={expForm.watch("isCurrentPosition")}
                        >
                          <CalendarIcon className="mr-2 size-4 text-slate-500" />

                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </CyberFormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date(field.value ?? "")}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>

                  <CyberFormMessage />
                </CyberFormItem>
              )}
            />
            <div className="mt-3 flex items-center">
              <CyberFormField
                control={expForm.control}
                name="isCurrentPosition"
                render={({ field }) => (
                  <CyberFormItem className="flex flex-row items-center gap-2 space-y-0">
                    <CyberFormControl>
                      <Checkbox
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                    </CyberFormControl>
                    <CyberFormLabel className="mb-0 text-sm font-normal">
                      CURRENT_POSITION
                    </CyberFormLabel>
                  </CyberFormItem>
                )}
              />
            </div>
          </div>
        </div>

        <CyberFormField
          control={expForm.control}
          name="description"
          render={({ field }) => (
            <CyberFormItem>
              <CyberFormLabel>DESCRIPTION</CyberFormLabel>
              <CyberFormControl>
                <Textarea
                  className={cn(
                    "w-full bg-slate-800 border text-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0 border-slate-700 focus-visible:border-purple-600",
                  )}
                  {...field}
                />
              </CyberFormControl>
              <CyberFormMessage />
            </CyberFormItem>
          )}
        />
        <div className="flex justify-end gap-4 border-t border-slate-800 bg-slate-900 pt-4 ">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            CANCEL
          </Button>

          <Button type="submit" variant="secondary" isLoading={loading}>
            {editingId ? "UPDATE_EXPERIENCE" : "ADD_EXPERIENCE"}
          </Button>
        </div>
      </form>
    </CyberFormProvider>
  )
}
