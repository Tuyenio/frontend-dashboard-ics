/**
 * AuthCard Component
 * Card header with logo and title for auth pages
 */

'use client';

import Image from 'next/image';

interface AuthCardHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthCardHeader({ title, subtitle }: AuthCardHeaderProps) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-16 h-16 mb-4">
        <Image 
          src="/logoics.png" 
          alt="ICS Logo" 
          fill 
          className="object-contain" 
        />
      </div>
      <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
        {title}
      </h1>
      <p className="text-slate-600 dark:text-slate-400 text-center">
        {subtitle}
      </p>
    </div>
  );
}
