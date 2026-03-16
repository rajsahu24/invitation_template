import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';
import type { InvitationData } from '../../../../hooks/getTemplateDataModel';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid #E8E0D5',
  backgroundColor: '#FAF7F3',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '0.95rem',
  color: '#3C2F1E',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: '0.95rem',
  color: '#3C2F1E',
  fontWeight: 600,
  marginBottom: '6px',
  display: 'block',
};

export function RSVPSection() {
  const { previewData } = usePreview() as { previewData: InvitationData };
  const invitation_id = previewData.invitation_id;

  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [children, setChildren] = useState<'yes' | 'no'>('no');
  const [message, setMessage] = useState('');
  const [guests, setGuests] = useState<{ name: string; email: string; dietary: string }[]>([
    { name: '', email: '', dietary: '' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateGuestCount = (count: number) => {
    const clamped = Math.max(1, Math.min(10, count));
    setGuestCount(clamped);
    setGuests(prev => {
      const updated = [...prev];
      while (updated.length < clamped) updated.push({ name: '', email: '', dietary: '' });
      return updated.slice(0, clamped);
    });
  };

  const updateGuest = (index: number, field: string, value: string) => {
    setGuests(prev => prev.map((g, i) => i === index ? { ...g, [field]: value } : g));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/guests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invitation_id,
          status: attending === 'yes' ? 2 : 4,
          name: guests[0]?.name,
          email: guests[0]?.email,
          dietary: guests[0]?.dietary,
          guest_count: guestCount,
          children: children === 'yes',
          message,
        }),
      });
      if (response.ok) setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section style={{ backgroundColor: '#C4A265' }} className="py-14 px-5">
        <div className="max-w-sm mx-auto text-center">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontStyle: 'italic', color: '#fff', fontWeight: 400 }} className="mb-4">RSVP</h2>
          <div className="rounded-2xl px-8 py-12 bg-white text-center">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: '#8B7355', fontStyle: 'italic' }}>
              Thank you! Your response has been recorded. 🎉
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: '#C4A265' }} className="py-14 px-5">
      <div className="max-w-sm mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2
            className="mb-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 6vw, 2.6rem)',
              fontStyle: 'italic',
              color: '#fff',
              fontWeight: 400,
            }}
          >
            RSVP
          </h2>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.75rem', color: '#fff', letterSpacing: '0.1em', fontWeight: 600 }}>
            Let us know if you can make it
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl px-7 py-8 bg-white"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">

            {/* Attending */}
            <div>
              <p style={{ ...labelStyle, marginBottom: '10px' }}>Will you be attending? *</p>
              {[{ val: 'yes', label: "Yes, I'll be there" }, { val: 'no', label: "Unfortunately, I can't make it" }].map(opt => (
                <label key={opt.val} className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="attending"
                    checked={attending === opt.val}
                    onChange={() => setAttending(opt.val as 'yes' | 'no')}
                    style={{ accentColor: '#8B7355', width: '16px', height: '16px' }}
                  />
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: '#3C2F1E' }}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>

            {attending === 'yes' && (
              <>
                {/* Guest count */}
                <div>
                  <p style={{ ...labelStyle, color: '#8B7355', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>👤</span> How many guests?
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    {['-', guestCount.toString(), '+'].map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => i === 0 ? updateGuestCount(guestCount - 1) : i === 2 ? updateGuestCount(guestCount + 1) : null}
                        className="flex items-center justify-center"
                        style={{
                          width: i === 1 ? '40px' : '36px',
                          height: '36px',
                          border: '1px solid #C4A882',
                          borderRadius: '6px',
                          backgroundColor: i === 1 ? '#fff' : '#FAF7F3',
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: '1rem',
                          color: '#3C2F1E',
                          cursor: i === 1 ? 'default' : 'pointer',
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Per-guest fields */}
                {guests.map((guest, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3 p-4 rounded-xl"
                    style={{ backgroundColor: '#FAF7F3', border: '1px solid #E8E0D5' }}
                  >
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.7rem', color: '#8B7355', letterSpacing: '0.08em' }}>
                      Person {index + 1}{index === 0 ? ' (Main contact)' : ''}
                    </p>
                    <input
                      type="text"
                      placeholder="Full name"
                      required
                      value={guest.name}
                      onChange={e => updateGuest(index, 'name', e.target.value)}
                      style={inputStyle}
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={guest.email}
                      onChange={e => updateGuest(index, 'email', e.target.value)}
                      style={inputStyle}
                    />
                    <div>
                      <label style={{ ...labelStyle, fontSize: '0.82rem', color: '#8B7355' }}>Dietary requirements</label>
                      <input
                        type="text"
                        placeholder="e.g. vegetarian, allergies, etc."
                        value={guest.dietary}
                        onChange={e => updateGuest(index, 'dietary', e.target.value)}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                ))}

                {/* Children */}
                <div>
                  <p style={labelStyle}>Will any children be attending?</p>
                  {[{ val: 'yes', label: 'Yes' }, { val: 'no', label: 'No' }].map(opt => (
                    <label key={opt.val} className="flex items-center gap-2 mb-2 cursor-pointer">
                      <input
                        type="radio"
                        name="children"
                        checked={children === opt.val}
                        onChange={() => setChildren(opt.val as 'yes' | 'no')}
                        style={{ accentColor: '#8B7355', width: '16px', height: '16px' }}
                      />
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: '#3C2F1E' }}>
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </>
            )}

            {/* Message */}
            <div>
              <label style={{ ...labelStyle, color: '#8B7355' }}>Message for the couple</label>
              <textarea
                rows={3}
                placeholder="Is there anything you'd like to tell us?"
                value={message}
                onChange={e => setMessage(e.target.value)}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl tracking-widest text-sm transition-opacity"
              style={{
                backgroundColor: '#8B7355',
                color: '#fff',
                fontFamily: "'Cinzel', serif",
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'SENDING...' : 'SEND RSVP'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
