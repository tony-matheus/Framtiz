'use client';

import { CyberButton } from '@/components/ui-custom/cyber-button';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { User } from '@/lib/services/auth/auth-types';
import { LogOut, Settings, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from './constants';

interface AdminSidebarProps {
  onLogout: () => void;
  user: User;
}

export default function AdminSidebar({ onLogout, user }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar variant='inset'>
      <SidebarHeader className='p-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className='flex items-center'>
              <Link
                href='/'
                className='mr-3 flex size-10 items-center justify-center border-2 border-purple-900 bg-transparent'
              >
                <Image
                  src='/logo/logo-dark.png'
                  width={28}
                  height={28}
                  alt='Framtiz logo'
                />
              </Link>
              <div>
                <div className='font-mono text-sm text-green-400'>FRAMTIZ</div>
                <div className='font-mono text-xs text-slate-400'>v0.0.1</div>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className='border-y border-slate-800 p-4'>
          <SidebarGroupContent className='flex flex-col gap-2'>
            <SidebarMenu>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <div className='mr-3 flex size-8 items-center justify-center border border-purple-600 bg-slate-800'>
                    <UserIcon className='text-purple-400' size={16} />
                  </div>
                  <div>
                    <div className='font-mono text-sm text-slate-200'>
                      {user.username?.toUpperCase() ??
                        'EDIT TO CHANGE YOUR NAME'}
                    </div>
                    <div className='font-mono text-xs text-slate-400'>
                      {user.isAdmin ? 'ADMIN_LEVEL' : 'USER_LEVEL'}
                    </div>
                  </div>
                </div>
                <Link href='/admin/edit-profile/profile'>
                  <CyberButton variant='outline' size='icon' className='size-7'>
                    <Settings size={14} className='text-purple-400' />
                  </CyberButton>
                </Link>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className='px-4 py-2'>
          <SidebarGroupContent className='flex flex-col gap-2'>
            <SidebarGroupLabel className='h-auto'>NAVIGATION</SidebarGroupLabel>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                if (item.removeFromSideBar) return null;

                const isActive =
                  pathname === item.href || pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      tooltip={item.label}
                      asChild
                      variant='outline'
                      size='lg'
                      isActive={isActive}
                    >
                      <Link href={item.href} passHref>
                        {item.icon}
                        <span className='font-mono text-sm'>{item.label}</span>
                        {isActive && (
                          <span className='ml-auto size-1 bg-green-400'></span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className='mt-auto px-4 py-2'>
          <SidebarGroupContent className='flex flex-col gap-2'>
            <SidebarMenu>
              <CyberButton
                variant='destructive'
                size='lg'
                onClick={onLogout}
                className='w-full justify-start'
                leftIcon={<LogOut size={18} />}
              >
                LOGOUT
              </CyberButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator />
      </SidebarContent>
    </Sidebar>
  );
}
