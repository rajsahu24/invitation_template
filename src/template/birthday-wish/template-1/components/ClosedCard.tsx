
import { Gift } from 'lucide-react';
interface ClosedCardProps {
  onClick: () => void;
  isOpen: boolean;
}
export function ClosedCard({ onClick, isOpen }: ClosedCardProps) {
  return (
    <div
      className={`relative w-64 h-80 sm:w-80 sm:h-96 cursor-pointer perspective-1000 transition-all duration-1000 ease-in-out z-50 ${isOpen ? 'opacity-0 pointer-events-none scale-110' : 'opacity-100 scale-100'}`}
      onClick={onClick}>
      
      {/* 3D Card Container */}
      <div
        className="w-full h-full relative preserve-3d transition-transform duration-1000 ease-in-out"
        style={{
          transformOrigin: 'left center',
          transform: isOpen ? 'rotateY(-140deg)' : 'rotateY(0deg)'
        }}>
        
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center p-6 overflow-hidden">
          {/* Animated Cool Border */}
          <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-emerald-500/30 animate-shimmer -z-10" />
          <div className="absolute inset-[1px] bg-white rounded-2xl -z-10" />

          <div className="text-center space-y-8">
            <div className="relative inline-block">
              <Gift
                className="w-20 h-20 text-cool-indigo animate-bounce"
                strokeWidth={1} />
              
              <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-10 rounded-full animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="font-script text-4xl text-cool-slate tracking-tight">
                For You
              </h2>
              <p className="font-sans text-xs text-cool-indigo uppercase tracking-[0.4em] font-medium opacity-70">
                Tap to Open
              </p>
            </div>
          </div>

          {/* Decorative corners - subtle cool lines */}
          <div className="absolute top-6 left-6 w-3 h-3 border-t border-l border-indigo-200" />
          <div className="absolute top-6 right-6 w-3 h-3 border-t border-r border-indigo-200" />
          <div className="absolute bottom-6 left-6 w-3 h-3 border-b border-l border-indigo-200" />
          <div className="absolute bottom-6 right-6 w-3 h-3 border-b border-r border-indigo-200" />
        </div>

        {/* Back of Card (Inside Cover) */}
        <div
          className="absolute inset-0 backface-hidden bg-navy-900 rounded-2xl shadow-2xl border border-navy-800"
          style={{
            transform: 'rotateY(180deg)'
          }}>
          
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <Gift className="w-32 h-32 text-gold-500" />
          </div>
        </div>
      </div>
    </div>);

}