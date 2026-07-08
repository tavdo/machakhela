'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { MapPin, Sparkles } from 'lucide-react';

interface MapNode {
  id: string;
  x: number;
  y: number;
  labelKey: string;
}

const mapNodes: MapNode[] = [
  { id: 'zipline', x: 120, y: 150, labelKey: 'zipline' },
  { id: 'ropepark', x: 230, y: 220, labelKey: 'ropepark' },
  { id: 'climbingwall', x: 310, y: 120, labelKey: 'climbingwall' },
  { id: 'karting', x: 420, y: 280, labelKey: 'karting' },
  { id: 'horseriding', x: 510, y: 140, labelKey: 'horseriding' },
  { id: 'riverboating', x: 600, y: 240, labelKey: 'riverboating' },
  { id: 'atvtours', x: 690, y: 130, labelKey: 'atvtours' },
  { id: 'shootingrange', x: 740, y: 220, labelKey: 'shootingrange' },
];

export const InteractiveMap: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    const element = document.getElementById(`activity-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="map" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-forest-surface px-3 py-1.5 rounded-full border border-stone-grey/20 text-xs font-semibold uppercase text-safety-orange tracking-widest mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{language === 'ka' ? 'აღმოაჩინე ხეობა' : language === 'ru' ? 'Исследуй Ущелье' : 'Discover the Valley'}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-text-offwhite font-oswald tracking-wide">
          {t.interactiveMapTitle}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-base text-text-sage">
          {t.interactiveMapSub}
        </p>
      </div>

      {/* SVG Map Container */}
      <div className="relative glass-panel rounded-3xl p-4 sm:p-8 overflow-hidden shadow-2xl border border-stone-grey/15">
        {/* Abstract Background Mountains/Gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-forest-deep via-forest-surface/30 to-forest-deep opacity-80 pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-safety-orange/5 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-harness-yellow/5 blur-3xl pointer-events-none" />

        <div className="relative aspect-[800/400] w-full min-h-[300px] select-none">
          <svg
            viewBox="0 0 800 400"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Mountain Contour Silhouettes */}
            <path
              d="M0 240 Q100 180 200 220 T400 260 T600 200 T800 260 L800 400 L0 400 Z"
              fill="rgba(22, 36, 27, 0.4)"
              stroke="rgba(140, 133, 120, 0.1)"
              strokeWidth="2"
            />
            <path
              d="M0 300 Q150 250 300 290 T600 310 T800 280 L800 400 L0 400 Z"
              fill="rgba(13, 22, 16, 0.6)"
              stroke="rgba(140, 133, 120, 0.05)"
              strokeWidth="2"
            />

            {/* The Machakhela River (Winding Light Blue/Clay Path) */}
            <path
              d="M-50 200 C100 120 180 280 320 200 C450 120 520 260 650 180 C740 130 780 220 850 150"
              fill="none"
              stroke="#D4A373"
              strokeWidth="12"
              strokeLinecap="round"
              strokeOpacity="0.15"
            />
            <path
              d="M-50 200 C100 120 180 280 320 200 C450 120 520 260 650 180 C740 130 780 220 850 150"
              fill="none"
              stroke="#D4A373"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.4"
            />

            {/* Connecting Adventure Trail Line */}
            <path
              d="M 120 150 Q 180 200 230 220 T 310 120 T 420 280 T 510 140 T 600 240 T 690 130 T 740 220"
              fill="none"
              stroke="#F2542D"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeOpacity="0.75"
            />

            {/* Interactive Nodes */}
            {mapNodes.map((node) => {
              const isActive = activeNode === node.id;
              const activity = t.activities[node.labelKey];

              return (
                <g
                  key={node.id}
                  className="map-node"
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  onClick={() => handleNodeClick(node.id)}
                >
                  {/* Glowing Pulse Aura (visible only when hovered/active) */}
                  {isActive && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="16"
                      fill="#F2542D"
                      fillOpacity="0.25"
                      className="animate-ping"
                    />
                  )}

                  {/* Inner Node Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isActive ? '8' : '6'}
                    fill={isActive ? '#F2542D' : '#F2A93B'}
                    stroke="#0D1610"
                    strokeWidth="2"
                    className="transition-all duration-300 cursor-pointer"
                  />

                  {/* Node Label tooltip-like bubble anchor */}
                  {isActive && activity && (
                    <g transform={`translate(${node.x}, ${node.y - 25})`}>
                      <rect
                        x="-70"
                        y="-35"
                        width="140"
                        height="30"
                        rx="6"
                        fill="#16241B"
                        stroke="#F2542D"
                        strokeWidth="1"
                        className="shadow-xl"
                      />
                      <text
                        x="0"
                        y="-15"
                        textAnchor="middle"
                        fill="#F4F5F4"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="var(--font-inter), sans-serif"
                      >
                        {activity.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected activity quick detail card (below map) */}
        <div className="mt-4 pt-4 border-t border-stone-grey/10 min-h-[90px] flex items-center justify-center text-center">
          {activeNode ? (
            <div>
              <div className="flex justify-center items-center space-x-2 text-harness-yellow mb-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-bold tracking-wide uppercase font-oswald text-safety-orange">
                  {t.activities[activeNode].name}
                </span>
                <span className="text-xs text-text-sage">|</span>
                <span className="text-xs font-semibold flex items-center bg-forest-hover px-2 py-0.5 rounded text-harness-yellow">
                  {t.adrenalineLabel}: {t.activities[activeNode].adrenaline}/5
                </span>
              </div>
              <p className="text-sm text-text-sage italic max-w-xl mx-auto">
                &quot;{t.activities[activeNode].tagline}&quot;
              </p>
              <p className="text-xs text-safety-orange font-bold uppercase mt-1">
                {language === 'ka' ? 'დააკლიკე სანახავად' : language === 'ru' ? 'Нажмите для просмотра' : 'Click to jump to details'}
              </p>
            </div>
          ) : (
            <div className="text-text-sage/60 text-sm flex flex-col items-center">
              <MapPin className="h-5 w-5 mb-1 animate-bounce text-stone-grey" />
              <p className="font-oswald tracking-wider uppercase text-xs">
                {t.mapPrompt}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
