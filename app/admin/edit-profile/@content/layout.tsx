'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { last } from 'ramda';

import { Briefcase, User, Users } from 'lucide-react';
import CyberTabs from '@/components/ui-custom/cyber-tabs';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const paths = pathname.split('/');

  const tabName = last(paths);

  return (
    <div>
      <nav>
        <CyberTabs
          // activeTabName={paths.length === 3 ? 'profile' : tabName}
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
            {
              name: 'socials',
              asChild: true,
              component: (
                <Link
                  href='/admin/edit-profile/socials'
                  className='flex items-center gap-2'
                >
                  <Users size={16} />
                  <span className='hidden sm:inline'>SOCIALS</span>
                </Link>
              ),
            },
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

      <div>{children}</div>
    </div>
  );
}
