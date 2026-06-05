# AI Integration Guide
## How to Add AI-Powered Insights to TwB Assessment

### Quick Start: 3 Steps to Activate AI

#### Step 1: Install AI SDK
```bash
npm install ai@^6.0.0
```

#### Step 2: Create Insights Server Action
```typescript
// app/actions/generate-insights.ts
'use server'

import { generateText } from 'ai'

export async function generateAssessmentInsights(
  score: number,
  dimensionScores: Record<string, number>,
  assessmentType: string = 'Professional'
) {
  const result = await generateText({
    model: 'openai/gpt-5-mini',
    system: `You are an AI strategy consultant analyzing AI readiness assessments. 
             Provide structured insights in JSON format with these keys:
             - summary (2-3 sentences)
             - strengths (array of 3-5 strings)
             - improvements (array of 3-5 strings)
             - roadmap (array of 3 action items with timelines)`,
    prompt: `
      Analyze this ${assessmentType} AI Assessment:
      Overall Score: ${score}/100
      
      Dimensions:
      ${Object.entries(dimensionScores)
        .map(([dim, score]) => `- ${dim}: ${score}/100`)
        .join('\n')}
      
      Provide strategic insights and a 90-day roadmap.
    `,
    temperature: 0.7,
    maxOutputTokens: 1200,
  })

  try {
    // Parse JSON response
    const jsonMatch = result.text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch (e) {
    console.error('Failed to parse insights:', e)
  }

  return {
    summary: result.text.substring(0, 200),
    strengths: ['Strong data foundation', 'Good automation setup'],
    improvements: ['Governance framework', 'Risk management'],
    roadmap: ['Month 1: Strategy', 'Month 2: Implementation', 'Month 3: Training']
  }
}
```

#### Step 3: Use in Results Page
```typescript
// app/assessment-results/page.tsx
import { generateAssessmentInsights } from '@/app/actions/generate-insights'

export default function AssessmentResultsPage() {
  const [insights, setInsights] = useState(null)

  useEffect(() => {
    const loadInsights = async () => {
      const data = await generateAssessmentInsights(
        overallScore,
        dimensionScores,
        'Professional'
      )
      setInsights(data)
    }
    loadInsights()
  }, [])

  // Rest of component...
}
```

---

## Automation Opportunities & Implementation

### 1. Email Reports (with Resend or SendGrid)

**Use Case**: Send assessment results to user's email with PDF report

```typescript
// app/actions/send-assessment-email.ts
'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendAssessmentEmail(
  userEmail: string,
  userName: string,
  score: number,
  certificateHTML: string
) {
  await resend.emails.send({
    from: 'TwB Assessments <noreply@twb.co.ke>',
    to: userEmail,
    subject: `Your AI Readiness Assessment Results - Score: ${score}/100`,
    html: `
      <h1>Assessment Complete, ${userName}!</h1>
      <p>Your AI Readiness Score: <strong>${score}/100</strong></p>
      <p>Your official certificate is attached.</p>
      <a href="https://twb.co.ke/assessment-results">View Full Results</a>
    `,
  })
}
```

### 2. Automated Report Generation (with Puppeteer)

**Use Case**: Generate PDFs automatically for sharing/archiving

```typescript
// app/api/export-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server'
import html2pdf from 'html2pdf.js'

export async function POST(req: NextRequest) {
  const { html, fileName } = await req.json()

  const pdf = await html2pdf()
    .set({ margin: 10, filename: fileName })
    .from.html(html)
    .outputPdf('blob')

  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}.pdf"`,
    },
  })
}
```

### 3. Score Tracking & Progress Dashboard

**Use Case**: Track improvement over multiple assessments

```typescript
// app/actions/save-assessment-result.ts
'use server'

import { createClient } from '@/lib/supabase/server'

export async function saveAssessmentResult(
  userId: string,
  assessmentType: string,
  score: number,
  dimensionScores: Record<string, number>,
  certificateId: string
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('assessment_results')
    .insert({
      user_id: userId,
      assessment_type: assessmentType,
      overall_score: score,
      dimension_scores: dimensionScores,
      certificate_id: certificateId,
      completed_at: new Date().toISOString(),
    })
    .select()

  if (error) throw error
  return data[0]
}
```

### 4. Skill Gap Recommendation Engine

**Use Case**: Suggest training courses based on weak dimensions

```typescript
// app/actions/recommend-training.ts
'use server'

import { generateText } from 'ai'

export async function recommendTraining(
  dimensionScores: Record<string, number>
) {
  // Find lowest scoring dimensions
  const weakDimensions = Object.entries(dimensionScores)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3)
    .map(([dim]) => dim)

  const result = await generateText({
    model: 'openai/gpt-5-mini',
    prompt: `Recommend 3-5 specific training courses or certifications for improving: 
             ${weakDimensions.join(', ')}. 
             Format as a JSON array with name, provider, duration, and link.`,
    maxOutputTokens: 800,
  })

  try {
    const jsonMatch = result.text.match(/\[[\s\S]*\]/)
    return JSON.parse(jsonMatch[0])
  } catch {
    return []
  }
}
```

### 5. Industry Benchmarking

**Use Case**: Compare user scores to industry averages

```typescript
// app/actions/benchmark-assessment.ts
'use server'

import { createClient } from '@/lib/supabase/server'

export async function benchmarkScore(
  dimension: string,
  userScore: number,
  industry?: string
) {
  const supabase = await createClient()

  // Get average scores for dimension/industry
  const { data } = await supabase
    .from('assessment_results')
    .select(`dimension_scores->>${dimension}`)
    .eq('industry', industry || 'all')
    .limit(1000)

  if (!data) return null

  const scores = data
    .map((r) => parseFloat(r.dimension_scores[dimension]))
    .filter(Boolean)

  const average = scores.reduce((a, b) => a + b, 0) / scores.length
  const percentile = (scores.filter((s) => s < userScore).length / scores.length) * 100

  return {
    userScore,
    industryAverage: Math.round(average),
    percentile: Math.round(percentile),
    performanceLevel: userScore > average ? 'Above Average' : 'Below Average',
  }
}
```

### 6. WhatsApp Integration (Twilio)

**Use Case**: Send assessment results via WhatsApp

```typescript
// app/actions/send-whatsapp-results.ts
'use server'

import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function sendWhatsAppResults(
  phoneNumber: string,
  userName: string,
  score: number
) {
  await client.messages.create({
    body: `Hi ${userName}! 🎉\n\nYour AI Readiness Score: ${score}/100\n\nView your full results and download your certificate:\nhttps://twb.co.ke/assessment-results\n\nNeed expert guidance? Contact us on WhatsApp!`,
    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
    to: `whatsapp:${phoneNumber}`,
  })
}
```

### 7. Calendar Integration (Google Calendar)

**Use Case**: Auto-schedule follow-up consultations

```typescript
// app/actions/schedule-consultation.ts
'use server'

import { google } from 'googleapis'

const calendar = google.calendar('v3')

export async function scheduleConsultation(
  userName: string,
  userEmail: string,
  score: number,
  consultantEmail: string
) {
  const event = {
    summary: `AI Assessment Consultation - ${userName}`,
    description: `Following up on AI Readiness Assessment (Score: ${score}/100)`,
    start: {
      dateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      timeZone: 'Africa/Nairobi',
    },
    end: {
      dateTime: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000
      ).toISOString(),
      timeZone: 'Africa/Nairobi',
    },
    attendees: [{ email: userEmail }, { email: consultantEmail }],
    reminders: {
      useDefault: true,
    },
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  const result = await calendar.events.insert({
    auth,
    calendarId: 'primary',
    requestBody: event,
  })

  return result.data
}
```

### 8. Slack Notifications

**Use Case**: Notify team when high-value assessments complete

```typescript
// app/actions/notify-team.ts
'use server'

import { WebClient } from '@slack/web-api'

const slack = new WebClient(process.env.SLACK_BOT_TOKEN)

export async function notifyTeamHighScore(
  userName: string,
  score: number,
  companyName?: string
) {
  if (score >= 80) {
    await slack.chat.postMessage({
      channel: '#sales-leads',
      text: `🎯 High-Value Lead: ${userName}${companyName ? ` from ${companyName}` : ''} scored ${score}/100 on AI Assessment!`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*New High-Value Assessment Lead* 🎉\n*Name:* ${userName}\n*Score:* ${score}/100\n*Status:* Ready for consultation`,
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: { type: 'plain_text', text: 'View Details' },
              url: `https://twb.co.ke/admin/leads/${userName}`,
            },
          ],
        },
      ],
    })
  }
}
```

---

## Environment Variables Needed

```bash
# AI Integration
OPENAI_API_KEY=sk-...
# or use Vercel AI Gateway (no key needed, uses proxy)

# Email
RESEND_API_KEY=re_...

# SMS/WhatsApp
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=+1...

# Slack
SLACK_BOT_TOKEN=xoxb-...

# Database
SUPABASE_URL=...
SUPABASE_ANON_KEY=...

# Google Calendar
GOOGLE_SERVICE_ACCOUNT_KEY={...json...}
```

---

## Database Schema for Enhanced Features

```sql
-- Assessment Results
CREATE TABLE assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  assessment_type TEXT NOT NULL,
  overall_score INTEGER NOT NULL,
  dimension_scores JSONB NOT NULL,
  insights JSONB,
  certificate_id TEXT UNIQUE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training Recommendations
CREATE TABLE training_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES assessment_results(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  course_name TEXT NOT NULL,
  provider TEXT,
  duration TEXT,
  link TEXT,
  priority INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consultation Bookings
CREATE TABLE consultation_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  assessment_id UUID REFERENCES assessment_results(id),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  consultant_email TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  assessment_id UUID NOT NULL REFERENCES assessment_results(id),
  title TEXT,
  level TEXT,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);
```

---

## Next Steps

1. **Install dependencies**: `npm install ai resend twilio`
2. **Set environment variables** in `.env.local`
3. **Create database tables** using Supabase console
4. **Implement server actions** one by one
5. **Test end-to-end** before deployment
6. **Monitor** email delivery, API calls, and user feedback

---

## Quick Win Ideas (Under 1 Hour Each)

1. ✅ Email certificate after download (Resend)
2. ✅ Slack notification for high scores
3. ✅ Save results to database (Supabase)
4. ✅ Add LinkedIn share button for certificate
5. ✅ Export results as PDF
6. ✅ Set up WhatsApp follow-up message
7. ✅ Create simple dashboard to see all assessments
8. ✅ Add industry dropdown to assessment
9. ✅ Calculate cost savings estimate based on score
10. ✅ Create email template for results

Choose 2-3 and implement them first for quick wins!
