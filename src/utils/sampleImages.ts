// Generates high quality SVG sample comparison images as Data URLs

export const createSampleImage = (title: string, subtitle: string, isBefore: boolean): string => {
  const bg1 = isBefore ? '#1e293b' : '#0f172a';
  const bg2 = isBefore ? '#334155' : '#0369a1';
  const accent = isBefore ? '#94a3b8' : '#38bdf8';
  const badgeText = isBefore ? 'BEFORE (Original)' : 'AFTER (Processed / Enhanced)';
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bg1}" />
          <stop offset="100%" stop-color="${bg2}" />
        </linearGradient>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
        </pattern>
        <filter id="glow">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="800" fill="url(#bg)" />
      <rect width="1200" height="800" fill="url(#grid)" />
      
      <!-- Geometric Art -->
      <g filter="url(#glow)" opacity="0.8">
        <circle cx="${isBefore ? 400 : 800}" cy="400" r="${isBefore ? 180 : 220}" fill="${accent}" fill-opacity="${isBefore ? '0.15' : '0.25'}" stroke="${accent}" stroke-width="3"/>
        <rect x="${isBefore ? 200 : 550}" y="${isBefore ? 250 : 200}" width="300" height="300" rx="24" fill="none" stroke="${accent}" stroke-width="4" transform="rotate(${isBefore ? 15 : -15} 600 400)"/>
      </g>
      
      <!-- Mock UI Elements -->
      <g transform="translate(100, 100)">
        <rect width="1000" height="600" rx="16" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
        
        <!-- Header bar in mockup -->
        <rect x="0" y="0" width="1000" height="70" rx="16" fill="rgba(30, 41, 59, 0.9)" />
        <circle cx="40" cy="35" r="8" fill="#ef4444" />
        <circle cx="68" cy="35" r="8" fill="#f59e0b" />
        <circle cx="96" cy="35" r="8" fill="#10b981" />
        
        <text x="140" y="42" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="20" font-weight="bold">${title}</text>
        
        <!-- Badge -->
        <rect x="730" y="20" width="240" height="30" rx="6" fill="${accent}" fill-opacity="0.2" stroke="${accent}" stroke-width="1.5" />
        <text x="850" y="40" fill="${accent}" font-family="system-ui, sans-serif" font-size="13" font-weight="bold" text-anchor="middle">${badgeText}</text>
        
        <!-- Content Details -->
        <text x="80" y="160" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="36" font-weight="800">${subtitle}</text>
        <text x="80" y="210" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="18">Resolution: 1200 x 800 px • Color Space: sRGB</text>
        
        <!-- Interactive Chart Mockup -->
        <g transform="translate(80, 260)">
          <rect width="840" height="280" rx="12" fill="rgba(15, 23, 42, 0.5)" stroke="rgba(255,255,255,0.08)" />
          <path d="M 50 220 Q 200 80, 350 160 T 650 90 T 790 180" fill="none" stroke="${accent}" stroke-width="4" filter="url(#glow)" />
          <circle cx="350" cy="160" r="8" fill="${accent}" />
          <circle cx="650" cy="90" r="8" fill="${accent}" />
        </g>
      </g>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
};
