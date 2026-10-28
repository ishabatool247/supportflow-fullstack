"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import {
  ArrowUpRight,
  ArrowRight,
  Bot,
  MessagesSquare,
  UsersRound,
  Zap,
  MoreHorizontal,
  Plus,
  Headset,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

type Dashboard = {
  total_conversations: number;
  resolution_rate: number;
  active_customers: number;
  avg_response: string;
  chatbots: any[];
  recent_conversations: any[];
  knowledge_documents: number;
};

export default function DashboardPage() {
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Dashboard>("/dashboard/")
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  const metrics = [
    {
      label: "Total conversations",
      value: data?.total_conversations?.toLocaleString() ?? "—",
      change: "All time",
      icon: MessagesSquare,
      color: "blue",
    },
    {
      label: "AI resolution rate",
      value: `${data?.resolution_rate ?? 0}%`,
      change: "Resolved by AI",
      icon: Zap,
      color: "purple",
    },
    {
      label: "Active customers",
      value: data?.active_customers?.toLocaleString() ?? "—",
      change: "Unique contacts",
      icon: UsersRound,
      color: "green",
    },
    {
      label: "Avg. response time",
      value: data?.avg_response ?? "—",
      change: "Across conversations",
      icon: Bot,
      color: "orange",
    },
  ];

  return (
    <AppShell
      title="Overview"
      subtitle="Here's what's happening with your customer support today."
    >
      {error && (
        <div className="error-box">
          {error} — make sure the backend is running.
        </div>
      )}

      <div className="welcome-banner">
        <div>
          <div className="welcome-tag">
            <span className="online-dot" />
            YOUR AI SUPPORT IS ONLINE
          </div>

          <h2>
            Good to see you again<span>.</span>
          </h2>

          <p>
            Your team is doing great. Here's your support performance at a glance.
          </p>

          <Link href="/analytics" className="banner-link">
            View performance <ArrowRight size={15} />
          </Link>
        </div>

        {/* Enhanced AI robot avatar */}
        <div
          className="banner-art"
          style={{
            position: "relative",
            minHeight: "220px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Soft blue glow behind the robot */}
          <div
            style={{
              position: "absolute",
              width: "190px",
              height: "190px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,204,255,0.28) 0%, rgba(36,99,235,0.13) 45%, transparent 72%)",
              filter: "blur(8px)",
            }}
          />

          {/* Decorative orbit rings */}
          <div
            className="orbit orbit-one"
            style={{
              position: "absolute",
              width: "205px",
              height: "125px",
              border: "1px solid rgba(34,211,238,0.45)",
              borderRadius: "50%",
              transform: "rotate(-25deg)",
            }}
          />

          <div
            className="orbit orbit-two"
            style={{
              position: "absolute",
              width: "205px",
              height: "125px",
              border: "1px solid rgba(59,130,246,0.42)",
              borderRadius: "50%",
              transform: "rotate(35deg)",
            }}
          />

          {/* Robot body and head */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: "translateY(8px)",
            }}
          >
            {/* Headset band */}
            <div
              style={{
                position: "absolute",
                top: "-13px",
                width: "126px",
                height: "85px",
                border: "5px solid #168bff",
                borderBottom: "none",
                borderRadius: "75px 75px 0 0",
                filter: "drop-shadow(0 0 9px rgba(0,174,255,0.8))",
              }}
            />

            {/* Robot head */}
            <div
              style={{
                position: "relative",
                width: "132px",
                height: "108px",
                borderRadius: "42px",
                background:
                  "linear-gradient(145deg, #f8fdff 0%, #b9dcf6 38%, #5189c7 100%)",
                border: "3px solid #48caff",
                boxShadow:
                  "0 0 0 5px rgba(30,144,255,0.15), 0 0 35px rgba(0,174,255,0.55), inset 0 -8px 16px rgba(0,40,100,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Dark glowing face */}
              <div
                style={{
                  width: "100px",
                  height: "76px",
                  borderRadius: "30px",
                  background:
                    "linear-gradient(145deg, #071a35, #061126)",
                  border: "1px solid rgba(34,211,238,0.65)",
                  boxShadow: "inset 0 0 18px rgba(0,174,255,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                {/* Friendly glowing eyes */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "27px",
                  }}
                >
                  <span
                    style={{
                      width: "12px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "#32eaff",
                      boxShadow: "0 0 12px #00cfff",
                    }}
                  />
                  <span
                    style={{
                      width: "12px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "#32eaff",
                      boxShadow: "0 0 12px #00cfff",
                    }}
                  />
                </div>

                {/* Friendly smile */}
                <div
                  style={{
                    width: "27px",
                    height: "12px",
                    borderBottom: "3px solid #32eaff",
                    borderRadius: "0 0 22px 22px",
                    filter: "drop-shadow(0 0 5px #00cfff)",
                  }}
                />
              </div>

              {/* Left ear piece */}
              <div
                style={{
                  position: "absolute",
                  left: "-12px",
                  top: "33px",
                  width: "15px",
                  height: "38px",
                  borderRadius: "9px",
                  background: "linear-gradient(#45d9ff, #1676ed)",
                  border: "2px solid #a8edff",
                  boxShadow: "0 0 12px rgba(0,195,255,0.7)",
                }}
              />

              {/* Right ear piece */}
              <div
                style={{
                  position: "absolute",
                  right: "-12px",
                  top: "33px",
                  width: "15px",
                  height: "38px",
                  borderRadius: "9px",
                  background: "linear-gradient(#45d9ff, #1676ed)",
                  border: "2px solid #a8edff",
                  boxShadow: "0 0 12px rgba(0,195,255,0.7)",
                }}
              />
            </div>

            {/* Robot neck */}
            <div
              style={{
                width: "32px",
                height: "13px",
                background: "linear-gradient(90deg, #367fc0, #bdeaff, #367fc0)",
                borderRadius: "0 0 8px 8px",
              }}
            />

            {/* Robot body */}
            <div
              style={{
                width: "102px",
                height: "65px",
                marginTop: "-1px",
                borderRadius: "25px 25px 16px 16px",
                background:
                  "linear-gradient(140deg, #f2fbff, #91c8f0 50%, #3473b6)",
                border: "2px solid #55d4ff",
                boxShadow: "0 8px 25px rgba(0,120,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "12px",
                  background: "linear-gradient(145deg, #0754ae, #06244e)",
                  border: "1px solid #40dfff",
                  boxShadow: "0 0 14px rgba(0,195,255,0.55)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#4be8ff",
                }}
              >
                <Headset size={22} />
              </div>
            </div>
          </div>

          {/* Floating AI badge */}
          <span
            className="float-chip chip-one"
            style={{
              position: "absolute",
              top: "18px",
              right: "0",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 12px",
              borderRadius: "12px",
              color: "#b8f4ff",
              background: "rgba(7,24,48,0.88)",
              border: "1px solid rgba(56,189,248,0.4)",
              boxShadow: "0 0 18px rgba(0,150,255,0.12)",
              fontSize: "12px",
            }}
          >
            <Sparkles size={14} /> AI powered
          </span>

          {/* Floating live badge */}
          <span
            className="float-chip chip-two"
            style={{
              position: "absolute",
              bottom: "25px",
              left: "0",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "9px 12px",
              borderRadius: "12px",
              color: "#d0eaff",
              background: "rgba(7,24,48,0.9)",
              border: "1px solid rgba(56,189,248,0.3)",
              fontSize: "12px",
            }}
          >
            <span className="online-dot" /> Live
          </span>

          {/* Floating message bubble */}
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: "0",
              width: "42px",
              height: "42px",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#49e7ff",
              background: "rgba(8,52,105,0.75)",
              border: "1px solid rgba(56,189,248,0.45)",
              boxShadow: "0 0 18px rgba(0,145,255,0.18)",
            }}
          >
            <MessageCircle size={20} />
          </div>
        </div>
      </div>

      <div className="section-title-row">
        <div>
          <h2>Workspace overview</h2>
          <p>Your key metrics for this workspace</p>
        </div>
        <span className="date-pill">
          Live data <span className="online-dot" />
        </span>
      </div>

      <div className="metric-grid">
        {metrics.map((m) => {
          const Icon = m.icon;

          return (
            <div className="metric-card" key={m.label}>
              <div className="metric-top">
                <span>{m.label}</span>
                <span className={`metric-icon ${m.color}`}>
                  <Icon size={18} />
                </span>
              </div>

              <strong>{m.value}</strong>

              <div className="metric-foot">
                <span className="metric-change">{m.change}</span>
                <span className="trend-icon">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Your AI chatbots</h3>
              <p>Monitor your automated assistants</p>
            </div>
            <Link href="/chatbots" className="text-link">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bot-list">
            {(data?.chatbots || []).slice(0, 3).map((bot: any, i: number) => (
              <div className="bot-row" key={bot.id}>
                <div className={`bot-avatar bot-${i}`}>
                  <Bot size={19} />
                </div>

                <div className="bot-info">
                  <b>{bot.name}</b>
                  <span>{bot.description || "AI customer assistant"}</span>
                </div>

                <div className="bot-stat">
                  <b>{bot.resolution_rate}%</b>
                  <span>Resolution</span>
                </div>

                <span className="status-pill">
                  <i /> {bot.status}
                </span>

                <button className="icon-btn" aria-label="More">
                  <MoreHorizontal size={17} />
                </button>
              </div>
            ))}

            {!data?.chatbots?.length && (
              <div className="empty-state">
                No chatbots yet. Create your first chatbot to get started.
              </div>
            )}
          </div>

          <Link href="/chatbots?new=1" className="add-bot">
            <Plus size={16} /> Create a new chatbot
          </Link>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <h3>Recent conversations</h3>
              <p>Latest customer interactions</p>
            </div>
            <Link href="/conversations" className="text-link">
              See all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="conversation-list">
            {(data?.recent_conversations || []).slice(0, 5).map((c: any, i: number) => (
              <Link
                href="/conversations"
                className="recent-row"
                key={c.id}
              >
                <div className={`customer-avatar customer-${i}`}>
                  {(c.customer_name || "C")
                    .split(" ")
                    .map((x: string) => x[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div className="recent-info">
                  <b>{c.customer_name}</b>
                  <span>{c.subject}</span>
                </div>

                <span
                  className={`conversation-status ${String(c.status).toLowerCase()}`}
                >
                  {c.status}
                </span>
              </Link>
            ))}

            {!data?.recent_conversations?.length && (
              <div className="empty-state">
                New conversations will appear here.
              </div>
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
