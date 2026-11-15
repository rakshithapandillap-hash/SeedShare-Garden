const express = require("express");
const router = express.Router();
const db = require("../database");

function isValidDate(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
        return false;
    }

    const parsed = new Date(date + "T00:00:00Z");

    return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === date
    );
}

// 1. GET ALL LEASES WITH GARDENER AND PLOT NAMES
router.get("/", (req, res) => {
    const sql = `
        SELECT
            leases.id,
            gardeners.name AS gardener_name,
            plots.name AS plot_name,
            leases.start_date,
            leases.end_date
        FROM leases
        JOIN gardeners ON leases.gardener_id = gardeners.id
        JOIN plots ON leases.plot_id = plots.id
    `;

    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        res.status(200).json(rows);
    });
});

// 2. GET ONE LEASE
router.get("/:id", (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT
            leases.id,
            leases.gardener_id,
            leases.plot_id,
            gardeners.name AS gardener_name,
            plots.name AS plot_name,
            leases.start_date,
            leases.end_date
        FROM leases
        JOIN gardeners ON leases.gardener_id = gardeners.id
        JOIN plots ON leases.plot_id = plots.id
        WHERE leases.id = ?
    `;

    db.get(sql, [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        if (!row) {
            return res.status(404).json({ error: "Lease not found" });
        }

        res.status(200).json(row);
    });
});

// 3. CREATE LEASE
router.post("/", (req, res) => {
    const { gardener_id, plot_id, start_date, end_date } = req.body;

    if (!gardener_id || !plot_id || !start_date || !end_date) {
        return res.status(400).json({
            error: "All lease fields are required"
        });
    }

    if (!isValidDate(start_date) || !isValidDate(end_date)) {
    return res.status(400).json({
        error: "Dates must be valid and in YYYY-MM-DD format"
    });
}

if (end_date < start_date) {
    return res.status(400).json({
        error: "End date cannot be before start date"
    });
}

    db.run(
        `INSERT INTO leases
        (gardener_id, plot_id, start_date, end_date)
        VALUES (?, ?, ?, ?)`,
        [gardener_id, plot_id, start_date, end_date],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });

            res.status(201).json({
                id: this.lastID,
                gardener_id,
                plot_id,
                start_date,
                end_date
            });
        }
    );
});

// 4. UPDATE LEASE
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { gardener_id, plot_id, start_date, end_date } = req.body;

    if (!gardener_id || !plot_id || !start_date || !end_date) {
        return res.status(400).json({
            error: "All lease fields are required"
        });
    }

    if (!isValidDate(start_date) || !isValidDate(end_date)) {
    return res.status(400).json({
        error: "Dates must be valid and in YYYY-MM-DD format"
    });
}

if (end_date < start_date) {
    return res.status(400).json({
        error: "End date cannot be before start date"
    });
}

    db.run(
        `UPDATE leases
        SET gardener_id = ?, plot_id = ?, start_date = ?, end_date = ?
        WHERE id = ?`,
        [gardener_id, plot_id, start_date, end_date, id],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });

            if (this.changes === 0) {
                return res.status(404).json({ error: "Lease not found" });
            }

            res.status(200).json({
                message: "Lease updated successfully"
            });
        }
    );
});

// 5. DELETE LEASE
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM leases WHERE id = ?", [id], function (err) {
        if (err) return res.status(400).json({ error: err.message });

        if (this.changes === 0) {
            return res.status(404).json({ error: "Lease not found" });
        }

        res.status(200).json({
            message: "Lease deleted successfully"
        });
    });
});

module.exports = router;