import React from 'react';
import { Lock } from 'lucide-react';

function Footer() {
  return (
    <footer className="relative z-30 border-t border-white/5 bg-[#030712]/80 backdrop-blur-xl py-12 md:py-16 px-6 md:px-10 lg:px-20 mt-auto w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-16">
        
        {/* Logo & Tagline */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-glow">
              <Lock className="h-4.5 w-4.5" strokeWidth={2.2} />
            </div>
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white font-display">
              Meet<span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Sphere</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-sans">
            MeetSphere is the ultimate all-in-one platform built for modern, fast-moving teams to plan, collaborate, track, and deliver outstanding results.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4 pt-2">
            <a href="#twitter" className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/30 transition-all duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#github" className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/30 transition-all duration-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="#discord" className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/30 transition-all duration-300">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03a.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
              </svg>
            </a>
            <a href="#linkedin" className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-violet-500/30 transition-all duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
        
        {/* Column 2: Product */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-slate-200 font-display">Product</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li><a href="#features" className="hover:text-white transition duration-200">Features</a></li>
            <li><a href="#integrations" className="hover:text-white transition duration-200">Integrations</a></li>
            <li><a href="#pricing" className="hover:text-white transition duration-200">Pricing</a></li>
            <li><a href="#changelog" className="hover:text-white transition duration-200">Changelog</a></li>
            <li><a href="#roadmap" className="hover:text-white transition duration-200">Roadmap</a></li>
          </ul>
        </div>
        
        {/* Column 3: Resources */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-slate-200 font-display">Resources</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li><a href="#docs" className="hover:text-white transition duration-200">Documentation</a></li>
            <li><a href="#community" className="hover:text-white transition duration-200">Community</a></li>
            <li><a href="#guides" className="hover:text-white transition duration-200">Guides</a></li>
            <li><a href="#status" className="hover:text-white transition duration-200">System Status</a></li>
            <li><a href="#support" className="hover:text-white transition duration-200">Support</a></li>
          </ul>
        </div>
        
        {/* Column 4: Company */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-slate-200 font-display">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li><a href="#about" className="hover:text-white transition duration-200">About Us</a></li>
            <li><a href="#careers" className="hover:text-white transition duration-200">Careers</a></li>
            <li><a href="#blog" className="hover:text-white transition duration-200">Blog</a></li>
            <li><a href="#security" className="hover:text-white transition duration-200">Security</a></li>
            <li><a href="#contact" className="hover:text-white transition duration-200">Contact</a></li>
          </ul>
        </div>
        
      </div>
      
      {/* Divider & Copyright */}
      <div className="max-w-7xl mx-auto mt-12 md:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 MeetSphere Inc. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#privacy" className="hover:text-white transition duration-200">Privacy Policy</a>
          <a href="#terms" className="hover:text-white transition duration-200">Terms of Service</a>
          <a href="#cookies" className="hover:text-white transition duration-200">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
