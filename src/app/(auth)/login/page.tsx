'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft, Chrome } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError(t('auth.login.errors.fillAllFields'));
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu token vào localStorage
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on role
        if (data.user.role === 'admin') {
          router.push('/dashboard/admin?loginSuccess=true');
        } else {
          router.push('/dashboard/user?loginSuccess=true');
        }
      } else {
        setError(data.message || t('auth.login.errors.invalidCredentials'));
      }
    } catch (err) {
      setError(t('auth.login.errors.serverError'));
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}${API_ENDPOINTS.AUTH.GOOGLE}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 light:from-white light:via-slate-50 light:to-slate-100 dark:from-black dark:via-slate-950 dark:to-black blue:from-slate-950 blue:via-slate-900 blue:to-slate-950 flex items-center justify-center p-6 transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 light:opacity-10"></div>

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 light:text-slate-700 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">{t('auth.common.backToHome')}</span>
      </Link>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-3xl blur-2xl opacity-20 light:opacity-10"></div>

        {/* Card */}
        <div className="relative bg-white light:bg-white light:shadow-2xl dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 md:p-12">
          {/* Logo */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-36 h-36 mb-3">
              <Image src="/logoics.png" alt="ICS Logo" fill className="object-contain" />
            </div>
            <h1 className="text-base font-black text-slate-900 light:text-slate-900 dark:text-white mb-1">
              {t('auth.login.title')}
            </h1>
            <p className="text-xs text-slate-600 light:text-slate-600 dark:text-slate-400 text-center">
              {t('auth.login.subtitle')}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 light:bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 light:text-slate-700 dark:text-slate-300 mb-1">
                {t('auth.login.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 light:text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={t('auth.common.emailPlaceholder')}
                  className="w-full pl-12 pr-4 py-2 bg-slate-50 light:bg-slate-100 dark:bg-slate-800 border border-slate-200 light:border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 light:text-slate-900 dark:text-white placeholder-slate-400 light:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 light:text-slate-700 dark:text-slate-300 mb-1">
                {t('auth.login.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 light:text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder={t('auth.common.passwordPlaceholder')}
                  className="w-full pl-12 pr-12 py-2 bg-slate-50 light:bg-slate-100 dark:bg-slate-800 border border-slate-200 light:border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 light:text-slate-900 dark:text-white placeholder-slate-400 light:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 light:text-slate-500 hover:text-slate-600 light:hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 light:text-blue-600 dark:text-blue-400 hover:underline"
              >
                {t('auth.login.forgotPassword')}
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>{t('auth.login.submit')}</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200 light:bg-slate-300 dark:bg-slate-700"></div>
            <span className="text-xs text-slate-500 light:text-slate-600 dark:text-slate-400">{t('auth.common.or')}</span>
            <div className="flex-1 h-px bg-slate-200 light:bg-slate-300 dark:bg-slate-700"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full py-2 bg-white light:bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-800 dark:text-slate-200 font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex items-center justify-center gap-3 shadow-md"
          >
            <Chrome className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">{t('auth.common.googleLogin')}</span>
          </button>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-600 light:text-slate-600 dark:text-slate-400">
              {t('auth.login.noAccount')}{' '}
              <Link
                href="/register"
                className="text-blue-600 light:text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                {t('auth.login.register')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
