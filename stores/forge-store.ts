// ============================================================
// PATHFORGE AI — ZUSTAND STATE STORE (v3 — Career OS)
// ============================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ForgeProfile, GeneratedResults } from '@/lib/types';

interface ForgeStore {
  profile: ForgeProfile;
  results: GeneratedResults | null;
  skillNodeStates: Record<string, 'locked' | 'progress' | 'done'>;

  setProfileField: (field: keyof ForgeProfile, value: any) => void;
  setResults: (results: GeneratedResults) => void;
  setSkillNodeState: (nodeId: string, state: 'locked' | 'progress' | 'done') => void;
  resetProfile: () => void;
}

const defaultProfile: ForgeProfile = {
  name: "", gender: "prefer_not_to_say", class_level: "", stream: "", city: "",
  marks: 0, board: "", exam_score: null, trend: "stable",
  dream_job: "", priorities: [], timeline: "normal",
  constraints: [], abroad_open: "maybe", backup_openness: 3,
  budget: "", loan_open: "maybe", scholarship_exp: "never",
  deep_dream: ""
};

export const useForgeStore = create<ForgeStore>()(
  persist(
    (set) => ({
      profile: { ...defaultProfile },
      results: null,
      skillNodeStates: {},
      setProfileField: (field, value) => set(s => ({ profile: { ...s.profile, [field]: value } })),
      setResults: (results) => set({ results }),
      setSkillNodeState: (nodeId, state) => set(s => ({ skillNodeStates: { ...s.skillNodeStates, [nodeId]: state } })),
      resetProfile: () => set({ profile: { ...defaultProfile }, results: null, skillNodeStates: {} })
    }),
    { name: 'pathforge-v3-store' }
  )
);
