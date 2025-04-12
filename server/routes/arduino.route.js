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
  // const { length, breadth, height, volume } = req.body;
  let length = 10,
    breadth = 10,
    height = 10,
    volume = 10;

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
  res.status(200).send(latestData);
});

const ESP32_IP = "https://bf85-139-5-240-78.ngrok-free.app";

arduino.get("/fetch", async (req, res) => {
  try {
    // console.log(`${server_url}/data`);
    const response = await axios.get(
      `https://iot-project-fk1c.onrender.com/api/arduino/data`
    );
    console.log("response ", response);

    console.log("response", response);

    const { length, breadth, height } = response.data;

    // ✅ Send actual response
    res.status(200).json({ length, breadth, height, isFallback: false });
  } catch (err) {
    console.error("❌ Error or timeout fetching ESP32 data:", err.message);

    // ⛑️ Return fallback if ESP32 is not reachable in 5s
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

// arduino.get("/fetch", async (req, res) => {
//   try {
//     const response = await axios.get(`${ESP32_IP}/measure`);

//     console.log("response", response);

//     const { length, breadth, height } = response.data;

//     // ✅ Send actual response
//     res.status(200).json({ length, breadth, height, isFallback: false });
//   } catch (err) {
//     console.error("❌ Error or timeout fetching ESP32 data:", err.message);

//     // ⛑️ Return fallback if ESP32 is not reachable in 5s
//     return res.status(200).json({
//       length: 14.8,
//       breadth: 6.28,
//       height: 4.98,
//       volume: 14.8 * 6.28 * 4.98,
//       isFallback: true,
//     });
//   }
// });

export default arduino;
