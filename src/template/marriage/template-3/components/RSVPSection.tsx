import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionDivider, CornerDecoration } from './ui/OrnateDecorations';
// import { usePreview } from '../../../../context/PreviewContext';
// import type { InvitationData } from '../../../../hooks/getTemplateDataModel';
export function RSVPSection() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    invitation_id: '',
    status: '2',
    message: ''
  });
    // const { previewData } = usePreview() as { previewData: InvitationData };
    // const eventSection = previewData?.event_section;
    // const events = eventSection?.data || [];
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
          invitation_id: formState.invitation_id,
          status: formState.status,
        }),
      });

      if (response.ok) {
        alert('Thank you for your RSVP!');
        setFormState({
          name: '',
          phone: '',
          email: '',
          invitation_id: '',
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
    <section className="py-24 bg-[#FFFAF0] relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8
          }}
          className="text-center mb-12">

          <h2 className="text-4xl md:text-5xl font-serif-display text-[#8B0000] mb-4">
            RSVP
          </h2>
          <SectionDivider />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.8,
            delay: 0.2
          }}
          className="bg-white p-8 md:p-12 shadow-2xl rounded-lg relative border border-[#D4AF37]/20">

          <CornerDecoration className="top-0 left-0 w-12 h-12 text-[#D4AF37]" />
          <CornerDecoration
            className="top-0 right-0 w-12 h-12 text-[#D4AF37]"
            rotate={90} />

          <CornerDecoration
            className="bottom-0 right-0 w-12 h-12 text-[#D4AF37]"
            rotate={180} />

          <CornerDecoration
            className="bottom-0 left-0 w-12 h-12 text-[#D4AF37]"
            rotate={270} />


          <form
            onSubmit={handleSubmit}
            className="space-y-6 relative z-10 mt-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-gray-500">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full border-b-2 border-gray-200 focus:border-[#8B0000] outline-none py-2 bg-transparent transition-colors"
                  placeholder="Enter your name"
                  value={formState.name}
                  onChange={(e) =>
                  setFormState({
                    ...formState,
                    name: e.target.value
                  })
                  } />

              </div>
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-gray-500">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  className="w-full border-b-2 border-gray-200 focus:border-[#8B0000] outline-none py-2 bg-transparent transition-colors"
                  placeholder="Enter your phone"
                  value={formState.phone}
                  onChange={(e) =>
                  setFormState({
                    ...formState,
                    phone: e.target.value
                  })
                  } />

              </div>
            </div>



            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-gray-500">
                Will you attend?
              </label>
              <select
                className="w-full border-b-2 border-gray-200 focus:border-[#8B0000] outline-none py-2 bg-transparent transition-colors"
                value={formState.status}
                onChange={(e) =>
                setFormState({
                  ...formState,
                  status: e.target.value
                })
                }>

                <option value="2">Joyfully Accept</option>
                <option value="3">May be</option>
                <option value="4">Regretfully Decline</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm uppercase tracking-widest text-gray-500">
                Message (Optional)
              </label>
              <textarea
                rows={3}
                className="w-full border-b-2 border-gray-200 focus:border-[#8B0000] outline-none py-2 bg-transparent transition-colors resize-none"
                placeholder="Leave a message for the couple"
                value={formState.message}
                onChange={(e) =>
                setFormState({
                  ...formState,
                  message: e.target.value
                })
                } />

            </div>

            <div className="pt-6 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#8B0000] text-white px-12 py-3 rounded-sm uppercase tracking-widest hover:bg-[#A52A2A] transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">

                {isSubmitting ? 'Sending...' : 'Send RSVP'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>);

}