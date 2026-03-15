import React from 'react';
import { motion } from 'framer-motion';

// Theme colors based on invitationfrontend project
const colors = {
  bgPrimary: '#F7F5F0',
  bgSectionAlt: '#EDF2EC',
  bgDark: '#1C1C1C',
  accentPrimary: '#4A7C59',
  accentSecondary: '#7BAE7F',
};

interface GenericLoaderProps {
  theme?: 'birthday' | 'wedding' | 'default';
  message?: string;
}

// Elegant Logo Component
const Logo: React.FC = () => (
  <motion.svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {/* Outer circle */}
    <circle
      cx="40"
      cy="40"
      r="38"
      stroke={colors.accentPrimary}
      strokeWidth="2"
      fill="none"
    />
    {/* Inner decorative circle */}
    <circle
      cx="40"
      cy="40"
      r="30"
      stroke={colors.accentSecondary}
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    {/* Decorative leaf/botanical element - left */}
    <motion.path
      d="M25 40 Q20 30 25 20 Q30 30 25 40"
      fill={colors.accentPrimary}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Decorative leaf/botanical element - right */}
    <motion.path
      d="M55 40 Q60 30 55 20 Q50 30 55 40"
      fill={colors.accentPrimary}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    />
    {/* Center decorative element */}
    <motion.circle
      cx="40"
      cy="40"
      r="8"
      fill={colors.accentPrimary}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    {/* Inner glow */}
    <motion.circle
      cx="40"
      cy="40"
      r="4"
      fill={colors.bgPrimary}
      animate={{ scale: [1, 1.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.svg>
);

const themes = {
  birthday: {
    colors: [colors.accentPrimary, colors.accentSecondary, '#8BC34A', '#CDDC39'],
    bg: colors.bgPrimary,
    icon: '🎉',
    defaultMessage: 'Preparing your birthday invitation....'
  },
  wedding: {
    colors: [colors.accentPrimary, colors.accentSecondary, '#6B8E6B', '#8FBC8F'],
    bg: colors.bgPrimary,
    icon: '💕',
    defaultMessage: 'Preparing your wedding invitation...'
  },
  default: {
    colors: [colors.accentPrimary, colors.accentSecondary, '#6B8E6B', '#8FBC8F'],
    bg: colors.bgPrimary,
    icon: '✨',
    defaultMessage: 'Loading your invitation...'
  }
};

export const GenericLoader: React.FC<GenericLoaderProps> = ({ 
  theme = 'default', 
  message 
}) => {
  const currentTheme = themes[theme];
  const displayMessage = message || currentTheme.defaultMessage;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: currentTheme.bg }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl -top-48 -left-48"
        style={{ backgroundColor: `${currentTheme.colors[0]}40` }}
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl -bottom-48 -right-48"
        style={{ backgroundColor: `${currentTheme.colors[2]}40` }}
      />

      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8">
          <Logo />
        </div>

        <div className="relative w-24 h-24">
          {currentTheme.colors.map((color, index) => (
            <motion.div
              key={index}
              animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
              transition={{ 
                duration: 2 + index * 0.5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute border-4 rounded-full"
              style={{
                inset: `${index * 6}px`,
                borderTopColor: index === 0 ? color : 'transparent',
                borderRightColor: index === 1 ? color : 'transparent',
                borderBottomColor: index === 2 ? color : 'transparent',
                borderLeftColor: index === 3 ? color : 'transparent'
              }}
            />
          ))}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl"
            >
              {currentTheme.icon}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <h2 className="text-2xl font-semibold mb-2" style={{ color: colors.bgDark }}>
            {displayMessage}
          </h2>
          <div className="flex gap-1 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: currentTheme.colors[1] }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const LoadingScreen: React.FC = () => (
  <GenericLoader theme="birthday" />
);
