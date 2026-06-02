// nlp.js
// Natural Language Processing module
// Handles tokenization and cosine similarity matching

// ─── Stopwords ────────────────────────────────────────────────────────────────
// Common English words that carry no semantic meaning and should be ignored
const STOPWORDS = new Set([
  'i','me','my','myself','we','our','you','your','he','she','it','they',
  'what','which','who','whom','this','that','these','those','am','is','are',
  'was','were','be','been','being','have','has','had','do','does','did','will',
  'would','shall','should','may','might','can','could','a','an','the','and',
  'but','or','nor','for','so','yet','at','by','in','of','on','to','up','as',
  'how','when','where','why','with','from','about','into','through','during',
  'before','after','above','below','between','out','off','over','under','again',
  'then','once','here','there','all','both','each','few','more','most','other',
  'some','such','no','not','only','same','than','too','very','just','because',
  'if','while','although','though','even'
]);

// ─── Tokenizer ─────────────────────────────────────────────────────────────────
/**
 * tokenize(text)
 * Converts raw text into a frequency map (term frequency vector)
 * Steps:
 *   1. Lowercase the text
 *   2. Remove punctuation
 *   3. Split into individual words (tokens)
 *   4. Remove stopwords
 *   5. Build a Map of { word -> count }
 *
 * @param {string} text - Input sentence or paragraph
 * @returns {Map<string, number>} - Term frequency vector
 */
function tokenize(text) {
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')   // remove punctuation
    .split(/\s+/)                   // split on whitespace
    .filter(t => t.length > 1 && !STOPWORDS.has(t)); // remove stopwords

  const freq = new Map();
  tokens.forEach(token => {
    freq.set(token, (freq.get(token) || 0) + 1);
  });
  return freq;
}

// ─── Cosine Similarity ─────────────────────────────────────────────────────────
/**
 * cosineSimilarity(vecA, vecB)
 * Measures the cosine of the angle between two term-frequency vectors.
 * Returns a score between 0 (no similarity) and 1 (identical meaning).
 *
 * Formula:
 *   similarity = (A · B) / (|A| × |B|)
 *
 * Why cosine? Unlike Euclidean distance, cosine similarity is not affected
 * by the length of the text — only the direction (proportional word usage).
 *
 * @param {Map} vecA - Term frequency vector of text A
 * @param {Map} vecB - Term frequency vector of text B
 * @returns {number} - Similarity score between 0 and 1
 */
function cosineSimilarity(vecA, vecB) {
  const allTerms = new Set([...vecA.keys(), ...vecB.keys()]);

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (const term of allTerms) {
    const a = vecA.get(term) || 0;
    const b = vecB.get(term) || 0;
    dotProduct += a * b;
    magnitudeA += a * a;
    magnitudeB += b * b;
  }

  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

// ─── FAQ Matcher ──────────────────────────────────────────────────────────────
/**
 * findBestMatch(userQuery)
 * Runs the full pipeline:
 *   1. Tokenize the user's query
 *   2. For every FAQ entry, tokenize its question + answer text
 *   3. Compute cosine similarity between user query and each FAQ
 *   4. Return the FAQ with the highest similarity score
 *
 * @param {string} userQuery - The question the user typed
 * @returns {{ faq: object, score: number }} - Best matching FAQ and its score
 */
function findBestMatch(userQuery) {
  const queryVec = tokenize(userQuery);
  let bestFaq = null;
  let bestScore = -1;

  for (const faq of FAQ_DATA) {
    // We vectorize both the question AND answer to improve matching coverage
    const faqVec = tokenize(faq.q + ' ' + faq.a);
    const score = cosineSimilarity(queryVec, faqVec);

    if (score > bestScore) {
      bestScore = score;
      bestFaq = faq;
    }
  }

  return { faq: bestFaq, score: bestScore };
}
