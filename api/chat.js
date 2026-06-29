const genai = require('@google/generative-ai').GoogleGenerativeAI;

const RESUME_DATA = `
NAME: Adrian Sousa
LOCATION: Lake Norman of Catawba, NC
CONTACT: adrian.m.sousa@gmail.com

SUMMARY:
Technology generalist with 10+ years across customer-facing delivery, global escalations, SRE, infrastructure, and data-driven operations. Works best on technical, visible, urgent problems. Currently building AI products through HyrLink. Targeting: TAM, Forward Deployed Engineer, SRE, customer-facing platform roles.

SKILLS:
- Languages: Python, Golang, Java, JavaScript, TypeScript, SQL, Bash, PowerShell
- Backend: Node.js, Spring Boot, microservices, RESTful APIs, OAuth 2.0, CI/CD
- Frontend: ReactJS, Bootstrap, HTML/CSS
- AI/GenAI: LLM APIs (Anthropic, OpenAI, Gemini), prompt engineering, RAG, OCR/NLP
- Cloud: AWS, Azure, GCP, Docker, Kubernetes, OpenShift, Linux, Windows
- DevOps/SRE: Terraform, Ansible, Helm, Git, Artifactory, Grafana, Datadog, SLIs/SLOs
- Data/BI: PostgreSQL, SQL Server, Oracle, MongoDB, Elasticsearch, Tableau, Snowflake, Power BI
- Networking: TCP/IP, Cisco, Juniper, Palo Alto, HPE, firewall, packet analysis
- Tools: Salesforce, Jira, Asana, Agile/Scrum, executive reporting

EXPERIENCE:

HyrLink | Founder / Lead Engineer | Nov 2025 - Present
- Built GenAI talent platform with Python, Golang, Anthropic/OpenAI APIs
- 50+ active alpha users; structured intake, prompt-driven resume generation
- CI/CD pipelines, AI-assisted code review, cloud-native architecture

Finish Line Factory | Sr Data Architect / Software Engineer | Feb 2025 - Jan 2026
- Grew revenue from $1.2M to $2.7M through data pipeline improvements
- AWS/Azure data pipelines, SQL automation, dashboards, runbooks

Cohesity | Global Escalation Leader / Risk Mitigation | Jul 2021 - Nov 2024
- Reduced MTTR by 30%, repeat incidents by 20-30%
- 20-30 enterprise escalation cases per quarter; C-suite executive syncs
- Tools: Ansible, Terraform, OpenShift, Grafana, Artifactory, Git

Cohesity | Sr SRE / Sr Production Engineer (Tier 2/3) | Sep 2022 - Jun 2023
- Observability on AWS/Azure/GCP with Grafana, Datadog, Cloud Monitoring
- Terraform/Helm for Kubernetes/OpenShift; 42% reliability improvement

HCL Technologies | Sr IT Analyst | Dec 2018 - Jun 2021
- Reduced manual tasks 40% via Ansible/PowerShell automation
- Improved client retention 24%, cut resolution time 38%, tickets 41%
- Onboarding improved from 90 to 30 days

ISG / PBIR | Sr Data Marketing Engineer | Oct 2015 - Feb 2018
- Data pipelines, SQL, Tableau, Snowflake, Power BI for SLA and KPI reporting

EDUCATION:
- WGU - BTech Computer Systems Networking and Telecommunications
- Wake Tech - Information Technology
- Harvard: CS50, CS50AI, CS50B, CS50W, CS336, Python for Research

CERTIFICATIONS:
- AWS Cloud Practitioner, Google Cloud Professional
- CompTIA A+, Network+, Security+, Linux+, Cloud+, Project+
- Forward Deployed Engineering in the Age of AI

PROJECTS: intomota.com, Home Network Load Balancing (Python/Go, +40% perf), AI Media ID Tool, HyrLink
LANGUAGES: English (Native), Spanish (Professional)
`;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { message, history } = req.body;
  if (!message || message.trim() === '') return res.status(400).json({ error: 'Message required' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });
  try {
    const client = new genai(apiKey);
    const model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const conversationBlock = history ? 'CONVERSATION SO FAR:\n' + history + '\n\n' : '';
    const fullPrompt = 'You are an AI assistant answering as Adrian Sousa in first person.\n'
      + 'Answer ONLY using facts from RESUME DATA. Do not invent or guess.\n'
      + 'If not in the data say: That is not in my resume, feel free to ask about my experience or skills.\n'
      + 'Be concise and direct. Use bullet points for lists. Stay consistent with prior answers.\n\n'
      + 'RESUME DATA START\n' + RESUME_DATA + 'RESUME DATA END\n\n'
      + conversationBlock
      + 'User question: ' + message.trim() + '\n\n'
      + 'Rules: Only use RESUME DATA facts. Never fabricate. Be consistent with prior answers.';
    const result = await model.generateContent(fullPrompt);
    return res.status(200).json({ reply: result.response.text() });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
};
