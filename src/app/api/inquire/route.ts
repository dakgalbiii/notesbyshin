import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { name, email, projectType, date, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'inquire@notesbyshin.com',
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New inquiry — ${projectType ?? 'General'} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Project type: ${projectType ?? '—'}`,
        `Date / timeframe: ${date ?? '—'}`,
        ``,
        message,
      ].join('\n'),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 })
  }
}
