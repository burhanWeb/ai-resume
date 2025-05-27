import express from "express";
import ResumeRoutes from "./Routes/ResumeRoutes.js";
import cors from "cors";
const app = express();

app.use(
  cors({
<<<<<<< HEAD
    origin: "http://localhost:5174",
=======
    origin: "http://localhost:5173",
>>>>>>> 99436b0bbaf9e5582fbed4fc3e6505a91c0bb242
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/resume", ResumeRoutes);
const start = async () => {
<<<<<<< HEAD
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
=======
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
>>>>>>> 99436b0bbaf9e5582fbed4fc3e6505a91c0bb242
  });
};

start();
