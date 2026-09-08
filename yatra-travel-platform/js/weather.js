// Yatra Weather Intelligence, Destination Conditions & Natural Hazard Alerts
import { store } from './store.js';
import { PLACES } from './data.js';

export class WeatherManager {
 constructor() {
 this.container = null;
 }

 init(containerId = 'weatherPanel') {
 this.container = document.getElementById(containerId);
 this.render();

 store.subscribe((state, change) => {
 if (['destination', 'view'].includes(change)) {
 this.render();
 }
 });
 }

 render() {
 if (!this.container) return;
 const dest = store.destination;
 const w = dest.weather;
 const alerts = dest.hazardAlerts || [];

 // Filter nature and outdoor places with active conditions
 const outdoorPlaces = store.places.filter(p => p.conditions && (p.category === 'nature' || p.category === 'trekking' || p.category === 'adventure' || p.id === 'hathni-kund'));

 this.container.innerHTML = `
 <div class="weather-panel-inner">
 <!-- Safety Alert Banners if any -->
 ${alerts.length > 0 ? `
 <div class="safety-alerts-wrapper">
 ${alerts.map(a => `
 <div class="safety-alert-card ${a.type}">
 <div class="alert-icon-col"></div>
 <div class="alert-content-col">
 <div class="alert-header">
 <strong>${a.title}</strong>
 <span class="severity-badge">${a.severity}</span>
 </div>
 <p class="alert-text">${a.description}</p>
 <div class="alert-source">Source: ${a.source}</div>
 </div>
 </div>
 `).join('')}
 </div>
 ` : ''}

 <!-- Current Live Weather Card -->
 <div class="current-weather-hero">
 <div class="cwh-left">
 <div class="cwh-temp-row">
 <span class="cwh-temp">${w.temp}°C</span>
 <span class="cwh-icon">${w.icon}</span>
 </div>
 <div class="cwh-condition">${w.condition}</div>
 <div class="cwh-feels">Feels like ${w.feelsLike}°C • UV Index: ${w.uvIndex}</div>
 </div>
 <div class="cwh-avatar-side">
 <div class="weather-mascot-avatar">
 <span class="mascot-face"></span>
 <div class="mascot-bubble">Stay hydrated under the pink city sun!</div>
 </div>
 </div>
 </div>

 <!-- Weather Stats Grid -->
 <div class="weather-stats-grid">
 <div class="w-stat-card">
 <span class="stat-icon"></span>
 <span class="stat-label">Humidity</span>
 <span class="stat-val">${w.humidity}</span>
 </div>
 <div class="w-stat-card">
 <span class="stat-icon"></span>
 <span class="stat-label">Rain Chance</span>
 <span class="stat-val">${w.rainProb}</span>
 </div>
 <div class="w-stat-card">
 <span class="stat-icon"></span>
 <span class="stat-label">Wind</span>
 <span class="stat-val">${w.wind}</span>
 </div>
 <div class="w-stat-card">
 <span class="stat-icon"></span>
 <span class="stat-label">Visibility</span>
 <span class="stat-val">${w.visibility}</span>
 </div>
 </div>

 <!-- Hourly Forecast Slider -->
 <div class="weather-section-title">Hourly Forecast</div>
 <div class="hourly-forecast-row">
 ${w.forecast.map(h => `
 <div class="hourly-item">
 <span class="h-time">${h.time}</span>
 <span class="h-icon">${h.icon}</span>
 <span class="h-temp">${h.temp}°</span>
 </div>
 `).join('')}
 </div>

 <!-- Destination Conditions (Waterfalls, Treks, Trail Safety) -->
 <div class="weather-section-title mt-4">
 <span> Destination & Trail Conditions</span>
 <span class="badge-live">LIVE UPDATES</span>
 </div>

 <div class="destination-conditions-list">
 <!-- Hathni Kund Waterfall Live Status -->
 <div class="condition-card special-waterfall">
 <div class="cond-header">
 <div class="cond-title">
 <span class="cond-icon"></span>
 <div>
 <strong>Hathni Kund Waterfall</strong>
 <div class="cond-sub">Aravalli Mountain Gorge Trail</div>
 </div>
 </div>
 <span class="flow-status active">ACTIVE (Moderate Flow)</span>
 </div>
 <div class="cond-details">
 <div class="cond-metric">
 <span class="cm-label">Flow Level:</span>
 <span class="cm-val text-success">Cascading (18mm recent rainfall)</span>
 </div>
 <div class="cond-metric">
 <span class="cm-label">Trail Status:</span>
 <span class="cm-val">Open (Dry rocks with shaded patches)</span>
 </div>
 <div class="cond-metric">
 <span class="cm-label">Safety Advice:</span>
 <span class="cm-val">Sturdy footwear required. Return before dusk.</span>
 </div>
 </div>
 <button class="btn btn-xs btn-outline mt-2" onclick="window.yatraApp.focusPlaceOnMap('hathni-kund')">
 View on Map ➔
 </button>
 </div>

 <!-- Nahargarh Clifftop Ramparts -->
 <div class="condition-card">
 <div class="cond-header">
 <div class="cond-title">
 <span class="cond-icon"></span>
 <div>
 <strong>Nahargarh Clifftop & Ramparts</strong>
 <div class="cond-sub">High Elevation Viewpoint</div>
 </div>
 </div>
 <span class="flow-status open">OPEN TILL 9 PM</span>
 </div>
 <div class="cond-details">
 <div class="cond-metric">
 <span class="cm-label">Wind Index:</span>
 <span class="cm-val">Moderate gusts (Hold onto loose accessories)</span>
 </div>
 <div class="cond-metric">
 <span class="cm-label">Sunset Visibility:</span>
 <span class="cm-val text-success">Excellent 360° Clear Skies</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 `;
 }
}

export const weatherManager = new WeatherManager();
