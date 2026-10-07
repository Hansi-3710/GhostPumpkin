// Plays the ElevenLabs-generated files in assets/audio/. If a file is missing,
// falls back to a tiny synthesized beep so the game never runs silent.
const SFX_FILES = ['reward', 'damage', 'end_win', 'end_lose'];

const Sfx = {
  preload(scene) {
    SFX_FILES.forEach(k => scene.load.audio(k, [`assets/audio/${k}.mp3`]));
  },
  play(scene, key, opts = {}) {
    if (scene.cache.audio.exists(key)) {
      scene.sound.play(key, { volume: 1, ...opts });
    } else {
      Sfx._synth(scene, key, opts.rate || 1);
    }
  },
  _synth(scene, key, rate) {
    const ctx = scene.sound.context;
    if (!ctx) return;
    const t = ctx.currentTime;
    const presets = {
      reward: { type: 'triangle', f: [660, 990], d: 0.15 },
      damage: { type: 'sawtooth', f: [220, 80], d: 0.3 },
      end_win:  { type: 'square', f: [523, 784], d: 0.5 },
      end_lose: { type: 'square', f: [392, 196], d: 0.6 },
    };
    const p = presets[key];
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = p.type;
    osc.frequency.setValueAtTime(p.f[0] * rate, t);
    osc.frequency.exponentialRampToValueAtTime(p.f[1] * rate, t + p.d);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + p.d);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + p.d);
  },
};
