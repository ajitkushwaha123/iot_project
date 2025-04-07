import express from "express";
import axios from "axios";

const courier = express.Router();

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYyMzE4NzUsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzQ0ODI4ODAxLCJqdGkiOiJsVExXMVpyd2hRSlY1WHJUIiwiaWF0IjoxNzQzOTY0ODAxLCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTc0Mzk2NDgwMSwiY2lkIjo2MDE1MTkxLCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.Z6_1nEqblhQJ8t4RKjT1xS0yZpA1iiQviiXOa0y6hYk";

courier.get("/all", async (req, res) => {
  try {
    const response = await axios.get(
      "https://apiv2.shiprocket.in/v1/external/courier/courierListWithCounts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
});

courier.get("/get-pricing", async (req, res) => {
  const { cod, pickup_postcode, delivery_postcode, weight } = req.query;
  let isCod = 0;
  if (cod == true) {
    isCod = 1;
  }

  try {
    const response = await axios.get(
      "https://apiv2.shiprocket.in/v1/external/courier/serviceability/",
      {
        params: {
          cod: isCod,
          pickup_postcode,
          delivery_postcode,
          weight,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (err) {
    console.error(err?.response?.data || err);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
});

export default courier;
