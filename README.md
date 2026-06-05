# Debate Club from Hell

A browser-based visual novel / party game set in hell, where **Mafu**, yours truly, (the torturer down here), has some other ideas for your punishment.

🔗 **[Play it here](https://debate-club-hell.vercel.app)**

---

## About Mafu

Mafu is the torturer on duty. She didn't really choose this job, doesn't fully understand why she does it, and will tell you so if you ask. She's not cruel, just has been on graveyard shift for far too long and getting increasingly tired of running her family's business.. She introduces herself, flips a coin to decide your debate side, drops mid-round remarks, and gives you your score.

> *"My name is Mafu, I'm the torturer here."*
> *"I just show up, do my thing, and go home."*

---

## Gameplay Loop

Each run has three rounds:

**Round 1 & 2 — Debate**
- Mafu assigns you a position to defend and flips a coin to decide your side
- You get a **curse** — a writing constraint (e.g. the letter E is forbidden, no word over 5 letters)
- You write your argument under a timer; the AI judge evaluates it and scores you
- New round, new curse, new case

**Round 3 — Mafu's Quiz Show**
- A timed multiple choice quiz
- Correct answers earn points; wrong ones don't

**Final Verdict**
- Mafu gives you your score!

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Backend:** Node.js proxy server
- **AI:** Anthropic Claude API (`claude-sonnet-4-6`)
- **Assets:** Custom sprites, backgrounds, SFX, BGM
- **Deployed on:** Vercel

---

## Running Locally

1. Clone the repo:
   ```bash
   git clone https://github.com/jaymr06/debate-club-hell.git
   cd debate-club-hell
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```
   ANTHROPIC_API_KEY=your-key-here
   ```
4. Start the proxy:
   ```bash
   node proxy.js
   ```
5. Open `index.html` in your browser

> The proxy runs on `localhost:3001` and forwards requests to the Anthropic API, keeping the key off the frontend.

---

## Project Structure

```
debate-club-hell/
├── index.html        # Full game (UI + logic)
├── proxy.js          # Node.js API proxy
├── api/              # Vercel serverless functions
├── package.json
├── bg/               # Background images
├── sprites/          # Character sprites
├── bgm/              # Background music
├── sfx/              # Sound effects
└── misc/             # Other assets
```
