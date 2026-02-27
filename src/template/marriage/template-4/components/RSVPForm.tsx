import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BotanicalLeaf } from './BotanicalLeaf';
import {
  CheckIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  UsersIcon,
  UtensilsIcon,
  MessageSquareIcon } from
'lucide-react';
interface FormData {
  name: string;
  email: string;
  phone: string;
  guests: string;
  events: {
    engagement: boolean;
    mehendi: boolean;
    sangeet: boolean;
    wedding: boolean;
    reception: boolean;
  };
  dietary: string;
  message: string;
}
const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  guests: '1',
  events: {
    engagement: false,
    mehendi: false,
    sangeet: false,
    wedding: true,
    reception: true
  },
  dietary: '',
  message: ''
};
const eventLabels = {
  engagement: 'Engagement Ceremony',
  mehendi: 'Mehendi Celebration',
  sangeet: 'Sangeet Night',
  wedding: 'Wedding Ceremony',
  reception: 'Reception Dinner'
};
function LeafToggle({
  checked,
  onChange,
  label




}: {checked: boolean;onChange: () => void;label: string;}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 w-full text-left
        ${checked ? 'bg-sage border-forest-light shadow-md' : 'bg-white border-sage hover:border-sage-dark'}`}>

      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
        ${checked ? 'bg-forest' : 'bg-sage-dark/30'}`}>

        {checked ?
        <BotanicalLeaf
          variant="small"
          animate={false}
          className="w-4 h-4 text-white" /> :


        <div className="w-2 h-2 rounded-full bg-sage-dark/50" />
        }
      </div>
      <span
        className={`font-medium transition-colors ${checked ? 'text-forest' : 'text-forest-light'}`}>

        {label}
      </span>
    </button>);

}
export function RSVPForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '-100px'
  });
  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      newErrors.email = 'Please enter email or phone';
    } else if (
    formData.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
    {
      newErrors.email = 'Please enter a valid email';
    }
    if (!Object.values(formData.events).some(Boolean)) {
      newErrors.events = 'Please select at least one event' as any;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };
  const handleEventToggle = (event: keyof FormData['events']) => {
    setFormData((prev) => ({
      ...prev,
      events: {
        ...prev.events,
        [event]: !prev.events[event]
      }
    }));
  };
  if (isSubmitted) {
    return (
      <section
        className="py-24 px-6 bg-sage relative overflow-hidden"
        id="rsvp">

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            className="bg-cream rounded-3xl p-12 text-center shadow-xl">

            <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                delay: 0.2,
                type: 'spring'
              }}
              className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mx-auto mb-6">

              <CheckIcon className="w-10 h-10 text-white" />
            </motion.div>

            <h3 className="font-serif text-3xl text-forest mb-4">
              Thank You, {formData.name}!
            </h3>
            <p className="text-forest-light mb-6">
              We're thrilled that you'll be joining us to celebrate our special
              day. We've received your RSVP and will send you more details soon.
            </p>

            <div className="flex items-center justify-center gap-2 text-rose">
              <span className="text-2xl">♥</span>
              <span className="font-serif italic">See you in Udaipur!</span>
              <span className="text-2xl">♥</span>
            </div>
          </motion.div>
        </div>
      </section>);

  }
  return (
    <section className="py-24 px-6 bg-sage relative overflow-hidden" id="rsvp">
      {/* Background decorations */}
      <motion.div
        className="absolute top-20 left-5 text-forest-light opacity-15"
        animate={{
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity
        }}>

        <BotanicalLeaf variant="branch" animate={false} className="w-28 h-36" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-5 text-forest-light opacity-15"
        animate={{
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity
        }}>

        <BotanicalLeaf
          variant="branch"
          animate={false}
          className="w-24 h-32 rotate-180" />

      </motion.div>

      <div className="max-w-2xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={
          isInView ?
          {
            opacity: 1,
            y: 0
          } :
          {
            opacity: 0,
            y: 30
          }
          }
          transition={{
            duration: 0.8
          }}
          className="text-center mb-12">

          <h2 className="font-serif text-4xl md:text-5xl text-forest mb-4">
            RSVP
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-rose" />
            <BotanicalLeaf
              variant="small"
              animate={false}
              className="w-6 h-6 text-forest-light" />

            <div className="h-px w-12 bg-rose" />
          </div>
          <p className="mt-6 text-forest-light">
            We would be honored to have you celebrate with us
          </p>
        </motion.div>

        <motion.form
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={
          isInView ?
          {
            opacity: 1,
            y: 0
          } :
          {
            opacity: 0,
            y: 40
          }
          }
          transition={{
            duration: 0.8,
            delay: 0.2
          }}
          onSubmit={handleSubmit}
          className="bg-cream rounded-3xl p-8 md:p-10 shadow-xl">

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-forest font-medium mb-2">
                <UserIcon className="w-4 h-4" />
                Your Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
                }
                className={`w-full px-4 py-3 rounded-xl border-2 bg-white transition-colors
                  focus:outline-none focus:border-forest
                  ${errors.name ? 'border-rose-dark' : 'border-sage'}`}
                placeholder="Enter your full name" />

              {errors.name &&
              <p className="text-rose-dark text-sm mt-1">{errors.name}</p>
              }
            </div>

            {/* Email & Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-forest font-medium mb-2">
                  <MailIcon className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value
                  }))
                  }
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white transition-colors
                    focus:outline-none focus:border-forest
                    ${errors.email ? 'border-rose-dark' : 'border-sage'}`}
                  placeholder="your@email.com" />

                {errors.email &&
                <p className="text-rose-dark text-sm mt-1">{errors.email}</p>
                }
              </div>

              <div>
                <label className="flex items-center gap-2 text-forest font-medium mb-2">
                  <PhoneIcon className="w-4 h-4" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    phone: e.target.value
                  }))
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-sage bg-white transition-colors
                    focus:outline-none focus:border-forest"

                  placeholder="+91 98765 43210" />

              </div>
            </div>

            {/* Number of Guests */}
            <div>
              <label className="flex items-center gap-2 text-forest font-medium mb-2">
                <UsersIcon className="w-4 h-4" />
                Number of Guests
              </label>
              <select
                value={formData.guests}
                onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  guests: e.target.value
                }))
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-sage bg-white transition-colors
                  focus:outline-none focus:border-forest appearance-none cursor-pointer">


                {[1, 2, 3, 4, 5].map((num) =>
                <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                )}
              </select>
            </div>

            {/* Events */}
            <div>
              <label className="flex items-center gap-2 text-forest font-medium mb-3">
                <BotanicalLeaf
                  variant="small"
                  animate={false}
                  className="w-4 h-4" />

                Events Attending
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {(
                Object.keys(eventLabels) as Array<keyof typeof eventLabels>).
                map((event) =>
                <LeafToggle
                  key={event}
                  checked={formData.events[event]}
                  onChange={() => handleEventToggle(event)}
                  label={eventLabels[event]} />

                )}
              </div>
            </div>

            {/* Dietary Requirements */}
            <div>
              <label className="flex items-center gap-2 text-forest font-medium mb-2">
                <UtensilsIcon className="w-4 h-4" />
                Dietary Requirements
              </label>
              <input
                type="text"
                value={formData.dietary}
                onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dietary: e.target.value
                }))
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-sage bg-white transition-colors
                  focus:outline-none focus:border-forest"

                placeholder="Vegetarian, vegan, allergies, etc." />

            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 text-forest font-medium mb-2">
                <MessageSquareIcon className="w-4 h-4" />
                Message for the Couple
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  message: e.target.value
                }))
                }
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-sage bg-white transition-colors
                  focus:outline-none focus:border-forest resize-none"

                placeholder="Share your wishes or any special requests..." />

            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              className="w-full py-4 bg-rose text-white font-semibold rounded-full shadow-lg 
                         shadow-rose/30 hover:bg-rose-dark hover:shadow-xl hover:shadow-rose-dark/30 
                         transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2">




              {isSubmitting ?
              <>
                  <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />

                  Sending...
                </> :

              'Send RSVP'
              }
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>);

}