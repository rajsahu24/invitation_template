import  { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
interface FormData {
  name: string;
  phone: string;
  guests: string;
  message: string;
}
export function RSVPForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    guests: '',
    message: ''
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert(
      `🎉 Dhanyavaad ${formData.name}! Aapka RSVP mil gaya!\n\nWe're excited to have you${formData.guests ? ` and ${formData.guests} guest(s)` : ''}!\n\nSee you on March 14th! 🌈`
    );
    setFormData({
      name: '',
      phone: '',
      guests: '',
      message: ''
    });
  };
  const inputClasses =
  'w-full bg-dark border-4 border-gold text-gold placeholder-gold/50 font-body text-lg p-4 rounded-lg focus:outline-none focus:border-marigold focus:ring-2 focus:ring-marigold/50 transition-all';
  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-10"
          initial={{
            y: 30,
            opacity: 0
          }}
          animate={
          isInView ?
          {
            y: 0,
            opacity: 1
          } :
          {}
          }
          transition={{
            duration: 0.5
          }}>

          <h2 className="font-heading font-bold text-3xl md:text-5xl text-gold mb-4">
            📝 RSVP Karo, Jaldi!
          </h2>
          <p className="font-body text-cream/80 text-lg">(RSVP Now, Hurry!)</p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 bg-royal-purple/30 p-6 md:p-10 rounded-xl border-4 border-gold/50"
          initial={{
            scale: 0.9,
            opacity: 0
          }}
          animate={
          isInView ?
          {
            scale: 1,
            opacity: 1
          } :
          {}
          }
          transition={{
            duration: 0.5,
            delay: 0.2
          }}>

          {/* Name Field */}
          <motion.div
            initial={{
              x: -30,
              opacity: 0
            }}
            animate={
            isInView ?
            {
              x: 0,
              opacity: 1
            } :
            {}
            }
            transition={{
              delay: 0.3
            }}>

            <label
              htmlFor="name"
              className="block font-heading font-bold text-gold mb-2 text-lg">

              Aapka Naam *
            </label>
            <input
              type="text"
              id="name"
              required
              placeholder="Your Name"
              className={inputClasses}
              value={formData.name}
              onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
              } />

          </motion.div>

          {/* Phone Field */}
          <motion.div
            initial={{
              x: -30,
              opacity: 0
            }}
            animate={
            isInView ?
            {
              x: 0,
              opacity: 1
            } :
            {}
            }
            transition={{
              delay: 0.4
            }}>

            <label
              htmlFor="phone"
              className="block font-heading font-bold text-gold mb-2 text-lg">

              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              required
              placeholder="+91 98765 43210"
              className={inputClasses}
              value={formData.phone}
              onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value
              })
              } />

          </motion.div>

          {/* Guests Field */}
          <motion.div
            initial={{
              x: -30,
              opacity: 0
            }}
            animate={
            isInView ?
            {
              x: 0,
              opacity: 1
            } :
            {}
            }
            transition={{
              delay: 0.5
            }}>

            <label
              htmlFor="guests"
              className="block font-heading font-bold text-gold mb-2 text-lg">

              Kitne Log? (Number of Guests)
            </label>
            <input
              type="number"
              id="guests"
              min="0"
              max="10"
              placeholder="0"
              className={inputClasses}
              value={formData.guests}
              onChange={(e) =>
              setFormData({
                ...formData,
                guests: e.target.value
              })
              } />

          </motion.div>

          {/* Message Field */}
          <motion.div
            initial={{
              x: -30,
              opacity: 0
            }}
            animate={
            isInView ?
            {
              x: 0,
              opacity: 1
            } :
            {}
            }
            transition={{
              delay: 0.6
            }}>

            <label
              htmlFor="message"
              className="block font-heading font-bold text-gold mb-2 text-lg">

              Kuch Kehna Hai? (Any Message?)
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder="Special requests, dietary needs, or just say hi!"
              className={`${inputClasses} resize-none`}
              value={formData.message}
              onChange={(e) =>
              setFormData({
                ...formData,
                message: e.target.value
              })
              } />

          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{
              y: 20,
              opacity: 0
            }}
            animate={
            isInView ?
            {
              y: 0,
              opacity: 1
            } :
            {}
            }
            transition={{
              delay: 0.7
            }}>

            <motion.button
              type="submit"
              className="w-full bg-gold text-dark font-heading font-bold text-xl md:text-2xl py-5 px-8 rounded-lg border-4 border-marigold glow-gold"
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}>

              🎉 Haan, Main Aa Raha/Rahi Hoon!
            </motion.button>
            <p className="text-center font-body text-cream/60 text-sm mt-3">
              (Yes, I'm Coming!)
            </p>
          </motion.div>
        </motion.form>

        {/* Alternative */}
        <motion.p
          className="text-center mt-6 font-body text-cream/50 text-sm"
          initial={{
            opacity: 0
          }}
          animate={
          isInView ?
          {
            opacity: 1
          } :
          {}
          }
          transition={{
            delay: 0.9
          }}>

          Ya phir WhatsApp karo: +91 98765 43210 📱
        </motion.p>
      </div>
    </section>);

}