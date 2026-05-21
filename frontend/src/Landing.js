import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import {
  Play,
  Users,
  ShieldCheck,
  BarChart3,
  CheckSquare,
  Lock,
} from "lucide-react";

const FEATURES = [
  {
    icon: Users,
    title: "Team Spaces",
    description: "Real-time spaces designed for high-performance teams to collaborate without friction.",
    color: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Enterprise-grade end-to-end security keeping your workspace and data fully protected.",
    color: "emerald",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Deep, visual insights that let you track progress, bottlenecks, and speed up delivery.",
    color: "pink",
  },
  {
    icon: CheckSquare,
    title: "Tasks",
    description: "Intuitive task management with automated boards, schedules, and custom team tracking.",
    color: "violet",
  },
];

const colorMap = {
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    hoverBorder: "group-hover:border-blue-400/40",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]",
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    hoverBorder: "group-hover:border-emerald-400/40",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
  },
  pink: {
    text: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    hoverBorder: "group-hover:border-pink-400/40",
    glow: "shadow-[0_0_20px_rgba(236,72,153,0.3)]",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    hoverBorder: "group-hover:border-violet-400/40",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.3)]",
  },
};

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#030712] min-h-screen w-full overflow-hidden text-slate-100 relative font-sans flex flex-col justify-between">
      
      {/* Breathtaking background space aurora spheres */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[70vw] h-[60vh] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[25%] left-[20%] w-[35vw] h-[35vh] rounded-full bg-pink-600/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vh] rounded-full bg-violet-600/5 blur-[140px] pointer-events-none z-0" />

      {/* Glassmorphic Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-10 py-6 border-b border-white/5 bg-slate-950/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-glow">
            <Lock className="h-5 w-5" strokeWidth={2.2} />
          </div>
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display">
            Meet<span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Sphere</span>
          </span>
        </div>


        <div className="flex items-center gap-3 md:gap-5">
          <button
            type="button"
            className="text-slate-300 font-medium hover:text-white transition duration-200"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>

          <button
            type="button"
            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold transition duration-300 shadow-lg shadow-indigo-950/30 hover:scale-[1.02] active:scale-100"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-10 lg:px-20 pt-16 pb-28 max-w-7xl mx-auto text-center w-full">
        
        {/* Glowing Badge Pill */}
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 px-4.5 py-1.5 rounded-full mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)] animate-pulse-soft">
          <span className="text-indigo-400 font-semibold text-xs tracking-wider uppercase">✨ platform</span>
          <p className="text-slate-300 text-xs font-medium">
            All-in-one Collaboration Platform
          </p>
        </div>

        {/* Breathtaking Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-white font-display max-w-4xl">
          Work together.
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent">
            Achieve more.
          </span>
        </h1>

        {/* Captivating Subtitle */}
        <p className="text-slate-400 text-lg md:text-xl mt-6 leading-relaxed max-w-2xl">
          MeetSphere is the all-in-one platform that helps teams plan,
          collaborate, and deliver results faster.
        </p>

        {/* Centered CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 mt-10 w-full sm:w-auto">
          <button
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition duration-300 shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-[1.03] active:scale-100"
            onClick={() => navigate("/login")}
          >
            Get Started For Free
          </button>

          <button
            type="button"
            className="w-full sm:w-auto border border-white/10 hover:border-white/20 bg-slate-900/60 hover:bg-slate-900/80 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition duration-300 text-slate-300 hover:text-white backdrop-blur-sm"
            onClick={() => navigate("/login")}
          >
            <Play size={20} className="text-blue-400" fill="currentColor" />
            Watch Demo
          </button>
        </div>

        {/* Centered Features Cards Row */}
        <div
          id="features"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl mt-24 z-20"
        >
          {FEATURES.map(({ icon: Icon, title, description, color }) => {
            const styles = colorMap[color];
            return (
              <div 
                key={title} 
                className={`flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-slate-950/40 backdrop-blur-md group hover:border-white/10 ${styles.hoverBorder} transition-all duration-500 hover:-translate-y-1 shadow-glass hover:${styles.glow}`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-[#0b0f19] border ${styles.border} flex items-center justify-center ${styles.text} group-hover:scale-110 transition-transform duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] relative overflow-hidden`}>
                  <div className={`absolute inset-0 ${styles.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm`} />
                  <Icon size={24} className="relative z-10" /> 
                </div>
                <h3 className="font-bold text-lg text-white mt-5 tracking-wide font-display">{title}</h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">{description}</p>
              </div>
            );
          })}
        </div>

        {/* Trusted By Brand Logos Row */}
        <div className="w-full max-w-5xl mt-24 border-t border-white/5 pt-12 text-center z-20">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-500">
            Trusted by teams worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-8 opacity-45 hover:opacity-70 transition-opacity duration-300">
            
            {/* Google */}
            <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 5.92 1 12 5.92 1 12s4.92 11 11.24 11c6.59 0 10.97-4.63 10.97-11.17 0-.75-.08-1.32-.2-1.83H12.24z"/>
              </svg>
              <span className="font-semibold text-sm tracking-tight text-slate-300">Google</span>
            </div>

            {/* Microsoft */}
            <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 23 23">
                <path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z" />
              </svg>
              <span className="font-semibold text-sm tracking-tight text-slate-300">Microsoft</span>
            </div>

            {/* Slack */}
            <div className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.522 2.522H3.78a2.528 2.528 0 0 1-2.52-2.522V8.824a2.528 2.528 0 0 1 2.52-2.52h5.043zm10.135 3.701a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52 2.528 2.528 0 0 1-2.522 2.52h-2.52v-2.52zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V3.78a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043zm-3.781 10.135a2.528 2.528 0 0 1-2.52 2.52 2.528 2.528 0 0 1-2.522-2.52v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.522-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043a2.528 2.528 0 0 1-2.52 2.52h-5.043z"/>
              </svg>
              <span className="font-semibold text-sm tracking-tight text-slate-300">Slack</span>
            </div>

            {/* Airbnb */}
            <div className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 32 32">
                <path d="M16 1.76c-.952 0-1.808.5-2.28 1.304l-11.4 19.344C1.848 23.216 1.5 24.312 1.5 25.4c0 3.616 2.984 6.6 6.6 6.6 2.128 0 4.104-1.024 5.4-2.736L16 26.04l2.5 3.224c1.296 1.712 3.272 2.736 5.4 2.736 3.616 0 6.6-2.984 6.6-6.6 0-1.088-.348-2.184-.82-3.032L18.28 3.064c-.472-.804-1.328-1.304-2.28-1.304zm0 2.88c.328 0 .616.168.784.44l11.4 19.336c.168.28.256.616.256.984 0 2.016-1.704 3.72-3.72 3.72-1.128 0-2.16-.544-2.824-1.448l-4.144-5.36c-.4-.52-.992-.816-1.752-.816s-1.352.296-1.752.816l-4.144 5.36c-.664.904-1.696 1.448-2.824 1.448-2.016 0-3.72-1.704-3.72-3.72 0-.368.088-.704.256-.984L15.216 5.08c.168-.272.456-.44.784-.44zM16 12c-2.208 0-4 1.792-4 4s1.792 4 4 4 4-1.792 4-4-1.792-4-4-4zm0 2.88c.616 0 1.12.504 1.12 1.12s-.504 1.12-1.12 1.12-1.12-.504-1.12-1.12.504-1.12 1.12-1.12z" />
              </svg>
              <span className="font-semibold text-sm tracking-tight text-slate-300">Airbnb</span>
            </div>

            {/* Amazon */}
            <div className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors duration-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.2 13.9c-.8.1-1.6.2-2.3.2-1.3 0-1.8-.5-1.8-1.6 0-1.4 1.1-2.1 3-2.1.8 0 1.6.1 2.2.2v.9c-.6-.1-1.2-.2-1.8-.2-1.2 0-1.7.3-1.7 1 0 .6.3.8.9.8.6 0 1.1-.1 1.7-.2v1zm3.8 0c0-.8 0-1.8-.1-2.5h1.1l.1.8c.4-.6 1-.9 1.8-.9 1.1 0 1.6.8 1.6 2.1v2.1h-1.2v-1.9c0-.8-.3-1.1-.9-1.1-.5 0-.9.2-1.2.6v2.4h-1.3v-4.1h1.2v.5z"/>
              </svg>
              <span className="font-semibold text-sm tracking-tight text-slate-300">Amazon</span>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />

      {/* Scrollable Perspective Wireframe Grid */}
      <div className="perspective-container">
        <div className="perspective-grid" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-container {
          perspective: 450px;
          perspective-origin: 50% 25%;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 450px;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }
        .perspective-grid {
          width: 200%;
          height: 250%;
          margin-left: -50%;
          background-image: 
            linear-gradient(to right, rgba(99, 102, 241, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.12) 1px, transparent 1px);
          background-size: 50px 50px;
          transform: rotateX(65deg);
          transform-origin: 50% 0%;
          animation: gridScroll 16s linear infinite;
          mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 75%);
          -webkit-mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0) 75%);
        }
        @keyframes gridScroll {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 50px;
          }
        }
      `}} />

    </div>
  );
}

export default Landing;
