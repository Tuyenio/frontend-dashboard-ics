'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Globe, Award, Target, Users, TrendingUp } from 'lucide-react';

export default function AboutContactSection() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Văn phòng',
      content: 'TT3-5 Khu đô thị Đại Kim mới, Định Công, Hà Nội',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      title: 'Điện thoại',
      content: '0931.487.231',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Phone,
      title: 'Hotline',
      content: '0707.806.860',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@icss.com.vn',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Globe,
      title: 'Website',
      content: 'www.icss.com.vn',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const features = [
    {
      icon: Award,
      title: 'Chuyên nghiệp',
      description: 'Đội ngũ chuyên gia hàng đầu với chứng chỉ quốc tế',
    },
    {
      icon: Target,
      title: 'Hiệu quả',
      description: 'Giải pháp tối ưu, triển khai nhanh chóng',
    },
    {
      icon: Users,
      title: 'Tận tâm',
      description: 'Hỗ trợ khách hàng 24/7, luôn sẵn sàng',
    },
    {
      icon: TrendingUp,
      title: 'Đổi mới',
      description: 'Công nghệ tiên tiến, cập nhật liên tục',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
              VỀ CHÚNG TÔI
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Đối tác tin cậy của{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              500+ Doanh nghiệp
            </span>
          </h2>

          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            <strong className="text-white">CÔNG TY CỔ PHẦN AN NINH MẠNG QUỐC TẾ - ICS</strong> là đơn vị hàng đầu 
            trong lĩnh vực cung cấp giải pháp an ninh mạng tại Việt Nam. Với hơn 10 năm kinh nghiệm, 
            chúng tôi cam kết bảo vệ dữ liệu và hệ thống của doanh nghiệp với công nghệ tiên tiến nhất.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-2.5 inline-flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <feature.icon className="w-full h-full text-white" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-semibold">
                LIÊN HỆ
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Sẵn sàng{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                Tư vấn
              </span>
              ?
            </h2>

            <p className="text-lg text-slate-300">
              Liên hệ ngay với chúng tôi để được tư vấn miễn phí về giải pháp an ninh mạng
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon */}
                  <div className="relative mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-2.5 inline-flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <item.icon className="w-full h-full text-white" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">{item.title}</h3>
                  <p className="text-white font-medium text-lg">{item.content}</p>

                  {/* Corner Decoration */}
                  <div className="absolute -top-10 -right-10 w-20 h-20">
                    <div className={`w-full h-full rounded-full bg-gradient-to-br ${item.color} opacity-20 blur-2xl`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(34, 211, 238, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-white font-bold text-lg overflow-hidden shadow-2xl shadow-cyan-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-3">
                <Mail className="w-5 h-5" />
                Gửi yêu cầu tư vấn
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
