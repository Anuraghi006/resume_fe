import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import jobRoles from '../JobRoles.json';
import jobSkills from '../jobSkills.json';
import summaries from '../summaries.json';
import { addResumeAPI } from '../../Services/apiServices';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import View from '../Pages/View';

const steps = ['Basic Info', 'Contact Details', 'Educational Details', 'Review & Submit'];

function ResumeInputs({resumeDetails,setResumeDetails}) {
  console.log(resumeDetails)
  // const [age, setAge] = React.useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = React.useCallback((step) => {
    return step === 1;
  }, []);

  const navigate= useNavigate()


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  // Step form renderer
  const renderFormContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Personal Info</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <TextField label="Full Name" variant="outlined" fullWidth onChange={e=>setResumeDetails({...resumeDetails,fullName:e.target.value})} value={resumeDetails.fullName} />
              <TextField label="Location" variant="outlined" fullWidth 
               onChange={e=>setResumeDetails({...resumeDetails,location:e.target.value})} value={resumeDetails.location}
              />
              {/* <TextField label="Job Title" variant="outlined" fullWidth /> */}
              <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Job Title</InputLabel>
        <Select
        defaultValue={''}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Age"
onChange={e=>setResumeDetails({...resumeDetails,jobTitle:e.target.value})} 
>{
   jobRoles.jobRoles.map(item=>(
    <MenuItem value={item} key={item}>{item}</MenuItem>
   ))
  }      
        </Select>
      </FormControl>
            </Stack>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Contact Info</Typography>
            <Stack spacing={2} sx={{ maxWidth: 600 }}>
              <TextField label="Email" variant="outlined" fullWidth onChange={e=>setResumeDetails({...resumeDetails,email:e.target.value})} value={resumeDetails.email}/>
              <TextField label="Phone Number" variant="outlined" fullWidth onChange={e=>setResumeDetails({...resumeDetails,contactNumber:e.target.value})} value={resumeDetails.contactNumber}/>
              <TextField label="GitHub Profile" variant="outlined" fullWidth onChange={e=>setResumeDetails({...resumeDetails,github:e.target.value})} value={resumeDetails.github}/>
              <TextField label="LinkedIn Profile" variant="outlined" fullWidth onChange={e=>setResumeDetails({...resumeDetails,linkedin:e.target.value})} value={resumeDetails.linkedin}/>
            </Stack>
          </Box>
        ); break
      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Educational Info</Typography>
            <Stack spacing={2} sx={{ maxWidth: 600 }}>
              <TextField label="Degree" variant="outlined" fullWidth onChange={e=>setResumeDetails({...resumeDetails,degree:e.target.value})} value={resumeDetails.degree}/>
              <TextField label="University / College" variant="outlined" fullWidth onChange={e=>setResumeDetails({...resumeDetails,college:e.target.value})} value={resumeDetails.college}/>
              <TextField label="Graduation Year" variant="outlined" fullWidth onChange={e=>setResumeDetails({...resumeDetails,year:e.target.value})} value={resumeDetails.year}/>
            </Stack>
          </Box>
        ); break
      case 3:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Summary & Review</Typography>
            <Typography variant="body1">Review your details before submitting your resume.</Typography>
          </Box>
        ); break
      default: return null;
      break
    }
  };
// skill generation
  const handleSkillsAndSummary=async()=>{
          
    setResumeDetails({...resumeDetails,skills:jobSkills[resumeDetails.jobTitle],summary:summaries[resumeDetails.jobTitle]})
    handleNext()
  }

  const handleSubmit=async()=>{   
    const {fullName,location,jobTitle,email,contactNumber,linkedin,github,degree,college,year,skills,summary}=resumeDetails
    if(fullName==""|| location==""|| jobTitle==""|| email==""||contactNumber==""||linkedin==""||github==""||degree==""||college==""|| year==""|| skills==""||summary=="" ){
        Swal.fire({
  title: "warning",
  text: "pleasse fill the form",
  icon: "warning"
});
    }
    
    // API  call
    else{
    try{
    const res=await addResumeAPI(resumeDetails)
    console.log(res);
    if(res.status==201){
               Swal.fire({
  title: "Good Job",
  text: "Resume Submitted",
  icon: "success"
});
    }

 const resumeID=res.data.id
 setTimeout(()=>{
 navigate(`/resume/${resumeID}`)
 },2000)
    }
    
    catch(err){
      console.log(err);
       Swal.fire({
  title: "Good Job",
  text: "Error",
  icon: "error"
});  
    }
  }
}
  return (
    <Box sx={{ width: '100%', p: 4 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 4, mb: 2, textAlign: 'center' }} variant="h6">
            All steps completed - your resume draft is ready!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant="contained" onClick= {handleSubmit}>
              Finish
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {renderFormContent(activeStep)}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <div>
              {activeStep === steps.length - 1 ?
              <Button variant='contained' onClick={handleSkillsAndSummary}>Generate Skills And Summary</Button>
              :
              <Button variant='contained'   onClick={handleNext}>Next</Button>}
            </div>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default ResumeInputs;