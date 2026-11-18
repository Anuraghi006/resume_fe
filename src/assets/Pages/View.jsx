import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  FaFileDownload,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
} from "react-icons/fa";
import { FaBackward } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import Edit from "../Components/Edit";
import {
  addToHistoryResumeAPI,
  viewResumeAPI,
  uploadToCloudinary,
} from "../../Services/apiServices";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Swal from "sweetalert2";

const formatUrl = (url) => {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

const SectionHeading = ({ title }) => (
  <Typography
    sx={{
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontWeight: "bold",
      fontSize: "0.95rem",
      textTransform: "uppercase",
      letterSpacing: "0.03em",
      borderBottom: "1px solid #000",
      pb: 0.3,
      mt: 2.2,
      mb: 1,
      color: "#000",
    }}
  >
    {title}
  </Typography>
);

const linkSx = {
  color: "#000",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  fontSize: "0.8rem",
  fontFamily: 'Georgia, "Times New Roman", serif',
  "&:hover": { textDecoration: "underline" },
};

function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState({});

  const viewResume = async (resumeId) => {
    try {
      const res = await viewResumeAPI(resumeId);
      setResume(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (id) {
      viewResume(id);
    }
  }, [id]);

  const handlePdfDownload = async () => {
    const element = document.getElementById("result");
    const canvas = await html2canvas(element, { scale: 3, useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");

    try {
      const cloudinaryResponse = await uploadToCloudinary(imgData);
      const response = await addToHistoryResumeAPI({
        ...resume,
        id: Date.now(),
        resumeId: resume.id,
        formatedDate: `${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}`,
        imageUrl: cloudinaryResponse.secure_url,
      });

      if (response.status === 201) {
        Swal.fire({
          title: "Downloaded",
          text: "Resume downloaded successfully",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Resume downloading failed",
          icon: "error",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Resume downloading failed",
        icon: "error",
      });
    }
  };

  const linkedinUrl = resume?.linkedin || resume?.linkedIn;
  const languageList = Array.isArray(resume?.languages)
    ? resume.languages
    : (resume?.languages || "")
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F5F5F5", py: 5, px: 2 }}>
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
            sx={{ color: "#7B4A2E", fontWeight: 600 }}
            onClick={handlePdfDownload}
          >
            Download CV
          </Button>

          <Edit resume={resume} setResume={setResume} />

          <Button
            startIcon={<FaBackward />}
            onClick={() => navigate("/")}
            sx={{ color: "#7B4A2E", fontWeight: 600 }}
          >
            Home
          </Button>
        </Stack>

        {/* Resume Paper */}
        <Paper
          id="result"
          elevation={4}
          sx={{
            width: "100%",
            maxWidth: 794,
            mx: "auto",
            p: { xs: 3, sm: 5 },
            borderRadius: 1,
            bgcolor: "#FFFFFF",
            color: "#000",
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              sx={{
                fontFamily: "inherit",
                fontWeight: "bold",
                fontSize: "1.75rem",
                lineHeight: 1.2,
              }}
            >
              {resume?.fullName}
            </Typography>

            {resume?.jobTitle && (
              <Typography
                sx={{
                  fontFamily: "inherit",
                  fontStyle: "italic",
                  fontSize: "1.05rem",
                  mt: 0.3,
                }}
              >
                {resume.jobTitle}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                mt: 1,
              }}
            >
              {resume?.email && (
                <Link href={`mailto:${resume.email}`} sx={linkSx}>
                  <FaEnvelope size={12} />
                  {resume.email}
                </Link>
              )}
              {resume?.contactNumber && (
                <Link href={`tel:${resume.contactNumber}`} sx={linkSx}>
                  <FaPhoneAlt size={12} />
                  {resume.contactNumber}
                </Link>
              )}
              {resume?.location && (
                <Typography sx={{ ...linkSx, "&:hover": {} }}>
                  <FaMapMarkerAlt size={12} />
                  {resume.location}
                </Typography>
              )}
              {linkedinUrl && (
                <Link
                  href={formatUrl(linkedinUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={linkSx}
                >
                  <FaLinkedin size={13} />
                  LinkedIn
                </Link>
              )}
              {resume?.github && (
                <Link
                  href={formatUrl(resume.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={linkSx}
                >
                  <FaGithub size={13} />
                  GitHub
                </Link>
              )}
              {resume?.portfolio && (
                <Link
                  href={formatUrl(resume.portfolio)}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={linkSx}
                >
                  <FaGlobe size={12} />
                  Portfolio
                </Link>
              )}
            </Box>
          </Box>

          {/* Summary */}
          {resume?.summary && (
            <>
              <SectionHeading title="Summary" />
              <Typography sx={{ fontFamily: "inherit", fontSize: "0.86rem", lineHeight: 1.5 }}>
                {resume.summary}
              </Typography>
            </>
          )}

          {/* Skills */}
          {(Array.isArray(resume?.skills)
            ? resume.skills.length > 0
            : Object.keys(resume?.skills || {}).length > 0) && (
            <>
              <SectionHeading title="Skills" />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.4, fontSize: "0.86rem" }}>
                {Array.isArray(resume.skills) ? (
                  <Typography sx={{ fontFamily: "inherit", fontSize: "inherit" }}>
                    {resume.skills.join(", ")}
                  </Typography>
                ) : (
                  Object.entries(resume.skills).map(([category, items]) => (
                    <Typography key={category} sx={{ fontFamily: "inherit", fontSize: "inherit" }}>
                      <strong>{category}:</strong>{" "}
                      {Array.isArray(items) ? items.join(", ") : items}
                    </Typography>
                  ))
                )}
              </Box>
            </>
          )}

          {/* Professional Experience */}
          {resume?.experience?.some((exp) => exp.role || exp.company) && (
            <>
              <SectionHeading title="Professional Experience" />
              {resume.experience.map((exp, idx) =>
                exp.role || exp.company ? (
                  <Box key={idx} sx={{ mb: 1.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
                      <Typography sx={{ fontFamily: "inherit", fontWeight: "bold", fontSize: "inherit" }}>
                        {exp.role}
                      </Typography>
                      <Typography sx={{ fontFamily: "inherit", fontSize: "inherit" }}>
                        {exp.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem" }}>
                      <Typography sx={{ fontFamily: "inherit", fontStyle: "italic", fontSize: "inherit" }}>
                        {exp.company}
                      </Typography>
                      <Typography sx={{ fontFamily: "inherit", fontSize: "inherit" }}>
                        {exp.location}
                      </Typography>
                    </Box>
                    {exp.description && (
                      <Typography sx={{ fontFamily: "inherit", fontSize: "0.84rem", lineHeight: 1.45, mt: 0.5 }}>
                        {exp.description}
                      </Typography>
                    )}
                  </Box>
                ) : null
              )}
            </>
          )}

          {/* Projects */}
          {resume?.projects?.some((proj) => proj.title) && (
            <>
              <SectionHeading title="Projects" />
              {resume.projects.map((proj, idx) =>
                proj.title ? (
                  <Box key={idx} sx={{ mb: 1.2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem" }}>
                      <Typography sx={{ fontFamily: "inherit", fontSize: "inherit" }}>
                        {proj.link ? (
                          <Link
                            href={formatUrl(proj.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: "#000",
                              fontWeight: "bold",
                              textDecoration: "none",
                              "&:hover": { textDecoration: "underline" },
                            }}
                          >
                            {proj.title}
                          </Link>
                        ) : (
                          <strong>{proj.title}</strong>
                        )}
                        {proj.techStack ? ` | ${proj.techStack}` : ""}
                      </Typography>
                      <Typography sx={{ fontFamily: "inherit", fontSize: "inherit" }}>
                        {proj.date}
                      </Typography>
                    </Box>
                    {proj.description && (
                      <Typography sx={{ fontFamily: "inherit", fontSize: "0.84rem", lineHeight: 1.45, mt: 0.3 }}>
                        {proj.description}
                      </Typography>
                    )}
                  </Box>
                ) : null
              )}
            </>
          )}

          {/* Certificates */}
          {resume?.certificates?.some((cert) => cert.title) && (
            <>
              <SectionHeading title="Certificates" />
              {resume.certificates.map((cert, idx) =>
                cert.title ? (
                  <Box key={idx} sx={{ mb: 1.2 }}>
                    <Typography sx={{ fontFamily: "inherit", fontWeight: "bold", fontSize: "0.86rem" }}>
                      {cert.link ? (
                        <Link
                          href={formatUrl(cert.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: "#000",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {cert.title}
                        </Link>
                      ) : (
                        cert.title
                      )}
                    </Typography>
                    {cert.description && (
                      <Typography sx={{ fontFamily: "inherit", fontSize: "0.84rem", lineHeight: 1.45, mt: 0.3 }}>
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
              <Typography sx={{ fontFamily: "inherit", fontSize: "0.86rem" }}>
                {languageList.join(" • ")}
              </Typography>
            </>
          )}

          {/* Education */}
          {(resume?.education?.some((edu) => edu.degree || edu.college) ||
            resume?.degree ||
            resume?.college) && (
            <>
              <SectionHeading title="Education" />
              {Array.isArray(resume?.education) ? (
                resume.education.map((edu, idx) =>
                  edu.degree || edu.college ? (
                    <Box key={idx} sx={{ mb: 1.2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem" }}>
                        <Typography sx={{ fontFamily: "inherit", fontWeight: "bold", fontSize: "inherit" }}>
                          {edu.degree}
                        </Typography>
                        <Typography sx={{ fontFamily: "inherit", fontSize: "inherit" }}>
                          {edu.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem" }}>
                        <Typography sx={{ fontFamily: "inherit", fontStyle: "italic", fontSize: "inherit" }}>
                          {edu.college}
                        </Typography>
                        <Typography sx={{ fontFamily: "inherit", fontSize: "inherit" }}>
                          {edu.location}
                        </Typography>
                      </Box>
                      {edu.description && (
                        <Typography sx={{ fontFamily: "inherit", fontSize: "0.84rem", lineHeight: 1.45, mt: 0.3 }}>
                          {edu.description}
                        </Typography>
                      )}
                    </Box>
                  ) : null
                )
              ) : (
                <Box sx={{ mb: 1.2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.86rem" }}>
                    <Typography sx={{ fontFamily: "inherit", fontWeight: "bold", fontSize: "inherit" }}>
                      {resume?.degree}
                    </Typography>
                    <Typography sx={{ fontFamily: "inherit", fontSize: "inherit" }}>
                      {resume?.year}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontFamily: "inherit", fontStyle: "italic", fontSize: "0.86rem" }}>
                    {resume?.college}
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default View;