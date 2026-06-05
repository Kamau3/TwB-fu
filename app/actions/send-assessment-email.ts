'use server'

import { createClient } from '@/lib/supabase/server'

interface EmailPayload {
  userEmail: string
  userName: string
  overallScore: number
  genomeScores: Array<{
    dimension: string
    score: number
  }>
  certificateId: string
  certificateHtml: string
}

/**
 * Send assessment results via email using Resend
 * 
 * Usage:
 * ```ts
 * await sendAssessmentEmail({
 *   userEmail: 'user@example.com',
 *   userName: 'John Doe',
 *   overallScore: 78,
 *   genomeScores: [...],
 *   certificateId: 'TwB-xxx',
 *   certificateHtml: '<html>...</html>'
 * })
 * ```
 */
export async function sendAssessmentEmail(payload: EmailPayload) {
  try {
    // Validate inputs
    if (!payload.userEmail || !payload.userName) {
      throw new Error('Email and name are required')
    }

    // For now, we'll log the email that would be sent
    // To enable actual email sending, you need:
    // 1. Install: npm install resend
    // 2. Add RESEND_API_KEY to environment variables
    // 3. Uncomment the Resend code below

    console.log('[EMAIL] Assessment results would be sent to:', payload.userEmail)
    console.log('[EMAIL] Score:', payload.overallScore)
    console.log('[EMAIL] Certificate ID:', payload.certificateId)

    // IMPLEMENTATION READY - Uncomment when Resend is installed:
    /*
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Create email HTML with results
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #d4af37 0%, #f0d000 100%); color: #0f1419; padding: 30px; border-radius: 8px; text-align: center; }
            .score { font-size: 48px; font-weight: bold; margin: 20px 0; }
            .dimension { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 6px; }
            .cta { background: #d4af37; color: #0f1419; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin: 20px 0; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 Your AI Genome Assessment Results</h1>
              <p>Professional AI Readiness Certification</p>
            </div>

            <h2>Hi ${payload.userName},</h2>
            <p>Thank you for completing the TwB Professional AI Assessment. Your results are ready!</p>

            <div style="background: #fff3cd; border-left: 4px solid #d4af37; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <h3 style="margin: 0 0 10px 0; color: #0f1419;">Your Overall Score</h3>
              <div class="score">${payload.overallScore}/100</div>
              <p style="margin: 0; color: #666;">
                ${payload.overallScore >= 85 ? '🌟 Master level - Exceptional readiness' : 
                  payload.overallScore >= 60 ? '⭐ Professional level - Strong foundation' : 
                  '📈 Growing - Clear improvement areas identified'}
              </p>
            </div>

            <h3>Dimension Scores</h3>
            ${payload.genomeScores.map(d => `
              <div class="dimension">
                <strong>${d.dimension}</strong>
                <div style="margin-top: 8px;">
                  <div style="background: #e0e0e0; border-radius: 10px; height: 8px; overflow: hidden;">
                    <div style="background: #d4af37; height: 100%; width: ${d.score}%;" />
                  </div>
                  <span style="font-size: 14px; color: #666;">${d.score}/100</span>
                </div>
              </div>
            `).join('')}

            <div style="margin: 30px 0; padding: 20px; background: #f9f9f9; border-radius: 8px;">
              <h3>What's Next?</h3>
              <p>Your personalized certification and detailed insights are available in your dashboard. Access your full profile to:</p>
              <ul>
                <li>Download your official certificate</li>
                <li>View detailed AI governance recommendations</li>
                <li>See your 90-day improvement roadmap</li>
                <li>Connect with AI strategy experts</li>
              </ul>
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://app.twb.com'}/assessment-results" class="cta">
                View Your Full Results
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

            <p style="font-size: 12px; color: #999; text-align: center;">
              Questions? Contact our AI strategy team at <a href="mailto:support@twb.com" style="color: #d4af37; text-decoration: none;">support@twb.com</a><br>
              Certificate ID: ${payload.certificateId}
            </p>
          </div>
        </body>
      </html>
    `

    const response = await resend.emails.send({
      from: 'results@twb.com',
      to: payload.userEmail,
      subject: `Your AI Genome Assessment Results - Score: ${payload.overallScore}/100`,
      html: emailHtml,
    })

    if (response.error) {
      console.error('[EMAIL ERROR]:', response.error)
      return { success: false, error: response.error }
    }

    return { success: true, messageId: response.data?.id }
    */

    return { success: true, message: 'Email ready to send (Resend not configured)' }
  } catch (error) {
    console.error('[EMAIL ERROR]:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

/**
 * Utility: Generate assessment summary for email
 */
export function generateAssessmentSummary(scores: Array<{ dimension: string; score: number }>): string {
  const strengths = scores
    .filter((s: { dimension: string; score: number }) => s.score >= 70)
    .map((s: { dimension: string; score: number }) => `${s.dimension} (${s.score}/100)`)

  const improvements = scores
    .filter((s: { dimension: string; score: number }) => s.score < 70)
    .sort((a: { dimension: string; score: number }, b: { dimension: string; score: number }) => a.score - b.score)
    .slice(0, 3)
    .map((s: { dimension: string; score: number }) => `${s.dimension} (${s.score}/100)`)

  return `Strengths: ${strengths.join(', ') || 'None'}\nImprovements: ${improvements.join(', ') || 'None'}`
}
