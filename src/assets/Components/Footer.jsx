import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'

function Footer() {
  return (
    <div>
      {/* <h1>FOOTER COMPONENT</h1> */}
      <Box sx={{backgroundColor:'black',height:400,color:'white'}}>
        <Stack
  direction="row"
  spacing={2}
  sx={{
    justifyContent: "space-evenly",
    alignItems: "center",
    direction:'row'
  }}
>

<Box sx={{width:'400px',padding:'40px'}}>
  <Typography variant='h3'>
Ai resume builder
  </Typography>
  <Typography>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quos debitis ipsam mollitia tempore aperiam vitae natus veritatis esse consectetur incidunt laborum optio dolores animi quisquam deserunt, nesciunt magnam accusantium!
  </Typography>
</Box>

<Box>
  <Typography variant='h6'>
    contcat us  
  </Typography>
  <Typography variant='h6'>
    resumebuilder@gmail.com
  </Typography>
  <Typography variant='h6'>
9987522074
  </Typography>
  <Typography variant='h6'>
    contcat with us
  </Typography>
  <Typography variant='h6'>
    contcat with  
  </Typography>
</Box>

  </Stack>
      </Box>
    </div>
  )
}

export default Footer
