'use client';

import { motion } from 'framer-motion';
import { Shield, Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Dịch vụ',
      links: ['Tư vấn An ninh', 'Giám sát 24/7', 'Mã hóa dữ liệu', 'Bảo vệ dữ liệu'],
    },
    {
      title: 'Công ty',
      links: ['Về chúng tôi', 'Đội ngũ', 'Tin tức', 'Tuyển dụng'],
    },
    {
      title: 'Hỗ trợ',
      links: ['Tài liệu', 'FAQs', 'Liên hệ', 'Trung tâm hỗ trợ'],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/10">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-2">
                  <Shield className="w-full h-full text-white" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">ICS</div>
                  <div className="text-xs text-slate-400">An ninh mạng</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Công ty Cổ phần An ninh mạng Quốc tế - Đối tác tin cậy bảo vệ 
                doanh nghiệp của bạn trong thế giới số.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 flex items-center justify-center transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-slate-400 hover:text-blue-400 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-blue-400 text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} ICS - An ninh mạng Quốc tế. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
