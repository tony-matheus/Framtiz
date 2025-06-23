import { analyzeBlogContent } from '@/lib/services/openai/openai-service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userText } = await req.json();

    const response = await analyzeBlogContent(userText);

    return NextResponse.json({ success: true, data: JSON.parse(response) });
  } catch (error) {
    console.error('Error fetching blogs:', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
