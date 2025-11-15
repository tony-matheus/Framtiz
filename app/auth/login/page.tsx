"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, User, AlertTriangle } from "lucide-react"
import { login } from "./actions"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CyberFormProvider } from "@/components/ui-custom/cyber-form/cyber-form"
import { LoginInput, LoginInputSchema } from "@/lib/services/auth/auth-types"
import { Button } from "@/components/ui/button"
import { CyberFormInput } from "@/components/ui-custom/cyber-form/fields"

export default function LoginPage() {
  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(LoginInputSchema),
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values: LoginInput) => {
    setError("")
    setIsLoading(true)

    try {
      await login(values)
    } catch {
      setError(
        "Nem tenta não hacker imundo safado!!!!!! traduz essa merda aqui se tu for bom",
      )
      toast.error("Access denied!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)]"></div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-purple-600 to-green-400"></div>
      <div className="absolute right-0 top-0 h-40 w-1 bg-purple-600"></div>
      <div className="absolute bottom-0 left-0 h-1 w-40 bg-green-400"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md border-2 border-slate-800 bg-slate-900 p-8"
      >
        <div className="absolute -left-1 -top-1 size-3 bg-purple-600"></div>
        <div className="absolute -bottom-1 -right-1 size-3 bg-green-400"></div>

        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex size-16 items-center justify-center border-2 border-purple-600 bg-slate-800">
              <Lock className="text-purple-400" size={32} />
            </div>
          </div>
          <h1 className="bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-2xl font-bold text-transparent">
            ADMIN_TERMINAL
          </h1>
          <p className="mt-2 font-mono text-sm text-slate-400">
            AUTHENTICATION_REQUIRED
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-start border border-red-900/50 bg-red-900/20 p-3 text-red-400">
            <AlertTriangle size={18} className="mr-2 mt-0.5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <CyberFormProvider {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(handleSubmit)}>
            <div className="mb-6 space-y-4">
              <CyberFormInput
                name="email"
                label="EMAIL"
                icon={<User size={16} className="text-slate-500" />}
              />
              <CyberFormInput
                name="password"
                type="password"
                label="PASSWORD"
                icon={<Lock size={16} className="text-slate-500" />}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              AUTHENTICATE
            </Button>
            {/* <button
              type='submit'
              disabled={isLoading}
              className='flex w-full items-center justify-center border-2 border-purple-600 bg-transparent p-3 font-medium text-purple-300 transition-all duration-300 hover:bg-purple-900/30'
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  }}
                >
                  <RefreshCw className='size-5' />
                </motion.div>
              ) : (
                <span className='font-mono'>AUTHENTICATE</span>
              )}
            </button> */}
          </form>
        </CyberFormProvider>

        <div className="mt-6 text-center">
          <p className="font-mono text-xs text-slate-500">
            SYSTEM_VERSION: 2.4.1
          </p>
        </div>
      </motion.div>
    </div>
  )
}
