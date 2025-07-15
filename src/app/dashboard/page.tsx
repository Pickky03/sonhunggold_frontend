'use client'
import EditGoldPrice from './components/EditGoldPrice'
import AdminProtected from './components/AdminProtected'

export default function Dashboard() {
    return (
        <AdminProtected>
            <div className="min-h-screen bg-gradient-to-b from-[#a52a2a] to-[#8b0000]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Vàng Bạc Sơn Hùng</h1>
                        <p className="text-white mt-1">Quản lý và cập nhật giá vàng</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="border-b border-blue-50 bg-gradient-to-b  from-[#a52a2a] to-[#8b0000]  px-4 py-4 sm:px-6">
                            <h2 className="text-xl flex justify-center  font-medium text-[#ffca45]"> Bảng Cập Nhật Giá Vàng</h2>
                            
                        </div>
                        <EditGoldPrice />
                    </div>
                </div>
            </div>
        </AdminProtected>
    )
}