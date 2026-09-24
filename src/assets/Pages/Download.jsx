import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { useEffect } from 'react'
import Modal from '@mui/material/Modal';
import { deleteDownloadedResumeAPI, getAllHistoryResumeAPI } from '../../Services/apiServices'
import { MdDelete } from "react-icons/md";
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

// import { RechartsDevtools } from '@recharts/devtools';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Download({ isAnimationActive = true } ) {
   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
// state for displaying
const [allResume,setAllResume]=React.useState([])
// displaying downloaded resumes 
const getAllDownloadedResume=async()=>{
  try{
    const result=await getAllHistoryResumeAPI()
    console.log(result);
    setAllResume(result.data)
    
  }
  catch(err){
    console.log(err);
    
  }
  }

const jobTitles = [...new Set(allResume.map((item) => item.jobTitle))];

const chartData = jobTitles.map((job) => ({
  name: job,
  value: allResume.filter((item) => item.jobTitle === job).length,
}));
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088FE",
];
useEffect(()=>{
getAllDownloadedResume()
},[])

const deleteResume=async(id)=>{
  try{
    const res= await deleteDownloadedResumeAPI(id)
    console.log(res);
    getAllDownloadedResume()
    
  }
  catch(err){
    console.log(err);
    
  }

 
}
  return (
    <div>

      <Box  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }}>
        
<Box sx={{ ml: 10 }}>
  <Typography sx={{ fontSize: 50 }}>
    All Download Resume Details
  </Typography>

  <Typography>
    total Downloaded Resumes From Our site is :{allResume.length}
  </Typography>
</Box>


         <Button onClick={handleOpen}>View Chart</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <PieChart width={400} height={400}>
  <Pie
  activeShape={{
          fill: 'red',
        }}
    data={chartData}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={120}
    label
   
     isAnimationActive={isAnimationActive}
  >
    {chartData.map((item, index) => (
    <Cell
      key={index}
      fill={COLORS[index % COLORS.length]}
    />))}
  </Pie>


  <Tooltip />
</PieChart>
          </Typography>
        </Box>
      </Modal>
      </Box>

      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 3,
        flexWrap: 'wrap',
        padding: 5,
      }}
    >
      {
        allResume.map(item=>(
      <Paper elevation={24}>
         <Typography>{item.formatedDate}  <Button onClick={()=>deleteResume(item.id)} ><MdDelete /></Button></Typography>
        
         <img src={item.imageUrl}height={500}width={500}alt=''/>

      </Paper>
        ))
      }   

    </Box>
    </div>
  )
}

export default Download