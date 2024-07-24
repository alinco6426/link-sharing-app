import React from 'react';
import Image from 'next/image';
import iconRight from '../assets/icon-arrow-right.svg';

interface LinkProps {
  link: {
    id: number;
    name: string;
    url: string;
    color?: string;
    icon?: string;
    isVisible?: boolean;
  };
}

export default function LinkPreview({ link }: LinkProps) {
  return (
    <a href={link.url} style={{ backgroundColor: link.color }}>
      <span>
        {link.icon && (
          <Image src={link.icon} alt="platform-icon" className="platform-icon" width={20} height={20} />
        )}
        <p>{link.name}</p>
      </span>
      <Image src={iconRight} className="icon-arrow-right" alt="icon-arrow-right" width={20} height={20} />
    </a>
  );
}
