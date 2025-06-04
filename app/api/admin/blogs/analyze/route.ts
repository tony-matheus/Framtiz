import { analyzeBlogContent } from '@/lib/services/openai/openai-service';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userText } = await req.json();

    const response = await analyzeBlogContent(userText);

    return NextResponse.json({ success: true, data: JSON.parse(response) });
  } catch (error) {
    console.error('AI Blog Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
