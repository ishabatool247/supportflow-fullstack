"use client";
import { useState } from "react";
import Link from "next/link";
import { Headphones, Mail, LockKeyhole, UserRound, ArrowRight, Sparkles } from "lucide-react";
import { api, setTokens } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const isSignup = mode === "signup";
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      if (isSignup) {
        const parts = name.trim().split(/\s+/);
        await api("/auth/register/", { method: "POST", body: JSON.stringify({
          username: email, email, password, first_name: parts[0] || "", last_name: parts.slice(1).join(" ")
        })});
      }
      const tokens = await api<{access:string;refresh:string}>("/auth/login/", {
        method: "POST", body: JSON.stringify({ username: email, password })
      });
      setTokens(tokens.access, tokens.refresh);
      router.push("/");
    } catch (err) { setError(err instanceof Error ? err.message : "Something went wrong."); }
    finally { setBusy(false); }
  }
  return <main className="auth-shell">
    <section className="auth-visual">
      <div className="auth-brand"><span className="brand-mark"><Headphones size={21}/></span><span>support<span className="brand-accent">flow</span></span></div>
      <div className="visual-copy"><div className="eyebrow"><Sparkles size={14}/> CUSTOMER EXPERIENCE, REIMAGINED</div><h1>Support that feels<br/><span>effortless.</span></h1><p>Give every customer a faster, more thoughtful answer — powered by AI and built for your team.</p>
        <div className="visual-stats"><div><strong>87.4%</strong><span>AI resolution rate</span></div><div><strong>1.8s</strong><span>Average response</span></div></div>
      </div>
      <div className="visual-footer"><span className="online-dot"/> All systems operational <span>© 2026 SupportFlow</span></div>
    </section>
    <section className="auth-panel"><div className="auth-mobile-brand"><span className="brand-mark"><Headphones size={20}/></span> support<span className="brand-accent">flow</span></div>
      <div className="auth-card"><div className="auth-kicker">{isSignup ? "GET STARTED" : "YOUR WORKSPACE"}</div><h2>{isSignup ? "Create your account" : "Welcome back"}</h2><p className="muted">{isSignup ? "Set up your workspace in just a moment." : "Sign in to continue to your SupportFlow workspace."}</p>
      <form onSubmit={submit} className="auth-form">
        {isSignup && <label>Full name<div className="field"><UserRound size={17}/><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required autoComplete="name"/></div></label>}
        <label>Email address<div className="field"><Mail size={17}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" required autoComplete="email"/></div></label>
        <label>Password<div className="field"><LockKeyhole size={17}/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={isSignup ? "At least 8 characters" : "Enter your password"} required minLength={8} autoComplete={isSignup ? "new-password" : "current-password"}/></div></label>
        {error && <div className="error-box">{error}</div>}
        <button className="primary-btn" disabled={busy}>{busy ? "Please wait..." : isSignup ? "Create account" : "Sign in"} <ArrowRight size={17}/></button>
      </form>
      <div className="auth-switch">{isSignup ? "Already have an account?" : "New to SupportFlow?"} <Link href={isSignup ? "/login" : "/signup"}>{isSignup ? "Sign in" : "Create an account"}</Link></div>
      <div className="secure-note"><LockKeyhole size={13}/> Your workspace is protected with secure token-based authentication.</div>
      </div><div className="auth-bottom">Made for teams that care about every conversation.</div>
    </section>
  </main>;
}
