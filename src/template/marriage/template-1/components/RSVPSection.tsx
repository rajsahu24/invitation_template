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
        alert('Thank you for your RSVP!');
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
    <section className="py-20 bg-gradient-to-b from-royal-cream to-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-royal-deepPurple mb-4">
            RSVP
          </h2>
          <p className="font-cormorant text-lg text-royal-purple">
            Kindly respond by filling the form below
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 md:p-12 shadow-xl rounded-lg border border-royal-gold/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-royal-purple font-cinzel">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full border-b-2 border-gray-200 focus:border-royal-gold outline-none py-2 bg-transparent transition-colors font-cormorant"
                  placeholder="Enter your name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-royal-purple font-cinzel">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full border-b-2 border-gray-200 focus:border-royal-gold outline-none py-2 bg-transparent transition-colors font-cormorant"
                  placeholder="Enter your phone"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-royal-purple font-cinzel">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full border-b-2 border-gray-200 focus:border-royal-gold outline-none py-2 bg-transparent transition-colors font-cormorant"
                placeholder="Enter your email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-royal-purple font-cinzel">
                Will you attend?
              </label>
              <select
                className="w-full border-b-2 border-gray-200 focus:border-royal-gold outline-none py-2 bg-transparent transition-colors font-cormorant"
                value={formState.status}
                onChange={(e) => setFormState({ ...formState, status: e.target.value })}
              >
                <option value="2">Joyfully Accept</option>
                <option value="3">Maybe</option>
                <option value="4">Regretfully Decline</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-royal-purple font-cinzel">
                Message (Optional)
              </label>
              <textarea
                rows={3}
                className="w-full border-b-2 border-gray-200 focus:border-royal-gold outline-none py-2 bg-transparent transition-colors resize-none font-cormorant"
                placeholder="Leave a message for the couple"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              />
            </div>

            <div className="pt-6 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-royal-gold text-white px-12 py-3 rounded-sm uppercase tracking-widest hover:bg-royal-deepPurple transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-cinzel"
              >
                {isSubmitting ? 'Sending...' : 'Send RSVP'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
