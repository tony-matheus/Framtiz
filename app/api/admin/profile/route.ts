import { createServerSupabaseClient } from '@/lib/supabase/server';
import { serverAuthService } from '@/lib/services/auth/server-auth-service';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    // Check if user is authenticated
    const user = await serverAuthService.getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username, full_name } = await request.json();

    // Validate input
    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Check if username is already taken (excluding current user)
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .neq('id', user.id)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username is already taken' },
        { status: 400 }
      );
    }

    // Update profile
    const { error } = await supabase
      .from('profiles')
      .update({
        username,
        full_name: full_name || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
