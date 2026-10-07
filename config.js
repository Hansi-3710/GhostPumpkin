// Tunable game constants: tweak these to rebalance the game.
const CFG = {
  width: 480,
  height: 720,
  goal: 12,          // pumpkins needed to win (Reward -> End: win)
  lives: 3,          // hits before game over (Damage -> End: lose)
  time: 60,          // seconds until sunrise (End: lose)
  playerSpeed: 220,
  ghostBaseSpeed: 55,
  ghostSpeedPerPumpkin: 4,
  pumpkinsOnField: 6,
  invulnMs: 1200,
  ghostEverySec: 15, // a new ghost appears this often
};
