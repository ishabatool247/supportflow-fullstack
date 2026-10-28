"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Headphones, LayoutDashboard, Bot, MessagesSquare, ChartNoAxesCombined, BookOpenText, Settings, Search, Bell, ChevronDown, Plus, LogOut, Menu, X } from "lucide-react";
import { api, clearTokens } from "@/lib/api";

const nav = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/chatbots", label: "AI chatbots", icon: Bot },
  { href: "/conversations", label: "Conversations", icon: MessagesSquare },
  { href: "/analytics", label: "Analytics", icon: ChartNoAxesCombined },
  { href: "/knowledge-base", label: "Knowledge base", icon: BookOpenText },
  { href: "/settings", label: "Settings", icon: Settings },
];
export default function AppShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  const pathname = usePathname(); const router = useRouter();
  const [user, setUser] = useState<any>(null); const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("supportflow_access")) { router.replace("/login"); return; }
    api("/auth/me/").then(setUser).catch(() => { clearTokens(); router.replace("/login"); });
  }, [router]);
  function logout() { clearTokens(); router.replace("/login"); }
  return <div className="app-layout">
    <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
      <Link className="sidebar-brand" href="/"><span className="brand-mark"><Headphones size={20}/></span><span>support<span className="brand-accent">flow</span></span></Link>
      <div className="workspace-switch"><span className="workspace-icon">S</span><span><b>SupportFlow</b><small>Workspace</small></span><ChevronDown size={15}/></div>
      <div className="nav-caption">WORKSPACE</div><nav>{nav.map(item => { const Icon=item.icon; const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href); return <Link onClick={()=>setMenuOpen(false)} className={`nav-link ${active ? "active" : ""}`} href={item.href} key={item.href}><Icon size={18}/><span>{item.label}</span>{item.href==="/conversations" && <em>8</em>}</Link>; })}</nav>
      <div className="sidebar-bottom"><div className="plan-card"><div className="plan-icon"><SparkleIcon/></div><b>Make support smarter</b><p>Explore the power of AI automation.</p><Link href="/chatbots">Explore chatbots <span>↗</span></Link></div><div className="profile-row"><div className="avatar">{user?.first_name?.[0] || user?.email?.[0] || "S"}</div><div className="profile-text"><b>{user?.first_name || "Your account"}</b><small>{user?.email || "Loading profile..."}</small></div><button className="icon-btn" title="Sign out" onClick={logout}><LogOut size={16}/></button></div></div>
    </aside>
    {menuOpen && <button className="mobile-overlay" onClick={()=>setMenuOpen(false)} aria-label="Close menu"/>}
    <main className="main-area"><header className="topbar"><button className="mobile-menu icon-btn" onClick={()=>setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen?<X size={19}/>:<Menu size={19}/>}</button><div className="breadcrumb">Workspace <span>/</span> <b>{title}</b></div><div className="top-actions"><button className="search-box" onClick={()=>router.push("/conversations")}><Search size={16}/> <span>Search anything...</span><kbd>⌘ K</kbd></button><button className="icon-btn notification" aria-label="Notifications"><Bell size={18}/><i/></button><div className="top-divider"/><div className="top-user"><div className="avatar">{user?.first_name?.[0] || "S"}</div><ChevronDown size={14}/></div></div></header>
      <div className="page-wrap"><div className="page-heading"><div><div className="page-eyebrow">SUPPORTFLOW WORKSPACE</div><h1>{title}</h1><p>{subtitle}</p></div>{pathname !== "/settings" && <button className="primary-btn small" onClick={()=>router.push(pathname==="/chatbots"?"/chatbots?new=1":"/conversations?new=1")}><Plus size={16}/>{pathname==="/chatbots"?"Create chatbot":"New conversation"}</button>}</div>{children}</div>
    </main>
  </div>;
}
function SparkleIcon(){return <span>✦</span>}
