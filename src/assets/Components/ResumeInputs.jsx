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
import Divider from '@mui/material/Divider';
import jobRoles from '../JobRoles.json';
import jobSkills from '../jobSkills.json';
import summaries from '../summaries.json';
import { addResumeAPI } from '../../Services/apiServices';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const steps = [
  'Basic Info',
  'Links & Contact',
  'Skills & Summary',
  'Experience & Projects',
  'Education, Certs & Languages',
];

function ResumeInputs({ resumeDetails, setResumeDetails }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const navigate = useNavigate();

  const isStepOptional = React.useCallback((step) => step === 1, []);
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    const newSkipped = new Set(skipped);
    newSkipped.delete(activeStep);
    setActiveStep((prev) => prev + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prev) => prev + 1);
    setSkipped((prev) => new Set(prev).add(activeStep));
  };

  // Generic array-section helpers
  const updateArrayItem = (section, index, field, value) => {
    const updated = [...resumeDetails[section]];
    updated[index] = { ...updated[index], [field]: value };
    setResumeDetails({ ...resumeDetails, [section]: updated });
  };

  const addArrayItem = (section, template) => {
    setResumeDetails({
      ...resumeDetails,
      [section]: [...resumeDetails[section], template],
    });
  };

  const removeArrayItem = (section, index) => {
    if (resumeDetails[section].length <= 1) return;
    setResumeDetails({
      ...resumeDetails,
      [section]: resumeDetails[section].filter((_, i) => i !== index),
    });
  };

  const handleSkillsAndSummary = () => {
    setResumeDetails({
      ...resumeDetails,
      skills: jobSkills[resumeDetails.jobTitle] || resumeDetails.skills,
      summary: resumeDetails.summary || summaries[resumeDetails.jobTitle] || '',
    });
    handleNext();
  };

  const handleSubmit = async () => {
    const { fullName, location, jobTitle, email, contactNumber, summary } = resumeDetails;
    if (!fullName || !location || !jobTitle || !email || !contactNumber || !summary) {
      Swal.fire({
        title: 'Warning',
        text: 'Please fill in all required fields (Name, Location, Job Title, Email, Phone, Summary).',
        icon: 'warning',
      });
      return;
    }

    try {
      const res = await addResumeAPI(resumeDetails);
      if (res.status === 201) {
        Swal.fire({
          title: 'Good Job',
          text: 'Resume Submitted',
          icon: 'success',
        });
        const resumeID = res.data.id;
        setTimeout(() => navigate(`/resume/${resumeID}`), 2000);
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to submit resume',
        icon: 'error',
      });
    }
  };

  const renderFormContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Personal Info</Typography>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                fullWidth
                value={resumeDetails.fullName}
                onChange={(e) => setResumeDetails({ ...resumeDetails, fullName: e.target.value })}
              />
              <TextField
                label="Location (e.g., Palakkad, Kerala)"
                fullWidth
                value={resumeDetails.location}
                onChange={(e) => setResumeDetails({ ...resumeDetails, location: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel id="job-title-select-label">Job Title</InputLabel>
                <Select
                  labelId="job-title-select-label"
                  value={resumeDetails.jobTitle || ''}
                  label="Job Title"
                  onChange={(e) => setResumeDetails({ ...resumeDetails, jobTitle: e.target.value })}
                >
                  {jobRoles.jobRoles.map((item) => (
                    <MenuItem value={item} key={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Contact &amp; Links</Typography>
            <Stack spacing={2}>
              <TextField
                label="Email"
                fullWidth
                value={resumeDetails.email}
                onChange={(e) => setResumeDetails({ ...resumeDetails, email: e.target.value })}
              />
              <TextField
                label="Phone Number"
                fullWidth
                value={resumeDetails.contactNumber}
                onChange={(e) => setResumeDetails({ ...resumeDetails, contactNumber: e.target.value })}
              />
              <TextField
                label="LinkedIn URL"
                placeholder="https://linkedin.com/in/username"
                fullWidth
                value={resumeDetails.linkedin}
                onChange={(e) => setResumeDetails({ ...resumeDetails, linkedin: e.target.value })}
              />
              <TextField
                label="GitHub URL"
                placeholder="https://github.com/username"
                fullWidth
                value={resumeDetails.github}
                onChange={(e) => setResumeDetails({ ...resumeDetails, github: e.target.value })}
              />
              <TextField
                label="Portfolio / Other Link (Optional)"
                placeholder="https://yourportfolio.com"
                fullWidth
                value={resumeDetails.portfolio}
                onChange={(e) => setResumeDetails({ ...resumeDetails, portfolio: e.target.value })}
              />
            </Stack>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Summary &amp; Categorized Skills</Typography>
            <Stack spacing={2}>
              <TextField
                label="Professional Summary"
                multiline
                rows={4}
                fullWidth
                value={resumeDetails.summary}
                onChange={(e) => setResumeDetails({ ...resumeDetails, summary: e.target.value })}
              />
              <TextField
                label="Frontend Skills"
                placeholder="React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS..."
                fullWidth
                value={resumeDetails.skillCategories.frontend}
                onChange={(e) =>
                  setResumeDetails({
                    ...resumeDetails,
                    skillCategories: { ...resumeDetails.skillCategories, frontend: e.target.value },
                  })
                }
              />
              <TextField
                label="APIs & Data"
                placeholder="REST APIs, JSON, asynchronous HTTP requests"
                fullWidth
                value={resumeDetails.skillCategories.apis}
                onChange={(e) =>
                  setResumeDetails({
                    ...resumeDetails,
                    skillCategories: { ...resumeDetails.skillCategories, apis: e.target.value },
                  })
                }
              />
              <TextField
                label="Backend Skills"
                placeholder="Node.js, Express.js, MongoDB"
                fullWidth
                value={resumeDetails.skillCategories.backend}
                onChange={(e) =>
                  setResumeDetails({
                    ...resumeDetails,
                    skillCategories: { ...resumeDetails.skillCategories, backend: e.target.value },
                  })
                }
              />
              <TextField
                label="Tools"
                placeholder="Git, GitHub, Vite, Webpack, Vercel, Netlify"
                fullWidth
                value={resumeDetails.skillCategories.tools}
                onChange={(e) =>
                  setResumeDetails({
                    ...resumeDetails,
                    skillCategories: { ...resumeDetails.skillCategories, tools: e.target.value },
                  })
                }
              />
            </Stack>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Professional Experience</Typography>
            {resumeDetails.experience.map((exp, idx) => (
              <Stack key={idx} spacing={1.5} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                <TextField label="Role / Title" fullWidth value={exp.role} onChange={(e) => updateArrayItem('experience', idx, 'role', e.target.value)} />
                <TextField label="Company" fullWidth value={exp.company} onChange={(e) => updateArrayItem('experience', idx, 'company', e.target.value)} />
                <Stack direction="row" spacing={2}>
                  <TextField label="Duration (e.g., 05/2026 – Present)" fullWidth value={exp.duration} onChange={(e) => updateArrayItem('experience', idx, 'duration', e.target.value)} />
                  <TextField label="Location" fullWidth value={exp.location} onChange={(e) => updateArrayItem('experience', idx, 'location', e.target.value)} />
                </Stack>
                <TextField label="Description" multiline rows={3} fullWidth value={exp.description} onChange={(e) => updateArrayItem('experience', idx, 'description', e.target.value)} />
                {resumeDetails.experience.length > 1 && (
                  <Button color="error" size="small" onClick={() => removeArrayItem('experience', idx)}>Remove</Button>
                )}
              </Stack>
            ))}
            <Button variant="outlined" size="small" onClick={() => addArrayItem('experience', { role: '', company: '', duration: '', location: '', description: '' })}>
              + Add Experience
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" sx={{ mb: 2 }}>Projects</Typography>
            {resumeDetails.projects.map((proj, idx) => (
              <Stack key={idx} spacing={1.5} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                <TextField label="Project Title" fullWidth value={proj.title} onChange={(e) => updateArrayItem('projects', idx, 'title', e.target.value)} />
                <Stack direction="row" spacing={2}>
                  <TextField label="Tech Stack (e.g., React.js, Tailwind CSS)" fullWidth value={proj.techStack} onChange={(e) => updateArrayItem('projects', idx, 'techStack', e.target.value)} />
                  <TextField label="Date (e.g., 09/2026)" fullWidth value={proj.date} onChange={(e) => updateArrayItem('projects', idx, 'date', e.target.value)} />
                </Stack>
                <TextField label="Project Link (Optional)" fullWidth value={proj.link} onChange={(e) => updateArrayItem('projects', idx, 'link', e.target.value)} />
                <TextField label="Description" multiline rows={2} fullWidth value={proj.description} onChange={(e) => updateArrayItem('projects', idx, 'description', e.target.value)} />
                {resumeDetails.projects.length > 1 && (
                  <Button color="error" size="small" onClick={() => removeArrayItem('projects', idx)}>Remove</Button>
                )}
              </Stack>
            ))}
            <Button variant="outlined" size="small" onClick={() => addArrayItem('projects', { title: '', techStack: '', date: '', link: '', description: '' })}>
              + Add Project
            </Button>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Education</Typography>
            {resumeDetails.education.map((edu, idx) => (
              <Stack key={idx} spacing={1.5} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                <TextField label="Degree (e.g., B.Sc. Computer Science)" fullWidth value={edu.degree} onChange={(e) => updateArrayItem('education', idx, 'degree', e.target.value)} />
                <TextField label="University / College" fullWidth value={edu.college} onChange={(e) => updateArrayItem('education', idx, 'college', e.target.value)} />
                <Stack direction="row" spacing={2}>
                  <TextField label="Duration (e.g., 2023 – 2026)" fullWidth value={edu.duration} onChange={(e) => updateArrayItem('education', idx, 'duration', e.target.value)} />
                  <TextField label="Location" fullWidth value={edu.location} onChange={(e) => updateArrayItem('education', idx, 'location', e.target.value)} />
                </Stack>
                <TextField label="Coursework / Description" multiline rows={2} fullWidth value={edu.description} onChange={(e) => updateArrayItem('education', idx, 'description', e.target.value)} />
                {resumeDetails.education.length > 1 && (
                  <Button color="error" size="small" onClick={() => removeArrayItem('education', idx)}>Remove</Button>
                )}
              </Stack>
            ))}
            <Button variant="outlined" size="small" onClick={() => addArrayItem('education', { degree: '', college: '', duration: '', location: '', description: '' })}>
              + Add Education
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" sx={{ mb: 2 }}>Certificates</Typography>
            {resumeDetails.certificates.map((cert, idx) => (
              <Stack key={idx} spacing={1.5} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                <TextField label="Certificate Title" fullWidth value={cert.title} onChange={(e) => updateArrayItem('certificates', idx, 'title', e.target.value)} />
                <TextField label="Credential Link (Optional)" fullWidth value={cert.link} onChange={(e) => updateArrayItem('certificates', idx, 'link', e.target.value)} />
                <TextField label="Description" multiline rows={2} fullWidth value={cert.description} onChange={(e) => updateArrayItem('certificates', idx, 'description', e.target.value)} />
                {resumeDetails.certificates.length > 1 && (
                  <Button color="error" size="small" onClick={() => removeArrayItem('certificates', idx)}>Remove</Button>
                )}
              </Stack>
            ))}
            <Button variant="outlined" size="small" onClick={() => addArrayItem('certificates', { title: '', link: '', description: '' })}>
              + Add Certificate
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" sx={{ mb: 2 }}>Languages</Typography>
            <TextField
              label="Languages (comma-separated, e.g., English, Hindi, Malayalam, Tamil)"
              fullWidth
              value={resumeDetails.languages}
              onChange={(e) => setResumeDetails({ ...resumeDetails, languages: e.target.value })}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
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
            <Button color="inherit" onClick={handleBack}>Back</Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant="contained" onClick={handleSubmit}>Finish</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {renderFormContent(activeStep)}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" onClick={handleSkillsAndSummary}>
                Generate Skills And Summary
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

export default ResumeInputs;