import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'ESIMtime <info@esimtime.com>',
      to: email,
      subject: 'Welcome to ESIMtime',
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to ESIMtime</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f5ff; font-family: 'Inter', sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td align="center" style="padding: 60px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="480" style="background: linear-gradient(to bottom right, #ffffff, #f8f8ff); border-radius: 24px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);">
                <!-- Logo -->
                <tr>
                  <td align="center" style="padding: 40px 40px 20px 40px;">
                    <img src="https://www.esimtime.com/_next/image?url=https%3A%2F/do23ht5tkvefc.cloudfront.net/img/SingleLineLogo.png&w=256&q=75" 
                         alt="ESIMtime" width="140" style="display: block;" />
                  </td>
                </tr>
      
                <!-- Content -->
                <tr>
                  <td style="padding: 20px 40px 40px 40px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                      <h1 style="margin: 0 0 16px 0; font-size: 36px; line-height: 1.2; color: #111827; font-weight: 700;">
                        Welcome to ESIMtime
                      </h1>
                      <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #6b7280;">
                        Thank you for joining our waitlist. We're building the future of eSIM technology, and you'll be among the first to experience it.
                      </p>
                    </div>
      
                    <!-- Launch Date -->
                    <div style="background-color: #f9fafb; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 30px;">
                      <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">
                        Launching by
                      </p>
                      <p style="margin: 0; font-size: 24px; font-weight: 600; color: #111827;">
                        <span style="color: #111827; font-weight: 600;">Jan 1st, 2025</span>
                      </p>
                    </div>
      
                    <!-- Stats -->
                    <div style="text-align: center; margin-bottom: 30px;">
                      <p style="margin: 0; font-size: 14px; color: #6b7280;">
                        Join <span style="color: #111827; font-weight: 600;">2,000+</span> others waiting for launch
                      </p>
                    </div>
      
                    <!-- CTA -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td align="center">
                          <a href="https://esimtime.com" 
                             style="display: inline-block; padding: 16px 32px; background-color: #111827; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 500; font-size: 16px;">
                            Visit ESIMtime
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
      
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; text-align: center; border-top: 1px solid #f3f4f6;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280;">
                      © 2024 ESIMtime. All rights reserved.
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #6b7280;">
                      Contact us at <a href="mailto:info@esimtime.com" style="color: #111827; text-decoration: none;">info@esimtime.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `
    });

    return NextResponse.json(
      { message: 'Subscription successful' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}