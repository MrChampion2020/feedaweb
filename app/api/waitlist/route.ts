import { type NextRequest, NextResponse } from "next/server"

// In a real app, you'd save this to a database
const waitlistEmails: string[] = []

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    // Check if email already exists
    if (waitlistEmails.includes(email)) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Add email to waitlist
    waitlistEmails.push(email)

    // In a real app, you might:
    // - Save to database
    // - Send confirmation email
    // - Add to email marketing service

    console.log(`New waitlist signup: ${email}`)
    console.log(`Total signups: ${waitlistEmails.length}`)

    return NextResponse.json(
      { message: "Successfully added to waitlist", total: waitlistEmails.length },
      { status: 200 },
    )
  } catch (error) {
    console.error("Waitlist signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    total: waitlistEmails.length,
    message: "Waitlist status",
  })
}
