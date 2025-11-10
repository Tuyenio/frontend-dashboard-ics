'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server } from 'lucide-react';
import { useEffect, useState } from 'react';

const ParticlesBackground = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

const FloatingIcon = ({ icon: Icon, delay, className }: { icon: any; delay: number; className?: string }) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.2, 1],
        rotate: [0, 360],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
        <Icon className="w-12 h-12 text-blue-400 relative z-10" strokeWidth={1.5} />
      </div>
    </motion.div>
  );
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated Background */}
      <ParticlesBackground />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Floating Security Icons */}
      <FloatingIcon icon={Shield} delay={0} className="top-20 left-10 hidden lg:block" />
      <FloatingIcon icon={Lock} delay={2} className="top-40 right-20 hidden lg:block" />
      <FloatingIcon icon={Eye} delay={4} className="bottom-40 left-20 hidden lg:block" />
      <FloatingIcon icon={Server} delay={6} className="bottom-20 right-10 hidden lg:block" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo/Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
          >
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300 tracking-wide">
              CHUYÊN GIA AN NINH MẠNG HÀNG ĐẦU VIỆT NAM
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text animate-gradient">
              CÔNG TY CỔ PHẦN
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">
              AN NINH MẠNG
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-transparent bg-clip-text animate-gradient">
              QUỐC TẾ - ICS
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Bảo vệ doanh nghiệp của bạn với{' '}
            <span className="text-blue-400 font-semibold">giải pháp an ninh mạng</span>{' '}
            tiên tiến, đáng tin cậy và toàn diện nhất
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-bold text-lg overflow-hidden shadow-2xl shadow-blue-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Tư vấn miễn phí
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full text-white font-bold text-lg hover:bg-white/20 transition-all duration-300"
            >
              Tìm hiểu thêm
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { number: '500+', label: 'Doanh nghiệp tin tưởng' },
              { number: '99.9%', label: 'Uptime đảm bảo' },
              { number: '24/7', label: 'Hỗ trợ kỹ thuật' },
              { number: '10+', label: 'Năm kinh nghiệm' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-blue-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
