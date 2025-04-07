import express from "express";

const arduino = express.Router();

arduino.post("/data", (req, res) => {
  const { length, breadth, height, volume } = req.body;

  console.log("Received Data:");
  console.log(`Length: ${length} cm`);
  console.log(`Breadth: ${breadth} cm`);
  console.log(`Height: ${height} cm`);
  console.log(`Volume: ${volume} cm³`);

  res.status(200).send("Data received successfully");
});

export default arduino;
