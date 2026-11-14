
const fs = require("fs");
const path = require("path");
const db = require("./database");

// Read the SQL schema
const schemaPath = path.join(
    __dirname,
    "../database/schema.sql"
);

try {
    const schema = fs.readFileSync(schemaPath, "utf8");

    // Enable foreign keys and execute schema
    db.exec(
        "PRAGMA foreign_keys = ON;\n" + schema,
        (err) => {
            if (err) {
                console.error("Database initialization failed:", err.message);
            } else {
                console.log("Database tables created successfully!");

                db.close();
            }
        }
    );
} catch (error) {
    console.error("Schema file error:", error.message);
    db.close();
}
