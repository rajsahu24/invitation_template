import React from 'react';
import { motion } from 'framer-motion';

interface GenericLoaderProps {
  theme?: 'birthday' | 'wedding' | 'default';
  message?: string;
}

const themes = {
  birthday: {
    colors: ['#FFB3D9', '#C5B4E3', '#B4E7CE', '#FFD4B3'],
    bg: '#FFF8F0',
    icon: '🎉',
    defaultMessage: 'Preparing your birthday invitation...asdfasdasdf'
  },
  wedding: {
    colors: ['#E8D5C4', '#F4E4BC', '#C9A96E', '#A67B5B'],
    bg: '#FAF7F2',
    icon: '💕',
    defaultMessage: 'Preparing your wedding invitation...'
  },
  default: {
    colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'],
    bg: '#F8FAFC',
    icon: '✨',
    defaultMessage: 'Loading your invitation...asdfasdf'
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
        <div className="relative w-32 h-32">
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
                inset: `${index * 8}px`,
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
              className="text-4xl"
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
          <h2 className="text-3xl font-[Caveat] font-bold mb-2" style={{ color: currentTheme.colors[0] }}>
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
