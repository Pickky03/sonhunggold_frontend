'use client'
import { Button, Form, Input } from 'antd';
import type { FormProps } from 'antd';
import { login } from '@/services/LoginService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export default function LoginForm() {
  const router = useRouter();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const res = await login(values.email!, values.password!);

      // Kiểm tra dữ liệu trả về từ API
      if (res && typeof res === 'object') {
        // Lưu token vào localStorage (kiểm tra cấu trúc dữ liệu trả về)
        const token = res.accessToken || res.token || res.access_token;
        
        if (token) {
          localStorage.setItem('accessToken', token);
          toast.success('Đăng nhập thành công!');
          router.push('/goldPrice');
        } else {
          console.error('Token không tìm thấy trong response:', res);
          toast.error('Đăng nhập thất bại: Token không tìm thấy!');
        }
      } else {
        console.error('Response không hợp lệ:', res);
        toast.error('Đăng nhập thất bại: Dữ liệu không hợp lệ!');
      }
    } catch (error) {
      console.error('Login error:', error);
      // @ts-expect-error - Bỏ qua lỗi TypeScript tạm thời
      const errorMessage = error?.response?.data?.message || 'Lỗi đăng nhập!';
      toast.error(errorMessage);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3 + i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <Form
      name="login"
      className="w-full"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="large"
    >
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={formItemVariants}
      >
        <div className="text-[#DAA520] text-xl mb-2">Email</div>
        <Form.Item<FieldType>
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' }
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

      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={formItemVariants}
      >
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
