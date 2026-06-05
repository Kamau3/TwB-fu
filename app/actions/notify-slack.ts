'use server'

interface SlackNotification {
  userName: string
  userEmail: string
  overallScore: number
  assessmentType: 'Free' | 'Professional' | 'Enterprise'
  topStrength: { dimension: string; score: number }
  topImprovement: { dimension: string; score: number }
  certificateId: string
  resultUrl: string
}

/**
 * Send assessment completion alert to Slack
 * 
 * Notifies sales/support team of high-value assessments
 * Useful for immediate follow-up on enterprise assessments
 * 
 * Usage:
 * ```ts
 * await notifySlack({
 *   userName: 'John Doe',
 *   userEmail: 'john@example.com',
 *   overallScore: 85,
 *   assessmentType: 'Professional',
 *   topStrength: { dimension: 'Capability', score: 92 },
 *   topImprovement: { dimension: 'Governance', score: 55 },
 *   certificateId: 'TwB-123-abc',
 *   resultUrl: 'https://app.twb.com/assessment-results'
 * })
 * ```
 */
export async function notifySlack(data: SlackNotification) {
  try {
    // Validate webhook URL
    const webhookUrl = process.env.SLACK_WEBHOOK_URL
    if (!webhookUrl) {
      console.log('[SLACK] Webhook URL not configured - notification skipped')
      return {
        success: false,
        error: 'Slack webhook not configured',
      }
    }

    // Determine alert level based on score
    let color = '#d4af37' // gold - default
    let urgency = 'Standard'

    if (data.overallScore >= 85) {
      color = '#00d084' // green - hot lead
      urgency = '🔥 HIGH VALUE'
    } else if (data.overallScore >= 70) {
      color = '#ffd700' // gold - qualified
      urgency = '⭐ Qualified'
    } else if (data.overallScore >= 50) {
      color = '#ff9500' // orange - emerging
      urgency = '📈 Emerging'
    }

    // Build Slack message
    const payload = {
      text: `New ${data.assessmentType} Assessment Completed - Score: ${data.overallScore}/100`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `${urgency} - ${data.assessmentType} Assessment Completed`,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*User:*\n${data.userName}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${data.userEmail}`,
            },
            {
              type: 'mrkdwn',
              text: `*Overall Score:*\n${data.overallScore}/100`,
            },
            {
              type: 'mrkdwn',
              text: `*Assessment Type:*\n${data.assessmentType}`,
            },
            {
              type: 'mrkdwn',
              text: `*Top Strength:*\n${data.topStrength.dimension} (${data.topStrength.score})`,
            },
            {
              type: 'mrkdwn',
              text: `*Focus Area:*\n${data.topImprovement.dimension} (${data.topImprovement.score})`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Recommendation:*\n${getRecommendation(data.overallScore, data.assessmentType)}`,
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '📊 View Results',
              },
              url: data.resultUrl,
              style: 'primary',
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '💬 Contact User',
              },
              url: `mailto:${data.userEmail}?subject=Your AI Assessment Results - TwB`,
            },
          ],
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `Certificate ID: \`${data.certificateId}\``,
            },
          ],
        },
      ],
    }

    // Send to Slack
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('[SLACK ERROR]:', response.status, text)
      return {
        success: false,
        error: `Slack API error: ${response.status}`,
      }
    }

    console.log('[SLACK] Notification sent successfully')
    return {
      success: true,
      message: 'Slack notification sent',
    }
  } catch (error) {
    console.error('[SLACK ERROR]:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send Slack notification',
    }
  }
}

/**
 * Generate context-aware recommendation based on score and assessment type
 */
function getRecommendation(score: number, type: string): string {
  if (type === 'Enterprise' && score >= 80) {
    return 'Schedule executive briefing - strong AI readiness detected'
  }
  if (type === 'Professional') {
    if (score >= 80) return 'Ready for advanced certification track'
    if (score >= 60) return 'Schedule consultation for governance roadmap'
    return 'Recommend foundational training program'
  }
  if (score >= 75) return 'Qualified lead - schedule follow-up'
  if (score >= 50) return 'Nurture lead - send resources'
  return 'Awareness stage - educational content needed'
}

/**
 * Send critical alert (errors, high-priority events)
 */
export async function notifySlackAlert(message: string, severity: 'error' | 'warning' | 'info') {
  try {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL
    if (!webhookUrl) return

    const colors = {
      error: '#e74c3c',
      warning: '#f39c12',
      info: '#3498db',
    }

    const payload = {
      attachments: [
        {
          color: colors[severity],
          title: `${severity.toUpperCase()} - Assessment System`,
          text: message,
          ts: Math.floor(Date.now() / 1000),
        },
      ],
    }

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.error('[SLACK ALERT ERROR]:', error)
  }
}

/**
 * Send daily summary report to Slack
 */
export async function notifySlackDailySummary(stats: {
  assessmentsCompleted: number
  avgScore: number
  topAssessmentType: string
  totalSignups: number
  hotLeads: number
}) {
  try {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL
    if (!webhookUrl) return

    const payload = {
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📊 Daily Assessment Summary',
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Assessments Completed:*\n${stats.assessmentsCompleted}`,
            },
            {
              type: 'mrkdwn',
              text: `*Average Score:*\n${stats.avgScore}/100`,
            },
            {
              type: 'mrkdwn',
              text: `*Top Assessment:*\n${stats.topAssessmentType}`,
            },
            {
              type: 'mrkdwn',
              text: `*New Signups:*\n${stats.totalSignups}`,
            },
            {
              type: 'mrkdwn',
              text: `*🔥 Hot Leads:*\n${stats.hotLeads}`,
            },
          ],
        },
      ],
    }

    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch (error) {
    console.error('[SLACK SUMMARY ERROR]:', error)
  }
}
