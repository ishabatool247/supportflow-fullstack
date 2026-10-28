"use client";
import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { ChartNoAxesCombined, MessagesSquare, Zap, UsersRound } from "lucide-react";
export default function AnalyticsPage(){
 const [d,setD]=useState<any>(null);const [error,setError]=useState("");
 useEffect(()=>{api("/dashboard/").then(setD).catch(e=>setError(e.message))},[]);
 const vals=[{label:"Conversations",value:d?.total_conversations??"—",icon:MessagesSquare},{label:"Resolution rate",value:`${d?.resolution_rate??0}%`,icon:Zap},{label:"Active customers",value:d?.active_customers??"—",icon:UsersRound}];
 return <AppShell title="Analytics" subtitle="Understand how your support workspace is performing.">{error&&<div className="error-box">{error}</div>}<div className="metric-grid analytics-metrics">{vals.map(x=>{const I=x.icon;return <div className="metric-card" key={x.label}><div className="metric-top"><span>{x.label}</span><span className="metric-icon blue"><I size={18}/></span></div><strong>{x.value}</strong><div className="metric-foot"><span className="metric-change">Current workspace data</span></div></div>})}</div><div className="panel analytics-panel"><div className="panel-heading"><div><h3>Conversation status breakdown</h3><p>Based on conversations currently saved in your database</p></div><ChartNoAxesCombined size={20}/></div><div className="status-bars">{["Open","Pending","Resolved"].map(s=>{const count=(d?.recent_conversations||[]).filter((c:any)=>c.status===s).length;const total=Math.max((d?.recent_conversations||[]).length,1);return <div className="status-bar-row" key={s}><div><span>{s}</span><b>{count}</b></div><div className="bar-track"><span className={`bar-fill ${s.toLowerCase()}`} style={{width:`${count/total*100}%`}}/></div></div>})}</div><p className="muted analytics-note">This is a live summary of stored records, not a historical time-series report.</p></div></AppShell>
}
