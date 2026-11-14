
const db = require("../config/database");

// GET all gardeners
exports.getAllGardeners = (req, res) => {
    db.all("SELECT * FROM gardeners ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    });
};

// GET gardener by ID
exports.getGardenerById = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid gardener ID"
        });
    }

    db.get(
        "SELECT * FROM gardeners WHERE id = ?",
        [id],
        (err, gardener) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (!gardener) {
                return res.status(404).json({
                    success: false,
                    message: "Gardener not found"
                });
            }

            res.status(200).json({
                success: true,
                data: gardener
            });
        }
    );
};

// POST new gardener
exports.createGardener = (req, res) => {
    const { name, email } = req.body;

    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
        return res.status(400).json({
            success: false,
            message: "Valid name and email are required"
        });
    }

    db.run(
        "INSERT INTO gardeners (name, email) VALUES (?, ?)",
        [name.trim(), email.trim().toLowerCase()],
        function (err) {
            if (err) {
                if (err.code === "SQLITE_CONSTRAINT") {
                    return res.status(409).json({
                        success: false,
                        message: "Email already exists"
                    });
                }

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Gardener created successfully",
                data: {
                    id: this.lastID,
                    name: name.trim(),
                    email: email.trim().toLowerCase()
                }
            });
        }
    );
};

// PUT update gardener
exports.updateGardener = (req, res) => {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid gardener ID"
        });
    }

    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof email !== "string" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
        return res.status(400).json({
            success: false,
            message: "Valid name and email are required"
        });
    }

    db.run(
        `UPDATE gardeners
         SET name = ?, email = ?
         WHERE id = ?`,
        [name.trim(), email.trim().toLowerCase(), id],
        function (err) {
            if (err) {
                if (err.code === "SQLITE_CONSTRAINT") {
                    return res.status(409).json({
                        success: false,
                        message: "Email already exists"
                    });
                }

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Gardener not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Gardener updated successfully"
            });
        }
    );
};

// DELETE gardener
exports.deleteGardener = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid gardener ID"
        });
    }

    db.run(
        "DELETE FROM gardeners WHERE id = ?",
        [id],
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Gardener not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Gardener deleted successfully"
            });
        }
    );
};
