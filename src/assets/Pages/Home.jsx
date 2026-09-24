import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FaSwatchbook } from "react-icons/fa";
import Swal from 'sweetalert2'
import {Box, padding} from '@mui/system'
import './Home.css'
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
function Home() {
//     const handleButton=()=>{
//         Swal.fire({
//   title: 'Success!',
//   text: 'Do you want to continue',
//   icon: 'success',
//   confirmButtonText: 'OK'
// })
//     }
  return (
    <div>
      {/* <h1>HOME</h1>
      <Stack spacing={2} direction="row">
      <Button onClick={handleButton} variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <FaSwatchbook />
    </Stack> */}

    <section id='hero' sx={{padding:10}}>
      <Box id='box' sx={{padding:10, width:900,border:2,mx:"auto",display:"flex",justifyContent:"center",alignItems:"center",p:20}}>

        
<Stack
  direction="column"
  spacing={2}
  sx={{
    justifyContent: "center",
    alignItems: "center",
    direction:'row'
  }}
>
        <Typography variant='h3'>
          Designed To Get You Hired. Your Skills, Your Story, Your next Job - All In One.
        </Typography>
        <Link to={'/resume'}>
        <Button sx={{backgroundColor:'black',color:'white',padding:3}}>Make Your Resume With AI</Button>
        </Link>
        </Stack>
      </Box>
    </section>

<section sx={{padding:'20px'}}>
  <Typography variant='h4' sx={{textAlign:'center',marginTop:10}}>What's AI Builder</Typography>
  <Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-evenly",
    alignItems: "center",
    direction:'row'
  }}
>
<Box sx={{width:600}}>
  <Typography variant='p' sx={{textAlign:'justify'}} >
    AI Builder is a Microsoft Power Platform capability that allows businesses to easily add artificial intelligence to their everyday workflows and applications. It is designed as a low-code platform, meaning that ordinary business users—not just data scientists or software engineers—can build, train, and deploy AI models. By integrating directly with Power Apps and Power Automate, it helps organizations automate repetitive processes and extract valuable insights from their data without requiring complex coding knowledge. <br></br>  <br></br>
    </Typography>
    <Typography variant='p' sx={{textAlign:'justify'}} >
       The platform offers two primary types of models: prebuilt models and custom models. Prebuilt models are ready to use right out of the box for common business tasks, such as extracting text from invoices, translating languages, detecting sentiment in customer feedback, or scanning business cards. If a business has more specific needs, they can train custom models using their own data. This allows companies to teach the AI to recognize unique product logos, predict specific business outcomes based on historical data, or process highly specialized forms. <br></br> <br></br>
  </Typography>
<Typography variant='p' sx={{textAlign:'justify'}} >
      Once an AI model is created or selected, it can be seamlessly embedded into automated workflows and custom apps to transform how a business operates. For example, an organization can set up a workflow that automatically reads incoming customer emails, detects their sentiment, extracts key information from attached documents, and routes the data directly into a database. By handles these routine, data-heavy tasks automatically, AI Builder helps teams reduce human error, save time, and focus on higher-value strategic work.
</Typography>
</Box>

<Box>
<img src='https://www.theheadhunters.ca/wp-content/uploads/2025/09/resume-writing-laptop-1024x596.jpg' width={'600px'} height={'500px'}/>
</Box>

</Stack>
</section>

<section sx={{padding:'20px'}}>
  <Typography variant='h4' sx={{textAlign:'center',marginTop:10}}>Testimony</Typography>
  <Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-evenly",
    alignItems: "center",
    direction:'row'
  }}
>
<Box sx={{width:600}}>
  <Typography variant='p' sx={{textAlign:'justify'}} >
    AI Builder is a Microsoft Power Platform capability that allows businesses to easily add artificial intelligence to their everyday workflows and applications. It is designed as a low-code platform, meaning that ordinary business users—not just data scientists or software engineers—can build, train, and deploy AI models. By integrating directly with Power Apps and Power Automate, it helps organizations automate repetitive processes and extract valuable insights from their data without requiring complex coding knowledge. <br></br>  <br></br>
    </Typography>
    <Typography variant='p' sx={{textAlign:'justify'}} >
       The platform offers two primary types of models: prebuilt models and custom models. Prebuilt models are ready to use right out of the box for common business tasks, such as extracting text from invoices, translating languages, detecting sentiment in customer feedback, or scanning business cards. If a business has more specific needs, they can train custom models using their own data. This allows companies to teach the AI to recognize unique product logos, predict specific business outcomes based on historical data, or process highly specialized forms. <br></br> <br></br>
  </Typography>
<Typography variant='p' sx={{textAlign:'justify'}} >
      Once an AI model is created or selected, it can be seamlessly embedded into automated workflows and custom apps to transform how a business operates. For example, an organization can set up a workflow that automatically reads incoming customer emails, detects their sentiment, extracts key information from attached documents, and routes the data directly into a database. By handles these routine, data-heavy tasks automatically, AI Builder helps teams reduce human error, save time, and focus on higher-value strategic work.
</Typography>
</Box>

<Box sx={{ width: '50%' }}>
  <Stack direction="column" spacing={1.5}>
    {/* Row 1 */}
    <Stack direction="row" spacing={1.5} sx={{ justifyContent: "center" }}>
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
    </Stack>

    {/* Row 2 */}
    <Stack direction="row" spacing={1.5} sx={{ justifyContent: "center" }}>
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
    </Stack>

    {/* Row 3 */}
    <Stack direction="row" spacing={1.5} sx={{ justifyContent: "center" }}>
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
      <img src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww" alt="Testimonial" style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
    </Stack>
  </Stack>
</Box>

</Stack>
</section>

<section id='hero1'>
</section>


    </div>
  )
}

export default Home
