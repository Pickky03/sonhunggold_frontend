'use client';

import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { login } from '@/services/LoginService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';

type FieldType = {
  email?: string;
  password?: string;
};

export default function LoginForm() {
  const router = useRouter();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = await login(values.email!, values.password!);


      const token = res.accessToken || res.token || res.access_token;


      if (token) {
        localStorage.setItem('accessToken', token);

        try {
          // Sửa lỗi kiểu dữ liệu khi giải mã token
          const decoded = jwtDecode<{ role?: string }>(token);
          const userRole = decoded?.role ? decoded.role.toLowerCase() : undefined;


          if (userRole) {
            localStorage.setItem('userRole', userRole);
          }

          toast.success(' Đăng nhập thành công!');

          if (userRole === 'admin') {
            router.push('/dashboard');
          } else {
            router.push('/goldPrice');
          }
        } catch (err) {
          console.error(' Lỗi giải mã token:', err);
          toast.error('Không thể xác định vai trò người dùng!');
        }
      } else {
        toast.error('Đăng nhập thất bại: Không tìm thấy token!');
      }
    } catch (error) {
      console.error('Login error:', error);
      // @ts-expect-error error có thể không có thuộc tính response do kiểu dữ liệu không xác định từ phía server
      const errorMessage = error?.response?.data?.message || 'Lỗi đăng nhập!';
      toast.error(errorMessage);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed123:', errorInfo);
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <Form
      name="login"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
      className="w-full"
    >
      {/* Email */}
      <motion.div custom={0} initial="hidden" animate="visible" variants={formItemVariants}>
        <div className="text-[#DAA520] text-xl mb-2">Email</div>
        <Form.Item<FieldType>
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input
            placeholder="Nhập email"
            className="rounded-lg h-12 bg-transparent border-[#DAA520] text-[#DAA520] placeholder:text-[#DAA520]/60"
            bordered={false}
            style={{ borderBottom: '1px solid #DAA520' }}
          />
        </Form.Item>
      </motion.div>

      {/* Password */}
      <motion.div custom={1} initial="hidden" animate="visible" variants={formItemVariants}>
        <div className="text-[#DAA520] text-xl mb-2">Mật khẩu</div>
        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu"
            className="rounded-lg h-12 bg-transparent border-[#DAA520] text-[#DAA520] placeholder:text-[#DAA520]/60"
            bordered={false}
            style={{ borderBottom: '1px solid #DAA520' }}
          />
        </Form.Item>
      </motion.div>

      {/* Submit button */}
      <motion.div custom={3} initial="hidden" animate="visible" variants={formItemVariants} className="mt-8">
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-12 bg-[#DAA520] hover:bg-[#B8860B] rounded-lg text-xl font-bold border-none text-[#8B0000]"
          >
            ĐĂNG NHẬP
          </Button>
        </Form.Item>
      </motion.div>
    </Form>
  );
}
