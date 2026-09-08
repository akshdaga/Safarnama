// ==========================================================================
// JAIPUR TOURISM INTELLIGENCE PLATFORM - ITINERARY PLANNER ENGINE
// Multi-Day Spatial Route Management & Pacing Verification
// ==========================================================================

import { store } from './store.js';
import { PLACES } from './data.js';

export class ItineraryManager {
 constructor() {
 this.container = null;
 }

 init(containerId = 'itineraryPanel') {
 this.container = document.getElementById(containerId);
 this.render();

 store.subscribe((state, change) => {
 if (['itineraryUpdated', 'itineraryDay', 'destination'].includes(change)) {
 this.render();
 }
 });
 }

 completeTrip() {
 window.wrappedManager.open();
 }

 render() {
 if (!this.container) return;

 const stops = store.currentDayStops;
 const activeDay = store.state.activeItineraryDay;

 // Calculate approximate distance & travel time
 let totalDistKm = 0;
 let totalMinutes = 0;
 for (let i = 0; i < stops.length - 1; i++) {
 const p1 = stops[i].place.coordinates;
 const p2 = stops[i + 1].place.coordinates;
 const dist = this.haversineDistance(p1[0], p1[1], p2[0], p2[1]);
 totalDistKm += dist;
 totalMinutes += Math.round(dist * 6); // Approx 6 min per km driving in city
 }

 const distDisplay = totalDistKm > 0 ? `${totalDistKm.toFixed(1)} km` : '0 km';
 const hours = Math.floor(totalMinutes / 60);
 const mins = totalMinutes % 60;
 const timeDisplay = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;

 // Pacing advice
 let pacingBadge = '';
 if (stops.length > 5) {
 pacingBadge = `<div class="itinerary-pace-alert warning"> Day ${activeDay.replace('day', '')} has ${stops.length} places. Consider optimizing or redistributing.</div>`;
 } else if (stops.length >= 3) {
 pacingBadge = `<div class="itinerary-pace-alert success">✓ Well-balanced pace (${stops.length} stops). Adequate time for ASI sightseeing.</div>`;
 } else if (stops.length > 0) {
 pacingBadge = `<div class="itinerary-pace-alert success"> Light schedule (${stops.length} stops). Space available for nearby hidden gems.</div>`;
 }

 this.container.innerHTML = `
 <div class="itinerary-header">
 <!-- Trip Category Tabs (Upcoming | Current | Completed) -->
 <div style="display: flex; gap: 6px; margin-bottom: 12px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
 <button class="btn btn-xs btn-outline" onclick="window.yatraApp.showToast('No upcoming trips scheduled', 'info')">Upcoming (0)</button>
 <button class="btn btn-xs btn-primary">Current Trip (1)</button>
 <button class="btn btn-xs btn-outline" onclick="window.yatraApp.showToast('2 Completed Jaipur Expeditions in Archive', 'info')">Completed (2)</button>
 </div>

 <!-- Current Trip Overview Banner Card -->
 <div style="background: var(--bg-app); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 12px; margin-bottom: 12px;">
 <div style="display: flex; align-items: center; justify-content: space-between;">
 <div>
 <span style="font-size: 10px; font-weight: 800; color: var(--gov-blue); letter-spacing: 0.5px;">ACTIVE TRIP ITINERARY</span>
 <h3 style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: var(--primary);">JAIPUR • 2 DAYS</h3>
 </div>
 <span style="font-size: 11px; font-weight: 700; background: white; padding: 3px 8px; border-radius: 4px; border: 1px solid var(--border-subtle);">
 ${stops.length} Places • ${distDisplay}
 </span>
 </div>
 </div>

 <div class="itinerary-title-row">
 <div>
 <h4 class="itinerary-title">Daily Timeline & Route</h4>
 <p class="itinerary-subtitle">Optimized schedule for ${store.destination.name}</p>
 </div>
 <div class="itinerary-top-ctas">
 <button class="btn btn-xs btn-outline" onclick="window.yatraApp.openAiPlanner()" title="AI Trip Wizard">
 AI Assistant
 </button>
 <button class="btn btn-xs btn-primary" onclick="window.itineraryManager.completeTrip()" title="Complete Trip and view Wrapped summary">
 Complete
 </button>
 </div>
 </div>

 <div class="itinerary-day-tabs">
 <button class="day-tab ${activeDay === 'day1' ? 'active' : ''}" onclick="window.yatraApp.setItineraryDay('day1')">Day 1</button>
 <button class="day-tab ${activeDay === 'day2' ? 'active' : ''}" onclick="window.yatraApp.setItineraryDay('day2')">Day 2</button>
 <button class="day-tab ${activeDay === 'day3' ? 'active' : ''}" onclick="window.yatraApp.setItineraryDay('day3')">Day 3</button>
 </div>

 <div class="itinerary-metrics-bar">
 <div class="metric-item">
 <span class="metric-icon"></span>
 <span class="metric-val">${stops.length} Stops</span>
 </div>
 <div class="metric-item">
 <span class="metric-icon"></span>
 <span class="metric-val">${distDisplay}</span>
 </div>
 <div class="metric-item">
 <span class="metric-icon"></span>
 <span class="metric-val">${timeDisplay}</span>
 </div>
 <button class="btn btn-xs btn-outline optimize-btn" onclick="window.yatraApp.optimizeRoute()" title="Optimize route to minimize travel distance">
 Optimize
 </button>
 </div>

 ${pacingBadge}
 </div>

 <div class="itinerary-stops-list" id="itineraryStopsList">
 ${stops.length === 0 ? `
 <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px; background: white; border-radius: 6px;">
 <div style="font-size: 24px; margin-bottom: 6px;"></div>
 <h4 style="font-weight: 800; color: var(--secondary);">No stops added for this day yet</h4>
 <p style="margin-top: 4px;">Explore places from the map or recommendations and click "+ Add to Trip".</p>
 <button class="btn btn-sm btn-primary" style="margin-top: 10px;" onclick="window.location.hash = '#explore'">Browse Places</button>
 </div>
 ` : stops.map((stop, idx) => this.renderStopCard(stop, idx, stops.length)).join('')}
 </div>

 <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 12px;">
 <button class="btn btn-block btn-outline" onclick="window.location.hash = '#explore'">
 + Add Place to ${activeDay.toUpperCase()}
 </button>
 <button class="btn btn-block btn-primary" onclick="window.itineraryManager.completeTrip()">
 Complete Jaipur Trip & View Wrapped Summary ➔
 </button>
 </div>
 `;
 }

 renderStopCard(stop, idx, totalStops) {
 const { place } = stop;
 const isFirst = idx === 0;
 const isLast = idx === totalStops - 1;
 const isVisited = store.state.visitedPlaceIds.has(place.id);

 return `
 <div class="itinerary-stop-card" data-stop-index="${idx}">
 <div class="stop-timeline">
 <div class="stop-number">${idx + 1}</div>
 </div>

 <div class="stop-content">
 <div class="stop-thumb" style="background-image: url('${place.imageUrl}')" onclick="window.yatraApp.focusPlaceOnMap('${place.id}')"></div>

 <div class="stop-info">
 <div style="display: flex; align-items: center; justify-content: space-between;">
 <h4 class="stop-name" onclick="window.yatraApp.openPlaceDetails('${place.id}')">${place.name.split('(')[0].trim()}</h4>
 <button class="btn btn-xs ${isVisited ? 'btn-secondary' : 'btn-outline'}" onclick="window.yatraApp.toggleVisited('${place.id}')">
 ${isVisited ? '✓ Visited' : '○ Mark Visited'}
 </button>
 </div>
 
 <div class="stop-meta">
 <span> ${place.distanceFromCenter}</span>
 <span>•</span>
 <span> ${place.avgDuration}</span>
 <span>•</span>
 <span>★ ${place.rating}</span>
 </div>

 <div class="stop-note"> ${stop.note || place.whyRecommended || 'Key itinerary stop'}</div>

 <!-- Stop Action Buttons (View, Map, Replace, Remove) -->
 <div style="display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap;">
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.openPlaceDetails('${place.id}')">View</button>
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.focusPlaceOnMap('${place.id}')">Map</button>
 <button type="button" class="btn btn-xs btn-outline" onclick="window.yatraApp.replaceItineraryStop(${idx})" title="Swap stop with alternative">Replace</button>
 <button type="button" class="btn btn-xs btn-outline text-danger" onclick="window.yatraApp.removeItineraryStop(${idx})" title="Remove from itinerary">Remove</button>
 </div>
 </div>

 <div class="stop-actions">
 <button class="btn-icon-xs" onclick="window.yatraApp.moveStop(${idx}, ${idx - 1})" ${isFirst ? 'disabled' : ''} title="Move up">▲</button>
 <button class="btn-icon-xs" onclick="window.yatraApp.moveStop(${idx}, ${idx + 1})" ${isLast ? 'disabled' : ''} title="Move down">▼</button>
 </div>
 </div>
 </div>
 `;
 }

 haversineDistance(lat1, lon1, lat2, lon2) {
 const R = 6371; // km
 const dLat = (lat2 - lat1) * Math.PI / 180;
 const dLon = (lon2 - lon1) * Math.PI / 180;
 const a = 
 Math.sin(dLat/2) * Math.sin(dLat/2) +
 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
 Math.sin(dLon/2) * Math.sin(dLon/2);
 const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 return R * c;
 }
}

export const itineraryManager = new ItineraryManager();
window.itineraryManager = itineraryManager;
