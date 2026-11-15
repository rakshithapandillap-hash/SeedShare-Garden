const express = require("express");
const router = express.Router();
const db = require("../database");

// 1. GET ALL GARDENERS
router.get("/", (req, res) => {
    db.all("SELECT * FROM gardeners", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
});

// 2. GET ONE GARDENER
router.get("/:id", (req, res) => {
    const { id } = req.params;

    db.get("SELECT * FROM gardeners WHERE id = ?", [id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Gardener not found" });

        res.status(200).json(row);
    });
});

// 3. ADD GARDENER
router.post("/", (req, res) => {
    const { name, email } = req.body;

    if (!name || !name.trim() || !email || !email.trim()) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    db.run(
        "INSERT INTO gardeners (name, email) VALUES (?, ?)",
        [name.trim(), email.trim()],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });

            res.status(201).json({
                id: this.lastID,
                name: name.trim(),
                email: email.trim()
            });
        }
    );
});

// 4. UPDATE GARDENER
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !name.trim() || !email || !email.trim()) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    db.run(
        "UPDATE gardeners SET name = ?, email = ? WHERE id = ?",
        [name.trim(), email.trim(), id],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            if (this.changes === 0) {
                return res.status(404).json({ error: "Gardener not found" });
            }

            res.status(200).json({ message: "Gardener updated successfully" });
        }
    );
});

// 5. DELETE GARDENER
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    db.run("DELETE FROM gardeners WHERE id = ?", [id], function (err) {
        if (err) return res.status(400).json({ error: err.message });
        if (this.changes === 0) {
            return res.status(404).json({ error: "Gardener not found" });
        }

        res.status(200).json({ message: "Gardener deleted successfully" });
    });
});

module.exports = router;