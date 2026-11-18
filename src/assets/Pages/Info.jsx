import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ResumeInputs from '../Components/ResumeInputs';
import Preview from '../Components/Preview';

function Info() {
  const [resumeDetails, setResumeDetails] = React.useState({
    fullName: '',
    jobTitle: '',
    location: '',
    email: '',
    contactNumber: '',
    linkedin: '',
    github: '',
    portfolio: '',
    summary: '',
    skillCategories: {
      frontend: '',
      apis: '',
      backend: '',
      tools: '',
    },
    skills: [],
    experience: [
      { role: '', company: '', duration: '', location: '', description: '' },
    ],
    projects: [
      { title: '', techStack: '', date: '', link: '', description: '' },
    ],
    certificates: [
      { title: '', link: '', description: '' },
    ],
    languages: '',
    education: [
      { degree: '', college: '', duration: '', location: '', description: '' },
    ],
  });

  return (
    <Stack
      direction={{ xs: 'column', lg: 'row' }}
      spacing={6}
      sx={{ justifyContent: 'space-evenly', alignItems: 'flex-start', mx: { xs: 2, md: 6 }, my: 6 }}
    >
      <Box sx={{ flex: 1, width: '100%' }}>
        <ResumeInputs
          resumeDetails={resumeDetails}
          setResumeDetails={setResumeDetails}
        />
      </Box>
      <Box sx={{ flex: 1, width: '100%' }}>
        {resumeDetails.fullName && <Preview resumeDetails={resumeDetails} />}
      </Box>
    </Stack>
  );
}

export default Info;