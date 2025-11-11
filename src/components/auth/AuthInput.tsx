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
      <label className="block text-xs font-semibold text-slate-700 light:text-slate-700 dark:text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 light:text-slate-500" />
        <input
          type={inputType}
          className={`w-full pl-11 ${isPassword ? 'pr-11' : 'pr-4'} py-2.5 text-sm bg-slate-50 light:bg-slate-100 dark:bg-slate-800 border ${
            error 
              ? 'border-red-500 dark:border-red-400' 
              : 'border-slate-200 light:border-slate-300 dark:border-slate-700'
          } rounded-xl text-slate-900 light:text-slate-900 dark:text-white placeholder-slate-400 light:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 light:text-slate-500 hover:text-slate-600 light:hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {hint && !error && (
        <p className="mt-1 text-xs text-slate-500 light:text-slate-600 dark:text-slate-500">
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
