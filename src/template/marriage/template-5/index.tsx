import { EventsSection } from "./components/EventsSection";
import { HeroSection } from "./components/HeroSection";
import { PhotoGallery } from "./components/PhotoGallery";
import { RSVPSection } from "./components/RSVPSection";
import { Countdown } from "./components/Countdown";
import { DressCode } from "./components/DressCode";
import { PreEvent } from "./components/PreEvent";
import { Location } from "./components/Location";
import { Accommodation } from "./components/Accommodation";
import { Gifts } from "./components/Gifts";
import { Footer } from "./components/Footer";
import { IntroVideo } from "./components/IntroVideo";
import { Venue } from "./components/Venue";
import { MusicPlayer } from "./components/MusicPlayer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./index.css";
// import  RSVPForm  from "../template-1/components/RSVPform";
import BottomImages from "./components/BottomImages";

function MarriageContent() {
  const [introComplete, setIntroComplete] = useState(false);

  // const getInvitationIdFromUrl = (): string | null => {
  //   const pathParts = window.location.pathname.split("/");
  //   return pathParts[1] || null;
  // };
  // const param = getInvitationIdFromUrl();

  // const isRSVPToken = (param: string): boolean => {
  //   const uuidRegex =
  //     /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  //   return param.length === 10 && !uuidRegex.test(param);
  // };

  // const isRSVp = param ? isRSVPToken(param) : false;

  return (
    <div className="">
      <MusicPlayer />
      <IntroVideo onComplete={() => setIntroComplete(true)} />
      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="template"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div id="hero_section">
              <HeroSection />
            </div>
            <div id="Countdown_section">
              <Countdown />
            </div>
            <div id="image_section">
              <PhotoGallery />
            </div>
            <div style={{ backgroundColor: "#F5F0E8" }} className="h-full bg-">
              <img
                className="h-1/2 px-32 py-16"
                src="https://res.cloudinary.com/dwbed0m72/image/upload/v1773663110/floral-vase-6x28LN74_y7sukd.png"
                alt="app"
              />
            </div>
            <div id="venue_section">
              <Venue />
            </div>

            <div id="event_section">
              <EventsSection />
            </div>
            <div style={{ backgroundColor: "#f9f6f1" }} className="h-full bg-">
              <img
                className="h-1/2 px-32 py-16"
                src="https://res.cloudinary.com/dwbed0m72/image/upload/v1773663110/champagne-tower-Or6MBjHQ_rbzz2o.png"
                alt="app"
              />
            </div>

            <div id="dress_code_section">
              <DressCode />
            </div>
            <div style={{ backgroundColor: "#f9f6f1" }} className="h-full bg-">
              <img
                className="h-1/2 px-32 py-16"
                src="https://res.cloudinary.com/dwbed0m72/image/upload/v1773663107/bow-illustration-DWFdIPv5_uxbfdw.png"
                alt="app"
              />
            </div>

            <div id="pre_event_section">
              <PreEvent />
            </div>
            <div style={{ backgroundColor: "#f9f6f1" }} className="h-full bg-">
              <img
                className="h-1/2 px-32 py-16"
                src="https://res.cloudinary.com/dwbed0m72/image/upload/v1773663106/cupid-illustration-BO3_EWaD_qqt2ix.png"
                alt="app"
              />
            </div>
            <div id="location_section">
              <Location />
            </div>
            <div style={{ backgroundColor: "#f9f6f1" }} className="h-full bg-">
              <img
                className="h-1/2 px-36 py-16"
                src="https://res.cloudinary.com/dwbed0m72/image/upload/v1773663106/matchbox-illustration-Cje_YC4u_ua6r7w.png"
                alt="app"
              />
            </div>
            <div id="accommodation_section">
              <Accommodation />
            </div>
            <div style={{ backgroundColor: "#f9f6f1" }} className="h-full bg-">
              <img
                className="h-1/2 px-32 py-16"
                src="https://res.cloudinary.com/dwbed0m72/image/upload/v1773663106/locket-illustration-B7vFK6H-_faqshd.png"
                alt="app"
              />
            </div>
            <div id="gifts_section">
              <Gifts />
            </div>

            <div style={{ backgroundColor: "#f9f6f1" }} className="h-full bg-">
              <img
                className="h-1/2 px-32 py-16"
                src="https://res.cloudinary.com/dwbed0m72/image/upload/v1773663106/swans-framed-ByH4RE7t_dsxx4r.png"
                alt="app"
              />
            </div>
            <div>
              <BottomImages />
            </div>

            <div id="rsvp_section">
              <RSVPSection />
            </div>
                  <div style={{ backgroundColor: '#f9f6f1' }} className="h-full bg-">
        <img className="h-1/2 px-32 py-16" src="https://res.cloudinary.com/dwbed0m72/image/upload/v1773663105/wedding-rings-_6IG5mf0_xqawow.png" alt="app" />
      </div>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MarriageTemplate1() {
  return <MarriageContent />;
}
