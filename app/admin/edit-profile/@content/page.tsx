import { redirect } from 'next/navigation';

export default function Profile() {
  redirect('/admin/edit-profile/profile');
}
