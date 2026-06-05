'use client'

import { useEffect, useRef } from 'react'

interface GenomeScore {
  dimension: string
  score: number // 0-100
  category: string
}

interface AIGenomeRadarProps {
  scores: GenomeScore[]
  title?: string
}

export function AIGenomeRadar({ 
  scores = [
    { dimension: 'Capability', score: 65, category: 'Infrastructure' },
    { dimension: 'Governance', score: 45, category: 'Risk Management' },
    { dimension: 'Workforce', score: 55, category: 'Skills' },
    { dimension: 'Data', score: 70, category: 'Foundation' },
    { dimension: 'Automation', score: 60, category: 'Operations' },
    { dimension: 'Innovation', score: 50, category: 'Growth' },
    { dimension: 'ROI', score: 40, category: 'Value' },
    { dimension: 'Risk', score: 35, category: 'Safety' },
  ],
  title = 'Your AI Genome',
}: AIGenomeRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const center = { x: width / 2, y: height / 2 }
    const radius = Math.min(width, height) / 2.5
    const levels = 5 // Concentric circles for 0-100
    const axes = scores.length

    // Clear canvas
    ctx.fillStyle = '#0A0A0A'
    ctx.fillRect(0, 0, width, height)

    // Draw concentric circles (grid)
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)'
    ctx.lineWidth = 1
    for (let i = 1; i <= levels; i++) {
      const r = (radius / levels) * i
      ctx.beginPath()
      ctx.arc(center.x, center.y, r, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw axes and labels
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)'
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'center'

    scores.forEach((item, i) => {
      const angle = (Math.PI * 2 * i) / axes - Math.PI / 2
      const x = center.x + radius * Math.cos(angle)
      const y = center.y + radius * Math.sin(angle)

      // Draw axis line
      ctx.beginPath()
      ctx.moveTo(center.x, center.y)
      ctx.lineTo(x, y)
      ctx.stroke()

      // Draw label
      const labelDistance = radius + 30
      const labelX = center.x + labelDistance * Math.cos(angle)
      const labelY = center.y + labelDistance * Math.sin(angle)
      ctx.fillText(item.dimension, labelX, labelY)

      // Draw score value
      ctx.fillStyle = 'rgba(212, 175, 55, 0.9)'
      ctx.font = 'bold 11px sans-serif'
      const scoreX = center.x + (radius + 15) * Math.cos(angle)
      const scoreY = center.y + (radius + 15) * Math.sin(angle)
      ctx.fillText(`${item.score}`, scoreX, scoreY)
    })

    // Draw the data polygon
    ctx.fillStyle = 'rgba(212, 175, 55, 0.2)'
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)'
    ctx.lineWidth = 2

    ctx.beginPath()
    scores.forEach((item, i) => {
      const angle = (Math.PI * 2 * i) / axes - Math.PI / 2
      const r = (radius / 100) * item.score
      const x = center.x + r * Math.cos(angle)
      const y = center.y + r * Math.sin(angle)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw data points
    ctx.fillStyle = 'rgba(212, 175, 55, 1)'
    scores.forEach((item, i) => {
      const angle = (Math.PI * 2 * i) / axes - Math.PI / 2
      const r = (radius / 100) * item.score
      const x = center.x + r * Math.cos(angle)
      const y = center.y + r * Math.sin(angle)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw level labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
    ctx.font = '10px sans-serif'
    ctx.textAlign = 'left'
    for (let i = 1; i <= levels; i++) {
      const r = (radius / levels) * i
      const labelY = center.y - r
      ctx.fillText(`${(i * 100) / levels}`, center.x + 5, labelY - 3)
    }
  }, [scores.length, JSON.stringify(scores)])

  const overallScore = Math.round(scores.reduce((acc, s) => acc + s.score, 0) / scores.length)
  const strengths = scores.filter(s => s.score >= 70).map(s => s.dimension)
  const weaknesses = scores.filter(s => s.score < 50).map(s => s.dimension)

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Radar Canvas */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-md">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Statistics Panel */}
        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
            
            <div className="bg-background/50 border border-border rounded-xl p-6 mb-6">
              <p className="text-foreground/60 text-sm mb-3">Overall AI Readiness Score</p>
              <div className="text-5xl font-bold text-gold mb-4">{overallScore}</div>
              <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold to-amber-500 transition-all"
                  style={{ width: `${overallScore}%` }}
                />
              </div>
              <p className="text-foreground/60 text-xs mt-3">
                {overallScore >= 80 && 'Excellence level - Strong AI maturity'}
                {overallScore >= 60 && overallScore < 80 && 'Strategic level - Good foundation'}
                {overallScore >= 40 && overallScore < 60 && 'Operational level - Developing capabilities'}
                {overallScore < 40 && 'Foundational level - Building AI fundamentals'}
              </p>
            </div>
          </div>

          {/* Strengths */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Strengths</h4>
            {strengths.length > 0 ? (
              <div className="space-y-2">
                {strengths.map((strength) => {
                  const score = scores.find(s => s.dimension === strength)?.score || 0
                  return (
                    <div key={strength} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-green-500/30">
                      <span className="text-sm text-foreground">{strength}</span>
                      <span className="text-sm font-bold text-green-400">{score}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-foreground/60">No dimensions scored 70+</p>
            )}
          </div>

          {/* Weaknesses */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">Focus Areas</h4>
            {weaknesses.length > 0 ? (
              <div className="space-y-2">
                {weaknesses.map((weakness) => {
                  const score = scores.find(s => s.dimension === weakness)?.score || 0
                  return (
                    <div key={weakness} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-amber-500/30">
                      <span className="text-sm text-foreground">{weakness}</span>
                      <span className="text-sm font-bold text-amber-400">{score}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-foreground/60">No focus areas identified</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
