import { HeroSection } from './components/HeroSection';
import { HostDetails } from './components/HostDetails';
import { EventDetails } from './components/EventDetails';
import { Highlights } from './components/Highlights';
import { GallerySection } from './components/GallerySection';
import { CountdownTimer } from './components/CountdownTimer';

import { RSVPForm } from './components/RSVPForm';
import { Footer } from './components/Footer';
function OrnateDivider() {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="flex-1 max-w-32 h-px bg-gradient-to-r from-transparent to-gold/50" />
      <div className="px-4 flex items-center gap-2">
        <span className="text-magenta text-lg">✦</span>
        <span className="text-gold text-2xl">❖</span>
        <span className="text-marigold text-lg">✦</span>
      </div>
      <div className="flex-1 max-w-32 h-px bg-gradient-to-l from-transparent to-gold/50" />
    </div>);

}
export function App() {
  return (
    <div className="min-h-screen w-full mandala-bg font-body text-cream overflow-x-hidden">
      {/* Hero Section */}
      <div id="host_section">
        <HeroSection />
      </div>

      <OrnateDivider />

      {/* Host Details */}
      <div id="hero_section">
        <HostDetails />
      </div>

      <OrnateDivider />

      {/* Event Details */}
      <div id="event_section">
        <EventDetails />
      </div>

      <OrnateDivider />

      {/* Highlights */}
      <div id="event_section">
        <Highlights />
      </div>

      <OrnateDivider />

      {/* Gallery */}
      <div id="image_section">
        <GallerySection />
      </div>

      <OrnateDivider />

      {/* Countdown Timer */}
      <div id="Countdown_section">
        <CountdownTimer />
      </div>

      <OrnateDivider />

      {/* Dress Code */}
      {/* <div id="dress_code_section">
        <DressCode />
      </div> */}

      <OrnateDivider />

      {/* RSVP Form */}
      <div id="rsvp_section">
        <RSVPForm />
      </div>

      {/* Footer */}
      <Footer />
    </div>);

}