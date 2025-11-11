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
        
        // Redirect based on role
        if (user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/user');
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-slate-600">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}