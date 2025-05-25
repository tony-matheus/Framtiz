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
          <Terminal size={14} className='mr-2 text-purple-400' />
          <span className='font-mono text-slate-400'>SYSTEM_VERSION: </span>
          <span className='ml-1 font-mono text-purple-300'>
            {systemStatus.version || '2.4.1'}
          </span>
        </div>
        <div className='flex items-center'>
          {'💜💚'}
          <span className='ml-2 font-mono text-slate-400'>
            MADE_WITH_LOVE_BY:{' '}
          </span>
          <span className='ml-1 font-mono text-green-400'>
            TONY &quot;LINGUIÇA&quot; LIMA
          </span>
        </div>
        <div className='flex items-center'>
          <Zap size={14} className='mr-2 text-green-400' />
          <span className='font-mono text-slate-400'>CONNECTION: </span>
          <span className='ml-1 font-mono text-green-400'>
            {systemStatus.connection}
          </span>
        </div>
      </div>
    </div>
  );
}
