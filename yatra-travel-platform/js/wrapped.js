// ==========================================================================
// YATRA TOURISM PLATFORM • DEDICATED TRAVEL WRAPPED STORY ENGINE
// Spotify Wrapped + Strava Year in Sport Personal Tourism Experience
// ==========================================================================

import { store } from './store.js';

export class WrappedManager {
 constructor() {
 this.container = null;
 this.currentSlideIndex = 0;
 this.totalSlides = 11;
 }

 init(containerId = 'wrappedModal') {
 this.container = document.getElementById(containerId);

 store.subscribe((state, change) => {
 if (['modal', 'visitedPlaces', 'destination'].includes(change) && state.activeModal === 'wrapped') {
 this.render();
 }
 });

 // Keyboard Arrow navigation for Wrapped
 window.addEventListener('keydown', (e) => {
 if (store.state.activeModal === 'wrapped' || (this.container && !this.container.classList.contains('hidden'))) {
 if (e.key === 'ArrowRight' || e.key === ' ') {
 this.nextSlide();
 } else if (e.key === 'ArrowLeft') {
 this.prevSlide();
 }
 }
 });
 }

 open(slideIndex = 0) {
 this.currentSlideIndex = slideIndex;
 store.openModal('wrapped');
 this.render();
 }

 close() {
 store.closeModal();
 if (this.container) {
 this.container.classList.add('hidden');
 this.container.innerHTML = '';
 }
 if (window.location.hash === '#travel-wrapped') {
 window.location.hash = '#explore';
 }
 }

 setSlide(index) {
 this.currentSlideIndex = Math.max(0, Math.min(this.totalSlides - 1, index));
 this.render();
 }

 nextSlide() {
 if (this.currentSlideIndex < this.totalSlides - 1) {
 this.setSlide(this.currentSlideIndex + 1);
 } else {
 this.close();
 }
 }

 prevSlide() {
 if (this.currentSlideIndex > 0) {
 this.setSlide(this.currentSlideIndex - 1);
 }
 }

 shareCard() {
 const w = store.wrappedData;
 const shareText = ` My Jaipur Journey Wrapped 2026:
• 128 KM Travelled Across Jaipur
• 12 Heritage Landmarks & 5 Hidden Stepwells Discovered
• Archetype: ${w.archetype.title}
• Favorite Spot: ${w.favoritePlace.name}
Explore with Safarnama Tourism Intelligence Portal!`;

 if (navigator.clipboard) {
 navigator.clipboard.writeText(shareText);
 store.showToast(' Shareable Wrapped summary copied to clipboard!', 'success');
 } else {
 alert(shareText);
 }
 }

 showSegment(title, detail, extra) {
 const valEl = document.getElementById('wrappedRingVal');
 const subEl = document.getElementById('wrappedRingSub');
 const hintEl = document.getElementById('segmentHoverHint');
 if (valEl) valEl.textContent = detail.split(' ')[0] + ' ' + (detail.split(' ')[1] || 'KM');
 if (subEl) subEl.textContent = title.toUpperCase();
 if (hintEl) hintEl.innerHTML = `<strong>${title}:</strong> ${detail} • <span style="color:#FDE047">${extra}</span>`;
 }

 resetRingHover() {
 const w = store.wrappedData;
 const valEl = document.getElementById('wrappedRingVal');
 const subEl = document.getElementById('wrappedRingSub');
 const hintEl = document.getElementById('segmentHoverHint');
 if (valEl) valEl.textContent = `${w.distanceKm} KM`;
 if (subEl) subEl.textContent = 'TRAVELLED';
 if (hintEl) hintEl.innerHTML = ' Hover or tap color segments to inspect route splits';
 }

 render() {
 if (!this.container) return;
 const w = store.wrappedData;
 const idx = this.currentSlideIndex;

 this.container.innerHTML = `
 <div class="wrapped-full-experience">
 <!-- Top Story Progress Bar -->
 <div class="wrapped-story-progress-bar">
 ${Array.from({ length: this.totalSlides }).map((_, i) => `
 <div class="wsp-bar ${i <= idx ? 'active' : ''}" onclick="window.wrappedManager.setSlide(${i})"></div>
 `).join('')}
 </div>

 <!-- Top Header Controls -->
 <div class="wrapped-top-controls">
 <div class="wtc-brand">
 <span></span>
 <strong>SAFARNAMA WRAPPED • JAIPUR 2026</strong>
 </div>
 <button type="button" class="wrapped-close-btn" onclick="window.wrappedManager.close()" title="Close Wrapped (Esc)">✕</button>
 </div>

 <!-- Main Slide Viewport -->
 <div class="wrapped-slide-viewport">
 ${this.renderSlideContent(idx, w)}
 </div>

 <!-- Left / Right Click Nav Targets -->
 <div class="wrapped-nav-hotspot left" onclick="window.wrappedManager.prevSlide()"></div>
 <div class="wrapped-nav-hotspot right" onclick="window.wrappedManager.nextSlide()"></div>

 <!-- Bottom Navigation Bar -->
 <div class="wrapped-bottom-bar">
 <button type="button" class="btn btn-sm btn-outline-light" onclick="window.wrappedManager.prevSlide()" ${idx === 0 ? 'disabled style="opacity:0.3"' : ''}>
 ❮ Previous
 </button>
 <span class="wbb-counter">${idx + 1} of ${this.totalSlides}</span>
 <button type="button" class="btn btn-sm btn-light" onclick="window.wrappedManager.nextSlide()">
 ${idx === this.totalSlides - 1 ? 'Finish ➔' : 'Next ❯'}
 </button>
 </div>
 </div>
 `;

 this.container.classList.remove('hidden');
 }

 renderSlideContent(index, w) {
 switch (index) {
 // ---------------------------------------------------------------------
 // Slide 0: Opening Cover Screen
 // ---------------------------------------------------------------------
 case 0:
 return `
 <div class="wrapped-slide slide-cover" style="background-image: linear-gradient(180deg, rgba(26,54,93,0.7) 0%, rgba(15,23,42,0.92) 100%), url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85')">
 <div class="slide-content-center">
 <span class="wrapped-gold-pill"> ANNUAL TRAVEL RECAP 2026</span>
 <h1 class="slide-hero-title">Your Journey Through Jaipur.</h1>
 <p class="slide-hero-subtitle">Here is what you discovered across royal fort ramparts, geometric stepwells, and walled city corridors.</p>
 <button type="button" class="btn btn-primary btn-lg wrapped-start-btn" onclick="window.wrappedManager.nextSlide()">
 START YOUR WRAPPED ➔
 </button>
 </div>
 </div>
 `;

 // ---------------------------------------------------------------------
 // Slide 1: Year of Travel & Places Discovered
 // ---------------------------------------------------------------------
 case 1:
 return `
 <div class="wrapped-slide slide-photo-bg" style="background-image: linear-gradient(180deg, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.94) 100%), url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85')">
 <div class="slide-content-center">
 <span class="slide-eyebrow">YOUR 2026 IN NUMBERS</span>
 <div class="slide-giant-number">${w.placesVisitedCount}</div>
 <h2 class="slide-title">Heritage Places & Landmarks Discovered</h2>
 <p class="slide-desc">From the 953 jharokhas of Hawa Mahal to the sunset ramparts of Nahargarh, you explored Jaipur with verified curiosity.</p>
 </div>
 </div>
 `;

 // ---------------------------------------------------------------------
 // Slide 2: Strava-Style Circular Distance Visualization (HERO STATISTIC)
 // ---------------------------------------------------------------------
 case 2:
 return `
 <div class="wrapped-slide slide-strava-circle">
 <div class="slide-content-center">
 <span class="slide-eyebrow">HERO TRAVEL STATISTIC</span>
 <h2 class="slide-title">How Much of Jaipur Did You Experience?</h2>
 
 <!-- Interactive Segmented Radial Progress Visual (Section 43) -->
 <div class="strava-radial-container" style="position:relative; width:220px; height:220px; margin: 16px auto; cursor:pointer;" onmouseleave="window.wrappedManager.resetRingHover()">
 <svg class="strava-svg-ring" viewBox="0 0 200 200" style="width:220px; height:220px; transform:rotate(-90deg);">
 <circle class="ring-bg" cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="12"></circle>
 
 <!-- Segment 1: Forts Corridor (Amber & Nahargarh) -->
 <circle cx="100" cy="100" r="82" fill="none" stroke="#F59E0B" stroke-width="12" 
 stroke-dasharray="190 515" stroke-dashoffset="0" 
 style="transition: all 0.2s ease; cursor:pointer;"
 onmouseover="window.wrappedManager.showSegment('Forts & Stepwells Corridor', '54 KM Traversed', '4 Historic Monuments')"
 onclick="window.wrappedManager.showSegment('Forts & Stepwells Corridor', '54 KM Traversed', '4 Historic Monuments')"></circle>
 
 <!-- Segment 2: Walled City Grid (Hawa Mahal & City Palace) -->
 <circle cx="100" cy="100" r="82" fill="none" stroke="#3B82F6" stroke-width="12" 
 stroke-dasharray="160 515" stroke-dashoffset="-195" 
 style="transition: all 0.2s ease; cursor:pointer;"
 onmouseover="window.wrappedManager.showSegment('Walled City Heritage Grid', '42 KM Traversed', '5 Cultural Landmarks')"
 onclick="window.wrappedManager.showSegment('Walled City Heritage Grid', '42 KM Traversed', '5 Cultural Landmarks')"></circle>
 
 <!-- Segment 3: Artisan Bazaars & Stepwells -->
 <circle cx="100" cy="100" r="82" fill="none" stroke="#10B981" stroke-width="12" 
 stroke-dasharray="130 515" stroke-dashoffset="-360" 
 style="transition: all 0.2s ease; cursor:pointer;"
 onmouseover="window.wrappedManager.showSegment('Artisan Workshops & Gems', '32 KM Traversed', '3 Opportunity Sites')"
 onclick="window.wrappedManager.showSegment('Artisan Workshops & Gems', '32 KM Traversed', '3 Opportunity Sites')"></circle>
 </svg>
 
 <div class="strava-ring-label" id="wrappedRingLabel" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center; pointer-events:none;">
 <span class="sr-val" id="wrappedRingVal" style="font-size:30px; font-weight:900; color:#FFFFFF; display:block; line-height:1;">${w.distanceKm} KM</span>
 <span class="sr-sub" id="wrappedRingSub" style="font-size:11px; font-weight:800; color:#FDE047; letter-spacing:1px;">TRAVELLED</span>
 </div>
 </div>

 <div id="segmentHoverHint" style="font-size:12px; color:#93C5FD; font-weight:600; min-height:20px; margin-bottom:8px;">
 Hover or tap color segments to inspect route splits
 </div>

 <div class="strava-tri-metrics">
 <div class="stm-box" onclick="window.wrappedManager.showSegment('Verified Heritage Stops', '12 Discovered', 'UNESCO Sites')">
 <strong>${w.placesVisitedCount}</strong>
 <span>Places Explored</span>
 </div>
 <div class="stm-box" onclick="window.wrappedManager.showSegment('Trips Completed', '3 Multi-Day Itineraries', 'Corridors')">
 <strong>${w.tripsCompleted}</strong>
 <span>Trips Completed</span>
 </div>
 <div class="stm-box" onclick="window.wrappedManager.showSegment('Days on Road', '4 Active Travel Days', 'Pink City')">
 <strong>${w.daysTravelled}</strong>
 <span>Days on the Road</span>
 </div>
 </div>
 </div>
 </div>
 `;

 // ---------------------------------------------------------------------
 // Slide 3: Detailed Travel Stats Grid
 // ---------------------------------------------------------------------
 case 3:
 return `
 <div class="wrapped-slide slide-stats-grid">
 <div class="slide-content-center">
 <span class="slide-eyebrow">VERIFIED TRAVEL STATISTICS</span>
 <h2 class="slide-title">Your Complete Jaipur Travel Ledger</h2>

 <div class="stats-cards-4grid">
 <div class="stat-clean-card">
 <span class="scc-icon"></span>
 <div class="scc-val">${w.distanceKm} km</div>
 <div class="scc-label">Total Distance</div>
 </div>
 <div class="stat-clean-card">
 <span class="scc-icon"></span>
 <div class="scc-val">${w.placesVisitedCount}</div>
 <div class="scc-label">Places Visited</div>
 </div>
 <div class="stat-clean-card">
 <span class="scc-icon"></span>
 <div class="scc-val">${w.hiddenGemsCount}</div>
 <div class="scc-label">Hidden Gems</div>
 </div>
 <div class="stat-clean-card">
 <span class="scc-icon"></span>
 <div class="scc-val">${w.reelsWatchedCount}</div>
 <div class="scc-label">Reels Watched</div>
 </div>
 </div>
 </div>
 </div>
 `;

 // ---------------------------------------------------------------------
 // Slide 4: Travel Style Archetype
 // ---------------------------------------------------------------------
 case 4:
 return `
 <div class="wrapped-slide slide-archetype" style="background-image: linear-gradient(180deg, rgba(26,54,93,0.7) 0%, rgba(15,23,42,0.95) 100%), url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=85')">
 <div class="slide-content-center">
 <span class="slide-eyebrow">YOUR TRAVEL ARCHETYPE</span>
 <div class="archetype-badge-pill">${w.archetype.badge}</div>
 <h2 class="archetype-hero-title">${w.archetype.title}</h2>
 <p class="archetype-hero-desc">"${w.archetype.description}"</p>
 <div class="archetype-meta-pill">Based on your places, preferences and travel activity</div>
 </div>
 </div>
 `;

 // ---------------------------------------------------------------------
 // Slide 5: Most Visited Category
 // ---------------------------------------------------------------------
 case 5:
 return `
 <div class="wrapped-slide slide-category">
 <div class="slide-content-center">
 <span class="slide-eyebrow">TOP EXPERIENCE CATEGORY</span>
 <div class="category-ring-box">
 <span class="cr-pct">48%</span>
 <span class="cr-name">${w.topCategory.name}</span>
 </div>
 
 <div class="category-bars-list">
 ${w.topCategory.breakdown.map(b => `
 <div class="cat-bar-item">
 <div class="cbi-header">
 <span>${b.name}</span>
 <strong>${b.pct}%</strong>
 </div>
 <div class="cbi-track">
 <div class="cbi-fill" style="width: ${b.pct}%; background: ${b.color};"></div>
 </div>
 </div>
 `).join('')}
 </div>
 </div>
 </div>
 `;

 // ---------------------------------------------------------------------
 // Slide 6: Your Hidden Jaipur
 // ---------------------------------------------------------------------
 case 6:
 return `
 <div class="wrapped-slide slide-hidden-gems">
 <div class="slide-content-center">
 <span class="slide-eyebrow">UNEXPLORED DISCOVERIES</span>
 <h2 class="slide-title">Hidden Places You Discovered</h2>
 <p class="slide-desc">${w.hiddenGemsCount} lesser-known heritage stepwells and mountain trails beyond the standard circuit.</p>

 <div class="hidden-photos-strip">
 ${w.hiddenDiscoveries.map(d => `
 <div class="hp-card" style="background-image: url('${d.img}')">
 <span class="hp-tag">${d.tag}</span>
 <span class="hp-name">${d.name}</span>
 </div>
 `).join('')}
 </div>

 <button type="button" class="btn btn-outline-light" onclick="window.wrappedManager.close(); window.location.hash='#hidden-jaipur';">
 Explore More Hidden Gems
 </button>
 </div>
 </div>
 `;

 // ---------------------------------------------------------------------
 // Slide 7: Favourite Landmark
 // ---------------------------------------------------------------------
 case 7:
 return `
 <div class="wrapped-slide slide-favourite" style="background-image: linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.92) 100%), url('${w.favoritePlace.imageUrl}')">
 <div class="slide-content-center">
 <span class="slide-eyebrow">YOUR #1 FAVORITE LANDMARK</span>
 <h2 class="fav-place-title">${w.favoritePlace.name}</h2>
 <div class="fav-meta-row">
 <span>★ ${w.favoritePlace.rating}</span>
 <span>•</span>
 <span> ${w.favoritePlace.openingHours}</span>
 <span>•</span>
 <span> ${w.favoritePlace.entryFee.split(',')[0]}</span>
 </div>
 <p class="fav-desc">"${w.favoritePlace.shortDesc}"</p>
 <div class="fav-tip-box"> Verified Tip: ${w.favoritePlace.localTip || 'Arrive early in the morning for best photography light.'}</div>
 </div>
 </div>
 `;

 // ---------------------------------------------------------------------
 // Slide 8: Longest Journey
 // ---------------------------------------------------------------------
 case 8:
 return `
 <div class="wrapped-slide slide-longest-day">
 <div class="slide-content-center">
 <span class="slide-eyebrow">YOUR LONGEST EXPEDITION</span>
 <h2 class="slide-title">${w.longestJourney.title}</h2>
 
 <div class="longest-day-stats">
 <div class="lds-item">
 <div class="lds-val">${w.longestJourney.km} km</div>
 <div class="lds-label">Distance Traversed</div>
 </div>
 <div class="lds-item">
 <div class="lds-val">${w.longestJourney.stopsCount}</div>
 <div class="lds-label">Monuments Visited</div>
 </div>
 <div class="lds-item">
 <div class="lds-val">${w.longestJourney.hours} hrs</div>
 <div class="lds-label">Active Exploration</div>
 </div>
 </div>

 <div class="longest-corridor-box">
 <span class="lcb-label">Corridor Route:</span>
 <span class="lcb-path"> ${w.longestJourney.corridor}</span>
 </div>
 </div>
 </div>
 `;

 // ---------------------------------------------------------------------
 // Slide 9: Connected Travel Map
 // ---------------------------------------------------------------------
 case 9:
 return `
 <div class="wrapped-slide slide-travel-map">
 <div class="slide-content-center">
 <span class="slide-eyebrow">SPATIAL FOOTPRINT</span>
 <h2 class="slide-title">Everywhere You Went</h2>
 <p class="slide-desc">Connected spatial coordinates across the Aravalli hills and the Pink City walled grid.</p>

 <div class="travel-map-pins-list">
 ${w.travelMapStops.map((name, i) => `
 <div class="tmp-chip">
 <span class="tmp-num">${i + 1}</span>
 <span>${name}</span>
 </div>
 `).join('')}
 </div>

 <button type="button" class="btn btn-outline-light" onclick="window.wrappedManager.close(); window.location.hash='#map';">
 Open Live GIS Map
 </button>
 </div>
 </div>
 `;

 // ---------------------------------------------------------------------
 // Slide 10: Travel Moments Memory Wall & Final Summary Card
 // ---------------------------------------------------------------------
 case 10:
 return `
 <div class="wrapped-slide slide-final" style="background-image: linear-gradient(180deg, rgba(26,54,93,0.85) 0%, rgba(15,23,42,0.96) 100%), url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85')">
 <div class="slide-content-center">
 <span class="wrapped-gold-pill">JOURNEY COMPLETE • JAIPUR 2026</span>
 <h2 class="final-statement">Jaipur was not just a destination.<br>These were your journeys.</h2>

 <!-- Clean Shareable Summary Card (Exact Strava / Spotify Style) -->
 <div class="shareable-wrapped-card" id="shareableWrappedCard">
 <div class="swc-header">
 <span> SAFARNAMA JAIPUR 2026</span>
 <span class="swc-score">★ ${w.score}/100</span>
 </div>
 <div class="swc-hero">
 <div class="swc-hero-val">${w.distanceKm} KM</div>
 <div class="swc-hero-sub">${w.placesVisitedCount} PLACES • ${w.archetype.title}</div>
 </div>
 <div class="swc-footer">
 <span>Favorite: ${w.favoritePlace.name}</span>
 <span>•</span>
 <span>${w.hiddenGemsCount} Hidden Discoveries</span>
 </div>
 </div>

 <div class="final-actions-row">
 <button type="button" class="btn btn-primary btn-lg" onclick="window.wrappedManager.shareCard()">
 Share My Wrapped
 </button>
 <button type="button" class="btn btn-secondary btn-lg" onclick="window.wrappedManager.close(); window.location.hash='#onboarding-destination';">
 Plan Next Trip
 </button>
 <button type="button" class="btn btn-outline-light btn-lg" onclick="window.wrappedManager.close(); window.location.hash='#explore';">
 Explore More
 </button>
 </div>
 </div>
 </div>
 `;

 default:
 return `<div>Slide ${index}</div>`;
 }
 }
}

export const wrappedManager = new WrappedManager();
window.wrappedManager = wrappedManager;
