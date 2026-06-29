// Adrian Sousa v2 - JD Analyzer endpoint

const RESUME_SUMMARY = `
Adrian Sousa is a technology generalist and escalation specialist with 10+ years of experience across SRE, platform engineering, enterprise escalations, data architecture, and AI/GenAI development.

Core strengths: Grafana/Datadog observability, Terraform/Ansible/Helm infrastructure automation, Kubernetes/OpenShift, AWS/GCP/Azure, Python/JavaScript/SQL, LLM APIs (Gemini, Anthropic, OpenAI), PostgreSQL/Oracle, enterprise customer escalation and SLA management, cross-functional technical leadership.

Current: Founder of HyrLink (GenAI hiring platform, 50 alpha users). Previously Sr SRE and Global Escalation Leader at Cohesity (billion-dollar data security company). Sr Data Architect at Finish Line Factory. Sr IT Analyst at HCL Technologies ($13B global IT). Sr Data Engineer at ISG/PBIR.

Target role: Series A-C company with real infrastructure problems, room to build, and a growth trajectory. Title irrelevant. Impact is everything.

Key differentiator: Bridges technical depth with executive-level communication. The person organizations call when something critical breaks -- and the person who builds the systems and teams that prevent it from breaking again.
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { jdContent, isUrl } = req.body;
  if (!jdContent) return res.status(400).json({ error: 'No JD content provided' });

  let jdText = jdContent;

  // If it's a URL, attempt to fetch the page content
  if (isUrl) {
    try {
      const pageRes = await fetch(jdContent, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ResumeBot/1.0)' }
      });
      const html = await pageRes.text();
      // Strip HTML tags to get plain text
      jdText = html
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 4000);
    } catch (err) {
      return res.status(400).json({ error: 'Could not fetch that URL. Try pasting the job description text directly.' });
    }
  }

  const analyzePrompt =
    'You are Adrian Sousa, analyzing a job description to assess how your background fits the role.\n' +
    'Speak in first person. Be direct, confident, and specific. Do not oversell or undersell. Never begin with casual or dismissive openers -- open with substance.\n' +
    'Structure your response in three parts:\n' +
    '1. WHERE I AM A STRONG FIT: Map your specific experience, tools, and stories to the role requirements. Be concrete.\n' +
    '2. WHERE I WOULD BE LEARNING: Be honest about any gaps. Frame them as growth areas, not weaknesses.\n' +
    '3. WHAT CATCHES MY EYE: Note anything in the JD that tells you what problem the company is actually trying to solve -- the thing they are not saying directly. This is your instinct as someone who reads between the lines of job descriptions.\n\n' +
    'ADRIAN BACKGROUND:\n' + RESUME_SUMMARY + '\n\n' +
    'JOB DESCRIPTION:\n' + jdText.slice(0, 3500) + '\n\n' +
    'Adrian:';

  try {
    const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: analyzePrompt }] }],
          generationConfig: { temperature: 0.75, maxOutputTokens: 1200 }
        })
      }
    );
    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Could not analyze the job description.';
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Analyze API error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
