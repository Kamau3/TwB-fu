'use server'

export async function generateCertificateHTML(data: {
  name: string
  title: string
  level: string
  score: number
  date: string
  certificateId: string
  insight: string
}) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #0f1419;
      padding: 20px;
    }

    .certificate {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      aspect-ratio: 4 / 3;
      background: linear-gradient(135deg, #1a1f2e 0%, #0f1419 50%, #1a1f2e 100%);
      border: 3px solid #d4af37;
      border-radius: 20px;
      padding: 60px 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(212, 175, 55, 0.3);
    }

    .certificate::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(212, 175, 55, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: drift 20s linear infinite;
    }

    @keyframes drift {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 50px); }
    }

    .certificate-content {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
    }

    .logo {
      font-size: 24px;
      font-weight: 900;
      color: #d4af37;
      letter-spacing: 3px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .subtitle {
      color: #a0a0a0;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .divider {
      height: 2px;
      background: linear-gradient(90deg, transparent, #d4af37, transparent);
      margin: 20px 0;
    }

    .body {
      text-align: center;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .achievement-text {
      color: #b8b8b8;
      font-size: 14px;
      letter-spacing: 1px;
      margin-bottom: 15px;
      text-transform: uppercase;
    }

    .recipient-name {
      font-size: 48px;
      font-weight: 700;
      color: #d4af37;
      margin: 20px 0;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .title {
      font-size: 28px;
      color: #ffffff;
      margin: 20px 0;
      font-weight: 600;
    }

    .level-badge {
      display: inline-block;
      padding: 10px 30px;
      background: linear-gradient(135deg, #d4af37, #f4e4a0);
      border-radius: 50px;
      color: #1a1f2e;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: 2px;
      margin: 20px 0;
      text-transform: uppercase;
    }

    .score-display {
      background: rgba(212, 175, 55, 0.1);
      border: 2px solid #d4af37;
      border-radius: 15px;
      padding: 20px;
      margin: 20px 0;
    }

    .score-text {
      color: #a0a0a0;
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    .score-value {
      font-size: 36px;
      font-weight: 900;
      color: #d4af37;
    }

    .insight {
      color: #b8b8b8;
      font-size: 12px;
      margin: 15px 0;
      font-style: italic;
      line-height: 1.6;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 30px;
    }

    .signature-area {
      text-align: center;
      flex: 1;
    }

    .signature-line {
      width: 150px;
      height: 1px;
      background: #d4af37;
      margin: 10px auto 5px;
    }

    .signature-text {
      color: #a0a0a0;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .cert-id {
      color: #666;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-top: 10px;
    }

    .date-location {
      text-align: center;
      flex: 1;
    }

    .date-text {
      color: #a0a0a0;
      font-size: 11px;
      letter-spacing: 1px;
    }

    .seal {
      flex: 1;
      text-align: right;
    }

    .seal-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      border: 2px solid #d4af37;
      border-radius: 50%;
      background: rgba(212, 175, 55, 0.05);
      font-size: 32px;
      font-weight: 900;
      color: #d4af37;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }

      .certificate {
        max-width: 100%;
        aspect-ratio: auto;
        padding: 80px 100px;
        margin: 0;
        box-shadow: none;
        page-break-after: always;
      }
    }
  </style>
</head>
<body>
  <div class="certificate">
    <div class="certificate-content">
      <div class="header">
        <div class="logo">TwB</div>
        <div class="subtitle">Trusted by Business</div>
        <div class="divider"></div>
      </div>

      <div class="body">
        <div class="achievement-text">This is to certify that</div>
        <div class="recipient-name">${data.name}</div>
        
        <div class="divider"></div>

        <div class="achievement-text">has demonstrated proficiency in</div>
        <div class="title">${data.title}</div>

        <div class="level-badge">${data.level} Level</div>

        <div class="score-display">
          <div class="score-text">AI Readiness Score</div>
          <div class="score-value">${data.score}/100</div>
        </div>

        <div class="insight">
          "${data.insight}"
        </div>
      </div>

      <div class="footer">
        <div class="signature-area">
          <div class="signature-line"></div>
          <div class="signature-text">Issued By</div>
          <div class="signature-text">TwB Assessment</div>
        </div>

        <div class="date-location">
          <div class="date-text">${data.date}</div>
          <div class="cert-id">ID: ${data.certificateId}</div>
        </div>

        <div class="seal">
          <div class="seal-badge">✓</div>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
  `
}
