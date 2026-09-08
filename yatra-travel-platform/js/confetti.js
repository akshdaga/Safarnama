// SAFARNAMA - Colorful Confetti Cannon Effect
// Pure Canvas particle physics - zero external libraries!

class ConfettiEngine {
 constructor() {
 this.canvas = null;
 this.ctx = null;
 this.particles = [];
 this.animating = false;
 }

 init() {
 let canvas = document.getElementById('confettiCanvas');
 if (!canvas) {
 canvas = document.createElement('canvas');
 canvas.id = 'confettiCanvas';
 document.body.appendChild(canvas);
 }
 canvas.style.position = 'fixed';
 canvas.style.top = '0';
 canvas.style.left = '0';
 canvas.style.width = '100vw';
 canvas.style.height = '100vh';
 canvas.style.pointerEvents = 'none';
 canvas.style.zIndex = '99999';

 this.canvas = canvas;
 this.ctx = canvas.getContext('2d');
 this.resize();
 window.addEventListener('resize', () => this.resize());
 }

 resize() {
 if (!this.canvas) return;
 this.canvas.width = window.innerWidth;
 this.canvas.height = window.innerHeight;
 }

 burst(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 65) {
 if (!this.canvas) this.init();
 this.resize();

 const colors = [
 '#FF1E56', '#FF9900', '#FFD166', '#06D6A0', '#118AB2', 
 '#073B4C', '#8338EC', '#3A86FF', '#FF006E', '#FB5607'
 ];

 for (let i = 0; i < count; i++) {
 const angle = Math.random() * Math.PI * 2;
 const speed = Math.random() * 8 + 3;
 this.particles.push({
 x: x,
 y: y,
 vx: Math.cos(angle) * speed,
 vy: Math.sin(angle) * speed - 2,
 size: Math.random() * 8 + 5,
 color: colors[Math.floor(Math.random() * colors.length)],
 rotation: Math.random() * 360,
 rotationSpeed: (Math.random() - 0.5) * 15,
 opacity: 1,
 gravity: 0.22,
 friction: 0.96
 });
 }

 if (!this.animating) {
 this.animating = true;
 this.loop();
 }
 }

 loop() {
 if (!this.ctx || this.particles.length === 0) {
 this.animating = false;
 if (this.ctx && this.canvas) {
 this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
 }
 return;
 }

 this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

 for (let i = this.particles.length - 1; i >= 0; i--) {
 const p = this.particles[i];
 p.x += p.vx;
 p.y += p.vy;
 p.vy += p.gravity;
 p.vx *= p.friction;
 p.vy *= p.friction;
 p.rotation += p.rotationSpeed;
 p.opacity -= 0.015;

 if (p.opacity <= 0 || p.y > this.canvas.height + 20) {
 this.particles.splice(i, 1);
 continue;
 }

 this.ctx.save();
 this.ctx.translate(p.x, p.y);
 this.ctx.rotate((p.rotation * Math.PI) / 180);
 this.ctx.globalAlpha = Math.max(0, p.opacity);
 this.ctx.fillStyle = p.color;
 this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
 this.ctx.restore();
 }

 requestAnimationFrame(() => this.loop());
 }
}

export const confetti = new ConfettiEngine();
window.yatraConfetti = confetti;
