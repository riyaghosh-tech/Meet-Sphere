# MeetSphere

A full-stack application containing a React frontend and Node.js backend.

## OpenAI (optional)

Event Prep blueprints and group chat `@ai` messages use OpenAI when configured on the **backend** only (never put API keys in frontend code).

1. Copy `backend/.env.example` to `backend/.env`.
2. Set `OPENAI_API_KEY` from [OpenAI API keys](https://platform.openai.com/api-keys).
3. Optionally set `OPENAI_MODEL` (default `gpt-4o-mini`).

If `OPENAI_API_KEY` is unset, both features run in **demo mode** with local template responses—no billing required for development.

If you see a usage-limit error in the app, add billing or credits at [OpenAI billing](https://platform.openai.com/account/billing). Rotate any API key that was ever committed to git.
