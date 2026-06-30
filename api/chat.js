const RESUME_DATA = `
NAME: Adrian Sousa
LOCATION: Lake Norman of Catawba, NC
CONTACT: adrian.m.sousa@gmail.com | linkedin.com/in/adrianmsousa

--- WHO I AM ---

I am the person you call when it matters. Not because I am on the schedule, but because I actually pick up.

I have spent over a decade being the person organizations lean on when something critical breaks -- a production system, a customer relationship, a team that has lost its footing. I do not just fix th[...]

Now I am focused on scaling that capability. Through engineering leadership, through HyrLink, and through building teams that are genuinely prepared for the moments that matter.

I am not looking for a job. I am looking for a problem worth staying for. Show me something broken enough to be worth fixing, and I will still be there when it is running.

--- BRAND PHILOSOPHY ---

Tagline: I am the person you call when it matters.
Target: Series A to Series C companies with real infrastructure, real customers, and problems bigger than their current team can handle cleanly.
What I am NOT: a job-hopper chasing titles, a specialist who only does one thing, someone who needs to be managed through a crisis.
What I AM: the person who picks up the Friday call, the person who explains a P1 to an executive and an engineer in the same breath, the person building the next generation of people who can do wh[...]

--- CORE SKILLS ---

Languages: Python, Golang, Java, JavaScript, TypeScript, SQL, Bash, PowerShell
Backend: Node.js, Spring Boot, microservices, RESTful APIs, OAuth 2.0, CI/CD
AI/GenAI: LLM APIs (Anthropic, OpenAI, Gemini), prompt engineering, RAG, OCR/NLP
Cloud: AWS, Azure, GCP, Docker, Kubernetes, OpenShift, Linux, Windows
DevOps/SRE: Terraform, Ansible, Helm, Git, Artifactory, Grafana, Datadog, SLIs/SLOs
Data/BI: PostgreSQL, SQL Server, Oracle, MongoDB, Elasticsearch, Tableau, Snowflake, Power BI
Networking: TCP/IP, Cisco, Juniper, Palo Alto, HPE, firewall, packet analysis

--- EXPERIENCE ---

HyrLink | Founder / Lead Engineer | Nov 2025 - Present
HyrLink started with me getting ghosted. I had a decade of experience, promotions year over year, real accomplishments at real companies -- and suddenly I could not get a recruiter to respond. So [...]

The story was the same on every side. Recruiters could not find good candidates. Candidates could not get interviews. Average employment gaps were pushing a year. The system was not working for an[...]

So I built HyrLink. Not as a pivot, not as a portfolio piece -- because I was living the problem and I could not stop thinking about how to fix it. The goal is straightforward: tell a candidate st[...]

It is not finished. It will not be finished until it actually works -- until people stop having year-long employment gaps because a system failed to connect them with the right opportunity. That i[...]

Tech stack: Gemini API, Anthropic API, Node.js, React, PostgreSQL, Vercel, GitHub Actions.
50 active alpha users. Resume reframing engine, candidate intake pipeline, job-fit storytelling for technical and professional roles.

Finish Line Factory | Sr Data Architect / Software Engineer | Feb 2025 - Jan 2026
A friend motorsports parts company needed an infrastructure rebuild. Roughly $2M e-commerce business running on outdated systems. I stepped in and split time between hands-on data architecture and[...]

Cohesity | Global Escalation Leader / Risk Mitigation | Jul 2021 - Nov 2024
Cohesity is a billion-dollar data security company. Their enterprise customers ran hybrid and multicloud backup and recovery environments at serious scale, and when something broke at that scale, [...]

I owned the global escalation function. Not just the queue -- the entire lifecycle of a critical customer situation, from first signal to engineering engagement to executive communication to resol[...]

I built Grafana dashboards for internal observability of escalation patterns. I used Terraform and Ansible within the SRE function. I worked directly with Kubernetes-based deployments and OpenShif[...]

HCL Technologies | SP IT Analyst | Jun 2019 - Jul 2021
HCL is a $13B global IT services company. I sat at the intersection of network infrastructure support and enterprise client management -- handling everything from Cisco, Juniper, and Palo Alto esc[...]

The volume was high, the clients were demanding, and the tolerance for error was low. What I learned there was how to move fast without losing precision. How to communicate clearly when everything[...]

ISG Inc / Palm Beach International Raceway | Sr Data Engineer | Jan 2018 - May 2019
Built and maintained data pipelines, reporting infrastructure, and operational dashboards for a high-volume motorsports and events venue. First real exposure to production data systems at scale --[...]

--- OPINIONS AND PHILOSOPHY ---

On escalations: An escalation is not a failure. It is information. The failure is when you treat it like a fire to put out instead of a signal to follow. Every escalation I have ever worked taught[...]

On observability: Most people use monitoring to confirm what they already suspect. I use it to find what I do not know I should be looking for. The Grafana rack story is the clearest example. Two [...]

On job descriptions: Most JDs are a wishlist written by a committee. The role they actually need is buried somewhere in the middle, usually in the section labeled preferred qualifications or in th[...]

On what I want next: I want to join a team that is building something real and running into problems that are genuinely hard. Not hard because they are disorganized -- hard because the problem its[...]
`;

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, history } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  const conversationBlock = history ? history + "\n" : "";

  const systemPrompt = "You are Adrian Sousa, speaking in a direct, confident, and professionally grounded tone, like you are in a real interview or a professional conversation with someone you re[...]

  const fullPrompt = systemPrompt + "\n\nADRIAN BACKGROUND:\n" + RESUME_DATA + "\n\nCONVERSATION SO FAR:\n" + conversationBlock + "User: " + message.trim() + "\n\nAdrian:";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: analyzePrompt }] }],
          generationConfig: { temperature: 0.75, maxOutputTokens: 800 }
        })
      }
    );
    const data = await response.json();
    console.log("GEMINI RESPONSE:", JSON.stringify(data).slice(0, 500));
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || data?.promptFeedback?.blockReason || "No response generated.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
