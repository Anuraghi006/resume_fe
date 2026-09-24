import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import jobRoles from '../JobRoles.json'
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
} from "@mui/material";
import {  FaEdit } from "react-icons/fa";
import { updateResumeAPI } from '../../Services/apiServices';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "85%", md: 700 },
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "#FAFAFA",
  border: "1px solid #555",
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

function Edit({resume,setResume}) {
console.log(resume);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // usenavigate
    const navigate= useNavigate()

// Adding Skills
// 1)define useRef which can be used to access a DOM element directly
const skillsRef=React.useRef()

// 4) define fn addSkill
 const addSkill=(skill)=>{
  console.log(skill);
  if(skill){
    const result= resume?.skills?.map(item=>item.toLowerCase().includes(skill.toLowerCase()))
    if(result?.includes(true)){
      alert('Skill already Exists')
    }
  
  else{
    setResume({...resume,skills:[...(resume?.skills || []),skill]})
    console.log(resume);
    
  }
  skillsRef.current.value=''
 }
 }

//  updating
const handleUpdate=async()=>{
      const {fullName,location,jobTitle,email,contactNumber,linkedin,github,degree,college,year,skills,summary}=resume
          if(fullName==""|| location==""|| jobTitle==""|| email==""||contactNumber==""||linkedin==""||github==""||degree==""||college==""|| year==""|| skills==""||summary=="" ){
              handleClose()

              Swal.fire({
        title: "warning",
        text: "pleasse fill the form",
        icon: "warning"
      });
          }
          
          // API  call
          else{
          try{
  const res = await updateResumeAPI(resume.id,resume)
  console.log(res);
  handleClose()
            if(res.status==200){
                     Swal.fire({
        title: "Good Job",
        text: "Resume Updated",
        icon: "success"
      });
          }
      
      //  const resumeID=res.data.id
      //  setTimeout(()=>{
      //  navigate(`/resume/${resumeID}`)
      //  },2000)
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


// remove skill
const handleRemoveSkill=(skill)=>{
  setResume({...resume,skills:resume.skills.filter(item=>item!=skill)})
}

  return (
    <div>
                <Button
            startIcon={<FaEdit />}
            onClick={(handleOpen)}
            sx={{ color: "#7B4A2E", fontWeight: 600 }}
          >
            Edit CV
          </Button>
<Box>
          <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
>
  <Box sx={style}>
    {/* Header */}
    <Box
      sx={{
        bgcolor: "#6B5658",
        color: "white",
        p: 2,
        mb: 4,
      }}
    >
      <Typography variant="h6">
        Edit Resume Details
      </Typography>
    </Box>

     <Box>
           <h1>Personal Info</h1>
           <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '70ch' } }}
      noValidate
      autoComplete="off"
    >
      <Stack direction='column' spacing={1}
      sx={{
        justifyContent:'space-evenly',
        alignItems:'center'
      }}>

      <TextField id="outlined-basic" label="Full Name"  onChange={(e)=>setResume({...resume,fullName:e.target.value})} value={resume.fullName} variant="outlined" sx={{width:600}}/>

      <TextField id="outlined-basic" label="Location" onChange={(e)=>setResume({...resume,location:e.target.value})} value={resume.location}  variant="outlined" sx={{width:600}} />
      <Box sx={{ minWidth: 600 }}>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Job Title</InputLabel>
        <Select
        value={resume.jobTitle}
        onChange={(e)=>setResume({...resume,jobTitle:e.target.value})}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          // value={age}
          label="Job Title"
          
          // onChange={handleChange}
        >
          {
            jobRoles.jobRoles.map(item=>(
              <MenuItem value={item} key={item}>{item}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
         
      </Stack>
    </Box>
         </Box>

 <Box>
           <h1>Contact Info</h1>
           <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '70ch' } }}
                noValidate
                autoComplete="off"
              >
                <Stack direction='column' spacing={1}
                sx={{
                  justifyContent:'space-evenly',
                  alignItems:'center'
                }}>
          
                <TextField id="outlined-basic" label="Email" onChange={(e)=>setResume({...resume,email:e.target.value})} value={resume.email} variant="outlined" sx={{width:600}}/>
                <TextField id="outlined-basic" label="Phone Number" onChange={(e)=>setResume({...resume,contactNumber:e.target.value})} value={resume.contactNumber} variant="outlined" sx={{width:600}} />
                <TextField id="outlined-basic" label="Github" onChange={(e)=>setResume({...resume,github:e.target.value})} value={resume.github} variant="outlined" sx={{width:600}} />
                <TextField id="outlined-basic" label="LinkedIn" onChange={(e)=>setResume({...resume,fullName:e.target.value})} value={resume.github} variant="outlined" sx={{width:600}} />
                   
                </Stack>
              </Box>
         </Box>

    <Divider sx={{ my: 3 }} />

    {/* Summary */}
    <Typography variant="h5" fontWeight="bold" mb={2}>
      Professional Summary
    </Typography>

    <Typography sx={{ color: "#555", lineHeight: 1.8 }}>
      {resume?.summary}
    </Typography>

    <Divider sx={{ my: 3 }} />

   {/* Skills */}
    <Typography
      variant="h4"
      style={{
        fontFamily: "Georgia",
        fontWeight: "bold",
        marginTop: "25px",
      }}
    >
      Skills
    </Typography>

    <Box
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginTop: "20px",
      }}
    >

      <TextField
        label="Add New Skill"
        fullWidth
        // 2) call skillsRef
        inputRef={skillsRef}
      />

      <Button
      //3) set onclick to pass the skill and define the fn above
      onClick={()=>addSkill
        (skillsRef.current.value)
      }
        style={{
          color: "#74462d",
        }}
      >
        ADD
      </Button>

    </Box>

    <Typography
      style={{
        fontFamily: "Georgia",
        fontWeight: "bold",
         
      }}
    >
      Added Skills : 
      <Stack direction='row' sx={
        { justifyContent: "space-evenly",
                        alignItems: "center",
                        flexWrap:'wrap'}
      }>
        {
        resume?.skills?.map(item=>(
         <Button
      variant="contained"
      style={{
        backgroundColor: "#654f52",
        marginTop: "25px",
        fontFamily: "Georgia",
        fontWeight: "bold",
      }}
    >
      {item} <Button onClick={()=>handleRemoveSkill(item)}> <RxCross2 /></Button>
    </Button>
    ))
    }
      </Stack>
    </Typography>

    <Divider sx={{ my: 3 }} />

    {/* Education */}
    <Typography variant="h5" fontWeight="bold" mb={2}>
      Education
    </Typography>

     <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '70ch' } }}
          noValidate
          autoComplete="off"
        >
          <Stack direction='column' spacing={1}
          sx={{
            justifyContent:'space-evenly',
            alignItems:'center'
          }}>
    
          <TextField id="outlined-basic" label="Degree" onChange={(e)=>setResume({...resume,degree:e.target.value})} value={resume.degree}  variant="outlined" sx={{width:600}}/>
          <TextField id="outlined-basic" label="College/University" onChange={(e)=>setResume({...resume,college:e.target.value})} value={resume.college}  variant="outlined" sx={{width:600}} />
          <TextField id="outlined-basic" label="Year Of Graduation " onChange={(e)=>setResume({...resume,year:e.target.value})} value={resume.year} variant="outlined" sx={{width:600}} />
             
          </Stack>
        </Box>

    {/* Buttons */}
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      justifyContent="flex-end"
      mt={4}
    >
      <Button
        variant="outlined"
        onClick={handleClose}
      >
        Cancel
      </Button>

      <Button onClick={handleUpdate}
        variant="contained"
        sx={{
          bgcolor: "#6B5658",
          "&:hover": { bgcolor: "#5A4547" },
        }}
      >
        UPDATE CV
      </Button>
    </Stack>
  </Box>
</Modal>
</Box>
    </div>
  )
}

export default Edit