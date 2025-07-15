'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/services/LoginService'
import { toast } from 'sonner'

interface AdminProtectedProps {
  children: React.ReactNode
}

export default function AdminProtected({ children }: AdminProtectedProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {

        
        // Thêm một khoảng thời gian nhỏ để đảm bảo localStorage đã được cập nhật
        setTimeout(() => {
          // Kiểm tra xem người dùng đã đăng nhập chưa
          const authenticated = isAuthenticated();

          
          if (!authenticated) {

            toast.error('Vui lòng đăng nhập để tiếp tục!');
            router.push('/login');
            return;
          }
          
          // Kiểm tra vai trò người dùng trực tiếp từ localStorage
          const role = localStorage.getItem('userRole');

          
          // Kiểm tra xem có phải admin không
          const isUserAdmin = role === 'admin' || role === 'ADMIN' || role === 'Admin';

          
          if (!isUserAdmin) {

            toast.error('Bạn không có quyền truy cập trang này!');
            router.push('/goldPrice');
            return;
          }
          
          setLoading(false);
        }, 500); // Đợi 500ms
      } catch (error) {
        console.error('AdminProtected - Error:', error);
        toast.error('Đã xảy ra lỗi khi kiểm tra quyền truy cập!');
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DAA520]"></div>
        <div className="ml-4 text-[#DAA520]">Đang kiểm tra quyền truy cập...</div>
      </div>
    )
  }

  return <>{children}</>
} 