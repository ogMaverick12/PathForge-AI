'use client';

import { useState, useEffect, useRef } from 'react';
import { useForgeStore } from '@/stores/forge-store';
import { getAutocompleteSuggestions, interpretDreamJob } from '@/lib/dream-job-interpreter';

export default function Step4DreamJob({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { goals, setGoals } = useForgeStore();
  const [query, setQuery] = useState(goals.dream_job ?? '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [preview, setPreview] = useState<ReturnType<typeof interpretDreamJob> | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) {
      setSuggestions([]);
      setPreview(null);
      return;
    }
    debounceRef.current = setTimeout(() => {
      setSuggestions(getAutocompleteSuggestions(query));
      const result = interpretDreamJob(query);
      setPreview(result);
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSelect = (val: string) => {
    setQuery(val);
    setGoals({ dream_job: val });
    setSuggestions([]);
    setShowSuggestions(false);
    const result = interpretDreamJob(val);
    setPreview(result);
  };

  const handleContinue = () => {
    setGoals({ dream_job: query, dream_job_normalized: preview?.matched_career?.id });
    onNext();
  };

  const confidence = preview?.confidence ?? 0;
  const confidenceColor =
    confidence >= 0.8 ? 'var(--accent-green)' :
    confidence >= 0.5 ? 'var(--accent-gold)' :
    'var(--accent-red)';

  return (
    <div style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>💡</div>
        <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Dream Job Interpreter</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Type anything — &quot;IIT coder&quot;, &quot;doctor who travels&quot;, &quot;like Neeraj Chopra&quot;.
          We&apos;ll map it to a real career.
        </p>
      </div>

      {/* Smart Input */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <div style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            type="text"
            className="input-field"
            placeholder="Type your dream job or career..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setGoals({ dream_job: e.target.value });
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            style={{ fontSize: 16, paddingRight: 100 }}
            autoFocus
          />
          {query && (
            <div
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 40,
                background: `${confidenceColor}18`,
                color: confidenceColor,
                border: `1px solid ${confidenceColor}40`,
              }}
            >
              {Math.round(confidence * 100)}% match
            </div>
          )}
        </div>

        {/* Autocomplete Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              zIndex: 50,
              marginTop: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            {suggestions.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  fontSize: 14,
                  borderBottom: i < suggestions.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'all 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
                onMouseDown={() => handleSelect(s)}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(108,99,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                }}
              >
                <span style={{ color: 'var(--primary)', fontSize: 12 }}>🔍</span>
                <span style={{ textTransform: 'capitalize' }}>{s}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Match Preview */}
      {preview && preview.matched_career && (
        <div
          style={{
            padding: '20px 24px',
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(108,99,255,0.08)',
            border: '1px solid rgba(108,99,255,0.25)',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 16,
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: 'var(--primary-light)', fontWeight: 600, marginBottom: 4, letterSpacing: '0.08em' }}>
                MAPPED CAREER
              </div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{preview.matched_career.name}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Domain</div>
              <div
                style={{
                  padding: '4px 10px',
                  borderRadius: 40,
                  background: 'rgba(108,99,255,0.15)',
                  border: '1px solid rgba(108,99,255,0.3)',
                  fontSize: 12,
                  color: 'var(--primary-light)',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}
              >
                {preview.matched_career.domain.replace('_', ' ')}
              </div>
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
            {preview.matched_career.description}
          </p>

          {/* Career Stats */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: 'Difficulty', value: `${preview.matched_career.difficulty}/10`, color: preview.matched_career.difficulty >= 8 ? 'var(--accent-red)' : 'var(--accent-gold)' },
              { label: 'Stress', value: `${preview.matched_career.stress_level}/10`, color: preview.matched_career.stress_level >= 8 ? 'var(--accent-red)' : 'var(--text-secondary)' },
              { label: 'ROI', value: `${preview.matched_career.roi_score}/10`, color: 'var(--accent-green)' },
              { label: 'Years to Establish', value: `${preview.matched_career.years_to_establish}y`, color: 'var(--text-secondary)' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Not this? */}
          {preview.suggestions.length > 0 && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
                Not quite right? Similar careers:
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {preview.suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelect(s.name)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 40,
                      border: '1px solid var(--border)',
                      background: 'var(--bg-elevated)',
                      color: 'var(--text-secondary)',
                      fontSize: 12,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary-light)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
                    }}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {preview && !preview.matched_career && query && (
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(249,115,22,0.08)',
            border: '1px solid rgba(249,115,22,0.25)',
            marginBottom: 24,
            fontSize: 14,
            color: 'var(--accent-orange)',
          }}
        >
          ⚠ Couldn&apos;t confidently match this career. Try being more specific:
          &quot;software engineer&quot;, &quot;MBBS doctor&quot;, &quot;IAS officer&quot;.
        </div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onBack}>
          ← Back
        </button>
        <button
          className="btn-primary"
          style={{ flex: 2, justifyContent: 'center' }}
          onClick={handleContinue}
          disabled={!query.trim()}
        >
          Continue → Sports
        </button>
      </div>
    </div>
  );
}
