import React from 'react';
import { Lock } from 'lucide-react';

function Footer() {
  return (
    <footer className="full-width-footer relative z-30 mt-auto overflow-hidden bg-[#020617] pt-12 pb-10 border-t border-violet-900/30">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50"></div>
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        
        {/* Call to Action Section */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-10 mb-12 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-transparent"></div>
          <div className="relative z-10 mb-8 md:mb-0 max-w-lg">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to host your next big event?</h3>
            <p className="text-slate-400 text-lg">Join thousands of organizers who use MeetSphere to plan, collaborate, and succeed.</p>
          </div>
          <button className="relative z-10 bg-white text-slate-900 hover:bg-slate-200 font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Get Started Now
          </button>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8 mb-16">
          {/* Logo & Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <Lock className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Meet<span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Sphere</span>
              </span>
            </div>
            <p className="text-slate-400 text-base leading-relaxed max-w-sm">
              The ultimate all-in-one platform for modern teams. Discover opportunities, build connections, and bring ideas to life.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-4">
              {['twitter', 'github', 'discord', 'linkedin'].map((social) => (
                <a key={social} href={`#${social}`} className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-violet-600 hover:border-violet-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all duration-300">
                  <span className="sr-only">{social}</span>
                  {/* Just a placeholder dot for icon to save space, but keeping it elegant */}
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {[
            { title: 'Platform', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
            { title: 'Resources', links: ['Documentation', 'Community', 'Guides', 'Support'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] }
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="font-bold text-sm tracking-wider text-white mb-6 uppercase">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-slate-400 hover:text-violet-400 transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-violet-400 transition-colors"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 MeetSphere Inc. Crafted with passion.</p>
          <div className="flex items-center gap-8">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
