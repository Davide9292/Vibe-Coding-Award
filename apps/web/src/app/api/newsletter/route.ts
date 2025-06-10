import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { sendNewsletterWelcome } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email, consent } = await request.json();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Check consent
    if (!consent) {
      return NextResponse.json(
        { error: 'Please accept our privacy policy to continue' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter' },
        { status: 400 }
      );
    }

    // Save subscriber to database
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        subscribed: true,
        source: 'website_signup'
      }
    });

    console.log('✅ Subscriber saved to database:', subscriber.email);

    // Send welcome email using original system
    try {
      const emailResult = await sendNewsletterWelcome(email);
      
      if (emailResult.success) {
        console.log('✅ Welcome email sent successfully to:', email);
        return NextResponse.json({ 
          message: 'Successfully subscribed! Check your email for confirmation.',
          subscriber: subscriber
        });
      } else {
        console.error('❌ Email sending failed:', emailResult.error);
        // Don't fail the API call - subscriber is still saved
        return NextResponse.json({ 
          message: 'Successfully subscribed! (Email confirmation will follow)',
          subscriber: subscriber,
          emailWarning: 'Welcome email could not be sent'
        });
      }
    } catch (emailError) {
      console.error('❌ Email service error:', emailError);
      // Don't fail the API call - subscriber is still saved
      return NextResponse.json({ 
        message: 'Successfully subscribed! (Email confirmation will follow)',
        subscriber: subscriber,
        emailWarning: 'Welcome email could not be sent'
      });
    }

  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your subscription. Please try again.' },
      { status: 500 }
    );
  }
} 