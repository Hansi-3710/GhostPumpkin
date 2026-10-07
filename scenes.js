const FONT = 'Georgia, "Times New Roman", serif';
const txt = (scene, x, y, s, size, color = '#ffd9a0') =>
  scene.add.text(x, y, s, { fontFamily: FONT, fontSize: size + 'px', color, align: 'center' }).setOrigin(0.5);

// ---------- Boot: load audio, draw textures in code (no image files needed) ----------
class Boot extends Phaser.Scene {
  constructor() { super('Boot'); }
  preload() { Sfx.preload(this); }
  create() {
    const g = this.make.graphics({ x: 0, y: 0, add: false });

    g.fillStyle(0xff7a1a).fillCircle(16, 18, 14).fillStyle(0xd85a00).fillEllipse(16, 18, 8, 26);
    g.fillStyle(0x3b7d2a).fillRect(14, 0, 5, 7);
    g.generateTexture('pumpkin', 32, 32); g.clear();

    g.fillStyle(0xf4f1ff).fillCircle(19, 17, 17).fillRect(2, 17, 34, 20);
    for (let i = 0; i < 3; i++) g.fillTriangle(2 + i * 12, 36, 14 + i * 12, 36, 8 + i * 12, 44);
    g.fillStyle(0x1b1030).fillCircle(13, 16, 3).fillCircle(25, 16, 3).fillEllipse(19, 25, 6, 8);
    g.generateTexture('ghost', 38, 44); g.clear();

    g.fillStyle(0x6b3fa0).fillCircle(14, 16, 12).fillStyle(0x2b1550).fillTriangle(0, 10, 28, 10, 14, -2);
    g.fillStyle(0xffffff).fillCircle(10, 18, 2).fillCircle(18, 18, 2);
    g.generateTexture('player', 28, 30);
    g.destroy();

    this.scene.start('Menu');
  }
}

// ---------- Menu ----------
class Menu extends Phaser.Scene {
  constructor() { super('Menu'); }
  create() {
    this.cameras.main.setBackgroundColor('#1b1030');
    txt(this, 240, 200, 'Ghost\nPumpkin Patch', 52, '#ff9a3c');
    txt(this, 240, 340, `Pick ${CFG.goal} pumpkins before sunrise.\nThree ghost touches and you're done.`, 20);
    txt(this, 240, 440, 'Arrow keys / WASD, or drag on screen', 16, '#b9a5d6');
    const start = txt(this, 240, 560, 'Tap or press Space to start', 24, '#ffffff');
    this.tweens.add({ targets: start, alpha: 0.3, yoyo: true, repeat: -1, duration: 700 });
    const go = () => this.scene.start('Game');
    this.input.once('pointerdown', go);
    this.input.keyboard.once('keydown-SPACE', go);
  }
}

// ---------- Game: Reward + Damage loop ----------
class Game extends Phaser.Scene {
  constructor() { super('Game'); }

  create() {
    this.cameras.main.setBackgroundColor('#1b1030');
    Object.assign(this, { score: 0, lives: CFG.lives, timeLeft: CFG.time, invuln: false, over: false });

    this.player = this.physics.add.sprite(240, 560, 'player').setCollideWorldBounds(true).setDepth(2);
    this.player.body.setCircle(11, 3, 5);
    this.pumpkins = this.physics.add.group();
    this.ghosts = this.physics.add.group();

    for (let i = 0; i < CFG.pumpkinsOnField; i++) this.spawnPumpkin();
    this.spawnGhost(); this.spawnGhost();

    this.physics.add.overlap(this.player, this.pumpkins, (_, p) => this.collect(p));
    this.physics.add.overlap(this.player, this.ghosts, () => this.hurt());

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D');

    this.hud = this.add.text(12, 10, '', { fontFamily: FONT, fontSize: '20px', color: '#ffd9a0' }).setDepth(5);
    this.sunrise = this.add.rectangle(240, 360, 480, 720, 0xffb066, 0).setDepth(4);

    this.time.addEvent({ delay: 1000, loop: true, callback: this.tick, callbackScope: this });
    this.time.addEvent({ delay: CFG.ghostEverySec * 1000, loop: true, callback: this.spawnGhost, callbackScope: this });
    this.updateHud();
  }

  // --- spawning ---
  spawnPumpkin() {
    const p = this.pumpkins.create(Phaser.Math.Between(30, 450), Phaser.Math.Between(60, 680), 'pumpkin');
    p.body.setCircle(14, 2, 4);
  }
  spawnGhost() {
    if (this.over) return;
    let x, y;
    do { x = Phaser.Math.Between(20, 460); y = Phaser.Math.Between(60, 700); }
    while (Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) < 200);
    const g = this.ghosts.create(x, y, 'ghost').setAlpha(0.85).setDepth(3);
    g.body.setCircle(14, 5, 6);
    this.tweens.add({ targets: g, scale: 1.08, yoyo: true, repeat: -1, duration: 600 });
  }

  // --- Reward ---
  collect(p) {
    if (this.over) return;
    p.destroy();
    this.score++;
    Sfx.play(this, 'reward');
    this.updateHud();
    if (this.score >= CFG.goal) return this.finish(true);
    this.spawnPumpkin();
  }

  // --- Damage ---
  hurt() {
    if (this.invuln || this.over) return;
    this.lives--;
    Sfx.play(this, 'damage');
    this.cameras.main.shake(180, 0.012);
    this.updateHud();
    if (this.lives <= 0) return this.finish(false);
    this.invuln = true;
    this.tweens.add({ targets: this.player, alpha: 0.3, yoyo: true, repeat: 5, duration: 100 });
    this.time.delayedCall(CFG.invulnMs, () => { this.invuln = false; this.player.setAlpha(1); });
  }

  // --- End ---
  tick() {
    if (this.over) return;
    this.timeLeft--;
    this.sunrise.setAlpha(0.45 * (1 - this.timeLeft / CFG.time));
    this.updateHud();
    if (this.timeLeft <= 0) this.finish(false, 'Sunrise caught you.');
  }
  finish(win, reason) {
    this.over = true;
    this.physics.pause();
    Sfx.play(this, win ? 'end_win' : 'end_lose');
    this.time.delayedCall(700, () =>
      this.scene.start('End', { win, score: this.score, reason: reason || (win ? '' : 'The ghosts got you.') }));
  }

  updateHud() {
    this.hud.setText(`Pumpkins ${this.score}/${CFG.goal}   Lives ${'♥'.repeat(this.lives)}   Sunrise ${this.timeLeft}s`);
  }

  update() {
    if (this.over) return;
    const c = this.cursors, k = this.wasd, p = this.player;
    let vx = 0, vy = 0;
    if (c.left.isDown || k.A.isDown) vx = -1;
    if (c.right.isDown || k.D.isDown) vx = 1;
    if (c.up.isDown || k.W.isDown) vy = -1;
    if (c.down.isDown || k.S.isDown) vy = 1;

    const ptr = this.input.activePointer;
    if (!vx && !vy && ptr.isDown && Phaser.Math.Distance.Between(p.x, p.y, ptr.worldX, ptr.worldY) > 8) {
      this.physics.moveTo(p, ptr.worldX, ptr.worldY, CFG.playerSpeed);
    } else {
      p.setVelocity(vx * CFG.playerSpeed, vy * CFG.playerSpeed);
      if (vx && vy) p.body.velocity.scale(Math.SQRT1_2);
    }

    const speed = CFG.ghostBaseSpeed + this.score * CFG.ghostSpeedPerPumpkin;
    this.ghosts.children.iterate(g => g && this.physics.moveToObject(g, p, speed));
  }
}

// ---------- End screen ----------
class End extends Phaser.Scene {
  constructor() { super('End'); }
  create(data) {
    this.cameras.main.setBackgroundColor(data.win ? '#4a2a0e' : '#0a0612');
    txt(this, 240, 220, data.win ? 'Patch cleared!' : 'Game over', 52, data.win ? '#ffc060' : '#ff6b6b');
    txt(this, 240, 330, data.win ? 'You beat the sunrise.' : data.reason, 22);
    txt(this, 240, 390, `Pumpkins: ${data.score}/${CFG.goal}`, 22);
    const again = txt(this, 240, 530, 'Tap or press Space to play again', 22, '#ffffff');
    this.tweens.add({ targets: again, alpha: 0.3, yoyo: true, repeat: -1, duration: 700 });
    this.time.delayedCall(400, () => {
      this.input.once('pointerdown', () => this.scene.start('Game'));
      this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Game'));
    });
  }
}
