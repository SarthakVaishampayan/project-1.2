import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const LoadingScreen = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(10, 10, 15, 0.95)',
      zIndex: 9999,
      backdropFilter: 'blur(10px)',
    }}
  >
    <Box sx={{ position: 'relative' }}>
      {/* Outer Circle */}
      <CircularProgress
        size={120}
        thickness={2}
        sx={{
          color: '#7c4dff',
          animation: 'pulse 1.5s ease-in-out infinite',
          '@keyframes pulse': {
            '0%': {
              opacity: 0.6,
              transform: 'scale(0.8)',
            },
            '50%': {
              opacity: 1,
              transform: 'scale(1.2)',
            },
            '100%': {
              opacity: 0.6,
              transform: 'scale(0.8)',
            },
          },
        }}
      />
      {/* Middle Circle */}
      <CircularProgress
        size={80}
        thickness={2}
        sx={{
          color: '#ff4081',
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: '-40px',
          marginTop: '-40px',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.4s',
        }}
      />
      {/* Inner Circle */}
      <CircularProgress
        size={40}
        thickness={3}
        sx={{
          color: '#00bcd4',
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: '-20px',
          marginTop: '-20px',
          animation: 'pulse 1.5s ease-in-out infinite',
          animationDelay: '0.8s',
        }}
      />
      {/* Center Icon */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <SportsEsportsIcon
          sx={{
            fontSize: 24,
            color: 'white',
            animation: 'float 2s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': {
                transform: 'translateY(0) scale(1) rotate(0deg)',
              },
              '50%': {
                transform: 'translateY(-10px) scale(1.1) rotate(180deg)',
              },
            },
          }}
        />
      </Box>
      {/* Loading Text */}
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          top: '140px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          opacity: 0.8,
          animation: 'glow 2s ease-in-out infinite',
          '@keyframes glow': {
            '0%, 100%': {
              textShadow: '0 0 5px rgba(124, 77, 255, 0.5)',
              opacity: 0.8,
            },
            '50%': {
              textShadow: '0 0 20px rgba(124, 77, 255, 0.8)',
              opacity: 1,
            },
          },
        }}
      >
        Loading
      </Typography>
      {/* Particle Effects */}
      {[...Array(12)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: index % 3 === 0 ? '#7c4dff' : index % 3 === 1 ? '#ff4081' : '#00bcd4',
            animation: `particle${index} 2s ease-in-out infinite`,
            '@keyframes particle0': {
              '0%': { transform: 'rotate(0deg) translateX(60px)' },
              '100%': { transform: 'rotate(360deg) translateX(60px)' },
            },
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </Box>
  </Box>
);

export default LoadingScreen; 