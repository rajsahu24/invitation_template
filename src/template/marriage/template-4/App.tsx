// import React from 'react';
import { Hero } from './components/Hero';
// import { CoupleIntro } from './components/CoupleIntro';
// import { Countdown } from './components/Countdown';
import { Timeline } from './components/Timeline';
import { Gallery } from './components/Gallery';
import { RSVPForm } from './components/RSVPForm';
import { Footer } from './components/Footer';
export function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Hero />
      {/* <CoupleIntro /> */}
      {/* <Countdown /> */}
      <Timeline />
      <Gallery />
      <RSVPForm />
      <Footer />
    </div>);

}