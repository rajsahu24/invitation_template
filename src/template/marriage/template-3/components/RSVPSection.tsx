import  { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionDivider, CornerDecoration } from './ui/OrnateDecorations';
export function RSVPSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    guests: '1',
    attending: 'yes',
    message: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission logic here
    alert('Thank you for your RSVP!');
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
          <p className="text-gray-600 mt-4">
            Kindly respond by November 1st, 2024
          </p>
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
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full border-b-2 border-gray-200 focus:border-[#8B0000] outline-none py-2 bg-transparent transition-colors"
                  placeholder="Enter your email"
                  value={formState.email}
                  onChange={(e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value
                  })
                  } />

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-gray-500">
                  Number of Guests
                </label>
                <select
                  className="w-full border-b-2 border-gray-200 focus:border-[#8B0000] outline-none py-2 bg-transparent transition-colors"
                  value={formState.guests}
                  onChange={(e) =>
                  setFormState({
                    ...formState,
                    guests: e.target.value
                  })
                  }>

                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-gray-500">
                  Will you attend?
                </label>
                <select
                  className="w-full border-b-2 border-gray-200 focus:border-[#8B0000] outline-none py-2 bg-transparent transition-colors"
                  value={formState.attending}
                  onChange={(e) =>
                  setFormState({
                    ...formState,
                    attending: e.target.value
                  })
                  }>

                  <option value="yes">Joyfully Accept</option>
                  <option value="no">Regretfully Decline</option>
                </select>
              </div>
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
                className="bg-[#8B0000] text-white px-12 py-3 rounded-sm uppercase tracking-widest hover:bg-[#A52A2A] transition-colors duration-300 shadow-lg">

                Send RSVP
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>);

}