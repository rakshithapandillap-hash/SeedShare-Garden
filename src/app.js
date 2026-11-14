const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Database connection
require("./config/database");

// Import routes
const gardenersRoutes = require("./routes/gardenersRoutes");
const leasesRoutes = require("./routes/leasesRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Welcome endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to SeedShare Garden API 🌱"
    });
});

// Health endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy"
    });
});

// Gardeners endpoints
app.use("/gardeners", gardenersRoutes);
app.use("/leases", leasesRoutes);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "127.0.0.1", () => {
    console.log(`SeedShare Garden API running on port ${PORT}`);
});
