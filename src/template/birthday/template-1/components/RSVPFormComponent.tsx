import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

export function RSVPFormComponent() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    status: '2',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { previewData } = usePreview();
  const guest_status = (previewData as any).guest || {};

  const getRSVPTokenFromUrl = (): string | null => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[4] || null;
  };

  const currentStatus = guest_status.status;

  const getStatusContent = (status: number) => {
    switch (status) {
      case 2:
        return {
          title: "Yay! 🎉",
          message: "We're so excited to celebrate with you!",
          icon: Check,
          iconBg: "bg-[#B4E7CE]",
          iconColor: "text-teal-800"
        };
      case 3:
        return {
          title: "Got It! ⏰",
          message: "Let us know if your plans change!",
          icon: Clock,
          iconBg: "bg-[#FFD4B3]",
          iconColor: "text-orange-800"
        };
      case 4:
        return {
          title: "We'll Miss You! 💔",
          message: "Thanks for letting us know. We'll celebrate in spirit!",
          icon: X,
          iconBg: "bg-[#FFB3D9]",
          iconColor: "text-pink-900"
        };
      default:
        return {
          title: "Thank You! 🎈",
          message: "Your response has been recorded.",
          icon: Check,
          iconBg: "bg-[#C5B4E3]",
          iconColor: "text-purple-800"
        };
    }
  };

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rsvpToken = getRSVPTokenFromUrl();
    if (!rsvpToken) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitations/guest_rsvp/${rsvpToken}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          phone: formState.phone,
          email: formState.email,
          status: parseInt(formState.status),
          message: formState.message
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert('Failed to submit RSVP. Please try again.');
      }
    } catch (error) {
      console.error('RSVP submission failed:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  if (isSubmitted || (guest_status.status !== 1 && guest_status.status !== undefined)) {
    const content = getStatusContent(currentStatus);
    const StatusIcon = content.icon;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-12 px-6 bg-white/60 backdrop-blur-sm shadow-lg rounded-2xl max-w-lg mx-auto border-2 border-[#D4A574]/30"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`w-16 h-16 ${content.iconBg} rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#D4A574]`}
        >
          <StatusIcon className={`w-8 h-8 ${content.iconColor}`} />
        </motion.div>
        <h3 className="text-4xl font-[Caveat] text-[#D4A574] mb-2 text-center">{content.title}</h3>
        <p className="text-stone-600 text-xl font-[Caveat] text-center">
          {content.message}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="max-w-lg mx-auto py-12"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-[Caveat] text-[#D4A574] mb-2">Will you be there?</h2>
        <p className="text-stone-600 font-[Caveat] text-xl">
          Please fill in your details!
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white/60 backdrop-blur-sm p-6 md:p-8 shadow-lg rounded-2xl border-2 border-[#FFB3D9]/30"
      >
        <form onSubmit={handleRSVPSubmit} className="space-y-4">
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
              <option value="3">Maybe ⏰</option>
              <option value="4">Sorry, can't make it 💔</option>
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
    </motion.div>
  );
}
