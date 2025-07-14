import '@/styles/globals.css'
import { Toaster } from 'sonner'


export const metadata = {
  title: 'Vàng Bạc Sơn Hùng',
  description: 'Vàng Bạc Sơn Hùng',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
