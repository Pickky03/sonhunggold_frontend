import axiosInstance from "@/config/axios";

export const login = async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/login', { email, password });
    

    if (response.data) {
        // Trường hợp 1: Vai trò nằm trong response.data.role
        if (response.data.role) {
            localStorage.setItem('userRole', response.data.role);
            console.log('Đã lưu vai trò từ response.data.role:', response.data.role);
        }
        // Trường hợp 2: Vai trò nằm trong response.data.user.role
        else if (response.data.user && response.data.user.role) {
            localStorage.setItem('userRole', response.data.user.role);
       
        }
    }
    
    return response.data;
}

export const register = async (email: string, password: string) => {
    const response = await axiosInstance.post('/auth/register', { email, password });
    return response.data;
}

// Kiểm tra xem người dùng có đăng nhập hay không
export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('accessToken');

    return !!token;
}

// Kiểm tra vai trò người dùng
export const getUserRole = () => {
    if (typeof window === 'undefined') return null;
    const role = localStorage.getItem('userRole');

    return role;
}

// Kiểm tra xem người dùng có phải là admin hay không
export const isAdmin = () => {
    const role = getUserRole();
    
    // Kiểm tra cả trường hợp chữ hoa và chữ thường
    return role === 'admin' || role === 'ADMIN' || role === 'Admin';
}

// Đăng xuất
export const logout = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
}