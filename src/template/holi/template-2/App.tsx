
import { HeroSection } from './components/HeroSection';
import { HostDetails } from './components/HostDetails';
import { EventDetails } from './components/EventDetails';
import { Highlights } from './components/Highlights';
import { GallerySection } from './components/GallerySection';
import { CountdownTimer } from './components/CountdownTimer';
import { DressCode } from './components/DressCode';
import { RSVPForm } from './components/RSVPForm';
import { FooterSection } from './components/FooterSection';
export function App() {
  return (
    <div className="min-h-screen w-full bg-animated-gradient font-sans text-white overflow-x-hidden selection:bg-white/30 selection:text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24 sm:space-y-32">
        <HeroSection />
        <HostDetails />
        <EventDetails />
        <Highlights />
        <GallerySection />
        <CountdownTimer />
        <DressCode />
        <RSVPForm />
        <FooterSection />
      </main>
    </div>);

}