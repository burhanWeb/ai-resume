import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateResume = async (req, res) => {
  try {
    const {
      name,
      dob,
      email,
      phone,
      jobTitle,
      experience,
      address,
      skills,
      professionalSummary,
      experienceDetails,
      education,
      projects,
      certifications,
    } = req.body;

    const prompt = `
Generate a professional resume using the details below.

Name: ${name}
Date of Birth: ${dob}
Job Title: ${jobTitle}
Years of Experience: ${experience}
Address: ${address}
Email: ${email}
Phone: ${phone}
Skills: ${skills.join(", ")}

Use the following format:

${name}
📍 ${address} | 📧 ${email} | 📞 ${phone}

Professional Summary:
${
  professionalSummary || `A ${jobTitle} with ${experience} years of experience.`
}

Experience:
${
  experienceDetails ||
  `${jobTitle} – [Company Name]
[Start Date] – [End Date or Present]
- [Project or Task]: [Impact or Achievement]
- [Additional Responsibility]
- [Additional Achievement]`
}

Skills:
${skills.map((skill) => `- ${skill}`).join("\n")}

Education:
${education || `[Degree] – [University/College Name], [Year of Graduation]`}

Projects:
${
  projects ||
  `- [Project Name]: [Feature or Solution] – [Impact]
- [Project Name]: [Technology/Product] – [Achievement]`
}

Certifications & Awards:
${
  certifications ||
  `- [Certification Name] – [Issuing Organization]
- [Award Name] – [Awarding Company] [Year Awarded]`
}

Ensure the resume is professional, concise, and well-formatted.
    `;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const summary = await result.response.text();
    res.json(summary);
  } catch (error) {
    console.error("Error generating resume:", error);
    res.status(500).json({ error: "Failed to generate resume" });
  }
};
