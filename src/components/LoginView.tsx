import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Mail, Lock, Eye, EyeOff, ShieldAlert } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export default function LoginView({ onLoginSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      // Hardcoded validation according to user guidelines
      if (email === 'iambenhursbinu@gmail.com' && password === 'iambinu007') {
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Access Denied.');
      }
      setIsLoading(false);
    }, 850);
  };

  const handleFillDemo = () => {
    setEmail('iambenhursbinu@gmail.com');
    setPassword('iambinu007');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-obsidian relative overflow-hidden px-4 font-sans">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full ambient-glow-1 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full ambient-glow-2 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md glass-panel p-8 rounded-2xl glow-sapphire"
      >
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="p-3 bg-neon-cyan/10 border border-neon-cyan/20 rounded-xl mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-pulse">
            <Cpu className="w-8 h-8 text-neon-cyan" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display tracking-tight text-center">
            CNC Operations Hub
          </h1>
          <p className="text-gray-400 text-xs mt-1 font-mono uppercase tracking-widest">
            Enterprise Command Center
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-xs font-mono mb-2 uppercase tracking-wider">
              Operator Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                placeholder="operator@cnc-ops.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/50 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50 font-mono transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-gray-300 text-xs font-mono uppercase tracking-wider">
                Access Code / Password
              </label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950/50 border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50 font-mono transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg flex items-center gap-2.5"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="text-xs text-rose-200 font-mono font-medium">{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-gradient-to-r from-neon-cyan to-neon-sapphire hover:from-neon-cyan/90 hover:to-neon-sapphire/90 text-white rounded-lg font-mono font-semibold text-sm shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all duration-300 uppercase tracking-wider flex items-center justify-center cursor-pointer"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Establish Connection'
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-white/5 pt-4 text-center">
          <p className="text-xs text-gray-500 font-mono mb-2">Demo Operator Mode Available</p>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-xs text-neon-cyan hover:text-neon-cyan/80 font-mono underline decoration-dotted underline-offset-4"
          >
            Fill Credentials
          </button>
        </div>
      </motion.div>
    </div>
  );
}
