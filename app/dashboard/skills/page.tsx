'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useForgeStore } from '@/stores/forge-store';

export default function SkillTreePage() {
  const { results, skillNodeStates, setSkillNodeState } = useForgeStore();

  if (!results) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <p style={{ color: 'var(--text-dim)' }}>No career data yet.</p>
        <Link href="/forge" className="btn-primary" style={{ textDecoration: 'none' }}>⚡ Forge Your Path First</Link>
      </div>
    );
  }

  const cycleState = (nodeId: string) => {
    const current = skillNodeStates[nodeId] || 'locked';
    const next = current === 'locked' ? 'progress' : current === 'progress' ? 'done' : 'locked';
    setSkillNodeState(nodeId, next);
  };

  const getNodeStyle = (nodeId: string) => {
    const state = skillNodeStates[nodeId] || 'locked';
    if (state === 'done') return { bg: 'var(--success-dim)', border: 'var(--success)', icon: '✅' };
    if (state === 'progress') return { bg: 'var(--ember-glow)', border: 'var(--ember)', icon: '📖' };
    return { bg: 'var(--surface-2)', border: 'var(--border)', icon: '🔒' };
  };

  // Build quest items from skill domains + institutions
  const quests = useMemo(() => {
    const q: { domain: string; task: string; id: string }[] = [];
    results.skillDomains.forEach((domain, di) => {
      domain.skills.forEach((skill, si) => {
        q.push({ domain: domain.name, task: `Master: ${skill}`, id: `skill-${di}-${si}` });
      });
      q.push({ domain: domain.name, task: `Resource: ${domain.topResource}`, id: `resource-${di}` });
    });
    // Add institution-specific quests
    results.institutions.slice(0, 3).forEach((inst, i) => {
      q.push({ domain: 'Admissions', task: `Research & apply: ${inst.name} (${inst.cutoff_description})`, id: `inst-${i}` });
    });
    return q;
  }, [results]);

  return (
    <div className="tree-page page-enter">
      {/* Nav */}
      <nav className="tree-nav no-print">
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src="/icons/PathForgeAI.ico" alt="PathForge AI" style={{ width: 32, height: 32, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--ember)' }}>PATHFORGE</span>
        </Link>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/forge/results" className="btn-ghost" style={{ textDecoration: 'none', fontSize: 13 }}>← Report</Link>
          <Link href="/dashboard" className="btn-ghost" style={{ textDecoration: 'none', fontSize: 13 }}>📊 Dashboard</Link>
        </div>
      </nav>

      <div className="tree-container">
        <header className="stagger">
          <p className="section-label">SKILL TREE</p>
          <h1 className="display-heading" style={{ fontSize: 40 }}>
            {results.careerName.toUpperCase()} PATH
          </h1>
          <p style={{ color: 'var(--text-dim)', marginTop: 8 }}>Click any node to cycle: 🔒 Locked → 📖 In Progress → ✅ Done</p>
        </header>

        {/* Visual Tree */}
        <div className="tree-visual">
          {/* Root */}
          <div className="tree-root-node">
            <span style={{ fontSize: 28 }}>🎯</span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--ember)' }}>{results.careerName.toUpperCase()}</span>
          </div>

          <div className="trunk-line" />

          {/* Branches */}
          <div className="tree-branches">
            {results.skillDomains.map((domain, di) => (
              <div key={di} className="branch">
                {/* Branch label */}
                <div className="branch-label">
                  <span className="section-label" style={{ marginBottom: 0, fontSize: 11 }}>{domain.name.toUpperCase()}</span>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--iron)' }}>{domain.timeMonths}mo</span>
                </div>

                {/* Leaf connector */}
                <div className="branch-line" />

                {/* Leaves (skills) */}
                <div className="leaves">
                  {domain.skills.map((skill, si) => {
                    const nodeId = `skill-${di}-${si}`;
                    const style = getNodeStyle(nodeId);
                    return (
                      <div
                        key={si}
                        className="leaf-node"
                        style={{ background: style.bg, borderColor: style.border }}
                        onClick={() => cycleState(nodeId)}
                        title={`Click to cycle state`}
                      >
                        <span className="leaf-icon">{style.icon}</span>
                        <span className="leaf-name">{skill}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Resource node */}
                <div className="resource-node">
                  <span style={{ fontSize: 11, color: 'var(--iron)' }}>📚</span>
                  <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{domain.topResource}</span>
                </div>
              </div>
            ))}

            {/* Admissions Branch */}
            <div className="branch">
              <div className="branch-label">
                <span className="section-label" style={{ marginBottom: 0, fontSize: 11 }}>ADMISSIONS</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--iron)' }}>ongoing</span>
              </div>
              <div className="branch-line" />
              <div className="leaves">
                {results.institutions.slice(0, 4).map((inst, i) => {
                  const nodeId = `inst-${i}`;
                  const style = getNodeStyle(nodeId);
                  return (
                    <div
                      key={i}
                      className="leaf-node"
                      style={{ background: style.bg, borderColor: style.border }}
                      onClick={() => cycleState(nodeId)}
                    >
                      <span className="leaf-icon">{style.icon}</span>
                      <span className="leaf-name">{inst.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Quest Board */}
        <section style={{ marginTop: 48 }}>
          <p className="section-label">YOUR QUEST BOARD</p>
          <p style={{ color: 'var(--text-dim)', fontSize: 14, marginBottom: 16 }}>Actionable items derived from your Skill Tree. Complete them to progress.</p>
          <div className="quest-grid stagger">
            {quests.map((q) => {
              const state = skillNodeStates[q.id] || 'locked';
              return (
                <div key={q.id} className={`quest-card ${state}`} onClick={() => cycleState(q.id)}>
                  <div className="quest-check">
                    {state === 'done' ? '✅' : state === 'progress' ? '🔄' : '⬜'}
                  </div>
                  <div>
                    <span style={{ fontSize: 10, color: 'var(--iron)', letterSpacing: '0.05em' }}>{q.domain.toUpperCase()}</span>
                    <p style={{ fontSize: 14, color: state === 'done' ? 'var(--success)' : 'var(--text)', textDecoration: state === 'done' ? 'line-through' : 'none' }}>{q.task}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <style jsx>{`
        .tree-page { min-height: 100vh; background: var(--bg); }
        .tree-nav {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 32px; border-bottom: 1px solid var(--border);
          position: sticky; top: 0; background: var(--bg); z-index: 50;
        }
        .tree-container { max-width: 960px; margin: 0 auto; padding: 40px 24px; }

        /* Tree Visual */
        .tree-visual { margin-top: 40px; display: flex; flex-direction: column; align-items: center; }
        .tree-root-node {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          padding: 20px 32px; background: var(--ember-glow); border: 2px solid var(--ember);
          border-radius: var(--radius-lg);
        }
        .trunk-line { width: 2px; height: 32px; background: var(--border-light); }
        .tree-branches { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; width: 100%; }

        .branch {
          flex: 1; min-width: 200px; max-width: 280px;
          display: flex; flex-direction: column; align-items: center;
        }
        .branch-label {
          display: flex; justify-content: space-between; align-items: center;
          width: 100%; padding: 8px 12px; background: var(--surface);
          border: 1px solid var(--border); border-radius: var(--radius);
        }
        .branch-line { width: 2px; height: 16px; background: var(--border); }

        .leaves { display: flex; flex-direction: column; gap: 6px; width: 100%; }
        .leaf-node {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border: 1px solid; border-radius: var(--radius);
          cursor: pointer; transition: all 150ms; user-select: none;
        }
        .leaf-node:hover { transform: translateX(4px); }
        .leaf-icon { font-size: 14px; flex-shrink: 0; }
        .leaf-name { font-size: 13px; font-weight: 500; }

        .resource-node {
          display: flex; gap: 6px; align-items: center; margin-top: 8px;
          padding: 6px 10px; background: var(--surface-2); border-radius: var(--radius);
          width: 100%;
        }

        /* Quest Board */
        .quest-grid { display: flex; flex-direction: column; gap: 8px; }
        .quest-card {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px; background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); cursor: pointer; transition: all 150ms;
        }
        .quest-card:hover { border-color: var(--ember-dim); }
        .quest-card.done { opacity: 0.6; }
        .quest-card.progress { border-left: 3px solid var(--ember); }
        .quest-check { font-size: 18px; flex-shrink: 0; }

        @media (max-width: 768px) {
          .tree-nav { padding: 12px 16px; }
          .tree-branches { flex-direction: column; align-items: center; }
          .branch { max-width: 100%; }
        }
      `}</style>
    </div>
  );
}
