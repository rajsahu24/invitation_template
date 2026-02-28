import  { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePreview } from '../../../../context/PreviewContext';
import type { InvitationData } from '../../../../hooks/getTemplateDataModel';

interface FormData {
  name: string;
  phone: string;
  email: string;
  status: string;
  message: string;
}

export function RSVPForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px'
  });
  const { previewData } = usePreview() as { previewData: InvitationData };
  const invitation_id = previewData?.invitation_id;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    status: '2',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          invitation_id: invitation_id,
          status: formData.status,
        }),
      });

      if (response.ok) {
        alert(`🎉 Dhanyavaad ${formData.name}! Aapka RSVP mil gaya!\n\nSee you at the celebration! 🌈`);
        setFormData({
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

          {/* Email Field */}
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
              htmlFor="email"
              className="block font-heading font-bold text-gold mb-2 text-lg">

              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className={inputClasses}
              value={formData.email}
              onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
              } />

          </motion.div>

          {/* Status Field */}
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
              htmlFor="status"
              className="block font-heading font-bold text-gold mb-2 text-lg">

              Aa Rahe Ho? (Will you attend?) *
            </label>
            <select
              id="status"
              required
              className={inputClasses}
              value={formData.status}
              onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value
              })
              }>

              <option value="2">🎉 Haan, Zaroor! (Yes, Definitely!)</option>
              <option value="3">🤔 Shayad (Maybe)</option>
              <option value="4">😔 Nahi Aa Paunga (Can't Make It)</option>
            </select>
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
              delay: 0.7
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
              disabled={isSubmitting}
              className="w-full bg-gold text-dark font-heading font-bold text-xl md:text-2xl py-5 px-8 rounded-lg border-4 border-marigold glow-gold disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}>

              send
            </motion.button>
            {/* <p className="text-center font-body text-cream/60 text-sm mt-3">
              (Yes, I'm Coming!)
            </p> */}
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

    
        </motion.p>
      </div>
    </section>);

}