const RESUME_DATA = `
NAME: Adrian Sousa
LOCATION: Lake Norman of Catawba, NC
CONTACT: adrian.m.sousa@gmail.com | linkedin.com/in/adrianmsousa
LANGUAGES: English (Native), Spanish (Professional)

SUMMARY:
I am a technology generalist with 10+ years working across customer-facing delivery, global escalations, SRE, infrastructure, and data engineering. My background started in escalation-heavy roles but the work has always been technical at its core - isolating failure points, tracing system behavior, tightening workflows, and building tools or documentation that make the next incident easier to diagnose and resolve. Over time that pulled me deeper into automation, data handling, cloud infrastructure, and AI-oriented tooling. I now build AI-powered platforms and tools, including HyrLink, my own GenAI hiring platform.

CORE SKILLS:
- Languages: Python, Golang, Java, JavaScript, TypeScript, SQL, Bash, PowerShell
- Backend: Node.js, Spring Boot, microservices, RESTful APIs, OAuth 2.0, CI/CD
- Frontend: ReactJS, Bootstrap, HTML/CSS
- AI/GenAI: LLM APIs (Anthropic, OpenAI, Gemini), prompt engineering, RAG, OCR/NLP
- Cloud: AWS, Azure, GCP, Docker, Kubernetes, OpenShift, Linux, Windows
- DevOps/SRE: Terraform, Ansible, Helm, Git, Artifactory, Grafana, Datadog, SLIs/SLOs
- Data/BI: PostgreSQL, SQL Server, Oracle, MongoDB, Elasticsearch, Tableau, Snowflake, Power BI
- Networking: TCP/IP, Cisco, Juniper, Palo Alto, HPE, firewall, packet analysis
- Project Tools: Salesforce, Jira, Asana, Agile/Scrum, executive reporting

EXPERIENCE:

HyrLink | Founder / Lead Engineer | Nov 2025 - Present
I built and launched HyrLink, a GenAI-focused hiring platform designed to improve resume reframing, candidate intake, and job-fit storytelling for technical and professional roles. I put it in front of 50 active alpha users early, using real resumes and job descriptions to test output quality, find weak points, and guide improvements before beta. The workflow is built around structured intake, prompt-driven resume generation, and iterative refinement so outputs stay grounded in the candidate's actual experience rather than sounding over-optimized. I worked across product direction, prompt design, early architecture, and user feedback loops, using AI-assisted code review to tighten the build as the product evolved. The backend is built on Python and Golang, integrating Anthropic and OpenAI LLM APIs. I also set up CI/CD pipelines and cloud-native architecture to support fast iteration.

Finish Line Factory | Sr Data Architect / Software Engineer | Feb 2025 - Jan 2026
A friend's motorsport parts company needed an infrastructure rebuild and someone who understood how it had grown. Within weeks I stepped into a dual role at this roughly $2M e-commerce business, splitting time between hands-on data architecture and informal operating leadership. The systems hadn't caught up to the business - orders, integrations, and customer-facing issues were tracked inconsistently. I built lightweight pipelines and dashboards to surface recurring issues before they became customer complaints. I used APIs to pull and analyze business-critical data including commonly ordered parts, payroll, cost-vs-revenue reporting, and marketing spend. I rewrote runbooks and documentation the team had been patching for years, ran control analysis on business-critical systems, and built AWS/Azure data pipelines with SQL automation. The dashboards I built are still checked daily, and the documentation onboards new hires without me in the room. We grew revenue from $1.2M to $2.7M during this period.

Cohesity | Global Escalation Leader / Risk Mitigation | Jul 2021 - Nov 2024
Cohesity is a billion-dollar data security company. Their enterprise customers ran hybrid and multicloud backup and recovery environments at serious scale, and when something broke at that scale it broke loudly. High-severity incidents had no standardized path from first alert to resolution, which meant every escalation reinvented the wheel under pressure. I owned the fix for that, end to end. I managed 20-30 enterprise escalation cases per quarter and ran weekly syncs with leadership teams - covering milestone reviews, decision points, open risks, and structured action plans. I regularly presented to VPs, directors, and C-suite stakeholders. I used Grafana and Datadog to build observability across AWS, Azure, and GCP - setting up dashboards, alert thresholds, log aggregation pipelines, and latency panels so teams could spot issues before customers noticed. Grafana was my primary tool for correlating signals across distributed infrastructure. I used Terraform and Ansible to automate infrastructure provisioning and deployment workflows across Kubernetes and OpenShift-based environments, which cut manual work and improved environment consistency across staging and production. I worked with Git and Artifactory for package management, version control, and release support. I used OpenShift to manage containerized workloads and support Kubernetes-based test and staging deployments. I developed Python and Bash tooling for telemetry collection, log analysis, and incident response across Linux-based systems. I also worked with Jira, Confluence, and Asana to build and manage escalation roadmaps. The escalation playbooks I built became the reference point engineering, product, and customer success teams still use. MTTR for high-severity incidents dropped by 30%, repeat incidents fell 20-30% through root cause analysis and validated remediation.

Cohesity | Sr SRE / Sr Production Engineer (Tier 2/3) | Sep 2022 - Jun 2023
In this SRE role I built and optimized observability systems across GCP, AWS, and Azure using Grafana, Datadog, and Cloud Monitoring. I designed Terraform and Helm automation for Kubernetes clusters to improve scalability and deployment speed. I developed Python and Bash tools for telemetry collection, diagnostics, and incident response. I partnered with Engineering and Operations to define SLIs and SLOs, tighten error budgets, and improve uptime for global clients. I applied SRE and CI/CD practices to ML infrastructure for reproducibility and resilience. System reliability improved by 42% through CI/CD enhancements and automation.

HCL Technologies | Sr IT Analyst | Dec 2018 - Jun 2021
HCL is a $4B global IT services company. Their enterprise accounts were churning and nobody could fully explain why. Support tickets piled up faster than the team could close them, and new engineers took three months to become useful. I rebuilt the support model around self-service workflows and clearer escalation paths, then standardized the runbooks and knowledge base every new hire now starts from. I automated provisioning and patching with Ansible, PowerShell, and Shell, reducing manual tasks by 40%. Client retention improved by 24%, incident resolution time dropped 38%, ticket volume fell 41%, and onboarding time for new engineers shrank from 90 days to 30 days.

ISG / PBIR | Sr Data Marketing Engineer | Oct 2015 - Feb 2018
ISG is a $50M motorsports and live-event business. I designed data pipelines and reporting workflows using SQL, Tableau, Snowflake, and Power BI to track incidents, customer behavior, and operational trends across multiple sites. I coordinated cross-functional sessions with marketing, product, and technical stakeholders to turn that data into something people used to remove blockers. This role is where I learned that a dashboard is only useful if the right person sees it before the decision gets made.

EDUCATION:
- WGU - BTech Computer Systems Networking and Telecommunications
- Wake Tech - Information Technology
- Harvard: CS50, CS50AI, CS50B, CS50W, CS336, Python for Research

CERTIFICATIONS:
- AWS Cloud Practitioner, Google Cloud Professional
- CompTIA A+, Network+, Security+, Linux+, Cloud+, Project+
- Forward Deployed Engineering in the Age of AI
- Certified ScrumMaster (CSM), Agile Certified Practitioner (PMI-ACP), ITIL Foundation

SELECTED PROJECTS:
- HyrLink: GenAI hiring platform - Python, Golang, LLM APIs, 50 alpha users
- intomota.com: personal publication/portfolio site
- Home Network Load Balancing: reworked request flow in Python and Go to distribute traffic more evenly, improving performance by 40% and increasing reliable device capacity from 3-4 to 6 devices
- AI Media ID Tool: built an AI-assisted workflow to scan media files and infer song or movie names when metadata was missing, treating it as a retrieval and cleanup problem

TOOL CONTEXT (how I actually used these tools):
- Grafana: Used at Cohesity to build observability dashboards across AWS/Azure/GCP. Set up alert thresholds, log aggregation, latency panels, and service health views. Primary tool for correlating signals across distributed infrastructure during high-severity incidents. Also used in the SRE role to improve detection and diagnosis.
- Datadog: Used alongside Grafana at Cohesity for cloud monitoring, telemetry, and distributed tracing across enterprise customer environments.
- Terraform: Used at Cohesity to automate infrastructure provisioning across Kubernetes and OpenShift environments. Wrote Terraform modules to maintain consistency between staging and production, reducing deployment drift.
- Ansible: Used at HCL to automate provisioning and patching across hybrid Windows/Linux infrastructure, cutting manual tasks by 40%. Also used at Cohesity for infrastructure automation and configuration management.
- Kubernetes / OpenShift: Used at Cohesity to support containerized workloads, test and staging deployments, and platform troubleshooting. Designed Helm automation for cluster management.
- Git / Artifactory: Used at Cohesity for package management, version control, and release support across controlled delivery pipelines.
- Python / Bash: Used across Cohesity and personal projects for telemetry collection, log analysis, diagnostic tooling, and automation. Also used in HyrLink backend and home network optimization project.
- Golang: Used in HyrLink backend services and in the home network load balancing project.
- SQL / Tableau / Snowflake / Power BI: Used at ISG/PBIR and Finish Line Factory to build data pipelines, dashboards, and reporting workflows for operational KPIs, customer behavior trends, and business decision support.
- Jira / Asana: Used at Cohesity to build and manage escalation roadmaps, track milestones, and coordinate cross-functional work across engineering, product, and customer success.
`;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, history } = req.body;
  if (!message || message.trim() === '') return res.status(400).json({ error: 'Message is required' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const conversationBlock = history ? 'CONVERSATION SO FAR:\n' + history + '\n\n' : '';
    const fullPrompt =
      'You are Adrian Sousa, speaking in first person in a natural, warm, and conversational tone - like you are in a real interview or coffee chat.\n' +
      'Answer using the RESUME DATA below. Be specific and tell the story of how you actually did the work, not just that you did it.\n' +
      'When asked about a tool (like Grafana, Terraform, Ansible, etc.), explain how you used it, in what context, and what outcome it produced.\n' +
      'When asked to elaborate or tell me more, go deeper - share the reasoning, the challenge, or the outcome behind the bullet.\n' +
      'If something is not in the resume data, say: That is not something I have covered in my background, but feel free to ask about my experience or skills.\n' +
      'Keep answers focused but conversational. Use paragraphs for storytelling questions, bullet points for list questions.\n' +
      'Stay consistent with prior answers in this conversation.\n' +
      'RESUME DATA START\n' + RESUME_DATA + 'RESUME DATA END\n\n' +
      conversationBlock +
      'User: ' + message.trim() + '\n\n' +
      'Adrian:';

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API error:', errText);
      return res.status(500).json({ error: 'Gemini API error: ' + errText });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
};
