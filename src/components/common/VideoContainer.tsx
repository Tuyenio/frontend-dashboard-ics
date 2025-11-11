'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

interface VideoContainerProps {
  videoUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Video Container Component
 * Premium video player with custom controls
 */
export default function VideoContainer({
  videoUrl = 'https://www.youtube.com/embed/-Ju97IVFVFo?si=BBQ_8ol9kN1kcfXo',
  thumbnailUrl,
  title,
  subtitle,
}: VideoContainerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative w-full max-w-6xl mx-auto"
    >
      {/* Container with premium styling */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

        {/* Main Video Container */}
        <div className="relative bg-slate-900 dark:bg-slate-950 blue:bg-slate-900 light:bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-800 dark:border-slate-700 blue:border-slate-700 light:border-slate-200">
          {/* Video Wrapper with 16:9 aspect ratio */}
          <div className="relative aspect-video bg-slate-950 dark:bg-black blue:bg-slate-950 light:bg-slate-100">
            {/* Placeholder/Thumbnail */}
            {thumbnailUrl && !isPlaying && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isPlaying ? 0 : 1 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              </motion.div>
            )}

            {/* Video iframe or placeholder */}
            <iframe
              src={videoUrl}
              title="Dashboard Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />

            {/* Play Button Overlay */}
            {!isPlaying && (
              <motion.button
                onClick={() => setIsPlaying(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute inset-0 m-auto w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full shadow-2xl shadow-blue-500/50 group-hover:shadow-blue-500/70 transition-all duration-300"
              >
                <Play className="w-10 h-10 text-white ml-1" fill="white" />
                
                {/* Pulse Animation */}
                <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
              </motion.button>
            )}

            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-500/30 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-500/30 rounded-br-2xl" />
          </div>

          {/* Video Info Bar */}
          {(title || subtitle) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-gradient-to-r from-slate-900/95 to-slate-800/95 dark:from-slate-900/95 dark:to-slate-800/95 blue:from-slate-900/95 blue:to-slate-800/95 light:from-slate-50 light:to-white backdrop-blur-sm"
            >
              {title && (
                <h3 className="text-xl font-bold text-white dark:text-white blue:text-white light:text-slate-900 mb-2">{title}</h3>
              )}
              {subtitle && (
                <p className="text-slate-400 dark:text-slate-400 blue:text-slate-400 light:text-slate-600 text-sm">{subtitle}</p>
              )}
            </motion.div>
          )}
        </div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute -top-6 -right-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-4 shadow-2xl shadow-blue-500/50"
        >
          <div className="text-white text-center">
            <div className="text-2xl font-black">99.9%</div>
            <div className="text-xs opacity-90">Uptime</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="absolute -bottom-6 -left-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-4 shadow-2xl shadow-purple-500/50"
        >
          <div className="text-white text-center">
            <div className="text-2xl font-black">24/7</div>
            <div className="text-xs opacity-90">Support</div>
          </div>
        </motion.div>
      </div>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
    </motion.div>
  );
}
