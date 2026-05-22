const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

class GeminiClientError extends Error {
  constructor(userMessage, { statusCode = 500, code = 'gemini_error', rawMessage } = {}) {
    super(userMessage);
    this.name = 'GeminiClientError';
    this.userMessage = userMessage;
    this.statusCode = statusCode;
    this.code = code;
    this.rawMessage = rawMessage;
  }
}

function hasGeminiKey() {
  const key = process.env.GEMINI_API_KEY;
  return typeof key === 'string' && key.trim().length > 0;
}

function convertMessagesForGemini(messages) {
  let systemInstruction = null;
  const contents = [];

  for (const msg of messages) {
    if (msg.role === 'system') {
      systemInstruction = { parts: [{ text: msg.content }] };
    } else {
      contents.push({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      });
    }
  }

  return { contents, systemInstruction };
}

async function callGeminiChat(messages) {
  if (!hasGeminiKey()) {
    throw new GeminiClientError(
      'Gemini is not configured on the server. Set GEMINI_API_KEY in the backend .env file.',
      { statusCode: 503, code: 'gemini_not_configured' }
    );
  }

  const apiKey = process.env.GEMINI_API_KEY.trim();
  const { contents, systemInstruction } = convertMessagesForGemini(messages);

  const body = { contents };
  if (systemInstruction) {
    body.system_instruction = systemInstruction;
  }

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error?.message || res.statusText || 'Gemini request failed';
    throw new GeminiClientError(`AI Error: ${msg}`, { statusCode: 502, code: 'gemini_api_error', rawMessage: msg });
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new GeminiClientError('The AI assistant returned an empty response.', {
      statusCode: 502,
      code: 'gemini_empty',
    });
  }

  return text;
}

function handleGeminiRouteError(error, res, fallbackMessage) {
  if (error instanceof GeminiClientError) {
    return res.status(error.statusCode).json({
      message: error.userMessage,
      code: error.code,
    });
  }
  return res.status(500).json({ message: error.message || fallbackMessage });
}

module.exports = {
  hasGeminiKey,
  callGeminiChat,
  handleGeminiRouteError,
};
