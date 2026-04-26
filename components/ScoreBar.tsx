'use client';
import { useState, useEffect } from 'react';

export function ScoreBar({ value, max = 100, color = 'var(--ember)' }: { value: number; max?: number; color?: string }) {
  const [width, setWidth] = useState(0);
  
  useEffect(() => { 
    setTimeout(() => setWidth((value / max) * 100), 100); 
  }, [value, max]);
  
  return (
    <div className="score-bar-track">
      <div className="score-bar-fill" style={{ width: `${width}%`, background: color }} />
    </div>
  );
}
