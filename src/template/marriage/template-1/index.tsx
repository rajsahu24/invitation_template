import { EventsSection } from "./components/EventsSection";
import { GuestList } from "./components/GuestList";
import { HeroSection } from "./components/HeroSection";
import { PhotoGallery } from "./components/PhotoGallery";
import { PreviewProvider } from "../../../context/PreviewContext";

import "./index.css";
import  RSVPForm  from "../template-1/components/RSVPform";

export default function MarriageTemplate1() {
      const getInvitationIdFromUrl = (): string | null => {
        const pathParts = window.location.pathname.split('/');
        return pathParts[4] || null;
    };
    const param = getInvitationIdFromUrl()

    const isRSVPToken = (param: string): boolean => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return param.length === 10 && !uuidRegex.test(param);
    };
    const isRSVp = param ? isRSVPToken(param) : false;

  return (
    <PreviewProvider>
      <div className=""> 
        <HeroSection />
        <EventsSection />
        <PhotoGallery />
        <GuestList />

        {isRSVp && <RSVPForm />}
        <footer className="bg-royal-deepPurple text-royal-gold/50 py-8 text-center font-cinzel text-xs tracking-widest">
          <p>&copy; 2024 Alexander & Victoria. All Rights Reserved.</p>
        </footer>
      </div>
    </PreviewProvider>
  );
}
