import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { FaFileAlt, FaFileDownload } from "react-icons/fa";
import { Link } from 'react-router-dom'

function Resume() {
  return (
    <div>
      <Typography variant='h3' sx={{ textAlign: 'center', my: 6, px: 2 }}>
        Create ATS Friendly Resumes in Minutes With AI
      </Typography>

      <Box sx={{ mb: 10 }}>
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={4} 
          sx={{ justifyContent: 'center', alignItems: 'center', mx: 'auto', mb: 6 }}
        >
          {/* Step 1 Card */}
          <Paper elevation={12} sx={{ width: 350, p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Box sx={{ fontSize: '60px', color: 'blue', display: 'flex', justifyContent: 'center', mb: 2 }}>
              <FaFileAlt />
            </Box>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              Add Your Details
            </Typography>
            <Typography variant='body1' color="text.secondary" sx={{ my: 2 }}>
              Our AI will generate Skills & Summary
            </Typography>
            <Typography variant='h6' sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Step 1
            </Typography>
          </Paper>

          {/* Step 2 Card */}
          <Paper elevation={12} sx={{ width: 350, p: 4, borderRadius: 3, textAlign: 'center' }}>
            <Box sx={{ fontSize: '60px', color: 'green', display: 'flex', justifyContent: 'center', mb: 2 }}>
              <FaFileDownload />
            </Box>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              Download your Resume
            </Typography>
            <Typography variant='body1' color="text.secondary" sx={{ my: 2 }}>
              Download CV as PDF and start applying
            </Typography>
            <Typography variant='h6' sx={{ color: 'success.main', fontWeight: 'bold' }}>
              Step 2
            </Typography>
          </Paper>
        </Stack>

        {/* Action Button */}
        <Stack direction="row" sx={{ justifyContent: "center", alignItems: "center" }}>
          <Button 
            component={Link} 
            to='/resume-details' 
            variant="contained" 
            sx={{ 
              backgroundColor: 'black', 
              color: 'wheat', 
              px: 6, 
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': { backgroundColor: '#333' }
            }}
          >
            Let's Start
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default Resume