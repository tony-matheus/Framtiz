import { AlertTriangle } from 'lucide-react';

export default function SystemAlerts() {
  return (
    <div className='border-t border-slate-800 p-3'>
      <div className='mb-2 flex items-center'>
        <AlertTriangle size={14} className='mr-2 text-yellow-500' />
        <div className='font-mono text-xs text-yellow-500'>SYSTEM_ALERTS</div>
      </div>
      <div className='border-l border-yellow-500 pl-2 text-xs text-slate-400'>
        <div className='mb-1'>
          • Connection attempt detected from unknown IP
        </div>
        <div className='mb-1'>• System update available: v2.5.0</div>
        <div>• Low memory warning in sector 7G</div>
      </div>
    </div>
  );
}
