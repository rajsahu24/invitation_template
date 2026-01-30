
import { motion } from 'framer-motion';
interface BalloonProps {
  color: string;
  size?: number;
  delay?: number;
  duration?: number;
  xOffset?: number;
  className?: string;
}
export function IllustratedBalloon({
  color,
  size = 100,
  delay = 0,
  duration = 4,
  xOffset = 20,
  className = ''
}: BalloonProps) {
  return (
    <motion.div
      className={`absolute z-10 pointer-events-none ${className}`}
      initial={{
        y: 100,
        opacity: 0
      }}
      animate={{
        y: [0, -20, 0],
        x: [0, xOffset, 0],
        rotate: [0, 5, -5, 0],
        opacity: 1
      }}
      transition={{
        y: {
          duration: duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay
        },
        x: {
          duration: duration * 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay
        },
        rotate: {
          duration: duration * 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay
        },
        opacity: {
          duration: 1
        }
      }}>

      <svg
        width={size}
        height={size * 1.4}
        viewBox="0 0 100 140"
        className="overflow-visible">

        {/* String */}
        <motion.path
          d="M50 100 C 50 120, 45 130, 55 140"
          fill="none"
          stroke="#888"
          strokeWidth="1"
          initial={{
            pathLength: 0
          }}
          animate={{
            pathLength: 1
          }}
          transition={{
            duration: 1,
            delay: delay + 0.5
          }} />


        {/* Balloon Body */}
        <path
          d="M50 100 C 10 100, 0 50, 50 0 C 100 50, 90 100, 50 100 Z"
          fill={color}
          stroke={color}
          strokeWidth="2"
          fillOpacity="0.8" />


        {/* Highlight */}
        <path
          d="M30 20 Q 40 10, 50 20"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6" />


        {/* Knot */}
        <path d="M45 100 L55 100 L50 105 Z" fill={color} />
      </svg>
    </motion.div>);

}
export function BalloonCluster() {
  return (
    <>
      <IllustratedBalloon
        color="#FFB3D9"
        size={120}
        className="left-[5%] top-[10%]"
        delay={0}
        duration={5} />

      <IllustratedBalloon
        color="#C5B4E3"
        size={90}
        className="right-[10%] top-[15%]"
        delay={1}
        duration={6}
        xOffset={-15} />

      <IllustratedBalloon
        color="#B4E7CE"
        size={80}
        className="left-[15%] top-[40%]"
        delay={2}
        duration={4.5} />

      <IllustratedBalloon
        color="#FFD4B3"
        size={110}
        className="right-[5%] top-[50%]"
        delay={0.5}
        duration={5.5}
        xOffset={-25} />

    </>);

}