import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Clock, Shirt, Gift, Check, X } from 'lucide-react';
import { ConfettiAnimation } from './components/ConfettiAnimation';
import {
  BalloonCluster } from
'./components/IllustratedBalloons';
import {
  StarDoodle,
  HeartDoodle,
  SwirlDoodle,
  SquiggleLine,
  BurstDoodle } from
'./components/DoodleElements';
import { PolaroidFrame } from './components/PolaroidFrame';
import { MusicPlayer } from './components/MusicPlayer';
import { usePreview } from '../../../context/PreviewContext';

export default function App() {
  
  const { previewData } = usePreview();

  const [rsvpState, setRsvpState] = useState<'idle' | 'yes' | 'no'>('idle');
  // Handle both RSVP and regular/real-time invitation data structures
  const invitation = (previewData as any).invitation || previewData;
  const events = (previewData as any).events || [];
  const images = (previewData as any).images || [];
  const guest = (previewData as any).guest || {};
  const metadata = invitation?.metadata || {};
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper functions for RSVP
  const getRSVPTokenFromUrl = (): string | null => {
    const pathParts = window.location.pathname.split('/');
    // Check both potential positions (preview vs rsvp routes)
    return pathParts[3] || pathParts[4] || null;
  };

  const isRSVPToken = (param: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return param.length === 10 && !uuidRegex.test(param);
  };

  const rsvpToken = getRSVPTokenFromUrl();
  const showRSVP = rsvpToken && isRSVPToken(rsvpToken);

  const handleRSVPSubmit = async (status: 'yes' | 'no') => {
    if (!rsvpToken) return;
    
    setIsSubmitting(true);
    try {
      const statusCode = status === 'yes' ? 2 : 4;
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/invitations/rsvp/${rsvpToken}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: statusCode })
      });

      if (response.ok) {
        setRsvpState(status);
      }
    } catch (error) {
      console.error('RSVP submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sync rsvpState with guest status if available
  React.useEffect(() => {
    if (guest.status === 2) setRsvpState('yes');
    else if (guest.status === 4) setRsvpState('no');
  }, [guest.status]);

  const name = metadata.birthday_person_name || invitation?.invitation_title?.split("'")[0] || "Sarah";
  const age = metadata.age || "30th";
  const message = invitation.invitation_tag_line || "Join us to celebrate a very special day";
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen w-full bg-paper-texture bg-watercolor-wash overflow-x-hidden relative">
      <ConfettiAnimation />
      <MusicPlayer />

      {/* Floating Balloons Background */}
      <BalloonCluster />

      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <div id="hero_section">
          <section className="text-center mb-20 relative">
            <motion.div
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.8
              }}
              className="relative inline-block">

              <BurstDoodle
                className="absolute -top-12 -left-12 w-24 h-24 text-[#FFB3D9]"
                delay={0.5} />

              <BurstDoodle
                className="absolute -bottom-8 -right-8 w-20 h-20 text-[#B4E7CE]"
                delay={0.8} />


              <h1 className="text-7xl md:text-9xl font-bold text-[#D4A574] mb-4 transform -rotate-2">
                You're
                <br />
                <span className="text-[#FFB3D9]">Invited!</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.5,
                duration: 0.8
              }}
              className="mt-8">

              <p className="text-2xl md:text-3xl font-[Caveat] text-stone-600">
                {message}
              </p>
              <SquiggleLine
                className="w-48 mx-auto mt-4 text-[#C5B4E3]"
                delay={1} />

            </motion.div>
          </section>

          {/* Birthday Person Details */}
          <section className="text-center mb-24 relative">
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0
              }}
              whileInView={{
                scale: 1,
                opacity: 1
              }}
              viewport={{
                once: true
              }}
              className="bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-sm border-2 border-[#FFF8F0] inline-block max-w-xl w-full relative">

              <StarDoodle
                className="absolute -top-6 -right-6 text-[#FFD4B3]"
                delay={0.2} />

              <HeartDoodle
                className="absolute -bottom-6 -left-6 text-[#FFB3D9]"
                delay={0.4} />


              <h2 className="text-5xl md:text-6xl font-[Caveat] text-stone-700 mb-2">
                {name}'s
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <SwirlDoodle className="w-8 h-8 text-[#B4E7CE]" />
                <span className="text-8xl font-bold text-[#FFB3D9] font-[Caveat]">
                  {age}
                </span>
                <SwirlDoodle className="w-8 h-8 text-[#B4E7CE] transform scale-x-[-1]" />
              </div>
              <h2 className="text-5xl md:text-6xl font-[Caveat] text-stone-700">
                Birthday Bash
              </h2>
            </motion.div>
          </section>
        </div>

        {/* Polaroid Gallery */}
        <div id="image_section">
          <section className="mb-24">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {images && images.length > 0 ? (
                images.map((image: any, index: number) => (
                  <PolaroidFrame
                    key={image.id || index}
                    caption={image.type === 'cover' ? "Cover Photo" : `Memory ${index + 1}`}
                    rotation={index % 2 === 0 ? -6 : 4}
                    delay={0.2 * (index + 1)}
                    className="w-64"
                  >
                    <img
                      src={image.image_url}
                      alt={image.type || "Birthday photo"}
                      className="w-full h-full object-cover"
                    />
                  </PolaroidFrame>
                ))
              ) : (
                <>
                  <PolaroidFrame
                    caption={`Little ${name}, 1994`}
                    rotation={-6}
                    delay={0.2}
                    className="w-64">

                    <div className="w-full h-full bg-[#FFD4B3]/30 flex items-center justify-center">
                      <Gift className="w-12 h-12 text-[#D4A574] opacity-50" />
                    </div>
                  </PolaroidFrame>

                  <PolaroidFrame
                    caption="Sweet 16!"
                    rotation={4}
                    delay={0.4}
                    className="w-64">

                    <div className="w-full h-full bg-[#C5B4E3]/30 flex items-center justify-center">
                      <StarDoodle className="w-12 h-12 text-[#C5B4E3] opacity-50" />
                    </div>
                  </PolaroidFrame>

                  <PolaroidFrame
                    caption="Dirty Thirty"
                    rotation={-3}
                    delay={0.6}
                    className="w-64 md:hidden lg:block">

                    <div className="w-full h-full bg-[#B4E7CE]/30 flex items-center justify-center">
                      <HeartDoodle className="w-12 h-12 text-[#B4E7CE] opacity-50" />
                    </div>
                  </PolaroidFrame>
                </>
              )}
            </div>
          </section>
        </div>

        {/* Event Details Grid */}
        <div id="event_section">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {events && events.length > 0 ? (
              events.map((event: any, index: number) => (
                <React.Fragment key={event.id}>
                  <DetailCard
                    icon={<Calendar className="w-8 h-8 text-[#FFB3D9]" />}
                    title="When"
                    content={formatDate(event.start_time)}
                    subContent={new Date(event.start_time).getFullYear().toString()}
                    delay={index * 0.1}
                  />
                  <DetailCard
                    icon={<Clock className="w-8 h-8 text-[#C5B4E3]" />}
                    title="Time"
                    content={`${formatTime(event.start_time)} ${event.end_time ? `- ${formatTime(event.end_time)}` : ''}`}
                    subContent={event.name}
                    delay={index * 0.1 + 0.1}
                  />
                  <DetailCard
                    icon={<MapPin className="w-8 h-8 text-[#B4E7CE]" />}
                    title="Where"
                    content={event.event_location || "TBA"}
                    subContent={event.description || ""}
                    delay={index * 0.1 + 0.2}
                  />
                </React.Fragment>
              ))
            ) : (
              <>
                <DetailCard
                  icon={<Calendar className="w-8 h-8 text-[#FFB3D9]" />}
                  title="When"
                  content="Saturday, July 15th"
                  subContent="2023"
                  delay={0.1} />

                <DetailCard
                  icon={<Clock className="w-8 h-8 text-[#C5B4E3]" />}
                  title="Time"
                  content="4:00 PM - Late"
                  subContent="Sunset drinks & dancing"
                  delay={0.2} />

                <DetailCard
                  icon={<MapPin className="w-8 h-8 text-[#B4E7CE]" />}
                  title="Where"
                  content="The Garden House"
                  subContent="123 Blossom Lane, Springville"
                  delay={0.3} />
              </>
            )}

            {metadata.dress_code && (
              <DetailCard
                icon={<Shirt className="w-8 h-8 text-[#FFD4B3]" />}
                title="Dress Code"
                content={metadata.dress_code}
                subContent="Come as you are!"
                delay={0.4} />
            )}
          </section>
        </div>

        {/* RSVP Section */}
        {showRSVP && (
          <div id="rsvp_section">
            <section className="text-center pb-20">
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
                className="bg-[#FFF8F0] p-8 md:p-12 rounded-3xl shadow-lg border-2 border-dashed border-[#D4A574] relative overflow-hidden">

                <h3 className="text-4xl font-[Caveat] mb-8 text-stone-700">
                  Will you be there?
                </h3>

                <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
                  <RsvpButton
                    label={rsvpState === 'yes' ? "I'm coming!" : "Yes, can't wait!"}
                    icon={<Check className="w-5 h-5" />}
                    isActive={rsvpState === 'yes'}
                    onClick={() => handleRSVPSubmit('yes')}
                    disabled={isSubmitting}
                    color="bg-[#B4E7CE] text-teal-800 hover:bg-[#9ADBC0] disabled:opacity-50" />

                  <RsvpButton
                    label={rsvpState === 'no' ? "I can't make it" : "Sorry, can't make it"}
                    icon={<X className="w-5 h-5" />}
                    isActive={rsvpState === 'no'}
                    onClick={() => handleRSVPSubmit('no')}
                    disabled={isSubmitting}
                    color="bg-[#FFB3D9] text-pink-900 hover:bg-[#FFA0CD] disabled:opacity-50" />

                </div>

                <AnimatePresence>
                  {rsvpState === 'yes' &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8
                    }}
                    className="mt-8">

                      <p className="text-2xl font-[Caveat] text-[#D4A574]">
                        Yay! We're so excited to see you! 🎉
                      </p>
                      <BurstDoodle className="absolute top-10 left-10 w-16 h-16 text-[#FFB3D9] opacity-50" />
                      <BurstDoodle className="absolute bottom-10 right-10 w-16 h-16 text-[#B4E7CE] opacity-50" />
                    </motion.div>
                  }
                  {rsvpState === 'no' &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8
                    }}
                    className="mt-8">

                      <p className="text-2xl font-[Caveat] text-stone-500">
                        We'll miss you! But thanks for letting us know. ❤️
                      </p>
                    </motion.div>
                  }
                </AnimatePresence>
              </motion.div>
            </section>
          </div>
        )}
      </main>
    </div>);

}

function DetailCard({ icon, title, content, subContent, delay }: any) {
  return (
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
        delay
      }}
      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-[#FFF8F0] flex items-start gap-4 hover:shadow-md transition-shadow">

      <div className="p-3 bg-[#FFF8F0] rounded-full">{icon}</div>
      <div>
        <h4 className="text-xl font-[Caveat] text-stone-500 mb-1">{title}</h4>
        <p className="text-lg font-bold text-stone-800">{content}</p>
        <p className="text-sm text-stone-500">{subContent}</p>
      </div>
    </motion.div>);

}

function RsvpButton({ label, icon, isActive, onClick, color, disabled }: any) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        scale: 1.05
      }}
      whileTap={{
        scale: 0.95
      }}
      className={`
        flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-lg shadow-sm transition-all
        ${isActive ? 'ring-4 ring-offset-2 ring-[#D4A574]' : ''}
        ${color}
      `}>

      {icon}
      {label}
    </motion.button>);

}