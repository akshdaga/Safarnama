// SAFARNAMA - Fun Interactive Sound Synthesizer (Web Audio API)
// No external MP3 files needed - 100% lightweight procedural audio!

class SoundEngine {
 constructor() {
 this.ctx = null;
 this.enabled = true;
 }

 getAudioContext() {
 if (!this.ctx) {
 const AudioCtx = window.AudioContext || window.webkitAudioContext;
 if (AudioCtx) {
 this.ctx = new AudioCtx();
 }
 }
 if (this.ctx && this.ctx.state === 'suspended') {
 this.ctx.resume();
 }
 return this.ctx;
 }

 toggle() {
 this.enabled = !this.enabled;
 if (this.enabled) {
 this.playPop();
 }
 return this.enabled;
 }

 // Playful pop sound for clicks, chips, tabs
 playPop() {
 if (!this.enabled) return;
 try {
 const ctx = this.getAudioContext();
 if (!ctx) return;
 const osc = ctx.createOscillator();
 const gain = ctx.createGain();
 osc.type = 'sine';
 osc.frequency.setValueAtTime(450, ctx.currentTime);
 osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

 gain.gain.setValueAtTime(0.2, ctx.currentTime);
 gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

 osc.connect(gain);
 gain.connect(ctx.destination);

 osc.start();
 osc.stop(ctx.currentTime + 0.09);
 } catch (e) {
 // Audio context might be restricted before user gesture
 }
 }

 // Success arpeggio for adding to trip or stamping sticker
 playSuccess() {
 if (!this.enabled) return;
 try {
 const ctx = this.getAudioContext();
 if (!ctx) return;
 const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
 notes.forEach((freq, idx) => {
 const osc = ctx.createOscillator();
 const gain = ctx.createGain();
 const startTime = ctx.currentTime + idx * 0.06;
 osc.type = 'triangle';
 osc.frequency.setValueAtTime(freq, startTime);

 gain.gain.setValueAtTime(0.18, startTime);
 gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

 osc.connect(gain);
 gain.connect(ctx.destination);

 osc.start(startTime);
 osc.stop(startTime + 0.22);
 });
 } catch (e) {}
 }

 // Crystal celebration chime for badge unlock
 playChime() {
 if (!this.enabled) return;
 try {
 const ctx = this.getAudioContext();
 if (!ctx) return;
 const chords = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
 chords.forEach((freq, i) => {
 const osc = ctx.createOscillator();
 const gain = ctx.createGain();
 const startTime = ctx.currentTime + i * 0.08;
 osc.type = 'sine';
 osc.frequency.setValueAtTime(freq, startTime);

 gain.gain.setValueAtTime(0.22, startTime);
 gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

 osc.connect(gain);
 gain.connect(ctx.destination);

 osc.start(startTime);
 osc.stop(startTime + 0.52);
 });
 } catch (e) {}
 }

 // Quick whoosh on map flyTo or switching destination
 playWhoosh() {
 if (!this.enabled) return;
 try {
 const ctx = this.getAudioContext();
 if (!ctx) return;
 const osc = ctx.createOscillator();
 const gain = ctx.createGain();
 osc.type = 'sine';
 osc.frequency.setValueAtTime(200, ctx.currentTime);
 osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);

 gain.gain.setValueAtTime(0.12, ctx.currentTime);
 gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

 osc.connect(gain);
 gain.connect(ctx.destination);

 osc.start();
 osc.stop(ctx.currentTime + 0.17);
 } catch (e) {}
 }
}

export const sound = new SoundEngine();
window.yatraSound = sound;
