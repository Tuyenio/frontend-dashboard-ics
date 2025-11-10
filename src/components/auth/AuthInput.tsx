/**
 * AuthInput Component
 * Reusable input component for auth forms
 */

'use client';

import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  hint?: string;
}

export default function AuthInput({ 
  label, 
  icon: Icon, 
  type = 'text',
  error,
  hint,
  ...props 
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type={inputType}
          className={`w-full pl-12 ${isPassword ? 'pr-12' : 'pr-4'} py-3 bg-slate-50 dark:bg-slate-800 blue:bg-slate-800 border ${
            error 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-slate-200 dark:border-slate-700 blue:border-slate-700'
          } rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {hint && !error && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
