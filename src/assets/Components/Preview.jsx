import React from 'react';
import { Box, Link, Paper, Typography } from '@mui/material';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
} from 'react-icons/fa';

const formatUrl = (url) => {
  if (!url) return '';
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const SectionHeading = ({ title }) => (
  <Typography
    sx={{
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: 'bold',
      fontSize: '0.85rem',
      textTransform: 'uppercase',
      letterSpacing: '0.03em',
      borderBottom: '1px solid #000',
      pb: 0.3,
      mt: 2,
      mb: 1,
      color: '#000',
    }}
  >
    {title}
  </Typography>
);

const linkSx = {
  color: '#000',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  fontSize: '0.72rem',
  '&:hover': { textDecoration: 'underline' },
};

function Preview({ resumeDetails }) {
  const {
    fullName,
    jobTitle,
    email,
    contactNumber,
    location,
    linkedin,
    github,
    portfolio,
    summary,
    skillCategories = {},
    skills = [],
    experience = [],
    projects = [],
    certificates = [],
    languages,
    education = [],
  } = resumeDetails || {};

  const languageList = Array.isArray(languages)
    ? languages
    : (languages || '')
        .split(',')
        .map((l) => l.trim())
        .filter(Boolean);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 680,
          minHeight: 820,
          p: 4,
          borderRadius: 1,
          bgcolor: '#fff',
          color: '#000',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 1.5 }}>
          <Typography
            sx={{
              fontFamily: 'inherit',
              fontWeight: 'bold',
              fontSize: '1.45rem',
              lineHeight: 1.2,
            }}
          >
            {fullName}
          </Typography>
          {jobTitle && (
            <Typography
              sx={{
                fontFamily: 'inherit',
                fontStyle: 'italic',
                fontSize: '0.92rem',
                mt: 0.3,
              }}
            >
              {jobTitle}
            </Typography>
          )}

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1.8,
              mt: 0.8,
            }}
          >
            {email && (
              <Link href={`mailto:${email}`} sx={linkSx}>
                <FaEnvelope size={11} />
                {email}
              </Link>
            )}
            {contactNumber && (
              <Link href={`tel:${contactNumber}`} sx={linkSx}>
                <FaPhoneAlt size={11} />
                {contactNumber}
              </Link>
            )}
            {location && (
              <Typography sx={{ ...linkSx, '&:hover': {} }}>
                <FaMapMarkerAlt size={11} />
                {location}
              </Typography>
            )}
            {linkedin && (
              <Link
                href={formatUrl(linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                sx={linkSx}
              >
                <FaLinkedin size={12} />
                LinkedIn
              </Link>
            )}
            {github && (
              <Link
                href={formatUrl(github)}
                target="_blank"
                rel="noopener noreferrer"
                sx={linkSx}
              >
                <FaGithub size={12} />
                GitHub
              </Link>
            )}
            {portfolio && (
              <Link
                href={formatUrl(portfolio)}
                target="_blank"
                rel="noopener noreferrer"
                sx={linkSx}
              >
                <FaGlobe size={11} />
                Portfolio
              </Link>
            )}
          </Box>
        </Box>

        {/* Summary */}
        {summary && (
          <>
            <SectionHeading title="Summary" />
            <Typography sx={{ fontFamily: 'inherit', fontSize: '0.78rem', lineHeight: 1.45 }}>
              {summary}
            </Typography>
          </>
        )}

        {/* Skills */}
        {(skillCategories.frontend ||
          skillCategories.apis ||
          skillCategories.backend ||
          skillCategories.tools ||
          skills.length > 0) && (
          <>
            <SectionHeading title="Skills" />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.35, fontSize: '0.78rem' }}>
              {skillCategories.frontend && (
                <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                  <strong>Frontend:</strong> {skillCategories.frontend}
                </Typography>
              )}
              {skillCategories.apis && (
                <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                  <strong>APIs &amp; Data:</strong> {skillCategories.apis}
                </Typography>
              )}
              {skillCategories.backend && (
                <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                  <strong>Backend:</strong> {skillCategories.backend}
                </Typography>
              )}
              {skillCategories.tools && (
                <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                  <strong>Tools:</strong> {skillCategories.tools}
                </Typography>
              )}
              {skills.length > 0 && (
                <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                  <strong>Additional Skills:</strong> {skills.join(', ')}
                </Typography>
              )}
            </Box>
          </>
        )}

        {/* Professional Experience */}
        {experience.some((exp) => exp.role || exp.company) && (
          <>
            <SectionHeading title="Professional Experience" />
            {experience.map((exp, idx) =>
              exp.role || exp.company ? (
                <Box key={idx} sx={{ mb: 1.2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <Typography sx={{ fontFamily: 'inherit', fontWeight: 'bold', fontSize: 'inherit' }}>
                      {exp.role}
                    </Typography>
                    <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                      {exp.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <Typography sx={{ fontFamily: 'inherit', fontStyle: 'italic', fontSize: 'inherit' }}>
                      {exp.company}
                    </Typography>
                    <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                      {exp.location}
                    </Typography>
                  </Box>
                  {exp.description && (
                    <Typography sx={{ fontFamily: 'inherit', fontSize: '0.76rem', lineHeight: 1.4, mt: 0.4 }}>
                      {exp.description}
                    </Typography>
                  )}
                </Box>
              ) : null
            )}
          </>
        )}

        {/* Projects */}
        {projects.some((proj) => proj.title) && (
          <>
            <SectionHeading title="Projects" />
            {projects.map((proj, idx) =>
              proj.title ? (
                <Box key={idx} sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                      {proj.link ? (
                        <Link
                          href={formatUrl(proj.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: '#000', fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                          {proj.title}
                        </Link>
                      ) : (
                        <strong>{proj.title}</strong>
                      )}
                      {proj.techStack ? ` | ${proj.techStack}` : ''}
                    </Typography>
                    <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                      {proj.date}
                    </Typography>
                  </Box>
                  {proj.description && (
                    <Typography sx={{ fontFamily: 'inherit', fontSize: '0.76rem', lineHeight: 1.4, mt: 0.2 }}>
                      {proj.description}
                    </Typography>
                  )}
                </Box>
              ) : null
            )}
          </>
        )}

        {/* Certificates */}
        {certificates.some((cert) => cert.title) && (
          <>
            <SectionHeading title="Certificates" />
            {certificates.map((cert, idx) =>
              cert.title ? (
                <Box key={idx} sx={{ mb: 1 }}>
                  <Typography sx={{ fontFamily: 'inherit', fontWeight: 'bold', fontSize: '0.78rem' }}>
                    {cert.link ? (
                      <Link
                        href={formatUrl(cert.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: '#000', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        {cert.title}
                      </Link>
                    ) : (
                      cert.title
                    )}
                  </Typography>
                  {cert.description && (
                    <Typography sx={{ fontFamily: 'inherit', fontSize: '0.76rem', lineHeight: 1.4, mt: 0.2 }}>
                      {cert.description}
                    </Typography>
                  )}
                </Box>
              ) : null
            )}
          </>
        )}

        {/* Languages */}
        {languageList.length > 0 && (
          <>
            <SectionHeading title="Languages" />
            <Typography sx={{ fontFamily: 'inherit', fontSize: '0.78rem' }}>
              {languageList.join(' • ')}
            </Typography>
          </>
        )}

        {/* Education */}
        {education.some((edu) => edu.degree || edu.college) && (
          <>
            <SectionHeading title="Education" />
            {education.map((edu, idx) =>
              edu.degree || edu.college ? (
                <Box key={idx} sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <Typography sx={{ fontFamily: 'inherit', fontWeight: 'bold', fontSize: 'inherit' }}>
                      {edu.degree}
                    </Typography>
                    <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                      {edu.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <Typography sx={{ fontFamily: 'inherit', fontStyle: 'italic', fontSize: 'inherit' }}>
                      {edu.college}
                    </Typography>
                    <Typography sx={{ fontFamily: 'inherit', fontSize: 'inherit' }}>
                      {edu.location}
                    </Typography>
                  </Box>
                  {edu.description && (
                    <Typography sx={{ fontFamily: 'inherit', fontSize: '0.76rem', lineHeight: 1.4, mt: 0.3 }}>
                      {edu.description}
                    </Typography>
                  )}
                </Box>
              ) : null
            )}
          </>
        )}
      </Paper>
    </Box>
  );
}

export default Preview;