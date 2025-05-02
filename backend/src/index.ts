import cors from "cors";
import express, { Request, Response } from "express";

import { AppDataSource } from "./config/database";

import dotenv from "dotenv";
import { authRoutes } from "./routes/authRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { userRoutes } from "./routes/userRoutes";
import { courseRoutes } from "./routes/courseRoutes";
import { lessonRoutes } from "./routes/lessonRoutes";
import { commentRoutes } from "./routes/commentRoutes";
import { quizRoutes } from "./routes/quizRoutes";
import { enrollRoutes } from "./routes/enrollmentRoutes";
// import { categoryRoutes } from "./routes/categoryRoutes";
import { questionRoutes } from "./routes/questionRoutes";
import { reviewRoutes } from "./routes/reviewRoutes";
import { progressRoutes } from "./routes/progressRoutes";
import { errorMiddleware } from "./middleware/error-middleware";
import { authenticateUser } from "./middleware/middleware";

const app = express();

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-type", "Authorization"],
  })
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/course", courseRoutes);
// app.use('/category',categoryRoutes)
app.use("/lesson", lessonRoutes);
app.use("/comment", commentRoutes);
app.use("/quiz", quizRoutes);
app.use("/enrollment", enrollRoutes);
app.use("/review", reviewRoutes);
app.use("/question", questionRoutes);
app.use("/progress", progressRoutes);

// app.use(errorMiddleware)

// const admin= new AdminService()
AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, () => {
      console.log("Server running!");
      // admin.initializeAdmin();
    });
  })
  .catch((error: any) => {
    console.log("Error occured while initializing: ", error);
  });
