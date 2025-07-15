'use client'
import LoginForm from './components/LoginForm'
import Logo from './components/Logo'

export default function LoginPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#833030] p-4">
        <div className="w-full max-w-md bg-[#f3f2f0] p-8 rounded-lg shadow-lg">
          <Logo />
          <LoginForm />
        </div>
      
      </div>
    )
}
