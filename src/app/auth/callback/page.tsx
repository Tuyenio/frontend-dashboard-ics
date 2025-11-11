'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const userString = searchParams.get('user');

    if (token && userString) {
      try {
        const user = JSON.parse(decodeURIComponent(userString));
        
        // Lưu token và user info
        localStorage.setItem('access_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        // Redirect based on role với thông báo thành công
        if (user.role === 'admin') {
          router.push('/admin?loginSuccess=true');
        } else {
          router.push('/user?loginSuccess=true');
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        router.push('/login?error=callback_failed');
      }
    } else {
      router.push('/login?error=no_token');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-black dark:via-slate-950 dark:to-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-slate-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Đang xử lý đăng nhập...
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Vui lòng đợi trong giây lát, chúng tôi đang chuyển hướng bạn đến dashboard.
        </p>
      </div>
    </div>
  );
}