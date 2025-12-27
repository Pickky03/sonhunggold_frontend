'use client';

import { Button, Form, Input, Checkbox } from 'antd';
import type { FormProps } from 'antd';
import { login } from '@/services/LoginService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export default function LoginForm() {
  const router = useRouter();
  const [form] = Form.useForm();

  /* ===============================
     LOAD TÀI KHOẢN ĐÃ GHI NHỚ
  =============================== */
  useEffect(() => {
    const saved = localStorage.getItem('remember_account');
    if (saved) {
      const data = JSON.parse(saved);
      form.setFieldsValue({
        email: data.email,
        password: data.password,
        remember: true,
      });
    }
  }, [form]);

  /* ===============================
     SUBMIT LOGIN
  =============================== */
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = await login(values.email!, values.password!);
      const token = res.accessToken || res.token || res.access_token;

      if (!token) {
        toast.error('Đăng nhập thất bại: Không tìm thấy token!');
        return;
      }

      // Lưu token
      localStorage.setItem('accessToken', token);

      // Ghi nhớ đăng nhập
      if (values.remember) {
        localStorage.setItem(
          'remember_account',
          JSON.stringify({
            email: values.email,
            password: values.password, // ⚠ demo / nội bộ
          })
        );
      } else {
        localStorage.removeItem('remember_account');
      }

      // Giải mã role
      const decoded = jwtDecode<{ role?: string }>(token);
      const userRole = decoded?.role?.toLowerCase();

      if (userRole) {
        localStorage.setItem('userRole', userRole);
      }

      toast.success('Đăng nhập thành công!');

      // Điều hướng
      if (userRole === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/goldPrice');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error?.response?.data?.message || 'Lỗi đăng nhập!');
    }
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
      form={form}
      name="login"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      size="large"
      className="w-full"
    >
      {/* EMAIL */}
      <motion.div custom={0} initial="hidden" animate="visible" variants={formItemVariants}>
        <div className="text-[#DAA520] mb-2">Email</div>
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

      {/* PASSWORD */}
      <motion.div custom={1} initial="hidden" animate="visible" variants={formItemVariants}>
        <div className="text-[#DAA520] mb-2">Mật khẩu</div>
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

      {/* REMEMBER ME */}
      <motion.div custom={2} initial="hidden" animate="visible" variants={formItemVariants}>
        <Form.Item name="remember" valuePropName="checked" className="text-[#DAA520]">
          <Checkbox>Nhớ đăng nhập</Checkbox>
        </Form.Item>
      </motion.div>

      {/* SUBMIT */}
      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={formItemVariants}
        className="mt-8"
      >
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
