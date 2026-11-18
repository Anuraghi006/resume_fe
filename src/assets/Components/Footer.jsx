import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#111',
        color: '#fff',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'flex-start' }}
        >
          {/* Brand & Description */}
          <Box sx={{ maxWidth: 400 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              AI Resume Builder
            </Typography>
            <Typography variant="body2" sx={{ color: '#bbb', lineHeight: 1.7 }}>
              Build ATS-friendly, cleanly formatted resumes in minutes. Add your
              experience, projects, and education, auto-generate role-specific
              skills and summaries, and download your CV as a ready-to-share PDF.
            </Typography>
          </Box>

          {/* Features / Highlights */}
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Features
            </Typography>
            <Stack spacing={1} sx={{ color: '#bbb' }}>
              <Typography variant="body2">Role-Based Skill &amp; Summary Generator</Typography>
              <Typography variant="body2">Live Resume Preview &amp; Editing</Typography>
              <Typography variant="body2">One-Click PDF Export</Typography>
              <Typography variant="body2">Download History &amp; Analytics</Typography>
            </Stack>
          </Box>

          {/* Contact & Social */}
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Stack spacing={1.2}>
              <Link
                href="mailto:resumebuilder@gmail.com"
                underline="hover"
                sx={{
                  color: '#bbb',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.9rem',
                  '&:hover': { color: '#fff' },
                }}
              >
                <FaEnvelope size={14} />
                resumebuilder@gmail.com
              </Link>

              <Link
                href="tel:9987522074"
                underline="hover"
                sx={{
                  color: '#bbb',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.9rem',
                  '&:hover': { color: '#fff' },
                }}
              >
                <FaPhoneAlt size={14} />
                +91 9987522074
              </Link>

              <Box sx={{ pt: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 0.5, color: '#fff' }}>
                  Connect With Us
                </Typography>
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="LinkedIn"
                    sx={{ color: '#bbb', '&:hover': { color: '#fff' } }}
                  >
                    <FaLinkedin size={18} />
                  </IconButton>
                  <IconButton
                    aria-label="GitHub"
                    sx={{ color: '#bbb', '&:hover': { color: '#fff' } }}
                  >
                    <FaGithub size={18} />
                  </IconButton>
                  <IconButton
                    aria-label="Instagram"
                    sx={{ color: '#bbb', '&:hover': { color: '#fff' } }}
                  >
                    <FaInstagram size={18} />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: '#333', my: 3 }} />

        <Typography variant="body2" align="center" sx={{ color: '#888' }}>
          © {new Date().getFullYear()} AI Resume Builder. Designed &amp; built with React and Material UI.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;