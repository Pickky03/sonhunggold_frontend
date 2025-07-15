'use client'

import { useState, useEffect } from 'react'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

export default function AuthDebug() {
  const [authInfo, setAuthInfo] = useState({
    token: '',
    role: '',
    isAdmin: false
  })
  const router = useRouter()

  useEffect(() => {
    // Chỉ chạy ở phía client
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken') || 'Không có'
      const role = localStorage.getItem('userRole') || 'Không có'
      const isAdmin = role === 'admin' || role === 'ADMIN' || role === 'Admin'

      setAuthInfo({
        token,
        role,
        isAdmin
      })
    }
  }, [])

  const handleSetAdmin = () => {
    localStorage.setItem('userRole', 'admin')
    window.location.reload()
  }

  const handleSetUser = () => {
    localStorage.setItem('userRole', 'user')
    window.location.reload()
  }

  const handleClearAuth = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userRole')
    window.location.reload()
  }

  const handleGoToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Thông Tin Xác Thực</h1>
        
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <div className="mb-3">
            <span className="font-semibold">Token:</span> 
            <span className="ml-2 font-mono bg-gray-200 p-1 rounded">{authInfo.token}</span>
          </div>
          
          <div className="mb-3">
            <span className="font-semibold">Vai trò:</span> 
            <span className="ml-2 font-mono bg-gray-200 p-1 rounded">{authInfo.role}</span>
          </div>
          
          <div className="mb-3">
            <span className="font-semibold">Là admin:</span> 
            <span className={`ml-2 font-mono p-1 rounded ${authInfo.isAdmin ? 'bg-green-200' : 'bg-red-200'}`}>
              {authInfo.isAdmin ? 'Có' : 'Không'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            type="primary" 
            className="bg-blue-500" 
            onClick={handleSetAdmin}
          >
            Đặt vai trò Admin
          </Button>
          
          <Button 
            type="default" 
            onClick={handleSetUser}
          >
            Đặt vai trò User
          </Button>
          
          <Button 
            danger 
            onClick={handleClearAuth}
          >
            Xóa thông tin xác thực
          </Button>
          
          <Button 
            type="primary" 
            className="bg-[#DAA520]" 
            onClick={handleGoToDashboard}
          >
            Thử truy cập Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
} 