"use client"

import { RefreshCw, Bell, Shield } from "lucide-react"
import Link from "next/link"

interface SystemStatus {
  security: string
  connection: string
  lastSync: string
}

export default function AdminHeader({ systemStatus }: { systemStatus: SystemStatus }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-transparent border-l-4 border-purple-600 pl-4">
          ADMIN_TERMINAL
        </h1>
        <p className="text-slate-400 mt-2 ml-5 text-sm">
          Portfolio management system • Last login: {systemStatus.lastSync}
        </p>
      </div>

      <div className="flex items-center mt-4 md:mt-0 space-x-4">
        <Link href="/" className="text-sm text-purple-400 hover:text-green-400 transition-colors">
          VIEW_SITE
        </Link>

        <button className="relative p-2 bg-slate-900 border border-slate-800 hover:border-purple-600 transition-colors">
          <Bell size={20} className="text-slate-400" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-xs flex items-center justify-center">
            3
          </span>
        </button>

        <button className="p-2 bg-slate-900 border border-slate-800 hover:border-purple-600 transition-colors">
          <Shield size={20} className="text-slate-400" />
        </button>

        <button className="p-2 bg-slate-900 border border-slate-800 hover:border-purple-600 transition-colors">
          <RefreshCw size={20} className="text-slate-400" />
        </button>
      </div>
    </div>
  )
}
