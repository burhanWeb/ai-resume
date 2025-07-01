# 🤖 AI Resume Builder – Smart Resume Generator using Gemini API

The **AI Resume Builder** is a full-stack web app that helps users generate professional resumes using AI. It leverages the **Google Gemini API** to suggest personalized content such as job summaries, skills, and bullet points based on user input. Users can export their resume as a clean, print-ready PDF.

---

## 🚀 Features

- ✍️ Fill in basic user and job details
- 💡 AI-powered suggestions for each section
- 📄 Real-time preview of resume
- 🖨️ Export as PDF or print directly
- 🧠 Uses Google Gemini API for content generation
- 🧰 Built with full-stack architecture (React + Node.js)

---

## 🧠 System Architecture

```txt
Frontend (React)
   ↓
User Inputs Resume Details
   ↓
Backend (Node.js + Express)
   ↓
Gemini API → Generates Text
   ↓
Returns Suggestions to UI
   ↓
PDF Export / Print Option
