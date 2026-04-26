'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForgeStore } from '@/stores/forge-store';

interface SavedProfile {
  id: string;
  name: string;
  careerName: string;
  stream: string;
  classLevel: string;
  marks: number;
  dreamJob: string;
  savedAt: string;
  paths: { label: string; careerTarget: string; probability: number; primaryRoute: string }[];
}

export default function DashboardPage() {
  const { profile, results } = useForgeStore();
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([]);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Load saved profiles from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pathforge-saved-profiles');
      if (saved) {
        setSavedProfiles(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load saved profiles:', e);
    }
  }, []);

  // Save current results
  const handleSaveCurrent = () => {
    if (!results || !profile) return;

    const newProfile: SavedProfile = {
      id: Date.now().toString(),
      name: profile.name || 'Unnamed',
      careerName: results.careerName,
      stream: profile.stream,
      classLevel: profile.class_level,
      marks: profile.marks,
      dreamJob: profile.dream_job,
      savedAt: new Date().toISOString(),
      paths: results.paths.map(p => ({
        label: p.label,
        careerTarget: p.careerTarget,
        probability: p.probability,
        primaryRoute: p.primaryRoute,
      })),
    };

    const updated = [newProfile, ...savedProfiles];
    setSavedProfiles(updated);
    localStorage.setItem('pathforge-saved-profiles', JSON.stringify(updated));
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2500);
  };

  const handleDelete = (id: string) => {
    const updated = savedProfiles.filter(p => p.id !== id);
    setSavedProfiles(updated);
    localStorage.setItem('pathforge-saved-profiles', JSON.stringify(updated));
  };

  const firstName = profile?.name?.split(' ')[0] || 'Forger';
  const colorMap: Record<string, string> = { SAFE: 'var(--success)', BALANCED: 'var(--ember)', DREAM: 'var(--heat)' };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Dashboard Nav */}
      <nav style={{ padding: '16px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/icons/PathForgeAI.ico" alt="PathForge AI" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ember)' }}>PATHFORGE</span>
        </Link>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/forge" className="btn-primary" style={{ textDecoration: 'none', fontSize: 13 }}>+ New Path</Link>
          {results && (
            <button onClick={handleSaveCurrent} className="btn-ghost" style={{ fontSize: 13 }}>
              💾 Save Current
            </button>
          )}
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, marginBottom: 8 }}>Welcome back, {firstName}</h1>
        <p style={{ color: 'var(--text-dim)', marginBottom: 48 }}>Here are your saved career trajectories.</p>

        {/* Current Active Results */}
        {results && (
          <section style={{ marginBottom: 48 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--ember)', marginBottom: 16 }}>CURRENT SESSION</p>
            <div style={{ background: 'var(--surface)', border: '2px solid var(--ember)', borderRadius: 12, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--ember)' }}>{results.careerName}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', marginTop: 4 }}>
                    Class {profile.class_level} · {profile.stream} · {profile.marks}% · Dream: {profile.dream_job}
                  </p>
                </div>
                <Link href="/forge/results" className="btn-ghost" style={{ textDecoration: 'none', fontSize: 13 }}>View Full Report →</Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                {results.paths.map((path) => (
                  <div key={path.id} style={{ background: 'var(--bg)', padding: 16, borderRadius: 8, borderLeft: `3px solid ${colorMap[path.label] || 'var(--iron)'}` }}>
                    <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: colorMap[path.label] || 'var(--iron)' }}>{path.label}</span>
                    <p style={{ fontSize: 15, fontWeight: 500, marginTop: 4 }}>{path.careerTarget}</p>
                    <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{path.probability}% Probability</p>
                    <p style={{ fontSize: 12, color: 'var(--iron)', marginTop: 4 }}>{path.primaryRoute}</p>
                  </div>
                ))}
              </div>

              {/* Scholarship Summary */}
              {results.scholarships.length > 0 && (
                <div style={{ marginTop: 16, padding: 12, background: 'var(--bg)', borderRadius: 8 }}>
                  <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 8 }}>💰 {results.scholarships.length} scholarships matched:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {results.scholarships.slice(0, 4).map((s, i) => (
                      <span key={i} style={{ fontSize: 11, padding: '4px 8px', background: 'var(--surface)', borderRadius: 4, color: 'var(--text-dim)' }}>
                        {s.tier === 'high' ? '🏆' : '⚡'} {s.scholarship.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Saved Profiles */}
        <section>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--iron)', marginBottom: 16 }}>SAVED TRAJECTORIES</p>

          {savedProfiles.length === 0 && !results ? (
            <div style={{ textAlign: 'center', padding: '64px', border: '1px dashed var(--border)', borderRadius: 12 }}>
              <p style={{ color: 'var(--text-dim)', marginBottom: 16 }}>You haven't saved any career paths yet.</p>
              <Link href="/forge" className="btn-primary" style={{ textDecoration: 'none' }}>Forge Your First Path</Link>
            </div>
          ) : savedProfiles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', border: '1px dashed var(--border)', borderRadius: 12 }}>
              <p style={{ color: 'var(--text-dim)' }}>No saved trajectories yet. Click "💾 Save Current" to save your active session.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {savedProfiles.map(sp => (
                <div key={sp.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border)', paddingBottom: 16, marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--ember)' }}>{sp.careerName}</h3>
                      <p style={{ fontSize: 14, color: 'var(--text-dim)', marginTop: 4 }}>
                        {sp.name} · Class {sp.classLevel} · {sp.stream} · {sp.marks}% · Saved {new Date(sp.savedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button onClick={() => handleDelete(sp.id)} className="btn-ghost" style={{ fontSize: 12, color: 'var(--danger, #e74c3c)' }}>✕ Remove</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                    {sp.paths.map((path, i) => (
                      <div key={i} style={{ background: 'var(--bg)', padding: 16, borderRadius: 8 }}>
                        <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--iron)' }}>{path.label}</span>
                        <p style={{ fontSize: 15, fontWeight: 500, marginTop: 4 }}>{path.careerTarget}</p>
                        <p style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{path.probability}% Probability</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Institution Comparison (from current results) */}
        {results && results.institutions && results.institutions.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--iron)', marginBottom: 16 }}>🏛️ INSTITUTION COMPARISON</p>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--text-dim)', fontWeight: 500 }}>Institution</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--text-dim)', fontWeight: 500 }}>Tier</th>
                      <th style={{ padding: '12px 16px', textAlign: 'left', color: 'var(--text-dim)', fontWeight: 500 }}>Location</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-dim)', fontWeight: 500 }}>Fees/yr</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-dim)', fontWeight: 500 }}>Placement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Deduplicate by name */}
                    {[...new Map(results.institutions.map(i => [i.name, i])).values()].slice(0, 10).map((inst, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 500 }}>{inst.name}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                          <span style={{ background: inst.tier === 1 ? 'var(--ember)' : inst.tier === 2 ? 'var(--iron)' : '#555', color: '#fff', fontSize: 10, padding: '2px 8px', borderRadius: 4 }}>
                            T{inst.tier}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', color: 'var(--text-dim)' }}>{inst.city}, {inst.state}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                          ₹{(inst.fees_per_year / 100000).toFixed(1)}L
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--ember)' }}>
                          {inst.placement_median}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section style={{ marginTop: 48, marginBottom: 48, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href="/forge" className="btn-primary" style={{ textDecoration: 'none' }}>⚡ Forge New Path</Link>
          {results && <Link href="/forge/results" className="btn-ghost" style={{ textDecoration: 'none' }}>📊 View Full Report</Link>}
          {results && <Link href="/dashboard/skills" className="btn-ghost" style={{ textDecoration: 'none' }}>🌳 Skill Tree</Link>}
        </section>
      </div>

      {/* Toast */}
      <div className={`toast ${showSaveSuccess ? 'visible' : ''}`}>✅ Profile saved successfully!</div>
    </div>
  );
}
