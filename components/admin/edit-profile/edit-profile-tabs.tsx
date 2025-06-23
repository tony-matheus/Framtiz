import Link from 'next/link';

import { Briefcase, User } from 'lucide-react';
import CyberTabs from '@/components/ui-custom/cyber-tabs';

export default function EditProfileTabs({ tabName }: { tabName?: string }) {
  return (
    <nav>
      <CyberTabs
        activeTabName={tabName}
        tabs={[
          {
            name: 'profile',
            asChild: true,
            component: (
              <Link
                href='/admin/edit-profile/profile'
                className='flex items-center gap-2'
              >
                <User size={16} />
                <span className='hidden sm:inline'>PROFILE</span>
              </Link>
            ),
          },
          // {
          //   name: 'socials',
          //   asChild: true,
          //   component: (
          //     <Link
          //       href='/admin/edit-profile/socials'
          //       className='flex items-center gap-2'
          //     >
          //       <Users size={16} />
          //       <span className='hidden sm:inline'>SOCIALS</span>
          //     </Link>
          //   ),
          // },
          {
            name: 'experience',
            asChild: true,
            component: (
              <Link
                href='/admin/edit-profile/experience'
                className='flex items-center gap-2'
              >
                <Briefcase size={16} />
                <span className='hidden sm:inline'>EXPERIENCE</span>
              </Link>
            ),
          },
        ]}
      />
    </nav>
  );
}
