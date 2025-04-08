import express from "express";
import axios from "axios";

const arduino = express.Router();

let latestData = {
  length: 30,
  breadth: 20,
  height: 10,
  volume: 6000,
};

arduino.get("/data", (req, res) => {
  res.status(200).json(latestData);
});

arduino.post("/data", (req, res) => {
  const { length, breadth, height, volume } = req.body;

  if (
    typeof length !== "number" ||
    typeof breadth !== "number" ||
    typeof height !== "number" ||
    typeof volume !== "number"
  ) {
    return res.status(400).send("Invalid data. All fields must be numbers.");
  }

  // Save latest data
  latestData = { length, breadth, height, volume };

  console.log("Data updated:", latestData);
  res.status(200).send("Data received successfully");
});

const ESP32_IP = "http://192.168.43.216";

arduino.get("/fetch", async (req, res) => {
  try {
    const response = await axios.get(`${ESP32_IP}/trigger`);
    const { length, breadth, height, volume } = response.data;

    if (
      typeof length !== "number" ||
      typeof breadth !== "number" ||
      typeof height !== "number" ||
      typeof volume !== "number"
    ) {
      return res.status(400).send("Invalid data from ESP32");
    }

    res.status(200).json({ length, breadth, height, volume });
  } catch (err) {
    console.error("Error fetching ESP32 data:", err.message);
    res.status(500).send("Failed to fetch data from ESP32");
  }
});

export default arduino;
