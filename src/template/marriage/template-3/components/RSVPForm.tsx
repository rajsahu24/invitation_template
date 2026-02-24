import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

export function RSVPForm() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { previewData } = usePreview();
  const guest_status = (previewData as any).guest || {};

  const getRSVPTokenFromUrl = (): string | null => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[4] || null;
  };

  const currentStatus = selectedOption || guest_status.status;

  const getStatusContent = (status: number) => {
    switch (status) {
      case 2:
        return {
          title: "Thank You!",
          message: "Your RSVP has been recorded. We look forward to celebrating with you!",
          icon: Check,
          iconBg: "bg-green-100",
          iconColor: "text-green-600"
        };
      case 3:
        return {
          title: "Got It!",
          message: "We've noted that you might attend. Please let us know if your plans change!",
          icon: Clock,
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600"
        };
      case 4:
        return {
          title: "We'll Miss You!",
          message: "Thank you for letting us know. We're sorry you can't make it!",
          icon: X,
          iconBg: "bg-red-100",
          iconColor: "text-red-600"
        };
      default:
        return {
          title: "Thank You!",
          message: "Your response has been recorded.",
          icon: Check,
          iconBg: "bg-[#D4AF37]",
          iconColor: "text-[#8B0000]"
        };
    }
  };

  const handleRSVPSubmit = async (status: number) => {
    const rsvpToken = getRSVPTokenFromUrl();
    if (!rsvpToken) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitations/guest_rsvp/${rsvpToken}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        setSelectedOption(status);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('RSVP submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const rsvpOptions = [
    {
      id: 2,
      label: 'Joyfully Accept',
      icon: Check,
      textColor: 'text-green-600',
      borderColor: 'border-green-600'
    },
    {
      id: 3,
      label: 'Maybe',
      icon: Clock,
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-600'
    },
    {
      id: 4,
      label: 'Regretfully Decline',
      icon: X,
      textColor: 'text-red-600',
      borderColor: 'border-red-600'
    }
  ];

  if (isSubmitted || (guest_status.status !== 1 && guest_status.status !== undefined)) {
    const content = getStatusContent(currentStatus);
    const StatusIcon = content.icon;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-16 px-6 bg-white shadow-2xl rounded-lg max-w-lg mx-auto border border-[#D4AF37]/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`w-16 h-16 ${content.iconBg} rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#D4AF37]`}
        >
          <StatusIcon className={`w-8 h-8 ${content.iconColor}`} />
        </motion.div>
        <h3 className="text-3xl font-serif-display text-[#8B0000] mb-2 text-center">{content.title}</h3>
        <p className="text-gray-600 text-lg text-center">
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
      className="max-w-lg mx-auto space-y-8 py-16"
    >
      <div className="text-center mb-10">
        <h2 className="text-4xl font-serif-display text-[#8B0000] mb-2">RSVP</h2>
        <p className="text-gray-600 italic">
          Please respond by the date mentioned in the invitation
        </p>
      </div>

      <div className="space-y-4">
        {rsvpOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRSVPSubmit(option.id)}
              disabled={isSubmitting}
              className={`w-full p-4 border-2 ${option.borderColor} rounded-lg transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-50`}
            >
              <Icon className={`w-5 h-5 ${option.textColor}`} />
              <span className={`text-lg tracking-wide ${option.textColor} font-semibold uppercase`}>
                {isSubmitting ? 'Submitting...' : option.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
