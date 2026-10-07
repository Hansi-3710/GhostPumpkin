# Master AI Prompt Log & Workflow Analysis
**Course:** AME 294: Games and AI — Creating Games with Artificial Intelligence
**Assignment:** Portfolio Game 2 — Vibe-Coded Browser Game
**Student Name:** [Your Name]
**Project Title:** Ghost Pumpkin Patch
**Repository URL:** [https://github.com/username/ghost-pumpkin-patch]
**Itch.io URL (Optional Bonus):** [https://username.itch.io/ghost-pumpkin-patch]

---
## 1. Toolchain & AI Session Inventory
| Category | Primary Tool / Platform | Model Version / Specification | Purpose in Project |
| :-- | :-- | :-- | :-- |
| **Code Scaffolding Agent** | Claude (claude.ai chat) | Claude Sonnet 5.5 | Brainstorming, Phaser 3 project scaffold, file architecture |
| **Logic & Debugging Agent** | Claude (claude.ai chat) | Claude Sonnet 5.5 | Reward/Damage/End logic, collision handling, docs |
| **Audio / SFX Generator** | ElevenLabs Sound Effects | elevenlabs-sound-effects-v2 | 4 SFX: Reward, Damage, End (win), End (lose) |
| **Music / Atmosphere** | None | n/a | n/a |
| **Visual Asset Pipeline** | None (textures drawn in code with Phaser Graphics) | n/a | Pumpkin, ghost, and witch sprites generated at runtime |

---
## 2. Code Development Prompts (Reward — Damage — End Loop)
### 2.1 Initial Setup & Boilerplate Scaffolding
* **Date / Session:** 2026-10-07
* **Agent Used:** Claude Sonnet 5.5
* **Target Objective:** Pick a concept and scaffold the web entry point, game config, and scenes.

#### Exact Prompts Submitted:
1. "simple game ideas" (given with the assignment brief pasted in)
2. "Ghost Pumpkin Patch please"

#### Agent Output Summary & Key Changes:
* Created `index.html`, `src/config.js`, `src/audio.js`, `src/scenes.js`, `src/main.js`. Phaser 3.80.1 loads from the cdnjs CDN; plain script tags (no build step).
* [Add: did it work on first run? Any immediate hurdles?]

---
### 2.2 Implementing the Core Gameplay Triad (Reward — Damage — End)
* **Date / Session:** 2026-10-07
* **Agent Used:** Claude Sonnet 5.5
* **Target Objective:** Program the three foundational gameplay pillars (generated in the same pass as 2.1).

#### A. Reward Mechanic Prompt:
Same prompt as 2.1 ("Ghost Pumpkin Patch please"); the concept description already specified collecting pumpkins as the reward.
* **Implementation Outcome:** Pumpkins spawn on the field (6 at a time). Overlap with the player awards +1, plays the reward sound, and spawns a replacement. Ghost speed increases with each pumpkin.

#### B. Damage & Hazard Mechanic Prompt:
Same prompt; the concept specified ghosts as the hazard.
* **Implementation Outcome:** Ghosts chase the player. Contact removes 1 of 3 lives, plays the damage sound, shakes the camera, and gives 1.2 s of invulnerability (flicker) so one touch cannot drain all lives. A new ghost spawns every 15 s.

#### C. End State & Win/Loss Condition Prompt:
Same prompt.
* **Implementation Outcome:** Win at 12 pumpkins. Lose at 0 lives or when the 60 s sunrise timer ends. The End scene shows the result and restarts on tap or Space. A victory sound plays on a win and a separate sad sting plays on a loss.

---
### 2.3 Wiring Up the Web Audio API & Audio Triggers
* **Date / Session:** 2026-10-07
* **Agent Used:** Claude Sonnet 5.5
* **Target Objective:** Load audio assets, attach playback to Reward/Damage/End events.

#### Exact Prompt Submitted:
Part of the same initial prompt; follow-up: "Can you just create a github repo with this all pls finsiehd" and "Nope make sure the audios and everything is on there too please"

#### Implementation Outcome:
* `src/audio.js` loads `assets/audio/{reward,damage,end_win,end_lose}.mp3`. If a file is missing it plays a short synthesized beep instead. The audio context unlocks on the first tap/click on the Menu scene (Phaser handles this).
* [Add: any volume balancing you did]

---
## 3. Generative Audio & Sound Design Prompts
### 3.1 Sound 1: Reward SFX
* **Target Event:** Collecting a pumpkin
* **Audio Generator:** ElevenLabs Sound Effects (elevenlabs-sound-effects-v2)
* **Exact Prompt / Acoustic Descriptors:** "Short bright magical chime, a soft pluck with a sparkly tail, 0.5 seconds, playful Halloween mood."
* **Iterations & Refinements:** [Add: did the first generation work?] Result is 0.52 s, peak -10.4 dB (no clipping).
* **Exported Filename:** `/assets/audio/reward.mp3`

### 3.2 Sound 2: Damage SFX
* **Target Event:** Ghost touches the player
* **Audio Generator:** ElevenLabs Sound Effects (elevenlabs-sound-effects-v2)
* **Exact Prompt / Acoustic Descriptors:** "Spooky ghost whoosh with a low thud, hollow and eerie, 0.6 seconds."
* **Iterations & Refinements:** [Add] Result is 0.63 s, peak -9.1 dB (no clipping).
* **Exported Filename:** `/assets/audio/damage.mp3`

### 3.3 Sound 3: End State SFX (win and lose)
* **Target Event:** Win screen (victory) and game over (defeat)
* **Audio Generator:** ElevenLabs Sound Effects (elevenlabs-sound-effects-v2)
* **Exact Prompt / Acoustic Descriptors:**
  * Win: "Victory stinger: warm rising bell melody, 2 seconds, cozy autumn feel."
  * Lose: "Sad defeat sting" [add your exact prompt text]
* **Iterations & Refinements:** [Add] Both are about 2.0 s; peaks -5.7 dB (win) and -8.1 dB (lose), no clipping.
* **Exported Filenames:** `/assets/audio/end_win.mp3`, `/assets/audio/end_lose.mp3`

### 3.4 (Optional) Ambient Music
Not used.

---
## 4. Debugging, Error Recovery & Friction Log
Document at least 2 real incidents from your own testing (do not invent them). Things worth checking while you play: console errors (F12), audio not playing on mobile, ghosts spawning too close, difficulty too high or low.

### Incident 1: [Short Title]
* **Symptom / Error Message:** [Paste console log]
* **Root Cause:** [Add]
* **AI Follow-up Prompt Used to Fix:** [Paste exact prompt]
* **Resolution:** [Add]

### Incident 2: [Short Title]
* **Symptom / Error Message:** [Add]
* **Root Cause:** [Add]
* **AI Follow-up Prompt Used to Fix:** [Add]
* **Resolution:** [Add]

---
## 5. Human-in-the-Loop Curation & Analytical Reflection
(200–300 words)

[Write your reflection here: where AI sped you up, where it fell short, what design and audio decisions were yours.]

---
## 6. Asset Attribution & Licensing Table
| Asset Filename | Asset Type | AI Model / Source Tool | License / Terms | Prompt / Origin Details |
| :-- | :-- | :-- | :-- | :-- |
| `reward.mp3` | SFX (Audio) | ElevenLabs Sound Effects v2 | ElevenLabs plan terms | Sec 3.1 |
| `damage.mp3` | SFX (Audio) | ElevenLabs Sound Effects v2 | ElevenLabs plan terms | Sec 3.2 |
| `end_win.mp3` | SFX (Audio) | ElevenLabs Sound Effects v2 | ElevenLabs plan terms | Sec 3.3 |
| `end_lose.mp3` | SFX (Audio) | ElevenLabs Sound Effects v2 | ElevenLabs plan terms | Sec 3.3 |
| Sprites (pumpkin, ghost, witch) | Visual | Drawn in code (Phaser Graphics) | Original | `src/scenes.js`, Boot scene |
| Phaser 3.80.1 | Library | Phaser Studio | MIT | https://phaser.io |
