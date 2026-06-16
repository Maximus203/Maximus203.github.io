// Génère l'image de démo LOCALE du Meme Generator (issue #27).
// Scène plate, 100 % dessinée ici (copyright-safe, aucune dépendance tierce).
// Forme-only (pas de <text>) pour un rendu déterministe via resvg/sharp.
// Usage : node scripts/gen-meme-demo.cjs

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const W = 800;
const H = 600;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1e1b4b"/>
      <stop offset="0.5" stop-color="#312e81"/>
      <stop offset="1" stop-color="#0f172a"/>
    </linearGradient>
    <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="#ffffff" opacity="0.05"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)"/>

  <!-- accents : chevrons de code -->
  <polyline points="150,250 120,290 150,330" fill="none" stroke="#a78bfa" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>
  <polyline points="650,250 680,290 650,330" fill="none" stroke="#a78bfa" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>

  <!-- laptop : écran -->
  <rect x="265" y="175" width="270" height="175" rx="14" fill="#0b1220" stroke="#6366f1" stroke-width="5"/>
  <rect x="283" y="193" width="234" height="139" rx="6" fill="#0f172a"/>

  <!-- lignes de code -->
  <rect x="300" y="210" width="70"  height="10" rx="5" fill="#22d3ee"/>
  <rect x="380" y="210" width="110" height="10" rx="5" fill="#818cf8"/>
  <rect x="300" y="230" width="130" height="10" rx="5" fill="#34d399"/>
  <rect x="300" y="250" width="60"  height="10" rx="5" fill="#64748b"/>
  <rect x="370" y="250" width="90"  height="10" rx="5" fill="#22d3ee"/>
  <rect x="300" y="270" width="100" height="10" rx="5" fill="#818cf8"/>
  <rect x="410" y="270" width="14"  height="12" rx="2" fill="#e2e8f0"/>

  <!-- smiley vert "ça compile" -->
  <circle cx="455" cy="300" r="3.5" fill="#fbbf24"/>
  <circle cx="480" cy="300" r="3.5" fill="#fbbf24"/>
  <path d="M452 312 q14 12 31 0" fill="none" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round"/>

  <!-- base / clavier -->
  <path d="M232 350 H568 L600 392 H200 Z" fill="#334155" stroke="#475569" stroke-width="3"/>
  <rect x="360" y="364" width="80" height="10" rx="5" fill="#1e293b"/>

  <!-- mug de café -->
  <rect x="588" y="315" width="46" height="42" rx="8" fill="#f59e0b"/>
  <path d="M634 324 h10 a12 12 0 0 1 0 24 h-10" fill="none" stroke="#f59e0b" stroke-width="6"/>
  <path d="M600 305 q-6 -10 0 -20" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
  <path d="M614 305 q6 -10 0 -20" fill="none" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
</svg>`;

const outDir = path.join(__dirname, '..', 'public', 'assets', 'tools');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'meme-demo.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(outFile)
  .then((info) => {
    console.log(`OK ${outFile} (${info.width}x${info.height}, ${Math.round(info.size / 1024)} KB)`);
  })
  .catch((err) => {
    console.error('Echec generation meme-demo.png', err);
    process.exit(1);
  });
