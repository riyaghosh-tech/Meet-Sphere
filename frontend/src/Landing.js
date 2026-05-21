import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Users,
  ShieldCheck,
  BarChart3,
  CheckSquare,
} from "lucide-react";

const FEATURES = [
  {
    icon: Users,
    title: "Team Spaces",
    description: "Collaborate in real time",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Enterprise-grade protection",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track progress at a glance",
  },
  {
    icon: CheckSquare,
    title: "Tasks",
    description: "Stay on top of every deliverable",
  },
];

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen w-full overflow-hidden">
      <nav className="flex items-center justify-between px-6 md:px-10 py-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-orange-500" aria-hidden />
          <h1 className="text-2xl md:text-3xl font-bold text-black">MeetSphere</h1>
        </div>

        <div className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          <a href="#product" className="hover:text-orange-500 transition">
            Product
          </a>
          <a href="#features" className="hover:text-orange-500 transition">
            Features
          </a>
          <a href="#solutions" className="hover:text-orange-500 transition">
            Solutions
          </a>
          <a href="#pricing" className="hover:text-orange-500 transition">
            Pricing
          </a>
          <a href="#resources" className="hover:text-orange-500 transition">
            Resources
          </a>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <button
            type="button"
            className="text-black font-medium hover:text-orange-500 transition"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>

          <button
            type="button"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold transition"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
        </div>
      </nav>

      <section className="grid lg:grid-cols-2 items-center px-6 md:px-10 lg:px-20 py-10 gap-10 lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-5 py-2 rounded-full mb-8">
            <span className="text-orange-500 font-semibold">✨ New</span>
            <p className="text-gray-600 text-sm md:text-base">
              AI-powered teamwork is here
            </p>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-black">
            Work together.
            <br />
            <span className="text-orange-500">Achieve more.</span>
          </h2>

          <p className="text-gray-600 text-lg md:text-xl mt-8 leading-relaxed max-w-xl">
            MeetSphere is the all-in-one platform that helps teams plan,
            collaborate, and deliver results faster.
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-5 mt-10">
            <button
              type="button"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-2xl font-semibold text-base md:text-lg transition shadow-lg"
              onClick={() => navigate("/login")}
            >
              Get Started For Free
            </button>

            <button
              type="button"
              className="border border-orange-300 hover:bg-orange-50 px-6 md:px-8 py-3.5 md:py-4 rounded-2xl font-semibold text-base md:text-lg flex items-center gap-3 transition text-black"
              onClick={() => navigate("/login")}
            >
              <Play size={20} className="text-orange-500" />
              Watch Demo
            </button>
          </div>

          <div
            id="features"
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Icon size={22} className="text-orange-500" />
                </div>
                <p className="font-semibold text-black">{title}</p>
                <p className="text-gray-500 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -inset-4 bg-orange-100/60 rounded-[2rem] blur-2xl" aria-hidden />
          <div className="relative w-full max-w-lg bg-white border border-orange-100 rounded-3xl shadow-2xl shadow-orange-500/10 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-orange-50 bg-orange-50/50">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-black">Team Dashboard</h3>
                <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                  Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {["12", "48", "96%"].map((value, i) => (
                  <div
                    key={value}
                    className="rounded-2xl bg-orange-50 border border-orange-100 p-4 text-center"
                  >
                    <p className="text-2xl font-bold text-orange-500">{value}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {["Events", "Members", "On track"][i]}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { label: "Global Tech Hackathon", progress: 85 },
                  { label: "Design Workshop", progress: 62 },
                  { label: "Creative Meetup", progress: 40 },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-gray-100 p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-800">{item.label}</span>
                      <span className="text-orange-500 font-semibold">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
