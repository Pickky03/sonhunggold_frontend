'use client'
import EditGoldPrice from './components/EditGoldPrice'

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Bảng Điều Khiển</h1>
                    <p className="text-gray-600 mt-1">Quản lý và cập nhật giá vàng</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md">
                    <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
                        <h2 className="text-lg font-medium text-gray-800">Cập Nhật Giá Vàng</h2>
                        <p className="text-sm text-gray-500 mt-1">Chỉnh sửa giá mua vào và bán ra</p>
                    </div>
                    <EditGoldPrice />
                </div>
            </div>
        </div>
    )
}