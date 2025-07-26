import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { prompt, type = 'text' } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Get OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    if (type === 'image') {
      // Generate image using gpt-image-1 model
      const image = await openai.images.generate({
        model: "gpt-image-1",
        prompt: prompt,
        size: "1536x1024",
        quality: "medium",
        background: "transparent"
      });

      const imageUrl = image.data?.[0]?.url;

      if (!imageUrl) {
        return NextResponse.json(
          { error: 'No image generated from OpenAI' },
          { status: 500 }
        );
      }

      return NextResponse.json({ imageUrl });
    } else {
      // Generate text (existing functionality)
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a world-class AI fashion consultant. Provide detailed outfit suggestions with explanations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const generatedText = completion.choices[0]?.message?.content;

      if (!generatedText) {
        return NextResponse.json(
          { error: 'No response generated from OpenAI' },
          { status: 500 }
        );
      }

      return NextResponse.json({ response: generatedText });
    }

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 