import { Box, Divider, Paper, Typography,Button } from '@mui/material'
import React from 'react'

function Preview({resumeDetails}) {
  console.log(resumeDetails);
  
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Paper elevation={4} sx={{ width: 420, minHeight: 450, borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ p: 2.5, textAlign: 'left', fontFamily: 'serif' }}>
          {/* Header Info */}
          <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', mb: 1, color: 'text.primary' }}>
            {resumeDetails?.fullName}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3, mb: 1.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
              Phone: {resumeDetails?.contactNumber }
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
              Email: {resumeDetails?.email}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
              LinkedIn: {resumeDetails?.linkedin}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
              Github: {resumeDetails?.github}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
              Location: {resumeDetails?.location}
            </Typography>
          </Box>

          {/* Professional Summary */}
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.75rem', mt: 1.5 }}>
            Professional Summary
          </Typography>
          <Divider sx={{ my: 0.5 }} />
          <Typography variant="body2" sx={{ fontSize: '0.65rem', color: 'text.secondary', lineHeight: 1.4, mb: 1.5 }}>
            {resumeDetails?.summary}
          </Typography>

          {/* Technical Skills */}
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.75rem', mt: 1.5 }}>
            Technical Skills
          </Typography>
          <Divider sx={{ my: 0.5 }} />
           <Typography variant="body2" sx={{ fontSize: '0.65rem', color: 'text.secondary', lineHeight: 1.4, mb: 1.5 }}>
            {resumeDetails?.skills.map(item=>(
              <Button key={item}>{item}</Button>
            ))}
          </Typography>


          {/* Education */}
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.75rem', mt: 1.5 }}>
            Education
          </Typography>
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
            <Typography variant="caption" sx={{ fontWeight: '600', fontSize: '0.65rem', color: 'text.primary' }}>
              Degree: {resumeDetails?.degree}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
              University/College Name : {resumeDetails?.college}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
              Year of Graduation : {resumeDetails?.year}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default Preview