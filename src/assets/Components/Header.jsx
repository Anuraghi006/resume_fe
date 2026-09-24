import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { FcRules } from "react-icons/fc";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

function Header() {
   
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'black'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <Link to={'/'}>
           <FcRules  />
            </Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           AI Powered Resume Builder
          </Typography>
         

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }} >
        <Link to={'/all-resumes'}>
        <Button sx={{color:'white', backgroundColor:'gray', fontWeight:600, px:5,"&:hover":{
            backgroundColor:'black',border:2
        }}} >All Resumes</Button>
        </Link>
        <Link to={'/downloads'}>
        <Button sx={{color:'white', backgroundColor:'gray', fontWeight:600, px:5,"&:hover":{
            backgroundColor:'black',border:2
        }}} >All Downloads</Button>
        </Link>
      </Stack>
        <Tooltip title='AI powered Resume Builder for Freshers'>
          <Button color="inherit" sx={{color:'white', backgroundColor:'gray', fontWeight:600, px:5, marginLeft:3,"&:hover":{
            backgroundColor:'black',border:2
        }}}>About US</Button>
        </Tooltip>
        
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Header