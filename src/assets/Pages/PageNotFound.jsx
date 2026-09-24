import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import { TbError404 } from "react-icons/tb";
function PageNotFound() {
  return (
    <Box
      sx={{
        backgroundColor: '#FFD700', // Yellow background
        color: '#000000',           // Black text
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
        py: 4
      }}
    >
      <Stack spacing={3} alignItems="center" maxWidth="600px">
        {/* Provided Image */}
        <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
    height: 'auto',
    maxHeight: '350px',
  }}
>
  <TbError404 size={150} /> {/* Adjust number for size */}
</Box>

        {/* 404 Heading */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>
          Oops! Page Not Found
        </Typography>

        {/* Description */}
        <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '1.1rem' }}>
          The page you are looking for doesn't exist or has been moved.
        </Typography>

        {/* Home Link Button */}
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            backgroundColor: '#000000',
            color: '#FFD700',
            fontWeight: 'bold',
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#222222',
              color: '#FFD700'
            }
          }}
        >
          Back To Home
        </Button>
      </Stack>
    </Box>
  );
}

export default PageNotFound;