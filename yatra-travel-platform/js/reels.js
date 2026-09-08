// Yatra Travel Reels Engine
import { store } from './store.js';
import { TRAVEL_REELS, PLACES } from './data.js';

export class ReelsManager {
 constructor() {
 this.modal = null;
 this.likedReels = new Set(['reel-1']);
 }

 init() {
 this.modal = document.getElementById('reelsModal');
 
 store.subscribe((state, change) => {
 if (change === 'modal' && state.activeModal === 'reels') {
 this.renderCurrentReel();
 }
 });
 }

 open(reelIndex = 0) {
 store.openModal('reels', { reelIndex });
 }

 close() {
 store.closeModal();
 if (this.modal) {
 this.modal.classList.add('hidden');
 this.modal.innerHTML = '';
 }
 }

 nextReel() {
 const nextIdx = (store.state.activeReelIndex + 1) % TRAVEL_REELS.length;
 store.state.activeReelIndex = nextIdx;
 this.renderCurrentReel();
 }

 prevReel() {
 const prevIdx = (store.state.activeReelIndex - 1 + TRAVEL_REELS.length) % TRAVEL_REELS.length;
 store.state.activeReelIndex = prevIdx;
 this.renderCurrentReel();
 }

 toggleLike(reelId) {
 if (this.likedReels.has(reelId)) {
 this.likedReels.delete(reelId);
 } else {
 this.likedReels.add(reelId);
 }
 this.renderCurrentReel();
 }

 renderCurrentReel() {
 if (!this.modal) return;
 
 const reel = TRAVEL_REELS[store.state.activeReelIndex] || TRAVEL_REELS[0];
 const place = PLACES.find(p => p.id === reel.placeId) || PLACES[0];
 const isLiked = this.likedReels.has(reel.id);
 const inTrip = store.currentDayStops.some(s => s.place.id === place.id);

 this.modal.innerHTML = `
 <div class="reels-overlay" onclick="window.yatraApp.handleBackdropClick(event, () => window.yatraApp.closeReels())">
 <div class="reels-container">
 <!-- Close button -->
 <button type="button" class="reels-close-btn" onclick="window.yatraApp.closeReels()" title="Close Reels">✕</button>

 <!-- Video / Animated Poster Player -->
 <div class="reel-media-wrapper">
 <div class="reel-media-bg" style="background-image: url('${reel.videoPoster}')">
 <div class="reel-ambient-effect"></div>
 <div class="reel-play-indicator">
 <span class="pulse-play">Play</span>
 </div>
 </div>

 <!-- Header & Location Tag -->
 <div class="reel-top-bar">
 <div class="reel-location-pill" onclick="window.yatraApp.viewReelOnMap('${place.id}')">
 <span class="pill-pin"></span>
 <span class="pill-name">${place.name.split('(')[0].trim()}</span>
 <span class="pill-arrow">➔ Map</span>
 </div>
 <div class="reel-counter">${store.state.activeReelIndex + 1} / ${TRAVEL_REELS.length}</div>
 </div>

 <!-- Bottom Content Info -->
 <div class="reel-bottom-info">
 <div class="reel-creator-row">
 <img src="${reel.creatorAvatar}" class="creator-avatar" alt="${reel.creator}">
 <div class="creator-meta">
 <span class="creator-name">${reel.creator}</span>
 <span class="creator-badge">Verified Explorer</span>
 </div>
 <button class="btn-follow">+ Follow</button>
 </div>

 <h3 class="reel-title">${reel.title}</h3>
 <p class="reel-caption">${reel.caption}</p>

 <div class="reel-tags">
 ${reel.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}
 </div>

 <div class="reel-sound-track">
 <span class="sound-icon"></span>
 <span class="sound-title">${reel.sound}</span>
 </div>

 <!-- Quick Action Bar -->
 <div class="reel-cta-bar">
 <button class="btn btn-sm btn-light" onclick="window.yatraApp.viewReelOnMap('${place.id}')">
 View on Map
 </button>
 <button class="btn btn-sm ${inTrip ? 'btn-secondary' : 'btn-accent'}" onclick="window.yatraApp.toggleItineraryPlace('${place.id}')">
 ${inTrip ? '✓ In Your Trip' : '+ Add to Itinerary'}
 </button>
 </div>
 </div>

 <!-- Right Vertical Actions Dock -->
 <div class="reel-side-actions">
 <button class="action-btn ${isLiked ? 'active' : ''}" onclick="window.yatraApp.toggleReelLike('${reel.id}')">
 <span class="action-icon">${isLiked ? 'Saved' : 'Save'}</span>
 <span class="action-label">${reel.likes}</span>
 </button>
 <button class="action-btn" onclick="window.yatraApp.openPlaceDetails('${place.id}')">
 <span class="action-icon">ℹ️</span>
 <span class="action-label">Details</span>
 </button>
 <button class="action-btn" onclick="window.yatraApp.toggleSave('${place.id}')">
 <span class="action-icon"></span>
 <span class="action-label">Save</span>
 </button>
 <button class="action-btn" onclick="window.yatraApp.shareReel('${reel.id}')">
 <span class="action-icon">↗️</span>
 <span class="action-label">Share</span>
 </button>
 </div>

 <!-- Up / Down Navigation Controls -->
 <div class="reel-nav-controls">
 <button class="reel-nav-btn up" onclick="window.yatraApp.prevReel()" title="Previous reel">▲</button>
 <button class="reel-nav-btn down" onclick="window.yatraApp.nextReel()" title="Next reel">▼</button>
 </div>
 </div>
 </div>
 </div>
 `;
 this.modal.classList.remove('hidden');
 }
}

export const reelsManager = new ReelsManager();
