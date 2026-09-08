// ==========================================================================
// YATRA TOURISM PLATFORM • JAIPUR INTELLIGENCE ENGINE
// Comprehensive Product Controller, Multi-Stage Routing & Universal Navigation
// ==========================================================================

import { store } from './store.js';
import { mapEngine } from './map.js';
import { itineraryManager } from './itinerary.js';
import { reelsManager } from './reels.js';
import { aiPlanner } from './aiPlanner.js';
import { weatherManager } from './weather.js';
import { documentsManager } from './documents.js';
import { reviewsManager } from './reviews.js';
import { gamificationManager } from './gamification.js';
import { saferRouteManager } from './saferRoute.js';
import { wrappedManager } from './wrapped.js';
import { governanceManager } from './governance.js';
import { complaintManager } from './complaint.js';
import { confetti } from './confetti.js';
import { DESTINATIONS, CATEGORIES, PLACES, TRAVEL_REELS, LOCAL_DISCOVERIES, SAFER_ROUTES, UNDER_DISCOVERED_DESTINATIONS, LOCAL_ARTISANS, SAFARNAMA_JOURNEYS } from './data.js';

class YatraApp {
 constructor() {
 this.currentNavStep = 0;
 this.authMode = 'login'; // 'login' | 'signup'
 this.lastNonModalHash = '#landing';
 this.currentHeroSlide = 0;
 this.carouselPaused = false;
 this.carouselInterval = null;
 this.currentLanguage = 'en';
 this.tickerIndex = 0;
 this.tickerItems = [
 ' High Surge in Walled City: Explore Maharani Ki Chhatri & Bagru Artisan Corridor for a serene visit',
 ' Women Safety GIS routing active with 6-factor corridor lighting & emergency 112 proximity',
 ' Dedicated Hidden Jaipur: Panna Meena Stepwell & Maharani Ki Chhatri open daily for explorers',
 ' Live Weather Intel: 29°C Clear Sky • Optimal visiting window: 08:30 AM to 11:30 AM',
 ' Authentic Food Trail: LMB Restaurant & Masala Chowk heritage culinary stalls active today'
 ];
 this.sidebarSearchQuery = '';
 this.sidebarCategoryFilter = 'all';
 this.exploreSubView = 'places';
 this.activeMaxTimeMinutes = 120;
 this.activeDurationFilter = 'all';
 this.activeCrowdFilter = 'all';
 this.activeAccessibilityOnly = false;
 this.activeLowWalkingOnly = false;
 this.activeAudience = 'all';
 }

 init() {
 console.log(' Yatra Tourism Platform Initializing (Full Product Journey Architecture)...');

 // 1. Initialize Map
 try {
 mapEngine.init('map');
 } catch (err) {
 console.error('Error initializing mapEngine:', err);
 }

 // 2. Initialize Feature Subsystems
 try { itineraryManager.init('itineraryPanel'); } catch (err) { console.error('Error initializing itinerary:', err); }
 try { reelsManager.init(); } catch (err) { console.error('Error initializing reels:', err); }
 try { aiPlanner.init(); } catch (err) { console.error('Error initializing aiPlanner:', err); }
 try { weatherManager.init('weatherPanel'); } catch (err) { console.error('Error initializing weather:', err); }
 try { documentsManager.init('documentsPanel'); } catch (err) { console.error('Error initializing documents:', err); }
 try { reviewsManager.init('reviewsSection'); } catch (err) { console.error('Error initializing reviews:', err); }
 try { gamificationManager.init('profilePanel'); } catch (err) { console.error('Error initializing gamification:', err); }
 try { saferRouteManager.init('saferRoutePanel'); } catch (err) { console.error('Error initializing saferRoute:', err); }
 try { wrappedManager.init('wrappedModal'); } catch (err) { console.error('Error initializing wrappedManager:', err); }
 try { governanceManager.init('governancePanel'); } catch (err) { console.error('Error initializing governanceManager:', err); }
 try { complaintManager.init('complaintBoxPanel'); } catch (err) { console.error('Error initializing complaintManager:', err); }

 // 3. Render Visual Components & Strips
 try { this.renderCategoryChips(); } catch (err) { console.error('Error renderCategoryChips:', err); }
 try { this.renderAlongTheWayChips(); } catch (err) { console.error('Error renderAlongTheWayChips:', err); }
 try { this.renderPlacesExplorerList(); } catch (err) { console.error('Error renderPlacesExplorerList:', err); }
 try { this.renderLocalGemsPanel(); } catch (err) { console.error('Error renderLocalGemsPanel:', err); }
 try { this.renderLandingDestinations(); } catch (err) { console.error('Error renderLandingDestinations:', err); }

 // 4. Setup Search & Auth state
 try { this.setupSearch(); } catch (err) { console.error('Error setupSearch:', err); }
 try { this.updateUserSessionUI(); } catch (err) { console.error('Error updateUserSessionUI:', err); }

 // 5. Setup Hero Carousel & Announcements Ticker
 try { this.setupHeroCarousel(); } catch (err) { console.error('Error setupHeroCarousel:', err); }
 try { this.setupAnnouncementTicker(); } catch (err) { console.error('Error setupAnnouncementTicker:', err); }

 // 6. Global Escape Key Listener for Immediate Modal Dismissal
 window.addEventListener('keydown', (e) => {
 if (e.key === 'Escape') {
 this.closeAllModals();
 }
 });

 // 7. Setup Hash-Based Router
 try {
 window.addEventListener('hashchange', () => this.handleHashRoute());
 this.handleHashRoute();
 } catch (err) {
 console.error('Error setup router:', err);
 }

 // 8. Subscribe to Store Updates
 try {
 store.subscribe((state, change) => {
 this.handleStateChange(state, change);
 });
 } catch (err) {
 console.error('Error store subscribe:', err);
 }

 // 9. Confetti canvas init
 try { confetti.init(); } catch (err) { console.error('Error confetti init:', err); }

 console.log(' Yatra Tourism Platform initialized successfully!');
 }

 // Multi-City Destination Switcher
 switchDestination(destId) {
 if (DESTINATIONS[destId]) {
 store.setDestination(destId);
 const dest = DESTINATIONS[destId];
 
 const select = document.getElementById('headerDestinationSelect');
 if (select && select.value !== destId) select.value = destId;

 const titleEl = document.getElementById('destBannerTitle');
 if (titleEl) titleEl.innerText = `${dest.name} Heritage & Discovery`;

 this.renderCategoryChips();
 this.renderPlacesExplorerList();
 this.renderLocalGemsPanel();
 this.showToast(`Switched destination to ${dest.name} (${dest.state}) `, 'info');
 }
 }

 // =========================================================================
 // ROUTER & NAVIGATION (Dedicated Full-Screen Sections & Modals)
 // =========================================================================
 handleHashRoute() {
 const hash = window.location.hash || '#landing';
 const cleanHash = hash.replace('#', '').trim();

 // Track last non-modal hash for smooth back navigation
 if (!cleanHash.startsWith('place/') && cleanHash !== 'login' && cleanHash !== 'signup') {
 this.lastNonModalHash = hash;
 }

 if (cleanHash.startsWith('place/')) {
 const placeId = cleanHash.replace('place/', '');
 this.applyAppView('explore');
 this.openPlaceDetails(placeId, false);
 return;
 }

 // Auto-close place detail modal if not in place route
 const placeModal = document.getElementById('placeDetailModal');
 if (placeModal && !cleanHash.startsWith('place/')) {
 placeModal.classList.add('hidden');
 placeModal.innerHTML = '';
 }

 switch (cleanHash) {
 case 'home':
 case 'landing':
 this.applyAppView('landing');
 break;
 case 'onboarding-destination':
 this.applyAppView('onboarding-destination');
 break;
 case 'onboarding-preferences':
 this.applyAppView('onboarding-preferences');
 break;
 case 'itinerary-result':
 this.applyAppView('itinerary-result');
 break;
 case 'map':
 this.applyAppView('map');
 break;
 case 'hidden-jaipur':
 case 'hidden-gems':
 case 'gems':
 this.applyAppView('gems');
 break;
 case 'safarnama':
 this.applyAppView('safarnama');
 break;
 case 'reels':
 this.applyAppView('explore');
 this.openReels(0);
 break;
 case 'trips':
 case 'itinerary':
 this.applyAppView('itinerary');
 break;
 case 'safer-route':
 case 'safety':
 this.applyAppView('safer-route');
 break;
 case 'tourism-intelligence':
 case 'intelligence':
 case 'governance':
 this.applyAppView('tourism-intelligence');
 break;
 case 'complaint-box':
 case 'complaints':
 case 'grievance':
 this.applyAppView('complaint-box');
 break;
 case 'ai-assistant':
 case 'assistant':
 this.applyAppView('explore');
 this.openAiPlanner();
 break;
 case 'travel-wrapped':
 case 'wrapped':
 this.applyAppView('explore');
 wrappedManager.open(0);
 break;
 case 'profile':
 case 'passport':
 this.applyAppView('profile');
 break;
 case 'login':
 this.applyAppView('explore');
 this.openAuthModal('login', null, false);
 break;
 case 'signup':
 this.applyAppView('explore');
 this.openAuthModal('signup', null, false);
 break;
 case 'explore':
 default:
 this.applyAppView('explore');
 break;
 }
 }

 handleStateChange(state, change) {
 if (change === 'destination') {
 this.renderCategoryChips();
 this.renderPlacesExplorerList();
 this.renderLocalGemsPanel();
 } else if (['categories', 'search', 'alongTheWay', 'accessibility'].includes(change)) {
 this.renderPlacesExplorerList();
 this.renderCategoryChips();
 } else if (change === 'itineraryUpdated' || change === 'itineraryDay') {
 this.renderPlacesExplorerList();
 this.renderLocalGemsPanel();
 } else if (change === 'view') {
 this.switchMainView(state.activeView);
 } else if (change === 'userSession') {
 this.updateUserSessionUI();
 }
 }

 applyAppView(viewName) {
 store.state.activeAppView = viewName;
 const landingSection = document.getElementById('landingView');
 const onbDestSection = document.getElementById('onboardingDestView');
 const onbPrefSection = document.getElementById('onboardingPrefView');
 const itinResultSection = document.getElementById('itineraryResultView');
 const governanceSection = document.getElementById('governanceView');
 const complaintSection = document.getElementById('complaintView');
 const safarnamaSection = document.getElementById('safarnamaView');
 const workspaceSection = document.getElementById('appWorkspace');

 // Hide all primary standalone page sections
 if (landingSection) landingSection.classList.add('hidden');
 if (onbDestSection) onbDestSection.classList.add('hidden');
 if (onbPrefSection) onbPrefSection.classList.add('hidden');
 if (itinResultSection) itinResultSection.classList.add('hidden');
 if (governanceSection) governanceSection.classList.add('hidden');
 if (complaintSection) complaintSection.classList.add('hidden');
 if (safarnamaSection) safarnamaSection.classList.add('hidden');
 if (workspaceSection) workspaceSection.classList.add('hidden');

 // Update active top navigation links across both headers
 document.querySelectorAll('.portal-nav-tab, .app-nav-link').forEach(link => {
 const targetNav = link.dataset.nav;
 if (targetNav === viewName || 
 (viewName === 'gems' && targetNav === 'hidden-jaipur') ||
 (viewName === 'itinerary' && targetNav === 'trips') ||
 (viewName === 'safarnama' && targetNav === 'safarnama') ||
 (viewName === 'safer-route' && targetNav === 'safety')) {
 link.classList.add('active');
 } else {
 link.classList.remove('active');
 }
 });

 if (viewName === 'landing') {
 if (landingSection) landingSection.classList.remove('hidden');
 window.scrollTo({ top: 0, behavior: 'smooth' });
 return;
 }

 if (viewName === 'safarnama') {
 if (safarnamaSection) {
 safarnamaSection.classList.remove('hidden');
 this.renderSafarnamaView();
 }
 window.scrollTo({ top: 0, behavior: 'smooth' });
 return;
 }

 if (viewName === 'tourism-intelligence') {
 if (governanceSection) {
 governanceSection.classList.remove('hidden');
 governanceManager.render();
 }
 window.scrollTo({ top: 0, behavior: 'smooth' });
 return;
 }

 if (viewName === 'complaint-box') {
 if (complaintSection) {
 complaintSection.classList.remove('hidden');
 complaintManager.render();
 }
 window.scrollTo({ top: 0, behavior: 'smooth' });
 return;
 }

 if (viewName === 'onboarding-destination') {
 if (onbDestSection) {
 onbDestSection.classList.remove('hidden');
 this.renderOnboardingDestView();
 }
 window.scrollTo({ top: 0, behavior: 'smooth' });
 return;
 }

 if (viewName === 'onboarding-preferences') {
 if (onbPrefSection) {
 onbPrefSection.classList.remove('hidden');
 this.renderOnboardingPrefView();
 }
 window.scrollTo({ top: 0, behavior: 'smooth' });
 return;
 }

 if (viewName === 'itinerary-result') {
 if (itinResultSection) {
 itinResultSection.classList.remove('hidden');
 this.renderItineraryResultView();
 }
 window.scrollTo({ top: 0, behavior: 'smooth' });
 return;
 }

 // Inside Main Workspace
 if (workspaceSection) {
 workspaceSection.classList.remove('hidden');
 workspaceSection.classList.toggle('map-mode', viewName === 'map');
 workspaceSection.classList.toggle('explore-mode', viewName !== 'map');
 workspaceSection.classList.toggle('safety-mode', viewName === 'safer-route' || viewName === 'safety');
 
 // Leaflet map refresh
 setTimeout(() => {
 if (mapEngine.map) mapEngine.map.invalidateSize();
 }, 100);

 if (viewName === 'map') {
 const sidebar = document.getElementById('mainSidebar');
 if (sidebar) sidebar.classList.add('collapsed');
 mapEngine.locateUser();
 } else if (viewName === 'gems' || viewName === 'hidden-jaipur') {
 const sidebar = document.getElementById('mainSidebar');
 if (sidebar) sidebar.classList.remove('collapsed');
 this.switchMainView('gems');
 } else if (viewName === 'safer-route' || viewName === 'safety') {
 const sidebar = document.getElementById('mainSidebar');
 if (sidebar) sidebar.classList.remove('collapsed');
 this.switchMainView('safer-route');
 saferRouteManager.render();
 mapEngine.renderSaferRoutePolylines(true);
 } else if (viewName === 'itinerary' || viewName === 'trips') {
 const sidebar = document.getElementById('mainSidebar');
 if (sidebar) sidebar.classList.remove('collapsed');
 this.switchMainView('itinerary');
 mapEngine.renderItineraryRoute();
 } else if (viewName === 'profile') {
 const sidebar = document.getElementById('mainSidebar');
 if (sidebar) sidebar.classList.remove('collapsed');
 this.switchMainView('profile');
 } else {
 // 'explore' view
 this.switchMainView('places');
 const sidebar = document.getElementById('mainSidebar');
 if (sidebar) sidebar.classList.remove('collapsed');
 }
 }
 }

 // =========================================================================
 // TRAVEL ONBOARDING VIEWS (Step 1: Where? -> Step 2: How? -> Step 3: Plan)
 // =========================================================================
 startPlanningFlow() {
 window.location.hash = '#onboarding-destination';
 }

 selectOnboardingDestination(destId) {
 store.setDestination(destId);
 this.renderOnboardingDestView();
 }

 renderOnboardingDestView() {
 const container = document.getElementById('onboardingDestView');
 if (!container) return;
 const currentDest = store.state.currentDestinationId || 'jaipur';

 const destList = [
 {
 id: 'jaipur',
 name: 'JAIPUR',
 state: 'Rajasthan',
 desc: 'UNESCO World Heritage walled city, 16th-century hill forts, 8-tier stepwells, and royal artisan bazaars.',
 img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
 tags: [' Heritage', ' Culture', ' Hidden Gems'],
 badge: '★ PRIMARY REGION'
 },
 {
 id: 'udaipur',
 name: 'UDAIPUR',
 state: 'Rajasthan',
 desc: 'City of Lakes, royal Pichola boat ghats, marble palace courtyards, and sunset boat tours.',
 img: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
 tags: [' Lakes', ' Palaces', ' Art'],
 badge: ' CITY OF LAKES'
 },
 {
 id: 'jodhpur',
 name: 'JODHPUR',
 state: 'Rajasthan',
 desc: 'The Blue City, imposing Mehrangarh Fort ramparts, Jaswant Thada, and blue-painted Brahmin havelis.',
 img: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
 tags: [' Blue City', ' Mehrangarh', ' Desert'],
 badge: ' BLUE CITY'
 },
 {
 id: 'delhi',
 name: 'DELHI',
 state: 'NCR',
 desc: 'National Capital, Red Fort, Humayun Tomb, Qutub Minar, and historic Chandni Chowk food lanes.',
 img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
 tags: [' Red Fort', ' Street Food', ' Monuments'],
 badge: ' CAPITAL CIRCUIT'
 },
 {
 id: 'agra',
 name: 'AGRA',
 state: 'Uttar Pradesh',
 desc: 'City of the Taj Mahal, Agra Fort, Mehtab Bagh sunset viewpoints, and Mughal marble inlay craft.',
 img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
 tags: [' Taj Mahal', ' Agra Fort', ' Marble Craft'],
 badge: ' MUGHAL HERITAGE'
 },
 {
 id: 'varanasi',
 name: 'VARANASI',
 state: 'Uttar Pradesh',
 desc: 'Spiritual ghats along the sacred Ganga, Dashashwamedh Ganga Aarti, and ancient silk weaving lanes.',
 img: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
 tags: [' Ganga Ghats', ' Spiritual', ' Silk Weaving'],
 badge: ' ETERNAL GHATS'
 }
 ];

 container.innerHTML = `
 <div class="onboarding-page-container">
 <div class="onboarding-header-strip">
 <button type="button" class="btn btn-sm btn-outline" onclick="window.yatraApp.navigateBack()">← Back</button>
 <span class="onb-step-badge">STEP 1 OF 2 • DESTINATION SELECTION</span>
 </div>

 <div class="onboarding-content-card">
 <h1 class="onb-title">Where do you want to travel?</h1>
 <p class="onb-subtitle">Select your cultural destination to generate a time-optimized, explainable tourism itinerary.</p>

 <div class="dest-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 16px;">
 ${destList.map(d => {
 const isSelected = currentDest === d.id;
 return `
 <div class="dest-select-card ${isSelected ? 'selected' : ''}" 
 style="background: white; border: ${isSelected ? '2px solid var(--gov-blue)' : '1px solid var(--border-bold)'}; border-radius: 8px; overflow: hidden; cursor: pointer; transition: all 0.15s ease; box-shadow: ${isSelected ? '0 0 0 2px rgba(26,54,93,0.15)' : 'none'};"
 onclick="window.yatraApp.selectOnboardingDestination('${d.id}')">
 <div class="dsc-img" style="height: 140px; background-size: cover; background-position: center; background-image: url('${d.img}'); position: relative;">
 <span class="dsc-badge" style="position: absolute; top: 8px; left: 8px; background: rgba(15,23,42,0.85); color: #FDE047; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">
 ${d.badge}
 </span>
 ${isSelected ? `
 <span style="position: absolute; top: 8px; right: 8px; background: #059669; color: white; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 4px;">
 ✓ Selected
 </span>
 ` : ''}
 </div>
 <div class="dsc-body" style="padding: 14px;">
 <h3 style="font-size: 16px; font-weight: 800; color: var(--primary); margin-bottom: 4px;">${d.name}, <small style="font-weight: 600; color: var(--text-muted); font-size: 12px;">${d.state}</small></h3>
 <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4; margin-bottom: 8px;">${d.desc}</p>
 <div class="dsc-tags" style="display: flex; gap: 4px; flex-wrap: wrap;">
 ${d.tags.map(t => `<span class="dsc-tag" style="background: #F1F5F9; font-size: 10.5px; padding: 2px 6px; border-radius: 3px; font-weight: 600;">${t}</span>`).join('')}
 </div>
 </div>
 </div>
 `;
 }).join('')}
 </div>

 <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
 <span style="font-size: 12px; color: var(--text-muted); font-weight: 700;">
 Selected Destination: <strong>${DESTINATIONS[currentDest]?.name || 'Jaipur'}</strong>
 </span>
 <button type="button" class="btn btn-primary btn-lg" onclick="window.location.hash='#onboarding-preferences'">
 CONTINUE TO PREFERENCES ➔
 </button>
 </div>
 </div>
 </div>
 `;
 }

 renderOnboardingPrefView() {
 const container = document.getElementById('onboardingPrefView');
 if (!container) return;
 const ob = store.state.onboarding;
 const currentDest = DESTINATIONS[store.state.currentDestinationId] || DESTINATIONS.jaipur;

 container.innerHTML = `
 <div class="onboarding-page-container">
 <div class="onboarding-header-strip">
 <button type="button" class="btn btn-sm btn-outline" onclick="window.location.hash='#onboarding-destination'">← Back to Destination</button>
 <span class="onb-step-badge">STEP 2 OF 2 • TRAVEL PREFERENCES (${currentDest.name.toUpperCase()})</span>
 </div>

 <div class="onboarding-content-card">
 <h1 class="onb-title">How do you want your itinerary?</h1>
 <p class="onb-subtitle">Select your experience themes, time available, companions, and accessibility needs.</p>

 <!-- 1. Experience Interests (MULTI-SELECT) -->
 <div class="onb-section">
 <label class="onb-section-label" style="font-size: 12px; font-weight: 800; color: var(--primary);">
 1. WHAT ARE YOUR INTERESTS? (Multi-select)
 </label>
 <div class="onb-chips-grid">
 ${[
 { id: 'historical', name: 'Heritage & History', icon: '' },
 { id: 'hidden-gems', name: 'Hidden Places', icon: '' },
 { id: 'food', name: 'Food & Culture', icon: '' },
 { id: 'nature', name: 'Nature', icon: '' },
 { id: 'photography', name: 'Photography', icon: '' },
 { id: 'shopping', name: 'Shopping', icon: '' },
 { id: 'adventure', name: 'Adventure', icon: '' },
 { id: 'relaxed', name: 'Relaxed', icon: '' }
 ].map(opt => `
 <button type="button" class="onb-choice-chip ${ob.interests.includes(opt.id) ? 'selected' : ''}" onclick="window.yatraApp.toggleOnbInterest('${opt.id}')">
 <span>${opt.icon}</span>
 <span>${opt.name}</span>
 </button>
 `).join('')}
 </div>
 </div>

 <!-- 2. Available Time -->
 <div class="onb-section" style="margin-top: 16px;">
 <label class="onb-section-label" style="font-size: 12px; font-weight: 800; color: var(--primary);">
 2. AVAILABLE TIME
 </label>
 <div class="onb-btn-row">
 ${['1 hour', '2 hours', '4 hours', 'Half Day', 'Full Day', '2 Days', '3 Days'].map(t => `
 <button type="button" class="btn ${ob.duration === t ? 'btn-primary' : 'btn-outline'}" onclick="window.yatraApp.setOnbOption('duration', '${t}')">
 ${t}
 </button>
 `).join('')}
 </div>
 </div>

 <!-- 3. Travel Style -->
 <div class="onb-section" style="margin-top: 16px;">
 <label class="onb-section-label" style="font-size: 12px; font-weight: 800; color: var(--primary);">
 3. TRAVEL STYLE
 </label>
 <div class="onb-btn-row">
 <button type="button" class="btn ${ob.pace === 'relaxed' ? 'btn-primary' : 'btn-outline'}" onclick="window.yatraApp.setOnbOption('pace', 'relaxed')"> Relaxed (2-3 stops)</button>
 <button type="button" class="btn ${ob.pace === 'balanced' ? 'btn-primary' : 'btn-outline'}" onclick="window.yatraApp.setOnbOption('pace', 'balanced')"> Balanced (4 stops)</button>
 <button type="button" class="btn ${ob.pace === 'packed' ? 'btn-primary' : 'btn-outline'}" onclick="window.yatraApp.setOnbOption('pace', 'packed')"> Packed (5+ stops)</button>
 </div>
 </div>

 <!-- 4. Travelling With -->
 <div class="onb-section" style="margin-top: 16px;">
 <label class="onb-section-label" style="font-size: 12px; font-weight: 800; color: var(--primary);">
 4. TRAVELLING WITH
 </label>
 <div class="onb-btn-row">
 <button type="button" class="btn ${ob.groupType === 'solo' ? 'btn-primary' : 'btn-outline'}" onclick="window.yatraApp.setOnbOption('groupType', 'solo')"> Solo</button>
 <button type="button" class="btn ${ob.groupType === 'couple' ? 'btn-primary' : 'btn-outline'}" onclick="window.yatraApp.setOnbOption('groupType', 'couple')"> Couple</button>
 <button type="button" class="btn ${ob.groupType === 'family' ? 'btn-primary' : 'btn-outline'}" onclick="window.yatraApp.setOnbOption('groupType', 'family')"> Family</button>
 <button type="button" class="btn ${ob.groupType === 'friends' ? 'btn-primary' : 'btn-outline'}" onclick="window.yatraApp.setOnbOption('groupType', 'friends')"> Friends</button>
 </div>
 </div>

 <!-- 5. Accessibility (MULTI-SELECT) -->
 <div class="onb-section" style="margin-top: 16px;">
 <label class="onb-section-label" style="font-size: 12px; font-weight: 800; color: var(--primary);">
 5. ACCESSIBILITY & SPECIAL REQUIREMENTS (Multi-select)
 </label>
 <div class="onb-chips-grid">
 ${[
 { key: 'wheelchair', label: 'Wheelchair accessible', icon: '' },
 { key: 'lowWalking', label: 'Low walking requirement', icon: '' },
 { key: 'family', label: 'Family-friendly', icon: '‍‍' },
 { key: 'senior', label: 'Senior-friendly', icon: '' },
 { key: 'child', label: 'Child-friendly', icon: '' }
 ].map(item => `
 <button type="button" class="onb-choice-chip ${ob.accessibility?.[item.key] ? 'selected' : ''}" onclick="window.yatraApp.toggleOnbAccessibility('${item.key}')">
 <span>${item.icon}</span>
 <span>${item.label}</span>
 </button>
 `).join('')}
 </div>
 </div>

 <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
 <button type="button" class="btn btn-outline" onclick="window.location.hash='#onboarding-destination'">← Back to Destination</button>
 <button type="button" class="btn btn-primary btn-lg" onclick="window.yatraApp.generateOnboardingPlan()">
 CREATE MY ITINERARY ➔
 </button>
 </div>
 </div>
 </div>
 `;
 }

 toggleOnbInterest(id) {
 store.toggleOnboardingInterest(id);
 this.renderOnboardingPrefView();
 }

 toggleOnbAccessibility(key) {
 store.toggleOnboardingAccessibility(key);
 this.renderOnboardingPrefView();
 }

 setOnbOption(key, val) {
 store.setOnboardingOption(key, val);
 this.renderOnboardingPrefView();
 }

 generateOnboardingPlan() {
 const ob = store.state.onboarding;
 const destId = store.state.currentDestinationId || 'jaipur';
 const destPlaces = store.places.length > 0 ? store.places : PLACES;
 
 // Compute explainable scores
 const scored = destPlaces.map(p => {
 const rec = store.computeRecommendationScore(p, ob.interests, ob.groupType, ob.duration, ob.accessibility);
 return { place: p, rec, score: rec.score };
 }).sort((a, b) => b.score - a.score);

 // Number of days based on duration
 let daysCount = 1;
 if (ob.duration === '2 Days') daysCount = 2;
 else if (ob.duration === '3 Days') daysCount = 3;

 const stopsPerDay = ob.pace === 'relaxed' ? 3 : ob.pace === 'packed' ? 5 : 4;
 const plan = { day1: [], day2: [], day3: [] };

 let pool = [...scored];
 for (let d = 1; d <= daysCount; d++) {
 const dayKey = `day${d}`;
 const chosen = pool.splice(0, stopsPerDay);
 plan[dayKey] = chosen.map((item, idx) => ({
 placeId: item.place.id,
 time: idx === 0 ? '09:00 AM' : idx === 1 ? '11:30 AM' : idx === 2 ? '02:30 PM' : idx === 3 ? '04:45 PM' : '07:15 PM',
 note: `94% Match: Fits ${ob.groupType} travel pace and ${ob.duration} window`
 }));
 }

 ob.generatedPlan = plan;
 store.state.itineraries[destId] = plan;
 store.notify('itineraryUpdated');
 window.location.hash = '#itinerary-result';
 }

 renderItineraryResultView() {
 const container = document.getElementById('itineraryResultView');
 if (!container) return;
 const ob = store.state.onboarding;
 const destId = store.state.currentDestinationId || 'jaipur';
 const dest = DESTINATIONS[destId] || DESTINATIONS.jaipur;
 const plan = ob.generatedPlan || store.state.itineraries[destId] || { day1: [] };

 container.innerHTML = `
 <div class="onboarding-page-container">
 <div class="onboarding-header-strip">
 <button type="button" class="btn btn-sm btn-outline" onclick="window.location.hash='#onboarding-preferences'">← Back to Preferences</button>
 <div style="display: flex; gap: 8px;">
 <button type="button" class="btn btn-sm btn-secondary" onclick="window.yatraApp.optimizeRoute()"> Optimize Route</button>
 <button type="button" class="btn btn-sm btn-primary" onclick="window.location.hash='#trips'; window.yatraApp.showToast('Itinerary saved to My Trips! ', 'success');"> Save to My Trips</button>
 </div>
 </div>

 <div class="onboarding-content-card">
 <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
 <div>
 <span class="onb-step-badge" style="background: #EBF8FF; color: #1E40AF;"> 94% EXPLAINABLE MATCH</span>
 <h1 class="onb-title" style="margin-top: 4px;">${dest.name.toUpperCase()} • ${ob.duration.toUpperCase()}</h1>
 </div>
 <div style="font-size: 12px; color: var(--text-muted); font-weight: 700;">
 ${ob.groupType.toUpperCase()} • ${ob.pace.toUpperCase()} PACE • LOW WALKING
 </div>
 </div>

 <!-- Overall Plan Explainable "Why?" Accordion -->
 <div class="why-plan-box" style="background: #F8FAFC; border: 1px solid var(--border-bold); border-radius: 6px; padding: 12px; margin: 14px 0;">
 <div style="display: flex; align-items: center; justify-content: space-between;">
 <h3 style="font-size: 13.5px; font-weight: 800; color: var(--primary);"> Why this recommendation? (94% Match)</h3>
 <button type="button" class="btn-link-xs" onclick="window.yatraApp.togglePlanWhyAccordion()">Expand Details ▾</button>
 </div>
 <div id="planWhyAccordion" class="why-accordion-content" style="margin-top: 8px;">
 <div>✓ <strong>${ob.duration}</strong> available duration window fully optimized</div>
 <div>✓ <strong>Heritage & Cultural</strong> primary interest match</div>
 <div>✓ <strong>Low crowd density</strong> corridor selected (-75% vs high-surge central bottlenecks)</div>
 <div>✓ <strong>Optimal sun angle</strong> and midday heat index mitigation incorporated</div>
 <div>✓ <strong>Accessible by road</strong> and verified parking availability</div>
 <div>✓ <strong>Low walking requirement</strong> verified across all monument steps</div>
 </div>
 </div>

 <!-- Structured Daily Schedules with Individual Cards -->
 <div class="itin-days-feed">
 ${Object.entries(plan).map(([dayKey, stops]) => {
 if (!stops || stops.length === 0) return '';
 const dayNum = dayKey.replace('day', '');
 return `
 <div class="itin-day-card" style="background: white; border: 1px solid var(--border-subtle); border-radius: 6px; padding: 14px; margin-bottom: 14px;">
 <div class="idc-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle);">
 <h3 style="font-size: 14px; font-weight: 800; color: var(--primary);">DAY ${dayNum} SCHEDULE</h3>
 <span style="font-size: 11.5px; color: var(--text-muted); font-weight: 600;">${stops.length} Verified Stops</span>
 </div>

 <div class="idc-stops-list" style="display: flex; flex-direction: column; gap: 12px;">
 ${stops.map((s, idx) => {
 const place = PLACES.find(p => p.id === s.placeId) || store.places.find(p => p.id === s.placeId);
 if (!place) return '';
 const rec = store.computeRecommendationScore(place);
 return `
 <div class="idc-stop-row" style="display: flex; gap: 12px; align-items: flex-start; padding: 10px; background: #F8FAFC; border-radius: 6px; border: 1px solid var(--border-subtle);">
 <div style="min-width: 75px; font-size: 12px; font-weight: 800; color: var(--gov-blue);">${s.time}</div>
 <div style="flex: 1;">
 <div style="display: flex; align-items: center; justify-content: space-between;">
 <h4 style="font-size: 13.5px; font-weight: 800; color: var(--primary); cursor: pointer;" onclick="window.yatraApp.openPlaceDetails('${place.id}')">
 ${place.name}
 </h4>
 <span style="font-size: 11px; font-weight: 800; color: #1D4ED8; background: #DBEAFE; padding: 2px 6px; border-radius: 3px;">
 ${rec.score}% Match
 </span>
 </div>
 <p style="font-size: 11.5px; color: var(--text-muted); margin: 3px 0;">${place.shortDesc}</p>
 
 <!-- Individual Expandable Why button -->
 <button type="button" class="btn-why-expand" onclick="window.yatraApp.toggleStopWhyAccordion('${place.id}-${idx}')">
 Why this place? ▾
 </button>
 <div id="stopWhyAccordion-${place.id}-${idx}" class="why-accordion-content hidden">
 ${rec.whyBullets.map(b => `<div>${b}</div>`).join('')}
 </div>
 </div>
 <div style="display: flex; flex-direction: column; gap: 4px;">
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.openPlaceDetails('${place.id}')">Details</button>
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.focusPlaceOnMap('${place.id}')">Map</button>
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.removeItineraryStop(${idx}, '${dayKey}')" title="Remove stop">✕</button>
 </div>
 </div>
 `;
 }).join('')}
 </div>
 </div>
 `;
 }).join('')}
 </div>

 <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
 <button type="button" class="btn btn-outline" onclick="window.location.hash='#onboarding-preferences'">← Re-customize Preferences</button>
 <button type="button" class="btn btn-primary btn-lg" onclick="window.location.hash='#trips'; window.yatraApp.showToast('Itinerary loaded into My Trips! ', 'success');">
 OPEN IN MY TRIPS ➔
 </button>
 </div>
 </div>
 </div>
 `;
 }

 togglePlanWhyAccordion() {
 const el = document.getElementById('planWhyAccordion');
 if (el) el.classList.toggle('hidden');
 }

 toggleStopWhyAccordion(stopKey) {
 const el = document.getElementById(`stopWhyAccordion-${stopKey}`);
 if (el) el.classList.toggle('hidden');
 }

 // =========================================================================
 // CAROUSEL & ANNOUNCEMENT TICKER
 // =========================================================================
 setupHeroCarousel() {
 this.carouselInterval = setInterval(() => {
 if (!this.carouselPaused) {
 this.nextHeroSlide();
 }
 }, 5500);
 }

 setHeroSlide(index) {
 const slides = document.querySelectorAll('.carousel-slide');
 const dots = document.querySelectorAll('.carousel-dot');
 if (slides.length === 0) return;

 this.currentHeroSlide = (index + slides.length) % slides.length;
 slides.forEach((s, idx) => {
 if (idx === this.currentHeroSlide) {
 s.classList.add('active');
 } else {
 s.classList.remove('active');
 }
 });

 dots.forEach((d, idx) => {
 if (idx === this.currentHeroSlide) {
 d.classList.add('active');
 } else {
 d.classList.remove('active');
 }
 });
 }

 nextHeroSlide() {
 this.setHeroSlide(this.currentHeroSlide + 1);
 }

 prevHeroSlide() {
 this.setHeroSlide(this.currentHeroSlide - 1);
 }

 toggleCarouselPause() {
 this.carouselPaused = !this.carouselPaused;
 const btn = document.getElementById('carouselPauseBtn');
 if (btn) {
 btn.innerText = this.carouselPaused ? 'Play Play' : 'Pause Pause';
 }
 this.showToast(this.carouselPaused ? 'Banner paused' : 'Banner playing', 'info');
 }

 setupAnnouncementTicker() {
 setInterval(() => {
 this.tickerIndex = (this.tickerIndex + 1) % this.tickerItems.length;
 const textEl = document.getElementById('liveAnnouncementText');
 if (textEl) {
 textEl.style.animation = 'none';
 void textEl.offsetWidth;
 textEl.innerText = this.tickerItems[this.tickerIndex];
 textEl.style.animation = 'tickerFade 0.4s ease';
 }
 }, 6000);
 }

 setFontSize(size) {
 document.querySelectorAll('.font-btn').forEach(btn => btn.classList.remove('active'));
 const btn = document.getElementById(`fontBtn_${size}`);
 if (btn) btn.classList.add('active');

 if (size === 'small') {
 document.documentElement.style.fontSize = '12px';
 } else if (size === 'large') {
 document.documentElement.style.fontSize = '16px';
 } else {
 document.documentElement.style.fontSize = '14px';
 }
 this.showToast(`Font size: ${size.toUpperCase()}`, 'info');
 }

 setLanguage(lang) {
 this.currentLanguage = lang;
 document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
 const btn = document.getElementById(`langBtn_${lang}`);
 if (btn) btn.classList.add('active');

 if (lang === 'hi') {
 document.documentElement.lang = 'hi';
 this.showToast('भाषा: हिंदी Active', 'info');
 } else {
 document.documentElement.lang = 'en';
 this.showToast('Language: English Active', 'info');
 }
 }

 handleSearchInput(query, containerId = 'heroSearchSuggestions') {
 const container = document.getElementById(containerId);
 if (!container) return;

 const q = (query || '').toLowerCase().trim();
 if (!q) {
 container.classList.add('hidden');
 container.innerHTML = '';
 return;
 }

 const allDests = Object.values(DESTINATIONS);
 const matches = allDests.filter(d => 
 d.name.toLowerCase().includes(q) || 
 d.state.toLowerCase().includes(q) ||
 (d.tagline && d.tagline.toLowerCase().includes(q))
 );

 if (matches.length === 0) {
 container.innerHTML = `
 <div style="padding: 10px 14px; font-size: 12px; color: var(--text-muted);">
 No matching destinations found for "<strong>${query}</strong>"
 </div>
 `;
 container.classList.remove('hidden');
 return;
 }

 container.innerHTML = matches.map(d => `
 <div class="hss-item" onclick="window.yatraApp.selectSearchSuggestion('${d.id}', '${containerId}')">
 <span class="hss-icon">${d.isFlagshipDemo ? '' : ''}</span>
 <div class="hss-info">
 <div class="hss-name">
 ${d.name}
 </div>
 <div class="hss-state">${d.state}, ${d.country} • Verified GIS Intel</div>
 </div>
 <span class="hss-badge">Select ➔</span>
 </div>
 `).join('');

 container.classList.remove('hidden');
 }

 selectSearchSuggestion(destId, containerId = 'heroSearchSuggestions') {
 this.switchDestination(destId);
 const container = document.getElementById(containerId);
 if (container) {
 container.classList.add('hidden');
 container.innerHTML = '';
 }
 const input = document.getElementById('heroDestinationSearch');
 if (input && DESTINATIONS[destId]) {
 input.value = DESTINATIONS[destId].name;
 }
 window.location.hash = '#explore';
 }

 handleLandingSearch(e) {
 e?.preventDefault?.();
 const heroSug = document.getElementById('heroSearchSuggestions');
 if (heroSug) heroSug.classList.add('hidden');

 const input = document.getElementById('heroDestinationSearch') || document.getElementById('topUtilitySearchInput');
 const q = input?.value?.trim() || '';
 if (q) {
 store.setSearchQuery(q);
 const parsed = aiPlanner.parseNaturalQuery(q);
 if (parsed && parsed.suggestedCategory) {
 store.toggleCategory(parsed.suggestedCategory);
 }
 }
 window.location.hash = '#explore';
 }

 // =========================================================================
 // GUARANTEED UNCONDITIONAL CLOSE & BACK HANDLERS
 // =========================================================================
 handleBackdropClick(event, closeFn) {
 if (event && event.target === event.currentTarget) {
 if (typeof closeFn === 'function') closeFn();
 }
 }

 closeAllModals() {
 this.closePlaceDetails();
 this.closeAuthModal();
 this.closeReels();
 this.closeAiPlanner();
 this.closeFeedbackModal();
 wrappedManager.close();
 this.closePopup();
 }

 navigateBack() {
 this.closeAllModals();
 if (window.history.length > 1) {
 window.history.back();
 } else {
 window.location.hash = '#explore';
 }
 }

 closePopup() {
 if (mapEngine.map) {
 mapEngine.map.closePopup();
 }
 }

 // =========================================================================
 // AUTHENTICATION MODAL & GUEST ACCESS
 // =========================================================================
 openAuthModal(mode = 'login', customReason = null, updateHash = true) {
 this.authMode = mode;
 const modal = document.getElementById('authModal');
 if (!modal) return;

 if (updateHash && window.location.hash !== `#${mode}`) {
 window.location.hash = `#${mode}`;
 }

 const pendingAction = store.state.pendingAuthAction;
 const actionReason = customReason || pendingAction?.actionTitle || null;

 modal.innerHTML = `
 <div class="modal-backdrop" onclick="window.yatraApp.handleBackdropClick(event, () => window.yatraApp.closeAuthModal())">
 <div class="auth-card-dialog">
 <button type="button" class="modal-close-btn" onclick="window.yatraApp.closeAuthModal()" title="Close dialog">✕</button>

 <div class="auth-split-grid">
 <div class="auth-hero-side" style="background-image: linear-gradient(180deg, rgba(15,23,42,0.45) 0%, rgba(15,23,42,0.92) 100%), url('https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80')">
 <div class="auth-hero-branding">
 <div class="auth-brand-pill"> SAFARNAMA TOURISM PORTAL</div>
 <h2>Explore Jaipur.<br>Authentic & Verified.</h2>
 <p>Sign in to save custom itineraries, bookmark heritage landmarks, log visits, and access safety routes.</p>
 </div>
 <div class="auth-hero-footer">
 <span>✓ Verified Heritage Intelligence & Spatial Guides</span>
 </div>
 </div>

 <div class="auth-form-side">
 <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.closeAuthModal()">← Back to Explore</button>
 <span class="gov-trust-badge">Public Service Portal</span>
 </div>

 <div class="auth-form-header">
 <h3>${this.authMode === 'login' ? 'Explorer Sign In' : 'Create Account'}</h3>
 <p class="text-muted">${this.authMode === 'login' ? 'Sign in to access your saved trips and passport' : 'Sign up to build custom trips and submit reviews'}</p>
 </div>

 ${actionReason ? `
 <div class="auth-guest-notice-banner">
 <span>ℹ️ Sign in required to <strong>${actionReason}</strong>. You will be returned immediately after login.</span>
 </div>
 ` : ''}

 <button type="button" class="btn btn-google-auth" onclick="window.yatraApp.submitGoogleAuth()">
 <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
 <span>Continue with Google</span>
 </button>

 <div class="auth-divider">
 <span>or continue with email</span>
 </div>

 <form onsubmit="window.yatraApp.handleAuthSubmit(event)" class="auth-form-fields">
 ${this.authMode === 'signup' ? `
 <div class="form-group">
 <label>Full Name</label>
 <input type="text" id="authNameInput" required placeholder="e.g. Aarav Sharma" class="form-input" />
 </div>
 ` : ''}

 <div class="form-group">
 <label>Email Address</label>
 <input type="email" id="authEmailInput" required placeholder="name@example.com" class="form-input" />
 </div>

 <div class="form-group">
 <div class="label-row">
 <label>Password</label>
 </div>
 <input type="password" id="authPassInput" required placeholder="••••••••" class="form-input" />
 </div>

 <button type="submit" class="btn btn-primary btn-block btn-lg">
 ${this.authMode === 'login' ? 'Sign In' : 'Create Account'}
 </button>
 </form>

 <button type="button" class="btn-continue-guest" onclick="window.yatraApp.closeAuthModal()">
 Continue as Guest Explorer →
 </button>

 <div class="auth-footer-toggle">
 ${this.authMode === 'login' ? `
 <span>New to the platform?</span>
 <button type="button" class="btn-link" onclick="window.yatraApp.openAuthModal('signup')">Create Account</button>
 ` : `
 <span>Already registered?</span>
 <button type="button" class="btn-link" onclick="window.yatraApp.openAuthModal('login')">Sign In</button>
 `}
 </div>
 </div>
 </div>
 </div>
 </div>
 `;

 modal.classList.remove('hidden');
 }

 closeAuthModal() {
 const modal = document.getElementById('authModal');
 if (modal) {
 modal.classList.add('hidden');
 modal.innerHTML = '';
 }
 if (window.location.hash === '#login' || window.location.hash === '#signup') {
 window.location.hash = this.lastNonModalHash || '#explore';
 }
 }

 handleAuthSubmit(e) {
 e.preventDefault();
 const email = document.getElementById('authEmailInput')?.value || 'aarav.sharma@gmail.com';
 const name = document.getElementById('authNameInput')?.value || 'Aarav Sharma';

 if (this.authMode === 'signup') {
 store.signup(name, email);
 } else {
 store.login(email, name);
 }
 this.closeAuthModal();
 this.showToast(`Welcome, ${store.state.userSession.name}!`, 'success');
 }

 submitGoogleAuth() {
 store.login('aarav.sharma@gmail.com', 'Aarav Sharma');
 this.closeAuthModal();
 this.showToast('Signed in with Google successfully!', 'success');
 }

 updateUserSessionUI() {
 const session = store.state.userSession;
 const loginBtn = document.getElementById('topNavLoginBtn');
 const userBtn = document.getElementById('topNavUserBtn');
 const gmdLoginLabel = document.getElementById('gmdLoginLabel');

 if (session && session.isLoggedIn) {
 if (loginBtn) loginBtn.classList.add('hidden');
 if (userBtn) {
 userBtn.classList.remove('hidden');
 userBtn.innerHTML = `
 <img src="${session.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}" class="nav-avatar-img" alt="${session.name}" />
 <span>${session.name}</span>
 <span class="nav-score-pill">★ ${store.explorationScore}</span>
 `;
 userBtn.onclick = () => window.location.hash = '#profile';
 }
 if (gmdLoginLabel) gmdLoginLabel.textContent = session.name ? session.name.split(' ')[0] : 'Profile';
 } else {
 if (loginBtn) {
 loginBtn.classList.remove('hidden');
 loginBtn.onclick = () => this.openAuthModal('login');
 }
 if (userBtn) {
 userBtn.classList.add('hidden');
 }
 if (gmdLoginLabel) gmdLoginLabel.textContent = 'Login';
 }
 }

 // =========================================================================
 // PLACE DETAILS MODAL
 // =========================================================================
 openPlaceDetails(placeId, updateHash = true) {
 const place = PLACES.find(p => p.id === placeId);
 if (!place) return;

 if (updateHash && window.location.hash !== `#place/${placeId}`) {
 window.location.hash = `#place/${placeId}`;
 }

 const modal = document.getElementById('placeDetailModal');
 if (!modal) return;

 const isSaved = store.state.savedPlaceIds.has(place.id);
 const isVisited = store.state.visitedPlaceIds.has(place.id);
 const inTrip = store.isPlaceInItinerary(place.id);
 const cat = CATEGORIES.find(c => c.id === place.category) || CATEGORIES[0];
 const rec = store.computeRecommendationScore(place);

 // Dynamic thumbnail images
 const thumb1 = place.imageUrl;
 const thumb2 = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80';
 const thumb3 = 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80';

 modal.innerHTML = `
 <div class="modal-backdrop" onclick="window.yatraApp.handleBackdropClick(event, () => window.yatraApp.closePlaceDetails())">
 <div class="modal-card place-detail-card">
 
 <!-- Top Breadcrumbs Bar -->
 <div class="detail-top-nav-bar">
 <div class="gov-breadcrumbs">
 <a class="gov-breadcrumb-link" onclick="window.location.hash = '#landing'">Home</a>
 <span class="gov-breadcrumb-sep">/</span>
 <a class="gov-breadcrumb-link" onclick="window.location.hash = '#explore'; window.yatraApp.closePlaceDetails();">Explore</a>
 <span class="gov-breadcrumb-sep">/</span>
 <span class="gov-breadcrumb-link" onclick="window.yatraApp.closePlaceDetails();">Jaipur</span>
 <span class="gov-breadcrumb-sep">/</span>
 <span class="gov-breadcrumb-current">${place.name.split('(')[0].trim()}</span>
 </div>
 <div style="display: flex; align-items: center; gap: 8px;">
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.closePlaceDetails()">← Back to List</button>
 <button type="button" class="modal-close-btn" onclick="window.yatraApp.closePlaceDetails()" title="Close details">✕</button>
 </div>
 </div>
 
 <!-- Top Split Section: Gallery Left + Metadata Right (Matching SIH Screenshot 4) -->
 <div class="detail-split-top">
 <div class="detail-gallery-left">
 <div class="detail-main-img" id="detailMainImg" style="background-image: url('${place.imageUrl}')"></div>
 <div class="detail-thumbs-col">
 <div class="detail-thumb-img" style="background-image: url('${thumb1}')" onclick="document.getElementById('detailMainImg').style.backgroundImage='url(${thumb1})'"></div>
 <div class="detail-thumb-img" style="background-image: url('${thumb2}')" onclick="document.getElementById('detailMainImg').style.backgroundImage='url(${thumb2})'"></div>
 <div class="detail-thumb-img" style="background-image: url('${thumb3}')" onclick="document.getElementById('detailMainImg').style.backgroundImage='url(${thumb3})'"></div>
 </div>
 </div>

 <div class="detail-info-right">
 <div class="dir-title-row">
 <h2>${place.name}</h2>
 <div class="dir-subtitle"> ${place.distanceFromCenter} from City Center • ${cat.name}</div>
 <div class="dir-rating-row">
 <span>★ ${place.rating}</span>
 <span style="color: #6B7280; font-weight: 500;">(${place.reviewsCount ? place.reviewsCount.toLocaleString() : '840'} verified reviews)</span>
 <span class="status-pill optimal">Verified Landmark</span>
 </div>
 </div>

 <!-- Pass & Visiting Plan Selector (Screenshot 4) -->
 <div class="detail-tier-group">
 <label class="detail-tier-option">
 <div>
 <input type="radio" name="placePassTier" checked />
 <span>General Composite Pass</span>
 </div>
 <span class="detail-tier-price">${place.entryFee.split(',')[0]}</span>
 </label>
 <label class="detail-tier-option">
 <div>
 <input type="radio" name="placePassTier" />
 <span>Audio Guided Tour Package</span>
 </div>
 <span class="detail-tier-price">₹200</span>
 </label>
 <label class="detail-tier-option">
 <div>
 <input type="radio" name="placePassTier" />
 <span>Full Heritage Experience + Map</span>
 </div>
 <span class="detail-tier-price">₹350</span>
 </label>
 </div>

 <div style="font-size: 11.5px; color: var(--text-muted); display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
 <span> Timings: <strong>${place.openingHours}</strong></span>
 <span> Duration: <strong>${place.avgDuration}</strong></span>
 </div>

 <!-- Primary Action Buttons (Matching Screenshot 4) -->
 <div class="detail-action-buttons-row">
 <button type="button" class="btn btn-chat" onclick="window.yatraApp.closePlaceDetails(); window.yatraApp.openAiPlanner('chat');">
 Chat with Safarnama AI
 </button>
 <button type="button" class="btn btn-primary" onclick="window.yatraApp.toggleItineraryPlace('${place.id}')">
 ${inTrip ? '✓ In Current Trip' : '+ Add to Itinerary ➔'}
 </button>
 </div>
 </div>
 </div>

 <!-- Middle Section: Explainable Intelligence & Conditions -->
 <div class="detail-middle-section">
 <div class="detail-why-box">
 <div class="dwb-header" onclick="window.yatraApp.toggleWhyAccordion('${place.id}')">
 <span> Why Recommended for You? (94% Match Score)</span>
 <span style="font-size: 11px;">Expand ▾</span>
 </div>
 <div class="dwb-bullets" id="detailWhyList">
 ${rec.whyBullets.map(b => `<span>✓ ${b}</span>`).join('')}
 </div>
 </div>

 <div class="detail-conditions-row">
 <span class="condition-pill"> Weather: <strong>28°C Clear</strong></span>
 <span class="condition-pill"> Tourism Pressure: <strong>${place.crowdLevel || 'Normal'}</strong></span>
 <span class="condition-pill"> Safety Index: <strong>88/100 (Safe Corridor)</strong></span>
 <span class="condition-pill"> Accessibility: <strong>${place.accessibility?.wheelchair ? 'Wheelchair Ready' : 'Moderate Steps'}</strong></span>
 </div>
 </div>

 <!-- Bottom Structured Metadata Table (Matching SIH Screenshot 1 & 4 Table) -->
 <div class="detail-table-section">
 <div style="font-size: 13px; font-weight: 800; color: var(--text-main); margin-bottom: 8px;">
 Heritage & Spatial Ledger
 </div>

 <table class="detail-data-table">
 <tbody>
 <tr>
 <th>Description</th>
 <td>${place.longDesc || place.shortDesc}</td>
 </tr>
 <tr>
 <th>Verified Local Tip</th>
 <td> ${place.localTip || 'Arrive early in the morning for optimal photography and low crowd congestion.'}</td>
 </tr>
 <tr>
 <th>Audio Narration</th>
 <td style="display: flex; align-items: center; justify-content: space-between;">
 <span>Official Rajasthan Tourism Guide Narration</span>
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.playAudioGuide('${place.id}')">
 Play Play Audio Guide
 </button>
 </td>
 </tr>
 <tr>
 <th>Location & Police Desk</th>
 <td>${place.address || 'Amer Road, Jaipur'} • Nearest Police Desk: <strong>Tourist Police Booth (400m, Dial 112)</strong></td>
 </tr>
 </tbody>
 </table>

 <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border-subtle);">
 <div style="display: flex; gap: 8px;">
 <button type="button" class="btn btn-sm btn-outline" onclick="window.yatraApp.focusPlaceOnMap('${place.id}'); window.yatraApp.closePlaceDetails();">
 View on Map
 </button>
 <button type="button" class="btn btn-sm btn-emerald" onclick="window.yatraApp.planRouteTo('${place.id}')">
 Plan Safer Route
 </button>
 </div>

 <div style="display: flex; gap: 6px;">
 <button type="button" class="btn-icon-sm ${isSaved ? 'active' : ''}" onclick="window.yatraApp.toggleSave('${place.id}')" title="Save">
 ${isSaved ? 'Saved' : 'Save'}
 </button>
 <button type="button" class="btn-icon-sm ${isVisited ? 'active' : ''}" onclick="window.yatraApp.toggleVisited('${place.id}')" title="Mark Visited">
 ${isVisited ? '' : ''}
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 `;

 modal.classList.remove('hidden');
 }

 closePlaceDetails() {
 const modal = document.getElementById('placeDetailModal');
 if (modal) {
 modal.classList.add('hidden');
 modal.innerHTML = '';
 }
 if (window.location.hash.startsWith('#place/')) {
 window.location.hash = this.lastNonModalHash || '#explore';
 }
 }

 playAudioGuide(placeId) {
 const place = PLACES.find(p => p.id === placeId);
 const placeName = place ? place.name : 'Jaipur Heritage Landmark';
 if ('speechSynthesis' in window) {
 window.speechSynthesis.cancel();
 const utterance = new SpeechSynthesisUtterance(`Welcome to ${placeName}. An architectural monument of Jaipur, documented in the tourism heritage archives.`);
 utterance.rate = 0.95;
 window.speechSynthesis.speak(utterance);
 this.showToast(` Audio Guide: ${placeName}`, 'info');
 }
 }

 simulateNextNavStep() {
 const stops = store.currentDayStops;
 if (stops.length < 2) return;
 this.currentNavStep = (this.currentNavStep + 1) % (stops.length - 1);
 const start = stops[this.currentNavStep];
 const next = stops[this.currentNavStep + 1];
 mapEngine.updateNavigationBanner(start, next);
 mapEngine.focusPlace(start.place.id);
 }

 // =========================================================================
 // COMMUNITY ROUTE FEEDBACK MODAL
 // =========================================================================
 openFeedbackModal(routeId = store.state.activeSaferRouteId, optionId = store.state.activeSaferOptionId) {
 store.requireAuth('submit route feedback', () => {
 const modal = document.getElementById('feedbackModal');
 if (!modal) return;

 const route = store.activeSaferRoute;

 modal.innerHTML = `
 <div class="modal-backdrop" onclick="window.yatraApp.handleBackdropClick(event, () => window.yatraApp.closeFeedbackModal())">
 <div class="modal-card feedback-modal-card">
 <button type="button" class="modal-close-btn" onclick="window.yatraApp.closeFeedbackModal()" title="Close">✕</button>

 <div class="feedback-modal-header">
 <span class="fb-badge">COMMUNITY VERIFICATION</span>
 <h2>Submit Route Safety Feedback</h2>
 <p>Contribute real-world observations on street lighting, crowd presence, and transit safety.</p>
 </div>

 <form onsubmit="window.yatraApp.handleFeedbackSubmit(event, '${routeId}', '${optionId}')" class="feedback-form">
 <div class="form-group">
 <label>Corridor Traveled</label>
 <input type="text" class="form-input" readonly value="${route?.title || 'Jaipur Tourism Corridor'}" />
 </div>

 <div class="form-group">
 <label>Transit Safety Perception</label>
 <div class="feedback-radio-row">
 <label class="fb-choice-btn"><input type="radio" name="fbComfort" value="Very safe & comfortable" checked /> <span> Very Safe</span></label>
 <label class="fb-choice-btn"><input type="radio" name="fbComfort" value="Comfortable" /> <span> Comfortable</span></label>
 <label class="fb-choice-btn"><input type="radio" name="fbComfort" value="Needs caution after dark" /> <span> Moderate</span></label>
 </div>
 </div>

 <div class="fb-two-col">
 <div class="form-group">
 <label>Lighting Status</label>
 <select name="fbLighting" class="form-input">
 <option value="Good (Well-Lit LED Grid)" selected> Good (Well-Lit LED Grid)</option>
 <option value="Moderate (Partial Streetlights)"> Moderate (Partial Streetlights)</option>
 <option value="Low (Dark Sections)"> Low (Dark Sections)</option>
 </select>
 </div>

 <div class="form-group">
 <label>Footfall & Activity</label>
 <select name="fbCrowd" class="form-input">
 <option value="High (Busy Tourist Area)" selected> High (Busy Tourist Area)</option>
 <option value="Medium (Regular Local Traffic)"> Medium (Regular Traffic)</option>
 <option value="Quiet / Isolated"> Quiet / Isolated</option>
 </select>
 </div>
 </div>

 <div class="form-group">
 <label>Observations & Recommendations</label>
 <textarea name="fbComment" required placeholder="e.g. Good LED municipal lighting along Amer Road, helpful local vendors..." class="form-input" rows="3"></textarea>
 </div>

 <div class="feedback-modal-footer">
 <button type="button" class="btn btn-outline" onclick="window.yatraApp.closeFeedbackModal()">Cancel</button>
 <button type="submit" class="btn btn-primary">
 Submit Feedback
 </button>
 </div>
 </form>
 </div>
 </div>
 `;

 modal.classList.remove('hidden');
 });
 }

 closeFeedbackModal() {
 const modal = document.getElementById('feedbackModal');
 if (modal) {
 modal.classList.add('hidden');
 modal.innerHTML = '';
 }
 }

 handleFeedbackSubmit(e, routeId, optionId) {
 e.preventDefault();
 const formData = new FormData(e.target);
 const comfort = formData.get('fbComfort');
 const lighting = formData.get('fbLighting');
 const crowding = formData.get('fbCrowd');
 const comment = formData.get('fbComment');

 store.addCommunityFeedback({
 routeId,
 optionId,
 comfort,
 lighting,
 crowding,
 comment
 });

 this.closeFeedbackModal();
 this.showToast('Thank you! Your feedback has been verified and added to the community logs. ', 'success');
 }

 // =========================================================================
 // REELS & AI PLANNER MODAL CONTROLS
 // =========================================================================
 openReels(index = 0) {
 reelsManager.open(index);
 }

 closeReels() {
 reelsManager.close();
 if (window.location.hash === '#reels') {
 window.location.hash = this.lastNonModalHash || '#explore';
 }
 }

 nextReel() {
 reelsManager.nextReel();
 }

 prevReel() {
 reelsManager.prevReel();
 }

 toggleReelLike(reelId) {
 store.requireAuth('like reels', () => {
 reelsManager.toggleLike(reelId);
 });
 }

 viewReelOnMap(placeId) {
 this.closeReels();
 window.location.hash = '#map';
 setTimeout(() => {
 mapEngine.focusPlace(placeId);
 }, 200);
 }

 shareReel(reelId) {
 this.showToast('Reel link copied to clipboard! ', 'success');
 }

 openAiPlanner(tab = 'chat') {
 aiPlanner.open(tab);
 }

 closeAiPlanner() {
 aiPlanner.close();
 if (window.location.hash === '#ai-assistant') {
 window.location.hash = this.lastNonModalHash || '#explore';
 }
 }

 setWizardOption(key, val) {
 aiPlanner.setOption(key, val);
 }

 toggleWizardInterest(intId) {
 aiPlanner.toggleInterest(intId);
 }

 generateAiPlan() {
 aiPlanner.generateCustomPlan();
 }

 renderAiWizard() {
 aiPlanner.renderWizard();
 }

 applyAiPlan() {
 aiPlanner.applyPlanToTrip();
 }

 viewOnMap(placeId) {
 window.location.hash = '#map';
 setTimeout(() => {
 mapEngine.focusPlace(placeId);
 }, 150);
 }

 // =========================================================================
 // EXPLORER & SIDEBAR RENDERING
 // =========================================================================
 renderLandingDestinations() {
 const container = document.getElementById('landingDestinationsGrid');
 if (!container) return;

 const destinations = Object.values(DESTINATIONS);
 container.innerHTML = destinations.map(d => {
 const isCurrent = d.id === store.state.currentDestinationId;
 const pct = Math.round((d.currentVisitorCount / d.capacityLimit) * 100);
 const isHigh = pct >= 80;

 return `
 <div class="dest-card ${isCurrent ? 'active-dest' : ''}" onclick="window.yatraApp.switchDestination('${d.id}'); window.location.hash = '#explore';">
 <div class="dest-media" style="background-image: url('${d.heroImage}')">
 <span class="dest-state-badge">${d.state}</span>
 <span class="dest-capacity-badge ${isHigh ? 'surge' : 'normal'}">
 ${isHigh ? ' High Surge' : ' Optimal Flow'} (${pct}% Cap)
 </span>
 </div>
 <div class="dest-content">
<div class="dest-title-row">
 <h3 class="dest-name">${d.name}</h3>
 </div>
 <p class="dest-tagline">${d.tagline}</p>
 <div class="dest-stats-row">
 <span>${d.currentVisitorCount.toLocaleString()} visitors</span>
 <span>•</span>
 <span>${d.weather.temp}°C ${d.weather.condition}</span>
 </div>
 <div class="dest-opp-zones">
 <small>Opportunity Zones: ${d.opportunityZones.join(', ')}</small>
 </div>
 <div class="dest-card-action">
 <button type="button" class="btn btn-sm ${isCurrent ? 'btn-primary' : 'btn-outline'} btn-block">
 ${isCurrent ? 'Currently Exploring' : 'Explore ' + d.name + ' ➔'}
 </button>
 </div>
 </div>
 </div>
 `;
 }).join('');
 }

 renderPlacesExplorerList() {
 const listContainer = document.getElementById('sidebarPlacesList') || document.getElementById('placesExplorerList');
 if (!listContainer) return;

 // Get places for current destination
 let places = store.places;

 // 1. Filter by Explore Sub-view
 if (this.exploreSubView === 'gems') {
 places = UNDER_DISCOVERED_DESTINATIONS.filter(p => p.destinationId === store.state.currentDestinationId);
 } else if (this.exploreSubView === 'routes') {
 places = places.filter(p => p.isPopular || p.rating >= 4.7);
 }

 // 2. Filter by Category Quick Pill
 if (this.sidebarCategoryFilter && this.sidebarCategoryFilter !== 'all') {
 if (this.sidebarCategoryFilter === 'gems') {
 places = places.filter(p => p.isUnderDiscovered || p.category === 'gems');
 } else {
 places = places.filter(p => p.category === this.sidebarCategoryFilter || (p.subcategories && p.subcategories.includes(this.sidebarCategoryFilter)));
 }
 }

 // 3. Filter by Live Search Query
 if (this.sidebarSearchQuery && this.sidebarSearchQuery.trim()) {
 const q = this.sidebarSearchQuery.toLowerCase().trim();
 places = places.filter(p => 
 p.name.toLowerCase().includes(q) ||
 (p.shortDesc && p.shortDesc.toLowerCase().includes(q)) ||
 (p.category && p.category.toLowerCase().includes(q)) ||
 (p.localTip && p.localTip.toLowerCase().includes(q))
 );
 }

 // 4. Filter by Accessibility
 if (this.activeAccessibilityOnly) {
 places = places.filter(p => {
 const acc = (p.conditions && p.conditions.accessibility) || '';
 return acc.toLowerCase().includes('wheelchair') || acc.toLowerCase().includes('ramp') || acc.toLowerCase().includes('accessible');
 });
 }

 if (this.activeLowWalkingOnly) {
  places = places.filter(p => {
   const text = `${p.conditions?.accessibility || ''} ${p.conditions?.trailCondition || ''} ${p.shortDesc || ''}`.toLowerCase();
   return !text.includes('rugged') && !text.includes('steps') && !text.includes('hike') && !text.includes('trek');
  });
 }

 if (this.activeDurationFilter !== 'all') {
  places = places.filter(p => this.matchesDuration(p, this.activeDurationFilter));
 }

 // 4b. Filter by travel group so accessibility and family needs are visible upfront.
 if (this.activeAudience === 'family') {
  places = places.filter(p => p.subcategories?.includes('family') || p.familyFriendly);
 } else if (this.activeAudience === 'wheelchair') {
  places = places.filter(p => {
   const acc = (p.conditions && p.conditions.accessibility) || '';
   return acc.toLowerCase().includes('wheelchair') || acc.toLowerCase().includes('ramp') || acc.toLowerCase().includes('accessible');
  });
 }

 // 5. Filter by Crowd Level
 if (this.activeCrowdFilter && this.activeCrowdFilter !== 'all') {
 if (this.activeCrowdFilter === 'low') {
 places = places.filter(p => !p.isHighPressure && (p.crowdLevel === 'low' || p.isUnderDiscovered));
 } else if (this.activeCrowdFilter === 'moderate') {
 places = places.filter(p => !p.isHighPressure);
 }
 }

 // Empty state handling
 if (places.length === 0) {
 listContainer.innerHTML = `
 <div class="sidebar-empty-state" style="padding: 24px 16px; text-align: center; color: var(--text-muted);">
 <div style="font-size: 18px; margin-bottom: 8px; font-weight: 700; color: var(--text-muted);">No Results</div>
 <h4 style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">No matching destinations</h4>
 <p style="font-size: 12px; margin-bottom: 12px; line-height: 1.4;">Try resetting filters or searching for different keywords like 'palace', 'stepwell', or 'bazaar'.</p>
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.resetSidebarFilters()">Reset All Filters</button>
 </div>
 `;
 return;
 }

 // Render compact cards with progressive disclosure
 listContainer.innerHTML = places.map(p => {
 const inTrip = store.isPlaceInItinerary(p.id);
 const isHigh = p.isHighPressure;
 const altGems = store.getUnderDiscoveredAlternatives(p.id);
 const catObj = CATEGORIES.find(c => c.id === p.category) || { name: p.category, icon: '' };

 return `
 <div class="explore-place-card ${isHigh ? 'surge-warning' : ''}" data-place-id="${p.id}" id="exploreCard-${p.id}">
 <div class="epc-top-row">
 <div class="epc-thumbnail-wrap" onclick="window.yatraApp.focusPlaceOnMap('${p.id}')">
 <img src="${p.imageUrl}" alt="${p.name}" class="epc-thumb" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=300&q=80'">
 ${p.isUnderDiscovered ? '<span class="epc-gem-badge">Hidden Gem</span>' : ''}
 ${isHigh ? '<span class="epc-surge-badge">High Surge</span>' : ''}
 </div>
 <div class="epc-info-col">
 <div class="epc-header-line">
 <h4 class="epc-title" onclick="window.yatraApp.focusPlaceOnMap('${p.id}')" title="${p.name}">${p.name}</h4>
 <span class="epc-rating">★ ${p.rating || '4.8'}</span>
 </div>
 <div class="epc-meta-line">
 <span class="epc-cat">${catObj.name}</span>
 <span class="epc-dot">•</span>
 <span class="epc-time">${p.duration || '1.5 hrs'}</span>
 <span class="epc-dot">•</span>
 <span class="epc-fee">${p.entryFee || 'Free'}</span>
 </div>
 <div class="epc-crowd-row">
 <span class="epc-crowd-pill ${isHigh ? 'pill-surge' : 'pill-optimal'}">
 ${isHigh ? 'Surge: ' + (p.liveWaitTime || '35 min wait') : 'Optimal Flow (Live)'}
 </span>
 <button type="button" class="epc-why-toggle" onclick="window.yatraApp.toggleWhyAccordion('${p.id}')">
 Why? ▾
 </button>
 </div>
 </div>
 </div>

 <!-- Progressive Disclosure Accordion -->
 <div class="epc-accordion-body hidden" id="cardWhyAccordion-${p.id}">
 <div class="epc-why-content">
 <div class="epc-why-title">Recommendation Rationale</div>
 <p class="epc-why-text">${p.shortDesc || p.localTip || 'Top-rated historical landmark matching your interests and crowd flow.'}</p>
 ${p.conditions && p.conditions.accessibility ? `
 <div class="epc-why-tag">Accessibility: ${p.conditions.accessibility}</div>
 ` : ''}
 ${isHigh && altGems && altGems.length > 0 ? `
 <div class="epc-alt-gem-box">
 <span class="eag-title">Avoid Crowds — Visit Opportunity Gem:</span>
 <div class="eag-link" onclick="window.yatraApp.focusPlaceOnMap('${altGems[0].id}')">
 ➔ ${altGems[0].name} (${altGems[0].crowdReduction})
 </div>
 </div>
 ` : ''}
 </div>
 </div>

 <!-- Action Buttons Bar -->
 <div class="epc-actions-bar">
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.openPlaceDetails('${p.id}')">
 View Details
 </button>
 <button type="button" class="btn btn-xs ${inTrip ? 'btn-success' : 'btn-primary'}" onclick="window.yatraApp.toggleItineraryPlace('${p.id}')">
 ${inTrip ? '✓ Added' : '+ Add to Trip'}
 </button>
 <button type="button" class="btn btn-xs btn-secondary" onclick="window.yatraApp.focusPlaceOnMap('${p.id}')" title="Locate on spatial map">
 Map View
 </button>
 </div>
 </div>
 `;
 }).join('');
 }

 handleSidebarSearch(query) {
 this.sidebarSearchQuery = query;
 this.renderPlacesExplorerList();
 }

 setAudienceFilter(audience, button) {
  this.activeAudience = audience;
  this.activeAccessibilityOnly = audience === 'wheelchair';
  document.querySelectorAll('.traveller-focus-btn').forEach(btn => btn.classList.toggle('active', btn === button));
  const wheelchairCheckbox = document.getElementById('chk_wheelchair');
  if (wheelchairCheckbox) wheelchairCheckbox.checked = this.activeAccessibilityOnly;
  store.setAccessibilityFilter('wheelchairOnly', this.activeAccessibilityOnly);
  this.renderPlacesExplorerList();
 }

 matchesDuration(place, filter) {
  const text = `${place.avgDuration || ''} ${place.duration || ''}`.toLowerCase();
  const hourMatches = [...text.matchAll(/(\d+(?:\.\d+)?)\s*(?:-|–|to)?\s*(\d+(?:\.\d+)?)?\s*(?:hours?|hrs?)/g)];
  const hours = hourMatches.length
   ? Math.max(...hourMatches.map(match => Number(match[2] || match[1])))
   : text.includes('half-day') || text.includes('half day') ? 4 : 1;
  if (filter === '1-2') return hours <= 2;
  if (filter === 'half') return hours > 2 && hours <= 4;
  if (filter === 'full') return hours > 4;
  return true;
 }

 setCategoryFilter(catId) {
 this.sidebarCategoryFilter = catId;
 document.querySelectorAll('.qf-chip').forEach(btn => {
 btn.classList.toggle('active', btn.dataset.cat === catId);
 });
 this.renderPlacesExplorerList();
 }

 switchExploreSubView(subView) {
 this.exploreSubView = subView;
 document.querySelectorAll('.esc-btn').forEach(btn => {
 btn.classList.toggle('active', btn.dataset.view === subView);
 });
 this.renderPlacesExplorerList();
 }

 toggleMoreFiltersDrawer() {
 const drawer = document.getElementById('moreFiltersDrawer');
 const chevron = document.getElementById('moreFiltersChevron');
 if (!drawer) return;
 drawer.classList.toggle('hidden');
 if (chevron) {
 chevron.textContent = drawer.classList.contains('hidden') ? '▾' : '▴';
 }
 }

 handleFilterChange(type, value) {
 if (!type) {
  const wheelchairCheckbox = document.getElementById('chk_wheelchair');
    const lowWalkingCheckbox = document.getElementById('chk_low_walking');
  this.activeAccessibilityOnly = Boolean(wheelchairCheckbox?.checked);
    this.activeLowWalkingOnly = Boolean(lowWalkingCheckbox?.checked);
  this.activeAudience = this.activeAccessibilityOnly ? 'wheelchair' : 'all';
  document.querySelectorAll('.traveller-focus-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.audience === this.activeAudience));
  store.setAccessibilityFilter('wheelchairOnly', this.activeAccessibilityOnly);
  store.setAccessibilityFilter('lowWalking', this.activeLowWalkingOnly);
  this.renderPlacesExplorerList();
  return;
 }
 if (type === 'accessibility') {
 this.activeAccessibilityOnly = Boolean(value);
 store.setAccessibilityFilter('wheelchairOnly', this.activeAccessibilityOnly);
 } else if (type === 'crowd') {
 this.activeCrowdFilter = value;
 }
 this.renderPlacesExplorerList();
 }

 setTimeFilter(minutes) {
 this.activeDurationFilter = minutes;
 this.activeMaxTimeMinutes = minutes === '1-2' ? 120 : minutes === 'half' ? 240 : minutes === 'full' ? 480 : 0;
 document.querySelectorAll('.mfd-pill').forEach(btn => btn.classList.toggle('active', btn.getAttribute('onclick')?.includes(`'${minutes}'`)));
 this.renderPlacesExplorerList();
 }

 resetSidebarFilters() {
 this.sidebarSearchQuery = '';
 this.sidebarCategoryFilter = 'all';
 this.exploreSubView = 'places';
 this.activeMaxTimeMinutes = 120;
 this.activeDurationFilter = 'all';
 this.activeCrowdFilter = 'all';
 this.activeAccessibilityOnly = false;
 this.activeLowWalkingOnly = false;
 this.activeAudience = 'all';

 const sInput = document.getElementById('sidebarPlaceSearch');
 if (sInput) sInput.value = '';

 const accCheck = document.getElementById('chk_wheelchair');
 if (accCheck) accCheck.checked = false;
 const lowWalkingCheck = document.getElementById('chk_low_walking');
 if (lowWalkingCheck) lowWalkingCheck.checked = false;

 const crowdSel = document.getElementById('filterCrowdLevel');
 if (crowdSel) crowdSel.value = 'all';

 const tSlider = document.getElementById('filterMaxTime');
 if (tSlider) tSlider.value = '120';
 const valDisplay = document.getElementById('maxTimeValueDisplay');
 if (valDisplay) valDisplay.textContent = '120 mins';

 document.querySelectorAll('.mfd-pill').forEach(btn => btn.classList.toggle('active', btn.getAttribute('onclick')?.includes("'all'")));
 store.setAccessibilityFilter('wheelchairOnly', false);
 store.setAccessibilityFilter('lowWalking', false);

 document.querySelectorAll('.qf-chip').forEach(btn => {
 btn.classList.toggle('active', btn.dataset.cat === 'all');
 });

 document.querySelectorAll('.esc-btn').forEach(btn => {
 btn.classList.toggle('active', btn.dataset.view === 'places');
 });

 document.querySelectorAll('.traveller-focus-btn').forEach(btn => {
 btn.classList.toggle('active', btn.dataset.audience === 'all');
 });

 this.renderPlacesExplorerList();
 }

 openSelectedMarkerSheet(placeId) {
 const sheet = document.getElementById('selectedMarkerSheet');
 if (!sheet) return;
 const place = PLACES.find(p => p.id === placeId);
 if (!place) return;

 const inTrip = store.isPlaceInItinerary(place.id);
 const cat = CATEGORIES.find(c => c.id === place.category) || CATEGORIES[0];

 sheet.innerHTML = `
 <div class="sms-content">
 <div class="sms-thumb-col">
 <img src="${place.imageUrl}" alt="${place.name}" class="sms-thumb">
 </div>
 <div class="sms-details-col">
 <div class="sms-header">
 <div class="sms-title-group">
 <span class="sms-badge" style="background:${cat.color}">${cat.name}</span>
 <h4 class="sms-name">${place.name}</h4>
 </div>
 <button type="button" class="sms-close" onclick="window.yatraApp.closeSelectedMarkerSheet()">✕</button>
 </div>
 <p class="sms-desc">${place.shortDesc || place.localTip}</p>
 <div class="sms-meta">
 <span>★ ${place.rating}</span>
 <span>•</span>
 <span>${place.entryFee || 'Free'}</span>
 <span>•</span>
 <span>${place.duration || '1.5 hrs'}</span>
 <span>•</span>
 <span class="${place.isHighPressure ? 'text-danger' : 'text-success'}">
 ${place.isHighPressure ? 'High Surge' : 'Optimal Capacity'}
 </span>
 </div>
 <div class="sms-actions">
 <button type="button" class="btn btn-xs btn-primary" onclick="window.yatraApp.openPlaceDetails('${place.id}')">Full Dossier</button>
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.toggleItineraryPlace('${place.id}')">
 ${inTrip ? '✓ In Itinerary' : '+ Add to Trip'}
 </button>
 </div>
 </div>
 </div>
 `;
 sheet.classList.remove('hidden');
 }

 closeSelectedMarkerSheet() {
 const sheet = document.getElementById('selectedMarkerSheet');
 if (sheet) sheet.classList.add('hidden');
 }

 toggleMapLayersPopover() {
 const pop = document.getElementById('mapLayersPopover');
 if (!pop) return;
 pop.classList.toggle('hidden');
 }

 closeMapLayersPopover() {
 const pop = document.getElementById('mapLayersPopover');
 if (pop) pop.classList.add('hidden');
 }

 toggleWhyAccordion(placeId) {
 const el = document.getElementById(`cardWhyAccordion-${placeId}`);
 if (el) el.classList.toggle('hidden');
 }

 toggleMapLayersPanel() {
 this.toggleMapLayersPopover();
 }

 renderMapLayersPanel() {
 const panel = document.getElementById('mapLayersDockPanel');
 if (!panel) return;
 const layers = store.state.activeMapLayers;

 panel.innerHTML = `
 <div class="mlp-header">
 <div class="mlp-title"> GIS Map Layers Control</div>
 <button type="button" class="mlp-close" onclick="window.yatraApp.toggleMapLayersPanel()">✕</button>
 </div>
 <div class="mlp-toggles-list">
 <label class="mlp-toggle-row">
 <span> Tourism Pressure Zones</span>
 <span class="mlp-switch">
 <input type="checkbox" ${layers.tourismPressure ? 'checked' : ''} onchange="window.yatraApp.setLayerState('tourismPressure', this.checked)">
 <span class="mlp-slider"></span>
 </span>
 </label>
 <label class="mlp-toggle-row">
 <span> Opportunity Zones</span>
 <span class="mlp-switch">
 <input type="checkbox" ${layers.opportunityZones ? 'checked' : ''} onchange="window.yatraApp.setLayerState('opportunityZones', this.checked)">
 <span class="mlp-slider"></span>
 </span>
 </label>
 <label class="mlp-toggle-row">
 <span> Seasonal Destinations</span>
 <span class="mlp-switch">
 <input type="checkbox" ${layers.seasonalDestinations ? 'checked' : ''} onchange="window.yatraApp.setLayerState('seasonalDestinations', this.checked)">
 <span class="mlp-slider"></span>
 </span>
 </label>
 <label class="mlp-toggle-row">
 <span> Under-Discovered Gems</span>
 <span class="mlp-switch">
 <input type="checkbox" ${layers.underDiscovered ? 'checked' : ''} onchange="window.yatraApp.setLayerState('underDiscovered', this.checked)">
 <span class="mlp-slider"></span>
 </span>
 </label>
 <label class="mlp-toggle-row">
 <span> Police Stations</span>
 <span class="mlp-switch">
 <input type="checkbox" ${layers.safetyPolice ? 'checked' : ''} onchange="window.yatraApp.setLayerState('safetyPolice', this.checked)">
 <span class="mlp-slider"></span>
 </span>
 </label>
 <label class="mlp-toggle-row">
 <span> Emergency Healthcare</span>
 <span class="mlp-switch">
 <input type="checkbox" ${layers.safetyHospitals ? 'checked' : ''} onchange="window.yatraApp.setLayerState('safetyHospitals', this.checked)">
 <span class="mlp-slider"></span>
 </span>
 </label>
 <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
 <span style="font-size: 11px; color: var(--text-muted); font-weight: 700;">Base Map Tile</span>
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.toggleMapLayer()">Switch Map </button>
 </div>
 </div>
 `;
 }

 setLayerState(layerKey, isChecked) {
 store.setMapLayer(layerKey, isChecked);
 this.showToast(`${layerKey} layer ${isChecked ? 'enabled' : 'hidden'}`, 'info');
 }

 renderLocalGemsPanel() {
 const container = document.getElementById('gemsPanel');
 if (!container) return;

 const gemsList = UNDER_DISCOVERED_DESTINATIONS && UNDER_DISCOVERED_DESTINATIONS.length > 0
 ? UNDER_DISCOVERED_DESTINATIONS
 : LOCAL_DISCOVERIES;

 container.innerHTML = `
 <div class="local-gems-feed-inner">
 <div class="lg-feed-header" style="padding: 12px 14px; border-bottom: 1px solid var(--border-subtle); background: #FFFFFF;">
 <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
 <span class="gov-trust-badge">UNDER-DISCOVERED REDISTRIBUTION</span>
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.switchExploreSubView('places')">← All Places</button>
 </div>
 <h3 style="font-size: 16px; font-weight: 800; color: var(--primary); margin: 4px 0;">Dedicated Hidden Jaipur</h3>
 <p class="lg-sub" style="font-size: 11.5px; color: var(--text-muted); line-height: 1.35;">Verified lesser-known stepwells, marble cenotaphs, and artisan clusters absorbing peak congestion.</p>
 </div>

 <div class="local-discoveries-list" style="padding: 10px 14px; display: flex; flex-direction: column; gap: 12px;">
 ${gemsList.map(gem => {
 const pId = gem.id || gem.placeId;
 const inTrip = store.isPlaceInItinerary(pId);
 const img = gem.imageUrl || gem.image || 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80';
 const reduction = gem.crowdReduction || '68% FEWER VISITORS vs Hotspots';
 const matchScore = gem.matchScore || 81;
 const tags = gem.tags || ['Heritage', 'Low Walking', 'Good Accessibility'];

 return `
 <div class="local-gem-card" style="background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
 <div class="lg-card-media" style="height: 120px; background-image: url('${img}'); background-size: cover; background-position: center; position: relative;">
 <span style="position: absolute; top: 6px; left: 6px; background: #059669; color: white; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 3px; text-transform: uppercase;">
 ${reduction}
 </span>
 <span style="position: absolute; top: 6px; right: 6px; background: rgba(15,23,42,0.85); color: #FCD34D; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 3px;">
 ${matchScore}% Match
 </span>
 </div>
 <div class="lg-card-body" style="padding: 10px 12px;">
 <div style="display: flex; justify-content: space-between; align-items: flex-start;">
 <h4 class="lg-card-title" style="font-size: 13px; font-weight: 800; color: var(--primary); margin-bottom: 2px;">${gem.name}</h4>
 </div>
 <div style="font-size: 10.5px; color: var(--text-muted); margin-bottom: 6px;">
 ${Array.isArray(tags) ? tags.join(' • ') : tags}
 </div>
 <p class="lg-highlight" style="font-size: 11px; color: #475569; line-height: 1.35; margin-bottom: 8px;">
 <strong>Why Special:</strong> ${gem.whyVisit || gem.shortDesc || 'Lesser-known architectural wonder.'}
 </p>
 <div class="lg-card-actions" style="display: flex; gap: 6px; padding-top: 6px; border-top: 1px solid #F1F5F9;">
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.openPlaceDetails('${pId}')">
 View Details
 </button>
 <button type="button" class="btn btn-xs btn-secondary" onclick="window.yatraApp.focusPlaceOnMap('${pId}')">
 View on Map
 </button>
 <button type="button" class="btn btn-xs ${inTrip ? 'btn-success' : 'btn-primary'}" onclick="window.yatraApp.toggleItineraryPlace('${pId}')">
 ${inTrip ? '✓ Added' : '+ Add to Trip'}
 </button>
 </div>
 </div>
 </div>
 `;
 }).join('')}
 </div>
 </div>
 `;
 }

 // =========================================================================
 // SAFARNAMA - CURATED TRAVEL JOURNEYS & EDITORIAL STORIES
 // =========================================================================
 renderSafarnamaView() {
 const container = document.getElementById('safarnamaPanel');
 if (!container) return;

 const featured = SAFARNAMA_JOURNEYS.find(j => j.featured) || SAFARNAMA_JOURNEYS[0];
 const exploreJourneys = SAFARNAMA_JOURNEYS;

 container.innerHTML = `
 <div class="safarnama-editorial-wrapper" style="max-width: 1200px; margin: 0 auto; padding: 24px 20px; font-family: var(--font-sans);">
 <!-- Header Banner -->
 <div style="margin-bottom: 24px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
 <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
 <span class="badge-gov-shield">AUTHENTIC TRAVEL CHRONICLES</span>
 <span class="badge-sih">Verified Curators</span>
 </div>
 <h1 style="font-size: 26px; font-weight: 800; color: var(--primary); margin: 6px 0;">SAFARNAMA</h1>
 <p style="font-size: 14px; color: var(--text-muted); max-width: 700px; line-height: 1.5;">
 Curated destination stories, heritage journeys, and living artisan chronicles designed to experience Rajasthan with depth, serenity, and local economic respect.
 </p>
 </div>

 <!-- 1. Featured Journey Hero Card -->
 <div class="safarnama-featured-hero" style="background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 8px; overflow: hidden; margin-bottom: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
 <div style="height: 320px; background-image: linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.85) 100%), url('${featured.heroImage}'); background-size: cover; background-position: center; padding: 24px; display: flex; flex-direction: column; justify-content: flex-end; color: white;">
 <span style="font-size: 10px; font-weight: 800; background: #2563EB; color: white; padding: 3px 8px; border-radius: 4px; display: inline-block; align-self: flex-start; text-transform: uppercase;">FEATURED JOURNEY</span>
 <h2 style="font-size: 24px; font-weight: 800; margin: 8px 0 4px; color: white;">${featured.title}</h2>
 <p style="font-size: 13px; color: #E2E8F0; max-width: 700px; line-height: 1.4; margin-bottom: 12px;">${featured.subtitle}</p>
 <div style="display: flex; gap: 16px; font-size: 12px; color: #CBD5E1; align-items: center; flex-wrap: wrap;">
 <span>Curated by <strong>${featured.curator}</strong> (${featured.curatorRole})</span>
 <span>•</span>
 <span>${featured.duration}</span>
 <span>•</span>
 <span style="color: #6EE7B7; font-weight: 700;">${featured.crowdLevel} Crowd</span>
 </div>
 </div>
 
 <div style="padding: 24px;">
 <h3 style="font-size: 16px; font-weight: 800; color: var(--primary); margin-bottom: 16px;">Journey Timeline & Destination Stories</h3>
 <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
 ${featured.stops.map((stop, idx) => `
 <div style="background: #F8FAFC; border: 1px solid var(--border-subtle); border-radius: 6px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
 <div>
 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
 <span style="font-size: 10px; font-weight: 800; color: #2563EB; background: #DBEAFE; padding: 2px 6px; border-radius: 3px;">STOP ${idx + 1} • ${stop.timing}</span>
 </div>
 <h4 style="font-size: 14px; font-weight: 700; color: var(--primary); margin-bottom: 6px;">${stop.name}</h4>
 <p style="font-size: 12px; color: #475569; line-height: 1.4; margin-bottom: 8px;">${stop.context}</p>
 <div style="font-size: 11px; color: #0F766E; background: #CCFBF1; padding: 4px 6px; border-radius: 4px; margin-bottom: 8px;">
 <strong>Highlight:</strong> ${stop.highlight}
 </div>
 <div style="font-size: 11px; color: #92400E; background: #FEF3C7; padding: 4px 6px; border-radius: 4px;">
 <strong>Local Tip:</strong> ${stop.localTip}
 </div>
 </div>
 <div style="display: flex; gap: 6px; margin-top: 12px; padding-top: 10px; border-top: 1px solid #E2E8F0;">
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.openPlaceDetails('${stop.placeId}')">Details</button>
 <button type="button" class="btn btn-xs btn-primary" onclick="window.yatraApp.toggleItineraryPlace('${stop.placeId}')">+ Add to Trip</button>
 </div>
 </div>
 `).join('')}
 </div>

 <div style="margin-top: 20px; padding: 14px; background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
 <div>
 <strong style="font-size: 13px; color: #166534;">Experience this Curated Journey:</strong>
 <div style="font-size: 12px; color: #15803D;">Includes ${featured.stops.length} stops, verified safety corridors, and low congestion.</div>
 </div>
 <button type="button" class="btn btn-sm btn-primary" onclick="window.yatraApp.loadSafarnamaJourney('${featured.id}')">
 Load Full Journey into My Trip ➔
 </button>
 </div>
 </div>
 </div>

 <!-- 2. Explore Curated Journeys Grid -->
 <div style="margin-bottom: 32px;">
 <h3 style="font-size: 18px; font-weight: 800; color: var(--primary); margin-bottom: 14px;">Explore More Journeys</h3>
 <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
 ${exploreJourneys.map(j => `
 <div style="background: #FFFFFF; border: 1px solid var(--border-subtle); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
 <div style="height: 160px; background-image: url('${j.heroImage}'); background-size: cover; background-position: center; position: relative;">
 <span style="position: absolute; top: 8px; left: 8px; font-size: 9px; font-weight: 800; background: rgba(15,23,42,0.85); color: white; padding: 2px 6px; border-radius: 3px;">${j.duration}</span>
 </div>
 <div style="padding: 16px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
 <div>
 <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 4px;">${j.title}</h4>
 <p style="font-size: 12px; color: var(--text-muted); line-height: 1.4; margin-bottom: 10px;">${j.subtitle}</p>
 <div style="display: flex; gap: 8px; font-size: 11px; color: #64748B; margin-bottom: 12px;">
 <span>Style: <strong>${j.travelStyle}</strong></span>
 <span>•</span>
 <span>${j.stops.length} Landmarks</span>
 </div>
 </div>
 <div style="display: flex; gap: 8px;">
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.loadSafarnamaJourney('${j.id}')">Add Stops to Trip</button>
 <button type="button" class="btn btn-xs btn-primary" onclick="window.location.hash = '#map'; window.yatraApp.focusPlaceOnMap('${j.stops[0].placeId}');">View on Map ➔</button>
 </div>
 </div>
 </div>
 `).join('')}
 </div>
 </div>
 </div>
 `;
 }

 loadSafarnamaJourney(journeyId) {
 const journey = SAFARNAMA_JOURNEYS.find(j => j.id === journeyId);
 if (!journey) return;

 journey.stops.forEach(s => {
 if (!store.currentDayStops.some(stop => stop.place.id === s.placeId)) {
 store.addPlaceToItinerary(s.placeId, 'day1');
 }
 });

 this.showToast(`Loaded "${journey.title}" (${journey.stops.length} stops) into My Trips!`, 'success');
 window.location.hash = '#trips';
 }


 renderCategoryChips() {
 const container = document.getElementById('categoryChipsContainer');
 if (!container) return;

 container.innerHTML = CATEGORIES.map(cat => {
 const isSelected = store.state.selectedCategories.has(cat.id);
 return `
 <button type="button" class="cat-chip ${isSelected ? 'selected' : ''}" 
 onclick="window.yatraApp.toggleCategory('${cat.id}')">
 <span>${cat.icon}</span>
 <span>${cat.name}</span>
 </button>
 `;
 }).join('');
 }

 renderAlongTheWayChips() {
 const container = document.getElementById('alongTheWayChips');
 if (!container) return;

 const quickFilters = [
 { id: 'historical', name: 'UNESCO Forts', icon: '' },
 { id: 'hidden-gems', name: 'Hidden Spots', icon: '' },
 { id: 'food', name: 'Heritage Food', icon: '' },
 { id: 'shopping', name: 'Bazaars', icon: '' },
 { id: 'nature', name: 'Nature Trails', icon: '' },
 { id: 'cafes', name: 'Rooftops', icon: '' }
 ];

 container.innerHTML = quickFilters.map(q => {
 const active = store.state.alongTheWayCategory === q.id;
 return `
 <button type="button" class="along-chip ${active ? 'active' : ''}" onclick="window.yatraApp.setAlongTheWay('${q.id}')">
 <span>${q.icon}</span>
 <span>${q.name}</span>
 </button>
 `;
 }).join('');
 }

 setupSearch() {
 const input = document.getElementById('topUtilitySearchInput') || document.getElementById('heroDestinationSearch');
 if (!input) return;

 input.addEventListener('input', (e) => {
 const q = e.target.value;
 store.setSearchQuery(q);
 });

 input.addEventListener('keydown', (e) => {
 if (e.key === 'Enter') {
 const parsed = aiPlanner.parseNaturalQuery(input.value);
 if (parsed && parsed.message) {
 this.showToast(parsed.message, 'info');
 if (parsed.suggestedCategory) {
 store.toggleCategory(parsed.suggestedCategory);
 }
 if (parsed.filteredPlaceIds.length > 0) {
 mapEngine.focusPlace(parsed.filteredPlaceIds[0]);
 }
 }
 }
 });
 }

 switchMainView(viewName) {
 store.state.activeView = viewName;
 
 document.querySelectorAll('.bottom-nav-item, .sidebar-tab-pill').forEach(btn => {
 if (btn.dataset.view === viewName) {
 btn.classList.add('active');
 } else {
 btn.classList.remove('active');
 }
 });

 const panels = {
 itinerary: document.getElementById('itineraryPanel'),
 places: document.getElementById('placesPanel'),
 gems: document.getElementById('gemsPanel'),
 'safer-route': document.getElementById('saferRoutePanel'),
 weather: document.getElementById('weatherPanel'),
 documents: document.getElementById('documentsPanel'),
 profile: document.getElementById('profilePanel')
 };

 Object.entries(panels).forEach(([key, el]) => {
 if (!el) return;
 if (key === viewName) {
 el.classList.remove('hidden');
 } else {
 el.classList.add('hidden');
 }
 });

 const sidebar = document.getElementById('mainSidebar');
 if (sidebar) sidebar.classList.remove('collapsed');
 }

 toggleSidebar() {
 const sidebar = document.getElementById('mainSidebar');
 if (sidebar) sidebar.classList.toggle('collapsed');
 }

 planRouteTo(placeId) {
 this.closePlaceDetails();
 const place = store.getPlaceById(placeId);
 if (!place) return;

 store.planRouteTo(placeId);
 window.location.hash = '#map';
 setTimeout(() => {
 if (window.mapEngine && window.mapEngine.map) {
 window.mapEngine.renderDirectRouteTo(placeId);
 }
 }, 150);
 this.showToast(`Showing route to ${place.name.split('(')[0].trim()}`, 'success');
 }

 generatePresetPlan(presetType) {
 const destId = store.state.currentDestinationId;
 const presets = {
 express: {
 title: ' 1-Day Express Highlights',
 stops: ['hawa-mahal', 'city-palace', 'amber-fort', 'nahargarh-fort', 'lmb-restaurant']
 },
 heritage: {
 title: ' Royal Forts & Heritage',
 stops: ['amber-fort', 'panna-meena-kund', 'city-palace', 'nahargarh-fort']
 },
 sunset: {
 title: ' Sunset Viewpoints & Evening Chai',
 stops: ['tapri-central', 'jal-mahal', 'nahargarh-fort', 'bar-palladio']
 },
 food: {
 title: ' Authentic Rajasthani Food Crawl',
 stops: ['lmb-restaurant', 'johari-bazaar', 'masala-chowk', 'tapri-central']
 }
 };

 const choice = presets[presetType] || presets.express;

 if (!store.state.itineraries[destId]) {
 store.state.itineraries[destId] = { day1: [], day2: [], day3: [] };
 }

 store.state.itineraries[destId].day1 = choice.stops.map((id, idx) => ({
 placeId: id,
 time: ['09:00 AM', '11:30 AM', '02:30 PM', '05:30 PM', '07:30 PM'][idx] || 'Flexible',
 note: 'Verified Itinerary Preset'
 }));

 store.setActiveItineraryDay('day1');
 store.notify('itineraryUpdated');
 window.location.hash = '#trips';
 this.showToast(` ${choice.title} loaded into your itinerary!`, 'success');
 }

 toggleCategory(catId) {
 store.toggleCategory(catId);
 }

 setAlongTheWay(catId) {
 store.setAlongTheWayCategory(catId);
 this.renderAlongTheWayChips();
 }

 resetFilters() {
 store.clearCategories();
 store.setAlongTheWayCategory(null);
 store.setSearchQuery('');
 const input = document.getElementById('topUtilitySearchInput') || document.getElementById('heroDestinationSearch');
 if (input) input.value = '';
 this.renderAlongTheWayChips();
 }

 toggleItineraryPlace(placeId) {
 const destId = store.state.currentDestinationId;
 const day = store.state.activeItineraryDay;
 const stops = store.state.itineraries[destId]?.[day] || [];
 const idx = stops.findIndex(stop => stop.placeId === placeId);
 const inTrip = idx >= 0;
 if (inTrip) {
 store.removeItineraryStop(idx, day);
 this.showToast('Removed from itinerary', 'info');
 } else {
 store.addPlaceToItinerary(placeId, day);
 const added = store.state.itineraries[destId]?.[day]?.some(stop => stop.placeId === placeId);
 this.showToast(added ? 'Added to today\'s itinerary ' : 'Could not add this place to the itinerary', added ? 'success' : 'error');
 }
 }

 toggleSave(placeId) {
 store.requireAuth('save favorites', () => {
 store.toggleSavePlace(placeId);
 const saved = store.state.savedPlaceIds.has(placeId);
 this.showToast(saved ? 'Saved to favorites Saved' : 'Removed from favorites', 'info');
 });
 }

 toggleVisited(placeId) {
 store.requireAuth('log visited landmarks', () => {
 store.toggleVisitedPlace(placeId);
 const visited = store.state.visitedPlaceIds.has(placeId);
 if (visited) {
 this.showToast(` Visited! Exploration score reached ${store.explorationScore}/100`, 'success');
 } else {
 this.showToast('Unchecked from visited places', 'info');
 }
 });
 }

 focusPlaceOnMap(placeId) {
 window.location.hash = '#map';
 setTimeout(() => {
 mapEngine.focusPlace(placeId);
 }, 150);
 }

 setItineraryDay(day) {
 store.setActiveItineraryDay(day);
 }

 moveStop(fromIdx, toIdx) {
 store.moveItineraryStop(fromIdx, toIdx);
 }

 moveStopToDay(fromIdx, targetDay) {
 store.moveStopToDay(store.state.activeItineraryDay, fromIdx, targetDay);
 this.showToast(`Moved to ${targetDay.toUpperCase()}`, 'info');
 }

 removeItineraryStop(idx, day = store.state.activeItineraryDay) {
 store.removeItineraryStop(idx, day);
 this.showToast('Stop removed from itinerary', 'info');
 if (window.location.hash === '#itinerary-result') {
 this.renderItineraryResultView();
 }
 }

 replaceItineraryStop(idx, dayKey = store.state.activeItineraryDay) {
 const destId = store.state.currentDestinationId;
 const currentStops = store.state.itineraries[destId]?.[dayKey] || [];
 const currentStop = currentStops[idx];
 if (!currentStop) return;

 const currentPlace = PLACES.find(p => p.id === currentStop.placeId);
 const inPlanIds = new Set(currentStops.map(s => s.placeId));

 // Find alternative places in the same destination not already in plan
 const alternatives = PLACES.filter(p => p.destinationId === destId && !inPlanIds.has(p.id));
 if (alternatives.length === 0) {
 this.showToast('No alternative places available to swap', 'info');
 return;
 }

 // Pick top alternative matching category or rating
 const sameCat = alternatives.find(p => currentPlace && p.category === currentPlace.category);
 const replacement = sameCat || alternatives[0];

 store.replaceItineraryStop(idx, replacement.id, dayKey);
 this.showToast(`Swapped with ${replacement.name} `, 'success');

 if (window.location.hash === '#itinerary-result') {
 this.renderItineraryResultView();
 }
 }

 optimizeRoute() {
 store.optimizeDayRoute();
 this.showToast(' Route optimized for shortest travel time!', 'success');
 }

 setReviewFilter(filter, placeId) {
 reviewsManager.activeFilter = filter;
 reviewsManager.renderPlaceReviews(placeId, document.getElementById('modalReviewsContainer'));
 }

 upvoteReview(revId) {
 reviewsManager.upvote(revId);
 this.showToast('Voted review helpful! ', 'info');
 }

 openWriteReviewModal(placeId) {
 store.requireAuth('submit a review', () => {
 const title = prompt('Enter a short title for your review (e.g. Best morning sunrise spot):');
 if (!title) return;
 const text = prompt('Share your verified tips or experience for this place:');
 if (!text) return;
 const isLocal = confirm('Are you a local resident? Click OK for Local, Cancel for Traveler:');

 reviewsManager.addReview({
 placeId,
 author: store.state.userSession.name || 'Explorer',
 type: isLocal ? 'local' : 'tourist',
 badge: isLocal ? 'Jaipur Local' : 'Verified Traveler',
 rating: 5,
 date: 'Just now',
 avatar: store.state.userSession.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
 title,
 text,
 aspects: {
 positive: ['Authentic Experience', 'Architecture'],
 negative: []
 }
 });

 reviewsManager.renderPlaceReviews(placeId, document.getElementById('modalReviewsContainer'));
 this.showToast('Your review has been published! ', 'success');
 });
 }

 locateMe() {
 mapEngine.locateUser();
 this.showToast('Centered on current coordinates ', 'info');
 }

 toggleMapLayer() {
 const current = mapEngine.currentTileLayer;
 if (current === mapEngine.tileLayers.osm) {
 mapEngine.setBaseLayer('satellite');
 this.showToast('Switched to Satellite Imagery ', 'info');
 } else {
 mapEngine.setBaseLayer('osm');
 this.showToast('Switched to OpenStreetMap ', 'info');
 }
 }

 showToast(message, type = 'info') {
 const toast = document.createElement('div');
 toast.className = `yatra-toast toast-${type}`;
 toast.innerHTML = `<span>${message}</span>`;
 document.body.appendChild(toast);
 setTimeout(() => toast.classList.add('show'), 10);
 setTimeout(() => {
 toast.classList.remove('show');
 setTimeout(() => toast.remove(), 300);
 }, 3200);
 }
}

// Instantiate and bind singletons to window
window.saffarnamaApp = window.yatraApp = new YatraApp();
window.mapEngine = mapEngine;
window.itineraryManager = itineraryManager;
window.reelsManager = reelsManager;
window.aiPlanner = aiPlanner;
window.weatherManager = weatherManager;
window.documentsManager = documentsManager;
window.reviewsManager = reviewsManager;
window.gamificationManager = gamificationManager;
window.saferRouteManager = saferRouteManager;
window.wrappedManager = wrappedManager;
window.confetti = confetti;
window.saffarnamaStore = window.yatraStore = store;

// Execute initialization
if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', () => {
 window.saffarnamaApp.init();
 });
} else {
 window.yatraApp.init();
}
