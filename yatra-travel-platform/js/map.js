// Rajasthan Tourism GIS & Spatial Navigation Map Engine
import { store } from './store.js';
import { CATEGORIES } from './data.js';

class YatraMap {
 constructor() {
 this.map = null;
 this.markersLayer = null;
 this.routeLayer = null;
 this.pressureLayer = null;
 this.opportunityLayer = null;
 this.underDiscoveredLayer = null;
 this.emergencyLayer = null;
 this.tileLayers = {};
 this.currentTileLayer = null;
 this.placeMarkers = new Map();
 this.selectedPlaceId = null;
 }

 init(containerId = 'map') {
 if (typeof L === 'undefined') {
 console.warn('Leaflet library L is not yet loaded; map will retry once available.');
 const el = document.getElementById(containerId);
 if (el) {
 el.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#64748B;font-size:14px;font-family:var(--font-sans);">Loading Official Spatial Map...</div>';
 }
 return;
 }

 const savedState = store.state.mapCache || {};
 const defaultCenter = savedState.center || store.destination.coordinates;
 const defaultZoom = savedState.zoom || store.destination.zoom || 13;

 // Initialize Leaflet Map
 this.map = L.map(containerId, {
 center: defaultCenter,
 zoom: defaultZoom,
 zoomControl: false // Custom controls positioned cleanly
 });

 // Clean Tile Layers (OpenStreetMap Default & Satellite Imagery)
 this.tileLayers = {
 osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '&copy; OpenStreetMap contributors | Rajasthan Tourism GIS',
 maxZoom: 19
 }),
 voyager: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
 attribution: '&copy; OpenStreetMap &copy; CARTO',
 subdomains: 'abcd',
 maxZoom: 20
 }),
 satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
 attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
 maxZoom: 18
 })
 };

 // Use the public OSM layer by default; it does not require an API key.
 this.currentTileLayer = this.tileLayers.osm;
 this.currentTileLayer.addTo(this.map);

 this.pressureLayer = L.layerGroup().addTo(this.map);
 this.opportunityLayer = L.layerGroup().addTo(this.map);
 this.underDiscoveredLayer = L.layerGroup().addTo(this.map);
 this.emergencyLayer = L.layerGroup().addTo(this.map);
 this.routeLayer = L.layerGroup().addTo(this.map);
 this.markersLayer = L.layerGroup().addTo(this.map);

 // Track map movement to preserve user spatial state
 this.map.on('moveend', () => {
 const center = this.map.getCenter();
 const zoom = this.map.getZoom();
 store.updateMapCache([center.lat, center.lng], zoom, this.selectedPlaceId);
 });

 this.renderAllLayers();
 this.renderItineraryRoute();

 // Subscribe to store changes
 store.subscribe((state, change) => {
 if (change === 'destination') {
 const d = store.destination;
 this.map.flyTo(d.coordinates, d.zoom, { duration: 1.0 });
 this.renderAllLayers();
 this.renderItineraryRoute();
 } else if (change === 'categories' || change === 'search' || change === 'alongTheWay' || change === 'accessibility') {
 this.renderMarkers();
 } else if (change === 'mapLayers' || change === 'pressureSimulation') {
 this.renderAllLayers();
 } else if (change === 'itineraryUpdated' || change === 'itineraryDay') {
 this.renderMarkers();
 this.renderItineraryRoute();
 } else if (change === 'mapFollow' && state.mapFollowPlace) {
 this.focusPlace(state.mapFollowPlace);
 }
 });
 }

 renderAllLayers() {
 this.renderMarkers();
 this.renderPressureZones();
 this.underDiscoveredLayer.clearLayers();
 this.emergencyLayer.clearLayers();
 }

 setBaseLayer(name) {
 if (this.tileLayers[name] && this.currentTileLayer !== this.tileLayers[name]) {
 this.map.removeLayer(this.currentTileLayer);
 this.currentTileLayer = this.tileLayers[name];
 this.currentTileLayer.addTo(this.map);
 }
 }

 renderPressureZones() {
 this.pressureLayer.clearLayers();
 if (!store.state.activeMapLayers.tourismPressure) return;

 const zones = store.pressureZones;
 const zoneCoords = {
 'zone-walled-city': { center: [26.9239, 75.8267], radius: 1100, color: '#DC2626' },
 'zone-amer-hills': { center: [26.9855, 75.8507], radius: 1400, color: '#DC2626' },
 'zone-central-museums': { center: [26.9115, 75.8190], radius: 900, color: '#3B82F6' },
 'zone-bagru-corridor': { center: [26.8123, 75.5489], radius: 2500, color: '#10B981' },
 'zone-sambhar-wetland': { center: [26.9056, 75.1989], radius: 4000, color: '#059669' }
 };

 zones.forEach(zone => {
 const geo = zoneCoords[zone.id];
 if (!geo) return;

 const fillColor = zone.utilizationPercent >= 80 ? '#EF4444' : zone.utilizationPercent <= 30 ? '#10B981' : '#3B82F6';
 
 const circle = L.circle(geo.center, {
 radius: geo.radius,
 color: fillColor,
 weight: 2,
 opacity: 0.8,
 fillColor: fillColor,
 fillOpacity: 0.15,
 dashArray: zone.utilizationPercent <= 30 ? '4, 4' : null
 });

 circle.bindTooltip(`
 <div style="font-family:var(--font-sans); font-size:12px; line-height:1.4;">
 <strong>${zone.name}</strong><br/>
 <span>Load: ${zone.currentLoad.toLocaleString()} / ${zone.carryingCapacity.toLocaleString()} (${zone.utilizationPercent}%)</span><br/>
 <span style="color:${fillColor}; font-weight:600;">● ${zone.status}</span>
 </div>
 `, { sticky: true, className: 'gov-spatial-tooltip' });

 this.pressureLayer.addLayer(circle);
 });
 }

 renderUnderDiscoveredDestinations() {
 this.underDiscoveredLayer.clearLayers();
 if (!store.state.activeMapLayers.underDiscovered) return;

 const gems = store.underDiscoveredDestinations;
 gems.forEach(gem => {
 const markerHtml = `
 <div class="gov-gem-pin" data-gem-id="${gem.id}">
 <div class="ggp-icon"></div>
 <div class="ggp-label">
 <span class="ggp-name">${gem.name}</span>
 <span class="ggp-reduction">${gem.crowdReduction}</span>
 </div>
 </div>
 `;

 const icon = L.divIcon({
 html: markerHtml,
 className: 'gov-gem-div-icon',
 iconSize: [160, 36],
 iconAnchor: [20, 32]
 });

 const marker = L.marker(gem.coordinates, { icon, zIndexOffset: 400 });
 marker.on('click', () => {
 this.showUnderDiscoveredCard(gem);
 });

 this.underDiscoveredLayer.addLayer(marker);
 });
 }

 renderEmergencyServices() {
 this.emergencyLayer.clearLayers();
 const { safetyPolice, safetyHospitals } = store.state.activeMapLayers;

 if (safetyPolice) {
 store.policeStations.forEach(police => {
 const icon = L.divIcon({
 html: `<div class="gov-emergency-pin police" title="${police.name}"><span class="gep-icon"></span></div>`,
 className: 'gov-emergency-div-icon',
 iconSize: [32, 32],
 iconAnchor: [16, 16]
 });
 const marker = L.marker(police.coordinates, { icon, zIndexOffset: 450 });
 marker.on('click', () => {
 this.showEmergencyCard(police, 'police');
 });
 this.emergencyLayer.addLayer(marker);
 });
 }

 if (safetyHospitals) {
 store.hospitals.forEach(hosp => {
 const icon = L.divIcon({
 html: `<div class="gov-emergency-pin hospital" title="${hosp.name}"><span class="gep-icon"></span></div>`,
 className: 'gov-emergency-div-icon',
 iconSize: [32, 32],
 iconAnchor: [16, 16]
 });
 const marker = L.marker(hosp.coordinates, { icon, zIndexOffset: 450 });
 marker.on('click', () => {
 this.showEmergencyCard(hosp, 'hospital');
 });
 this.emergencyLayer.addLayer(marker);
 });
 }
 }

 showEmergencyCard(service, type) {
 const isPolice = type === 'police';
 const popupContent = `
 <div class="map-preview-sheet emergency-sheet">
 <div class="mps-header ${isPolice ? 'police-header' : 'hospital-header'}">
 <span class="mps-badge">${isPolice ? ' Tourist Police' : ' Emergency Healthcare'}</span>
 <button class="mps-close-btn" onclick="window.yatraApp.closePopup()">✕</button>
 </div>
 <div class="mps-content">
 <h4 class="mps-title">${service.name}</h4>
 <p class="mps-desc"> ${service.location}</p>
 <div class="mps-specs-row">
 <span> <strong>${service.phone}</strong></span>
 <span>•</span>
 <span> <strong>${service.emergencyHelpline || service.emergencyAmbulance}</strong></span>
 </div>
 <div class="mps-features-list">
 ${(service.features || service.facilities || []).map(f => `<span>✓ ${f}</span>`).join('')}
 </div>
 <div class="mps-actions-row">
 <a href="tel:${service.phone.replace(/[^0-9]/g, '')}" class="btn btn-sm btn-primary"> Call Now</a>
 <button class="btn btn-sm btn-outline" onclick="window.yatraApp.routeToEmergency([${service.coordinates[0]}, ${service.coordinates[1]}])">Navigate Here</button>
 </div>
 </div>
 </div>
 `;

 L.popup({ closeButton: false, offset: [0, -18], className: 'gov-spatial-popup', maxWidth: 320 })
 .setLatLng(service.coordinates)
 .setContent(popupContent)
 .openOn(this.map);
 }

 showUnderDiscoveredCard(gem) {
 const popupContent = `
 <div class="map-preview-sheet gem-sheet">
 <div class="mps-media" style="background-image: url('${gem.imageUrl}')">
 <span class="mps-cat-badge" style="background:#059669"> Under-Discovered Gem</span>
 <button class="mps-close-btn" onclick="window.yatraApp.closePopup()">✕</button>
 </div>
 <div class="mps-content">
 <div class="mps-header">
 <div>
 <h4 class="mps-title">${gem.name}</h4>
 <span class="mps-reduction-tag"> ${gem.crowdReduction} vs Central Hotspots</span>
 </div>
 </div>
 <p class="mps-desc">${gem.whyVisit}</p>
 <div class="mps-specs-row">
 <span> ${gem.bestTime}</span>
 <span>•</span>
 <span> ${gem.entryFee}</span>
 </div>
 <div class="mps-provenance-tag">
 <span></span> ${gem.verificationBadge || 'Government Verified Heritage Site'}
 </div>
 <div class="mps-actions-row">
 <button class="btn btn-sm btn-primary" onclick="window.yatraApp.toggleItineraryPlace('${gem.id}')">+ Add to Trip</button>
 <button class="btn btn-sm btn-outline" onclick="window.yatraApp.planRouteTo('${gem.id}'); window.yatraApp.closePopup();">Directions</button>
 </div>
 </div>
 </div>
 `;

 L.popup({ closeButton: false, offset: [0, -28], className: 'gov-spatial-popup', maxWidth: 340 })
 .setLatLng(gem.coordinates)
 .setContent(popupContent)
 .openOn(this.map);
 }

 renderMarkers() {
 this.markersLayer.clearLayers();
 this.placeMarkers.clear();

 const places = store.currentDayStops.map(stop => stop.place);

 places.forEach(place => {
 const cat = CATEGORIES.find(c => c.id === place.category) || CATEGORIES[0];

 const stopNumber = store.currentDayStops.findIndex(stop => stop.place.id === place.id) + 1;
 const sticker = this.getMapSticker(place);
 const markerHtml = `
 <div class="map-landmark-pin" data-place-id="${place.id}" title="${place.name}">
  <div class="map-landmark-art"><img src="${sticker}" alt=""></div>
  <div class="map-landmark-label"><span>${stopNumber}</span>${place.name.split('(')[0].trim()}</div>
 </div>
 `;

 const icon = L.divIcon({
 html: markerHtml,
 className: 'gov-map-div-icon',
 iconSize: [150, 78],
 iconAnchor: [25, 72]
 });

 const marker = L.marker(place.coordinates, { icon });
 marker.on('click', () => {
 this.selectedPlaceId = place.id;
 this.showPlaceCard(place);
 });

 this.markersLayer.addLayer(marker);
 this.placeMarkers.set(place.id, marker);
 });
 }

 getMapSticker(place) {
 const stickers = {
  'hawa-mahal': 'assets/hawa_mahal_sticker_1788591500114.jpg',
  'city-palace': 'assets/city_palace_sticker_1788591570652.jpg',
  'johari-bazaar': 'assets/bazaar_stall_sticker_1788591628377.jpg',
  'lmb-restaurant': 'assets/rajasthani_food_bowl_1788591669297.jpg'
 };
 if (stickers[place.id]) return stickers[place.id];
 if (place.category === 'food') return 'assets/food.jpg';
 if (place.category === 'shopping') return 'assets/bazaar.jpg';
 if (place.category === 'nature' || place.category === 'trekking') return 'assets/rajasthani_camel_rider_1788591868855.jpg';
 if (place.name.toLowerCase().includes('fort')) return 'assets/fort.jpg';
 return 'assets/mascot.jpg';
 }

 showPlaceCard(place) {
 if (window.yatraApp && typeof window.yatraApp.openSelectedMarkerSheet === 'function') {
 window.yatraApp.openSelectedMarkerSheet(place.id);
 }
 const isSaved = store.state.savedPlaceIds.has(place.id);
 const inTrip = store.currentDayStops.some(s => s.place.id === place.id);
 const cat = CATEGORIES.find(c => c.id === place.category) || CATEGORIES[0];
 const rec = store.computeRecommendationScore(place);
 const alternatives = store.getUnderDiscoveredAlternatives(place.id);

 const popupContent = `
 <div class="map-preview-sheet">
 <div class="mps-media" style="background-image: url('${place.imageUrl}')">
 <span class="mps-cat-badge" style="background: ${cat.color}">${cat.icon} ${cat.name}</span>
 <button class="mps-close-btn" onclick="window.yatraApp.closePopup()">✕</button>
 </div>

 <div class="mps-content">
 <div class="mps-header">
 <div>
 <div class="mps-rec-tag"> ${rec.score}% Explainable Match</div>
 <h4 class="mps-title">${place.name}</h4>
 <div class="mps-rating-row">
 <span class="mps-star">★ ${place.rating}</span>
 <span class="mps-reviews">(${place.reviewsCount ? place.reviewsCount.toLocaleString() : 'Verified'} reviews)</span>
 </div>
 </div>
 </div>

 <p class="mps-desc">${place.shortDesc}</p>

 <div class="mps-specs-row">
 <span> ${place.openingHours ? place.openingHours.split('(')[0] : 'Open Daily'}</span>
 <span>•</span>
 <span> ${place.entryFee ? place.entryFee.split(',')[0] : 'Standard Ticket'}</span>
 <span>•</span>
 <span> ${place.distanceFromCenter || 'Central'}</span>
 </div>

 <!-- Provenance / Verification Line -->
 <div class="mps-provenance-tag">
 <span>✓</span> ${place.verificationStatus || 'Verified Government Tourism Data'}
 </div>

 <!-- Under-Discovered Alternative Redistribution Banner -->
 ${alternatives.length > 0 ? `
 <div class="mps-alt-banner">
 <div class="mab-header">
 <span> High Surge Alternative</span>
 <span class="mab-badge">${alternatives[0].crowdReduction}</span>
 </div>
 <div class="mab-body">
 <strong>${alternatives[0].name}</strong>: ${alternatives[0].whyVisit.substring(0, 75)}...
 </div>
 <button class="btn btn-xs btn-outline mab-btn" onclick="window.yatraApp.openPlaceDetails('${alternatives[0].id}')">
 Explore Alternative ➔
 </button>
 </div>
 ` : ''}

 <div class="mps-actions-row">
 <button class="btn btn-sm ${inTrip ? 'btn-secondary' : 'btn-primary'}" onclick="window.yatraApp.toggleItineraryPlace('${place.id}')">
 ${inTrip ? '✓ In Itinerary' : '+ Add to Trip'}
 </button>
 <button class="btn btn-sm btn-outline btn-route-highlight" onclick="window.yatraApp.planRouteTo('${place.id}'); window.yatraApp.closePopup();">
 Directions
 </button>
 <button class="btn btn-sm btn-outline" onclick="window.yatraApp.openPlaceDetails('${place.id}')">
 Details ➔
 </button>
 <button class="btn btn-sm btn-icon ${isSaved ? 'active' : ''}" onclick="window.yatraApp.toggleSave('${place.id}')" title="Save Place">
 ${isSaved ? 'Saved' : 'Save'}
 </button>
 </div>
 </div>
 </div>
 `;

 L.popup({
 closeButton: false,
 offset: [0, -28],
 className: 'gov-spatial-popup',
 maxWidth: 340
 })
 .setLatLng(place.coordinates)
 .setContent(popupContent)
 .openOn(this.map);
 }

 renderItineraryRoute() {
 this.routeLayer.clearLayers();
 this.updateNavigationBanner(null, null);

 const stops = store.currentDayStops;
 this.updateMapBriefing(stops);
 if (!stops || stops.length === 0) {
 return;
 }

 const latLngs = stops.map(s => s.place.coordinates);

 if (latLngs.length >= 2) {
 const routeCasing = L.polyline(latLngs, {
 color: '#FFFFFF',
 weight: 10,
 opacity: 0.85,
 lineCap: 'round',
 lineJoin: 'round'
 });
 const polyline = L.polyline(latLngs, {
 color: '#D6673D',
 weight: 5,
 opacity: 0.95,
 dashArray: '6, 8',
 lineCap: 'round',
 lineJoin: 'round'
 });
 this.routeLayer.addLayer(routeCasing);
 this.routeLayer.addLayer(polyline);

 if (store.state.activeView === 'itinerary' || store.state.activeAppView === 'map') {
 this.map.fitBounds(polyline.getBounds(), { padding: [60, 60], maxZoom: 15 });
 }
 }

 this.updateNavigationBanner(stops[0], stops[1] || null);
 }

 updateMapBriefing(stops = []) {
 const title = document.getElementById('mapTripTitle');
 const copy = document.getElementById('mapTripCopy');
 const stats = document.getElementById('mapTripStats');
 if (!title || !copy || !stats) return;

 const count = stops.length;
 stats.innerHTML = `<strong>${count}</strong><span>${count === 1 ? 'stop saved' : 'stops saved'}</span>`;
 if (count === 0) {
  title.textContent = 'Build your day as you go';
  copy.textContent = 'Choose places in Explore and they will appear here in your trip order.';
 } else if (count === 1) {
  title.textContent = 'One place on your trip';
  copy.textContent = 'Add another stop to draw a route between your chosen places.';
 } else {
  title.textContent = 'Your route is ready';
  copy.textContent = `A route connects your ${count} selected stops in trip order.`;
 }
 }

 renderDirectRouteTo(placeId, fitBounds = true) {
 this.routeLayer.clearLayers();

 const destination = store.getPlaceById(placeId);
 if (!destination) return;

 const origin = store.state.userLocation || store.destination.coordinates;
 const routePoints = [origin, destination.coordinates];
 const originIcon = L.divIcon({
 html: '<div class="gov-route-endpoint origin"><span class="gre-dot"></span><span>Your location</span></div>',
 className: 'gov-endpoint-div-icon',
 iconAnchor: [15, 14]
 });
 const destinationIcon = L.divIcon({
 html: `<div class="gov-route-endpoint dest"><span class="gre-dot"></span><span>${destination.name.split('(')[0].trim()}</span></div>`,
 className: 'gov-endpoint-div-icon',
 iconAnchor: [15, 14]
 });

 this.routeLayer.addLayer(L.marker(origin, { icon: originIcon, zIndexOffset: 500 }));
 this.routeLayer.addLayer(L.marker(destination.coordinates, { icon: destinationIcon, zIndexOffset: 500 }));
 this.routeLayer.addLayer(L.polyline(routePoints, {
 color: '#2563EB',
 weight: 5,
 opacity: 0.9,
 dashArray: '8, 8',
 lineCap: 'round',
 lineJoin: 'round'
 }));

 if (fitBounds) {
 this.map.fitBounds(L.latLngBounds(routePoints), { padding: [60, 60], maxZoom: 15 });
 }

 this.updateNavigationBanner({ place: destination }, null);
 }

 renderSaferRoutePolylines(fitBounds = false) {
 this.routeLayer.clearLayers();

 const route = store.activeSaferRoute;
 if (!route) return;

 const activeOptionId = store.state.activeSaferOptionId || (route.options[0] && route.options[0].id);
 const activeOption = route.options.find(o => o.id === activeOptionId) || route.options[0];

 // Colors per route type
 const routeStyles = {
 safer: { color: '#059669', name: 'Safer Route', weightActive: 6, weightInactive: 3 },
 faster: { color: '#D97706', name: 'Fastest Route', weightActive: 6, weightInactive: 3 },
 balanced: { color: '#2563EB', name: 'Balanced Route', weightActive: 6, weightInactive: 3 }
 };

 // Draw all route alternative lines
 route.options.forEach(opt => {
 if (!opt.waypoints || opt.waypoints.length === 0) return;
 const isSelected = opt.id === activeOptionId;
 const style = routeStyles[opt.type] || { color: '#64748B', weightActive: 6, weightInactive: 3 };

 const poly = L.polyline(opt.waypoints, {
 color: style.color,
 weight: isSelected ? style.weightActive : style.weightInactive,
 opacity: isSelected ? 0.95 : 0.45,
 dashArray: isSelected ? null : '5, 6',
 lineCap: 'round',
 lineJoin: 'round'
 });

 poly.bindTooltip(`<strong>${opt.label}</strong><br/>${opt.distanceText} • ${opt.estimatedTimeText} • Safety Score: ${opt.safetyScore}/100`, { sticky: true });
 poly.on('click', () => {
 if (window.saferRouteManager) {
 window.saferRouteManager.selectOption(opt.id);
 }
 });

 this.routeLayer.addLayer(poly);
    if (isSelected && activeOption.type === 'safer' && opt.waypoints?.length > 1) {
     const midpoint = opt.waypoints[Math.floor(opt.waypoints.length / 2)];
     const labelIcon = L.divIcon({ html: '<div class="ai-route-map-label">AI Suggested Safer Route</div>', className: 'ai-route-label-icon', iconSize: [180, 28], iconAnchor: [90, 14] });
     this.routeLayer.addLayer(L.marker(midpoint, { icon: labelIcon, interactive: false, zIndexOffset: 550 }));
    }
 });

 // If Safer Route is active, render police and safe checkposts along corridor
 if (activeOption && activeOption.type === 'safer') {
 const checkposts = [
 { name: 'Pink Police Beat Kiosk', coords: [26.9350, 75.8200], desc: 'All-women 24x7 tourist assistance booth' },
 { name: 'Forest Checkpoint & Emergency Desk', coords: [26.9420, 75.8190], desc: 'Rajasthan Police highway patrol van' }
 ];

 checkposts.forEach(cp => {
 const cpIcon = L.divIcon({
 html: `<div class="gov-corridor-checkpoint" title="${cp.name}"><span class="cp-dot"></span><span>${cp.name}</span></div>`,
 className: 'gov-checkpoint-div-icon',
 iconSize: [160, 24],
 iconAnchor: [12, 12]
 });
 const marker = L.marker(cp.coords, { icon: cpIcon, zIndexOffset: 300 });
 marker.bindPopup(`<strong>${cp.name}</strong><br/>${cp.desc}`);
 this.routeLayer.addLayer(marker);
 });
 }

 // Origin Pin
 const originIcon = L.divIcon({
 html: `
 <div class="gov-route-endpoint origin">
 <span class="gre-dot"></span>
 <span>${route.origin.name.split('(')[0].trim()}</span>
 </div>
 `,
 className: 'gov-endpoint-div-icon',
 iconAnchor: [15, 14]
 });
 this.routeLayer.addLayer(L.marker(route.origin.coordinates, { icon: originIcon }));

 // Destination Pin
 const destIcon = L.divIcon({
 html: `
 <div class="gov-route-endpoint dest">
 <span class="gre-dot"></span>
 <span>${route.destination.name.split('(')[0].trim()}</span>
 </div>
 `,
 className: 'gov-endpoint-div-icon',
 iconAnchor: [15, 14]
 });
 this.routeLayer.addLayer(L.marker(route.destination.coordinates, { icon: destIcon }));

 // Auto-fit bounds
 if ((fitBounds || true) && activeOption && activeOption.waypoints && activeOption.waypoints.length > 0) {
 const bounds = L.latLngBounds(activeOption.waypoints);
 this.map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
 }
 }

 updateNavigationBanner(startStop, nextStop) {
 const banner = document.getElementById('navigationStepBanner');
 if (!banner) return;

 if (!startStop) {
 banner.classList.add('hidden');
 return;
 }

 banner.classList.remove('hidden');
 const startName = startStop.place.name.split('(')[0].trim();
 const nextName = nextStop ? nextStop.place.name.split('(')[0].trim() : 'Destination Arrived';
 const distText = nextStop ? '450 m' : 'Active Location';
 const timeText = nextStop ? '6 min transit' : 'Enjoy your visit!';
 const instruction = nextStop ? `Head towards ${nextName} via Walled City Corridor` : `Current landmark: ${startName}`;

 banner.innerHTML = `
 <div class="nav-banner-metrics">
 <div class="nav-metric-main">
 <span class="nav-tag-pill"> ITINERARY TRANSIT</span>
 <span class="nav-distance">${distText}</span>
 <span class="nav-separator">•</span>
 <span class="nav-time">${timeText}</span>
 </div>
 <div class="nav-instruction">${instruction}</div>
 </div>
 <div class="nav-banner-action">
 <button class="btn btn-sm btn-outline" onclick="window.yatraApp.simulateNextNavStep()">Next Stop ➔</button>
 </div>
 `;
 }

 focusPlace(placeId) {
 const place = store.getPlaceById(placeId);
 if (!place) return;
 this.map.flyTo(place.coordinates, 15, { duration: 0.8 });
 setTimeout(() => {
 this.showPlaceCard(place);
 }, 900);
 }

 locateUser() {
 if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(
 (pos) => {
 const coords = [pos.coords.latitude, pos.coords.longitude];
 store.state.userLocation = coords;
 this.map.flyTo(coords, 14);
 },
 () => {
 this.map.flyTo(store.destination.coordinates, 13);
 }
 );
 } else {
 this.map.flyTo(store.destination.coordinates, 13);
 }
 }

 resetView() {
 this.map.flyTo(store.destination.coordinates, store.destination.zoom || 13, { duration: 0.8 });
 }
}

export const mapEngine = new YatraMap();
window.mapEngine = mapEngine;
