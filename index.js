const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const IpModel = require("./model/ip");
const app = express();
const PORT = 8080;

connectDB();

app.use(cors());

app.use(express.json());

app.get("/api/ip", async (req, res) => { 
  try {
    const ipRecord = await IpModel.findOne();
    console.log(ipRecord);

    if (ipRecord && ipRecord.ip) {
      const ip = ipRecord.ip;
      const url = ip; 
      return res.json({ url: url, message: `URL received: ${url}` });
    } else {
      return res
        .status(404)
        .json({ message: "No IP address found in the database" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});


// ----------------------------------------------------------------

// app.get('/api/ip', (req, res) => {
//     // const url = "https://kavach-api-prod-test.onrender.com";
//     // const url = "https://webcast-range-resident-vietnam.trycloudflare.com";
//     const url = "https://bhartisofttech.co.in";
//     // const url = "http://192.168.68.136:5001";
//     // const url = "https://kavach-api-prod-test-z1x4.onrender.com";
//     try {
//         res.json({ url: url, message: `URL received: ${url}` });
//     } catch (error) {
//         res.status(500).json({ message: 'An error occurred', error: error.message });
//     }
// });

// -----------------------------------------------------------------

app.post("/api/url", async (req, res) => {
  try {
    const { ip } = req.body;

    if (!ip) {
      return res.status(400).json({ message: "IP URL is required" });
    }

    const newIpRecord = new IpModel({ ip });

    await newIpRecord.save();

    res
      .status(201)
      .json({ message: "URL successfully saved", ip: newIpRecord });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on >> http://localhost:${PORT}`);
});

module.exports = app;
