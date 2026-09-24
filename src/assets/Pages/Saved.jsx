import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React, { useEffect, useMemo, useState } from 'react'
import TextField from '@mui/material/TextField';
import { FaSearch } from "react-icons/fa";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteResumeAPI, getAllResumeAPI } from '../../Services/apiServices';
import { Button } from '@mui/material';
import { MdDelete } from "react-icons/md";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

function Saved() {

 // to hold all resumes
  const [allResumes,setAllResumes]=useState([]) 

// TO SEARCH
const [searchKey,setSearchKey]=useState('')
console.log(searchKey);
  // create a dummy state
const [dummyAllResume,setDummyAllResume]=useState([])


  // to get the resumes
const getAllResume=async()=>{
  try{
    const res= await getAllResumeAPI()
    console.log(res);
   setAllResumes(res.data)
  //  assign the result data to dummy state
   setDummyAllResume(res.data)
  }
  catch(err){
    console.log(err);
    
  }
}
useEffect(()=>{
  getAllResume()
},[])


  // to delete the resumes
  const deleteResume=async(id)=>{
    console.log(id);
    
     const res=await deleteResumeAPI(id)
     console.log(res);
     getAllResume()
  }

  // fn for searching
  const searchOutput=useMemo(()=>{
   setAllResumes(dummyAllResume.filter(item=>item.jobTitle.toLowerCase().includes(searchKey.toLowerCase())))
  },[searchKey]
  )



  return (
    <div>
        <Box >
            <Typography variant='h3' sx={{textAlign:'center', margin:5}}>
                All Saved Resumes
            </Typography>
            <Typography variant='h6' sx={{textAlign:'justify', margin:10}}>
                All resumes submitted to the platform in one place, allowing administrators or recruiters to efficiently view, search, filter, and manage candidate profiles. It provides a quick overview of available candidates and their key details, making the recruitment and candidate-selection process more organized and efficient.
            </Typography>
            <Stack direction="row" spacing={8}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
         <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '100ch' } }}
                noValidate
                autoComplete="off"
        >
      <TextField id="outlined-basic" label="Search Resume" variant="outlined" onChange={(e)=>setSearchKey(e.target.value)} />
         </Box>
            </Stack>
            <Box sx={{position:'absolute' ,top:445,right:400}}>
                <FaSearch />
            </Box>
            <Box sx={
                {
                    marginX:10 ,
                    marginY:5
                }
            }>
                 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">ID</StyledTableCell>
            <StyledTableCell align="right">Resumes</StyledTableCell>
            <StyledTableCell align="right">Job Role</StyledTableCell>
            <StyledTableCell align="right">...</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allResumes.map(item=>(
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell align="right">{item.fullName}
              </StyledTableCell>
              <StyledTableCell align="right">{item.jobTitle}
              </StyledTableCell>
              <StyledTableCell align="right"><Button onClick={()=>deleteResume(item.id)}><MdDelete /></Button>
              </StyledTableCell>
            </StyledTableRow>
           ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Box>
        </Box>
    </div>
  )
}

export default Saved