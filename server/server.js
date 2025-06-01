import express from "express";
import ResumeRoutes from "./Routes/ResumeRoutes.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "https://ai-resume-dev.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/resume", ResumeRoutes);
const start = async () => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

start();
