'use client';

interface AdBlockProps {
  size: 'leaderboard' | 'rectangle' | 'sidebar' | 'mobile-banner';
  label?: string;
  className?: string;
}

const AD_SIZES = {
  leaderboard: { width: '100%', height: '90px', text: '728×90 Leaderboard Ad' },
  rectangle: { width: '100%', height: '250px', text: '336×280 Rectangle Ad' },
  sidebar: { width: '100%', height: '250px', text: '300×250 Sidebar Ad' },
  'mobile-banner': { width: '100%', height: '50px', text: '320×50 Mobile Banner' },
};

export function AdBlock({ size, label = 'Advertisement', className = '' }: AdBlockProps) {
  const dims = AD_SIZES[size];

  return (
    <div className={`w-full ${className}`}>
      <p className="text-[10px] text-gray-400 text-center mb-1">{label}</p>
      <div
        className="ad-placeholder w-full flex flex-col items-center justify-center rounded-lg bg-gray-50 border border-dashed border-gray-200"
        style={{ minHeight: dims.height }}
        aria-label="Advertisement placeholder"
      >
        {/* Replace this div with your Google AdSense code snippet */}
        {/* <ins className="adsbygoogle" style={{display:'block'}} data-ad-client="ca-pub-XXXXXX" data-ad-slot="XXXXXXXX" data-ad-format="auto" /> */}
        <span className="text-gray-300 text-xs">{dims.text}</span>
      </div>
    </div>
  );
}

export default AdBlock;
