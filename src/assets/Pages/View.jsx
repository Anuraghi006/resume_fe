import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FaFileDownload } from "react-icons/fa";
import { FaBackward } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
// import Edit from "../components/Edit";
import { addToHistoryResumeAPI, viewResumeAPI,uploadToCloudinary } from "../../Services/apiServices";
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Swal from 'sweetalert2'

function View({ resumeDetails }) {


  //get id from the url
  const {id} = useParams()
  console.log(id);

  const [resume,setResume]=useState({})
  //viewing  
  const viewResume=async(id)=>{
    try{
      const res = await viewResumeAPI(id)
      console.log(res);
      setResume(res.data)
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    viewResume(id)
  },[])

// download
const handlePdfDownload=async()=>{
  // checking if the paper is accessible when button clicked
   console.log(document.getElementById('result'));
  
    
  // to take screenshot
  // passs the paper to canvas
  // add scale 3 for image clarrity
  const canvas= await html2canvas(document.getElementById('result'),{scale:3})
  console.log(canvas);


// to covert the canvas to imgae url 
// define the type as image/png in strings
const imgData=canvas.toDataURL("image/png")
console.log(imgData);


// to generate pdf
// p-potrait 
const pdf=new jsPDF('p','mm','a4')
//define width and height of pdf
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth)/canvas.width;
    //add image to pdf
    pdf.addImage(imgData,'PNG',0,0,pdfWidth,pdfHeight);
    //save the pdf
    pdf.save('resume.pdf')
//get current date and time
    const timezone = new Date()
    console.log(timezone);
    //formated date and time
    const formatedDate = `${timezone.toLocaleDateString()} ,  ${timezone.toLocaleTimeString()}`
    console.log(formatedDate);




  console.log(resume);
  try{
// API calling for cloudinary
    const cloudinaryResponse =
      await uploadToCloudinary(imgData);

    console.log("Cloudinary:", cloudinaryResponse);

    // Save only URL in JSON Server
    const response = await addToHistoryResumeAPI({
      ...resume,

      // new history id
      id: Date.now(),

      // original resume id
      resumeId: resume.id,

      formatedDate:
        `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,

      imageUrl: cloudinaryResponse.secure_url
    });

    console.log("History:", response);


  //  API calling for adding to history
  // const res= await addToHistoryResumeAPI(resume)
  // console.log(res);
  
if(response.status===201){
  Swal.fire({
  title: "Downloaded",
  text: "Resume downloaded successfully",
  icon: "success"
});
}
else{
   Swal.fire({
  title: "Error!",
  text: "Resume downloading failed",
  icon: "error"
});
}
  }


  catch(err){
    console.log(err);
    Swal.fire({
  title: "Error",
  text: "Resume downloading failed",
  icon: "error"
});
  }
}

  const navigate = useNavigate();

  // const handleDownload = () => {
  //   window.print();
  // };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F5F5",
        py: 5,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        {/* Top Action Buttons */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          mb={4}
        >
          <Button
            startIcon={<FaFileDownload />}
            sx={{ color: "#7B4A2E", fontWeight: 600 }} onClick={handlePdfDownload}
          >
            Download CV
          </Button>

<Edit resume={resume} setResume={setResume}/>

          <Button
            startIcon={<FaBackward />}
            onClick={() => navigate("/")}
            sx={{ color: "#7B4A2E", fontWeight: 600 }}
          >
            Home
          </Button>
        </Stack>

        {/* Resume Paper */}
        <Paper id="result"
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 850,
            mx: "auto",
            p: { xs: 3, sm: 5, md:6 },
            borderRadius: 2,
            bgcolor: "#FAFAFA",
          }}
        >
          {/* Name */}
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }}
          >
            {resume?.fullName}
          </Typography>

          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }}
          >
            {resume?.jobTitle}
          </Typography>

          {/* Contact */}
          <Stack spacing={0.5}>
            <Typography>Phone: {resume?.contactNumber}</Typography>
            <Typography>Email: {resume?.email}</Typography>
            <Typography>LinkedIn: {resume?.linkedIn}</Typography>
            <Typography>Github: {resume?.github}</Typography>
            <Typography>Location: {resume?.location}</Typography>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Summary */}
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Professional Summary
          </Typography>

          <Typography color="text.secondary">
            {resume?.summary}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Skills */}
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Technical Skills
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {resume?.skills?.map((item, index) => (
              <Chip
                key={index}
                label={item}
                variant="outlined"
                sx={{
                  borderColor: "#7B4A2E",
                  color: "#7B4A2E",
                }}
              />
            ))}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Education */}
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Education
          </Typography>

          <Stack spacing={1}>
            <Typography>
              <strong>Degree:</strong> {resume?.degree}
            </Typography>

            <Typography>
              <strong>University/College:</strong> {resume?.college}
            </Typography>

            <Typography>
              <strong>Year of Graduation:</strong> {resume?.year}
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default View;
