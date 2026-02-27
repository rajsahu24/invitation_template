import React from 'react';
import { motion } from 'framer-motion';
interface BotanicalLeafProps {
  className?: string;
  variant?: 'single' | 'branch' | 'vine' | 'small';
  animate?: boolean;
  delay?: number;
}
export function BotanicalLeaf({
  className = '',
  variant = 'single',
  animate = true,
  delay = 0
}: BotanicalLeafProps) {
  const variants = {
    single:
    <svg
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>

        <path
        d="M20 5C20 5 8 15 8 35C8 45 12 55 20 55C28 55 32 45 32 35C32 15 20 5 20 5Z"
        fill="currentColor"
        fillOpacity="0.3" />

        <path
        d="M20 10V50M20 20C16 22 14 26 14 30M20 30C24 32 26 36 26 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round" />

      </svg>,

    branch:
    <svg
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>

        <path
        d="M40 95V20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round" />

        <path
        d="M40 30C40 30 30 25 25 15C25 15 35 20 40 30Z"
        fill="currentColor"
        fillOpacity="0.4" />

        <path
        d="M40 30C40 30 50 25 55 15C55 15 45 20 40 30Z"
        fill="currentColor"
        fillOpacity="0.4" />

        <path
        d="M40 50C40 50 28 45 22 32C22 32 33 40 40 50Z"
        fill="currentColor"
        fillOpacity="0.4" />

        <path
        d="M40 50C40 50 52 45 58 32C58 32 47 40 40 50Z"
        fill="currentColor"
        fillOpacity="0.4" />

        <path
        d="M40 70C40 70 26 65 18 50C18 50 30 60 40 70Z"
        fill="currentColor"
        fillOpacity="0.4" />

        <path
        d="M40 70C40 70 54 65 62 50C62 50 50 60 40 70Z"
        fill="currentColor"
        fillOpacity="0.4" />

      </svg>,

    vine:
    <svg
      viewBox="0 0 30 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>

        <path
        d="M15 0C15 0 10 20 15 40C20 60 10 80 15 100C20 120 15 120 15 120"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none" />

        <circle cx="15" cy="20" r="4" fill="currentColor" fillOpacity="0.5" />
        <circle cx="15" cy="50" r="4" fill="currentColor" fillOpacity="0.5" />
        <circle cx="15" cy="80" r="4" fill="currentColor" fillOpacity="0.5" />
      </svg>,

    small:
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>

        <path
        d="M12 3C12 3 6 8 6 15C6 19 8 21 12 21C16 21 18 19 18 15C18 8 12 3 12 3Z"
        fill="currentColor"
        fillOpacity="0.4" />

        <path
        d="M12 6V18M12 10C10 11 9 13 9 15M12 14C14 15 15 17 15 18"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round" />

      </svg>

  };
  if (animate) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.8,
          delay
        }}>

        {variants[variant]}
      </motion.div>);

  }
  return variants[variant];
}
export function FloatingLeaf({
  className = '',
  style = {},
  delay = 0




}: {className?: string;style?: React.CSSProperties;delay?: number;}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={style}
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        y: [20, 0, -10, -20]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatDelay: 2
      }}>

      <BotanicalLeaf
        variant="small"
        animate={false}
        className="w-6 h-6 text-forest-light" />

    </motion.div>);

}