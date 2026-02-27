import { EventsSection } from "./components/EventsSection";
import { HeroSection } from "./components/HeroSection";
import { PhotoGallery } from "./components/PhotoGallery";
import { RSVPSection } from "./components/RSVPSection";

import "./index.css";
import  RSVPForm  from "../template-1/components/RSVPform";

function MarriageContent() {
  const getInvitationIdFromUrl = (): string | null => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[1] || null;
  };
  const param = getInvitationIdFromUrl()

  const isRSVPToken = (param: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return param.length === 10 && !uuidRegex.test(param);
  };
  
  const isRSVp = param ? isRSVPToken(param) : false;

  return (
    <div className=""> 
      <div id="hero_section">
        <HeroSection />
      </div>
      <div id="event_section">
        <EventsSection />
      </div>
      <div id="image_section">
        <PhotoGallery />
      </div>
      {isRSVp?<div id="rsvp_section"><RSVPSection /></div>:<div id="rsvp_section"><RSVPForm /></div> }
      <footer className="bg-royal-deepPurple text-royal-gold/50 py-8 text-center font-cinzel text-xs tracking-widest">
        <p>&copy; Inviteera. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default function MarriageTemplate1() {
  return (
    <MarriageContent />
  );
}
