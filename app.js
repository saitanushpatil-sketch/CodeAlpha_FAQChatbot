// app.js — No API key needed, pure NLP matching

let busy = false;

document.getElementById('initTime').textContent = getTime();

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function scrollBot() {
  const b = document.getElementById('chatBody');
  b.scrollTop = b.scrollHeight;
}

function appendMsg(role, html, conf = null) {
  const body = document.getElementById('chatBody');
  const d = document.createElement('div');
  d.className = `msg ${role}`;
  const label = role === 'bot' ? 'JAR' : 'YOU';
  let extra = '';
  if (conf !== null && role === 'bot') {
    const pct = Math.min(Math.round(conf * 100), 98);
    const col = pct >= 70 ? '#f0a500' : pct >= 40 ? '#e74c3c' : '#666';
    extra = `<div class="conf-row"><div class="conf-track"><div class="conf-bar" style="width:${pct}%;background:${col}"></div></div><span class="conf-pct">MATCH: ${pct}%</span></div>`;
  }
  d.innerHTML = `<div class="msg-icon">${label}</div><div class="bubble-col"><div class="bubble">${html}${extra}</div><div class="msg-time">${getTime()}</div></div>`;
  body.appendChild(d);
  scrollBot();
}

function showTyping() {
  const body = document.getElementById('chatBody');
  const d = document.createElement('div');
  d.className = 'msg bot'; d.id = 'typing';
  d.innerHTML = `<div class="msg-icon">JAR</div><div class="bubble-col"><div class="bubble typing-bubble"><span></span><span></span><span></span></div></div>`;
  body.appendChild(d); scrollBot();
}

function removeTyping() {
  const t = document.getElementById('typing');
  if (t) t.remove();
}

async function fire() {
  if (busy) return;
  const inp = document.getElementById('jarvisInput');
  const q = inp.value.trim();
  if (!q) return;
  busy = true;
  document.getElementById('fireBtn').disabled = true;
  inp.value = ''; inp.style.height = 'auto';
  appendMsg('user', q);
  showTyping();

  // Simulate thinking delay
  await new Promise(r => setTimeout(r, 800));

  const { faq, score } = bestMatch(q);
  removeTyping();

  let reply;
  if (score < 0.05) {
    reply = "I'm afraid that query falls outside my current knowledge base, sir. I would recommend contacting support directly for assistance with that matter.";
  } else {
    reply = faq.a;
  }

  appendMsg('bot', reply, Math.min(score + 0.3, 0.98));
  busy = false;
  document.getElementById('fireBtn').disabled = false;
  inp.focus();
}

function useSugg(text) {
  document.getElementById('jarvisInput').value = text;
  fire();
}

document.getElementById('jarvisInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); fire(); }
});

document.getElementById('jarvisInput').addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 100) + 'px';
});
