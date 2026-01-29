import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock } from 'lucide-react';
import { usePreview } from '../../../../context/PreviewContext';

function RSVPform() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


    const { previewData } = usePreview();
    const guest_status = (previewData as any).guest || previewData;
    
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
          message: "Thank you for letting us know. We're sorry you can't make it, but we'll celebrate in spirit!",
          icon: X,
          iconBg: "bg-red-100",
          iconColor: "text-red-600"
        };
      default:
        return {
          title: "Thank You!",
          message: "Your response has been recorded.",
          icon: Check,
          iconBg: "bg-royal-gold",
          iconColor: "text-royal-deepPurple"
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
      label: 'Accept',
      icon: Check,
      color: 'bg-green-600 hover:bg-green-700',
      textColor: 'text-green-600',
      borderColor: 'border-green-600'
    },
    {
      id: 3,
      label: 'Maybe',
      icon: Clock,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-600'
    },
    {
      id: 4,
      label: 'Decline',
      icon: X,
      color: 'bg-red-600 hover:bg-red-700',
      textColor: 'text-red-600',
      borderColor: 'border-red-600'
    }
  ];

  if (isSubmitted || guest_status.status == 2 || guest_status.status == 3 || guest_status.status == 4) {
    const content = getStatusContent(currentStatus);
    const StatusIcon = content.icon;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-20 p-8 border border-royal-gold rounded-lg bg-white shadow-xl max-w-lg mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className={`w-16 h-16 mx-auto mb-4 ${content.iconBg} rounded-full flex items-center justify-center`}
        >
          <StatusIcon className={`w-8 h-8 ${content.iconColor}`} />
        </motion.div>
        <h4 className="font-playfair text-2xl mb-4 text-royal-deepPurple">{content.title}</h4>
        <p className="font-cormorant text-lg text-royal-purple">
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
      className="mb-20 p-8 border border-royal-gold rounded-lg bg-white shadow-xl max-w-lg mx-auto"
    >
      <div className="text-center mb-6">
        <h4 className="font-playfair text-2xl mb-4 text-royal-deepPurple">RSVP</h4>
        <p className="font-cormorant text-lg text-royal-purple">
          We request the honor of your presence. Please let us know if you'll be joining us.
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
              <span className={`font-cinzel text-lg tracking-wide ${option.textColor} font-semibold`}>
                {isSubmitting ? 'Submitting...' : option.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-sm text-royal-purple/70 font-cormorant mt-6"
      >
        Please respond by the date mentioned in the invitation
      </motion.p>
    </motion.div>
  );
}

export default RSVPform;