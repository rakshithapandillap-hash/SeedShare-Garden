
const db = require("../config/database");

// Validate date format and actual calendar date
const isValidDate = (date) => {
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return false;
    }

    const parsed = new Date(`${date}T00:00:00.000Z`);

    return !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === date;
};

// GET all leases with gardener and plot details (INNER JOIN)
exports.getAllLeases = (req, res) => {
    const sql = `
        SELECT
            leases.*,
            gardeners.name AS gardener_name,
            gardeners.email AS gardener_email,
            plots.name AS plot_name,
            plots.soil_type
        FROM leases
        INNER JOIN gardeners
            ON leases.gardener_id = gardeners.id
        INNER JOIN plots
            ON leases.plot_id = plots.id
        ORDER BY leases.id DESC
    `;

    db.all(sql, [], (err, rows) => {
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

// GET lease by ID
exports.getLeaseById = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid lease ID"
        });
    }

    db.get(
        "SELECT * FROM leases WHERE id = ?",
        [id],
        (err, lease) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (!lease) {
                return res.status(404).json({
                    success: false,
                    message: "Lease not found"
                });
            }

            res.status(200).json({
                success: true,
                data: lease
            });
        }
    );
};

// CREATE lease
exports.createLease = (req, res) => {
    const { gardener_id, plot_id, start_date, end_date } = req.body;

    if (
        !Number.isInteger(gardener_id) ||
        gardener_id <= 0 ||
        !Number.isInteger(plot_id) ||
        plot_id <= 0 ||
        !isValidDate(start_date) ||
        !isValidDate(end_date) ||
        start_date > end_date
    ) {
        return res.status(400).json({
            success: false,
            message: "Valid gardener, plot and lease dates are required"
        });
    }

    db.run(
        `INSERT INTO leases
         (gardener_id, plot_id, start_date, end_date)
         VALUES (?, ?, ?, ?)`,
        [gardener_id, plot_id, start_date, end_date],
        function (err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Lease created successfully",
                data: {
                    id: this.lastID,
                    gardener_id,
                    plot_id,
                    start_date,
                    end_date
                }
            });
        }
    );
};

// UPDATE lease
exports.updateLease = (req, res) => {
    const id = Number(req.params.id);
    const { gardener_id, plot_id, start_date, end_date } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid lease ID"
        });
    }

    if (
        !Number.isInteger(gardener_id) ||
        gardener_id <= 0 ||
        !Number.isInteger(plot_id) ||
        plot_id <= 0 ||
        !isValidDate(start_date) ||
        !isValidDate(end_date) ||
        start_date > end_date
    ) {
        return res.status(400).json({
            success: false,
            message: "Valid lease details are required"
        });
    }

    db.run(
        `UPDATE leases
         SET gardener_id = ?,
             plot_id = ?,
             start_date = ?,
             end_date = ?
         WHERE id = ?`,
        [gardener_id, plot_id, start_date, end_date, id],
        function (err) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Lease not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Lease updated successfully"
            });
        }
    );
};

// DELETE lease
exports.deleteLease = (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: "Invalid lease ID"
        });
    }

    db.run(
        "DELETE FROM leases WHERE id = ?",
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
                    message: "Lease not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Lease deleted successfully"
            });
        }
    );
};
