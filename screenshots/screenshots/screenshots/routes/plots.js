const express = require("express");
const router = express.Router();
const db = require("../database");

// GET AVAILABLE PLOTS ON A PARTICULAR DATE
router.get("/available", (req, res) => {
    const { date } = req.query;

    // Validate date
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({
            error: "Valid date is required in YYYY-MM-DD format"
        });
    }

    // Check whether the date actually exists
    const parsedDate = new Date(date + "T00:00:00Z");

    if (
        Number.isNaN(parsedDate.getTime()) ||
        parsedDate.toISOString().slice(0, 10) !== date
    ) {
        return res.status(400).json({
            error: "Invalid calendar date"
        });
    }

    const sql = `
        SELECT *
        FROM plots
        WHERE id NOT IN (
            SELECT plot_id
            FROM leases
            WHERE start_date <= ?
            AND end_date >= ?
        )
    `;

    db.all(sql, [date, date], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json(rows);
    });
});

// 1. GET ALL PLOTS + SEARCH BY SOIL
router.get("/", (req, res) => {
    const { soil } = req.query;

    let sql = "SELECT * FROM plots";
    let params = [];

    if (soil) {
        sql += " WHERE soil = ?";
        params.push(soil);
    }

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(rows);
    });
});

// 2. GET ONE PLOT
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM plots WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        if (!row) {
            return res.status(404).json({ error: "Plot not found" });
        }

        res.status(200).json(row);
    });
});

// 3. ADD NEW PLOT
router.post("/", (req, res) => {
    const { name, soil } = req.body;

    if (!name || !name.trim() || !soil || !soil.trim()) {
        return res.status(400).json({
            error: "Plot name and soil type are required"
        });
    }

    db.run(
        "INSERT INTO plots (name, soil) VALUES (?, ?)",
        [name.trim(), soil.trim()],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });

            res.status(201).json({
                id: this.lastID,
                name: name.trim(),
                soil: soil.trim()
            });
        }
    );
});

// 4. UPDATE PLOT
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, soil } = req.body;

    if (!name || !name.trim() || !soil || !soil.trim()) {
        return res.status(400).json({
            error: "Plot name and soil type are required"
        });
    }

    db.run(
        "UPDATE plots SET name = ?, soil = ? WHERE id = ?",
        [name.trim(), soil.trim(), id],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ error: "Plot not found" });
            }

            res.status(200).json({
                message: "Plot updated successfully"
            });
        }
    );
});

// 5. DELETE PLOT
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM plots WHERE id = ?", [id], function (err) {
        if (err) return res.status(400).json({ error: err.message });

        if (this.changes === 0) {
            return res.status(404).json({ error: "Plot not found" });
        }

        res.status(200).json({
            message: "Plot deleted successfully"
        });
    });
});

module.exports = router;