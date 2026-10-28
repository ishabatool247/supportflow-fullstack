"use client";
import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { Bot, Plus, X, CheckCircle2 } from "lucide-react";
export default function ChatbotsPage(){
 const [items,setItems]=useState<any[]>([]); const [show,setShow]=useState(false); const [name,setName]=useState(""); const [description,setDescription]=useState(""); const [error,setError]=useState("");
 async function load(){try{setItems(await api<any[]>("/chatbots/"));}catch(e){setError((e as Error).message)}}
 useEffect(()=>{load(); if(new URLSearchParams(window.location.search).get("new")==="1")setShow(true)},[]);
 async function create(e:React.FormEvent){e.preventDefault();setError("");try{await api("/chatbots/",{method:"POST",body:JSON.stringify({name,description,status:"Active"})});setName("");setDescription("");setShow(false);load()}catch(e){setError((e as Error).message)}}
 async function remove(id:number){if(!confirm("Delete this chatbot?"))return;await api(`/chatbots/${id}/`,{method:"DELETE"});load()}
 return <AppShell title="AI chatbots" subtitle="Build and manage the AI assistants that support your customers.">
 {error&&<div className="error-box">{error}</div>}<div className="content-toolbar"><div><b>{items.length} assistants</b><span className="muted"> connected to your workspace</span></div><button className="primary-btn small" onClick={()=>setShow(true)}><Plus size={16}/> Create chatbot</button></div>
 <div className="cards-grid">{items.map((b,i)=><div className="bot-card" key={b.id}><div className="bot-card-top"><div className={`bot-avatar bot-${i%3}`}><Bot size={21}/></div><span className="status-pill"><i/>{b.status}</span></div><h3>{b.name}</h3><p>{b.description||"Your AI customer support assistant."}</p><div className="bot-card-stats"><div><strong>{b.resolution_rate}%</strong><span>Resolution rate</span></div><div><strong>{b.conversations_count}</strong><span>Conversations</span></div></div><div className="bot-card-bottom"><span><CheckCircle2 size={14}/> Connected</span><button className="subtle-btn" onClick={()=>remove(b.id)}>Delete</button></div></div>)}{!items.length&&<div className="empty-panel"><Bot size={30}/><h3>No chatbots yet</h3><p>Create your first assistant to start organizing customer support.</p><button className="primary-btn small" onClick={()=>setShow(true)}><Plus size={16}/> Create chatbot</button></div>}</div>
 {show&&<div className="modal-backdrop"><form className="modal-card" onSubmit={create}><button type="button" className="modal-close icon-btn" onClick={()=>setShow(false)}><X size={18}/></button><div className="modal-icon"><Bot size={22}/></div><h2>Create AI chatbot</h2><p>Set up a new assistant for your workspace.</p><label>Chatbot name<input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Billing Assistant" required/></label><label>Description<textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="What should this assistant help with?"/></label>{error&&<div className="error-box">{error}</div>}<button className="primary-btn" type="submit">Create chatbot <Plus size={16}/></button></form></div>}
 </AppShell>
}
