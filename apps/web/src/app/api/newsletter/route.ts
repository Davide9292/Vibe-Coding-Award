import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email, consent } = await request.json();

    // Validate input
    if (!email || !consent) {
      return NextResponse.json(
        { error: 'Email and consent are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    // Store in database
    const subscriber = await prisma.newsletterSubscriber.create({
      data: {
        email,
        subscribed: true,
        source: 'homepage_signup',
      },
    });

    // Send confirmation email with Resend
    try {
      const emailResult = await resend.emails.send({
        from: 'Vibe Coding Award <hello@vibecodingaward.com>',
        to: email,
        subject: 'Welcome to the Vibe Coding Award Inner Circle! 🚀',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #000; color: #fff; padding: 40px 20px;">
            <!-- Logo Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://vibecodingaward.com/Vibe%20Coding%20Award%20Logo.svg" 
                   alt="Vibe Coding Award" 
                   style="height: 60px; width: auto;" />
            </div>
            
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #fff; font-size: 28px; margin: 0;">Welcome to the Inner Circle!</h1>
            </div>
            
            <div style="background: #1a1a1a; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
              <p style="font-size: 18px; line-height: 1.6; margin: 0 0 20px 0;">
                Thank you for joining the Vibe Coding Award community! 
              </p>
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px 0; color: #ccc;">
                You're now part of a movement celebrating the most creative and innovative builders who are redefining what it means to create with AI.
              </p>
              <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #ccc;">
                We'll keep you updated on the latest from the award, exclusive insights, and opportunities to connect with fellow pioneers.
              </p>
            </div>
            
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="https://vibecodingaward.com" 
                 style="display: inline-block; background: #fff; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px;">
                Visit vibecodingaward.com
              </a>
            </div>
            
            <div style="text-align: center; font-size: 14px; color: #666; margin-top: 40px;">
              <p>© 2025 Vibe Coding Award</p>
              <p>
                <a href="mailto:hello@vibecodingaward.com" style="color: #666;">hello@vibecodingaward.com</a>
              </p>
            </div>
          </div>
        `,
      });
      
      console.log('Email sent successfully:', emailResult);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't throw error - subscriber is already saved
      // Just log the email error for debugging
    }

    return NextResponse.json(
      { 
        message: 'Successfully subscribed! Check your email for confirmation.',
        subscriberId: subscriber.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
} 