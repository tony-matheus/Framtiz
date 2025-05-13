import { Terminal, AlertTriangle, Zap } from 'lucide-react';

interface SystemStatus {
  security: string;
  connection: string;
  lastSync?: string;
  version?: string;
}

export default function SystemFooter({
  systemStatus,
}: {
  systemStatus: SystemStatus;
}) {
  return (
    <div className='mt-12 border-t border-slate-800 pt-4'>
      <div className='flex flex-wrap gap-6 text-xs'>
        <div className='flex items-center'>
          <Terminal size={14} className='text-purple-400 mr-2' />
          <span className='text-slate-400 font-mono'>SYSTEM_VERSION: </span>
          <span className='text-purple-300 font-mono ml-1'>
            {systemStatus.version || '2.4.1'}
          </span>
        </div>
        <div className='flex items-center'>
          <AlertTriangle size={14} className='text-yellow-500 mr-2' />
          <span className='text-slate-400 font-mono'>SECURITY_STATUS: </span>
          <span className='text-green-400 font-mono ml-1'>
            {systemStatus.security}
          </span>
        </div>
        <div className='flex items-center'>
          <Zap size={14} className='text-green-400 mr-2' />
          <span className='text-slate-400 font-mono'>CONNECTION: </span>
          <span className='text-green-400 font-mono ml-1'>
            {systemStatus.connection}
          </span>
        </div>
      </div>
    </div>
  );
}
