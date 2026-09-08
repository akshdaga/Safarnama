// ==========================================================================
// JAIPUR TOURISM INTELLIGENCE PLATFORM - SAFER EXPLORATION ROUTE ENGINE
// Research-Backed GIS Safety Intelligence (SIH 2026 Model)
// Contextual Heuristic Breakdown & Segment-Level Scoring
// ==========================================================================

import { store } from './store.js';
import { SAFER_ROUTES } from './data.js';
import { mapEngine } from './map.js';

/**
 * Modular Safety Scoring Engine with 6-Factor Weighted Breakdown
 */
export function getRouteSafety(routeOption, context = {}) {
 const weights = {
 historicalRisk: 0.30,
 activityLevel: 0.20,
 emergencyProximity: 0.15,
 communityFeedback: 0.15,
 timeContext: 0.10,
 environmentalContext: 0.10
 };

 const factors = routeOption.factors || {
 historicalRisk: 75,
 activityLevel: 75,
 emergencyProximity: 75,
 communityFeedback: 75,
 timeContext: 75,
 environmentalContext: 75
 };

 let weightedTotal = 0;
 for (const [key, weight] of Object.entries(weights)) {
 const val = factors[key] || 70;
 weightedTotal += val * weight;
 }

 const score = Math.round(weightedTotal);

 let recommendation = 'Standard City Corridor';
 if (score >= 85) {
 recommendation = 'RECOMMENDED • Highly Illuminated & Monitored';
 } else if (score >= 75) {
 recommendation = 'Suitable for Daylight Transit';
 } else {
 recommendation = 'Caution: Quiet / Low-Lit Sections';
 }

 return {
 score,
 recommendation,
 breakdown: [
 { name: 'Historical Safety Data', weight: '30%', score: factors.historicalRisk, icon: '' },
 { name: 'Pedestrian & Activity Level', weight: '20%', score: factors.activityLevel, icon: '' },
 { name: 'Emergency Infrastructure Proximity', weight: '15%', score: factors.emergencyProximity, icon: '' },
 { name: 'Community Feedback Verification', weight: '15%', score: factors.communityFeedback, icon: '' },
 { name: 'Time-of-Day Context', weight: '10%', score: factors.timeContext, icon: '' },
 { name: 'Environmental & Road Status', weight: '10%', score: factors.environmentalContext, icon: '' }
 ],
 segments: routeOption.segments || [],
 reasons: routeOption.reasons || []
 };
}

export class SaferRouteManager {
 constructor() {
 this.container = null;
 this.activeTab = 'overview'; // 'overview' | 'routes' | 'emergency' | 'advisories' | 'accessibility'
 this.showFactorBreakdown = true;
 this.cameraAnalysisOpen = false;
 this.cameraProfile = 'woman';
 this.cameraTime = '10 AM';
 this.cameraRouteOptionId = null;
 }

 init(containerId = 'saferRoutePanel') {
 this.container = document.getElementById(containerId);
 this.render();

 store.subscribe((state, change) => {
 if (['saferRoute', 'destination', 'view', 'appView', 'communityFeedback', 'accessibility'].includes(change)) {
 this.render();
 }
 });
 }

 setTab(tabName) {
 this.activeTab = tabName;
 this.render();
 }

 selectRoute(routeId) {
 store.setSaferRoute(routeId);
 this.render();
 mapEngine.renderSaferRoutePolylines();
 }

 selectOption(optionId) {
 store.setSaferOption(optionId);
 this.render();
 mapEngine.renderSaferRoutePolylines();
 }

 toggleCameraAnalysis() {
 this.cameraAnalysisOpen = !this.cameraAnalysisOpen;
 this.render();
 }

 setCameraProfile(profile) {
 this.cameraProfile = profile;
 this.updateCameraRoute();
 }

 setCameraTime(time) {
 this.cameraTime = time;
 this.updateCameraRoute();
 }

 updateCameraRoute() {
 const route = store.activeSaferRoute;
 if (!route) return;
 const preferred = this.getCameraAnalysis(route).preferredOptionId;
 this.cameraRouteOptionId = preferred;
 store.setSaferOption(preferred);
 this.render();
 mapEngine.renderSaferRoutePolylines(true);
 }

 getCameraAnalysis(route = store.activeSaferRoute) {
 const night = ['8 PM', '10 PM'].includes(this.cameraTime);
 const lateNight = this.cameraTime === '10 PM';
 const profileData = {
  woman: { label: 'Girl / Woman', icon: '', priorities: 'Footfall + lighting + active public places', route: 'safer' },
  elderly: { label: 'Elderly Person', icon: '', priorities: 'Shorter sections + lighting + nearby help', route: 'safer' },
  wheelchair: { label: 'Wheelchair User', icon: '♿', priorities: 'Ramps + wider roads + accessible crossings', route: 'safer' },
  family: { label: 'Family / Couple', icon: '', priorities: 'Open shops + calm, well-connected corridors', route: 'safer' },
  general: { label: 'General User', icon: '', priorities: 'Balanced time, distance and activity', route: night ? 'safer' : 'faster' }
 }[this.cameraProfile] || null;
 const profile = profileData || { label: 'General User', icon: '', priorities: 'Balanced time, distance and activity', route: 'faster' };
 const preferredType = profile.route === 'safer' || night ? 'safer' : 'faster';
 const preferredOption = route.options.find(option => option.type === preferredType) || route.options[0];
 const baseScore = preferredOption?.safetyScore || 78;
 const score = Math.max(42, Math.min(96, baseScore + (lateNight ? -14 : this.cameraTime === '8 AM' ? 3 : 0) + (this.cameraProfile === 'wheelchair' ? 4 : 0)));
 const footfall = lateNight ? 'Low' : this.cameraTime === '1 PM' ? 'Moderate' : 'High';
 const visibility = lateNight ? 'Poor' : night ? 'Fair' : 'Good';
 const shops = lateNight ? 'Few open' : night ? 'Some open' : 'Most open';
 const people = lateNight ? 18 : this.cameraTime === '1 PM' ? 64 : 92;
 const status = score >= 80 ? 'Relatively Safe' : score >= 65 ? 'Use Caution' : 'Higher Risk';
 const factors = [
  { label: 'Footfall density', value: footfall, tone: footfall === 'Low' ? 'warn' : 'good' },
  { label: 'Lighting condition', value: visibility, tone: visibility === 'Poor' ? 'bad' : 'good' },
  { label: 'Open / closed shops', value: shops, tone: shops === 'Few open' ? 'warn' : 'good' },
  { label: 'Crowd presence', value: `${people} estimated people`, tone: people < 30 ? 'warn' : 'good' },
  { label: 'Road activity', value: lateNight ? 'Light traffic' : 'Active corridor', tone: 'good' },
  { label: 'Emergency points nearby', value: '3 verified points', tone: 'good' },
  { label: 'Reported incidents', value: lateNight ? '1 recent report' : 'No active alerts', tone: lateNight ? 'warn' : 'good' },
  { label: 'Wheelchair access', value: this.cameraProfile === 'wheelchair' ? 'Ramps preferred' : 'Route audited', tone: 'good' }
 ];
 return {
  profile,
  preferredOptionId: preferredOption?.id,
  score,
  status,
  footfall,
  visibility,
  shops,
  people,
  factors,
  reasons: lateNight
	? ['Low footfall after closing hours', 'Poorer visibility on the final section', 'AI route keeps closer to active roads and emergency points']
	: this.cameraProfile === 'wheelchair'
	 ? ['Wider arterial roads preferred', 'Ramp-accessible stops prioritized', 'Steep and stair-heavy sections avoided']
	 : ['High pedestrian activity', 'Well-lit road corridor', 'Nearby open establishments and emergency points']
 };
 }

 renderCameraAnalysisCard(route) {
 const analysis = this.getCameraAnalysis(route);
 const active = this.cameraAnalysisOpen;
 return `
 <section class="camera-safety-card ${active ? 'is-open' : ''}">
  <div class="camera-safety-card-header">
	<div class="camera-safety-title-wrap">
	 <div class="camera-feed-mini"><span></span><span></span><span></span></div>
	 <div><span class="camera-safety-kicker">SIMULATION MODE</span><h3>AI Camera Safety Analysis</h3><p>Anonymous environmental signals only. No face recognition or footage storage.</p></div>
	</div>
	<button type="button" class="btn btn-sm btn-primary" onclick="window.saferRouteManager.toggleCameraAnalysis()">${active ? 'Close Analysis' : 'Open Analysis'}</button>
  </div>
  ${active ? `
  <div class="camera-analysis-dashboard">
	<div class="camera-feed-panel">
	 <div class="camera-feed-top"><span>LIVE CAMERA SIMULATION</span><strong>● DEMO FEED</strong></div>
	 <div class="camera-visual"><div class="camera-grid"></div><div class="camera-road"></div><div class="camera-light light-one"></div><div class="camera-light light-two"></div><div class="camera-person person-one"></div><div class="camera-person person-two"></div><div class="camera-shop shop-one">OPEN</div><div class="camera-shop shop-two">OPEN</div><div class="camera-crosshair">+</div></div>
	 <div class="camera-feed-caption"><span>Johari Bazaar → Amer Road corridor</span><span>Today • ${this.cameraTime}</span></div>
	</div>
	<div class="camera-analysis-side">
	 <div class="camera-control-row"><label>Analyze for<select onchange="window.saferRouteManager.setCameraProfile(this.value)">${Object.entries({woman:'Girl / Woman',elderly:'Elderly Person',wheelchair:'Wheelchair User',family:'Family / Couple',general:'General User'}).map(([value, label]) => `<option value="${value}" ${this.cameraProfile === value ? 'selected' : ''}>${label}</option>`).join('')}</select></label><label>Time<select onchange="window.saferRouteManager.setCameraTime(this.value)">${['8 AM','10 AM','1 PM','5 PM','8 PM','10 PM'].map(time => `<option ${this.cameraTime === time ? 'selected' : ''}>${time}</option>`).join('')}</select></label></div>
	 <div class="camera-status-strip"><span class="camera-live-dot"></span><span>${analysis.profile.icon} ${analysis.profile.label}</span><strong>${analysis.status}</strong></div>
	 <div class="camera-score-row"><div><span>SAFETY SCORE</span><strong>${analysis.score}<small>/100</small></strong></div><div class="camera-score-ring" style="--score:${analysis.score}%"><span>${analysis.score}</span></div></div>
	 <div class="camera-metrics"><div><strong>${analysis.people}</strong><span>People est.</span></div><div><strong>${analysis.footfall}</strong><span>Footfall</span></div><div><strong>${analysis.visibility}</strong><span>Visibility</span></div><div><strong>${analysis.shops}</strong><span>Shops</span></div></div>
	 <div class="camera-priority"><strong>Route priorities</strong><span>${analysis.profile.priorities}</span></div>
	</div>
  </div>
  <div class="camera-factors-grid">${analysis.factors.map(factor => `<div class="camera-factor ${factor.tone}"><span>${factor.tone === 'good' ? '✓' : '⚠'}</span><div><strong>${factor.label}</strong><small>${factor.value}</small></div></div>`).join('')}</div>
  <div class="camera-route-comparison"><div class="camera-comparison-heading"><div><span class="camera-safety-kicker">ROUTE DECISION</span><h4>Standard Route <em>vs</em> AI Suggested Safer Route</h4></div><span class="camera-route-badge">AI Suggested Safer Route</span></div><div class="camera-comparison-grid"><div><strong>Standard Route</strong><span>${route.options.find(option => option.type === 'faster')?.distanceText || '6.8 km'} • ${route.options.find(option => option.type === 'faster')?.estimatedMinutes || 22} min</span><span>Score ${route.options.find(option => option.type === 'faster')?.safetyScore || 78} • Moderate footfall</span></div><div class="recommended"><strong>AI Safety Route</strong><span>${analysis.preferredOptionId === route.options.find(option => option.type === 'faster')?.id ? route.options.find(option => option.type === 'faster')?.distanceText : route.options.find(option => option.type === 'safer')?.distanceText} • ${analysis.preferredOptionId === route.options.find(option => option.type === 'faster')?.id ? route.options.find(option => option.type === 'faster')?.estimatedMinutes : route.options.find(option => option.type === 'safer')?.estimatedMinutes} min</span><span>Score ${analysis.score} • ${analysis.footfall} footfall • ${analysis.visibility} lighting</span></div></div></div>
  <div class="camera-why"><strong>Why this score?</strong>${analysis.reasons.map(reason => `<span>${reason.includes('Poorer') || reason.includes('Low') ? '⚠' : '✓'} ${reason}</span>`).join('')}<button type="button" class="btn btn-sm btn-primary camera-map-action" onclick="window.saferRouteManager.previewOnMap()">Show AI Route on Map</button></div>
  <p class="camera-privacy-note">Camera-based safety analysis uses simulated environmental data in this prototype. In a real deployment, authorized CCTV/public-camera APIs and privacy-compliant computer vision systems could provide real-time inputs. No faces are identified and no camera footage is stored.</p>
  ` : ''}
 </section>`;
 }

 toggleFactorBreakdown() {
 this.showFactorBreakdown = !this.showFactorBreakdown;
 this.render();
 }

 previewOnMap() {
 window.location.hash = '#map';
 setTimeout(() => {
	if (mapEngine.map) {
	 mapEngine.renderSaferRoutePolylines(true);
	 mapEngine.map.invalidateSize();
	}
 }, 150);

 setTimeout(() => {
	if (mapEngine.map && store.activeSaferRoute) {
	 mapEngine.renderSaferRoutePolylines(true);
	}
 }, 500);
 }

 addToTrip() {
 store.addSaferRouteToItinerary();
 store.showToast(` ${store.activeSaferRoute?.title || 'Route'} added to your active trip with Safety-Aware waypoints!`, 'success');
 }

 openFeedbackModal() {
 window.yatraApp.openFeedbackModal(store.state.activeSaferRouteId, store.state.activeSaferOptionId);
 }

 shareTrip() {
 const route = store.activeSaferRoute;
 const shareText = `Traveling on Jaipur Safe Heritage Corridor: ${route?.title || 'City Center to Forts'}. Live safety status active on Safarnama Public Platform.`;
 if (navigator.clipboard) {
 navigator.clipboard.writeText(shareText);
 store.showToast('Safety trip tracking link copied to clipboard!', 'success');
 } else {
 prompt('Copy Safety Tracking Link:', shareText);
 }
 }

 render() {
 if (!this.container) return;

 const routes = SAFER_ROUTES.filter(r => r.destinationId === store.state.currentDestinationId);
 const activeRoute = store.activeSaferRoute || routes[0];
 const activeOption = store.activeSaferOption;
 const policeList = store.policeStations;
 const hospitalsList = store.hospitals;
 const advisories = store.advisories;

 this.container.innerHTML = `
 <div class="safety-module-container">
 <!-- Safety Header Banner -->
 <div class="safety-hero-card">
 <div class="shc-badge-row">
 <span class="badge-gov-shield"> Rajasthan State Public Safety & Tourist Security</span>
 <span class="badge-sih">SIH 2026 Model</span>
 </div>
 <h2 class="shc-title">Travel Safety & Women Security Intelligence</h2>
 <p class="shc-sub">
 Contextual route heuristics, 24x7 verified emergency desks, civic safety scores, and transparent accessibility auditing across Jaipur.
 </p>

 <!-- Quick SOS Bar -->
 <div class="sos-quick-dial-bar">
 <a href="tel:112" class="sos-dial-chip primary">
 <span class="sd-icon"></span>
 <div>
 <strong>112</strong>
 <small>National Emergency</small>
 </div>
 </a>
 <a href="tel:1090" class="sos-dial-chip women">
 <span class="sd-icon"></span>
 <div>
 <strong>1090</strong>
 <small>Women Helpline</small>
 </div>
 </a>
 <a href="tel:1363" class="sos-dial-chip tourist">
 <span class="sd-icon">ℹ️</span>
 <div>
 <strong>1363</strong>
 <small>Tourist Support</small>
 </div>
 </a>
 <a href="tel:108" class="sos-dial-chip ambulance">
 <span class="sd-icon"></span>
 <div>
 <strong>108</strong>
 <small>Ambulance</small>
 </div>
 </a>
 </div>
 </div>

 <!-- 5-Tab Navigation Dock -->
 ${this.renderCameraAnalysisCard(activeRoute)}
 <div class="safety-tabs-dock">
 <button class="safety-tab-btn ${this.activeTab === 'overview' ? 'active' : ''}" onclick="window.saferRouteManager.setTab('overview')">
 <span></span> Overview & Index
 </button>
 <button class="safety-tab-btn ${this.activeTab === 'routes' ? 'active' : ''}" onclick="window.saferRouteManager.setTab('routes')">
 <span></span> Safe Routes (${routes.length})
 </button>
 <button class="safety-tab-btn ${this.activeTab === 'emergency' ? 'active' : ''}" onclick="window.saferRouteManager.setTab('emergency')">
 <span></span> Nearby Help (${policeList.length + hospitalsList.length})
 </button>
 <button class="safety-tab-btn ${this.activeTab === 'advisories' ? 'active' : ''}" onclick="window.saferRouteManager.setTab('advisories')">
 <span></span> Govt Advisories (${advisories.length})
 </button>
 </div>

 <!-- TAB CONTENT AREA -->
 <div class="safety-tab-body">
 ${this.renderActiveTabContent(activeRoute, activeOption, policeList, hospitalsList, advisories, routes)}
 </div>
 </div>
 `;
 }

 renderActiveTabContent(activeRoute, activeOption, policeList, hospitalsList, advisories, routes) {
 if (this.activeTab === 'overview') {
 return `
 <div class="safety-overview-grid">
 <div class="safety-kpi-card">
 <div class="sk-header">
 <span class="sk-label">Jaipur Heritage Safety Index</span>
 <span class="sk-badge green">High Security</span>
 </div>
 <div class="sk-score">88<small>/100</small></div>
 <p class="sk-desc">Continuous municipal LED street lighting, 24x7 tourist PCR vans, and high daytime footfall across Old City corridors.</p>
 </div>

 <div class="safety-kpi-card">
 <div class="sk-header">
 <span class="sk-label">Women Solo Travel Rating</span>
 <span class="sk-badge green">Verified Safe</span>
 </div>
 <div class="sk-score">91<small>/100</small></div>
 <p class="sk-desc">Dedicated Pink City Women Police Station at Kotwali, all-women patrol units, and safe transit corridors.</p>
 </div>

 <div class="safety-kpi-card">
 <div class="sk-header">
 <span class="sk-label">Emergency Response Time</span>
 <span class="sk-badge blue">Sub-7 Mins</span>
 </div>
 <div class="sk-score">6.4<small>min avg</small></div>
 <p class="sk-desc">Direct police booth connectivity at Badi Chaupar, Amer Fort, and Jaipur Junction with GPS auto-dispatch.</p>
 </div>
 </div>

 <div class="safety-features-section">
 <h4 class="sfs-title"> Public Safety Infrastructure Highlights</h4>
 <div class="sfs-cards-grid">
 <div class="sfs-item">
 <span class="sfs-icon"></span>
 <div>
 <strong>Abhay Command & Control Center</strong>
 <p>3,200+ Smart City AI-enabled surveillance cameras actively monitoring heritage corridors.</p>
 </div>
 </div>
 <div class="sfs-item">
 <span class="sfs-icon"></span>
 <div>
 <strong>Pink Patrol Vehicles</strong>
 <p>Specially designated female officer PCR units stationed near major bazaars and stepwells.</p>
 </div>
 </div>
 <div class="sfs-item">
 <span class="sfs-icon"></span>
 <div>
 <strong>QR Coded Guide Verification</strong>
 <p>Biometric guide verification preventing touting and tourist overcharging.</p>
 </div>
 </div>
 <div class="sfs-item">
 <span class="sfs-icon"></span>
 <div>
 <strong>Illuminated Night Corridors</strong>
 <p>Smart LED streetlights synchronized with solar grids on Amer Road & Walled City lanes.</p>
 </div>
 </div>
 </div>
 </div>

 <!-- Dedicated Women Safety High-Value Action Module -->
 <div class="women-safety-action-module" style="background: linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%); border: 1px solid #FECDD3; border-radius: 8px; padding: 16px; margin: 16px 0;">
 <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
 <div>
 <span style="font-size: 10px; font-weight: 800; background: #E11D48; color: white; padding: 2px 7px; border-radius: 4px; text-transform: uppercase;">WOMEN SAFETY INTELLIGENCE</span>
 <h3 style="font-size: 16px; font-weight: 800; color: #881337; margin-top: 4px;">Rajasthan Pink Corridor & Safe Travel Desk</h3>
 </div>
 <span style="font-size: 11px; font-weight: 700; color: #9F1239;">24x7 Active Patrol</span>
 </div>
 <p style="font-size: 12px; color: #9F1239; line-height: 1.4; margin-bottom: 12px;">
 Direct connectivity to Kotwali Women Police Station, Pink PCR vans, emergency 1090 helpline, and illuminated pedestrian pathways.
 </p>
 
 <!-- 5 High-Value Action CTAs -->
 <div style="display: flex; flex-wrap: wrap; gap: 8px;">
 <button type="button" class="btn btn-sm btn-primary" onclick="window.saferRouteManager.setTab('routes'); window.saferRouteManager.previewOnMap();">
 Find Safer Route ➔
 </button>
 <button type="button" class="btn btn-sm btn-outline" onclick="window.saferRouteManager.setTab('emergency');">
 Nearby Police Desks
 </button>
 <a href="tel:1090" class="btn btn-sm btn-outline" style="color: #E11D48; border-color: #FDA4AF;">
 SOS Emergency 1090
 </a>
 <button type="button" class="btn btn-sm btn-secondary" onclick="window.saferRouteManager.shareTrip();">
 Share Trip Link
 </button>
 ${store.state.safetyTracking?.active ? `
 <button type="button" class="btn btn-sm btn-danger" onclick="store.stopSafetyTracking(); window.saferRouteManager.render();">
 Stop Safety Tracking
 </button>
 ` : `
 <button type="button" class="btn btn-sm btn-success" onclick="store.startSafetyTracking(); window.saferRouteManager.render();">
 Start Safety Tracking
 </button>
 `}
 </div>

 <!-- Live Safety Tracking Demo Banner (if active) -->
 ${store.state.safetyTracking?.active ? `
 <div style="margin-top: 14px; background: white; border: 1px solid #FDA4AF; border-radius: 6px; padding: 12px;">
 <div style="display: flex; justify-content: space-between; align-items: center;">
 <div style="display: flex; align-items: center; gap: 8px;">
 <span style="width: 10px; height: 10px; border-radius: 50%; background: #10B981; display: inline-block;"></span>
 <strong style="font-size: 13px; color: #881337;">Safety Tracking Active: ${store.state.safetyTracking.destinationName}</strong>
 </div>
 <span style="font-size: 12px; font-weight: 700; color: #475569;">ETA: ${store.state.safetyTracking.etaMinutes} mins</span>
 </div>
 <div style="width: 100%; height: 6px; background: #F1F5F9; border-radius: 3px; margin: 8px 0; overflow: hidden;">
 <div style="width: ${store.state.safetyTracking.progressPct}%; height: 100%; background: #10B981; transition: width 0.3s ease;"></div>
 </div>
 <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-muted);">
 <span>Status: ${store.state.safetyTracking.lastUpdate}</span>
 <button type="button" class="btn-link-xs" onclick="store.triggerTrackingDelayDemo(); window.saferRouteManager.render();" style="color: #D97706;">
 Simulate Delay Check ➔
 </button>
 </div>
 ${store.state.safetyTracking.delayDetected ? `
 <div style="margin-top: 8px; background: #FEF3C7; border: 1px solid #FCD34D; border-radius: 4px; padding: 8px; display: flex; justify-content: space-between; align-items: center;">
 <div>
 <strong style="font-size: 11px; color: #92400E;">Trip Delay Detected (>15 min stoppage)</strong>
 <div style="font-size: 10px; color: #78350F;">Automated check-in prompt sent to emergency contacts.</div>
 </div>
 <div style="display: flex; gap: 6px;">
 <a href="tel:112" class="btn btn-xs btn-primary">Contact 112</a>
 <button class="btn btn-xs btn-outline" onclick="window.saferRouteManager.shareTrip()">Share Location</button>
 </div>
 </div>
 ` : ''}
 </div>
 ` : ''}
 </div>
 `;
 }

 if (this.activeTab === 'routes') {
 const safetyAnalysis = getRouteSafety(activeOption);
 const corridorFeedback = store.state.communityFeedback.filter(fb => fb.routeId === activeRoute.id);

 return `
 <div class="sr-routes-section">
 <!-- Corridor Selector -->
 <div class="sr-routes-selector">
 <label class="sr-section-label">Select Demonstration Corridor:</label>
 <div class="sr-route-pills">
 ${routes.map(r => `
 <button class="sr-route-tab ${r.id === activeRoute.id ? 'active' : ''}" 
 onclick="window.saferRouteManager.selectRoute('${r.id}')">
 <span></span>
 <span>${r.title}</span>
 </button>
 `).join('')}
 </div>
 </div>

 <!-- Corridor Endpoints -->
 <div class="sr-endpoints-card">
 <div class="sr-endpoint">
 <span class="sr-dot origin"></span>
 <div>
 <span class="sr-ep-label">ORIGIN</span>
 <strong class="sr-ep-val">${activeRoute.origin.name}</strong>
 </div>
 </div>
 <div class="sr-endpoint-arrow">➔</div>
 <div class="sr-endpoint">
 <span class="sr-dot dest"></span>
 <div>
 <span class="sr-ep-label">DESTINATION</span>
 <strong class="sr-ep-val">${activeRoute.destination.name}</strong>
 </div>
 </div>
 </div>

 <!-- Route Options -->
 <div class="sr-options-grid">
 ${activeRoute.options.map(opt => {
 const isSelected = opt.id === activeOption.id;
 const isSafer = opt.type === 'safer';
 const optAnalysis = getRouteSafety(opt);

 return `
 <div class="sr-option-card ${isSelected ? 'selected' : ''}"
 onclick="window.saferRouteManager.selectOption('${opt.id}')">
 <div class="sr-opt-header">
 <div>
 <span class="sr-opt-tag" style="background: ${isSafer ? '#ECFDF5; color: #065F46; border: 1px solid #A7F3D0;' : '#FEF3C7; color: #92400E; border: 1px solid #FDE68A;'}">
 ${opt.tag || opt.code}
 </span>
 <h4 class="sr-opt-title">${opt.label}</h4>
 </div>
 <div class="sr-score-badge ${optAnalysis.score >= 80 ? 'score-high' : optAnalysis.score >= 70 ? 'score-med' : 'score-low'}">
 <span class="score-num">${optAnalysis.score}</span>
 <span class="score-lbl">Safety Score</span>
 </div>
 </div>

 <div class="sr-opt-metrics-row">
 <div class="sr-metric">
 <span class="sr-metric-icon"></span>
 <div>
 <span class="sr-m-val">${opt.distanceText}</span>
 <span class="sr-m-lbl">Distance</span>
 </div>
 </div>
 <div class="sr-metric">
 <span class="sr-metric-icon"></span>
 <div>
 <span class="sr-m-val">${opt.estimatedMinutes} min</span>
 <span class="sr-m-lbl">Travel Time</span>
 </div>
 </div>
 <div class="sr-metric">
 <span class="sr-metric-icon"></span>
 <div>
 <span class="sr-m-val text-success">${opt.illuminationScore}</span>
 <span class="sr-m-lbl">Illumination</span>
 </div>
 </div>
 </div>

 <!-- Key Reasons -->
 <div class="sr-reasons-list">
 ${(opt.reasons || []).map(r => `
 <div class="sr-reason-item">
 <span>✓</span>
 <span>${r}</span>
 </div>
 `).join('')}
 </div>
 </div>
 `;
 }).join('')}
 </div>

 <!-- Factor Breakdown -->
 <div class="sr-factor-breakdown-card">
 <div class="sfb-header" onclick="window.saferRouteManager.toggleFactorBreakdown()">
 <div class="sfb-title-wrap">
 <span class="sfb-icon"></span>
 <div>
 <strong>Safety Score Breakdown (${activeOption.label})</strong>
 <span class="sfb-subtitle">Transparent 6-Factor Weighted Attribution</span>
 </div>
 </div>
 <button class="btn-link-xs">${this.showFactorBreakdown ? '▲ Hide' : '▼ View Details'}</button>
 </div>

 ${this.showFactorBreakdown ? `
 <div class="sfb-body">
 <div class="sfb-bars-grid">
 ${safetyAnalysis.breakdown.map(factor => `
 <div class="sfb-factor-item">
 <div class="sfb-factor-label-row">
 <span>${factor.icon} ${factor.name} <small class="text-muted">(${factor.weight})</small></span>
 <strong class="${factor.score >= 80 ? 'text-success' : factor.score >= 70 ? 'text-warning' : 'text-danger'}">${factor.score}/100</strong>
 </div>
 <div class="sfb-progress-bar">
 <div class="sfb-progress-fill ${factor.score >= 80 ? 'fill-green' : factor.score >= 70 ? 'fill-amber' : 'fill-red'}" 
 style="width: ${factor.score}%"></div>
 </div>
 </div>
 `).join('')}
 </div>
 </div>
 ` : ''}
 </div>

 <!-- Action CTAs -->
 <div class="sr-actions-bar">
 <button class="btn btn-primary" onclick="window.saferRouteManager.previewOnMap()">
 View Route on Map
 </button>
 <button class="btn btn-outline" onclick="window.saferRouteManager.addToTrip()">
 + Add Route to Trip
 </button>
 </div>
 </div>
 `;
 }

 if (this.activeTab === 'emergency') {
 return `
 <div class="emergency-directory-grid">
 <!-- Tourist Police Stations -->
 <div class="em-section">
 <h4 class="em-title"> Tourist Police Desks & Assistance Booths</h4>
 <div class="em-cards-list">
 ${policeList.map(police => `
 <div class="em-card">
 <div class="em-card-header">
 <div>
 <h5 class="em-name">${police.name}</h5>
 <span class="em-loc"> ${police.location}</span>
 </div>
 <span class="badge-24x7">24x7 Active</span>
 </div>
 <div class="em-contact-row">
 <span> Tel: <strong>${police.phone}</strong></span>
 <span> Helpline: <strong>${police.emergencyHelpline}</strong></span>
 </div>
 <div class="em-features">
 ${police.features.map(f => `<span class="em-pill">✓ ${f}</span>`).join('')}
 </div>
 <div class="em-card-actions">
 <a href="tel:${police.phone.replace(/[^0-9]/g, '')}" class="btn btn-sm btn-primary"> Call Desk</a>
 <button class="btn btn-sm btn-outline" onclick="window.yatraApp.routeToEmergency([${police.coordinates[0]}, ${police.coordinates[1]}])">Navigate</button>
 </div>
 </div>
 `).join('')}
 </div>
 </div>

 <!-- Hospitals & Trauma Centers -->
 <div class="em-section">
 <h4 class="em-title"> 24x7 Emergency Hospitals & Trauma Centers</h4>
 <div class="em-cards-list">
 ${hospitalsList.map(hosp => `
 <div class="em-card">
 <div class="em-card-header">
 <div>
 <h5 class="em-name">${hosp.name}</h5>
 <span class="em-loc"> ${hosp.location} (${hosp.distanceFromCenter})</span>
 </div>
 <span class="badge-24x7">Emergency Open</span>
 </div>
 <div class="em-contact-row">
 <span> Hospital: <strong>${hosp.phone}</strong></span>
 <span> Ambulance: <strong>${hosp.emergencyAmbulance}</strong></span>
 </div>
 <div class="em-features">
 ${hosp.facilities.map(f => `<span class="em-pill">✓ ${f}</span>`).join('')}
 </div>
 <div class="em-card-actions">
 <a href="tel:${hosp.phone.replace(/[^0-9]/g, '')}" class="btn btn-sm btn-primary"> Emergency Call</a>
 <button class="btn btn-sm btn-outline" onclick="window.yatraApp.routeToEmergency([${hosp.coordinates[0]}, ${hosp.coordinates[1]}])">Navigate</button>
 </div>
 </div>
 `).join('')}
 </div>
 </div>
 </div>
 `;
 }

 if (this.activeTab === 'advisories') {
 return `
 <div class="advisories-list-grid">
 ${advisories.map(adv => `
 <div class="adv-card severity-${adv.severity.toLowerCase()}">
 <div class="adv-header">
 <span class="adv-tag">${adv.severity} Priority</span>
 <span class="adv-auth"> ${adv.authority}</span>
 </div>
 <h4 class="adv-title">${adv.title}</h4>
 <p class="adv-summary">${adv.summary}</p>
 <div class="adv-meta">
 <span>Updated: ${adv.updatedAt}</span>
 <span>Validity: ${adv.validUntil}</span>
 </div>
 </div>
 `).join('')}
 </div>
 `;
 }

 if (this.activeTab === 'accessibility') {
 const filters = store.state.accessibilityFilters;
 return `
 <div class="accessibility-page-container">
 <div class="acc-header-box">
 <h4 class="acc-title"> Accessible Tourism & Inclusive Exploration</h4>
 <p class="acc-desc">
 Jaipur Tourism is committed to universal accessibility under the Accessible India (Sugamya Bharat) Campaign. Filter monuments with verified step-free access, ramps, braille audio guides, and wheelchair parking.
 </p>
 </div>

 <!-- Interactive Filters -->
 <div class="acc-filters-dock">
 <label class="acc-filter-toggle">
 <input type="checkbox" ${filters.wheelchairOnly ? 'checked' : ''} onchange="window.store.setAccessibilityFilter('wheelchairOnly', this.checked)">
 <span>Wheelchair Accessible Only</span>
 </label>
 <label class="acc-filter-toggle">
 <input type="checkbox" ${filters.elderlyFriendly ? 'checked' : ''} onchange="window.store.setAccessibilityFilter('elderlyFriendly', this.checked)">
 <span>Elderly & Low-Step Friendly</span>
 </label>
 <label class="acc-filter-toggle">
 <input type="checkbox" ${filters.audioGuides ? 'checked' : ''} onchange="window.store.setAccessibilityFilter('audioGuides', this.checked)">
 <span>Audio Guide & Tactile Support</span>
 </label>
 </div>

 <!-- Verified Accessible Monuments List -->
 <div class="acc-monuments-grid">
 <div class="acc-card">
 <h5>Albert Hall Museum</h5>
 <p>✓ 100% Step-free ground floor entry with gentle incline ramps and free loaner wheelchairs.</p>
 <span class="acc-badge">Full Access</span>
 </div>
 <div class="acc-card">
 <h5>The City Palace Courtyards</h5>
 <p>✓ Accessible ramps connecting Mubarak Mahal to Pritam Niwas Chowk. Battery golf carts available.</p>
 <span class="acc-badge">Full Access</span>
 </div>
 <div class="acc-card">
 <h5>Jantar Mantar Observatory</h5>
 <p>✓ Flat paved stone pathways between major astronomical instruments and shaded rest gazebos.</p>
 <span class="acc-badge">Full Access</span>
 </div>
 <div class="acc-card">
 <h5>Maharani Ki Chhatri (Under-Discovered)</h5>
 <p>✓ Paved garden walkway access to cenotaph pavilions with low barrier entry.</p>
 <span class="acc-badge">Partial Access</span>
 </div>
 </div>
 </div>
 `;
 }

 return '';
 }
}

export const saferRouteManager = new SaferRouteManager();
window.saferRouteManager = saferRouteManager;

