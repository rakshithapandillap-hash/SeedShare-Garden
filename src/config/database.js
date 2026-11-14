
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database file location
const dbPath = path.join(
    __dirname,
    "../database/seedshare.db"
);

// Connect to SQLite
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to SeedShare Garden SQLite database!");
    }
});

// Enable foreign key constraints
db.run("PRAGMA foreign_keys = ON");

module.exports = db;
