# Ghost Pumpkin Patch

A small Phaser 3 web game for Portfolio Game 2. Pick pumpkins, dodge ghosts, beat the sunrise.

**Presentation:** _(add link to your presentation here)_
**Prompt Log:** [PROMPT_LOG.md](PROMPT_LOG.md)

**Play on Itch.io:** _(add URL here for +15 extra credit)_
**Play via GitHub Pages:** _(add URL here)_

## How to play
- Move with **arrow keys / WASD**, or **drag** on a touchscreen.
- Collect **12 pumpkins** (Reward) before the 60-second sunrise timer ends.
- Ghosts chase you. Each touch costs a life (Damage). You have 3.
- Win by collecting 12 pumpkins. Lose by running out of lives or time (End).

## Project structure
```
index.html        entry point (desktop + mobile)
src/config.js     tunable game constants
src/audio.js      sound effect playback (with synth fallback)
src/scenes.js     Boot, Menu, Game, End scenes
src/main.js       Phaser config
assets/audio/     reward.mp3, damage.mp3, end_win.mp3, end_lose.mp3 (ElevenLabs)
PROMPT_LOG.md     master AI prompt log + reflection
ATTRIBUTION.md    tools, licenses, references
```

## Tech stack
Phaser 3.80 (arcade physics), plain JavaScript, no build step. Graphics are drawn in code. Code written with conversational AI coding tools (see `PROMPT_LOG.md`). Sound effects generated with ElevenLabs Sound Effects v2 (see `ATTRIBUTION.md`).

## Presentation
https://docs.google.com/presentation/d/10GP7crqvyL8hBsQniAZfHqjNLScrseLI/edit?usp=sharing&ouid=102785686480219330357&rtpof=true&sd=true
