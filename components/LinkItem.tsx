
import React from 'react';

interface LinkItemProps {
  label: string;
  href: string;
}

export const LinkItem: React.FC<LinkItemProps> = ({ label, href }) => {
  return (
    <div className="flex items-center gap-4 mb-2 group">
      <span className="text-gray-400">•</span>
      <a
        href={href}
        target={href.startsWith('http') ? "_blank" : undefined}
        rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
        className="inline-flex items-center gap-1 px-1 transition-all duration-75 glitch-hover"
      >
        <span>{label}</span>
        {href.startsWith('http') && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        )}
      </a>
    </div>
  );
};
