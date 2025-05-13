import { Terminal, Zap } from 'lucide-react';

interface SystemStatus {
  security: string;
  connection: string;
  lastSync?: string;
  version?: string;
}

export default function SystemFooter({
  systemStatus = {
    security: 'SECURE',
    connection: 'STABLE',
    lastSync: '2025-05-11 10:42:18',
  },
}: {
  systemStatus?: SystemStatus;
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
          {'💜💚'}
          <span className='text-slate-400 font-mono ml-2'>
            MADE_WITH_LOVE_BY:{' '}
          </span>
          <span className='text-green-400 font-mono ml-1'>
            TONY &quot;LINGUIÇA&quot; LIMA
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
