import { useState } from 'react';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { authApi } from '../lib/api';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await authApi.login({ email, password });
      if (response.success) {
        toast.success('Welcome back!');
        onLogin();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="decor-circle bg-lime w-64 h-64 absolute -left-20 -top-20 opacity-50" />
      <div className="decor-ring border-dark w-48 h-48 absolute -right-10 -bottom-10 opacity-30" />
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-dark hover:text-lime transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to site</span>
      </button>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-md mx-4 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-lime rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-dark" />
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-dark mb-2">
            Admin Access
          </h1>
          <p className="text-gray-custom text-sm">
            Enter your password to manage content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nexgenstudio.com"
              required
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-dark mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-custom hover:text-dark transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-custom">
            Default: <code className="bg-gray-100 px-2 py-1 rounded">admin@nexgenstudio.com</code> / <code className="bg-gray-100 px-2 py-1 rounded">admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
