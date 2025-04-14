import React from 'react';
import { Box } from '@mui/material';

const AnimatedPage = ({ children }) => {
  return (
    <Box
      sx={{
        animation: 'fadeIn 0.5s ease-in',
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      {children}
    </Box>
  );
};

export default AnimatedPage; 