import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ResumeInputs from '../Components/ResumeInputs'
import Preview from '../Components/Preview'

function Info() {
  const [resumeDetails,setResumeDetails]=React.useState({
    fullName:'',
    location:'',
    jobTitle:'',
    email:'',
    contactNumber:'',
    github:'',
    linkedin:'',
    degree:'',
    college:'',
    year:'',
    skills:[],
    summary:''
  })
  return (
    <div>

         <Stack direction='row' spacing={8} sx={{justifyContent:'space-evenly',alignItems:'center',mx:10,my:10}}>
              <Box>
                 <ResumeInputs resumeDetails={resumeDetails}
                      setResumeDetails={setResumeDetails}/>
              </Box>
              <Box>
                {/* the paper should only appear while filling the form */}
                {resumeDetails.fullName&& <Preview  resumeDetails={resumeDetails}/>}
              </Box>
         </Stack>
         
    </div>
  )
}

export default Info
