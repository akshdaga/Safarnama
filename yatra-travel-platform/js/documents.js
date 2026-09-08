// Yatra Travel Documents & Official Requirements
import { store } from './store.js';

export class DocumentsManager {
 constructor() {
 this.container = null;
 }

 init(containerId = 'documentsPanel') {
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
 const docs = dest.documents || { required: [], recommended: [], conditional: [] };

 this.container.innerHTML = `
 <div class="documents-panel-inner">
 <div class="docs-hero-banner">
 <span class="docs-icon"></span>
 <div>
 <h3>Travel Documents & Entry Requirements</h3>
 <p class="docs-sub">Verified travel guidelines for visiting ${dest.name}, ${dest.state}.</p>
 </div>
 </div>

 <div class="official-notice-alert">
 <strong>ℹ️ Traveler Notice:</strong> We do not collect or store your sensitive personal identity documents. Always carry original government-issued photo IDs and verify current rules with official state authorities.
 </div>

 <!-- Section 1: Required -->
 <div class="docs-category-group">
 <div class="docs-group-header required">
 <span class="status-indicator red"></span>
 <h4>1. Mandatory / Required Documents</h4>
 </div>
 <div class="docs-items-list">
 ${docs.required.length === 0 ? '<p class="text-muted">Standard government ID required.</p>' : docs.required.map(d => `
 <div class="doc-card">
 <div class="doc-title-row">
 <span class="doc-bullet"></span>
 <strong>${d.title}</strong>
 </div>
 <p class="doc-details">${d.details}</p>
 ${d.authority ? `<div class="doc-auth">Issued/Governed by: <em>${d.authority}</em></div>` : ''}
 ${d.officialLink ? `<a href="${d.officialLink}" target="_blank" class="doc-link">Official Portal ↗</a>` : ''}
 </div>
 `).join('')}
 </div>
 </div>

 <!-- Section 2: Recommended -->
 <div class="docs-category-group">
 <div class="docs-group-header recommended">
 <span class="status-indicator green"></span>
 <h4>2. Recommended Passes & Discounts</h4>
 </div>
 <div class="docs-items-list">
 ${docs.recommended.length === 0 ? '<p class="text-muted">No specific passes recommended.</p>' : docs.recommended.map(d => `
 <div class="doc-card">
 <div class="doc-title-row">
 <span class="doc-bullet"></span>
 <strong>${d.title}</strong>
 </div>
 <p class="doc-details">${d.details}</p>
 ${d.officialLink ? `<a href="${d.officialLink}" target="_blank" class="doc-link">Book Pass / Learn More ↗</a>` : ''}
 </div>
 `).join('')}
 </div>
 </div>

 <!-- Section 3: Situation-Dependent -->
 <div class="docs-category-group">
 <div class="docs-group-header conditional">
 <span class="status-indicator amber"></span>
 <h4>3. Situation-Dependent Permits</h4>
 </div>
 <div class="docs-items-list">
 ${docs.conditional.length === 0 ? '<p class="text-muted">No additional permits required for regular sightseeing.</p>' : docs.conditional.map(d => `
 <div class="doc-card">
 <div class="doc-title-row">
 <span class="doc-bullet"></span>
 <strong>${d.title}</strong>
 </div>
 <p class="doc-details">${d.details}</p>
 ${d.authority ? `<div class="doc-auth">Authority: <em>${d.authority}</em></div>` : ''}
 </div>
 `).join('')}
 </div>
 </div>
 </div>
 `;
 }
}

export const documentsManager = new DocumentsManager();
