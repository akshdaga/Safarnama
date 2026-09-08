# 🏛️ Yatra Jaipur • Tourism Intelligence Platform
### *SIH Edition: Smart Digital Public Service Tourism Platform*

[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)](https://github.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Design Standard](https://img.shields.io/badge/Design-tourism.gov.in%20Standard-orange)](https://tourism.gov.in)
[![Tech Stack](https://img.shields.io/badge/Tech-HTML5%20%7C%20Vanilla%20ES6%20%7C%20Leaflet%20GIS-blue)](https://leafletjs.com)

A unified digital tourism intelligence platform combining **verified cultural heritage archives**, **spatial GIS navigation**, **explainable AI itinerary planning**, **safety-aware corridor recommendations**, **dedicated hidden gems discovery**, **travel reels**, and a **11-slide Spotify/Strava-style Travel Wrapped**.

Designed to institutional government portal standards (`tourism.gov.in`) with zero monolithic dashboard clutter, high-contrast accessibility controls, and 100% reliable modal navigation.

---

## 🌟 Core Feature Highlights

### 1. ⚡ Travel Onboarding & Explainable Itinerary Wizard
- **Step 1: Destination Intent (`#onboarding-destination`)**:
  - Discover verified cultural regions starting with **Jaipur** (UNESCO Heritage City).
- **Step 2: Preference Customization (`#onboarding-preferences`)**:
  - Multi-select interest chips (*Heritage, Hidden Gems, Street Food, Nature, Photography, Bazaars, Cafes, Trekking*).
  - Duration selector (`1`, `2`, `3`, `Custom`), travel style (`🌿 Relaxed`, `⚖️ Balanced`, `⚡ Packed`), companions, and budget tiers.
- **Step 3: Explainable AI Itinerary (`#itinerary-result`)**:
  - **💡 Why this plan?** explainability box with corridor sequencing rationale and sunrise/sunset optimization.
  - Daily structured timeline cards with stop notes, instant map pinning, and one-click **"💾 Save to My Trips"**.

### 2. 🗺️ Spatial GIS & Safety-Aware Corridor Navigation
- **Interactive Full-Screen GIS Map (`#map`)**:
  - Clean spatial map powered by Leaflet.js with category-colored markers, pin preview bottom cards, GPS auto-centering, and satellite/street layer switching.
  - No obstructing center artwork or gray tile bugs.
- **Women Safety GIS Corridors (`#safer-route`)**:
  - Compare **Fastest** vs **Safety-Aware** routes.
  - Transparent **6-Factor Weighted Attribution**: *Street Lighting (25%), Police Booth Proximity (20%), Crowd Density (20%), CCTV Coverage (15%), Road Infrastructure (10%), Emergency Helpline (10%)*.
  - Direct 112 / 1090 emergency helpline integration.

### 3. 💎 Dedicated Hidden Jaipur (42 Verified Discoveries)
- Curated collection of 42 lesser-known historical sites (e.g. *Panna Meena Ka Kund, Maharani Ki Chhatri, Jagat Shiromani Temple, Hathni Kund Canyon, Gaitor Ki Chhatriyan*).
- Full provenance notes, opening windows, and photography.

### 4. ✨ 11-Slide Spotify + Strava Travel Wrapped (`#travel-wrapped`)
- **11 Curated Story Slides**:
  - **128 KM Travelled** with SVG radial distance progress ring.
  - **12 Heritage Landmarks** visited + **5 Hidden Stepwells** discovered.
  - Category breakdown (Archaeological Heritage 48%).
  - Favorite landmark & longest day route (Day 2: 42 KM from Hawa Mahal to Nahargarh).
  - **Travel Archetype Badge** (*"The Heritage Chronicler"* - Top 5% Explorer).
  - Shareable snapshot with **"📋 Copy Summary to Clipboard"**.

### 5. 🎬 Travel Reels & 🪄 AI Travel Assistant
- **Vertical Discovery Reels (`#reels`)**: High-definition cultural reels directly linked to spatial coordinates on the map.
- **RAG-Grounded AI Assistant (`#ai-assistant`)**: Conversational tourism intelligence with user travel memory and verified knowledge grounding.

### 6. 🏛️ Institutional UI Design (`tourism.gov.in` Style)
- **Top Utility Bar**: Runtime font scaling (`[A-] [A] [A+]`), bilingual switcher (`[English] [हिंदी]`), and search bar.
- **Header Tabs**: Clean active underline indicator matching public portal standards.
- **Hero Carousel**: 4-slide auto-rotating slider with pause/play controls (`⏸` / `▶`).
- **Live Announcements Ticker (`घोषणाएं`)**: Real-time ticker for heritage monument timings and advisories.
- **Universal Fix for All Modal Buttons**: 100% reliable `✕`, `Cancel`, `← Back`, backdrop click, and `Escape` key handlers.

---

## 📂 Project Structure

```
yatra-travel-platform/
├── index.html                   # Main application entry point & DOM view containers
├── README.md                    # Project documentation
├── .gitignore                   # Git ignore file
├── js/                          # Modular ES6 JavaScript architecture
│   ├── app.js                   # Main application controller, router & event bindings
│   ├── store.js                 # Central state manager, user memory & Wrapped data
│   ├── data.js                  # 24 Heritage POIs, 42 Hidden Gems, 2 Safety Corridors
│   ├── map.js                   # Leaflet GIS spatial engine & route rendering
│   ├── wrapped.js               # 11-slide Spotify/Strava Travel Wrapped story engine
│   ├── saferRoute.js            # 6-Factor Safety corridor comparison module
│   ├── itinerary.js             # Itinerary manager & daily timeline planner
│   ├── aiPlanner.js             # RAG-grounded AI conversational assistant
│   ├── reels.js                 # Vertical video reels discovery engine
│   ├── reviews.js               # Dual-perspective tourist community feedback
│   ├── weather.js               # Live weather conditions & optimal visiting hours
│   ├── documents.js             # Tourist monument passes & QR wallet
│   ├── gamification.js          # Heritage score, passport stamps & badges
│   ├── sound.js                 # UI audio feedback synthesis
│   └── confetti.js              # Canvas celebration animations
├── styles/                      # Pure Vanilla CSS Design System
│   ├── main.css                 # Core design tokens, typography & onboarding wizard
│   ├── map.css                  # GIS viewport, floating controls & preview cards
│   ├── sidebar.css              # Explorer sidebar, category chips & timeline feed
│   ├── modal.css                # Universal modal layout, auth & high-z close buttons
│   ├── wrapped.css              # Travel Wrapped 11-slide story styles & animations
│   ├── reels.css                # Vertical reels player styles
│   └── gamification.css         # Passport scorecards & badges
├── vendor/                      # Local vendor assets with CDN fallback
│   ├── leaflet.js               # Leaflet GIS core library
│   └── leaflet.css              # Leaflet GIS styling
└── assets/                      # Curated heritage photography and stickers
```

---

## 🚀 Quick Start Guide

### Prerequisites
No heavy frameworks, Node.js builds, or dependencies required! Runs in any modern browser via pure Vanilla ES6 Modules.

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/yatra-travel-platform.git
cd yatra-travel-platform
```

### 2. Run Local Development Server
Because ES6 modules require HTTP/HTTPS serving (due to CORS policy on `file://` URLs):

**Using Python 3:**
```bash
python3 -m http.server 3000
```

**Using Node.js (npx serve):**
```bash
npx serve -l 3000
```

**Using VS Code:**
Install the **Live Server** extension and click **"Go Live"**.

### 3. Open in Browser
Visit **`http://localhost:3000`** in your browser.

---

## 🧭 Direct Hash Route Sitemap

| Route | View Description |
| :--- | :--- |
| `/#landing` | Institutional Portal Landing Page, Hero Carousel & Announcements Ticker |
| `/#onboarding-destination` | Step 1: Destination Selection & Intent |
| `/#onboarding-preferences` | Step 2: Preference Customization (Interests, Pace, Duration, Budget) |
| `/#itinerary-result` | Step 3: Explainable AI Itinerary Result ("Why this plan?") |
| `/#explore` | Heritage Discovery Explorer with 24 POIs & Filter Chips |
| `/#map` | Full-Screen GIS Spatial Map with Leaflet |
| `/#hidden-jaipur` | 42 Verified Lesser-Known Heritage Discoveries & Stepwells |
| `/#safer-route` | Women Safety Corridors (Fastest vs Safety-Aware 6-Factor Attribution) |
| `/#trips` | My Trips Itinerary Manager & Timeline |
| `/#reels` | Travel Reels Discovery Engine |
| `/#ai-assistant` | RAG Tourism Intelligence Assistant |
| `/#travel-wrapped` | 11-Slide Spotify + Strava Travel Wrapped Story Experience |
| `/#profile` | Explorer Scorecard, Passport Stamps & Badges |

---

## 🧪 Verification & Quality Assurance

- **Zero Monolithic Dashboard**: Every section renders cleanly in dedicated views.
- **100% Dead-Button Free**: Tested across all `✕`, `Cancel`, `← Back`, backdrop clicks, and keyboard `Esc` shortcuts.
- **Pure Native Code**: 100% Vanilla JavaScript & CSS for blazing fast performance and zero bundle overhead.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
