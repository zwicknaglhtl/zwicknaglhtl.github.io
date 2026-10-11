importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js');

// Neue Version des Service Workers sofort aktivieren und Clients übernehmen
self.skipWaiting();
workbox.core.clientsClaim();

// Stale-While-Revalidate Strategie mit Unterstützung für Range-Requests (für MP3-Dateien)
const swrStrategy = new workbox.strategies.StaleWhileRevalidate({
  cacheName: 'soundboard-cache',
  plugins: [
    new workbox.rangeRequests.RangeRequestsPlugin(),
  ],
});

// App-Shell sowie alle MP3-Audiodateien für den Cache
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  'media/bond-james-bond.mp3',
  'media/die-besten-der-besten.mp3',
  'media/eagle-has-landed.mp3',
  'media/focus-trinity.mp3',
  'media/hasta-la-vista-baby.mp3',
  'media/houston-we-have-a-problem.mp3',
  'media/i-am-the-dude.mp3',
  'media/i-ll-be-back.mp3',
  'media/ich-bin-dein-vater.mp3',
  'media/ist-das-alles.mp3',
  'media/make-my-day.mp3',
  'media/mein-name-ist-maxiums.mp3',
  'media/nicht-einreden-nichts-kannst.mp3',
  'media/wahrheit-nicht-vertragen.mp3'
];

// Cache beim Installieren vorab befüllen
workbox.recipes.warmStrategyCache({
  urls: FILES_TO_CACHE,
  strategy: swrStrategy,
});

// Alle Anfragen der gleichen Origin über Stale-While-Revalidate ausliefern & im Hintergrund aktualisieren
workbox.routing.registerRoute(
  ({ url }) => url.origin === self.location.origin,
  swrStrategy
);