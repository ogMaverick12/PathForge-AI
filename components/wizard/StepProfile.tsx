'use client';
import { useForgeStore } from '@/stores/forge-store';

export default function StepProfile() {
  const { profile, setProfileField } = useForgeStore();

  const classOptions = ["9", "10", "11", "12", "Dropper", "Graduate"];
  const streamOptions = ["PCM", "PCB", "Commerce", "Arts", "Vocational", "Other"];

  return (
    <div className="step-content page-enter">
      <p className="section-label">STEP 1 OF 6 — PROFILE</p>
      <h2 className="display-heading" style={{ fontSize: 48, marginBottom: 32 }}>WHO ARE YOU?</h2>

      <div className="field-grid">
        <div className="field">
          <label htmlFor="name">Your Name</label>
          <input id="name" type="text" placeholder="e.g. Riya Sharma" value={profile.name} onChange={e => setProfileField('name', e.target.value)} />
          {profile.name.length > 0 && profile.name.length < 2 && <span className="field-error">Min 2 characters</span>}
        </div>

        <div className="field">
          <label>Gender</label>
          <div className="toggle-group">
            {(["male", "female", "other", "prefer_not_to_say"] as const).map(opt => (
              <button key={opt} className={`chip ${profile.gender === opt ? 'selected' : ''}`} onClick={() => setProfileField('gender', opt)}>
                {opt === 'male' ? '♂ Male' : opt === 'female' ? '♀ Female' : opt === 'other' ? '⚧ Other' : '🔒 Prefer not to say'}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Class / Level</label>
          <div className="toggle-group">
            {classOptions.map(opt => (
              <button key={opt} className={`chip ${profile.class_level === opt ? 'selected' : ''}`} onClick={() => setProfileField('class_level', opt)}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label>Stream</label>
          <div className="toggle-group">
            {streamOptions.map(opt => (
              <button key={opt} className={`chip ${profile.stream === opt ? 'selected' : ''}`} onClick={() => setProfileField('stream', opt)}>{opt}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="city">City</label>
          <input id="city" type="text" placeholder="e.g. Pune, Jaipur, Kota..." value={profile.city} onChange={e => setProfileField('city', e.target.value)} />
        </div>
      </div>

      <style jsx>{`
        .step-content { max-width: 640px; }
        .field-grid { display: flex; flex-direction: column; gap: 24px; }
        .field { display: flex; flex-direction: column; }
        .toggle-group { display: flex; flex-wrap: wrap; gap: 8px; }
        .field-error { color: var(--danger); font-size: 12px; margin-top: 4px; }
      `}</style>
    </div>
  );
}
