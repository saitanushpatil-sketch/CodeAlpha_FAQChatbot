# CodeAlpha_FAQChatbot

**Task 2: FAQ Chatbot with Semantic Similarity**
CodeAlpha AI Internship 2026 | P.Sai Tanush | CA/DF1/99929

---

## Preview

J.A.R.V.I.S themed FAQ chatbot with Iron Man HUD UI — red/gold accents, scan line animation, arc reactor indicator, and semantic AI matching under the hood.

---

## How It Works

```
User types a question
        ↓
Tokenize → remove stopwords → build term-frequency vector
        ↓
Compare against every FAQ using cosine similarity
        ↓
Pick highest scoring FAQ entry
        ↓
Send to Claude API → get a JARVIS-style conversational reply
        ↓
Display with match confidence bar
```

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| NLP | Custom tokenizer + cosine similarity (no library) |
| AI Response | Anthropic Claude API |
| Fonts | Orbitron + Share Tech Mono (Google Fonts) |

## Project Structure

```
CodeAlpha_FAQChatbot/
├── index.html      # JARVIS HUD layout
├── style.css       # Iron Man themed styling
├── faq-data.js     # Knowledge base (15+ FAQ entries)
├── nlp.js          # Tokenizer + cosine similarity engine
├── app.js          # App logic + Claude API integration
└── README.md
```

## Run Locally

```bash
git clone https://github.com/saitanushpatil-sketch/CodeAlpha_FAQChatbot
cd CodeAlpha_FAQChatbot
# Just open index.html in any browser — no build step needed
```

---

*CodeAlpha AI Internship · June 2026*
