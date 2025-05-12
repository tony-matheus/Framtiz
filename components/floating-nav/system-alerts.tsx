import { AlertTriangle } from 'lucide-react';

export default function SystemAlerts() {
  return (
    <div className='border-t border-slate-800 p-3'>
      <div className='flex items-center mb-2'>
        <AlertTriangle size={14} className='text-yellow-500 mr-2' />
        <div className='text-xs text-yellow-500 font-mono'>SYSTEM_ALERTS</div>
      </div>
      <div className='text-xs text-slate-400 border-l border-yellow-500 pl-2'>
        <div className='mb-1'>
          • Connection attempt detected from unknown IP
        </div>
        <div className='mb-1'>• System update available: v2.5.0</div>
        <div>• Low memory warning in sector 7G</div>
      </div>
    </div>
  );
}
