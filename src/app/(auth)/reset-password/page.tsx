'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('Link đặt lại mật khẩu không hợp lệ.');
      return;
    }

    if (password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/auth/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          newPassword: password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setError(data.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (err) {
      setError('Không thể kết nối đến server. Vui lòng thử lại sau.');
      console.error('Reset password error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-black dark:via-slate-950 dark:to-black flex items-center justify-center p-6 transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-md z-10"
        >
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">
              Thành công!
            </h1>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Mật khẩu của bạn đã được đặt lại thành công.
            </p>
            
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Đang chuyển hướng đến trang đăng nhập...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-black dark:via-slate-950 dark:to-black flex items-center justify-center p-6 transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>

      {/* Back to Login Button */}
      <Link
        href="/login"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Quay lại đăng nhập</span>
      </Link>

      {/* Reset Password Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-3xl blur-2xl opacity-20"></div>

        {/* Card */}
        <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 md:p-12">
          {/* Logo */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-36 h-36 mb-3">
              <Image src="/logoics.png" alt="ICS Logo" fill className="object-contain" />
            </div>
            <h1 className="text-base font-black text-slate-900 dark:text-white mb-1">
              Đặt lại mật khẩu
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
              Nhập mật khẩu mới của bạn
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Mật khẩu mới
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                Tối thiểu 8 ký tự
              </p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !token}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Đặt lại mật khẩu</span>
                </>
              )}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Nhớ mật khẩu rồi?{' '}
              <Link
                href="/login"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
