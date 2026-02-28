import React, { useState } from 'react';
import { motion } from 'framer-motion';
export function RSVPForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    dietary: 'No Preference',
    message: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>

  {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        amount: 0.2
      }}
      transition={{
        duration: 0.7,
        ease: 'easeOut'
      }}
      className="w-full max-w-2xl mx-auto">

      <div className="glass-panel-dark p-8 sm:p-12">
        <div className="text-center mb-10">
          <h2 className="font-heading text-4xl font-bold text-white mb-3">
            RSVP
          </h2>
          <p className="text-white/80 text-lg">Let us know you're coming!</p>
        </div>

        {isSubmitted ?
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="text-center py-12">

            <div className="text-6xl mb-6">🎉</div>
            <h3 className="font-heading text-3xl font-bold text-white mb-4">
              Can't wait to see you!
            </h3>
            <p className="text-white/80 text-lg">
              Your RSVP has been confirmed. Get ready for a colorful day!
            </p>
          </motion.div> :

        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
              htmlFor="name"
              className="block text-sm font-medium text-white/90 ml-1">

                Full Name
              </label>
              <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="glass-input"
              placeholder="John Doe" />

            </div>

            <div className="space-y-2">
              <label
              htmlFor="email"
              className="block text-sm font-medium text-white/90 ml-1">

                Email Address
              </label>
              <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="glass-input"
              placeholder="john@example.com" />

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                htmlFor="guests"
                className="block text-sm font-medium text-white/90 ml-1">

                  Number of Guests
                </label>
                <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="glass-input appearance-none [&>option]:text-black">

                  {[1, 2, 3, 4, 5].map((num) =>
                <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                )}
                </select>
              </div>

              <div className="space-y-2">
                <label
                htmlFor="dietary"
                className="block text-sm font-medium text-white/90 ml-1">

                  Dietary Preferences
                </label>
                <select
                id="dietary"
                name="dietary"
                value={formData.dietary}
                onChange={handleChange}
                className="glass-input appearance-none [&>option]:text-black">

                  <option value="No Preference">No Preference</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label
              htmlFor="message"
              className="block text-sm font-medium text-white/90 ml-1">

                Message for the Hosts (Optional)
              </label>
              <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="glass-input resize-none"
              placeholder="Can't wait!" />

            </div>

            <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            type="submit"
            className="w-full py-4 px-6 rounded-xl font-bold text-white text-lg bg-gradient-to-r from-holi-magenta to-holi-violet shadow-lg hover:shadow-[0_0_20px_rgba(255,0,110,0.5)] transition-shadow duration-300 border border-white/20 mt-4">

              Confirm RSVP
            </motion.button>
          </form>
        }
      </div>
    </motion.section>);

}