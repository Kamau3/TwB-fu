'use server'

import { createClient } from '@/lib/supabase/server'

interface AssessmentData {
  userId: string
  assessmentType: 'Free' | 'Professional' | 'Enterprise'
  answers: Record<number, number> // question id -> option index
  scores: {
    overall: number
    dimensions: Record<string, number>
  }
  completedAt: string
  ipAddress?: string
  userAgent?: string
}

/**
 * Save assessment results to Supabase
 * 
 * This stores:
 * - Raw assessment responses
 * - Calculated scores by dimension
 * - Timestamp and metadata
 * 
 * Usage:
 * ```ts
 * await saveAssessment({
 *   userId: 'user-123',
 *   assessmentType: 'Professional',
 *   answers: { 1: 2, 2: 3, ... },
 *   scores: {
 *     overall: 78,
 *     dimensions: { 'Capability': 75, 'Governance': 80, ... }
 *   },
 *   completedAt: new Date().toISOString()
 * })
 * ```
 */
export async function saveAssessment(data: AssessmentData) {
  try {
    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== data.userId) {
      return {
        success: false,
        error: 'Unauthorized: User ID mismatch',
      }
    }

    // Save assessment record
    const { data: assessment, error: insertError } = await supabase
      .from('assessments')
      .insert({
        user_id: data.userId,
        assessment_type: data.assessmentType,
        responses: data.answers,
        ai_readiness_score: data.scores.overall,
        genome_data: {
          dimensions: data.scores.dimensions,
          timestamp: data.completedAt,
          ipAddress: data.ipAddress,
        },
        status: 'completed',
        completed_at: data.completedAt,
      })
      .select()
      .single()

    if (insertError) {
      console.error('[SUPABASE ERROR]:', insertError)
      return {
        success: false,
        error: `Failed to save assessment: ${insertError.message}`,
      }
    }

    // Also save to AI genome profiles for benchmarking
    const { error: profileError } = await supabase
      .from('ai_genome_profiles')
      .upsert(
        {
          user_id: data.userId,
          assessment_id: assessment.id,
          overall_score: data.scores.overall,
          capability_score: data.scores.dimensions['Capability'] || 0,
          governance_score: data.scores.dimensions['Governance'] || 0,
          workforce_score: data.scores.dimensions['Workforce'] || 0,
          data_score: data.scores.dimensions['Data Quality'] || 0,
          automation_score: data.scores.dimensions['Automation'] || 0,
          innovation_score: data.scores.dimensions['Innovation'] || 0,
          risk_score: 100 - (data.scores.dimensions['Governance'] || 0),
          roi_score: Math.round((data.scores.overall * 1.2) % 100),
          strengths: Object.entries(data.scores.dimensions)
            .filter(([_, score]) => score >= 70)
            .map(([dim, score]) => ({ dimension: dim, score })),
          weaknesses: Object.entries(data.scores.dimensions)
            .filter(([_, score]) => score < 60)
            .map(([dim, score]) => ({ dimension: dim, score })),
          recommendations: {
            generated_at: data.completedAt,
            assessment_level: data.assessmentType,
          },
        },
        {
          onConflict: 'user_id',
        }
      )

    if (profileError) {
      console.error('[PROFILE ERROR]:', profileError)
      // Don't fail if profile save fails - assessment was saved
    }

    return {
      success: true,
      assessmentId: assessment.id,
      message: 'Assessment saved successfully',
    }
  } catch (error) {
    console.error('[SAVE ASSESSMENT ERROR]:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save assessment',
    }
  }
}

/**
 * Get user's assessment history
 */
export async function getAssessmentHistory(userId: string) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== userId) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    const { data: assessments, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      assessments,
    }
  } catch (error) {
    console.error('[GET HISTORY ERROR]:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch history',
    }
  }
}

/**
 * Get overall AI genome profile for user
 */
export async function getGenomeProfile(userId: string) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.id !== userId) {
      return {
        success: false,
        error: 'Unauthorized',
      }
    }

    const { data: profile, error } = await supabase
      .from('ai_genome_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      profile: profile || null,
    }
  } catch (error) {
    console.error('[GET PROFILE ERROR]:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch profile',
    }
  }
}
