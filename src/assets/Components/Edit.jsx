import React from 'react';
import Modal from '@mui/material/Modal';
import jobRoles from '../JobRoles.json';
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import { updateResumeAPI } from '../../Services/apiServices';
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '95%', sm: '85%', md: 720 },
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: '#FAFAFA',
  border: '1px solid #d7e084',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

function Edit({ resume, setResume }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const updateArrayItem = (section, index, field, value) => {
    const updated = [...(resume?.[section] || [])];
    updated[index] = { ...updated[index], [field]: value };
    setResume({ ...resume, [section]: updated });
  };

  const addArrayItem = (section, template) => {
    setResume({
      ...resume,
      [section]: [...(resume?.[section] || []), template],
    });
  };

  const handleUpdate = async () => {
    const { fullName, location, jobTitle, email, contactNumber, summary, skills } = resume;
    if (
      !fullName ||
      !location ||
      !jobTitle ||
      !email ||
      !contactNumber ||
      !summary ||
      !skills ||
      skills.length === 0
    ) {
      handleClose();
      Swal.fire({
        title: 'Warning',
        text: 'Please fill in all required fields',
        icon: 'warning',
      });
      return;
    }

    try {
      const res = await updateResumeAPI(resume.id, resume);
      handleClose();
      if (res.status === 200) {
        Swal.fire({
          title: 'Good Job',
          text: 'Resume Updated',
          icon: 'success',
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: 'Error',
        text: 'Failed to update resume',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <Button
        startIcon={<FaEdit />}
        onClick={handleOpen}
        sx={{ color: '#b1b553', fontWeight: 600 }}
      >
        Edit CV
      </Button>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <Box sx={{ bgcolor: '#fffb00', color: 'white', p: 2, mb: 3 }}>
            <Typography variant="h6">Edit Resume Details</Typography>
          </Box>

          {/* Personal Info */}
          <Typography variant="h6" fontWeight="bold" mb={2}>Personal Info</Typography>
          <Stack spacing={2} mb={3}>
            <TextField
              label="Full Name"
              fullWidth
              value={resume?.fullName || ''}
              onChange={(e) => setResume({ ...resume, fullName: e.target.value })}
            />
            <TextField
              label="Location"
              fullWidth
              value={resume?.location || ''}
              onChange={(e) => setResume({ ...resume, location: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel id="edit-job-title-label">Job Title</InputLabel>
              <Select
                labelId="edit-job-title-label"
                value={resume?.jobTitle || ''}
                label="Job Title"
                onChange={(e) => setResume({ ...resume, jobTitle: e.target.value })}
              >
                {jobRoles.jobRoles.map((item) => (
                  <MenuItem value={item} key={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* Contact & Links */}
          <Typography variant="h6" fontWeight="bold" mb={2}>Contact &amp; Links</Typography>
          <Stack spacing={2} mb={3}>
            <TextField
              label="Email"
              fullWidth
              value={resume?.email || ''}
              onChange={(e) => setResume({ ...resume, email: e.target.value })}
            />
            <TextField
              label="Phone Number"
              fullWidth
              value={resume?.contactNumber || ''}
              onChange={(e) => setResume({ ...resume, contactNumber: e.target.value })}
            />
            <TextField
              label="LinkedIn URL"
              fullWidth
              value={resume?.linkedin || ''}
              onChange={(e) => setResume({ ...resume, linkedin: e.target.value })}
            />
            <TextField
              label="GitHub URL"
              fullWidth
              value={resume?.github || ''}
              onChange={(e) => setResume({ ...resume, github: e.target.value })}
            />
            <TextField
              label="Portfolio / Other Link"
              fullWidth
              value={resume?.portfolio || ''}
              onChange={(e) => setResume({ ...resume, portfolio: e.target.value })}
            />
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Summary (Read-only from DB) */}
          <Typography variant="h6" fontWeight="bold" mb={1}>Professional Summary</Typography>
          <Typography sx={{ color: '#000000', lineHeight: 1.8 }}>
            {resume?.summary}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Skills (Read-only from DB) */}
          <Typography variant="h6" fontWeight="bold" mb={1.5}>Skills</Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {Array.isArray(resume?.skills) &&
              resume.skills.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  sx={{ bgcolor: '#b5b53b', color: '#fff', fontWeight: 'bold' }}
                />
              ))}
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Experience */}
          <Typography variant="h6" fontWeight="bold" mb={2}>Professional Experience</Typography>
          {resume?.experience?.map((exp, idx) => (
            <Stack key={idx} spacing={1.5} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <TextField label="Role" fullWidth value={exp.role} onChange={(e) => updateArrayItem('experience', idx, 'role', e.target.value)} />
              <TextField label="Company" fullWidth value={exp.company} onChange={(e) => updateArrayItem('experience', idx, 'company', e.target.value)} />
              <Stack direction="row" spacing={2}>
                <TextField label="Duration" fullWidth value={exp.duration} onChange={(e) => updateArrayItem('experience', idx, 'duration', e.target.value)} />
                <TextField label="Location" fullWidth value={exp.location} onChange={(e) => updateArrayItem('experience', idx, 'location', e.target.value)} />
              </Stack>
              <TextField label="Description" multiline rows={2} fullWidth value={exp.description} onChange={(e) => updateArrayItem('experience', idx, 'description', e.target.value)} />
            </Stack>
          ))}
          <Button
            variant="outlined"
            size="small"
            onClick={() => addArrayItem('experience', { role: '', company: '', duration: '', location: '', description: '' })}
          >
            + Add Experience
          </Button>

          <Divider sx={{ my: 3 }} />

          {/* Projects */}
          <Typography variant="h6" fontWeight="bold" mb={2}>Projects</Typography>
          {resume?.projects?.map((proj, idx) => (
            <Stack key={idx} spacing={1.5} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <TextField label="Project Title" fullWidth value={proj.title} onChange={(e) => updateArrayItem('projects', idx, 'title', e.target.value)} />
              <Stack direction="row" spacing={2}>
                <TextField label="Tech Stack" fullWidth value={proj.techStack} onChange={(e) => updateArrayItem('projects', idx, 'techStack', e.target.value)} />
                <TextField label="Date" fullWidth value={proj.date} onChange={(e) => updateArrayItem('projects', idx, 'date', e.target.value)} />
              </Stack>
              <TextField label="Project Link" fullWidth value={proj.link} onChange={(e) => updateArrayItem('projects', idx, 'link', e.target.value)} />
              <TextField label="Description" multiline rows={2} fullWidth value={proj.description} onChange={(e) => updateArrayItem('projects', idx, 'description', e.target.value)} />
            </Stack>
          ))}
          <Button
            variant="outlined"
            size="small"
            onClick={() => addArrayItem('projects', { title: '', techStack: '', date: '', link: '', description: '' })}
          >
            + Add Project
          </Button>

          <Divider sx={{ my: 3 }} />

          {/* Certificates */}
          <Typography variant="h6" fontWeight="bold" mb={2}>Certificates</Typography>
          {resume?.certificates?.map((cert, idx) => (
            <Stack key={idx} spacing={1.5} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <TextField label="Certificate Title" fullWidth value={cert.title} onChange={(e) => updateArrayItem('certificates', idx, 'title', e.target.value)} />
              <TextField label="Credential Link" fullWidth value={cert.link} onChange={(e) => updateArrayItem('certificates', idx, 'link', e.target.value)} />
              <TextField label="Description" multiline rows={2} fullWidth value={cert.description} onChange={(e) => updateArrayItem('certificates', idx, 'description', e.target.value)} />
            </Stack>
          ))}
          <Button
            variant="outlined"
            size="small"
            onClick={() => addArrayItem('certificates', { title: '', link: '', description: '' })}
          >
            + Add Certificate
          </Button>

          <Divider sx={{ my: 3 }} />

          {/* Languages */}
          <Typography variant="h6" fontWeight="bold" mb={2}>Languages</Typography>
          <TextField
            label="Languages (comma-separated)"
            fullWidth
            value={resume?.languages || ''}
            onChange={(e) => setResume({ ...resume, languages: e.target.value })}
          />

          <Divider sx={{ my: 3 }} />

          {/* Education */}
          <Typography variant="h6" fontWeight="bold" mb={2}>Education</Typography>
          {resume?.education?.map((edu, idx) => (
            <Stack key={idx} spacing={1.5} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <TextField label="Degree" fullWidth value={edu.degree} onChange={(e) => updateArrayItem('education', idx, 'degree', e.target.value)} />
              <TextField label="College / University" fullWidth value={edu.college} onChange={(e) => updateArrayItem('education', idx, 'college', e.target.value)} />
              <Stack direction="row" spacing={2}>
                <TextField label="Duration" fullWidth value={edu.duration} onChange={(e) => updateArrayItem('education', idx, 'duration', e.target.value)} />
                <TextField label="Location" fullWidth value={edu.location} onChange={(e) => updateArrayItem('education', idx, 'location', e.target.value)} />
              </Stack>
              <TextField label="Description" multiline rows={2} fullWidth value={edu.description} onChange={(e) => updateArrayItem('education', idx, 'description', e.target.value)} />
            </Stack>
          ))}
          <Button
            variant="outlined"
            size="small"
            onClick={() => addArrayItem('education', { degree: '', college: '', duration: '', location: '', description: '' })}
          >
            + Add Education
          </Button>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end" mt={4}>
            <Button variant="outlined" onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleUpdate}
              variant="contained"
        sx={{ color: '#b1b553', fontWeight: 600, '&:hover': { bgcolor: '#5A4547' } }}            >
              UPDATE CV
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default Edit;