import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';
import type { InvitationData } from '../../../../hooks/getTemplateDataModel';

export function RSVPSection() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    status: '2',
    message: ''
  });
  const { previewData } = usePreview() as { previewData: InvitationData };
  const invitation_id = previewData.invitation_id;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          phone: formState.phone,
          email: formState.email,
          invitation_id: invitation_id,
          status: formState.status,
        }),
      });

      if (response.ok) {
        alert('Thank you for your RSVP! 🎉');
        setFormState({
          name: '',
          phone: '',
          email: '',
          status: '2',
          message: ''
        });
      } else {
        alert('Failed to submit RSVP. Please try again.');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl md:text-5xl font-[Caveat] text-[#D4A574] mb-2">
          RSVP
        </h2>
        <p className="font-[Caveat] text-xl text-stone-600">
          Let us know if you can make it!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white/60 backdrop-blur-sm p-6 md:p-8 shadow-lg rounded-2xl border-2 border-[#FFB3D9]/30 max-w-xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-[Caveat] text-lg text-stone-600">
                Full Name
              </label>
              <input
                type="text"
                required
                className="w-full border-b-2 border-[#FFB3D9]/30 focus:border-[#FFB3D9] outline-none py-2 bg-transparent transition-colors font-[Caveat] text-lg"
                placeholder="Your name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-[Caveat] text-lg text-stone-600">
                Phone
              </label>
              <input
                type="tel"
                required
                className="w-full border-b-2 border-[#FFB3D9]/30 focus:border-[#FFB3D9] outline-none py-2 bg-transparent transition-colors font-[Caveat] text-lg"
                placeholder="Your phone"
                value={formState.phone}
                onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-[Caveat] text-lg text-stone-600">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full border-b-2 border-[#FFB3D9]/30 focus:border-[#FFB3D9] outline-none py-2 bg-transparent transition-colors font-[Caveat] text-lg"
              placeholder="Your email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-[Caveat] text-lg text-stone-600">
              Will you attend?
            </label>
            <select
              className="w-full border-b-2 border-[#FFB3D9]/30 focus:border-[#FFB3D9] outline-none py-2 bg-transparent transition-colors font-[Caveat] text-lg"
              value={formState.status}
              onChange={(e) => setFormState({ ...formState, status: e.target.value })}
            >
              <option value="2">Yes, can't wait! 🎉</option>
              <option value="3">Maybe</option>
              <option value="4">Sorry, can't make it</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-[Caveat] text-lg text-stone-600">
              Message (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full border-b-2 border-[#FFB3D9]/30 focus:border-[#FFB3D9] outline-none py-2 bg-transparent transition-colors resize-none font-[Caveat] text-lg"
              placeholder="Leave a birthday wish!"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            />
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FFB3D9] text-pink-900 px-10 py-3 rounded-full font-[Caveat] text-xl font-bold hover:bg-[#FFA0CD] transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send RSVP 🎈'}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
