import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// This endpoint should only be called once to set up the first admin
// In a real app, you'd want to secure this better
export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if there are any admins already
    const { data: admins, error: adminCheckError } = await supabase
      .from('profiles')
      .select('id')
      .eq('is_admin', true);

    if (adminCheckError) {
      return NextResponse.json(
        { error: adminCheckError.message },
        { status: 500 }
      );
    }

    // If there are already admins, only allow existing admins to create new ones
    if (admins && admins.length > 0) {
      const { data: currentUser } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      if (!currentUser?.is_admin) {
        return NextResponse.json(
          { error: 'Only existing admins can create new admins' },
          { status: 403 }
        );
      }
    }

    // Make the current user an admin
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', session.user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error making admin:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
