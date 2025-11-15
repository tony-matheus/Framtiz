"use client"

import React from "react"
import { CyberCard, CyberCardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>
}

export class AnalyticsErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Analytics Error Boundary caught an error:", error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return (
          <FallbackComponent
            error={this.state.error!}
            resetError={this.resetError}
          />
        )
      }

      return (
        <CyberCard>
          <CyberCardContent className="p-6">
            <div className="text-center py-8">
              <AlertTriangle className="mx-auto mb-4 size-12 text-red-400" />
              <h3 className="mb-2 font-mono text-lg text-slate-200">
                ANALYTICS_ERROR
              </h3>
              <p className="mb-4 text-slate-400">
                Something went wrong while loading analytics data
              </p>
              <button
                onClick={this.resetError}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-mono text-sm transition-colors"
              >
                <RefreshCw className="size-4" />
                <span>RETRY</span>
              </button>
            </div>
          </CyberCardContent>
        </CyberCard>
      )
    }

    return this.props.children
  }
}
