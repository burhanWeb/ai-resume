import express from "express";
import ResumeRoutes from "./Routes/ResumeRoutes.js";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/resume", ResumeRoutes);
const start = async () => {
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
};

start();
