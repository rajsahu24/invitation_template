import React from 'react';
import { motion } from 'framer-motion';
// Common path variants for "drawing" effect
const drawVariants = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.5,
        ease: 'easeInOut'
      },
      opacity: {
        duration: 0.5
      }
    }
  }
};
interface DoodleProps {
  className?: string;
  color?: string;
  delay?: number;
}
export function StarDoodle({
  className = '',
  color = '#FFB3D9',
  delay = 0
}: DoodleProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`w-12 h-12 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true
      }}>

      <motion.path
        d="M50 5 L63 35 L95 38 L70 60 L78 90 L50 75 L22 90 L30 60 L5 38 L37 35 Z"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        // variants={drawVariants}
        transition={{
          delay
        }} />

    </motion.svg>);

}
export function HeartDoodle({
  className = '',
  color = '#FFB3D9',
  delay = 0
}: DoodleProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`w-12 h-12 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true
      }}>

      <motion.path
        d="M50 30 C 40 10, 10 20, 10 50 C 10 70, 50 90, 50 90 C 50 90, 90 70, 90 50 C 90 20, 60 10, 50 30 Z"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        // variants={drawVariants}
        transition={{
          delay
        }} />

    </motion.svg>);

}
export function SwirlDoodle({
  className = '',
  color = '#C5B4E3',
  delay = 0
}: DoodleProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`w-16 h-16 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true
      }}>

      <motion.path
        d="M50 50 m-40 0 a 40 40 0 1 0 80 0 a 40 40 0 1 0 -80 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0 a 20 20 0 1 0 40 0"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        // variants={drawVariants}
        transition={{
          delay
        }} />

    </motion.svg>);

}
export function SquiggleLine({
  className = '',
  color = '#B4E7CE',
  delay = 0
}: DoodleProps) {
  return (
    <motion.svg
      viewBox="0 0 200 20"
      className={`w-full h-4 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true
      }}>

      <motion.path
        d="M5 10 Q 25 0, 45 10 T 85 10 T 125 10 T 165 10 T 195 10"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        // variants={drawVariants}
        transition={{
          delay
        }} />

    </motion.svg>);

}
export function BurstDoodle({
  className = '',
  color = '#FFD4B3',
  delay = 0
}: DoodleProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={`w-16 h-16 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true
      }}>

      <motion.g
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        // variants={drawVariants}
        transition={{
          delay
        }}>

        <path d="M50 20 L50 5" />
        <path d="M50 80 L50 95" />
        <path d="M20 50 L5 50" />
        <path d="M80 50 L95 50" />
        <path d="M28 28 L15 15" />
        <path d="M72 72 L85 85" />
        <path d="M28 72 L15 85" />
        <path d="M72 28 L85 15" />
      </motion.g>
    </motion.svg>);

}