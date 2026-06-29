// Adrian Sousa - v2 Frontend Logic

const INTRO_TEXT = "Hey — I'm Adrian. Ask me anything about my experience, my work, or what I'm looking for next.";

let conversationHistory = [];
let isTyping = false;

// --- Typewriter intro on load ---
function typewriterIntro(text, el, speed = 28) {
  let i = 0;
  el.innerHTML = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  el.appendChild(cursor);
  const interval = setInterval(() => {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
    } else {
      clearInterval(interval);
      cursor.remove();
    }
  }, speed);
}

window.addEventListener('DOMContentLoaded', () => {
  const introEl = document.getElementById('intro-text');
  setTimeout(() => typewriterIntro(INTRO_TEXT, introEl), 400);

  const input = document.getElementById('user-input');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
});

// --- Chip buttons ---
function sendChip(btn) {
  const text = btn.textContent.trim();
  document.getElementById('user-input').value = text;
  sendMessage();
}

// --- JD panel toggle ---
function toggleJD() {
  const panel = document.getElementById('jd-panel');
  const toggle = document.getElementById('jd-toggle');
  panel.classList.toggle('hidden');
  toggle.style.color = panel.classList.contains('hidden') ? '' : '#4a9eff';
  toggle.style.borderColor = panel.classList.contains('hidden') ? '' : '#4a9eff44';
}

function switchTab(tab) {
  const pasteContent = document.getElementById('jd-paste-content');
  const urlContent = document.getElementById('jd-url-content');
  const tabPaste = document.getElementById('tab-paste');
  const tabUrl = document.getElementById('tab-url');
  if (tab === 'paste') {
    pasteContent.style.display = '';
    urlContent.style.display = 'none';
    tabPaste.classList.add('active');
    tabUrl.classList.remove('active');
  } else {
    pasteContent.style.display = 'none';
    urlContent.style.display = '';
    tabPaste.classList.remove('active');
    tabUrl.classList.add('active');
  }
}

// --- JD Analyzer ---
async function analyzeJD() {
  const textarea = document.getElementById('jd-textarea');
  const urlInput = document.getElementById('jd-url-input');
  const pasteVisible = document.getElementById('jd-paste-content').style.display !== 'none';

  let jdContent = pasteVisible ? textarea.value.trim() : urlInput.value.trim();
  if (!jdContent) return;

  toggleJD();

  const userMsg = pasteVisible
    ? 'Analyze how my experience fits this job description:\n\n' + jdContent
    : 'Analyze how my experience fits the job at: ' + jdContent;

  appendUserMessage('Analyzing job description fit...');
  const thinkingEl = appendThinking();
  setSendDisabled(true);

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jdContent, isUrl: !pasteVisible })
    });
    const data = await res.json();
    thinkingEl.remove();
    if (data.reply) {
      appendAdrianMessage(data.reply);
      conversationHistory.push({ role: 'user', text: userMsg });
      conversationHistory.push({ role: 'adrian', text: data.reply });
    } else {
      appendAdrianMessage('Something went wrong analyzing that JD. Try pasting the text directly.');
    }
  } catch (err) {
    thinkingEl.remove();
    appendAdrianMessage('Had trouble reaching the server. Try again in a moment.');
  }

  setSendDisabled(false);
  textarea.value = '';
  urlInput.value = '';
}

// --- Main chat send ---
async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message || isTyping) return;

  input.value = '';
  appendUserMessage(message);
  const thinkingEl = appendThinking();
  setSendDisabled(true);
  isTyping = true;

  // Hide chips after first message
  document.getElementById('prompt-chips').style.display = 'none';

  const history = conversationHistory
    .map(m => (m.role === 'user' ? 'User: ' : 'Adrian: ') + m.text)
    .join('\n');

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history })
    });
    const data = await res.json();
    thinkingEl.remove();
    if (data.reply) {
      appendAdrianMessage(data.reply);
      conversationHistory.push({ role: 'user', text: message });
      conversationHistory.push({ role: 'adrian', text: data.reply });
    } else {
      appendAdrianMessage('Something went wrong on my end. Try again.');
    }
  } catch (err) {
    thinkingEl.remove();
    appendAdrianMessage('Had trouble connecting. Try again in a moment.');
  }

  isTyping = false;
  setSendDisabled(false);
}

// --- DOM helpers ---
function appendUserMessage(text) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg-user';
  div.innerHTML = '<div class="bubble">' + escapeHtml(text) + '</div>';
  msgs.appendChild(div);
  scrollToBottom();
}

function appendAdrianMessage(text) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg-adrian';
  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = 'Adrian';
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  // Convert newlines to paragraphs
  const paragraphs = text.split(/\n\n+/);
  bubble.innerHTML = paragraphs.map(p => '<p>' + escapeHtml(p.trim()) + '</p>').join('');
  div.appendChild(label);
  div.appendChild(bubble);
  msgs.appendChild(div);
  scrollToBottom();
}

function appendThinking() {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg-adrian';
  div.innerHTML = '<span class="label">Adrian</span><div class="bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
  msgs.appendChild(div);
  scrollToBottom();
  return div;
}

function setSendDisabled(val) {
  document.getElementById('send-btn').disabled = val;
  document.getElementById('analyze-btn').disabled = val;
}

function scrollToBottom() {
  const msgs = document.getElementById('chat-messages');
  msgs.scrollTop = msgs.scrollHeight;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
