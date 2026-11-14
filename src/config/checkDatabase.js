
const db = require("./database");

console.log("\n--- DATABASE TABLES ---");

db.all(
    "SELECT name, sql FROM sqlite_master WHERE type = 'table'",
    [],
    (err, tables) => {
        if (err) {
            console.error(err.message);
            return db.close();
        }

        console.log(tables);

        console.log("\n--- LEASE FOREIGN KEYS ---");

        db.all("PRAGMA foreign_key_list(leases)", [], (err, keys) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log(keys);
            }

            db.close();
        });
    }
);
