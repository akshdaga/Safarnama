// Yatra Travel Platform - Multi-City Tourism Intelligence Data
export const DESTINATIONS = {
 jaipur: {
 id: 'jaipur',
 name: 'Jaipur',
 state: 'Rajasthan',
 country: 'India',
 isFlagshipDemo: true,
 tagline: 'The Pink City of Royalty, Palaces & Living Artisan Bazaars',
 coordinates: [26.9124, 75.7873],
 zoom: 13,
 heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
 pressureLevel: 'high',
 currentVisitorCount: 48200,
 capacityLimit: 60000,
 peakCongestionHours: '11:00 AM - 04:30 PM',
 opportunityZones: ['Bagru Artisan Corridor', 'Amer Stepwell Circuit', 'Sambhar Salt Lake Zone'],
 bestSeason: 'October – March',
 weather: {
 temp: 32,
 condition: 'Sunny & Warm',
 icon: '',
 feelsLike: 34,
 rainProb: '8%',
 wind: '12 km/h NW',
 humidity: '38%',
 uvIndex: '8 (Very High)',
 visibility: '10 km',
 forecast: [
 { time: '09:00', temp: 28, icon: '' },
 { time: '12:00', temp: 33, icon: '' },
 { time: '15:00', temp: 35, icon: '' },
 { time: '18:00', temp: 31, icon: '' },
 { time: '21:00', temp: 27, icon: '' },
 { time: '00:00', temp: 25, icon: '' }
 ],
 weekly: [
 { day: 'Mon', high: 34, low: 24, icon: '' },
 { day: 'Tue', high: 35, low: 25, icon: '' },
 { day: 'Wed', high: 33, low: 24, icon: '' },
 { day: 'Thu', high: 32, low: 23, icon: '' },
 { day: 'Fri', high: 34, low: 24, icon: '' },
 { day: 'Sat', high: 36, low: 25, icon: '' },
 { day: 'Sun', high: 35, low: 25, icon: '' }
 ]
 },
 hazardAlerts: [
 {
 id: 'h1',
 type: 'warning',
 title: 'High Afternoon Heat Index (36°C - 38°C)',
 description: 'Midday sun is intense. We recommend visiting open forts (Amber, Nahargarh) between 7:30-10:30 AM or 4:30-6:30 PM. Stay hydrated and carry sunscreen.',
 severity: 'Moderate',
 affectedLocations: ['amber-fort', 'nahargarh-fort', 'jaigarh-fort'],
 source: 'Rajasthan State Meteorological Centre'
 },
 {
 id: 'h2',
 type: 'info',
 title: 'Festival Crowd Advisory in Walled City',
 description: 'Bazaars near Johari and Bapu Bazaar experience high pedestrian traffic from 5:00 PM to 8:30 PM. Walking or e-rickshaw is recommended over cabs.',
 severity: 'Low',
 affectedLocations: ['johari-bazaar', 'hawa-mahal'],
 source: 'Jaipur Smart City Traffic Police'
 }
 ],
 documents: {
 required: [
 {
 title: 'Government-Issued Photo ID',
 details: 'Aadhaar Card, Passport, Voter ID, or Driving License. Required for all monument entry tickets, fort passes, and hotel check-ins.',
 authority: 'Ministry of Tourism & Archeological Survey of India (ASI)'
 },
 {
 title: 'Valid Visa & Passport (Foreign Travelers)',
 details: 'Original passport with valid Indian Tourist Visa or e-Visa printout. Retain entry stamp slip.',
 authority: 'Bureau of Immigration, Govt. of India'
 }
 ],
 recommended: [
 {
 title: 'ASI Composite Monument Pass',
 details: 'Saves 40% on entry fees for Amber Fort, Albert Hall, Hawa Mahal, Jantar Mantar, and Nahargarh Fort. Valid for 2 consecutive days.',
 officialLink: 'https://asi.nic.in'
 },
 {
 title: 'Student ID Card (with Valid Expiry)',
 details: 'Provides 50% discount at most government museums, palace complexes, and observatories.',
 authority: 'Rajasthan State Archaeology Dept.'
 }
 ],
 conditional: [
 {
 title: 'Commercial Tripod / Drone Aerial Photography Permit',
 details: 'Drones are strictly prohibited around heritage monuments and within 5 km of Jaipur Airport without prior written clearance from DGCA & Police Commissioner.',
 authority: 'DGCA & Jaipur Police'
 }
 ]
 }
 },
 udaipur: {
 id: 'udaipur',
 name: 'Udaipur',
 state: 'Rajasthan',
 country: 'India',
 isFlagshipDemo: false,
 tagline: 'City of Lakes, Royal Palaces & Romantic Sunsets',
 coordinates: [24.5854, 73.7125],
 zoom: 13,
 heroImage: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1600&q=80',
 pressureLevel: 'moderate',
 currentVisitorCount: 26400,
 capacityLimit: 40000,
 peakCongestionHours: '04:00 PM - 07:30 PM (Ghats & Jetties)',
 opportunityZones: ['Ahar Cenotaphs Eco-Trail', 'Shilpgram Craft Village'],
 bestSeason: 'September – March',
 weather: {
 temp: 29,
 condition: 'Pleasant & Breezy',
 icon: '',
 feelsLike: 30,
 rainProb: '12%',
 wind: '14 km/h W',
 humidity: '46%',
 uvIndex: '7',
 visibility: '10 km',
 forecast: [
 { time: '09:00', temp: 26, icon: '' },
 { time: '12:00', temp: 30, icon: '' },
 { time: '15:00', temp: 31, icon: '' },
 { time: '18:00', temp: 28, icon: '' },
 { time: '21:00', temp: 25, icon: '' },
 { time: '00:00', temp: 23, icon: '' }
 ]
 },
 hazardAlerts: [
 {
 id: 'u1',
 type: 'info',
 title: 'Evening Lake Pichola Boat Restrictions',
 description: 'Sunset boat rides reach peak capacity by 4:30 PM. Advance booking at City Palace Jetty recommended.',
 severity: 'Low',
 affectedLocations: [],
 source: 'Udaipur Tourism Board'
 }
 ],
 documents: {
 required: [
 { title: 'Valid Photo ID', details: 'Aadhaar / Passport for boat jetty and palace entry.' }
 ],
 recommended: [
 { title: 'Online City Palace Ticket', details: 'Avoid long queues at the main ticket counter.' }
 ],
 conditional: []
 }
 },
 jodhpur: {
 id: 'jodhpur',
 name: 'Jodhpur',
 state: 'Rajasthan',
 country: 'India',
 isFlagshipDemo: false,
 tagline: 'The Blue City & Imposing Mehrangarh Citadel',
 coordinates: [26.2389, 73.0243],
 zoom: 13,
 heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=80',
 pressureLevel: 'moderate',
 currentVisitorCount: 19800,
 capacityLimit: 35000,
 peakCongestionHours: '10:30 AM - 03:30 PM',
 opportunityZones: ['Mandore Gardens Heritage Trail', 'Osian Desert Temples'],
 bestSeason: 'October – March',
 weather: {
 temp: 33,
 condition: 'Sunny & Dry',
 icon: '',
 feelsLike: 34,
 rainProb: '4%',
 wind: '10 km/h W',
 humidity: '28%',
 uvIndex: '8',
 visibility: '10 km',
 forecast: [
 { time: '09:00', temp: 28, icon: '' },
 { time: '12:00', temp: 33, icon: '' },
 { time: '15:00', temp: 34, icon: '' },
 { time: '18:00', temp: 30, icon: '' }
 ]
 },
 hazardAlerts: [],
 documents: { required: [{ title: 'Photo ID', details: 'Mandatory for Mehrangarh Fort entry' }], recommended: [], conditional: [] }
 },
 delhi: {
 id: 'delhi',
 name: 'Delhi',
 state: 'Delhi NCR',
 country: 'India',
 isFlagshipDemo: false,
 tagline: 'Historic Capital of Empires, Tombs & Vibrant Street Food',
 coordinates: [28.6139, 77.2090],
 zoom: 12,
 heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80',
 pressureLevel: 'high',
 currentVisitorCount: 84000,
 capacityLimit: 120000,
 peakCongestionHours: '01:00 PM - 06:00 PM',
 opportunityZones: ['Mehrauli Archaeological Park', 'Sunder Nursery Ecological Zone'],
 bestSeason: 'October – March',
 weather: {
 temp: 28,
 condition: 'Clear Sky',
 icon: '',
 feelsLike: 29,
 rainProb: '10%',
 wind: '10 km/h E',
 humidity: '50%',
 uvIndex: '6',
 visibility: '6 km',
 forecast: [{ time: '09:00', temp: 24, icon: '' }, { time: '14:00', temp: 29, icon: '' }]
 },
 hazardAlerts: [],
 documents: { required: [{ title: 'Photo ID', details: 'Required for Red Fort & Qutub Minar entry' }], recommended: [], conditional: [] }
 },
 agra: {
 id: 'agra',
 name: 'Agra',
 state: 'Uttar Pradesh',
 country: 'India',
 isFlagshipDemo: false,
 tagline: 'Home of the Taj Mahal & Mughal Architectural Splendour',
 coordinates: [27.1767, 78.0081],
 zoom: 13,
 heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
 pressureLevel: 'high',
 currentVisitorCount: 52000,
 capacityLimit: 65000,
 peakCongestionHours: '09:00 AM - 04:00 PM (Taj Mahal East/West Gates)',
 opportunityZones: ['Mehtab Bagh Sunset Vantage', 'Fatehpur Sikri Royal Corridor'],
 bestSeason: 'October – March',
 weather: {
 temp: 31,
 condition: 'Sunny',
 icon: '',
 feelsLike: 33,
 rainProb: '5%',
 wind: '8 km/h NW',
 humidity: '42%',
 uvIndex: '7',
 visibility: '8 km',
 forecast: [{ time: '09:00', temp: 26, icon: '' }, { time: '15:00', temp: 32, icon: '' }]
 },
 hazardAlerts: [],
 documents: { required: [{ title: 'Online Monument Ticket', details: 'Mandatory QR ticket from ASI portal for Taj Mahal' }], recommended: [], conditional: [] }
 },
 varanasi: {
 id: 'varanasi',
 name: 'Varanasi',
 state: 'Uttar Pradesh',
 country: 'India',
 isFlagshipDemo: false,
 tagline: 'Timeless Spiritual Ghats on the Holy Ganges River',
 coordinates: [25.3176, 82.9739],
 zoom: 13,
 heroImage: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1600&q=80',
 pressureLevel: 'high',
 currentVisitorCount: 61000,
 capacityLimit: 75000,
 peakCongestionHours: '05:30 PM - 08:30 PM (Dashashwamedh Ghat Aarti)',
 opportunityZones: ['Sarnath Buddhist Heritage Circuit', 'Ramnagar Fort & Riverfront Trail'],
 bestSeason: 'October – March',
 weather: {
 temp: 30,
 condition: 'Breezy & Spiritual',
 icon: '',
 feelsLike: 32,
 rainProb: '10%',
 wind: '9 km/h NE',
 humidity: '52%',
 uvIndex: '7',
 visibility: '9 km',
 forecast: [{ time: '09:00', temp: 26, icon: '' }, { time: '18:00', temp: 28, icon: '' }]
 },
 hazardAlerts: [],
 documents: { required: [{ title: 'Photo ID', details: 'Required for temple queue management' }], recommended: [], conditional: [] }
 },
 goa: {
 id: 'goa',
 name: 'Goa',
 state: 'Goa',
 country: 'India',
 isFlagshipDemo: false,
 tagline: 'Sun-kissed Beaches, Portuguese Quarters & Coastal Flavors',
 coordinates: [15.2993, 74.1240],
 zoom: 12,
 heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80',
 pressureLevel: 'moderate',
 currentVisitorCount: 38000,
 capacityLimit: 70000,
 peakCongestionHours: '04:00 PM - 09:00 PM (North Coast Beaches)',
 opportunityZones: ['Divar Island Heritage Trail', 'Netravali Eco-Tourism Sanctuary'],
 bestSeason: 'November – February',
 weather: {
 temp: 31,
 condition: 'Tropical Coastal Breeze',
 icon: '',
 feelsLike: 35,
 rainProb: '15%',
 wind: '18 km/h SW',
 humidity: '72%',
 uvIndex: '9',
 visibility: '10 km',
 forecast: [{ time: '09:00', temp: 28, icon: '' }, { time: '18:00', temp: 29, icon: '' }]
 },
 hazardAlerts: [{ id: 'g1', type: 'info', title: 'High Tide Flags', description: 'Swim only between lifeguard zones.', severity: 'Low', affectedLocations: [], source: 'Drishti Marine' }],
 documents: { required: [{ title: 'Driving License', details: 'Mandatory for 2-wheeler scooter and car rentals.' }], recommended: [], conditional: [] }
 },
 kerala: {
 id: 'kerala',
 name: 'Kerala',
 state: 'Kerala',
 country: 'India',
 isFlagshipDemo: false,
 tagline: 'God’s Own Country: Tranquil Backwaters & Lush Tea Estates',
 coordinates: [9.9312, 76.2673],
 zoom: 12,
 heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80',
 pressureLevel: 'low',
 currentVisitorCount: 22000,
 capacityLimit: 55000,
 peakCongestionHours: '02:00 PM - 06:00 PM',
 opportunityZones: ['Kumarakom Bird Sanctuary Backwater Trail', 'Marari Sustainable Fisher Village'],
 bestSeason: 'September – March',
 weather: {
 temp: 29,
 condition: 'Tropical & Lush',
 icon: '',
 feelsLike: 32,
 rainProb: '20%',
 wind: '12 km/h W',
 humidity: '68%',
 uvIndex: '8',
 visibility: '10 km',
 forecast: [{ time: '09:00', temp: 27, icon: '' }, { time: '17:00', temp: 28, icon: '' }]
 },
 hazardAlerts: [],
 documents: { required: [{ title: 'Photo ID', details: 'Required for Houseboat check-in' }], recommended: [], conditional: [] }
 },
 manali: {
 id: 'manali',
 name: 'Manali',
 state: 'Himachal Pradesh',
 country: 'India',
 isFlagshipDemo: false,
 tagline: 'Snowy Peaks, Pine Forests & Himalayan Adventures',
 coordinates: [32.2396, 77.1887],
 zoom: 13,
 heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80',
 pressureLevel: 'moderate',
 currentVisitorCount: 16000,
 capacityLimit: 30000,
 peakCongestionHours: '10:00 AM - 03:00 PM (Solang & Rohtang)',
 opportunityZones: ['Naggar Heritage Castle Circuit', 'Old Manali Apple Orchard Trail'],
 bestSeason: 'October – June',
 weather: {
 temp: 16,
 condition: 'Crisp Mountain Breeze',
 icon: '',
 feelsLike: 15,
 rainProb: '25%',
 wind: '8 km/h N',
 humidity: '55%',
 uvIndex: '5',
 visibility: '12 km',
 forecast: [{ time: '09:00', temp: 14, icon: '' }, { time: '15:00', temp: 17, icon: '' }]
 },
 hazardAlerts: [],
 documents: { required: [{ title: 'Rohtang Pass Green Permit', details: 'Mandatory online permit for Rohtang Pass.', officialLink: 'https://rohtangpermits.nic.in' }], recommended: [], conditional: [] }
 }
};

export const CATEGORIES = [
 { id: 'historical', name: 'Historical', icon: '', color: '#D97706' },
 { id: 'food', name: 'Food & Dining', icon: '', color: '#EF4444' },
 { id: 'culture', name: 'Artists & Culture', icon: '', color: '#8B5CF6' },
 { id: 'nature', name: 'Nature & Parks', icon: '', color: '#10B981' },
 { id: 'adventure', name: 'Adventure', icon: '', color: '#F59E0B' },
 { id: 'cafes', name: 'Cafés', icon: '', color: '#B45309' },
 { id: 'shopping', name: 'Shopping & Bazaars', icon: '', color: '#EC4899' },
 { id: 'hidden-gems', name: 'Hidden Gems', icon: '', color: '#6366F1' },
 { id: 'spiritual', name: 'Spiritual', icon: '', color: '#F97316' },
 { id: 'nightlife', name: 'Nightlife', icon: '', color: '#A855F7' },
 { id: 'trekking', name: 'Trekking & Trails', icon: '', color: '#059669' },
 { id: 'instagrammable', name: 'Instagrammable', icon: '', color: '#E11D48' },
 { id: 'family', name: 'Family Friendly', icon: '', color: '#3B82F6' },
 { id: 'couple', name: 'Couple & Romantic', icon: '', color: '#F43F5E' },
 { id: 'budget', name: 'Budget Travel', icon: '', color: '#14B8A6' }
];

export const PLACES = [
 {
 id: 'hawa-mahal',
 destinationId: 'jaipur',
 name: 'Hawa Mahal (Palace of Winds)',
 category: 'historical',
 subcategories: ['instagrammable', 'culture', 'couple'],
 coordinates: [26.9239, 75.8267],
 rating: 4.8,
 reviewsCount: 14280,
 priceLevel: '₹',
 entryFee: '₹50 (Indian), ₹200 (Foreigner), ₹25 (Student)',
 openingHours: '9:00 AM – 5:00 PM (Daily)',
 bestTime: 'Morning 8:30 AM to 10:00 AM for golden facade illumination',
 avgDuration: '45–60 mins',
 shortDesc: 'Iconic 5-story honeycomb pink sandstone palace with 953 jharokhas designed for royal women to observe street life without being seen.',
 longDesc: 'Built in 1799 by Maharaja Sawai Pratap Singh, Hawa Mahal is the ultimate symbol of Jaipur architecture. Its unique pyramidal shape and delicate latticework capture cooling winds throughout summer. Climb to the top for magnificent panoramas of the City Palace and Jantar Mantar.',
 imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
 stickerUrl: 'assets/hawa-mahal.jpg',
 gallery: [
 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
 'https://images.unsplash.com/photo-1600100397608-f010f443b743?auto=format&fit=crop&w=800&q=80',
 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'High between 11 AM - 3 PM',
 trailCondition: null,
 photographyAllowed: 'Yes (Tripods require special permit)',
 accessibility: 'Wheelchair access limited to courtyard level'
 },
 localTip: 'Visit the Tattoo Cafe or Wind View Cafe directly across the street on the 3rd floor for the famous postcard view with your morning coffee.',
 distanceFromCenter: '0.6 km',
 travelTimeWalk: '7 min walk',
 travelTimeDrive: '3 min drive',
 nearbyIds: ['johari-bazaar', 'city-palace', 'lmb-restaurant']
 },
 {
 id: 'city-palace',
 destinationId: 'jaipur',
 name: 'The City Palace of Jaipur',
 category: 'historical',
 subcategories: ['culture', 'family', 'instagrammable'],
 coordinates: [26.9258, 75.8237],
 rating: 4.7,
 reviewsCount: 11950,
 priceLevel: '₹₹₹',
 entryFee: '₹300 (Courtyards), ₹3,500 (Chandra Mahal Royal Suite tour)',
 openingHours: '9:30 AM – 7:00 PM, Night Tour: 7:00 PM – 10:00 PM',
 bestTime: 'Morning 10:00 AM or late afternoon 4:00 PM',
 avgDuration: '2–3 hours',
 shortDesc: 'A magnificent blend of Mughal and Rajput architecture housing royal artifacts, costumes, and the breathtaking Peacock Gate.',
 longDesc: 'Nestled in the heart of the Old City, City Palace remains the official residence of Jaipur’s titular royal family. Explore the Chandra Mahal, Mubarak Mahal museum with exquisite royal textiles, and Pritam Niwas Chowk with its four legendary season-themed doorways.',
 imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
 stickerUrl: 'assets/city-palace.jpg',
 gallery: [
 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'Moderate',
 photographyAllowed: 'Yes, inside museum areas without flash',
 accessibility: 'Wheelchair accessible ramps available'
 },
 localTip: 'The Peacock Gate inside the inner courtyard has the finest enamel work in India. Great lighting for portraits around 11:30 AM.',
 distanceFromCenter: '0.9 km',
 travelTimeWalk: '12 min walk',
 travelTimeDrive: '5 min drive',
 nearbyIds: ['hawa-mahal', 'jantar-mantar', 'johari-bazaar']
 },
 {
 id: 'johari-bazaar',
 destinationId: 'jaipur',
 name: 'Johari Bazaar',
 category: 'shopping',
 subcategories: ['culture', 'budget', 'food'],
 coordinates: [26.9205, 75.8248],
 rating: 4.6,
 reviewsCount: 8430,
 priceLevel: '₹₹',
 entryFee: 'Free (Public Marketplace)',
 openingHours: '10:30 AM – 8:30 PM (Closed Sundays)',
 bestTime: 'Afternoon 4:00 PM to 8:00 PM for vibrant street life',
 avgDuration: '1.5–2 hours',
 shortDesc: 'Jaipur’s world-renowned jewelry and gemstone district flanked by traditional terracotta pink colonnades.',
 longDesc: 'From authentic Kundan and Meenakari gold ornaments to handmade silver jewelry, bandhani sarees, and block-printed cottons, Johari Bazaar is a sensory feast of color, bargaining, and authentic Rajasthani artisan heritage.',
 imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
 stickerUrl: 'assets/bazaar.jpg',
 gallery: [
 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'High in the evening',
 trafficNotice: 'Pedestrian heavy. Better to explore on foot.',
 accessibility: 'Street pavement level'
 },
 localTip: 'Step into Gopalji Ka Rasta alleyway for wholesale silver and semiprecious gemstones at direct artisan rates.',
 distanceFromCenter: '0.4 km',
 travelTimeWalk: '5 min walk',
 travelTimeDrive: '2 min drive',
 nearbyIds: ['lmb-restaurant', 'hawa-mahal', 'bapu-bazaar']
 },
 {
 id: 'lmb-restaurant',
 destinationId: 'jaipur',
 name: 'LMB (Laxmi Misthan Bhandar)',
 category: 'food',
 subcategories: ['culture', 'family', 'budget'],
 coordinates: [26.9198, 75.8242],
 rating: 4.7,
 reviewsCount: 9800,
 priceLevel: '₹₹',
 entryFee: '₹400 – ₹700 per person',
 openingHours: '8:00 AM – 10:30 PM (Daily)',
 bestTime: 'Lunch 12:30 PM or teatime kachori at 4:30 PM',
 avgDuration: '45 mins',
 shortDesc: 'Legendary sweet shop and vegetarian restaurant established in 1727, famous for Pyaaz Kachori and Rajasthani Thali.',
 longDesc: 'Serving royalty and travelers for centuries, LMB is a culinary pilgrimage. The crispy, spicy Pyaaz Kachori, delicate Ghewar (honeycomb sweet), and full Rajasthani Royal Thali featuring Dal Baati Churma are non-negotiable Jaipur rituals.',
 imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
 stickerUrl: 'assets/food.jpg',
 gallery: [
 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'Moderate to High at meal peaks',
 dietary: 'Pure Vegetarian (Jain options readily available)'
 },
 localTip: 'Order the Paneer Ghewar and hot Mirchi Vada fresh from the counter outside before heading in for a seated meal.',
 distanceFromCenter: '0.5 km',
 travelTimeWalk: '6 min walk',
 travelTimeDrive: '2 min drive',
 nearbyIds: ['johari-bazaar', 'hawa-mahal', 'city-palace']
 },
 {
 id: 'amber-fort',
 destinationId: 'jaipur',
 name: 'Amber (Amer) Fort & Palace',
 category: 'historical',
 subcategories: ['adventure', 'instagrammable', 'culture'],
 coordinates: [26.9855, 75.8513],
 rating: 4.9,
 reviewsCount: 22400,
 priceLevel: '₹₹',
 entryFee: '₹100 (Indian), ₹500 (Foreigner), ₹50 (Student)',
 openingHours: '8:00 AM – 5:30 PM, Light & Sound Show: 7:00 PM',
 bestTime: 'Early morning 8:00 AM for cool weather & golden light',
 avgDuration: '3–4 hours',
 shortDesc: 'Grand hilltop fortress perched above Maota Lake featuring the glittering Sheesh Mahal (Mirror Palace).',
 longDesc: 'A UNESCO World Heritage site, Amer Fort boasts massive ramparts, series of monumental gates, and cobblestone paths. Inside lies the world-famous Sheesh Mahal, whose convex glass mirror inlays sparkle magically when lit by a single candle flame.',
 imageUrl: 'https://images.unsplash.com/photo-1588096344356-9b578c773950?auto=format&fit=crop&w=800&q=80',
 stickerUrl: 'assets/fort.jpg',
 gallery: [
 'https://images.unsplash.com/photo-1588096344356-9b578c773950?auto=format&fit=crop&w=800&q=80',
 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'Very High',
 hazardNote: 'Steep climb. Elephant rides end by 11:30 AM; 4x4 jeeps or walking path available.',
 accessibility: 'Jeep access up to Suraj Pol courtyard'
 },
 localTip: 'Walk through the underground secret tunnel connecting Amber Fort to Jaigarh Fort. It is cool, eerie, and takes only 25 minutes.',
 distanceFromCenter: '11.2 km',
 travelTimeWalk: '2.5 hrs walk',
 travelTimeDrive: '22 min drive',
 nearbyIds: ['panna-meena-kund', 'jaigarh-fort', 'jal-mahal']
 },
 {
 id: 'nahargarh-fort',
 destinationId: 'jaipur',
 name: 'Nahargarh Fort (Sunset Point)',
 category: 'historical',
 subcategories: ['hidden-gems', 'nature', 'couple'],
 coordinates: [26.9372, 75.8156],
 rating: 4.8,
 reviewsCount: 16800,
 priceLevel: '₹',
 entryFee: '₹50 (Indian), ₹200 (Foreigner)',
 openingHours: '10:00 AM – 5:30 PM (Outer ramparts open till 9:00 PM)',
 bestTime: 'Sunset 5:00 PM – 7:30 PM for city panoramic lights',
 avgDuration: '2 hours',
 shortDesc: 'Dramatic ridge fort offering 360-degree clifftop views overlooking the entire pink city grid.',
 longDesc: 'Once part of Jaipur’s defense perimeter alongside Amer and Jaigarh, Nahargarh (Tiger Fort) features the striking Madhavendra Bhawan with twelve identical suites for the queens. The terrace ramparts provide the most breathtaking sunset panoramas in Rajasthan.',
 imageUrl: 'https://images.unsplash.com/photo-1609137144822-261ef90998b4?auto=format&fit=crop&w=800&q=80',
 stickerUrl: 'assets/fort.jpg',
 gallery: [
 'https://images.unsplash.com/photo-1609137144822-261ef90998b4?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'High at Sunset',
 weatherRisk: 'Windy at clifftop ramparts. Hold onto hats and phones.'
 },
 localTip: 'Grab a cold drink at Padao Open Air Restaurant on the bastion edge while watching the city lights flicker to life.',
 distanceFromCenter: '4.8 km',
 travelTimeWalk: '1 hr hike',
 travelTimeDrive: '15 min drive',
 nearbyIds: ['padao-restaurant', 'jaigarh-fort', 'smriti-van']
 },
 {
 id: 'jal-mahal',
 destinationId: 'jaipur',
 name: 'Jal Mahal (Water Palace)',
 category: 'nature',
 subcategories: ['instagrammable', 'historical', 'couple'],
 coordinates: [26.9656, 75.8458],
 rating: 4.6,
 reviewsCount: 13500,
 priceLevel: 'Free',
 entryFee: 'Free (Viewable from landscaped lakeside promenade)',
 openingHours: 'Open 24 hours (Lakeside promenade illuminated till 10 PM)',
 bestTime: 'Sunrise 6:30 AM or Sunset 5:45 PM',
 avgDuration: '30–45 mins',
 shortDesc: 'Enigmatic yellow sandstone palace seemingly floating serenely in the middle of Man Sagar Lake.',
 longDesc: 'Built in the 1750s, four stories of this five-story palace remain submerged under water when the lake is full. The lakeside walkway has been revitalized with artisan stalls, camel rides, traditional costume photography, and serene birdwatching.',
 imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
 gallery: [
 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Promenade',
 crowdLevel: 'Moderate in morning, High at evening',
 entryPermit: 'Palace interior currently closed to general public'
 },
 localTip: 'Visit at dawn when migratory birds flock across the mist-covered lake surface with the Aravalli hills in the background.',
 distanceFromCenter: '6.4 km',
 travelTimeWalk: '1.2 hrs walk',
 travelTimeDrive: '12 min drive',
 nearbyIds: ['amber-fort', 'nahargarh-fort', 'hathni-kund']
 },
 {
 id: 'panna-meena-kund',
 destinationId: 'jaipur',
 name: 'Panna Meena Ka Kund Stepwell',
 category: 'hidden-gems',
 subcategories: ['historical', 'instagrammable', 'culture'],
 coordinates: [26.9886, 75.8569],
 rating: 4.8,
 reviewsCount: 4620,
 priceLevel: 'Free',
 entryFee: 'Free entry',
 openingHours: '7:00 AM – 6:00 PM (Daily)',
 bestTime: 'Morning 7:30 AM to 9:30 AM for soft shadows and no crowds',
 avgDuration: '30 mins',
 shortDesc: 'Mesmerizing 16th-century geometric stepwell with interlocking criss-cross staircases.',
 longDesc: 'Located just past Amber Fort, this ancient community rainwater reservoir was built for village gatherings and summer respite. Its symmetrical zigzag stairs create an optical illusion that is a dream for photographers and architecture lovers.',
 imageUrl: 'https://images.unsplash.com/photo-1524492417138-54b2d13b29bd?auto=format&fit=crop&w=800&q=80',
 gallery: [
 'https://images.unsplash.com/photo-1524492417138-54b2d13b29bd?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'Low to Moderate',
 rules: 'Walking down the lower steps is restricted by guards for safety and heritage conservation.'
 },
 localTip: 'Stop at the nearby Stepwell Cafe right after taking photos for artisan chai and lemon cake with a rooftop view.',
 distanceFromCenter: '11.8 km',
 travelTimeWalk: '2.5 hrs walk',
 travelTimeDrive: '24 min drive',
 nearbyIds: ['amber-fort', 'stepwell-cafe', 'jaigarh-fort']
 },
 {
 id: 'bar-palladio',
 destinationId: 'jaipur',
 name: 'Bar Palladio Jaipur',
 category: 'nightlife',
 subcategories: ['food', 'instagrammable', 'couple'],
 coordinates: [26.8967, 75.8152],
 rating: 4.7,
 reviewsCount: 5120,
 priceLevel: '₹₹₹',
 entryFee: '₹1,500 – ₹2,500 for two',
 openingHours: '6:00 PM – 12:00 Midnight (Reservations recommended)',
 bestTime: 'Evening 7:30 PM for candlelight garden pavilions',
 avgDuration: '2 hours',
 shortDesc: 'Exquisite royal-blue Italian lounge and cocktail bar set within historic heritage gardens.',
 longDesc: 'Designed by Marie-Anne Oudejans, Bar Palladio is an ode to Italian Renaissance style fused with Mughal courtly elegance. Cobalt-blue frescoes, canopied tent daybeds, wandering peacocks, and signature cocktails make it one of Asia’s most stylish evening spots.',
 imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
 gallery: [
 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Opens at 6:00 PM',
 crowdLevel: 'High on weekends',
 dressCode: 'Smart Casual (No beachwear/slippers)'
 },
 localTip: 'Book an outdoor tent pavilion in the garden at least 3 days in advance for romantic anniversary or couple dinners.',
 distanceFromCenter: '2.3 km',
 travelTimeWalk: '28 min walk',
 travelTimeDrive: '8 min drive',
 nearbyIds: ['albert-hall', 'tapri-central', 'bapu-bazaar']
 },
 {
 id: 'tapri-central',
 destinationId: 'jaipur',
 name: 'Tapri Central (Rooftop Tea House)',
 category: 'cafes',
 subcategories: ['food', 'budget', 'couple'],
 coordinates: [26.9082, 75.8089],
 rating: 4.8,
 reviewsCount: 11200,
 priceLevel: '₹₹',
 entryFee: '₹300 – ₹500 for two',
 openingHours: '7:30 AM – 10:15 PM (Daily)',
 bestTime: 'Sunset 5:30 PM for golden hour tea over Central Park',
 avgDuration: '1.5 hours',
 shortDesc: 'Vibrant rooftop cafe overlooking Central Park, celebrated for cutting chai, bun muska, and cheese maggi fondue.',
 longDesc: 'Tapri Central turned Indian street chai culture into an art form. With quirky vintage decor, wooden benches, and breezy park views, it is the city’s favorite meeting hub for digital nomads, creatives, and travelers.',
 imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
 gallery: [
 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'High at evening tea',
 wifiAvailable: 'High-speed guest Wi-Fi available'
 },
 localTip: 'Try the Saunf (fennel) Cutting Chai with Tadka Khichdi or hand-rolled garlic bread.',
 distanceFromCenter: '1.8 km',
 travelTimeWalk: '20 min walk',
 travelTimeDrive: '6 min drive',
 nearbyIds: ['albert-hall', 'bar-palladio', 'johari-bazaar']
 },
 {
 id: 'hathni-kund',
 destinationId: 'jaipur',
 name: 'Hathni Kund Waterfall & Nature Trek',
 category: 'nature',
 subcategories: ['trekking', 'adventure', 'hidden-gems'],
 coordinates: [26.9534, 75.8341],
 rating: 4.5,
 reviewsCount: 2840,
 priceLevel: 'Free',
 entryFee: 'Free entry (Eco trail)',
 openingHours: '6:00 AM – 5:30 PM (Daylight only)',
 bestTime: 'Early morning 6:30 AM – 9:30 AM; Active during monsoon & post-monsoon',
 avgDuration: '2.5–3 hours',
 shortDesc: 'Scenic forest valley trail leading to a hidden seasonal waterfall amidst rocky Aravalli gorges.',
 longDesc: 'Tucked behind the hills of Jaipur, Hathni Kund is a favorite weekend hiking retreat. The trek passes ancient water channels, rugged dry deciduous forest, and opens into a cascading seasonal waterfall surrounded by dramatic cliffs.',
 imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
 gallery: [
 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Trail Open • Flow Active (Moderate Flow)',
 waterfallCondition: 'Active / Moderate Flow (Recent rainfall recorded 18mm)',
 trailCondition: 'Rocky & Dry with minor slippery patches near pool base',
 safetyAdvisory: 'Wear sturdy grip hiking shoes. Return before dusk; no trail lighting.'
 },
 localTip: 'Carry at least 1.5 liters of drinking water per person and electrolyte packs as there are no shops along the 3.5 km trail.',
 distanceFromCenter: '5.6 km',
 travelTimeWalk: '1.5 hrs walk',
 travelTimeDrive: '16 min drive',
 nearbyIds: ['nahargarh-fort', 'jal-mahal', 'galta-ji']
 },
 {
 id: 'galta-ji',
 destinationId: 'jaipur',
 name: 'Galta Ji (The Monkey Temple & Sacred Kunds)',
 category: 'spiritual',
 subcategories: ['culture', 'nature', 'historical'],
 coordinates: [26.9168, 75.8601],
 rating: 4.7,
 reviewsCount: 8900,
 priceLevel: '₹',
 entryFee: 'Free (₹50 camera fee)',
 openingHours: '5:00 AM – 8:00 PM (Daily)',
 bestTime: 'Sunset 4:30 PM for golden mountain vistas and evening aarti',
 avgDuration: '1.5–2 hours',
 shortDesc: 'Ancient 16th-century pink stone temple complex built into a narrow mountain pass with sacred natural springs.',
 longDesc: 'Galta Ji features series of freshwater stone pools (kunds) where pilgrims bathe, surrounded by dramatic rock pinnacles. It is home to hundreds of friendly Rhesus macaque monkeys and affords a spectacular sunset ridge hike up to the Sun Temple.',
 imageUrl: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80',
 gallery: [
 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'Moderate',
 animalSafety: 'Monkeys are accustomed to humans. Keep food, plastic bags, and sunglasses securely inside backpacks.'
 },
 localTip: 'Hike 15 minutes past the upper kund to the Surya Mandir on the ridge crest for the finest sunset vantage point over the eastern valley.',
 distanceFromCenter: '3.6 km',
 travelTimeWalk: '45 min walk',
 travelTimeDrive: '14 min drive',
 nearbyIds: ['hawa-mahal', 'johari-bazaar', 'hathni-kund']
 },
 {
 id: 'albert-hall',
 destinationId: 'jaipur',
 name: 'Albert Hall Museum & Ram Niwas Garden',
 category: 'culture',
 subcategories: ['historical', 'instagrammable', 'family'],
 coordinates: [26.9116, 75.8194],
 rating: 4.7,
 reviewsCount: 15400,
 priceLevel: '₹',
 entryFee: '₹40 (Indian), ₹300 (Foreigner), ₹20 (Student)',
 openingHours: '9:00 AM – 5:00 PM, Night illumination: 7:00 PM – 10:00 PM',
 bestTime: 'Evening 7:00 PM when facade is illuminated in dynamic rainbow colors',
 avgDuration: '1.5–2 hours',
 shortDesc: 'Rajasthan’s oldest museum housed in an exquisite Indo-Saracenic palace surrounded by hundreds of fluttering pigeons.',
 longDesc: 'Modelled after London’s Victoria and Albert Museum, Albert Hall boasts a rare Egyptian mummy, miniature Persian paintings, royal armor, brassware, and musical instruments. At night, hundreds of LED lights illuminate the domes.',
 imageUrl: 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?auto=format&fit=crop&w=800&q=80',
 gallery: [
 'https://images.unsplash.com/photo-1592635196078-9fdc757f27f4?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'Moderate to High in evening',
 nightTour: 'Night museum pass available for ₹100'
 },
 localTip: 'Photograph the front plaza during late afternoon when the pigeon feeders toss grains, creating stunning motion blur compositions.',
 distanceFromCenter: '1.1 km',
 travelTimeWalk: '14 min walk',
 travelTimeDrive: '4 min drive',
 nearbyIds: ['masala-chowk', 'bar-palladio', 'bapu-bazaar']
 },
 {
 id: 'masala-chowk',
 destinationId: 'jaipur',
 name: 'Masala Chowk Open-Air Food Court',
 category: 'food',
 subcategories: ['budget', 'family', 'culture'],
 coordinates: [26.9095, 75.8208],
 rating: 4.6,
 reviewsCount: 7800,
 priceLevel: '₹',
 entryFee: '₹10 entry token (Food dishes ₹50 – ₹180)',
 openingHours: '1:00 PM – 10:30 PM (Daily)',
 bestTime: 'Evening 6:00 PM to 9:00 PM',
 avgDuration: '1 hour',
 shortDesc: 'One-stop culinary open garden bringing together 21 of Jaipur’s most famous legacy street-food vendors.',
 longDesc: 'Instead of rushing across the city for Gulab Ji Chai, Samrat Samosas, Sethi Tikka, and Bhagat Tarachand sweets, Masala Chowk brings them all into a clean, manicured garden setting next to Albert Hall with live music and family seating.',
 imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=800&q=80',
 gallery: [
 'https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'High on weekends',
 payment: 'Digital UPI and cash accepted at all stalls'
 },
 localTip: 'Order the Bun Maska & Masala Chai from Gulab Ji stall followed by the Rabdi Kulfi from Ramchandra Kulfi Bhandar.',
 distanceFromCenter: '1.3 km',
 travelTimeWalk: '16 min walk',
 travelTimeDrive: '5 min drive',
 nearbyIds: ['albert-hall', 'bar-palladio', 'johari-bazaar']
 },
 {
 id: 'bapu-bazaar',
 destinationId: 'jaipur',
 name: 'Bapu Bazaar',
 category: 'shopping',
 subcategories: ['budget', 'culture'],
 coordinates: [26.9175, 75.8215],
 rating: 4.6,
 reviewsCount: 9200,
 priceLevel: '₹',
 entryFee: 'Free entry',
 openingHours: '11:00 AM – 9:00 PM (Daily)',
 bestTime: '3:00 PM – 7:00 PM',
 avgDuration: '2 hours',
 shortDesc: 'The ultimate marketplace for camel-leather mojari shoes, Jaipuri quilts (razai), and colorful textiles.',
 longDesc: 'Stretching along the southern wall of the Old City, Bapu Bazaar is famous for handcrafted camel leather shoes, vibrant tie-dye bandhej dupattas, aromatic ittar (perfumes), and soft Jaipur cotton quilts.',
 imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
 gallery: [
 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Open Now',
 crowdLevel: 'High',
 bargaining: 'Friendly bargaining expected; start around 60-70% of quoted price'
 },
 localTip: 'Look for original GI-tagged Jaipuri Razai (mulmul cotton quilts) weighing under 500 grams that pack down tightly into luggage.',
 distanceFromCenter: '0.7 km',
 travelTimeWalk: '9 min walk',
 travelTimeDrive: '3 min drive',
 nearbyIds: ['johari-bazaar', 'albert-hall', 'lmb-restaurant']
 },
 {
 id: 'chokhi-dhani',
 destinationId: 'jaipur',
 name: 'Chokhi Dhani Ethnic Village Resort',
 category: 'culture',
 subcategories: ['food', 'family', 'adventure'],
 coordinates: [26.7675, 75.8344],
 rating: 4.6,
 reviewsCount: 28500,
 priceLevel: '₹₹₹',
 entryFee: '₹900 – ₹1,400 (Includes cultural shows & royal feast)',
 openingHours: '5:00 PM – 11:00 PM (Daily)',
 bestTime: 'Arrive at 5:30 PM to catch puppet shows and folk dancers before dinner',
 avgDuration: '4 hours',
 shortDesc: 'Vibrant Rajasthani cultural fair with Kalbeliya dancers, puppet shows, camel rides, and traditional sit-down dining.',
 longDesc: 'A sprawling recreation of a rustic Rajasthani village where visitors are welcomed with tilak and arti. Enjoy fire eaters, acrobatics, pottery workshops, and feast on unlimited Dal Baati Churma served on leaf platters by hospitable village hosts.',
 imageUrl: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80',
 gallery: [
 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=800&q=80'
 ],
 conditions: {
 status: 'Opens at 5:00 PM',
 crowdLevel: 'High on weekends & holidays',
 familyFriendly: 'Highly recommended for kids and families'
 },
 localTip: 'Take an evening cab and book roundtrip transport in advance, as return cabs can be harder to flag past 10:30 PM.',
 distanceFromCenter: '18 km',
 travelTimeWalk: '4 hrs',
 travelTimeDrive: '35 min drive',
 nearbyIds: ['albert-hall'],
 source: 'Rajasthan Tourism Official Registry',
 verificationStatus: 'Verified Government Data',
 whyRecommended: ['Authentic cultural folk heritage', 'Ideal for family travelers']
 },
 {
 id: 'maharani-ki-chhatri',
 destinationId: 'jaipur',
 name: 'Maharani Ki Chhatri (Royal Cenotaphs)',
 category: 'hidden-gems',
 subcategories: ['historical', 'culture', 'couple'],
 coordinates: [26.9480, 75.8390],
 rating: 4.8,
 reviewsCount: 1850,
 priceLevel: '₹',
 entryFee: '₹30 (Indian), ₹100 (Foreigner)',
 openingHours: '9:00 AM – 5:00 PM (Daily)',
 bestTime: 'Morning 8:30 AM – 10:30 AM for quiet marble shadows',
 avgDuration: '45 mins',
 shortDesc: 'Tranquil walled garden with intricately carved white marble chhatris honoring the royal queens of Jaipur.',
 longDesc: 'Located along the historic Amber road, this lesser-known heritage site features exquisite chhatris (cenotaphs) built in pure white makrana marble. The domes and pillars showcase floral Mughal-Rajput carvings of extraordinary delicacy, set in quiet gardens.',
 imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
 conditions: {
 status: 'Open Now',
 crowdLevel: 'Very Low (Peaceful)',
 photographyAllowed: 'Yes (Permitted)'
 },
 localTip: 'Spend time observing the ceiling carvings of the main central chhatri; each dome has a distinct lotus bud rosette pattern.',
 distanceFromCenter: '4.2 km',
 travelTimeWalk: '50 min walk',
 travelTimeDrive: '10 min drive',
 nearbyIds: ['gaitor-tumbas', 'jal-mahal', 'amber-fort'],
 source: 'Official Tourism (Rajasthan Dept. of Tourism)',
 verificationStatus: 'Verified Information',
 whyRecommended: ['Offbeat peaceful heritage node', 'High architectural value', 'Avoids tour bus crowds']
 },
 {
 id: 'surya-mandir-galta',
 destinationId: 'jaipur',
 name: 'Surya Mandir (Sun Temple on Galta Ridge)',
 category: 'hidden-gems',
 subcategories: ['spiritual', 'nature', 'historical'],
 coordinates: [26.9180, 75.8560],
 rating: 4.9,
 reviewsCount: 3100,
 priceLevel: 'Free',
 entryFee: 'Free entry',
 openingHours: '5:30 AM – 7:30 PM (Daily)',
 bestTime: 'Sunset 5:15 PM – 6:30 PM',
 avgDuration: '1 hour',
 shortDesc: '18th-century clifftop temple perched 100 meters above the valley with the finest sunset panorama of Jaipur.',
 longDesc: 'Constructed by Sawai Jai Singh’s courtier Rao Kripa Ram in 1734 AD, this temple overlooks the entire east-west axis of Jaipur. Visiting at dusk allows you to hear the temple bells while watching the city lights ignite in the twilight haze.',
 imageUrl: 'https://images.unsplash.com/photo-1609137144822-261ef90998b4?auto=format&fit=crop&w=800&q=80',
 conditions: {
 status: 'Open Now',
 crowdLevel: 'Low',
 trailAdvice: '15-min uphill stone stairway walk from Galta kunds'
 },
 localTip: 'Bring your binoculars or telephoto lens to capture the straight-line grid architecture planned by Vidyadhar Bhattacharya.',
 distanceFromCenter: '3.8 km',
 travelTimeWalk: '45 min walk',
 travelTimeDrive: '12 min drive',
 nearbyIds: ['galta-ji', 'hawa-mahal'],
 source: 'ASI Heritage Records & Community Historians',
 verificationStatus: 'Community Recommended',
 whyRecommended: ['Unmatched panoramic sunset vantage', 'Authentic heritage trail', 'Open during twilight']
 },
 {
 id: 'jagat-shiromani',
 destinationId: 'jaipur',
 name: 'Jagat Shiromani Temple',
 category: 'hidden-gems',
 subcategories: ['historical', 'culture', 'spiritual'],
 coordinates: [26.9880, 75.8540],
 rating: 4.8,
 reviewsCount: 2600,
 priceLevel: 'Free',
 entryFee: 'Free (Donations voluntary)',
 openingHours: '6:00 AM – 8:00 PM (Daily)',
 bestTime: '10:00 AM – 12:00 PM for bright courtyard light',
 avgDuration: '45 mins',
 shortDesc: 'Masterpiece 16th-century temple featuring monumental single-block marble torana archways and Krishna idol.',
 longDesc: 'Nestled in old Amer village behind the fort ramparts, this temple was built by Queen Kanakwati between 1599 and 1608 AD. Legend holds that the black stone idol of Lord Krishna is the exact same deity worshipped by mystic poetess Mirabai in Chittorgarh.',
 imageUrl: 'https://images.unsplash.com/photo-1588096344356-9b578c773950?auto=format&fit=crop&w=800&q=80',
 conditions: {
 status: 'Open Now',
 crowdLevel: 'Low',
 rules: 'Remove footwear at outer marble gate'
 },
 localTip: 'Look closely at the Garuda pavilion in front; the pillars feature carvings of royal battle elephants, musicians, and floral creepers.',
 distanceFromCenter: '11.5 km',
 travelTimeWalk: '2.5 hrs walk',
 travelTimeDrive: '22 min drive',
 nearbyIds: ['panna-meena-kund', 'amber-fort', 'anokhi-museum'],
 source: 'Archeological Survey of India (ASI)',
 verificationStatus: 'Verified Information',
 whyRecommended: ['Exceptional stone carving craftsmanship', 'Historic connection to Mirabai', 'Quiet Amer village enclave']
 },
 {
 id: 'anokhi-museum',
 destinationId: 'jaipur',
 name: 'Anokhi Museum of Hand Printing',
 category: 'hidden-gems',
 subcategories: ['culture', 'shopping'],
 coordinates: [26.9892, 75.8580],
 rating: 4.8,
 reviewsCount: 3200,
 priceLevel: '₹',
 entryFee: '₹30 (Adults), ₹15 (Students)',
 openingHours: '10:30 AM – 4:30 PM (Tuesday to Sunday, Closed Mondays)',
 bestTime: 'Morning 11:00 AM to catch master printers at their workbenches',
 avgDuration: '1.5 hours',
 shortDesc: 'Living craft museum in a restored 400-year-old haveli dedicated to the ancient art of woodblock textile printing.',
 longDesc: 'Winner of a UNESCO Cultural Heritage conservation award, the Anokhi Museum showcases complex block-carving and natural vegetable dyeing techniques. Visitors can watch master artisans carve teak wood blocks and try their hand at printing.',
 imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=800&q=80',
 conditions: {
 status: 'Open Today',
 crowdLevel: 'Low to Moderate',
 interactive: 'Live block-printing demonstration included'
 },
 localTip: 'Visit the small museum gift shop on the terrace for limited-run artisan scarves and hand-bound journals printed with heritage woodblocks.',
 distanceFromCenter: '12.0 km',
 travelTimeWalk: '2.5 hrs walk',
 travelTimeDrive: '25 min drive',
 nearbyIds: ['panna-meena-kund', 'jagat-shiromani', 'amber-fort'],
 source: 'UNESCO-Awarded Anokhi Foundation & Rajasthan Tourism',
 verificationStatus: 'Verified Information',
 whyRecommended: ['Authentic living craft heritage', 'Direct artisan demonstrations', 'Preserved 16th-century haveli']
 },
 {
 id: 'gaitor-tumbas',
 destinationId: 'jaipur',
 name: 'Royal Gaitor Cenotaphs',
 category: 'hidden-gems',
 subcategories: ['historical', 'culture'],
 coordinates: [26.9385, 75.8285],
 rating: 4.7,
 reviewsCount: 3700,
 priceLevel: '₹',
 entryFee: '₹30 (Indian), ₹100 (Foreigner)',
 openingHours: '9:00 AM – 5:00 PM (Daily)',
 bestTime: 'Late afternoon 3:30 PM – 5:15 PM for warm golden lighting',
 avgDuration: '1 hour',
 shortDesc: 'Magnificent white marble and sandstone royal chhatris of the Kachwaha Maharajas at the foot of Nahargarh.',
 longDesc: 'Gaitor is the royal cremation ground of the rulers of Jaipur since the founding of the city in 1727. The most impressive monument is the pure white marble cenotaph of Maharaja Sawai Jai Singh II, featuring 20 carved pillars with dancing peacocks and royal court scenes.',
 imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
 conditions: {
 status: 'Open Now',
 crowdLevel: 'Low (Tranquil)',
 atmosphere: 'Peaceful garden sanctuary'
 },
 localTip: 'Look at the base carvings of Maharaja Madho Singh II’s memorial for intricate depictions of war horses and battle trumpeters.',
 distanceFromCenter: '2.8 km',
 travelTimeWalk: '35 min walk',
 travelTimeDrive: '8 min drive',
 nearbyIds: ['nahargarh-fort', 'city-palace', 'hawa-mahal'],
 source: 'Royal City Palace Trust & ASI State Chapter',
 verificationStatus: 'Verified Information',
 whyRecommended: ['Exceptional marble relief craftsmanship', 'Peaceful heritage valley setting', 'Rich royal history']
 },
 {
 id: 'kripal-kumbh',
 destinationId: 'jaipur',
 name: 'Kripal Kumbh Blue Pottery Studio',
 category: 'hidden-gems',
 subcategories: ['culture', 'shopping'],
 coordinates: [26.9288, 75.7952],
 rating: 4.8,
 reviewsCount: 2400,
 priceLevel: '₹₹',
 entryFee: 'Free (Studio visit & demonstrations)',
 openingHours: '10:00 AM – 6:00 PM (Monday to Saturday)',
 bestTime: '11:30 AM – 2:00 PM',
 avgDuration: '45 mins',
 shortDesc: 'The historic studio founded by Padma Shri Kripal Singh Shekhawat, who revived Jaipur’s classical turquoise blue pottery.',
 longDesc: 'Unlike conventional clay ceramics, Jaipur Blue Pottery is crafted from a unique paste of powdered quartz, Fuller’s earth, and natural gum, fired only once. At Kripal Kumbh, browse classical cobalt and turquoise tiles, vases, and tableware.',
 imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
 conditions: {
 status: 'Open Today',
 crowdLevel: 'Low',
 artisanDirect: 'Handcrafted items available for purchase direct from master potters'
 },
 localTip: 'Ask the resident master potter to demonstrate the hand-painting technique with natural cobalt and copper oxide pigments.',
 distanceFromCenter: '2.4 km',
 travelTimeWalk: '30 min walk',
 travelTimeDrive: '7 min drive',
 nearbyIds: ['city-palace', 'tapri-central'],
 source: 'All India Handicrafts Board & GI Registry',
 verificationStatus: 'Verified Information',
 whyRecommended: ['Authentic GI-tagged Rajasthan craft', 'Direct artisan interaction', 'Zero commercial tourist middle-men']
 }
];

export const TRAVEL_REELS = [
 {
 id: 'reel-1',
 placeId: 'hawa-mahal',
 title: '5 Secrets You Missed About Hawa Mahal! ',
 creator: '@jaipur.explorer',
 creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
 category: 'historical',
 duration: '0:34',
 likes: '48.2K',
 views: '320K',
 videoPoster: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
 sound: 'Original Sound • Rajasthani Sarangi Beats',
 tags: ['#Jaipur', '#HawaMahal', '#TravelIndia', '#Architecture'],
 caption: 'Did you know Hawa Mahal was designed with 953 micro-windows so that women inside could see everything happening on the street without ever being seen?'
 },
 {
 id: 'reel-2',
 placeId: 'nahargarh-fort',
 title: 'Jaipur Sunset Hits Different from Nahargarh ',
 creator: '@wanderlust_aarav',
 creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
 category: 'hidden-gems',
 duration: '0:28',
 likes: '89.6K',
 views: '540K',
 videoPoster: 'https://images.unsplash.com/photo-1609137144822-261ef90998b4?auto=format&fit=crop&w=600&q=80',
 sound: 'Chasing Sunsets • Acoustic Rajasthan',
 tags: ['#Nahargarh', '#GoldenHour', '#SunsetVibes', '#Rajasthan'],
 caption: 'Watch until the end when all the Pink City lamps turn on simultaneously like a blanket of golden stars.'
 },
 {
 id: 'reel-3',
 placeId: 'lmb-restaurant',
 title: 'Craziest Pyaaz Kachori in India?! ',
 creator: '@streetfoodtales',
 creatorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
 category: 'food',
 duration: '0:42',
 likes: '62.4K',
 views: '410K',
 videoPoster: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
 sound: 'Crispy Crunch • Foodie Groove',
 tags: ['#JaipurFood', '#LMB', '#Kachori', '#StreetFood'],
 caption: 'Fried fresh every 7 minutes in pure desi ghee since 1727. Break it open with both chutneys and you’ll know why it is iconic!'
 },
 {
 id: 'reel-4',
 placeId: 'panna-meena-kund',
 title: 'The Symmetrical Stepwell Illusion ',
 creator: '@shutterbug_priya',
 creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
 category: 'hidden-gems',
 duration: '0:22',
 likes: '34.9K',
 views: '245K',
 videoPoster: 'https://images.unsplash.com/photo-1524492417138-54b2d13b29bd?auto=format&fit=crop&w=600&q=80',
 sound: 'Ambient Dream • Echoes of Amer',
 tags: ['#PannaMeenaKund', '#Stepwell', '#TravelPhotography'],
 caption: 'Locals say nobody can walk down and up the exact same set of stairs twice without getting lost!'
 },
 {
 id: 'reel-5',
 placeId: 'bar-palladio',
 title: 'Royal Blue Dreams at Bar Palladio ',
 creator: '@chic_nomad',
 creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
 category: 'nightlife',
 duration: '0:31',
 likes: '51.3K',
 views: '380K',
 videoPoster: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
 sound: 'Jazz & Spices • Nightlife Lounge',
 tags: ['#BarPalladio', '#CocktailHour', '#JaipurNights'],
 caption: 'Peacocks walking on manicured lawns while you sip cardamom-infused martinis inside hand-painted cobalt domes.'
 },
 {
 id: 'reel-6',
 placeId: 'hathni-kund',
 title: 'Secret Monsoon Waterfall Trek in Jaipur?! ',
 creator: '@rajasthan_treks',
 creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
 category: 'nature',
 duration: '0:38',
 likes: '41.1K',
 views: '290K',
 videoPoster: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80',
 sound: 'Waterfall Streams • Nature Ambience',
 tags: ['#HathniKund', '#Trekking', '#HiddenJaipur', '#MonsoonTrek'],
 caption: 'Most people think Jaipur is all deserts and forts, but this secret rocky gorge waterfall after monsoon rains is unreal!'
 }
];

export const REVIEWS = [
 {
 id: 'rev-1',
 placeId: 'hawa-mahal',
 author: 'Vikram Singh Shekhawat',
 type: 'local',
 badge: 'Jaipur Resident (15 yrs)',
 rating: 5,
 date: '2 days ago',
 avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
 title: 'Go early morning before the bazaar awakens!',
 text: 'As a local, my top recommendation is to arrive at 8:00 AM sharp. The traffic on Tripolia Bazaar has not started yet, sunlight strikes the red sandstone straight on, and you can cross the road peacefully to sit on the rooftop cafe terrace.',
 helpfulCount: 42,
 sentiment: 'positive',
 aspects: {
 positive: ['Morning Lighting', 'Rooftop Vantage', 'Low Traffic at 8 AM'],
 negative: ['Midday Commercial Congestion']
 },
 photos: []
 },
 {
 id: 'rev-2',
 placeId: 'hawa-mahal',
 author: 'Elena Rostova',
 type: 'tourist',
 badge: 'Traveled from Spain',
 rating: 5,
 date: '1 week ago',
 avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
 title: 'More breathtaking in person than on Instagram',
 text: 'Do not just take photos from the outside road! Buy the composite ticket and go inside. The tiny colored stained glass windows projecting rainbow patterns on the white lime floor made my whole morning.',
 helpfulCount: 38,
 sentiment: 'positive',
 aspects: {
 positive: ['Stained Glass Rainbows', 'Interior Architecture', 'Composite Pass Value'],
 negative: []
 },
 photos: []
 },
 {
 id: 'rev-3',
 placeId: 'lmb-restaurant',
 author: 'Sunil Agarwal',
 type: 'local',
 badge: 'Food Historian & Local',
 rating: 5,
 date: '3 days ago',
 avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
 title: 'The Pyaaz Kachori and Ghewar remain unmatched',
 text: 'My grandfather used to bring us here every Sunday after morning walks. Yes it gets crowded, but their frying oil and spice balance have not changed in decades. The onion stuffing melts in your mouth.',
 helpfulCount: 56,
 sentiment: 'mixed',
 aspects: {
 positive: ['Pyaaz Kachori Crunch', 'Heritage Pure Ghee Recipe'],
 negative: ['Weekend Peak Crowding']
 },
 photos: []
 },
 {
 id: 'rev-4',
 placeId: 'lmb-restaurant',
 author: 'Marcus Weber',
 type: 'tourist',
 badge: 'Backpacker from Germany',
 rating: 4,
 date: '2 weeks ago',
 avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80',
 title: 'Spicy, rich, and an authentic culinary shock!',
 text: 'Ordered the Rajasthani royal thali. The flavors are intense and hearty. Staff was kind enough to explain how to mix the churma and dal baati properly with pure ghee.',
 helpfulCount: 29,
 sentiment: 'positive',
 aspects: {
 positive: ['Authentic Royal Thali', 'Helpful Staff Hospitality'],
 negative: ['High Spice Intensity for Mild Palates']
 },
 photos: []
 },
 {
 id: 'rev-5',
 placeId: 'hathni-kund',
 author: 'Kavita Rathore',
 type: 'local',
 badge: 'Aravalli Trail Guide',
 rating: 5,
 date: 'Yesterday',
 avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
 title: 'Trail currently clear with moderate pool flow',
 text: 'Did the early morning recce yesterday. The trail is dry and safe for families with active kids. Please remember to pack back your water bottles and chip packets! Leave no trace in the valley.',
 helpfulCount: 64,
 sentiment: 'positive',
 aspects: {
 positive: ['Dry Safe Trail', 'Moderate Waterfall Flow', 'Family Friendly'],
 negative: ['No En-Route Amenities / Need to Carry Water']
 },
 photos: []
 }
];

export const BADGES = [
 {
 id: 'history-hunter',
 name: 'History Hunter',
 icon: '',
 description: 'Visited 3+ historic forts, royal palaces, or observatories',
 requiredCategory: 'historical',
 threshold: 3
 },
 {
 id: 'food-explorer',
 name: 'Food Explorer',
 icon: '',
 description: 'Savor legacy street foods and iconic Rajasthani thalis',
 requiredCategory: 'food',
 threshold: 2
 },
 {
 id: 'nature-lover',
 name: 'Nature Lover',
 icon: '',
 description: 'Explored waterfalls, nature reserves, or mountain lookouts',
 requiredCategory: 'nature',
 threshold: 2
 },
 {
 id: 'gem-hunter',
 name: 'Hidden Gem Hunter',
 icon: '',
 description: 'Discovered off-the-beaten-path stepwells and secret spots',
 requiredCategory: 'hidden-gems',
 threshold: 2
 },
 {
 id: 'ultimate-explorer',
 name: 'Ultimate Explorer',
 icon: '',
 description: 'Achieved an Exploration Score of 80+ in any destination',
 thresholdScore: 80
 }
];

export const INITIAL_ITINERARY = {
 jaipur: {
 day1: [],
 day2: [],
 day3: []
 }
};

export const STICKERS = [
 {
 id: 'st-hawa-mahal',
 placeId: 'hawa-mahal',
 name: 'Hawa Mahal',
 tag: 'Palace of Winds',
 image: 'assets/hawa-mahal.jpg',
 category: 'Heritage',
 rarity: 'Legendary',
 points: 25,
 desc: '953 pink latticework jharokhas capturing breezes for royal queens.'
 },
 {
 id: 'st-city-palace',
 placeId: 'city-palace',
 name: 'City Palace',
 tag: 'Royal Courtyards',
 image: 'assets/city-palace.jpg',
 category: 'Heritage',
 rarity: 'Royal',
 points: 20,
 desc: 'Majestic Peacock Gate, Chandra Mahal, and heritage royal artifacts.'
 },
 {
 id: 'st-amber-fort',
 placeId: 'amber-fort',
 name: 'Amber Fort',
 tag: 'Hilltop Bastion',
 image: 'assets/fort.jpg',
 category: 'Forts',
 rarity: 'Legendary',
 points: 30,
 desc: 'UNESCO World Heritage fort over Maota lake with sparkling Sheesh Mahal.'
 },
 {
 id: 'st-food',
 placeId: 'lmb-restaurant',
 name: 'Dal Baati & Ghevar',
 tag: 'Royal Feast',
 image: 'assets/food.jpg',
 category: 'Foodie',
 rarity: 'Delicious',
 points: 15,
 desc: 'Golden crisp Dal Baati Churma, Pyaaz Kachori, and authentic sweets.'
 },
 {
 id: 'st-bazaar',
 placeId: 'johari-bazaar',
 name: 'Johari Bazaar',
 tag: 'Gemstone Stalls',
 image: 'assets/bazaar.jpg',
 category: 'Shopping',
 rarity: 'Artisan',
 points: 15,
 desc: 'Colorful Kundan jewelry, handcrafted mojris, and bandhej textiles.'
 },
 {
 id: 'st-tuktuk',
 placeId: 'tuktuk-tour',
 name: 'Jaipur Auto Tuktuk',
 tag: 'City Cruiser',
 image: 'assets/tuktuk.jpg',
 category: 'Rides',
 rarity: 'Classic',
 points: 10,
 desc: 'The breeziest, most iconic way to navigate the pink walled city alleys.'
 },
 {
 id: 'st-camel',
 placeId: 'chokhi-dhani',
 name: 'Desert Camel Rider',
 tag: 'Thar Explorer',
 image: 'assets/camel.jpg',
 category: 'Adventure',
 rarity: 'Desert Gem',
 points: 20,
 desc: 'Ship of the Desert trotting along the golden dunes under sunset.'
 },
 {
 id: 'st-mascot',
 placeId: 'mascot-guide',
 name: 'Chotu Explorer',
 tag: 'Your Local Guide',
 image: 'assets/mascot.jpg',
 category: 'Mascot',
 rarity: 'Companion',
 points: 50,
 desc: 'Always ready with insider secret tips and joyful traveler energy!'
 }
];

export const MASCOT_TIPS = [
 'Padharo Mhare Desh! Tip: Visit Hawa Mahal before 9:30 AM for magical morning light without any crowd!',
 'Hungry? Grab the legendary piping hot Pyaaz Kachori at Rawat Mishthan Bhandar — locals line up for it!',
 'Heading up to Nahargarh Fort? Arrive around 5:15 PM to catch the world-famous golden hour over the entire Pink City!',
 'Get the ASI Composite Pass! It covers Amber Fort, Hawa Mahal, Jantar Mantar and saves you 40% on entry fees.',
 'Want authentic handcrafted blue pottery & block print scarves? Walk through the artisan lanes of Bapu Bazaar.',
 'Active waterfall alert! Hathni Kund is currently cascading after fresh monsoon showers — great 1.5 hr trek!',
 'Tuk-Tuk tip: Negotiate with a friendly smile or book an e-rickshaw inside the walled city lanes.',
 'Night view: Albert Hall Museum lights up with hundreds of colorful spotlights at 7:30 PM!'
];

// Safety-Aware & Safer Exploration Routes Dataset (SIH Tourism Intelligence)
export const SAFER_ROUTES = [
 {
 id: 'route-hawa-nahargarh',
 destinationId: 'jaipur',
 title: 'Hawa Mahal to Nahargarh Fort',
 origin: {
 name: 'Hawa Mahal (Old City Gate)',
 coordinates: [26.9239, 75.8267]
 },
 destination: {
 name: 'Nahargarh Fort (Sunset Terrace)',
 coordinates: [26.9372, 75.8156]
 },
 overview: 'Climbing from the walled city heritage precinct to the Aravalli clifftops. Safety-aware routing prioritizes well-lit, CCTV-monitored arterial transit corridors with active police checkposts over unlit ridge paths.',
 options: [
 {
 id: 'opt-b-safer',
 code: 'ROUTE B',
 type: 'safer',
 label: 'Route B — Safety-Aware Route',
 tag: 'RECOMMENDED • Lower Contextual Risk',
 badgeColor: '#059669',
 distanceKm: 7.4,
 distanceText: '7.4 km',
 estimatedMinutes: 25,
 estimatedTimeText: '25 min drive',
 safetyScore: 85,
 illuminationScore: '92%',
 pedestrianDensity: 'High (Commercial & Transit Arteries)',
 surveillanceCoverage: '88% Smart City CCTV Network',
 emergencyInfra: '3 Police Kiosks + 2 Pink Booths En Route',
 cellularSignal: 'Strong 5G / 4G Throughout',
 waypoints: [
 [26.9239, 75.8267], // Hawa Mahal
 [26.9258, 75.8237], // City Palace Corridor
 [26.9350, 75.8200], // Zorawar Singh Gate (Well-lit)
 [26.9450, 75.8280], // Amer Road Arterial
 [26.9420, 75.8190], // Forest Gate Checkpoint
 [26.9372, 75.8156] // Nahargarh Fort
 ],
 segments: [
 { name: 'Segment 1: Hawa Mahal to Zorawar Gate', score: 88, desc: 'High pedestrian presence & smart LED lighting' },
 { name: 'Segment 2: Amer Road Arterial Corridor', score: 82, desc: 'Wide commercial transit corridor with CCTV' },
 { name: 'Segment 3: Nahargarh Foothills Checkpoint', score: 91, desc: 'Active Rajasthan Police & Forest Beat post' },
 { name: 'Segment 4: Fort Clifftop Ascent Road', score: 79, desc: 'Illuminated curves with regular tourist cabs' }
 ],
 factors: {
 historicalRisk: 82,
 activityLevel: 90,
 emergencyProximity: 85,
 communityFeedback: 88,
 timeContext: 80,
 environmentalContext: 84
 },
 reasons: [
 'Higher pedestrian and vehicular activity until 10:30 PM',
 'Better proximity to emergency booths & Pink Police checkposts',
 'Continuous Smart City high-mast LED illumination',
 'Consistently positive traveler community safety ratings'
 ],
 notes: 'Prioritizes the well-lit Amer Road corridor before passing the guarded forest checkpoint.'
 },
 {
 id: 'opt-a-faster',
 code: 'ROUTE A',
 type: 'faster',
 label: 'Route A — Fastest Route',
 tag: 'Fastest Transit • Daytime Ideal',
 badgeColor: '#D97706',
 distanceKm: 6.8,
 distanceText: '6.8 km',
 estimatedMinutes: 22,
 estimatedTimeText: '22 min drive',
 safetyScore: 78,
 illuminationScore: '74%',
 pedestrianDensity: 'Moderate',
 surveillanceCoverage: '65%',
 emergencyInfra: '1 Checkpost at Base',
 cellularSignal: 'Good 4G',
 waypoints: [
 [26.9239, 75.8267],
 [26.9280, 75.8220],
 [26.9340, 75.8170],
 [26.9372, 75.8156]
 ],
 segments: [
 { name: 'Segment 1: Walled City Market Lanes', score: 80, desc: 'Crowded bazaar transit' },
 { name: 'Segment 2: Purani Basti Ascent', score: 75, desc: 'Narrow residential alleyways' },
 { name: 'Segment 3: Charan Mandir Road', score: 82, desc: 'Moderate lighting' },
 { name: 'Segment 4: Clifftop Terrace', score: 74, desc: 'Windy unlit hill bends' }
 ],
 factors: {
 historicalRisk: 74,
 activityLevel: 78,
 emergencyProximity: 75,
 communityFeedback: 82,
 timeContext: 70,
 environmentalContext: 79
 },
 reasons: [
 'Saves 3 minutes via inner Purani Basti shortcut',
 'Moderate illumination on hill approach',
 'Lower footfall past 8:00 PM'
 ],
 notes: 'Best during daytime hours; narrow residential alleys can become quiet after dusk.'
 },
 {
 id: 'opt-c-balanced',
 code: 'ROUTE C',
 type: 'balanced',
 label: 'Route C — Balanced Ridge Route',
 tag: 'Scenic • Isolated Stretches',
 badgeColor: '#64748B',
 distanceKm: 8.1,
 distanceText: '8.1 km',
 estimatedMinutes: 28,
 estimatedTimeText: '28 min drive',
 safetyScore: 64,
 illuminationScore: '55%',
 pedestrianDensity: 'Low',
 surveillanceCoverage: '30%',
 emergencyInfra: 'Patrol Car on call',
 cellularSignal: 'Hill shadow spots',
 waypoints: [
 [26.9239, 75.8267],
 [26.9150, 75.8100],
 [26.9300, 75.8050],
 [26.9372, 75.8156]
 ],
 segments: [
 { name: 'Segment 1: Western Ring Road', score: 70, desc: 'Open highway' },
 { name: 'Segment 2: Back Ridge Trailhead', score: 62, desc: 'Sparse lighting' },
 { name: 'Segment 3: Forest Valley Pass', score: 68, desc: 'No commercial shops' },
 { name: 'Segment 4: Nahargarh Gate', score: 56, desc: 'Quiet road' }
 ],
 factors: {
 historicalRisk: 60,
 activityLevel: 65,
 emergencyProximity: 62,
 communityFeedback: 68,
 timeContext: 60,
 environmentalContext: 69
 },
 reasons: [
 'Scenic winding route around the western valley',
 'Fewer traffic signals but lower illumination index',
 'Limited transport hail-down availability'
 ],
 notes: 'Scenic daylight drive; not recommended for solo evening navigation.'
 }
 ]
 },
 {
 id: 'route-johari-amber',
 destinationId: 'jaipur',
 title: 'Johari Bazaar to Amber Fort & Palace',
 origin: {
 name: 'Johari Bazaar Commercial Square',
 coordinates: [26.9205, 75.8248]
 },
 destination: {
 name: 'Amber Fort (Suraj Pol Entrance)',
 coordinates: [26.9855, 75.8513]
 },
 overview: 'Connecting central shopping bazaars to the hilltop fort cluster along the NH-248 heritage tourism corridor.',
 options: [
 {
 id: 'opt-amber-safer',
 code: 'ROUTE B',
 type: 'safer',
 label: 'Route B — Safety-Aware Heritage Corridor',
 tag: 'RECOMMENDED • Monitored Corridor',
 badgeColor: '#059669',
 distanceKm: 11.8,
 distanceText: '11.8 km',
 estimatedMinutes: 26,
 estimatedTimeText: '26 min drive',
 safetyScore: 89,
 illuminationScore: '95%',
 pedestrianDensity: 'High (Lakeside Promenade & Tourist Traffic)',
 surveillanceCoverage: '92% CCTV Highway Grid',
 emergencyInfra: 'Tourist Assistance Police (Jal Mahal + Amer Fort Base)',
 cellularSignal: 'Excellent 5G',
 waypoints: [
 [26.9205, 75.8248],
 [26.9239, 75.8267],
 [26.9656, 75.8458],
 [26.9750, 75.8480],
 [26.9855, 75.8513]
 ],
 segments: [
 { name: 'Segment 1: Johari to Hawa Mahal Corridor', score: 90, desc: 'High footfall & commercial streetlights' },
 { name: 'Segment 2: Jal Mahal Promenade Highway', score: 94, desc: 'Tourist police booth & illuminated lakeside' },
 { name: 'Segment 3: Amer Valley Entrance', score: 86, desc: 'Regular traffic & state transport buses' },
 { name: 'Segment 4: Amber Fort Base Ramp', score: 87, desc: 'CCTV monitored ticket zone' }
 ],
 factors: {
 historicalRisk: 88,
 activityLevel: 94,
 emergencyProximity: 90,
 communityFeedback: 92,
 timeContext: 85,
 environmentalContext: 88
 },
 reasons: [
 'Direct highway along well-lit Jal Mahal tourist promenade',
 'Continuous tourist police patrols and CCTV coverage',
 'High public presence and active e-rickshaws'
 ],
 notes: 'Recommended corridor for all hours with high lighting and dedicated tourist assistance.'
 },
 {
 id: 'opt-amber-faster',
 code: 'ROUTE A',
 type: 'faster',
 label: 'Route A — Brahmapuri Bypass',
 tag: 'Fastest in Morning',
 badgeColor: '#D97706',
 distanceKm: 10.2,
 distanceText: '10.2 km',
 estimatedMinutes: 21,
 estimatedTimeText: '21 min drive',
 safetyScore: 76,
 illuminationScore: '68%',
 pedestrianDensity: 'Moderate',
 surveillanceCoverage: '50%',
 emergencyInfra: 'Standard City Police Stations',
 cellularSignal: 'Good 4G',
 waypoints: [
 [26.9205, 75.8248],
 [26.9320, 75.8180],
 [26.9600, 75.8350],
 [26.9855, 75.8513]
 ],
 segments: [
 { name: 'Segment 1: Commercial Bypass', score: 78, desc: 'Dense daytime traffic' },
 { name: 'Segment 2: Brahmapuri Colony', score: 74, desc: 'Local shops' },
 { name: 'Segment 3: Amer Outer Ring', score: 76, desc: 'Moderate lighting' }
 ],
 factors: {
 historicalRisk: 72,
 activityLevel: 79,
 emergencyProximity: 74,
 communityFeedback: 78,
 timeContext: 75,
 environmentalContext: 76
 },
 reasons: [
 'Saves 5 minutes by bypassing the main lake highway during rush hours'
 ],
 notes: 'Commercial colony route; shops close earlier in the evening.'
 }
 ]
 }
];

// Curated Local Discoveries & Hidden Gems (Authentic Heritage & Culture)
export const LOCAL_DISCOVERIES = [
 {
 id: 'gem-panna-meena',
 placeId: 'panna-meena-kund',
 name: 'Panna Meena Ka Kund',
 location: 'Amer Village, Near Anokhi Museum',
 badge: 'Community Verified',
 visitCount: '4,800+ Verified Visits',
 highlight: '16th-Century Symmetrical Geometry & Ancient Rainwater Engineering',
 authenticityNote: 'Based on 4,800+ traveler check-ins and Jaipur Heritage Conservation records.',
 image: 'https://images.unsplash.com/photo-1524492417138-54b2d13b29bd?auto=format&fit=crop&w=800&q=80',
 whyVisit: 'An architectural marvel where criss-cross stairs form mesmerizing optical illusions. Quiet and serene, far from commercial bus tours.',
 bestTime: 'Morning 7:30 AM to 9:30 AM before tourist crowds'
 },
 {
 id: 'gem-anokhi-museum',
 placeId: 'anokhi-museum',
 name: 'Anokhi Museum of Hand Printing',
 location: 'Kheri Gate, Amber',
 badge: 'Artisan Verified',
 visitCount: '3,200+ Verified Visits',
 highlight: 'Living Master Craftsmen Block-Printing Demonstrations',
 authenticityNote: 'Preserved by the UNESCO-awarded Anokhi Foundation.',
 image: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=800&q=80',
 whyVisit: 'Housed in a restored 400-year-old haveli, watch traditional carvers make teak woodblocks and try printing your own organic cotton scarf.',
 bestTime: '10:30 AM – 4:30 PM (Tuesday to Sunday)'
 },
 {
 id: 'gem-hathni-kund',
 placeId: 'hathni-kund',
 name: 'Hathni Kund Canyon & Waterfall Trail',
 location: 'Aravalli Hills Ridge, Jaipur',
 badge: 'Trail Verified',
 visitCount: '2,900+ Adventure Treks',
 highlight: 'Secret Monsoon Rocky Gorge & Ancient Shiva Pool',
 authenticityNote: 'Tracked via live forest ranger trail updates and community trekking groups.',
 image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
 whyVisit: 'Hidden gorge surrounded by ancient cliffs. Lush greenery during and after the monsoon season with natural cascading pools.',
 bestTime: 'Early morning 6:30 AM – 9:00 AM'
 },
 {
 id: 'gem-gaitor-tumbas',
 placeId: 'gaitor-tumbas',
 name: 'Royal Gaitor Cenotaphs (Chhatris)',
 location: 'Foot of Nahargarh Hills',
 badge: 'Community Recommended',
 visitCount: '3,700+ Verified Visits',
 highlight: 'Intricately Carved White Marble Mausoleums of Jaipur Maharajas',
 authenticityNote: 'Maintained by the Royal City Palace Trust.',
 image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
 whyVisit: 'Peaceful marble chhatris with delicately carved peacocks and battle reliefs, surrounded by quiet gardens beneath the fort ramparts.',
 bestTime: 'Late afternoon 3:30 PM – 5:30 PM for soft golden light'
 },
 {
 id: 'gem-blue-pottery',
 placeId: 'kripal-kumbh',
 name: 'Kripal Kumbh Blue Pottery Studio',
 location: 'Bani Park, Jaipur',
 badge: 'Heritage Craft Studio',
 visitCount: '2,400+ Visits',
 highlight: 'Traditional Quartz-Glaze Turqoise Ceramics by Padma Shri Kripal Singh',
 authenticityNote: 'Recognized by All India Handicrafts Board.',
 image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
 whyVisit: 'Learn how Jaipur’s distinctive turquoise blue pottery is handmade from Egyptian quartz powder instead of clay.',
 bestTime: '11:00 AM – 6:00 PM',
 source: 'Official Handicrafts Board & Craft Guild',
 verificationStatus: 'Verified Information'
 },
 {
 id: 'gem-maharani-chhatri',
 placeId: 'maharani-ki-chhatri',
 name: 'Maharani Ki Chhatri (Royal Cenotaphs)',
 location: 'Amber Road, Ramgarh Crossing',
 badge: 'Heritage Discovery',
 visitCount: '1,850+ Verified Visits',
 highlight: 'Delicately Carved White Marble Mausoleums of Jaipur Queens',
 authenticityNote: 'Protected heritage monument managed by City Palace Royal Trust.',
 image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
 whyVisit: 'Tranquil walled garden of intricately carved domes and marble pavilions honoring the royal women of Jaipur dynasty.',
 bestTime: 'Morning 8:30 AM – 10:30 AM for serene unhurried photography',
 source: 'Official Tourism (Rajasthan Dept. of Tourism)',
 verificationStatus: 'Verified Information'
 },
 {
 id: 'gem-surya-mandir',
 placeId: 'surya-mandir-galta',
 name: 'Surya Mandir (Sun Temple on Galta Ridge)',
 location: 'Galta Hills Ridge Crest',
 badge: 'Sunset Panoramic Node',
 visitCount: '3,100+ Climbs',
 highlight: '18th-Century Sun Sanctum Overlooking the Entire Pink City Grid',
 authenticityNote: 'Documented in ASI heritage trail inventories and local trekking records.',
 image: 'https://images.unsplash.com/photo-1609137144822-261ef90998b4?auto=format&fit=crop&w=800&q=80',
 whyVisit: 'Perched 100 meters above the valley, watch the setting sun paint the city roofs amber with zero commercial tour buses.',
 bestTime: 'Sunset 5:15 PM – 6:30 PM',
 source: 'ASI Heritage Records & Community Historians',
 verificationStatus: 'Community Recommended'
 },
 {
 id: 'gem-jagat-shiromani',
 placeId: 'jagat-shiromani',
 name: 'Jagat Shiromani Temple',
 location: 'Behind Amber Fort, Amer Village',
 badge: 'Architectural Gem',
 visitCount: '2,600+ Visits',
 highlight: 'Single-Block Marble Torana Gates & 16th-Century Krishna Sanctum',
 authenticityNote: 'Preserved under Rajasthan Monuments and Archeological Sites Act.',
 image: 'https://images.unsplash.com/photo-1588096344356-9b578c773950?auto=format&fit=crop&w=800&q=80',
 whyVisit: 'Built by Queen Kanakwati in memory of Prince Jagat Singh (1599–1608 AD), featuring the finest temple stonework in Amer.',
 bestTime: '10:00 AM – 1:00 PM and 4:00 PM – 7:00 PM',
 source: 'Archeological Survey of India (ASI)',
 verificationStatus: 'Verified Information'
 }
];

// Community Route Feedback Logs (Feedback Loop Simulation)
export const COMMUNITY_FEEDBACK_LOGS = [
 {
 id: 'fb-1',
 routeId: 'route-hawa-nahargarh',
 optionId: 'opt-b-safer',
 comfort: 'Very comfortable',
 crowding: 'Medium',
 lighting: 'Good',
 condition: 'Good',
 comment: 'Took this route around 8 PM. Amer Road had great lighting and we saw regular police PCR patrol vans. Felt very relaxed.',
 date: 'Yesterday'
 },
 {
 id: 'fb-2',
 routeId: 'route-hawa-nahargarh',
 optionId: 'opt-b-safer',
 comfort: 'Comfortable',
 crowding: 'High',
 lighting: 'Good',
 condition: 'Good',
 comment: 'Plenty of tourist cabs and auto-rickshaws on this stretch. Forest post guard was helpful.',
 date: '3 days ago'
 }
];

// Tourism Wrapped Archetypes & Scoring Engine Data
export const WRAPPED_ARCHETYPES = [
 {
 minScore: 80,
 title: 'The Master Heritage Explorer',
 badge: ' Royal Trailblazer',
 description: 'You unlocked iconic palaces, secret stepwells, mountain gorges, and authentic heritage feasts across Jaipur.',
 perk: 'Eligible for Verified Rajasthan Explorer Credential'
 },
 {
 minScore: 50,
 title: 'The Curious Cultural Explorer',
 badge: ' Culture Seeker',
 description: 'You dove deep into Jaipur’s living traditions, local bazaars, and scenic hilltop sunset lookouts.',
 perk: 'Top 15% of Platform Explorers this season'
 },
 {
 minScore: 0,
 title: 'The Weekend Trail Adventurer',
 badge: ' Pink City Discoverer',
 description: 'You began your journey through the royal city and discovered standout architectural icons.',
 perk: '2 more hidden gems to unlock Master Explorer status'
 }
];

// ==========================================
// 1. UNDER-DISCOVERED DESTINATIONS (Redistribution Layer)
// ==========================================
export const UNDER_DISCOVERED_DESTINATIONS = [
 {
 id: 'und-maharani-ki-chhatri',
 destinationId: 'jaipur',
 name: 'Maharani Ki Chhatri',
 category: 'historical',
 subcategories: ['culture', 'instagrammable', 'hidden-gems'],
 coordinates: [26.9412, 75.8436],
 alternativeTo: ['hawa-mahal', 'city-palace'],
 crowdReduction: '78% fewer visitors',
 currentCrowdLevel: 'Low (12% capacity)',
 bestTime: 'Morning 8:30 AM – 10:30 AM',
 avgDuration: '45 mins',
 accessibility: {
 wheelchair: 'Partial (Paved garden walkways, step to cenotaph plinth)',
 seating: 'Benches available along garden avenues',
 audioGuide: 'QR audio code at entrance',
 tactilePaving: 'No'
 },
 whyVisit: 'Tranquil royal garden of 18th-century white marble cenotaphs honoring Jaipur queens. Exquisite chhatri domes, peacetime carving and zero tour bus congestion.',
 distanceFromCenter: '4.2 km from Badi Chaupar',
 imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'Govt Heritage Protected',
 entryFee: '₹20 (Indian), ₹50 (Foreigner)'
 },
 {
 id: 'und-panna-meena-kund',
 destinationId: 'jaipur',
 name: 'Panna Meena Ka Kund',
 category: 'historical',
 subcategories: ['architecture', 'hidden-gems', 'instagrammable'],
 coordinates: [26.9886, 75.8542],
 alternativeTo: ['jal-mahal', 'amber-fort'],
 crowdReduction: '72% fewer visitors',
 currentCrowdLevel: 'Low (18% capacity)',
 bestTime: 'Early Morning 7:30 AM – 9:30 AM',
 avgDuration: '30-40 mins',
 accessibility: {
 wheelchair: 'Viewable from upper viewing parapet (Steps to water restricted for safety)',
 seating: 'Shaded stone benches',
 audioGuide: 'Rajasthan Tourism Audio App',
 tactilePaving: 'No'
 },
 whyVisit: '16th-century symmetrical geometric stepwell and ancient rainwater harvesting masterpiece. Perfect optical illusion stair patterns without midday crowds.',
 distanceFromCenter: '11 km from City Center (10 min walk from Amber Fort)',
 imageUrl: 'https://images.unsplash.com/photo-1524492417138-54b2d13b29bd?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'ASI & State Archaeology',
 entryFee: 'Free Entry'
 },
 {
 id: 'und-jagat-shiromani',
 destinationId: 'jaipur',
 name: 'Jagat Shiromani Temple',
 category: 'spiritual',
 subcategories: ['historical', 'culture', 'hidden-gems'],
 coordinates: [26.9878, 75.8524],
 alternativeTo: ['city-palace', 'govind-dev-ji'],
 crowdReduction: '85% fewer visitors',
 currentCrowdLevel: 'Very Low (8% capacity)',
 bestTime: '9:30 AM – 11:30 AM or 4:30 PM – 6:30 PM',
 avgDuration: '45 mins',
 accessibility: {
 wheelchair: 'Courtyard level accessible via gentle side ramp',
 seating: 'Temple mandapa perimeter seating',
 audioGuide: 'Temple trust history plaques in Hindi & English',
 tactilePaving: 'Partial'
 },
 whyVisit: 'Built between 1599–1608 AD with singular monolithic marble torana archways, intricate elephant and peacock stone friezes and Krishna sanctum.',
 distanceFromCenter: '11.2 km from City Center',
 imageUrl: 'https://images.unsplash.com/photo-1588096344356-9b578c773950?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'Protected Monument',
 entryFee: 'Free (Donation optional)'
 },
 {
 id: 'und-bagru-village',
 destinationId: 'jaipur',
 name: 'Bagru Natural Dye Artisan Cluster',
 category: 'culture',
 subcategories: ['shopping', 'family', 'hidden-gems'],
 coordinates: [26.8123, 75.5489],
 alternativeTo: ['johari-bazaar', 'bapu-bazaar'],
 crowdReduction: '80% fewer visitors',
 currentCrowdLevel: 'Low (15% capacity)',
 bestTime: '10:00 AM – 4:00 PM (Winter / Pleasant days)',
 avgDuration: '2–3 hours',
 accessibility: {
 wheelchair: 'Street workshops on flat ground, accessible craft studios',
 seating: 'Artisan workshop seating provided',
 audioGuide: 'Live master artisan guided demonstrations',
 tactilePaving: 'No'
 },
 whyVisit: '350-year-old living textile heritage where Chippa families practice authentic Dabu mud-resist block printing with natural indigo and turmeric vats.',
 distanceFromCenter: '28 km West of Jaipur (Ajmer Road Highway)',
 imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'Craft Guild of Bagru & Ministry of Textiles',
 entryFee: 'Free village entry / Workshops ₹300–₹800'
 },
 {
 id: 'und-gaitor-tumbas',
 destinationId: 'jaipur',
 name: 'Royal Gaitor Cenotaphs',
 category: 'historical',
 subcategories: ['nature', 'hidden-gems', 'couple'],
 coordinates: [26.9389, 75.8242],
 alternativeTo: ['nahargarh-fort', 'amber-fort'],
 crowdReduction: '68% fewer visitors',
 currentCrowdLevel: 'Low (20% capacity)',
 bestTime: '3:30 PM – 5:30 PM (Golden hour light)',
 avgDuration: '1 hour',
 accessibility: {
 wheelchair: 'Paved garden paths accessible',
 seating: 'Garden benches',
 audioGuide: 'Information display boards',
 tactilePaving: 'No'
 },
 whyVisit: 'Carved white marble mausoleums of Jaipur Kachwaha rulers in a serene valley directly beneath the Nahargarh ramparts.',
 distanceFromCenter: '3.8 km from City Center',
 imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'City Palace Trust Verified',
 entryFee: '₹30 (Indian), ₹50 (Foreigner)'
 },
 {
 id: 'und-sambhar-lake',
 destinationId: 'jaipur',
 name: 'Sambhar Salt Lake & Heritage Circuit',
 category: 'nature',
 subcategories: ['adventure', 'hidden-gems', 'culture'],
 coordinates: [26.9056, 75.1989],
 alternativeTo: ['jal-mahal', 'nahargarh-fort'],
 crowdReduction: '90% fewer visitors',
 currentCrowdLevel: 'Very Low (5% capacity)',
 bestTime: 'October – March (Flamingo migratory season, Sunset)',
 avgDuration: 'Half-day excursion (3–4 hours)',
 accessibility: {
 wheelchair: 'Railway station & viewpoint accessible; salt flat terrain requires sturdy footwear',
 seating: 'Rest area at Shakambhari Mata temple',
 audioGuide: 'Ecological guide available via Sambhar Heritage Foundation',
 tactilePaving: 'No'
 },
 whyVisit: 'India’s largest inland saline lake with endless white horizons, colonial salt train tracks, and thousands of winter migratory flamingoes.',
 distanceFromCenter: '75 km West of Jaipur (1.5 hr drive)',
 imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'Ramsar Wetland Site & Tourism Opportunity Zone',
 entryFee: 'Free Public Area'
 }
,
 {
 id: 'und-sisodia-rani',
 destinationId: 'jaipur',
 name: 'Sisodia Rani Ka Bagh & Water Palace',
 category: 'historical',
 subcategories: ['nature', 'historical', 'hidden-gems', 'couple'],
 coordinates: [26.8845, 75.8652],
 alternativeTo: ['city-palace', 'hawa-mahal'],
 crowdReduction: '76% fewer visitors',
 currentCrowdLevel: 'Low (14% capacity)',
 bestTime: '4:00 PM – 6:30 PM (Pre-sunset fountains)',
 avgDuration: '1.5 hours',
 accessibility: {
 wheelchair: 'Paved garden paths on lower tier; stepped terraced pavilions',
 seating: 'Shaded stone benches across all tiers',
 audioGuide: 'Heritage Information Boards in English & Hindi',
 tactilePaving: 'No'
 },
 whyVisit: 'Terraced Mughal-style charbagh garden built in 1728 AD featuring cascading waterways, fountains, and murals of Radha-Krishna.',
 distanceFromCenter: '6.5 km East of Badi Chaupar',
 imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'Protected Heritage Garden',
 entryFee: '₹50 (Indian), ₹200 (Foreigner)'
 },
 {
 id: 'und-vidyadhar-garden',
 destinationId: 'jaipur',
 name: 'Vidyadhar Garden',
 category: 'nature',
 subcategories: ['historical', 'hidden-gems', 'architecture'],
 coordinates: [26.8820, 75.8610],
 alternativeTo: ['albert-hall', 'jantar-mantar'],
 crowdReduction: '84% fewer visitors',
 currentCrowdLevel: 'Very Low (8% capacity)',
 bestTime: 'Morning 8:30 AM – 11:00 AM',
 avgDuration: '1 hour',
 accessibility: {
 wheelchair: 'Lower court accessible via wide gravel paths',
 seating: 'Peacock pavilion perimeter seating',
 audioGuide: 'Jaipur Development Authority Memorial Boards',
 tactilePaving: 'No'
 },
 whyVisit: 'Dedicated to Jaipur architect Vidyadhar Bhattacharya, this peaceful garden features cascading canals, mirror mosaics, and resident peacocks.',
 distanceFromCenter: '7.0 km from City Center',
 imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'JDA Heritage Preserved',
 entryFee: '₹30 (Indian), ₹100 (Foreigner)'
 },
 {
 id: 'und-chandlai-lake',
 destinationId: 'jaipur',
 name: 'Chandlai Lake Flamingo Wetland',
 category: 'nature',
 subcategories: ['adventure', 'hidden-gems'],
 coordinates: [26.7012, 75.8640],
 alternativeTo: ['jal-mahal', 'nahargarh-biological-park'],
 crowdReduction: '89% fewer visitors',
 currentCrowdLevel: 'Very Low (3% capacity)',
 bestTime: 'Sunrise 6:15 AM – 8:30 AM (Winter months)',
 avgDuration: '2 hours',
 accessibility: {
 wheelchair: 'Embankment road accessible by vehicle',
 seating: 'Natural earth mounds & lakeside viewpoint',
 audioGuide: 'Avian Species Field Guide (Online QR)',
 tactilePaving: 'No'
 },
 whyVisit: 'Peaceful 140-year-old freshwater wetland hosting thousands of winter migratory greater flamingos and pied avocets.',
 distanceFromCenter: '30 km South of Jaipur (Tonk Road)',
 imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'State Wetland Conservation Site',
 entryFee: 'Free Public Area'
 },
 {
 id: 'und-sanganer-paper',
 destinationId: 'jaipur',
 name: 'Sanganer Kagzi Handmade Paper Guild',
 category: 'culture',
 subcategories: ['shopping', 'hidden-gems'],
 coordinates: [26.8180, 75.7680],
 alternativeTo: ['bapu-bazaar', 'johari-bazaar'],
 crowdReduction: '81% fewer visitors',
 currentCrowdLevel: 'Low (16% capacity)',
 bestTime: '10:30 AM – 1:00 PM for live vat demonstrations',
 avgDuration: '1.5 hours',
 accessibility: {
 wheelchair: 'Ground-level artisan workshops on flat paved alleys',
 seating: 'Workshop visitor seating provided',
 audioGuide: 'Live master papermaker guided tour',
 tactilePaving: 'No'
 },
 whyVisit: '400-year-old sustainable cotton-rag papermaking craft founded during Raja Man Singh I’s reign.',
 distanceFromCenter: '14 km South of Jaipur',
 imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'KVIC & Craft Guild Registry',
 entryFee: 'Free (Hands-on workshop ₹250)'
 },
 {
 id: 'und-kanak-vrindavan',
 destinationId: 'jaipur',
 name: 'Kanak Vrindavan Valley Garden',
 category: 'historical',
 subcategories: ['nature', 'hidden-gems', 'couple'],
 coordinates: [26.9550, 75.8450],
 alternativeTo: ['jal-mahal', 'amber-fort'],
 crowdReduction: '70% fewer visitors',
 currentCrowdLevel: 'Low (22% capacity)',
 bestTime: '4:00 PM – 6:30 PM (Late afternoon golden light)',
 avgDuration: '1 hour',
 accessibility: {
 wheelchair: 'Courtyards accessible; gentle gradient walkways',
 seating: 'Stone marble benches around water fountains',
 audioGuide: 'RTDC Tourist Information kiosk',
 tactilePaving: 'Partial'
 },
 whyVisit: 'Landscaped valley garden framed by Nahargarh and Jaigarh cliffs with marble fountains and Govind Dev Ji temple sanctum.',
 distanceFromCenter: '7.5 km North of City Center',
 imageUrl: 'https://images.unsplash.com/photo-1588096344356-9b578c773950?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'RTDC Maintained Heritage Site',
 entryFee: '₹20 (Indian), ₹50 (Foreigner)'
 },
 {
 id: 'und-achrol-fort',
 destinationId: 'jaipur',
 name: 'Achrol Fort & Sand Dunes Trek',
 category: 'adventure',
 subcategories: ['nature', 'historical', 'hidden-gems'],
 coordinates: [27.1380, 75.9520],
 alternativeTo: ['nahargarh-fort', 'jaigarh-fort'],
 crowdReduction: '92% fewer visitors',
 currentCrowdLevel: 'Very Low (2% capacity)',
 bestTime: '6:00 AM – 9:00 AM or Winter Sunsets',
 avgDuration: '3 hours',
 accessibility: {
 wheelchair: 'Rugged hill trail (Sturdy hiking shoes required)',
 seating: 'Natural ridge stone outcrops',
 audioGuide: 'Trail map GPS waypoint track',
 tactilePaving: 'No'
 },
 whyVisit: '16th-century fortress ruins perched on a rocky ridge with adjoining sand dunes and zero tourist bus congestion.',
 distanceFromCenter: '35 km North on Delhi Highway',
 imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'Trekking Guild & Forest Survey',
 entryFee: 'Free Trek'
 },
 {
 id: 'und-samode-stepwell',
 destinationId: 'jaipur',
 name: 'Samode Palace & Ancient Baori Circuit',
 category: 'historical',
 subcategories: ['architecture', 'culture', 'hidden-gems'],
 coordinates: [27.2180, 75.8150],
 alternativeTo: ['city-palace', 'amber-fort'],
 crowdReduction: '79% fewer visitors',
 currentCrowdLevel: 'Low (18% capacity)',
 bestTime: '11:00 AM – 4:00 PM',
 avgDuration: '3.5 hours',
 accessibility: {
 wheelchair: 'Palace courtyards accessible; stepwells have historic stairs',
 seating: 'Courtyard lounge and village haveli verandas',
 audioGuide: 'Heritage Hotel Curated Audio Walk',
 tactilePaving: 'No'
 },
 whyVisit: '475-year-old regal palace with Shekhawati frescoed halls, mirror mosaic Sultan Mahal, and authentic village stepwells.',
 distanceFromCenter: '42 km North of Jaipur',
 imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'INTACH & Heritage Registry',
 entryFee: '₹1,000 (Includes high tea & guided palace tour)'
 },
 {
 id: 'und-elefantastic',
 destinationId: 'jaipur',
 name: 'Elefantastic Eco-Conservation Sanctuary',
 category: 'nature',
 subcategories: ['culture', 'family', 'hidden-gems'],
 coordinates: [26.9950, 75.8750],
 alternativeTo: ['nahargarh-biological-park', 'jal-mahal'],
 crowdReduction: '75% fewer visitors',
 currentCrowdLevel: 'Low (Controlled Group Entry)',
 bestTime: 'Morning 9:00 AM – 1:00 PM',
 avgDuration: '3 hours',
 accessibility: {
 wheelchair: 'Sanctuary grounds and village kitchen flat and accessible',
 seating: 'Shaded thatched verandas and visitor pavilion',
 audioGuide: 'Live conservationist orientation',
 tactilePaving: 'No'
 },
 whyVisit: 'Cruelty-free elephant rescue village where visitors feed, bathe, and paint natural vegetable dyes with gentle rescued elephants.',
 distanceFromCenter: '13 km from City Center',
 imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'Animal Welfare Board of India',
 entryFee: '₹1,500 (Full interactive session & village lunch)'
 },
 {
 id: 'und-hathni-kund',
 destinationId: 'jaipur',
 name: 'Hathni Kund Gorge & Shiva Pool',
 category: 'adventure',
 subcategories: ['nature', 'hidden-gems'],
 coordinates: [26.9550, 75.8720],
 alternativeTo: ['nahargarh-fort', 'amber-fort'],
 crowdReduction: '88% fewer visitors',
 currentCrowdLevel: 'Very Low (5% capacity)',
 bestTime: 'Early Morning 6:30 AM – 9:00 AM',
 avgDuration: '2.5 hours',
 accessibility: {
 wheelchair: 'Rocky canyon trail (Trekking footwear recommended)',
 seating: 'Natural boulder terraces along seasonal stream',
 audioGuide: 'Forest trail marker board at base',
 tactilePaving: 'No'
 },
 whyVisit: 'Secluded rocky canyon in the Aravalli ridge leading to an ancient stone-carved Shiva pool with cascading monsoon streams.',
 distanceFromCenter: '9.0 km from City Center',
 imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
 verificationBadge: 'Jaipur Eco-Trek Forest Department',
 entryFee: 'Free Trek'
 }
];

// ==========================================
// 2. LOCAL ARTISANS, TRADERS & GUIDES
// ==========================================
export const LOCAL_ARTISANS = [
 {
 id: 'artisan-bagru-chippa',
 name: 'Master Ramprasad Chippa & Sons',
 craftType: 'Dabu & Natural Indigo Block Printing',
 category: 'Textiles & Natural Dyes',
 experienceYears: '42 years (5th Generation Master)',
 location: 'Main Chippa Mohalla, Bagru Village, Jaipur',
 coordinates: [26.8123, 75.5489],
 contactNumber: '+91 94142 88712',
 operatingHours: '9:00 AM – 6:30 PM (Mon – Sat)',
 authenticityBadge: 'National Handloom Awardee',
 products: ['Hand-printed Organic Cotton Scarves', 'Running Fabrics', 'Natural Indigo Sarees', 'Bedspreads'],
 priceRange: '₹350 – ₹3,500',
 story: 'Practicing the 350-year-old mud-resist Dabu technique using local black river clay, sawdust and pomegranate rind natural dye baths.',
 workshopAvailable: true,
 workshopDuration: '90 mins (Print your own scarf - ₹450)',
 imageUrl: 'https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=600&q=80'
 },
 {
 id: 'artisan-blue-pottery',
 name: 'Kripal Kumbh Studio (Heritage Glaze)',
 craftType: 'Traditional Jaipur Blue Pottery',
 category: 'Ceramics & Stonecraft',
 experienceYears: '50+ years tradition',
 location: 'B-18, Shiv Marg, Bani Park, Jaipur',
 coordinates: [26.9288, 75.7924],
 contactNumber: '+91 141 2201163',
 operatingHours: '10:00 AM – 6:00 PM (Daily except Sunday)',
 authenticityBadge: 'Padma Shri Kripal Singh Heritage Studio',
 products: ['Hand-glazed Tiles', 'Decorative Quartz Urns', 'Coasters', 'Wall Plates'],
 priceRange: '₹200 – ₹8,000',
 story: 'Jaipur Blue Pottery is uniquely made without clay using ground quartz stone, Fuller’s earth and natural copper sulphate oxide glazes.',
 workshopAvailable: true,
 workshopDuration: '60 mins demonstration & studio tour',
 imageUrl: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80'
 },
 {
 id: 'artisan-surana-meenakari',
 name: 'Laxminarayan & Brothers Enamellers',
 craftType: 'Royal Kundan-Meenakari Gold Enamelling',
 category: 'Jewelry & Enamel',
 experienceYears: '38 years',
 location: 'Gopalji Ka Rasta, Johari Bazaar, Jaipur',
 coordinates: [26.9215, 75.8256],
 contactNumber: '+91 98290 54120',
 operatingHours: '11:00 AM – 7:30 PM (Daily)',
 authenticityBadge: 'State Master Craftsperson Guild',
 products: ['Meenakari Earrings', 'Pendants', 'Silver Filigree Boxes', 'Artisan Cufflinks'],
 priceRange: '₹800 – ₹25,000',
 story: 'Preserving Mughal-Rajput enamel fusion where vivid mineral powders are baked into engraved precious metal contours.',
 workshopAvailable: false,
 workshopDuration: 'Custom orders & in-studio inspection',
 imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
 },
 {
 id: 'artisan-tarkashi-wood',
 name: 'Mohan Lal Tarkashi Workshop',
 craftType: 'Brass Wire Inlay in Sheesham Hardwood',
 category: 'Woodcraft',
 experienceYears: '30 years',
 location: 'Thakur Das Ka Rasta, Kishanpole Bazaar, Jaipur',
 coordinates: [26.9189, 75.8198],
 contactNumber: '+91 98281 77319',
 operatingHours: '10:30 AM – 7:00 PM (Mon – Sat)',
 authenticityBadge: 'All India Handicrafts Board Verified',
 products: ['Inlaid Wooden Boxes', 'Mirrors', 'Heritage Trays', 'Chess Sets'],
 priceRange: '₹400 – ₹6,500',
 story: 'Intricate brass and copper wires are hammered with pinpoint precision into chiselled dark Sheesham wood patterns.',
 workshopAvailable: true,
 workshopDuration: '45 mins live carving preview',
 imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
 },
 {
 id: 'guide-heritage-ramesh',
 name: 'Rameshwar Sharma (Certified Heritage Guide)',
 craftType: 'State Approved Tourism & Architecture Guide',
 category: 'Authorized Guides',
 experienceYears: '18 years guiding',
 location: 'Amber Fort & Walled City Circuits',
 coordinates: [26.9855, 75.8507],
 contactNumber: '+91 94140 22341',
 operatingHours: '7:30 AM – 6:00 PM',
 authenticityBadge: 'Govt. Dept of Tourism License #RTG-1482',
 products: ['Walled City Walk (2 hrs)', 'Amber Stepwell & Temple Trail (3 hrs)', 'Jantar Mantar Astronomical Tour'],
 priceRange: '₹800 – ₹1,500 per group (Govt Fixed Tariff)',
 story: 'Specializes in 18th-century Rajput astronomy, stepwell hydraulics, and living bazaar oral history in English, Hindi & French.',
 workshopAvailable: true,
 workshopDuration: 'Walking tour custom durations',
 imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
 }
];

// ==========================================
// 3. EMERGENCY SERVICES: POLICE & HOSPITALS
// ==========================================
export const POLICE_STATIONS = [
 {
 id: 'police-tourist-amer',
 name: 'Tourist Police Station, Amer Fort',
 type: 'Dedicated Tourist Police Desk',
 location: 'Opposite Maota Lake Parking, Amer',
 coordinates: [26.9855, 75.8507],
 phone: '0141-2530848',
 emergencyHelpline: '112 / 100',
 jurisdiction: 'Amber Fort, Panna Meena Kund, Jaigarh, Nahargarh Forest Route',
 features: ['English & Hindi Speaking Staff', 'Instant Lost Property Tracking', 'Tourist FIR Assistance', '24x7 PCR Patrol Vehicle'],
 is24x7: true
 },
 {
 id: 'police-tourist-walled-city',
 name: 'Tourist Police Assistance Booth, Badi Chaupar',
 type: 'Tourist Assistance Post',
 location: 'Badi Chaupar Crossing, Near Hawa Mahal',
 coordinates: [26.9242, 75.8272],
 phone: '0141-2601955',
 emergencyHelpline: '112 / 1090',
 jurisdiction: 'Hawa Mahal, Johari Bazaar, Tripoliya Bazaar, City Palace Area',
 features: ['Direct CCTV Monitoring of Bazaars', 'Touting & Overcharging Redressal', 'First Aid Kit'],
 is24x7: true
 },
 {
 id: 'police-women-kotwali',
 name: 'Pink City Women Police Station (Kotwali)',
 type: 'Dedicated Women & Child Protection Station',
 location: 'Kotwali Circle, Chhoti Chaupar, Jaipur',
 coordinates: [26.9220, 75.8200],
 phone: '0141-2600100',
 emergencyHelpline: '1090 (Women Helpline) / 112',
 jurisdiction: 'Jaipur Heritage District & Central Commercial Corridors',
 features: ['All-Women Police Helpdesk', 'Safe Escort Facility for Solo Travelers in Distress', 'Counselling & Legal Aid'],
 is24x7: true
 },
 {
 id: 'police-railway-station',
 name: 'Jaipur Junction GRP Tourist Help Desk',
 type: 'Railway Tourist Police',
 location: 'Platform 1 Concourse, Jaipur Central Railway Station',
 coordinates: [26.9200, 75.7878],
 phone: '0141-2374242',
 emergencyHelpline: '139 / 112',
 jurisdiction: 'Jaipur Railway Station & Metro Interchange',
 features: ['Pre-paid Cab Verification', 'Touting Complaint Counter', 'Luggage Cloakroom Assistance'],
 is24x7: true
 }
];

export const HOSPITALS = [
 {
 id: 'hosp-sms-trauma',
 name: 'SMS Hospital & Medical College (Government Trauma Centre)',
 type: 'Government Super-Speciality Hospital',
 location: 'Jawahar Lal Nehru Marg, Jaipur',
 coordinates: [26.8967, 75.8167],
 phone: '0141-2518224',
 emergencyAmbulance: '108 / 0141-2518420',
 beds: '3,000+ Beds',
 facilities: ['24x7 Level-1 Trauma Centre', 'Burn Unit', 'Blood Bank', 'Free Emergency Care', 'Specialist ICUs'],
 distanceFromCenter: '3.2 km',
 is24x7: true
 },
 {
 id: 'hosp-fortis-escorts',
 name: 'Fortis Escorts Hospital Jaipur',
 type: 'NABH Accredited Multi-Speciality Private Hospital',
 location: 'Jawaharlal Nehru Marg, Malviya Nagar, Jaipur',
 coordinates: [26.8480, 75.8030],
 phone: '0141-2547000',
 emergencyAmbulance: '105010 / 0141-2547000',
 beds: '245 Beds',
 facilities: ['International Patient Desk', '24x7 Cardiac & Emergency Care', 'Comprehensive Diagnostic Labs', 'English Speaking Staff'],
 distanceFromCenter: '8.5 km',
 is24x7: true
 },
 {
 id: 'hosp-sdmh',
 name: 'Santokba Durlabhji Memorial Hospital (SDMH)',
 type: 'Charitable Trust Multi-Speciality Hospital',
 location: 'Bhawani Singh Marg, Near Rambagh Circle, Jaipur',
 coordinates: [26.8920, 75.8040],
 phone: '0141-2566251',
 emergencyAmbulance: '0141-2566251 Ext. 100',
 beds: '500 Beds',
 facilities: ['24x7 Emergency Room', 'Orthopedic & Trauma Surgery', 'Pharmacy & Blood Bank', 'Affordable Care'],
 distanceFromCenter: '4.1 km',
 is24x7: true
 }
];

// ==========================================
// 4. OFFICIAL GOVERNMENT ADVISORIES & RULES
// ==========================================
export const GOVERNMENT_ADVISORIES = [
 {
 id: 'adv-heat',
 category: 'weather-health',
 severity: 'Medium',
 title: 'Midday Afternoon Sun Advisory (Forts & Stepwells)',
 summary: 'Temperatures peak between 12:00 PM and 3:30 PM. Plan open-sky monument climbs (Amer, Nahargarh, Jaigarh) during morning hours (7:30–10:30 AM) or sunset (4:30–6:30 PM).',
 authority: 'Rajasthan Dept. of Tourism & State Health Mission',
 updatedAt: 'Today, 08:00 AM',
 validUntil: 'Seasonal (Summer/Autumn)'
 },
 {
 id: 'adv-guides',
 category: 'tourist-safety',
 severity: 'High',
 title: 'Authorized Guide Verification Mandatory',
 summary: 'Hire only Rajasthan Tourism certified guides carrying laminated biometric QR photo ID cards. Fixed tariffs apply: ₹400 (up to 4 pax) to ₹800 (large groups) for standard 2-hour monuments.',
 authority: 'Tourist Police Jaipur',
 updatedAt: 'Active',
 validUntil: 'Permanent'
 },
 {
 id: 'adv-drones',
 category: 'legal-regulation',
 severity: 'Strict',
 title: 'Drone Prohibition Around Heritage & Airport Buffers',
 summary: 'Flying unmanned aerial vehicles (UAVs / drones) without explicit prior DGCA and Police Commissioner clearance is strictly prohibited within 5 km of any ASI monument and civil airport.',
 authority: 'DGCA & Archeological Survey of India',
 updatedAt: 'Active',
 validUntil: 'Permanent'
 },
 {
 id: 'adv-composite-pass',
 category: 'public-convenience',
 severity: 'Info',
 title: 'Save 40% with Rajasthan ASI Composite Monument Pass',
 summary: 'Composite ticket valid for 2 consecutive days covers Amber Fort, Albert Hall Museum, Hawa Mahal, Jantar Mantar, Nahargarh Fort, and Sisodia Rani Garden.',
 authority: 'Rajasthan State Archaeology & Museums Dept.',
 updatedAt: 'Active',
 validUntil: 'Ongoing'
 }
];

// ==========================================
// 5. CIVIC COMPLAINT CATEGORIES & LOGS
// ==========================================
export const TOURIST_COMPLAINT_CATEGORIES = [
 { id: 'safety', label: 'Safety & Security', icon: '', color: '#DC2626' },
 { id: 'cleanliness', label: 'Cleanliness & Sanitation', icon: '', color: '#10B981' },
 { id: 'overcrowding', label: 'Overcrowding & Surge', icon: '', color: '#F59E0B' },
 { id: 'accessibility', label: 'Accessibility & Ramps', icon: '', color: '#3B82F6' },
 { id: 'infrastructure', label: 'Infrastructure & Walkways', icon: '', color: '#8B5CF6' },
 { id: 'signage', label: 'Signage & Directions', icon: '', color: '#EC4899' },
 { id: 'public-facilities', label: 'Public Facilities & Restrooms', icon: '', color: '#0F766E' },
 { id: 'other', label: 'Other Tourism Issues', icon: '', color: '#6B7280' }
];

export const SAMPLE_COMPLAINTS_INTEL = [
 {
 ticketId: 'YTR-2026-8941',
 category: 'overcharging',
 categoryLabel: 'Overcharging (Auto-Rickshaw)',
 location: 'Hawa Mahal to Amber Fort Route',
 description: 'Auto driver demanded ₹650 instead of standard meter/prepaid rate of ₹220, refused meter.',
 timestamp: '2026-09-06 14:20',
 status: 'Action Taken',
 statusBadge: 'badge-success',
 resolutionNote: 'Traffic Police Booth #4 issued warning and verified fare compliance at Badi Chaupar stand.',
 dept: 'Traffic Police & Regional Transport Office'
 },
 {
 ticketId: 'YTR-2026-8910',
 category: 'accessibility',
 categoryLabel: 'Blocked Wheelchair Access',
 location: 'Jantar Mantar East Ramp',
 description: 'Ramp entrance was obstructed by temporary vendor carts preventing wheelchair entry.',
 timestamp: '2026-09-05 11:15',
 status: 'Resolved',
 statusBadge: 'badge-success',
 resolutionNote: 'Monument administration cleared obstacle within 25 minutes and stationed permanent security cone.',
 dept: 'Jaipur Heritage Cell & ASI'
 },
 {
 ticketId: 'YTR-2026-8874',
 category: 'fake-guides',
 categoryLabel: 'Unauthorized Guide Touting',
 location: 'Amer Fort Elephant Stand',
 description: 'Individual without official tourist badge approached claiming palace was closed and guided to private emporium.',
 timestamp: '2026-09-04 16:40',
 status: 'Under Investigation',
 statusBadge: 'badge-warning',
 resolutionNote: 'Tourist Police Station Amer notified. Extra patrolling deployed near ticket counter.',
 dept: 'Tourist Police Jaipur'
 },
 {
 ticketId: 'YTR-2026-8822',
 category: 'hygiene',
 categoryLabel: 'Sanitation Issue',
 location: 'Nahargarh Fort Sunset Viewpoint Restroom',
 description: 'Water dispenser empty and restroom facility needed maintenance during peak sunset hours.',
 timestamp: '2026-09-03 18:30',
 status: 'Resolved',
 statusBadge: 'badge-success',
 resolutionNote: 'Civic facility team dispatched water replenishment and completed deep sanitation.',
 dept: 'Jaipur Municipal Corporation (Heritage)'
 }
];

// ==========================================
// 6. TOURISM PRESSURE ZONES & CAPACITY DATA
// ==========================================
export const TOURISM_PRESSURE_ZONES = [
 {
 id: 'zone-walled-city',
 name: 'Walled City Heritage Core (Hawa Mahal – Johari)',
 carryingCapacity: 45000,
 currentLoad: 41200,
 utilizationPercent: 91,
 status: 'High Surge Pressure',
 statusClass: 'status-danger',
 peakHours: '11:00 AM – 04:30 PM & 06:00 PM – 08:30 PM',
 topOvercrowdedMonuments: ['Hawa Mahal', 'City Palace Courtyard', 'Johari Bazaar Central'],
 recommendedOpportunityZones: ['und-maharani-ki-chhatri', 'und-bagru-village', 'und-gaitor-tumbas'],
 mitigationStrategy: 'Divert tour buses to Amer outer bypass; suggest Maharani Ki Chhatri and Gaitor Chhatris.'
 },
 {
 id: 'zone-amer-hills',
 name: 'Amer & Nahargarh Fort Ridge Corridor',
 carryingCapacity: 35000,
 currentLoad: 31500,
 utilizationPercent: 90,
 status: 'High Surge Pressure',
 statusClass: 'status-danger',
 peakHours: '10:00 AM – 02:00 PM (Amber) & 05:00 PM – 07:00 PM (Nahargarh)',
 topOvercrowdedMonuments: ['Amber Fort Elephant Deck', 'Nahargarh Sunset Point', 'Jaigarh Cannon Ridge'],
 recommendedOpportunityZones: ['und-panna-meena-kund', 'und-jagat-shiromani'],
 mitigationStrategy: 'Promote Panna Meena Kund and Jagat Shiromani Temple 400m away to relieve main ramp.'
 },
 {
 id: 'zone-central-museums',
 name: 'Ram Niwas Garden & Albert Hall Zone',
 carryingCapacity: 25000,
 currentLoad: 11800,
 utilizationPercent: 47,
 status: 'Optimal / Moderate',
 statusClass: 'status-optimal',
 peakHours: '04:00 PM – 07:30 PM',
 topOvercrowdedMonuments: ['Albert Hall Main Rotunda'],
 recommendedOpportunityZones: ['und-maharani-ki-chhatri'],
 mitigationStrategy: 'Balanced flow. Ideal landing point for afternoon cultural visitors.'
 },
 {
 id: 'zone-bagru-corridor',
 name: 'Bagru – Sanganer Artisan Opportunity Zone',
 carryingCapacity: 20000,
 currentLoad: 3400,
 utilizationPercent: 17,
 status: 'High Absorption Potential (Opportunity Zone)',
 statusClass: 'status-opportunity',
 peakHours: '11:00 AM – 03:00 PM',
 topOvercrowdedMonuments: [],
 recommendedOpportunityZones: ['und-bagru-village'],
 mitigationStrategy: 'Active incentive promotion: Directing cultural tourists here boosts grassroots economy by 32%.'
 },
 {
 id: 'zone-sambhar-wetland',
 name: 'Sambhar Heritage & Eco Opportunity Zone',
 carryingCapacity: 15000,
 currentLoad: 1200,
 utilizationPercent: 8,
 status: 'High Absorption Potential (Opportunity Zone)',
 statusClass: 'status-opportunity',
 peakHours: '03:30 PM – 06:30 PM',
 topOvercrowdedMonuments: [],
 recommendedOpportunityZones: ['und-sambhar-lake'],
 mitigationStrategy: 'Promote weekend eco-trails and sunset photography to decongest city center.'
 }
];





// ==========================================================================
// SAFARNAMA - CURATED TRAVEL JOURNEYS & DESTINATION STORIES
// ==========================================================================
export const SAFARNAMA_JOURNEYS = [
 {
 id: 'journey-walled-city',
 title: 'The Living Walled City & Artisan Guilds',
 subtitle: 'A 6-hour slow exploration through pink terracotta gates, block-printing havelis, and sunrise courtyards.',
 featured: true,
 heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80',
 curator: 'Mahima Rathore',
 curatorRole: 'Heritage Architect & Jaipur Chronicler',
 curatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
 duration: '1 Day (6 Hours)',
 travelStyle: 'Heritage & Living Crafts',
 bestSeason: 'October to March (Morning 7:30 AM recommended)',
 crowdLevel: 'Moderate to Low',
 stops: [
 {
 placeId: 'hawa-mahal',
 name: 'Hawa Mahal (Palace of Winds)',
 timing: '08:00 AM',
 context: 'Witness the sunrise light filtering through 953 honeycomb lattice windows before tour buses arrive.',
 highlight: 'Climb to the top terrace for a direct view across Jantar Mantar and the city grid.',
 localTip: 'Visit Wind View Cafe across the road for an uninterrupted morning perspective.'
 },
 {
 placeId: 'johari-bazaar',
 name: 'Johari Bazaar & Meenakari Alleys',
 timing: '10:30 AM',
 context: 'Walk into centuries-old jewelry guild courtyards where master craftsmen practice traditional Kundan enamel work.',
 highlight: 'Gopalji Ka Rasta alleyway for handmade silver and authentic gemstone cutting.',
 localTip: 'Drop by LMB for fresh Pyaaz Kachori and Rabri Ghewar.'
 },
 {
 placeId: 'und-maharani-ki-chhatri',
 name: 'Maharani Ki Chhatri (Cenotaphs)',
 timing: '01:30 PM',
 context: 'Serene carved marble and sandstone pavilions honoring the royal queens of Jaipur, completely free of crowds.',
 highlight: 'Intricate floral filigree pillars and tranquil mountain backdrop.',
 localTip: 'Carry drinking water as this preserved site has no commercial stalls.'
 },
 {
 placeId: 'und-bagru-village',
 name: 'Bagru Natural Dye Artisan Hub',
 timing: '03:30 PM',
 context: 'Hands-on natural vegetable-dye hand block printing on organic cotton with 5th generation Chippa families.',
 highlight: 'Watch the Dabu mud-resist drying fields under open sunshine.',
 localTip: 'Buy authentic block-printed shawls directly from artisan cooperative workshops.'
 }
 ],
 highlights: [
 'Over 68% less crowd exposure compared to peak standard circuits',
 'Direct interaction with 2 state-awarded master craftspeople',
 'Optimal pedestrian safety through well-lit heritage transit corridors'
 ],
 localDiscoveries: [
 'Fresh spiced buttermilk at Ramchandra Kulfi Bhandar',
 'Authentic herbal indigo vats at Chippa Mohalla, Bagru'
 ]
 },
 {
 id: 'journey-aravalli-forts',
 title: 'Aravalli Fortresses & Secret Stepwells',
 subtitle: 'From 16th-century fortress ramparts to geometric optical illusion stepwells and hilltop sunset terraces.',
 featured: false,
 heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
 curator: 'Vikramaditya Singh',
 curatorRole: 'Aravalli Trail Guide',
 curatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
 duration: 'Half Day (4.5 Hours)',
 travelStyle: 'Architecture & Sunset Vistas',
 bestSeason: 'Year Round (Early morning or 03:30 PM - 07:00 PM)',
 crowdLevel: 'Low to Moderate',
 stops: [
 {
 placeId: 'panna-meena-kund',
 name: 'Panna Meena Ka Kund Stepwell',
 timing: '03:30 PM',
 context: '16th-century geometric stepwell with interlocking criss-cross stairs, located 400m from Amer Fort.',
 highlight: 'Photographic symmetry with shadow play on yellow ochre stone.',
 localTip: 'Visit Bihari Ji Mandir directly adjacent for peace and ancient stone carvings.'
 },
 {
 placeId: 'jagat-shiromani',
 name: 'Jagat Shiromani Temple',
 timing: '04:45 PM',
 context: 'Rare temple with intricately carved white marble torana gate and black stone Krishna idol worshipped by Meera Bai.',
 highlight: 'One of the finest stone torana gateways in North India.',
 localTip: 'Quiet courtyard with almost zero tourist crowds.'
 },
 {
 placeId: 'nahargarh-fort',
 name: 'Nahargarh Fort Sunset Terrace',
 timing: '06:00 PM',
 context: 'Aravalli ridge ramparts offering a 360-degree sunset panorama over Jaipur city lights.',
 highlight: 'Padao open-air deck and the 12 royal suites of Madhavendra Bhawan.',
 localTip: 'Use the well-lit Amer Road safety corridor for the evening return descent.'
 }
 ],
 highlights: [
 'Uninterrupted sunset vistas from 700 feet above the valley',
 'Stepwell geometry without bus tour congestion'
 ],
 localDiscoveries: [
 'Clay pot spiced tea at Charan Mandir hilltop rest stop',
 'Peacock sightings along the Nahargarh forest sanctuary ascent'
 ]
 }
];
