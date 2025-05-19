import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import courier from "./routes/courier.route.js";
import arduino from "./routes/arduino.route.js";

dotenv.config();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedDomains = [
        /^https:\/\/.*\.magicscale\.in$/,
        "http://localhost:5173",
        "https://auth-ivory-omega.vercel.app",
        "https://zomato.magicscale.in",
        "https://auth.magicscale.in",
        "https://iot-project-self.vercel.app",
        "https://packlytics.vercel.app",
      ];
      if (
        allowedDomains.some((pattern) =>
          typeof pattern === "string"
            ? pattern === origin
            : pattern.test(origin)
        ) ||
        !origin
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.set("view engine", "ejs");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/courier", courier);
app.use("/api/arduino", arduino);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
