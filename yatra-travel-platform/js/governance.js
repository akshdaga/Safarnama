// ==========================================================================
// YATRA TOURISM PLATFORM • GOVERNMENT DECISION SUPPORT & TOURISM INTELLIGENCE
// SIH 2026 Public Service Management Dashboard
// Tourism Pressure Modeling, Festival Surge Simulator & Opportunity Zones
// ==========================================================================

import { store } from './store.js';

export class GovernanceManager {
 constructor() {
 this.container = null;
 }

 init(containerId = 'governancePanel') {
 this.container = document.getElementById(containerId);
 this.render();

 store.subscribe((state, change) => {
 if (['pressureSimulation', 'complaints', 'destination', 'appView'].includes(change)) {
 this.render();
 }
 });
 }

 handleSurgeSelect(festivalType) {
 const currentVisitors = store.state.tourismPressureSimulation.additionalVisitors || 0;
 store.simulateSurge(currentVisitors, festivalType);
 }

 handleSliderChange(val) {
 const num = parseInt(val, 10) || 0;
 const currentEvent = store.state.tourismPressureSimulation.festivalType || 'standard';
 store.simulateSurge(num, currentEvent);
 }

 render() {
 if (!this.container) return;

 const sim = store.state.tourismPressureSimulation;
 const zones = store.pressureZones;
 const complaints = store.complaintsList;
 const dest = store.destination;

 const totalCapacity = zones.reduce((acc, z) => acc + z.carryingCapacity, 0);
 const totalCurrent = zones.reduce((acc, z) => acc + z.currentLoad, 0);
 const overallUtilization = Math.round((totalCurrent / totalCapacity) * 100);

 const highPressureCount = zones.filter(z => z.utilizationPercent >= 80).length;
 const opportunityCount = zones.filter(z => z.utilizationPercent <= 35).length;
 const addVisitors = sim.additionalVisitors || 0;

 // Computed Impact Metrics based on slider & event
 const trafficIndex = (2.2 + (sim.multiplier - 1) * 2.8).toFixed(1);
 const infraPressure = Math.min(98, Math.round(overallUtilization * 1.05));
 const redistributedCount = Math.round((totalCurrent * 0.15) + (addVisitors * 0.18));
 const pressureReduction = Math.min(35, Math.round(18 + (sim.multiplier - 1) * 16));
 const artisanBoost = Math.min(48, Math.round(22 + (sim.multiplier - 1) * 20));

 this.container.innerHTML = `
 <div class="gov-dashboard-wrapper">
 <!-- Government Header Bar -->
 <div class="gov-header-banner">
 <div class="gov-header-top">
 <div class="gov-emblem-wrap">
 <span class="gov-emblem-icon"></span>
 <div>
 <span class="gov-subtext">Department of Tourism • SIH 2026 Public Intelligence</span>
 <h2 class="gov-main-title">${dest.name} Tourism Intelligence & Destination Management</h2>
 </div>
 </div>
 <div class="gov-status-pills">
 <span class="gov-live-indicator"><span class="pulse-green"></span> Live GIS Telemetry</span>
 <span class="gov-portal-badge" style="background:#FEF3C7; color:#B45309; border:1px solid #FDE68A;">PROTOTYPE SIMULATION</span>
 </div>
 </div>
 <p class="gov-header-desc">
 Spatial carrying-capacity modeling, proactive festival crowd redistribution, opportunity zone analytics, and centralized tourist complaint tracking.
 </p>
 </div>

 <!-- High-Level KPI Strip -->
 <div class="gov-kpi-grid">
 <div class="gov-kpi-card">
 <div class="gk-top">
 <span class="gk-label">Real-Time Visitors</span>
 <span class="gk-icon"></span>
 </div>
 <div class="gk-value">${totalCurrent.toLocaleString()}</div>
 <div class="gk-sub">Municipal Carrying Capacity: ${totalCapacity.toLocaleString()} (${overallUtilization}%)</div>
 </div>

 <div class="gov-kpi-card ${highPressureCount > 0 ? 'alert-danger' : ''}">
 <div class="gk-top">
 <span class="gk-label">Overburdened Heritage Hotspots</span>
 <span class="gk-icon"></span>
 </div>
 <div class="gk-value">${highPressureCount} Hotspots</div>
 <div class="gk-sub">Walled City & Amer Ridge at peak capacity</div>
 </div>

 <div class="gov-kpi-card alert-opportunity">
 <div class="gk-top">
 <span class="gk-label">Opportunity Absorption Zones</span>
 <span class="gk-icon"></span>
 </div>
 <div class="gk-value">${opportunityCount} Zones</div>
 <div class="gk-sub">Bagru Artisan Cluster & Stepwell Circuit ready</div>
 </div>

 <div class="gov-kpi-card">
 <div class="gk-top">
 <span class="gk-label">Tourist Redressal Rate</span>
 <span class="gk-icon"></span>
 </div>
 <div class="gk-value">91.2%</div>
 <div class="gk-sub">Average Resolution Time: 38 minutes</div>
 </div>
 </div>

 <!-- Tourism Impact Simulator (Section 30 Requirement) -->
 <div class="gov-simulator-card" style="background: white; border: 2px solid var(--gov-blue); border-radius: 8px; padding: 20px; margin-bottom: 20px;">
 <div class="gsc-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
 <div>
 <span class="gsc-badge" style="background: #FEF3C7; color: #92400E; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 3px;">
 PROTOTYPE SIMULATION
 </span>
 <h3 class="gsc-title" style="font-size: 18px; font-weight: 800; color: var(--primary); margin-top: 4px;">
 Tourism Impact Simulator
 </h3>
 <p class="gsc-desc" style="font-size: 12.5px; color: var(--text-muted);">
 Simulate additional visitor volumes and festival periods to dynamically model hotspot saturation and test AI crowd redistribution.
 </p>
 </div>
 <div style="font-size: 12px; background: #F1F5F9; padding: 6px 12px; border-radius: 6px; font-weight: 700;">
 Simulated Influx: <strong style="color: var(--gov-blue); font-size: 14px;">+${addVisitors.toLocaleString()}</strong> visitors
 </div>
 </div>

 <!-- Simulator Dual Controls: Slider + Event Dropdown -->
 <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; background: #F8FAFC; padding: 14px; border-radius: 6px; border: 1px solid var(--border-subtle); margin-bottom: 16px;">
 <!-- Control 1: Additional Visitors Slider -->
 <div>
 <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
 <label style="font-size: 12px; font-weight: 800; color: var(--primary);">1. Additional Visitors (Slider):</label>
 <span style="font-size: 12px; font-weight: 800; color: var(--gov-blue);">${addVisitors.toLocaleString()}</span>
 </div>
 <input type="range" min="0" max="30000" step="5000" value="${addVisitors}" 
 style="width: 100%; cursor: pointer; accent-color: var(--gov-blue);"
 oninput="window.governanceManager.handleSliderChange(this.value)" />
 <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-muted); font-weight: 700; margin-top: 4px;">
 <span>0</span>
 <span>5,000</span>
 <span>10,000</span>
 <span>20,000</span>
 <span>30,000</span>
 </div>
 </div>

 <!-- Control 2: Event / Period Selector -->
 <div>
 <label style="font-size: 12px; font-weight: 800; color: var(--primary); display: block; margin-bottom: 6px;">
 2. Event / Period:
 </label>
 <select class="form-input" style="width: 100%; padding: 6px 10px; font-size: 12.5px;" onchange="window.governanceManager.handleSurgeSelect(this.value)">
 <option value="standard" ${sim.festivalType === 'standard' ? 'selected' : ''}> Standard Baseline Flow (1.0x)</option>
 <option value="weekend_surge" ${sim.festivalType === 'weekend_surge' ? 'selected' : ''}> Winter Peak Weekend (+25% Surge)</option>
 <option value="teej" ${sim.festivalType === 'teej' ? 'selected' : ''}> Teej / Gangaur Fair (+40% Surge)</option>
 <option value="diwali" ${sim.festivalType === 'diwali' ? 'selected' : ''}> Diwali Festival of Lights (+65% Surge)</option>
 </select>
 </div>
 </div>

 <!-- Dynamic Output Grid (5 Impact Pillars) -->
 <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 14px;">
 <div style="background: white; border: 1px solid var(--border-subtle); padding: 10px; border-radius: 6px;">
 <span style="font-size: 10.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Destination Pressure</span>
 <div style="font-size: 18px; font-weight: 800; color: ${overallUtilization >= 80 ? '#DC2626' : '#2563EB'}; margin-top: 2px;">
 ${overallUtilization}% Saturation
 </div>
 <small style="color: var(--text-muted); font-size: 10px;">${totalCurrent.toLocaleString()} active visitors</small>
 </div>

 <div style="background: white; border: 1px solid var(--border-subtle); padding: 10px; border-radius: 6px;">
 <span style="font-size: 10.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Traffic Pressure</span>
 <div style="font-size: 18px; font-weight: 800; color: #D97706; margin-top: 2px;">
 Level ${trafficIndex} / 5.0
 </div>
 <small style="color: var(--text-muted); font-size: 10px;">Old City feeder corridor</small>
 </div>

 <div style="background: white; border: 1px solid var(--border-subtle); padding: 10px; border-radius: 6px;">
 <span style="font-size: 10.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Hotspot Concentration</span>
 <div style="font-size: 18px; font-weight: 800; color: #DC2626; margin-top: 2px;">
 ${zones[0]?.utilizationPercent || 92}% Capacity
 </div>
 <small style="color: var(--text-muted); font-size: 10px;">Hawa Mahal & Amer ramparts</small>
 </div>

 <div style="background: white; border: 1px solid var(--border-subtle); padding: 10px; border-radius: 6px;">
 <span style="font-size: 10.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Infrastructure Pressure</span>
 <div style="font-size: 18px; font-weight: 800; color: var(--primary); margin-top: 2px;">
 ${infraPressure}% Utility
 </div>
 <small style="color: var(--text-muted); font-size: 10px;">Parking, water & EV charge</small>
 </div>

 <div style="background: white; border: 1px solid #86EFAC; padding: 10px; border-radius: 6px; background: #F0FDF4;">
 <span style="font-size: 10.5px; font-weight: 700; color: #166534; text-transform: uppercase;">Alternative Opportunity</span>
 <div style="font-size: 18px; font-weight: 800; color: #166534; margin-top: 2px;">
 Ready to Absorb
 </div>
 <small style="color: #15803D; font-size: 10px;">Bagru, Panna Meena & Cenotaphs</small>
 </div>
 </div>

 <!-- Potential Redistribution Intelligence Banner -->
 <div style="background: #EFF6FF; border: 1.5px solid #93C5FD; border-radius: 6px; padding: 14px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
 <div style="flex: 1; min-width: 260px;">
 <strong style="color: #1E40AF; font-size: 13.5px; display: block;">
 Potential Redistribution Model (Redirect 15% - 20%):
 </strong>
 <p style="font-size: 12px; color: #1E3A8A; margin-top: 3px; line-height: 1.4;">
 Redirecting <strong>${redistributedCount.toLocaleString()} visitors</strong> from central Walled City to Bagru Block-Printing Hub and Maharani Ki Chhatri lowers core saturation while distributing artisan revenue.
 </p>
 </div>
 <div style="display: flex; gap: 14px;">
 <div style="text-align: center; background: white; padding: 6px 12px; border-radius: 4px; border: 1px solid #BFDBFE;">
 <span style="font-size: 18px; font-weight: 900; color: #059669;">-${pressureReduction}%</span>
 <small style="display: block; font-size: 10px; color: var(--text-muted); font-weight: 700;">Pressure Reduction</small>
 </div>
 <div style="text-align: center; background: white; padding: 6px 12px; border-radius: 4px; border: 1px solid #BFDBFE;">
 <span style="font-size: 18px; font-weight: 900; color: #2563EB;">+${artisanBoost}%</span>
 <small style="display: block; font-size: 10px; color: var(--text-muted); font-weight: 700;">Artisan Economic Boost</small>
 </div>
 </div>
 </div>
 </div>

 <!-- Spatial Tourism Pressure Zones Grid -->
 <div class="gov-zones-section">
 <div class="gz-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
 <div>
 <h3 class="gz-title" style="font-size: 16px; font-weight: 800; color: var(--primary);">Spatial Tourism Pressure & Capacity Zones</h3>
 <span class="gz-sub" style="font-size: 12px; color: var(--text-muted);">Monitored via IoT parking telemetry, turnstiles, and ticket counters</span>
 </div>
 <button type="button" class="btn btn-sm btn-outline" onclick="window.location.hash='#map'">
 View on GIS Map
 </button>
 </div>

 <div class="gz-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px;">
 ${zones.map(z => `
 <div class="gz-card ${z.statusClass}" style="background: white; border: 1px solid var(--border-subtle); border-radius: 6px; padding: 14px;">
 <div class="gzc-top" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
 <div>
 <h4 class="gzc-name" style="font-size: 14px; font-weight: 800; color: var(--primary);">${z.name}</h4>
 <span class="gzc-hours" style="font-size: 11px; color: var(--text-muted);">Peak Window: ${z.peakHours}</span>
 </div>
 <span class="gzc-status-badge ${z.statusClass}" style="font-size: 10.5px; font-weight: 800; padding: 2px 6px; border-radius: 3px;">${z.status}</span>
 </div>

 <div class="gzc-progress-wrap" style="margin: 10px 0;">
 <div class="gzc-metrics-row" style="display: flex; justify-content: space-between; font-size: 11.5px; margin-bottom: 4px;">
 <span>Load: <strong>${z.currentLoad.toLocaleString()}</strong></span>
 <span>Cap: <strong>${z.carryingCapacity.toLocaleString()}</strong></span>
 </div>
 <div class="gzc-bar-bg" style="height: 6px; background: #E2E8F0; border-radius: 3px; overflow: hidden;">
 <div class="gzc-bar-fill ${z.utilizationPercent >= 80 ? 'fill-red' : z.utilizationPercent <= 35 ? 'fill-green' : 'fill-blue'}" 
 style="width: ${Math.min(100, z.utilizationPercent)}%; height: 100%; background: ${z.utilizationPercent >= 80 ? '#EF4444' : z.utilizationPercent <= 35 ? '#10B981' : '#3B82F6'};"></div>
 </div>
 <div class="gzc-pct-label" style="font-size: 10.5px; color: var(--text-muted); text-align: right; margin-top: 2px;">
 ${z.utilizationPercent}% of carrying capacity
 </div>
 </div>

 <div class="gzc-mitigation-box" style="background: #F8FAFC; padding: 8px; border-radius: 4px; border-left: 3px solid var(--gov-blue); font-size: 11px;">
 <strong style="color: var(--primary);">Stewardship Action:</strong>
 <p style="color: var(--text-muted); margin-top: 2px;">${z.mitigationStrategy}</p>
 </div>
 </div>
 `).join('')}
 </div>
 </div>

 <!-- Centralized Tourist Complaints & Civic Intelligence -->
 <div class="gov-complaints-section" style="margin-top: 24px;">
 <div class="gc-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
 <div>
 <h3 class="gc-title" style="font-size: 16px; font-weight: 800; color: var(--primary);">Centralized Tourist Complaint Intelligence</h3>
 <p class="gc-sub" style="font-size: 12px; color: var(--text-muted);">Real-time grievances processed via AI sentiment classifier and routed to nodal district cells</p>
 </div>
 <button class="btn btn-sm btn-primary" onclick="window.location.hash='#complaint-box'">
 + Lodge New Grievance
 </button>
 </div>

 <div class="gc-table-wrap" style="background: white; border: 1px solid var(--border-bold); border-radius: 6px; overflow-x: auto;">
 <table class="gov-intel-table" style="width: 100%; border-collapse: collapse; font-size: 12px;">
 <thead>
 <tr style="background: #F1F5F9; border-bottom: 1px solid var(--border-bold); text-align: left;">
 <th style="padding: 10px 12px;">Token ID</th>
 <th style="padding: 10px 12px;">AI Category Classification</th>
 <th style="padding: 10px 12px;">Location</th>
 <th style="padding: 10px 12px;">Incident Description</th>
 <th style="padding: 10px 12px;">Urgency</th>
 <th style="padding: 10px 12px;">Status</th>
 </tr>
 </thead>
 <tbody>
 ${complaints.map(c => `
 <tr style="border-bottom: 1px solid var(--border-subtle);">
 <td style="padding: 10px 12px;"><code>${c.ticketId}</code></td>
 <td style="padding: 10px 12px;"><strong>${c.categoryLabel}</strong></td>
 <td style="padding: 10px 12px;">${c.location}</td>
 <td style="padding: 10px 12px; max-width: 280px; line-height: 1.35;">${c.description}</td>
 <td style="padding: 10px 12px;">
 <span style="font-size: 10.5px; font-weight: 800; padding: 2px 6px; border-radius: 3px; background: ${c.urgency === 'High' ? '#FEE2E2; color:#991B1B;' : '#FEF3C7; color:#92400E;'}">
 ${c.urgency || 'Medium'}
 </span>
 </td>
 <td style="padding: 10px 12px;"><span class="badge ${c.statusBadge}">${c.status}</span></td>
 </tr>
 `).join('')}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 `;
 }
}

export const governanceManager = new GovernanceManager();
window.governanceManager = governanceManager;
