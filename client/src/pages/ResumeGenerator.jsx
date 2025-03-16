import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Grid2,
} from "@mui/material";
import customFetch from "../../utils/axios";

const fields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "phone", label: "Phone Number", type: "tel" },
  { name: "jobTitle", label: "Job Title", type: "text" },
  { name: "experience", label: "Years of Experience", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "skills", label: "Skills (comma separated)", type: "text" },
  {
    name: "professionalSummary",
    label: "Professional Summary",
    type: "multiline",
  },
  { name: "experienceDetails", label: "Experience Details", type: "multiline" },
  {
    name: "education",
    label:
      "Education (e.g., [Degree] – [University/College Name], [Year of Graduation])",
    type: "multiline",
  },
  {
    name: "projects",
    label:
      "Projects (e.g., [Project Name] – Developed [Feature or Solution] that improved [Impact])",
    type: "multiline",
  },
  {
    name: "certifications",
    label:
      "Certifications & Awards (e.g., [Certification Name] – [Issuing Organization])",
    type: "multiline",
  },
];

const ResumeGenerator = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    jobTitle: "",
    experience: "",
    address: "",
    skills: "",
    professionalSummary: "",
    experienceDetails: "",
    education: "",
    projects: "",
    certifications: "",
  });
  const [generatedResume, setGeneratedResume] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const resumeRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateResume = async () => {
    try {
      setLoading(true);
      setGeneratedResume("");
      const response = await customFetch.post("/resume/generate", {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
      });
      setGeneratedResume(response.data);
    } catch (error) {
      console.error("Error generating resume:", error);
      alert("Failed to generate resume");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!resumeRef.current) return;

    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });
    const margin = 15;
    let y = margin;

    pdf.setFont("helvetica");
    pdf.setFontSize(18);
    pdf.text("RESUME", pdf.internal.pageSize.getWidth() / 2, y, {
      align: "center",
    });
    pdf.setFontSize(12);
    y += 8;

    const addSection = (title, content) => {
      if (y > 270) {
        pdf.addPage();
        y = margin;
      }
      pdf.setFont("helvetica", "bold");
      pdf.text(title, margin, y);
      y += 5;
      pdf.setFont("helvetica", "normal");
      const textLines = pdf.splitTextToSize(content, 180);
      pdf.text(textLines, margin, y);
      y += textLines.length * 6 + 4;
    };

    addSection("Name", formData.name);
    addSection("Date of Birth", formData.dob);
    addSection("Email", formData.email);
    addSection("Phone", formData.phone);
    addSection("Address", formData.address);
    addSection("Job Title", formData.jobTitle);
    addSection("Experience", `${formData.experience} years`);
    addSection("Skills", formData.skills.split(",").join(" | "));
    addSection("Professional Summary", formData.professionalSummary);
    addSection("Education", formData.education);
    addSection("Projects", formData.projects);
    addSection("Certifications", formData.certifications);

    pdf.save("resume.pdf");
  };

  return (
    <Box sx={{ py: 4, maxWidth: "sm", margin: "auto" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        AI Resume Generator
      </Typography>

      <Grid2 container direction="column" spacing={2}>
        {fields.map((field) => (
          <Grid2 item key={field.name}>
            <TextField
              fullWidth
              label={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              margin="normal"
              type={field.type !== "multiline" ? field.type : "text"}
              multiline={field.type === "multiline"}
              rows={field.type === "multiline" ? 4 : undefined}
            />
          </Grid2>
        ))}
      </Grid2>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateResume}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Generate Resume"
          )}
        </Button>
      </Box>

      {generatedResume && (
        <Box
          ref={resumeRef}
          sx={{
            mt: 3,
            p: 2,
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={8}
              value={generatedResume}
              onChange={(e) => setGeneratedResume(e.target.value)}
              variant="outlined"
            />
          ) : (
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {generatedResume}
            </Typography>
          )}
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "Save Changes" : "Edit Resume"}
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleDownloadPdf}
            >
              Download PDF
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ResumeGenerator;
