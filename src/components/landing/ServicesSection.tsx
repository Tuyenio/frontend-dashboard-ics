'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Cloud, Zap, AlertTriangle, Users } from 'lucide-react';

const services = [
  {
    icon: Shield,
    title: 'Tư vấn An ninh mạng',
    description: 'Đánh giá, tư vấn và thiết kế hệ thống an ninh mạng toàn diện cho doanh nghiệp',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Eye,
    title: 'Giám sát 24/7',
    description: 'Hệ thống giám sát an ninh mạng liên tục, phát hiện và cảnh báo nguy cơ kịp thời',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
  },
  {
    icon: Lock,
    title: 'Mã hóa dữ liệu',
    description: 'Giải pháp mã hóa dữ liệu bảo mật cao, đảm bảo thông tin tuyệt đối an toàn',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Database,
    title: 'Bảo vệ dữ liệu',
    description: 'Sao lưu, phục hồi và bảo vệ dữ liệu quan trọng khỏi mọi rủi ro',
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-500/10',
  },
  {
    icon: AlertTriangle,
    title: 'Phản ứng sự cố',
    description: 'Đội ngũ chuyên gia sẵn sàng xử lý các sự cố an ninh mạng 24/7',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Cloud,
    title: 'Bảo mật Cloud',
    description: 'Giải pháp bảo mật toàn diện cho hạ tầng cloud và ứng dụng đám mây',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Zap,
    title: 'Penetration Testing',
    description: 'Kiểm tra thâm nhập chuyên nghiệp, phát hiện lỗ hổng bảo mật tiềm ẩn',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Users,
    title: 'Đào tạo nhân sự',
    description: 'Chương trình đào tạo nâng cao nhận thức an ninh mạng cho nhân viên',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
  },
];

export default function ServicesSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(100, 116, 139) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
              DỊCH VỤ CỦA CHÚNG TÔI
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Giải pháp{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              An ninh mạng
            </span>
            <br />
            Toàn diện
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Chúng tôi cung cấp đầy đủ các dịch vụ bảo mật từ tư vấn, triển khai đến vận hành và hỗ trợ
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className={`relative h-full p-6 rounded-2xl ${service.bgColor} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden`}>
                {/* Hover Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} p-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <service.icon className="w-full h-full text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow Icon */}
                <div className="mt-4 flex items-center gap-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-sm font-semibold">Tìm hiểu thêm</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${service.color} opacity-20 blur-2xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
