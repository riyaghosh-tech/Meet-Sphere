import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Zap } from "lucide-react";

function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function GitHubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.002 12.002 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function TwitterIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconInput({ id, label, type = "text", value, onChange, icon: Icon, required, rightSlot, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-200 tracking-wide">
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 transition-colors" strokeWidth={1.75} />
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-slate-800 bg-slate-950/40 py-3.5 pl-12 text-base text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 ${rightSlot ? "pr-11" : "pr-4"}`}
        />
        {rightSlot && <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
    </div>
  );
}

function HeroCard() {
  return (
    <div className="relative flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 p-4">
      {/* Decorative backdrop glow */}
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
      
      <div className="relative space-y-4 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold uppercase tracking-wider">
          <Zap className="h-3.5 w-3.5" fill="currentColor" />
          MeetSphere Hub
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl leading-tight text-white font-display">
          Where Collaboration <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Meets Innovation
          </span>
        </h1>
        
        <p className="text-base text-slate-400 leading-relaxed">
          Unlock a digital sphere designed for high-performance teams. Coordinate interactive meetings, plan projects with AI assistance, and foster rich community connections all in one unified workspace.
        </p>
      </div>

      {/* Main image card container */}
      <div className="relative w-full max-w-[460px] group transition-all duration-500 hover:scale-[1.02] lg:-ml-2">
        {/* Soft shadow glow behind */}
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
        
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-3 shadow-glass backdrop-blur-sm">
          <img 
            src="/meetsphere_login_hero.png" 
            alt="MeetSphere digital collaboration space" 
            className="w-full h-auto rounded-xl object-cover shadow-2xl animate-float"
          />
        </div>
      </div>
    </div>
  );
}

export default function Login({
  authMode = "login",
  loginForm,
  onLoginFormChange,
  onLoginSubmit,
  loadingLogin,
  loginMessage,
  registerForm,
  onRegisterFormChange,
  onRegisterSubmit,
  loadingRegister,
  registerMessage,
  onSwitchToRegister,
  onSwitchToLogin,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const isControlled = Boolean(onLoginSubmit);

  const email = isControlled ? loginForm?.email ?? "" : "";
  const password = isControlled ? loginForm?.password ?? "" : "";

  const renderLoginForm = () => (
    <form onSubmit={isControlled ? onLoginSubmit : (e) => e.preventDefault()}>
      <div className="space-y-4">
        <IconInput
          id="email"
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => isControlled && onLoginFormChange({ ...loginForm, email: e.target.value })}
          required={isControlled}
        />
        <IconInput
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          icon={Lock}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => isControlled && onLoginFormChange({ ...loginForm, password: e.target.value })}
          required={isControlled}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-slate-500 hover:text-slate-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
        />
      </div>

      <div className="mb-6 mt-4 flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-slate-800 bg-slate-950 text-violet-600 focus:ring-violet-500/20 focus:ring-offset-slate-900"
          />
          Remember me
        </label>
        <a href="#forgot" className="font-medium text-violet-400 hover:text-violet-300 transition-colors">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isControlled && loadingLogin}
        className="w-full rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 py-3 font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-glow hover:opacity-95 disabled:opacity-60 disabled:scale-100"
      >
        {isControlled && loadingLogin ? "Logging in..." : "Login to your space"}
      </button>

      {loginMessage && (
        <div className={`mt-4 p-4 rounded-xl text-sm border ${
          loginMessage.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-rose-500/10 border-rose-500/20 text-rose-400"
        }`}>
          {loginMessage.text}
        </div>
      )}

      <p className="my-5 text-center text-sm text-slate-500">or continue with</p>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          aria-label="Continue with Google"
          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/40 text-slate-300 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:text-white"
        >
          <GoogleIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Continue with GitHub"
          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/40 text-slate-300 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:text-white"
        >
          <GitHubIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Continue with Twitter"
          className="flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/40 text-slate-300 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 hover:text-white"
        >
          <TwitterIcon className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Don&apos;t have an account?{" "}
        {isControlled && onSwitchToRegister ? (
          <button type="button" onClick={onSwitchToRegister} className="font-medium text-violet-400 hover:text-violet-300 hover:underline">
            Register here
          </button>
        ) : (
          <Link to="/login?mode=register" className="font-medium text-violet-400 hover:text-violet-300 hover:underline">
            Register here
          </Link>
        )}
      </p>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={onRegisterSubmit}>
      <div className="space-y-4">
        <IconInput
          id="name"
          label="Full Name"
          type="text"
          icon={User}
          placeholder="Enter your name"
          value={registerForm.name}
          onChange={(e) => onRegisterFormChange({ ...registerForm, name: e.target.value })}
        />
        <IconInput
          id="register-email"
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="Enter your email"
          value={registerForm.email}
          onChange={(e) => onRegisterFormChange({ ...registerForm, email: e.target.value })}
        />
        <IconInput
          id="register-password"
          label="Password"
          type={showPassword ? "text" : "password"}
          icon={Lock}
          placeholder="Enter your password"
          value={registerForm.password}
          onChange={(e) => onRegisterFormChange({ ...registerForm, password: e.target.value })}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-slate-400 hover:text-slate-300 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          }
        />
      </div>

      <p className="mt-3 text-xs text-slate-500 leading-relaxed">
        Password must be at least 8 characters with uppercase, lowercase, number, and special character.
      </p>

      <div className="mt-4">
        <label htmlFor="register-role" className="mb-2 block text-sm font-semibold text-slate-200 tracking-wide">
          Role
        </label>
        <select
          id="register-role"
          value={registerForm.role}
          onChange={(e) => onRegisterFormChange({ ...registerForm, role: e.target.value })}
          className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3.5 text-base text-slate-200 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
        >
          <option value="volunteer">General Volunteer</option>
          <option value="core">Core Team</option>
          <option value="participant">Participant</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loadingRegister}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 py-3 font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-300 hover:scale-[1.01] hover:shadow-glow hover:opacity-95 disabled:opacity-60"
      >
        {loadingRegister ? "Registering..." : "Create your account"}
      </button>

      {registerMessage && (
        <div className={`mt-4 p-4 rounded-xl text-sm border ${
          registerMessage.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-rose-500/10 border-rose-500/20 text-rose-400"
        }`}>
          {registerMessage.text}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <button type="button" onClick={onSwitchToLogin} className="font-medium text-violet-400 hover:text-violet-300 hover:underline">
          Login here
        </button>
      </p>
    </form>
  );

  return (
    <div className="login-page-root flex min-h-screen w-full flex-col bg-slate-950 font-sans text-slate-100 relative overflow-hidden">
      
      {/* Premium background grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      
      {/* Glowing backdrop aurora spheres */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-rose-600/5 blur-[120px] pointer-events-none" />
      
      {/* Top glassmorphic header */}
      <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-slate-950/60 px-6 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-glow">
            <Lock className="h-4.5 w-4.5" strokeWidth={2.2} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white font-display">
            Meet<span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">Sphere</span>
          </span>
        </div>
        
        <Link 
          to="/" 
          className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
        >
          Back to site
        </Link>
      </header>

      {/* Main split content */}
      <div className="flex flex-1 items-center justify-center overflow-y-auto px-6 py-12 md:px-10 z-10">
        <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left — Branding and Mockup Image */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <HeroCard />
          </div>

          {/* Right — Glassmorphic login form card */}
          <div className="order-1 mx-auto w-full max-w-md lg:order-2">
            <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-glass backdrop-blur-xl md:p-10">
              {authMode === "login" ? (
                <>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white font-display bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Welcome Back</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Log in to access your digital workspace, plan events, and collaborate with your team.
                  </p>
                  <div className="mt-8">{renderLoginForm()}</div>
                  <p className="mt-6 text-center text-xs text-slate-500 leading-relaxed">
                    By logging in, you agree to our{" "}
                    <a href="#terms" className="text-violet-400 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#privacy" className="text-violet-400 hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white font-display bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Create Account</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Join MeetSphere to access event prep, coordinate teams, and scale your operations.
                  </p>
                  <div className="mt-8">{renderRegisterForm()}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
