// ==========================================================================
// YATRA TOURISM PLATFORM • CENTRAL STATE & MEMORY STORE
// State Management, Travel Onboarding, User Memory, Spatial Map Cache & Routing
// ==========================================================================

import { 
 DESTINATIONS, 
 PLACES, 
 INITIAL_ITINERARY, 
 BADGES, 
 SAFER_ROUTES, 
 LOCAL_DISCOVERIES, 
 WRAPPED_ARCHETYPES, 
 COMMUNITY_FEEDBACK_LOGS,
 UNDER_DISCOVERED_DESTINATIONS,
 LOCAL_ARTISANS,
 POLICE_STATIONS,
 HOSPITALS,
 GOVERNMENT_ADVISORIES,
 TOURIST_COMPLAINT_CATEGORIES,
 SAMPLE_COMPLAINTS_INTEL,
 TOURISM_PRESSURE_ZONES
} from './data.js';

class YatraStore {
 constructor() {
 this.listeners = new Set();
 this.state = {
 activeAppView: 'landing', // 'landing' | 'login' | 'signup' | 'onboarding-destination' | 'onboarding-preferences' | 'itinerary-result' | 'explore' | 'hidden-jaipur' | 'map' | 'safety' | 'trips' | 'tourism-intelligence' | 'complaint-box' | 'reels' | 'ai-assistant' | 'travel-wrapped' | 'profile'
 currentDestinationId: 'jaipur',
 selectedCategories: new Set(),
 searchQuery: '',
 activeView: 'places', // Sidebar tab: 'places' | 'gems' | 'itinerary' | 'safer-route' | 'weather' | 'documents' | 'profile'
 activeItineraryDay: 'day1',
 itineraries: JSON.parse(JSON.stringify(INITIAL_ITINERARY)),
 savedPlaceIds: new Set(['hawa-mahal', 'nahargarh-fort', 'panna-meena-kund']),
 visitedPlaceIds: new Set(['hawa-mahal', 'johari-bazaar', 'city-palace', 'panna-meena-kund']),
 collectedStickerIds: new Set(['st-hawa-mahal', 'st-city-palace', 'st-amber-fort']),
 activeModal: null, // null | 'auth' | 'place-detail' | 'reels' | 'ai-planner' | 'wrapped' | 'feedback'
 activePlaceId: 'hawa-mahal',
 activeReelIndex: 0,
 userLocation: [26.9239, 75.8267],
 alongTheWayCategory: null,
 activeSaferRouteId: 'route-hawa-nahargarh',
 activeSaferOptionId: 'opt-b-safer',
 communityFeedback: [...COMMUNITY_FEEDBACK_LOGS],
 pendingAuthAction: null, // { actionTitle, onAllowed, returnHash }
 
 // Accessibility Filters (First-Class Citizen)
 accessibilityFilters: {
 wheelchairOnly: false,
 lowWalking: false,
 elderlyFriendly: false,
 familyFriendly: false,
 audioGuides: false
 },

 // Tourism Management & Pressure Simulation
 tourismPressureSimulation: {
 festivalType: 'standard', // 'standard' | 'diwali' | 'teej' | 'weekend_surge'
 additionalVisitors: 0,
 multiplier: 1.0,
 divertedTouristsCount: 0,
 activeOpportunityZones: ['zone-bagru-corridor', 'zone-sambhar-wetland', 'zone-central-museums']
 },

 // Interactive Map Layers
 activeMapLayers: {
 tourismPressure: false,
 opportunityZones: true,
 seasonalDestinations: true,
 safetyPolice: true,
 safetyHospitals: true,
 underDiscovered: true,
 accessibility: true,
 heatMap: false
 },

 // Tourist Complaints & Civic Intelligence
 complaints: [...SAMPLE_COMPLAINTS_INTEL],
 
 // Onboarding Journey State
 onboarding: {
 destination: 'jaipur',
 interests: ['historical', 'hidden-gems'],
 duration: '2.5 hours', // '1 hour' | '2 hours' | '4 hours' | 'Half Day' | 'Full Day' | '2 Days' | '3 Days'
 pace: 'balanced', // 'relaxed' | 'balanced' | 'packed'
 groupType: 'couple', // 'solo' | 'couple' | 'family' | 'friends'
 accessibility: {
 wheelchair: false,
 lowWalking: true,
 family: false,
 senior: false,
 child: false
 },
 generatedPlan: null,
 whyFactors: [
 '✓ 2.5 hours available',
 '✓ Heritage interest',
 '✓ Low crowd',
 '✓ Good weather',
 '✓ Accessible by road',
 '✓ Low walking requirement'
 ]
 },

 // Spatial Map Viewport Cache
 mapCache: {
 center: [26.9124, 75.7873],
 zoom: 13,
 selectedPlaceId: null
 },

 // User Session & Long-Term Memory Layer
 userSession: {
 isLoggedIn: false, // Default to guest for realistic SIH digital public service testing
 name: 'Guest Explorer',
 email: 'guest@yatra.tourism',
 avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
 preferences: {
 interests: ['historical', 'hidden-gems', 'food'],
 travelStyle: 'balanced',
 budget: 'moderate',
 favoriteDestinations: ['jaipur'],
 totalDistanceKm: 128,
 placesVisitedCount: 12,
 tripsCompleted: 3
 }
 },
 // Structured User Memory (Personalized RAG & Saarthi AI Context)
 userMemory: {
 interests: ['historical', 'hidden-gems', 'local-culture', 'food'],
 visitedPlaces: ['hawa-mahal', 'city-palace', 'albert-hall'],
 savedPlaces: ['nahargarh-fort', 'panna-meena-kund', 'jagat-shiromani'],
 preferredCrowd: 'low',
 accessibility: { wheelchair: false, lowWalking: true },
 typicalTravelTime: '2.5 hours',
 preferredDestinationTypes: ['UNESCO Heritage', 'Stepwells', 'Handicraft Bazaars'],
 searchHistory: ['Jaipur heritage', 'quiet stepwell', 'hand block printing'],
 recentTrips: [
 { destination: 'Jaipur', season: 'Winter', style: 'Heritage & Hidden Gems', stops: 4 }
 ]
 },

 // Women Safety & Live Trip Tracking Demo State
 safetyTracking: {
 active: false,
 destinationName: 'Nahargarh Fort',
 destinationCoords: [26.9372, 75.8156],
 etaMinutes: 24,
 delayDetected: false,
 progressPct: 20,
 lastUpdate: 'Live GPS active'
 }
 };
 }

 updateMapCache(center, zoom, selectedPlaceId = null) {
 if (center && Array.isArray(center) && center.length === 2) {
 this.state.mapCache.center = center;
 }
 if (zoom) {
 this.state.mapCache.zoom = zoom;
 }
 if (selectedPlaceId !== undefined) {
 this.state.mapCache.selectedPlaceId = selectedPlaceId;
 }
 }

 requireAuth(actionTitle, onAllowed, returnHash = null) {
 if (this.state.userSession.isLoggedIn) {
 if (typeof onAllowed === 'function') onAllowed();
 return true;
 }

 // Save pending action to resume seamlessly after login
 this.state.pendingAuthAction = {
 actionTitle: actionTitle || 'perform this action',
 onAllowed: typeof onAllowed === 'function' ? onAllowed : null,
 returnHash: returnHash || window.location.hash || '#explore'
 };

 if (window.yatraApp) {
 window.yatraApp.openAuthModal('login', actionTitle);
 }
 return false;
 }

 subscribe(listener) {
 this.listeners.add(listener);
 return () => this.listeners.delete(listener);
 }

 notify(changedProp) {
 for (const listener of this.listeners) {
 try {
 listener(this.state, changedProp);
 } catch (err) {
 console.error('Store listener error:', err);
 }
 }
 }

 get destination() {
 return DESTINATIONS[this.state.currentDestinationId] || DESTINATIONS.jaipur;
 }

 getPlaceById(placeId) {
 return PLACES.find(place => place.id === placeId)
  || UNDER_DISCOVERED_DESTINATIONS.find(place => place.id === placeId)
  || LOCAL_DISCOVERIES.find(place => place.id === placeId || place.placeId === placeId)
  || null;
 }

 isPlaceInItinerary(placeId, day = this.state.activeItineraryDay) {
 const stops = this.state.itineraries[this.state.currentDestinationId]?.[day] || [];
 return stops.some(stop => stop.placeId === placeId);
 }

 get places() {
 return PLACES.filter(p => p.destinationId === this.state.currentDestinationId);
 }

 get underDiscoveredDestinations() {
 return UNDER_DISCOVERED_DESTINATIONS.filter(u => u.destinationId === this.state.currentDestinationId || !u.destinationId);
 }

 get artisans() {
 return LOCAL_ARTISANS;
 }

 get policeStations() {
 return POLICE_STATIONS;
 }

 get hospitals() {
 return HOSPITALS;
 }

 get advisories() {
 return GOVERNMENT_ADVISORIES;
 }

 get complaintCategories() {
 return TOURIST_COMPLAINT_CATEGORIES;
 }

 get pressureZones() {
 const mult = this.state.tourismPressureSimulation.multiplier;
 return TOURISM_PRESSURE_ZONES.map(z => {
 const simulatedLoad = Math.min(Math.round(z.currentLoad * mult), Math.round(z.carryingCapacity * 1.35));
 const simulatedPct = Math.round((simulatedLoad / z.carryingCapacity) * 100);
 let status = z.status;
 let statusClass = z.statusClass;
 if (simulatedPct >= 95) {
 status = 'Critical Surge - Urgent Redistribution';
 statusClass = 'status-critical';
 } else if (simulatedPct >= 80) {
 status = 'High Surge Pressure';
 statusClass = 'status-danger';
 } else if (simulatedPct <= 35) {
 status = 'High Absorption Potential (Opportunity Zone)';
 statusClass = 'status-opportunity';
 }
 return {
 ...z,
 currentLoad: simulatedLoad,
 utilizationPercent: simulatedPct,
 status,
 statusClass
 };
 });
 }

 get complaintsList() {
 return this.state.complaints;
 }

 // 5-Pillar Explainable Recommendation Engine (Deterministic Heuristic matching)
 computeRecommendationScore(place, userInterests = null, groupType = null, durationText = null, accessibilityObj = null) {
 const ob = this.state.onboarding;
 const interests = userInterests || ob.interests || ['historical', 'hidden-gems'];
 const group = groupType || ob.groupType || 'couple';
 const duration = durationText || ob.duration || '2.5 hours';
 const access = accessibilityObj || ob.accessibility || {};
 
 // Pillar 1: People & Interests (30 max)
 let interestScore = 18;
 if (interests.includes(place.category) || (interests.includes('heritage') && place.category === 'historical')) {
 interestScore = 30;
 } else if (place.subcategories && place.subcategories.some(sc => interests.includes(sc))) {
 interestScore = 27;
 } else if (interests.includes('hidden-gems') && place.category === 'hidden-gems') {
 interestScore = 30;
 }

 // Pillar 2: Accessibility & Comfort (20 max)
 let accessibilityScore = 18;
 const placeAccess = (place.conditions && place.conditions.accessibility) || '';
 const isWheelchair = placeAccess.toLowerCase().includes('wheelchair') || placeAccess.toLowerCase().includes('ramp') || placeAccess.toLowerCase().includes('accessible');
 const isLowWalk = place.travelTimeWalk && (place.travelTimeWalk.includes('5 min') || place.travelTimeWalk.includes('10 min') || !place.travelTimeWalk.includes('Hike'));
 
 if (access.wheelchair || this.state.accessibilityFilters.wheelchairOnly) {
 accessibilityScore = isWheelchair ? 20 : 8;
 } else if (access.lowWalking || this.state.accessibilityFilters.lowWalking) {
 accessibilityScore = isLowWalk ? 20 : 12;
 }

 // Pillar 3: Time & Distance (20 max)
 let timeScore = 18;
 const dur = place.avgDuration || '';
 if (duration.includes('1 hour') || duration.includes('2 hours') || duration.includes('2.5')) {
 timeScore = dur.includes('1–2') || dur.includes('1 hour') || dur.includes('45 min') ? 20 : 15;
 } else if (duration.includes('Half Day') || duration.includes('4 hours')) {
 timeScore = dur.includes('2–3') || dur.includes('Half-day') || dur.includes('1–2') ? 20 : 16;
 } else {
 timeScore = 19;
 }

 // Pillar 4: Conditions & Weather Comfort (15 max)
 let conditionScore = 14;
 const crowd = (place.conditions && place.conditions.crowdLevel) || '';
 if (crowd.toLowerCase().includes('low') || crowd.toLowerCase().includes('moderate')) {
 conditionScore = 15;
 } else if (crowd.toLowerCase().includes('high')) {
 conditionScore = 11;
 }

 // Pillar 5: Tourism Pressure & Opportunity Factor (15 max)
 let pressureScore = 12;
 if (place.isOpportunityZone || place.category === 'hidden-gems') {
 pressureScore = 15;
 } else if (crowd.toLowerCase().includes('high')) {
 pressureScore = 8;
 }

 // Total Deterministic Match Score (capped between 75 and 96%)
 const totalScore = Math.min(96, Math.max(78, interestScore + accessibilityScore + timeScore + conditionScore + pressureScore - 3));
 
 const whyBullets = [];
 whyBullets.push(`✓ ${duration} available`);
 if (interestScore >= 25) {
 whyBullets.push(`✓ Heritage & Cultural interest`);
 } else {
 whyBullets.push(`✓ Destination match (${place.category.toUpperCase()})`);
 }
 whyBullets.push(pressureScore >= 12 ? '✓ Low crowd density (-75% vs Central)' : '✓ Timed entry slot available');
 whyBullets.push('✓ Good weather & lighting conditions');
 whyBullets.push('✓ Accessible by road & transit');
 if (access.lowWalking || isLowWalk) {
 whyBullets.push('✓ Low walking requirement verified');
 }

 return {
 score: totalScore,
 breakdown: {
 people: interestScore,
 accessibility: accessibilityScore,
 time: timeScore,
 conditions: conditionScore,
 pressure: pressureScore
 },
 whyBullets,
 explanation: `${totalScore}% Match: Formatted for ${duration} duration, ${group} group pace, and verified low walking accessibility.`
 };
 }

 getUnderDiscoveredAlternatives(placeId) {
 const list = this.underDiscoveredDestinations;
 return list.filter(u => u.alternativeTo && u.alternativeTo.includes(placeId));
 }

 get filteredPlaces() {
 let list = this.places;
 const { selectedCategories, searchQuery, alongTheWayCategory, accessibilityFilters } = this.state;

 // Accessibility filter
 if (accessibilityFilters.wheelchairOnly) {
 list = list.filter(p => {
 const acc = (p.conditions && p.conditions.accessibility) || '';
 return acc.toLowerCase().includes('wheelchair') || acc.toLowerCase().includes('ramp') || acc.toLowerCase().includes('accessible');
 });
 }

 if (accessibilityFilters.lowWalking) {
 list = list.filter(p => {
 const walk = p.travelTimeWalk || '';
 return !walk.toLowerCase().includes('trek') && !walk.toLowerCase().includes('hike') && !walk.toLowerCase().includes('45 min');
 });
 }

 if (alongTheWayCategory) {
 list = list.filter(p => p.category === alongTheWayCategory || (p.subcategories && p.subcategories.includes(alongTheWayCategory)));
 } else if (selectedCategories.size > 0) {
 list = list.filter(p => selectedCategories.has(p.category) || (p.subcategories && p.subcategories.some(sc => selectedCategories.has(sc))));
 }

 if (searchQuery.trim()) {
 const q = searchQuery.toLowerCase().trim();
 list = list.filter(p => 
 p.name.toLowerCase().includes(q) ||
 p.shortDesc.toLowerCase().includes(q) ||
 p.category.toLowerCase().includes(q) ||
 (p.subcategories && p.subcategories.some(sc => sc.toLowerCase().includes(q))) ||
 (p.localTip && p.localTip.toLowerCase().includes(q))
 );
 }

 return list;
 }

 setAccessibilityFilter(key, val) {
 this.state.accessibilityFilters[key] = val;
 this.notify('accessibility');
 }

 setMapLayer(layerKey, isEnabled) {
 this.state.activeMapLayers[layerKey] = isEnabled;
 this.notify('mapLayers');
 }

 simulateSurge(param1, param2) {
 let festivalType = typeof param1 === 'string' ? param1 : (param2 || this.state.tourismPressureSimulation.festivalType || 'standard');
 let additionalVisitors = typeof param1 === 'number' ? param1 : (typeof param2 === 'number' ? param2 : (this.state.tourismPressureSimulation.additionalVisitors || 0));

 let baseMultiplier = 1.0;
 switch(festivalType) {
 case 'diwali':
 baseMultiplier = 1.65;
 break;
 case 'teej':
 case 'gangaur':
 baseMultiplier = 1.40;
 break;
 case 'weekend_surge':
 baseMultiplier = 1.25;
 break;
 default:
 baseMultiplier = 1.0;
 }

 const visitorMultiplier = (additionalVisitors / 40000);
 const finalMultiplier = Number((baseMultiplier + visitorMultiplier).toFixed(2));
 const divertedTouristsCount = Math.round((additionalVisitors * 0.18) + (finalMultiplier > 1.2 ? 4800 : 0));

 this.state.tourismPressureSimulation = {
 festivalType,
 additionalVisitors,
 multiplier: finalMultiplier,
 divertedTouristsCount,
 activeOpportunityZones: ['zone-bagru-corridor', 'zone-sambhar-wetland', 'zone-central-museums']
 };
 this.notify('pressureSimulation');
 }

 submitComplaint(complaintData) {
 const ticketId = `TRV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
 const categoryObj = TOURIST_COMPLAINT_CATEGORIES.find(c => c.id === complaintData.category) || { label: 'Civic Grievance' };
 
 // Frontend Demo AI Classification & Sentiment Analysis
 const text = (complaintData.description || '').toLowerCase();
 let detectedCategory = categoryObj.label;
 if (text.includes('dirty') || text.includes('garbage') || text.includes('waste') || text.includes('clean')) {
 detectedCategory = 'Cleanliness + Municipal Sanitation';
 } else if (text.includes('crowd') || text.includes('queue') || text.includes('jam') || text.includes('packed')) {
 detectedCategory = 'Overcrowding + Traffic Management';
 } else if (text.includes('tout') || text.includes('scam') || text.includes('harass') || text.includes('threat')) {
 detectedCategory = 'Tourist Safety & Harassment';
 }

 const urgency = (text.includes('urgent') || text.includes('harass') || text.includes('scam') || text.includes('threat') || text.includes('emergency') || text.includes('danger')) ? 'High' : 'Medium';
 const sentiment = 'Negative'; // Grievance text classification

 const newEntry = {
 ticketId,
 category: complaintData.category,
 categoryLabel: detectedCategory,
 location: complaintData.location || 'Jaipur Heritage District',
 description: complaintData.description,
 contact: complaintData.contact || 'Anonymous',
 timestamp: 'Just now (Live Logged)',
 status: 'Under Investigation',
 statusBadge: 'badge-warning',
 urgency,
 sentiment,
 resolutionNote: 'Automated AI classification dispatched to District Tourist Protection Cell and local nodal authority.',
 dept: 'Jaipur Tourist Welfare Cell & Dept. of Tourism'
 };

 this.state.complaints.unshift(newEntry);
 this.notify('complaints');
 this.showToast(`Complaint lodged successfully. Token #${ticketId}`, 'success');
 return newEntry;
 }

 get currentDayStops() {
 const destId = this.state.currentDestinationId;
 const day = this.state.activeItineraryDay;
 if (!this.state.itineraries[destId] || !this.state.itineraries[destId][day]) {
 return [];
 }
 return this.state.itineraries[destId][day].map(stop => {
 const place = this.getPlaceById(stop.placeId);
 return { ...stop, place };
 }).filter(s => s.place);
 }

 // =========================================================================
 // ACTIONS & STATE MUTATIONS
 // =========================================================================
 setDestination(destId) {
 if (DESTINATIONS[destId]) {
 this.state.currentDestinationId = destId;
 if (!this.state.itineraries[destId]) {
 this.state.itineraries[destId] = {
 day1: [],
 day2: [],
 day3: []
 };
 }
 this.state.activeItineraryDay = 'day1';
 this.notify('destination');
 }
 }

 toggleCategory(catId) {
 if (this.state.selectedCategories.has(catId)) {
 this.state.selectedCategories.delete(catId);
 } else {
 this.state.selectedCategories.add(catId);
 }
 this.notify('categories');
 }

 clearCategories() {
 this.state.selectedCategories.clear();
 this.notify('categories');
 }

 setSearchQuery(q) {
 this.state.searchQuery = q;
 this.notify('search');
 }

 setAlongTheWayCategory(catId) {
 if (this.state.alongTheWayCategory === catId) {
 this.state.alongTheWayCategory = null;
 } else {
 this.state.alongTheWayCategory = catId;
 }
 this.notify('alongTheWay');
 }

 setActiveView(view) {
 this.state.activeView = view;
 this.notify('view');
 }

 setActiveAppView(appView) {
 this.state.activeAppView = appView;
 this.notify('appView');
 }

 setActiveItineraryDay(day) {
 this.state.activeItineraryDay = day;
 this.notify('itineraryDay');
 }

 addPlaceToItinerary(placeId, day = this.state.activeItineraryDay, time = 'Flexible', note = '') {
 const destId = this.state.currentDestinationId;
 if (!this.state.itineraries[destId]) {
 this.state.itineraries[destId] = { day1: [], day2: [], day3: [] };
 }
 if (!this.state.itineraries[destId][day]) {
 this.state.itineraries[destId][day] = [];
 }
 const exists = this.state.itineraries[destId][day].some(s => s.placeId === placeId);
 if (!exists) {
 const place = this.getPlaceById(placeId);
 this.state.itineraries[destId][day].push({ placeId, time, note, place });
 this.notify('itineraryUpdated');
 }
 }

 removeItineraryStop(index, day = this.state.activeItineraryDay) {
 const destId = this.state.currentDestinationId;
 if (this.state.itineraries[destId] && this.state.itineraries[destId][day]) {
 this.state.itineraries[destId][day].splice(index, 1);
 this.notify('itineraryUpdated');
 }
 }

 replaceItineraryStop(index, newPlaceId, day = this.state.activeItineraryDay) {
 const destId = this.state.currentDestinationId;
 if (this.state.itineraries[destId] && this.state.itineraries[destId][day] && this.state.itineraries[destId][day][index]) {
 this.state.itineraries[destId][day][index].placeId = newPlaceId;
 this.state.itineraries[destId][day][index].note = 'Custom Swapped Landmark';
 this.notify('itineraryUpdated');
 }
 }

 moveItineraryStop(fromIndex, toIndex, day = this.state.activeItineraryDay) {
 const destId = this.state.currentDestinationId;
 const list = this.state.itineraries[destId]?.[day];
 if (!list || toIndex < 0 || toIndex >= list.length) return;
 const [item] = list.splice(fromIndex, 1);
 list.splice(toIndex, 0, item);
 this.notify('itineraryUpdated');
 }

 moveStopToDay(fromDay, stopIndex, targetDay) {
 const destId = this.state.currentDestinationId;
 const sourceList = this.state.itineraries[destId]?.[fromDay];
 if (!sourceList || !sourceList[stopIndex]) return;

 if (!this.state.itineraries[destId][targetDay]) {
 this.state.itineraries[destId][targetDay] = [];
 }

 const [item] = sourceList.splice(stopIndex, 1);
 this.state.itineraries[destId][targetDay].push(item);
 this.notify('itineraryUpdated');
 }

 optimizeDayRoute(day = this.state.activeItineraryDay) {
 const destId = this.state.currentDestinationId;
 const stops = this.state.itineraries[destId]?.[day];
 if (!stops || stops.length <= 2) return;

 // Sort logically by longitude (East to West corridor) for optimal transit
 const resolved = stops.map(s => {
 const p = this.getPlaceById(s.placeId);
 return { stop: s, lon: p ? p.coordinates[1] : 0 };
 }).sort((a, b) => b.lon - a.lon);

 this.state.itineraries[destId][day] = resolved.map((r, idx) => ({
 ...r.stop,
 time: ['09:00 AM', '11:30 AM', '02:30 PM', '05:00 PM', '07:30 PM'][idx] || r.stop.time
 }));

 this.notify('itineraryUpdated');
 }

 toggleSavePlace(placeId) {
 if (this.state.savedPlaceIds.has(placeId)) {
 this.state.savedPlaceIds.delete(placeId);
 } else {
 this.state.savedPlaceIds.add(placeId);
 }
 this.notify('savedPlaces');
 }

 toggleVisitedPlace(placeId) {
 if (this.state.visitedPlaceIds.has(placeId)) {
 this.state.visitedPlaceIds.delete(placeId);
 } else {
 this.state.visitedPlaceIds.add(placeId);
 const place = PLACES.find(p => p.id === placeId);
 if (place && place.stickerId) {
 this.collectSticker(place.stickerId);
 }
 }
 this.notify('visitedPlaces');
 }

 collectSticker(stickerId) {
 if (!this.state.collectedStickerIds.has(stickerId)) {
 this.state.collectedStickerIds.add(stickerId);
 this.notify('stickers');
 }
 }

 openModal(modalName, placeId = null) {
 this.state.activeModal = modalName;
 if (placeId) this.state.activePlaceId = placeId;
 this.notify('modal');
 }

 closeModal() {
 this.state.activeModal = null;
 this.notify('modal');
 }

 // =========================================================================
 // AUTH MANAGEMENT & ACTION RESUMPTION
 // =========================================================================
 login(email = 'aarav.sharma@gmail.com', name = 'Aarav Sharma') {
 this.state.userSession.isLoggedIn = true;
 this.state.userSession.name = name;
 this.state.userSession.email = email;
 this.state.userSession.avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80';
 this.notify('userSession');

 // Resume any pending action that requested authentication
 if (this.state.pendingAuthAction) {
 const pending = this.state.pendingAuthAction;
 this.state.pendingAuthAction = null;
 if (typeof pending.onAllowed === 'function') {
 pending.onAllowed();
 }
 if (pending.returnHash) {
 window.location.hash = pending.returnHash;
 }
 }
 }

 signup(name, email) {
 this.login(email, name || 'Explorer');
 }

 logout() {
 this.state.userSession.isLoggedIn = false;
 this.state.userSession.name = 'Guest Explorer';
 this.state.userSession.email = 'guest@yatra.tourism';
 this.notify('userSession');
 }

 // =========================================================================
 // ONBOARDING & PREFERENCES WIZARD MUTATIONS
 // =========================================================================
 setOnboardingOption(key, val) {
 this.state.onboarding[key] = val;
 this.notify('onboarding');
 }
 setGuestSession() {
 this.state.userSession.isLoggedIn = false;
 this.state.userSession.name = 'Guest Explorer';
 this.state.userSession.email = 'guest@yatra.tourism';
 this.notify('userSession');
 }

 startSafetyTracking(destName = 'Nahargarh Fort (Sunset Terrace)', destCoords = [26.9372, 75.8156]) {
 this.state.safetyTracking = {
 active: true,
 destinationName: destName,
 destinationCoords: destCoords,
 etaMinutes: 24,
 delayDetected: false,
 progressPct: 20,
 lastUpdate: 'Live GPS active'
 };
 this.notify('safetyTracking');
 this.showToast('Safety Tracking Active. Emergency contacts & 112 proximity monitored.', 'success');
 }

 stopSafetyTracking() {
 this.state.safetyTracking.active = false;
 this.state.safetyTracking.delayDetected = false;
 this.notify('safetyTracking');
 this.showToast('Safety Tracking Stopped.', 'info');
 }

 triggerTrackingDelayDemo() {
 if (!this.state.safetyTracking.active) {
 this.startSafetyTracking();
 }
 this.state.safetyTracking.delayDetected = true;
 this.state.safetyTracking.etaMinutes = 38;
 this.notify('safetyTracking');
 this.showToast('Trip Delay Detected: Traffic congestion & stoppage on hill road.', 'warning');
 }

 updateUserMemory(field, value) {
 if (this.state.userMemory && this.state.userMemory[field] !== undefined) {
 this.state.userMemory[field] = value;
 try {
 localStorage.setItem('yatra_user_memory', JSON.stringify(this.state.userMemory));
 } catch (e) {}
 this.notify('userMemory');
 }
 }


 toggleOnboardingInterest(intId) {
 const arr = this.state.onboarding.interests;
 const idx = arr.indexOf(intId);
 if (idx >= 0) {
 arr.splice(idx, 1);
 } else {
 arr.push(intId);
 }
 this.notify('onboarding');
 }

 toggleOnboardingAccessibility(accKey) {
 if (!this.state.onboarding.accessibility) {
 this.state.onboarding.accessibility = {};
 }
 this.state.onboarding.accessibility[accKey] = !this.state.onboarding.accessibility[accKey];
 this.notify('onboarding');
 }

 // =========================================================================
 // ROUTE INTELLIGENCE
 // =========================================================================
 setSaferRoute(routeId) {
 this.state.activeSaferRouteId = routeId;
 this.notify('saferRoute');
 }

 setSaferOption(optionId) {
 this.state.activeSaferOptionId = optionId;
 this.notify('saferRoute');
 }

 planRouteTo(placeId) {
 const place = PLACES.find(p => p.id === placeId);
 if (!place) return;

 if (placeId === 'amber-fort' || placeId === 'panna-meena-kund' || placeId === 'anokhi-museum') {
 this.state.activeSaferRouteId = 'route-johari-amber';
 this.state.activeSaferOptionId = 'opt-amber-safer';
 } else {
 this.state.activeSaferRouteId = 'route-hawa-nahargarh';
 this.state.activeSaferOptionId = 'opt-b-safer';
 }
 this.notify('saferRoute');
 }

 addCommunityFeedback(feedback) {
 const newEntry = {
 id: `fb-${Date.now()}`,
 author: this.state.userSession.name,
 date: 'Just now',
 ...feedback
 };
 this.state.communityFeedback.unshift(newEntry);
 this.notify('communityFeedback');
 return newEntry;
 }

 addSaferRouteToItinerary(routeId = this.state.activeSaferRouteId, day = this.state.activeItineraryDay) {
 const route = SAFER_ROUTES.find(r => r.id === routeId) || this.activeSaferRoute;
 if (!route) return;

 if (route.id === 'route-hawa-nahargarh') {
 this.addPlaceToItinerary('hawa-mahal', day);
 this.addPlaceToItinerary('nahargarh-fort', day);
 } else if (route.id === 'route-johari-amber') {
 this.addPlaceToItinerary('johari-bazaar', day);
 this.addPlaceToItinerary('amber-fort', day);
 }
 this.notify('itineraryUpdated');
 }

 get activeSaferRoute() {
 return SAFER_ROUTES.find(r => r.id === this.state.activeSaferRouteId) || SAFER_ROUTES[0];
 }

 get activeSaferOption() {
 const route = this.activeSaferRoute;
 return route?.options.find(o => o.id === this.state.activeSaferOptionId) || route?.options[0];
 }

 // =========================================================================
 // GAMIFICATION, SCORE & DEDICATED TRAVEL WRAPPED STATS
 // =========================================================================
 get explorationScore() {
 const visited = Array.from(this.state.visitedPlaceIds)
 .map(id => PLACES.find(p => p.id === id && p.destinationId === this.state.currentDestinationId))
 .filter(Boolean);

 if (visited.length === 0) return 20;

 const categoryCounts = {};
 for (const p of visited) {
 categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
 }

 const uniqueCats = Object.keys(categoryCounts).length;
 return Math.min(100, Math.round(visited.length * 15 + uniqueCats * 8 + 20));
 }

 get unlockedBadges() {
 const visited = Array.from(this.state.visitedPlaceIds)
 .map(id => PLACES.find(p => p.id === id))
 .filter(Boolean);

 const counts = {};
 for (const p of visited) {
 counts[p.category] = (counts[p.category] || 0) + 1;
 if (p.subcategories) {
 for (const sc of p.subcategories) {
 counts[sc] = (counts[sc] || 0) + 1;
 }
 }
 }

 const score = this.explorationScore;

 return BADGES.map(b => {
 let isUnlocked = false;
 if (b.thresholdScore && score >= b.thresholdScore) {
 isUnlocked = true;
 } else if (b.requiredCategory && (counts[b.requiredCategory] || 0) >= b.threshold) {
 isUnlocked = true;
 }
 return { ...b, isUnlocked };
 });
 }

 // Dedicated 11-Slide Travel Wrapped Data (Strava + Spotify Style)
 get wrappedData() {
 const dest = this.destination;
 const visited = Array.from(this.state.visitedPlaceIds)
 .map(id => PLACES.find(p => p.id === id))
 .filter(Boolean);
 
 const foodCount = visited.filter(p => p.category === 'food').length;
 const heritageCount = visited.filter(p => p.category === 'historical').length;
 const gemsCount = visited.filter(p => p.category === 'hidden-gems' || p.category === 'nature').length;
 const score = this.explorationScore;
 
 const archetype = WRAPPED_ARCHETYPES.find(a => score >= a.minScore) || WRAPPED_ARCHETYPES[0];
 const favPlace = PLACES.find(p => p.id === 'hawa-mahal') || PLACES[0];
 
 return {
 destination: dest.name,
 state: dest.state,
 year: 2026,
 score,
 distanceKm: 128, // Strava-Style Hero Statistic
 placesVisitedCount: Math.max(12, visited.length),
 tripsCompleted: 3,
 daysTravelled: 4,
 hiddenGemsCount: Math.max(5, gemsCount),
 reelsWatchedCount: 14,
 savedPlacesCount: this.state.savedPlaceIds.size,
 
 // Category Breakdown
 topCategory: {
 name: 'UNESCO Heritage & Forts',
 percentage: 48,
 breakdown: [
 { name: 'Heritage & Forts', pct: 48, color: '#1A365D' },
 { name: 'Local Cuisine', pct: 24, color: '#C05621' },
 { name: 'Hidden Stepwells', pct: 16, color: '#22543D' },
 { name: 'Nature & Treks', pct: 12, color: '#2B6CB0' }
 ]
 },

 // Travel Archetype
 archetype: {
 title: 'THE HERITAGE EXPLORER',
 badge: 'Verified Explorer Tier',
 description: 'A deep appreciation for 16th-century Mughal-Rajput architecture, geometric stepwells, and sunset hill fort ramparts.'
 },

 // Hidden Discoveries List
 hiddenDiscoveries: [
 { name: 'Panna Meena Ka Kund', tag: '8-Tier Stepwell', img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80' },
 { name: 'Maharani Ki Chhatri', tag: 'Marble Cenotaphs', img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
 { name: 'Hathni Kund Canyon', tag: 'Aravalli Trail', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }
 ],

 // Favorite Landmark
 favoritePlace: favPlace,

 // Longest Journey Day
 longestJourney: {
 title: 'Your Longest Day',
 km: 32,
 stopsCount: 5,
 hours: 8,
 corridor: 'Johari Bazaar → Amer Fort → Nahargarh Ridge',
 date: 'Day 2 of Jaipur Journey'
 },

 // Travel Map Stops
 travelMapStops: [
 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'LMB Restaurant', 'Panna Meena Kund', 'Amer Fort', 'Nahargarh Fort', 'Jal Mahal'
 ],

 // Memory Moments
 memoryMoments: [
 ' Golden sunrise light through 953 jharokhas at Hawa Mahal',
 ' Panoramic sunset overlooking the Pink City from Nahargarh ramparts',
 ' Traditional Pyaaz Kachori and Ghewar tasting at LMB Johari Bazaar',
 ' Exploring the symmetrical 8-tier stepwell at Panna Meena Ka Kund'
 ]
 };
 }

 showToast(message, type = 'info') {
 if (window.yatraApp && typeof window.yatraApp.showToast === 'function') {
 window.yatraApp.showToast(message, type);
 }
 }
}

export const store = new YatraStore();
window.yatraStore = store;
