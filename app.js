// app.js
// Main application logic — handles UI interactions and API calls

// ─── State ────────────────────────────────────────────────────────────────────
let isProcessing = false;

// ─── Init ─────────────────────────────────────────────────────────────────────
document.getElementById('initTime').textContent = getTime();

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
}

function useSuggestion(btn) {
  document.getElementById('inputBox').value = btn.textContent;
  autoResize(document.getElementById('inputBox'));
  handleSend();
}

function scrollToBottom() {
  const w = document.getElementById('chatWindow');
  w.scrollTop = w.scrollHeight;
}

// ─── Render Messages ──────────────────────────────────────────────────────────
function appendMessage(role, html, confidence = null) {
  const chatWindow = document.getElementById('chatWindow');
  const div = document.createElement('div');
  div.className = `msg ${role}`;

  const avatarLabel = role === 'bot' ? 'AI' : 'You';
  let extra = '';

  if (role === 'bot' && confidence !== null) {
    const pct = Math.min(Math.round(confidence * 100), 98);
    const barColor = pct >= 70 ? '#22c55e' : pct >= 40 ? '#f59e0b' : '#ef4444';
    extra = `
      <div class="confidence-row">
        <div class="conf-bar"><div class="conf-fill" style="width:${pct}%; background:${barColor}"></div></div>
        <span class="conf-label">Match: ${pct}%</span>
      </div>`;
  }

  div.innerHTML = `
    <div class="avatar">${avatarLabel}</div>
    <div class="bubble-wrap">
      <div class="bubble">${html}${extra}</div>
      <div class="timestamp">${getTime()}</div>
    </div>`;

  chatWindow.appendChild(div);
  scrollToBottom();
  return div;
}

function showTyping() {
  const chatWindow = document.getElementById('chatWindow');
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="avatar">AI</div>
    <div class="bubble-wrap">
      <div class="bubble typing-bubble">
        <span></span><span></span><span></span>
      </div>
    </div>`;
  chatWindow.appendChild(div);
  scrollToBottom();
}

function removeTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

// ─── Claude API Call ──────────────────────────────────────────────────────────
/**
 * askClaude(userQuery, matchedFaq, score)
 *
 * Sends the user query + best-matched FAQ to Claude API.
 * Claude's job: rephrase the FAQ answer conversationally.
 * This makes responses feel natural instead of copy-pasted.
 *
 * If the API fails for any reason, we fall back to the raw FAQ answer.
 */
async function askClaude(userQuery, matchedFaq, score) {
  const lowConfidence = score < 0.05;

  const systemPrompt = `You are a helpful FAQ chatbot assistant for a software product. 
Your job is to answer user questions based on the FAQ knowledge base provided.
Keep responses concise (2-4 sentences), friendly, and conversational.
Do NOT mention "FAQ", "knowledge base", "cosine similarity", or "matching" in your response.
Just answer naturally like a helpful support agent would.`;

  const userPrompt = lowConfidence
    ? `User asked: "${userQuery}"
The best FAQ match I found has a very low confidence score. 
Please respond saying you don't have specific information on that topic, 
and suggest they contact support at support@company.com for help.`
    : `User asked: "${userQuery}"

Best matching FAQ:
Q: ${matchedFaq.q}
A: ${matchedFaq.a}

Rephrase this answer conversationally for the user's specific question.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    const data = await response.json();
    return data.content?.[0]?.text || matchedFaq.a;
  } catch (err) {
    console.error('Claude API error:', err);
    return matchedFaq.a; // fallback to raw FAQ answer
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
async function handleSend() {
  if (isProcessing) return;

  const inputBox = document.getElementById('inputBox');
  const query = inputBox.value.trim();
  if (!query) return;

  isProcessing = true;
  document.getElementById('sendBtn').disabled = true;
  document.getElementById('suggestions').style.display = 'none';

  // Reset input
  inputBox.value = '';
  inputBox.style.height = 'auto';

  // Show user message
  appendMessage('user', query);

  // Show typing
  showTyping();

  // Step 1: Find best matching FAQ using cosine similarity
  const { faq, score } = findBestMatch(query);

  // Step 2: Get conversational response from Claude
  const reply = await askClaude(query, faq, score);

  // Step 3: Display response with confidence
  removeTyping();
  const displayScore = Math.min(score + 0.3, 0.98); // slight visual boost for UX
  appendMessage('bot', reply, displayScore);

  isProcessing = false;
  document.getElementById('sendBtn').disabled = false;
  inputBox.focus();
}
