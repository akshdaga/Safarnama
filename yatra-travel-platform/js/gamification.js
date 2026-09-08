// ==========================================================================
// JAIPUR TOURISM INTELLIGENCE PLATFORM - PASSPORT & EXPLORATION INDEX
// Government-Grade Traveler Passport & Milestone Verification
// ==========================================================================

import { store } from './store.js';
import { PLACES, STICKERS } from './data.js';

export class GamificationManager {
 constructor() {
 this.container = null;
 }

 init(containerId = 'profilePanel') {
 this.container = document.getElementById(containerId);
 this.render();

 store.subscribe((state, change) => {
 if (['visitedPlaces', 'destination', 'view', 'stickers'].includes(change)) {
 this.render();
 }
 });
 }

 handleStickerClick(stickerId, event) {
 const isCollected = store.state.collectedStickerIds.has(stickerId);
 if (!isCollected) {
 store.collectSticker(stickerId);
 store.showToast('Heritage stamp added to your official passport! ', 'success');
 }
 }

 render() {
 if (!this.container) return;
 const dest = store.destination;
 const score = store.explorationScore;
 const badges = store.unlockedBadges;
 const visitedIds = Array.from(store.state.visitedPlaceIds);
 const visitedPlaces = visitedIds
 .map(id => PLACES.find(p => p.id === id))
 .filter(Boolean);

 const collectedStickers = store.state.collectedStickerIds || new Set();

 // Breakdown
 const histCount = visitedPlaces.filter(p => p.category === 'historical').length;
 const foodCount = visitedPlaces.filter(p => p.category === 'food').length;
 const natureCount = visitedPlaces.filter(p => p.category === 'nature' || p.category === 'trekking').length;
 const cultureCount = visitedPlaces.filter(p => p.category === 'culture' || p.category === 'spiritual').length;
 const gemCount = visitedPlaces.filter(p => p.category === 'hidden-gems').length;

 this.container.innerHTML = `
 <div class="gamification-panel-inner">
 <!-- Explorer Header Card -->
 <div class="explorer-profile-card">
 <div class="epc-avatar-box">
 <span style="font-size: 28px;"></span>
 <div class="epc-level-badge"> Score ${score}</div>
 </div>
 <div class="epc-info">
 <h3 class="epc-title">Official Explorer Passport</h3>
 <p class="epc-dest">Active Jurisdiction: <strong>${dest.name}, ${dest.state}</strong></p>
 <div class="epc-stats-row">
 <span> ${visitedPlaces.length} Landmarks Logged</span>
 <span>•</span>
 <span> ${badges.filter(b => b.isUnlocked).length} Verified Milestones</span>
 </div>
 </div>
 </div>

 <!-- Exploration Score Radial Meter -->
 <div class="exploration-score-section">
 <div class="score-radial-wrapper">
 <svg class="score-circle-svg" viewBox="0 0 120 120">
 <circle class="score-circle-bg" cx="60" cy="60" r="50"></circle>
 <circle class="score-circle-progress" cx="60" cy="60" r="50" style="stroke-dashoffset: ${314 - (314 * score) / 100}"></circle>
 </svg>
 <div class="score-inner-text">
 <span class="score-number">${score}</span>
 <span class="score-max">/ 100</span>
 <span class="score-label">EXPLORED</span>
 </div>
 </div>

 <div class="score-summary-text">
 <h4>${dest.name} Exploration Index</h4>
 <p class="score-desc">
 ${score >= 80 ? 'Master Explorer! You have unlocked major UNESCO heritage forts, hidden stepwells, and artisan havelis.' : 'Visit more hidden stepwells and UNESCO monuments to level up your exploration index.'}
 </p>
 </div>
 </div>

 <!-- Category Progress Breakdown -->
 <div class="category-breakdown-section">
 <div class="section-title">Places Discovered Breakdown</div>
 <div class="breakdown-grid">
 <div class="breakdown-item">
 <span class="bi-icon"></span>
 <span class="bi-name">UNESCO Forts</span>
 <span class="bi-count">${histCount} logged</span>
 </div>
 <div class="breakdown-item">
 <span class="bi-icon"></span>
 <span class="bi-name">Heritage Food</span>
 <span class="bi-count">${foodCount} logged</span>
 </div>
 <div class="breakdown-item">
 <span class="bi-icon"></span>
 <span class="bi-name">Nature Trails</span>
 <span class="bi-count">${natureCount} logged</span>
 </div>
 <div class="breakdown-item">
 <span class="bi-icon"></span>
 <span class="bi-name">Hidden Jaipur</span>
 <span class="bi-count">${gemCount} logged</span>
 </div>
 <div class="breakdown-item">
 <span class="bi-icon"></span>
 <span class="bi-name">Artisan Crafts</span>
 <span class="bi-count">${cultureCount} logged</span>
 </div>
 </div>
 </div>

 <!-- Badges & Achievements -->
 <div class="badges-showcase-section">
 <div class="section-title">Verified Milestone Badges</div>
 <div class="badges-grid">
 ${badges.map(b => `
 <div class="badge-card ${b.isUnlocked ? 'unlocked' : 'locked'}">
 <div class="badge-icon-box">
 <span class="badge-icon">${b.icon}</span>
 ${b.isUnlocked ? '<span class="badge-check">✓</span>' : '<span class="badge-lock"></span>'}
 </div>
 <div class="badge-name">${b.name}</div>
 <div class="badge-desc">${b.description}</div>
 <div class="badge-status-pill ${b.isUnlocked ? 'unlocked' : 'locked'}">
 ${b.isUnlocked ? 'Verified' : 'In Progress'}
 </div>
 </div>
 `).join('')}
 </div>
 </div>

 <!-- Visited Checklist Quick Toggle -->
 <div class="visited-checklist-section">
 <div class="section-title">Check Off Landmarks You Have Visited</div>
 <p class="checklist-sub">Tick any location you visited to automatically update your exploration index.</p>
 <div class="checklist-items">
 ${store.places.map(place => {
 const checked = store.state.visitedPlaceIds.has(place.id);
 return `
 <div class="check-item ${checked ? 'is-checked' : ''}" onclick="window.yatraApp.toggleVisited('${place.id}')">
 <span class="checkbox-box">${checked ? '✓' : ''}</span>
 <span class="check-place-name">${place.name.split('(')[0].trim()}</span>
 <span class="check-cat">${place.category}</span>
 </div>
 `;
 }).join('')}
 </div>
 </div>
 </div>
 `;
 }
}

export const gamificationManager = new GamificationManager();
window.gamificationManager = gamificationManager;
