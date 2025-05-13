import { RefreshCw, Bell, Shield } from 'lucide-react';
import { CyberButton } from '@/components/ui-custom/cyber-button';

interface SystemStatus {
  security: string;
  connection: string;
  lastSync: string;
}

interface AdminHeaderProps {
  systemStatus: SystemStatus;
  title?: string;
}

export default function AdminHeader({
  systemStatus,
  title = 'ADMIN_TERMINAL',
}: AdminHeaderProps) {
  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center'>
      <div>
        <h1 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-transparent border-l-4 border-purple-600 pl-4'>
          {title}
        </h1>
        <p className='text-slate-400 mt-2 ml-5 text-sm'>
          Portfolio management system • Last login: {systemStatus.lastSync}
        </p>
      </div>

      <div className='flex items-center mt-4 md:mt-0 space-x-4'>
        <CyberButton variant='outline' size='icon' className='relative'>
          <Bell size={20} className='text-slate-400' />
          <span className='absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-xs flex items-center justify-center'>
            3
          </span>
        </CyberButton>

        <CyberButton variant='outline' size='icon'>
          <Shield size={20} className='text-slate-400' />
        </CyberButton>

        <CyberButton variant='outline' size='icon'>
          <RefreshCw size={20} className='text-slate-400' />
        </CyberButton>
      </div>
    </div>
  );
}
