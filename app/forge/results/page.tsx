'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForgeStore } from '@/stores/forge-store';
import { ForgeReport, ScoredPath, RealityWarning, RoadmapPhase, ScholarshipReport, ScholarshipMatch, FinancialGapAnalysis, ScholarshipRoadmap, ScholarshipRealityWarning, ScholarshipStrategy } from '@/lib/types';

// ─── Helpers ─────────────────────────────────────────────────

const PATH_META = {
  safe:       { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.25)',   label: '🛡️ Safe Path',       badge: 'badge-safe' },
  balanced:   { color: '#8b85ff', bg: 'rgba(108,99,255,0.08)', border: 'rgba(108,99,255,0.25)',  label: '⚡ Balanced Path',    badge: 'badge-balanced' },
  aggressive: { color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', label: '🚀 Aggressive Path', badge: 'badge-aggressive' },
};

const SEVERITY_META = {
  critical: { color: 'var(--accent-red)',    bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)',   icon: '🚨' },
  moderate: { color: 'var(--accent-orange)', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', icon: '⚠️' },
  info:     { color: 'var(--accent-cyan)',   bg: 'rgba(0,217,245,0.05)',   border: 'rgba(0,217,245,0.2)',   icon: '✅' },
};

function ScoreRing({ score, size = 120, label }: { score: number; size?: number; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = (size - 16) / 2;
    const start = -Math.PI / 2;
    const end = start + (score / 100) * 2 * Math.PI;

    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 8;
    ctx.stroke();

    // Score arc
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#8b85ff');
    gradient.addColorStop(1, '#00d9f5');
    ctx.beginPath();
    ctx.arc(cx, cy, r, start, end);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Score text
    ctx.fillStyle = '#f0f4ff';
    ctx.font = `700 ${size * 0.22}px "Space Grotesk", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${score}`, cx, cy - 6);

    ctx.fillStyle = 'rgba(148,163,184,0.7)';
    ctx.font = `500 ${size * 0.09}px Inter, sans-serif`;
    ctx.fillText(label, cx, cy + size * 0.14);
  }, [score, size, label]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      aria-label={`${label}: ${score}`}
    />
  );
}

function ProbabilityBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
        <span style={{ color: 'var(--text-muted)' }}>Probability</span>
        <span style={{ fontWeight: 700, color }}>{value}%</span>
      </div>
      <div
        style={{
          height: 6,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${value}%`,
            background: `linear-gradient(90deg, ${color}, ${color}cc)`,
            borderRadius: 4,
            transition: 'width 1s ease',
          }}
        />
      </div>
    </div>
  );
}

function PathCard({ path, rank }: { path: ScoredPath; rank: number }) {
  const meta = PATH_META[path.type];

  return (
    <div
      style={{
        background: meta.bg,
        border: `1px solid ${meta.border}`,
        borderRadius: 'var(--radius-xl)',
        padding: '28px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        flex: 1,
        minWidth: 280,
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px ${meta.color}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: meta.color,
                marginBottom: 6,
                display: 'block',
              }}
            >
              {rank === 1 ? '★ TOP RECOMMENDATION' : `PATH ${rank}`}
            </span>
            <div style={{ fontWeight: 800, fontSize: 17 }}>{meta.label}</div>
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: `${meta.color}22`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
            }}
          >
            {rank === 1 ? '🏆' : rank === 2 ? '🥈' : '🎯'}
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 14, color: meta.color, marginBottom: 4 }}>
          {path.path_variant.label}
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {path.path_variant.description}
        </p>
      </div>

      {/* Probability */}
      <ProbabilityBar value={path.probability_percent} color={meta.color} />

      {/* Score cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'Goal Fit', value: `${Math.round(path.scores.goal_alignment * 100)}%` },
          { label: 'ROI Score', value: `${Math.round(path.scores.roi * 10)}/10` },
          { label: 'Stress Match', value: `${Math.round(path.scores.stress * 100)}%` },
          { label: 'Overall', value: `${Math.round(path.scores.final * 100)}%` },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              padding: '10px 12px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16, color: meta.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Exams */}
      {path.path_variant.target_exams.length > 0 && (
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>
            TARGET EXAMS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {path.path_variant.target_exams.map((e) => (
              <span
                key={e}
                style={{
                  padding: '4px 10px',
                  background: `${meta.color}15`,
                  border: `1px solid ${meta.color}30`,
                  borderRadius: 40,
                  fontSize: 11,
                  color: meta.color,
                  fontWeight: 600,
                }}
              >
                {e}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Key institutions */}
      <div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600 }}>
          TARGET INSTITUTIONS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {path.path_variant.institutions.slice(0, 3).map((inst) => (
            <div
              key={inst.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 10px',
                background: 'rgba(0,0,0,0.15)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 500 }}>{inst.name}</span>
              {inst.annual_cost_inr && (
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                  ₹{inst.annual_cost_inr}L/yr
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cost + Expected salary */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          paddingTop: 16,
          borderTop: `1px solid ${meta.color}25`,
        }}
      >
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>
            ₹{path.path_variant.cost_inr_lakhs}L
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Total Cost</div>
        </div>
        {path.path_variant.expected_salary_lpa && (
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-green)' }}>
              ₹{path.path_variant.expected_salary_lpa} LPA
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Expected Salary</div>
          </div>
        )}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>
            {path.path_variant.timeline_years}y
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Timeline</div>
        </div>
      </div>
    </div>
  );
}

function RealityPanel({ warnings }: { warnings: RealityWarning[] }) {
  const critical = warnings.filter((w) => w.severity === 'critical');
  const moderate = warnings.filter((w) => w.severity === 'moderate');
  const positive = warnings.filter((w) => w.severity === 'info');

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
          💀 Reality Engine Report
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Brutally honest. Non-toxic. Built to help you win — not just feel good.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[...critical, ...moderate, ...positive].map((w, i) => {
          const meta = SEVERITY_META[w.severity];
          return (
            <div
              key={i}
              style={{
                padding: '18px 20px',
                borderRadius: 'var(--radius-md)',
                background: meta.bg,
                border: `1px solid ${meta.border}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  marginBottom: w.suggestion ? 12 : 0,
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{meta.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: meta.color, marginBottom: 4 }}>
                    {w.title}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {w.message}
                  </p>
                </div>
              </div>
              {w.suggestion && (
                <div
                  style={{
                    marginLeft: 32,
                    padding: '10px 14px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    borderLeft: `2px solid ${meta.color}`,
                  }}
                >
                  💡 <strong>Action: </strong>{w.suggestion}
                </div>
              )}
            </div>
          );
        })}

        {warnings.length === 0 && (
          <div
            style={{
              padding: '24px',
              textAlign: 'center',
              color: 'var(--accent-green)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(34,197,94,0.05)',
            }}
          >
            ✅ No major mismatches detected in your profile.
          </div>
        )}
      </div>
    </div>
  );
}

function RoadmapTimeline({ phases }: { phases: RoadmapPhase[] }) {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>🗺️ Execution Roadmap</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
          Phase-by-phase plan with milestones, exams, and decision checkpoints.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {phases.map((phase, i) => (
          <div key={i} style={{ display: 'flex', gap: 0 }}>
            {/* Timeline stem */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
                width: 40,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent-cyan))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700,
                  color: 'white',
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                {i + 1}
              </div>
              {i < phases.length - 1 && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    background: 'linear-gradient(180deg, rgba(108,99,255,0.5), rgba(108,99,255,0.1))',
                    margin: '4px 0',
                    minHeight: 32,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div
              style={{
                marginLeft: 16,
                paddingBottom: i < phases.length - 1 ? 32 : 0,
                flex: 1,
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 2 }}>{phase.label}</div>
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: 11,
                    padding: '2px 8px',
                    borderRadius: 40,
                    background: 'rgba(108,99,255,0.12)',
                    color: 'var(--primary-light)',
                    marginBottom: 12,
                  }}
                >
                  {phase.duration}
                </div>
              </div>

              <div
                className="glass"
                style={{ borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: 0 }}
              >
                {/* Milestones */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.06em' }}>
                    MILESTONES
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {phase.milestones.map((m, j) => (
                      <li key={j} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent-green)', flexShrink: 0 }}>→</span>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                {phase.skills_to_learn.length > 0 && (
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.06em' }}>
                      SKILLS TO BUILD
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {phase.skills_to_learn.map((s) => (
                        <span
                          key={s}
                          style={{
                            padding: '3px 10px',
                            borderRadius: 40,
                            background: 'rgba(108,99,255,0.1)',
                            border: '1px solid rgba(108,99,255,0.2)',
                            fontSize: 11,
                            color: 'var(--primary-light)',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exams */}
                {phase.exams && phase.exams.length > 0 && (
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.06em' }}>
                      KEY EXAMS
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {phase.exams.map((e) => (
                        <span
                          key={e}
                          style={{
                            padding: '3px 10px',
                            borderRadius: 40,
                            background: 'rgba(249,115,22,0.1)',
                            border: '1px solid rgba(249,115,22,0.2)',
                            fontSize: 11,
                            color: 'var(--accent-orange)',
                          }}
                        >
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Decision Checkpoints */}
                {phase.decision_checkpoints && phase.decision_checkpoints.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.06em' }}>
                      DECISION CHECKPOINTS
                    </div>
                    {phase.decision_checkpoints.map((d, j) => (
                      <div
                        key={j}
                        style={{
                          fontSize: 12,
                          color: 'var(--accent-gold)',
                          display: 'flex',
                          gap: 6,
                          alignItems: 'flex-start',
                        }}
                      >
                        <span>◆</span> {d}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SCHOLARSHIP DASHBOARD ────────────────────────────────────

const TIER_META = {
  high_chance:    { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.25)',   label: 'High Chance',      icon: '🟢' },
  moderate_chance:{ color: '#f0a500', bg: 'rgba(240,165,0,0.08)',   border: 'rgba(240,165,0,0.25)',   label: 'Moderate',         icon: '🟡' },
  reach:          { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)',   label: 'Reach',            icon: '🔴' },
};

const EFFORT_COLORS: Record<string, string> = {
  low: '#22c55e', medium: '#f0a500', high: '#f97316', extreme: '#ef4444',
};

const S_SEVERITY_META = {
  critical: { color: 'var(--accent-red)',    bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)',   icon: '🚨' },
  moderate: { color: 'var(--accent-orange)', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)', icon: '⚠️' },
  info:     { color: 'var(--accent-cyan)',   bg: 'rgba(0,217,245,0.05)',   border: 'rgba(0,217,245,0.2)',   icon: '✅' },
};

function ScholarshipCard({ match, rank }: { match: ScholarshipMatch; rank: number }) {
  const tier = TIER_META[match.tier];
  const effort = EFFORT_COLORS[match.effort_required] || '#888';

  return (
    <div
      style={{
        padding: '20px 22px',
        borderRadius: 'var(--radius-lg)',
        background: tier.bg,
        border: `1px solid ${tier.border}`,
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${tier.color}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: tier.color, letterSpacing: '0.08em' }}>
              #{rank} {tier.icon} {tier.label.toUpperCase()}
            </span>
          </div>
          <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{match.scholarship.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {match.scholarship.provider} · {match.scholarship.country}
          </div>
        </div>
        <div style={{
          width: 50, height: 50, borderRadius: '50%',
          background: `${tier.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontWeight: 900, fontSize: 16, color: tier.color }}>{match.match_score}</span>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>
        {match.scholarship.description}
      </p>

      {/* Match breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 14 }}>
        {[
          { label: 'Academic', value: Math.round(match.academic_fit * 100) },
          { label: 'Need Fit', value: Math.round(match.financial_need_fit * 100) },
          { label: 'Profile', value: Math.round(match.profile_strength * 100) },
          { label: 'Goal Fit', value: Math.round(match.goal_alignment * 100) },
          { label: 'Chance', value: Math.round(match.competition_level * 100) },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center', padding: '6px 0', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: tier.color }}>{s.value}%</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
        <span style={{
          padding: '3px 10px', borderRadius: 40, fontSize: 11, fontWeight: 600,
          background: `${tier.color}15`, border: `1px solid ${tier.color}30`, color: tier.color,
        }}>
          {match.scholarship.coverage.replace('_', ' ').toUpperCase()}
        </span>
        {match.scholarship.amount_inr_lakhs && (
          <span style={{
            padding: '3px 10px', borderRadius: 40, fontSize: 11, fontWeight: 600,
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: 'var(--accent-green)',
          }}>
            ₹{match.scholarship.amount_inr_lakhs}L
          </span>
        )}
        <span style={{
          padding: '3px 10px', borderRadius: 40, fontSize: 11, fontWeight: 600,
          background: `${effort}15`, border: `1px solid ${effort}30`, color: effort,
        }}>
          {match.effort_required.toUpperCase()} EFFORT
        </span>
        <span style={{
          padding: '3px 10px', borderRadius: 40, fontSize: 11, fontWeight: 600,
          background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)', color: 'var(--primary-light)',
        }}>
          {match.scholarship.deadline_month}
        </span>
      </div>

      {/* Notes */}
      {match.notes.length > 0 && (
        <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,0.15)', borderRadius: 'var(--radius-sm)', marginTop: 8 }}>
          {match.notes.map((n, i) => (
            <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', gap: 6, marginBottom: 4 }}>
              <span style={{ color: tier.color, flexShrink: 0 }}>→</span> {n}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FinancialGapPanel({ gap }: { gap: FinancialGapAnalysis }) {
  const coverageColor = gap.coverage_percentage >= 60 ? 'var(--accent-green)' :
                        gap.coverage_percentage >= 30 ? 'var(--accent-gold)' : 'var(--accent-red)';

  return (
    <div className="glass" style={{ borderRadius: 'var(--radius-xl)', padding: '28px', marginBottom: 32 }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>💰 Financial Gap Analysis</h3>

      {/* Big numbers */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
        <div style={{ flex: 1, minWidth: 140, padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--text-primary)' }}>₹{gap.total_estimated_cost_inr}L</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Estimated Total Cost</div>
        </div>
        <div style={{ flex: 1, minWidth: 140, padding: '16px', background: 'rgba(34,197,94,0.06)', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid rgba(34,197,94,0.15)' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--accent-green)' }}>₹{gap.total_scholarship_coverage_inr}L</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Potential Scholarship Coverage</div>
        </div>
        <div style={{ flex: 1, minWidth: 140, padding: '16px', background: gap.remaining_gap_inr > 0 ? 'rgba(239,68,68,0.06)' : 'rgba(34,197,94,0.06)', borderRadius: 'var(--radius-md)', textAlign: 'center', border: `1px solid ${gap.remaining_gap_inr > 0 ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)'}` }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: gap.remaining_gap_inr > 0 ? 'var(--accent-red)' : 'var(--accent-green)' }}>
            ₹{gap.remaining_gap_inr}L
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Remaining Gap</div>
        </div>
      </div>

      {/* Coverage bar */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
          <span style={{ color: 'var(--text-muted)' }}>Scholarship Coverage</span>
          <span style={{ fontWeight: 700, color: coverageColor }}>{gap.coverage_percentage}%</span>
        </div>
        <div style={{ height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${Math.min(gap.coverage_percentage, 100)}%`,
            background: `linear-gradient(90deg, ${coverageColor}, ${coverageColor}88)`,
            borderRadius: 6,
            transition: 'width 1.5s ease',
          }} />
        </div>
      </div>

      {/* Suggestions */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.06em' }}>
          RECOMMENDATIONS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {gap.suggestions.map((s, i) => (
            <div key={i} style={{
              padding: '10px 14px',
              background: 'rgba(108,99,255,0.05)',
              border: '1px solid rgba(108,99,255,0.15)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              display: 'flex',
              gap: 8,
            }}>
              <span style={{ color: 'var(--primary-light)', flexShrink: 0 }}>💡</span> {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StrategySection({ strategy }: { strategy: ScholarshipStrategy }) {
  const sections = [
    { title: '🎯 Apply Now', desc: 'High-match scholarships you should apply to immediately', items: strategy.apply_now, color: '#22c55e' },
    { title: '📈 Prepare For (1-2 Years)', desc: 'Competitive scholarships worth building your profile for', items: strategy.prepare_for, color: '#f0a500' },
    { title: '🛡️ Backup Funding', desc: 'Partial funding and easier options as safety net', items: strategy.backup_funding, color: '#8b85ff' },
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>🧩 Personalized Strategy</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>
        Not just a list — a prioritized action plan based on your specific profile.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {sections.map((sec) => (
          <div key={sec.title}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: sec.color }}>{sec.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>— {sec.desc}</div>
            </div>
            {sec.items.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {sec.items.map((m, i) => (
                  <div
                    key={m.scholarship.id}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      background: `${sec.color}08`,
                      border: `1px solid ${sec.color}25`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 16,
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{m.scholarship.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {m.scholarship.country} · {m.scholarship.coverage_details.slice(0, 80)}...
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: 40, fontSize: 11, fontWeight: 700,
                        background: `${sec.color}15`, color: sec.color,
                      }}>
                        {m.match_score}% match
                      </span>
                      {m.scholarship.amount_inr_lakhs && (
                        <span style={{
                          padding: '4px 10px', borderRadius: 40, fontSize: 11, fontWeight: 600,
                          background: 'rgba(34,197,94,0.1)', color: 'var(--accent-green)',
                        }}>
                          ₹{m.scholarship.amount_inr_lakhs}L
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                padding: '16px', textAlign: 'center', fontSize: 13,
                color: 'var(--text-muted)', background: 'rgba(0,0,0,0.1)',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
              }}>
                No scholarships in this category based on your current profile.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScholarshipRoadmapPanel({ roadmap }: { roadmap: ScholarshipRoadmap }) {
  const phases = [
    { label: 'Phase 1: Profile Building', icon: '🏗️', color: '#8b85ff', items: roadmap.phase_1_profile_building },
    { label: 'Phase 2: Preparation', icon: '📝', color: '#00d9f5', items: roadmap.phase_2_preparation },
    { label: 'Phase 3: Application Execution', icon: '🚀', color: '#22c55e', items: roadmap.phase_3_execution },
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>🗺️ Scholarship Roadmap</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>
        Step-by-step plan to maximize your scholarship outcomes.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {phases.map((phase) => (
          <div key={phase.label} className="glass" style={{ borderRadius: 'var(--radius-lg)', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>{phase.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 15, color: phase.color }}>{phase.label}</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {phase.items.map((item, j) => (
                <li key={j} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  <span style={{ color: phase.color, flexShrink: 0, marginTop: 2 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScholarshipDashboard({ report }: { report: ScholarshipReport }) {
  const topMatches = report.matches.slice(0, 8);
  const critical = report.reality_warnings.filter(w => w.severity === 'critical');
  const moderate = report.reality_warnings.filter(w => w.severity === 'moderate');
  const positive = report.reality_warnings.filter(w => w.severity === 'info');

  return (
    <section style={{ marginBottom: 56 }}>
      {/* Section Header */}
      <div style={{
        padding: '32px',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(240,165,0,0.08), rgba(108,99,255,0.06))',
        border: '1px solid rgba(240,165,0,0.2)',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 28 }}>🎓</span>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 900 }}>Scholarship Intelligence Report</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              {report.matches.length} scholarships analyzed · {report.matches.filter(m => m.tier === 'high_chance').length} high-chance matches · ₹{Math.round(report.matches.reduce((s, m) => s + (m.scholarship.amount_inr_lakhs ?? 0), 0))}L total potential funding
            </p>
          </div>
        </div>
        {/* Quick stats */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
          {[
            { label: 'High Chance', count: report.matches.filter(m => m.tier === 'high_chance').length, color: '#22c55e' },
            { label: 'Moderate', count: report.matches.filter(m => m.tier === 'moderate_chance').length, color: '#f0a500' },
            { label: 'Reach', count: report.matches.filter(m => m.tier === 'reach').length, color: '#ef4444' },
            { label: 'Coverage', count: `${report.financial_gap.coverage_percentage}%`, color: '#8b85ff' },
          ].map(s => (
            <div key={s.label} style={{
              padding: '8px 16px',
              background: `${s.color}12`,
              border: `1px solid ${s.color}30`,
              borderRadius: 40,
              fontSize: 13,
              fontWeight: 600,
              color: s.color,
            }}>
              {s.count} {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Financial Gap */}
      <FinancialGapPanel gap={report.financial_gap} />

      {/* Strategy */}
      <StrategySection strategy={report.strategy} />

      {/* Scholarship Reality Warnings */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>💀 Scholarship Reality Check</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>
          Direct, honest assessment of your scholarship prospects.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[...critical, ...moderate, ...positive].map((w, i) => {
            const meta = S_SEVERITY_META[w.severity];
            return (
              <div key={i} style={{
                padding: '16px 18px',
                borderRadius: 'var(--radius-md)',
                background: meta.bg,
                border: `1px solid ${meta.border}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: w.suggestion ? 10 : 0 }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{meta.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: meta.color, marginBottom: 3 }}>{w.title}</div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{w.message}</p>
                  </div>
                </div>
                {w.suggestion && (
                  <div style={{
                    marginLeft: 28,
                    padding: '8px 12px',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 12,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    borderLeft: `2px solid ${meta.color}`,
                  }}>
                    💡 <strong>Action: </strong>{w.suggestion}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scholarship Roadmap */}
      <ScholarshipRoadmapPanel roadmap={report.roadmap} />

      {/* Ranked Scholarship Cards */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>📊 Ranked Scholarship Matches</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>
          Sorted by match score. Click to see details.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }}>
          {topMatches.map((m, i) => (
            <ScholarshipCard key={m.scholarship.id} match={m} rank={i + 1} />
          ))}
        </div>
        {report.matches.length === 0 && (
          <div style={{
            padding: '32px', textAlign: 'center', color: 'var(--text-muted)',
            background: 'rgba(0,0,0,0.1)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
          }}>
            No matching scholarships found for your current profile and location preferences.
            Consider broadening your location preference or improving your academic profile.
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div style={{
        padding: '16px 20px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(240,165,0,0.05)',
        border: '1px solid rgba(240,165,0,0.15)',
        fontSize: 12,
        color: 'var(--text-muted)',
        lineHeight: 1.7,
      }}>
        ⚠️ <strong style={{ color: 'var(--accent-gold)' }}>Disclaimer:</strong> Scholarship match scores are estimates based on publicly available data.
        Actual eligibility, acceptance rates, and coverage may vary. This tool does not guarantee any scholarship award.
        Always verify requirements directly with the scholarship provider before applying.
      </div>
    </section>
  );
}

// ─── MAIN RESULTS PAGE ────────────────────────────────────────

export default function ResultsPage() {
  const router = useRouter();
  const { report, reset } = useForgeStore();

  useEffect(() => {
    if (!report) router.push('/forge');
  }, [report, router]);

  if (!report) return null;

  const r = report as ForgeReport;
  const sortedPaths = [...r.paths].sort((a, b) => b.scores.final - a.scores.final);

  const goalFitColor =
    r.goal_fit_score >= 70 ? 'var(--accent-green)' :
    r.goal_fit_score >= 45 ? 'var(--accent-gold)' :
    'var(--accent-red)';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage: `radial-gradient(ellipse 60% 40% at 80% -10%, rgba(108,99,255,0.1) 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Navbar */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(5,8,16,0.9)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(20px)',
          padding: '0 32px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }}>
          <span>⚡</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>PathForge AI</span>
        </a>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            className="btn-ghost"
            style={{ padding: '8px 16px', fontSize: 13 }}
            onClick={() => window.print()}
          >
            🖨️ Export
          </button>
          <button
            className="btn-primary"
            style={{ padding: '8px 18px', fontSize: 13 }}
            onClick={() => {
              reset();
              router.push('/forge');
            }}
          >
            ⚡ New Analysis
          </button>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* ── HERO SUMMARY ───────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            gap: 32,
            alignItems: 'flex-start',
            marginBottom: 56,
            flexWrap: 'wrap',
          }}
        >
          {/* Score Ring */}
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <ScoreRing score={r.goal_fit_score} size={130} label="Goal Fit" />
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: goalFitColor,
                textAlign: 'center',
              }}
            >
              {r.goal_fit_score >= 70 ? 'Strong Alignment' : r.goal_fit_score >= 45 ? 'Moderate Fit' : 'Needs Work'}
            </div>
          </div>

          {/* Summary text */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--primary-light)',
                marginBottom: 8,
              }}
            >
              PATHFORGE ANALYSIS REPORT
            </div>
            <h1
              style={{
                fontSize: 'clamp(26px, 4vw, 42px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                marginBottom: 12,
              }}
            >
              Your Path to{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #8b85ff, #00d9f5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {r.primary_career.name}
              </span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
              {r.primary_career.description} — The engine has generated <strong style={{ color: 'var(--text-primary)' }}>3 ranked paths</strong>, a{' '}
              <strong style={{ color: 'var(--text-primary)' }}>reality check</strong>, and a{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{r.roadmap.length}-phase roadmap</strong> based on your profile.
            </p>

            {/* Key stats */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { label: 'Career Domain', value: r.primary_career.domain.replace('_', ' ') },
                { label: 'Difficulty', value: `${r.primary_career.difficulty}/10`, warn: r.primary_career.difficulty >= 8 },
                { label: 'ROI Score', value: `${r.primary_career.roi_score}/10` },
                { label: 'Years to Establish', value: `${r.primary_career.years_to_establish}y` },
                { label: 'Paths Generated', value: `${r.paths.length}` },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: s.warn ? 'var(--accent-red)' : 'var(--text-primary)',
                      textTransform: 'capitalize',
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reality warnings count */}
          <div
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px 24px',
              minWidth: 160,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            {[
              { count: r.reality_warnings.filter((w) => w.severity === 'critical').length, label: 'Critical Alerts', color: 'var(--accent-red)' },
              { count: r.reality_warnings.filter((w) => w.severity === 'moderate').length, label: 'Warnings', color: 'var(--accent-orange)' },
              { count: r.reality_warnings.filter((w) => w.severity === 'info').length, label: 'Positive Signals', color: 'var(--accent-green)' },
            ].map((s) => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{s.label}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3 PATH CARDS ───────────────────────────────── */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>⚡ Your 3 Career Paths</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>
            Ranked by overall score. Each path adapts to your budget, risk, and goals.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              alignItems: 'stretch',
            }}
          >
            {sortedPaths.map((path, i) => (
              <PathCard key={path.type} path={path} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* ── BACKUP CAREER ─────────────────────────────── */}
        {r.backup_career && (
          <section style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>🛡️ Backup Career Path</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>
              Especially critical for high-risk careers. Never have one plan.
            </p>
            <div
              className="glass"
              style={{
                borderRadius: 'var(--radius-lg)',
                padding: '24px 28px',
                display: 'flex',
                gap: 24,
                alignItems: 'flex-start',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
                  {r.backup_career.name}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
                  {r.backup_career.description}
                </p>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Difficulty', value: `${r.backup_career.difficulty}/10` },
                    { label: 'ROI', value: `${r.backup_career.roi_score}/10` },
                    { label: 'Years', value: `${r.backup_career.years_to_establish}y` },
                    { label: 'Stress', value: `${r.backup_career.stress_level}/10` },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  padding: '14px 18px',
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  maxWidth: 260,
                }}
              >
                💡 <strong style={{ color: 'var(--text-primary)' }}>Why this matters:</strong> If your primary path faces
                an unexpected obstacle, this ensures you have a strong, pre-prepared alternative — not a last-minute panic pivot.
              </div>
            </div>
          </section>
        )}

        {/* ── REALITY ENGINE ────────────────────────────── */}
        <section style={{ marginBottom: 56 }}>
          <RealityPanel warnings={r.reality_warnings} />
        </section>

        {/* ── ROADMAP ───────────────────────────────────── */}
        <section style={{ marginBottom: 56 }}>
          <RoadmapTimeline phases={r.roadmap} />
        </section>

        {/* ── SCHOLARSHIP INTELLIGENCE ─────────────────── */}
        {r.scholarship_report && (
          <ScholarshipDashboard report={r.scholarship_report} />
        )}

        {/* ── BOTTOM CTA ────────────────────────────────── */}
        <div
          style={{
            textAlign: 'center',
            padding: '48px 24px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,217,245,0.04))',
            border: '1px solid rgba(108,99,255,0.2)',
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>
            Ready to execute?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            This is your baseline analysis. Run a new analysis with updated inputs as your situation evolves.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={() => { reset(); router.push('/forge'); }}
            >
              ⚡ New Analysis
            </button>
            <button
              className="btn-ghost"
              onClick={() => window.print()}
            >
              🖨️ Save / Print Report
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
