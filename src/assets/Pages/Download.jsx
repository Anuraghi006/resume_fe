import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { deleteDownloadedResumeAPI, getAllHistoryResumeAPI } from '../../Services/apiServices';
import { MdDelete } from 'react-icons/md';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 440,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Download({ isAnimationActive = true }) {
  const [open, setOpen] = React.useState(false);
  const [allResume, setAllResume] = React.useState([]);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllDownloadedResume = async () => {
    try {
      const result = await getAllHistoryResumeAPI();
      setAllResume(result.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllDownloadedResume();
  }, []);

  const deleteResume = async (id) => {
    try {
      await deleteDownloadedResumeAPI(id);
      getAllDownloadedResume();
    } catch (err) {
      console.error(err);
    }
  };

  const jobTitles = [...new Set(allResume.map((item) => item.jobTitle).filter(Boolean))];
  const chartData = jobTitles.map((job) => ({
    name: job,
    value: allResume.filter((item) => item.jobTitle === job).length,
  }));

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F5', py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 3, md: 10 },
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography sx={{ fontSize: { xs: 28, md: 42 }, fontWeight: 'bold' }}>
            All Downloaded Resume Details
          </Typography>
          <Typography color="text.secondary">
            Total Downloaded Resumes From Our Site: {allResume.length}
          </Typography>
        </Box>

        <Button variant="contained" onClick={handleOpen} sx={{ bgcolor: '#6B5658' }}>
          View Chart
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Downloaded Resumes by Job Title
            </Typography>
            <Box id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <PieChart width={360} height={360}>
                <Pie
                  activeShape={{ fill: 'red' }}
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label
                  isAnimationActive={isAnimationActive}
                >
                  {chartData.map((item, index) => (
                    <Cell key={item.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </Box>
          </Box>
        </Modal>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 4,
          flexWrap: 'wrap',
          p: { xs: 2, md: 5 },
        }}
      >
        {allResume.map((item) => (
          <Paper
            key={item.id}
            elevation={6}
            sx={{
              width: 380,
              borderRadius: 1,
              overflow: 'hidden',
              bgcolor: '#fff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 2, py: 1, bgcolor: '#FAFAFA', borderBottom: '1px solid #e0e0e0' }}
            >
              <Typography variant="caption" color="text.secondary">
                {item.formatedDate}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                {item.resumeId && (
                  <Button
                    size="small"
                    onClick={() => navigate(`/resume/${item.resumeId}`)}
                    sx={{ color: '#7B4A2E', fontSize: '0.75rem' }}
                  >
                    View
                  </Button>
                )}
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => deleteResume(item.id)}
                  aria-label="delete resume"
                >
                  <MdDelete />
                </IconButton>
              </Stack>
            </Stack>

            <Box
              component="img"
              src={item.imageUrl}
              alt={`${item.fullName || 'Resume'} preview`}
              sx={{
                width: '100%',
                height: 'auto',
                aspectRatio: '210 / 297',
                objectFit: 'contain',
                display: 'block',
                bgcolor: '#fff',
              }}
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default Download;