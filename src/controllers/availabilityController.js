
const db = require("../config/database");

// Validate date format and actual calendar date
const isValidDate = (date) => {
    if (
        typeof date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {
        return false;
    }

    const parsed = new Date(`${date}T00:00:00.000Z`);

    return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === date
    );
};

// GET plots available on a requested date
exports.getAvailablePlots = (req, res) => {
    const { date } = req.query;

    // Validate requested date
    if (!isValidDate(date)) {
        return res.status(400).json({
            success: false,
            message: "A valid date in YYYY-MM-DD format is required"
        });
    }

    // Find plots that do not have an active lease on the requested date
    const sql = `
        SELECT
            p.id,
            p.name,
            p.soil_type,
            p.details
        FROM plots p
        WHERE NOT EXISTS (
            SELECT 1
            FROM leases l
            WHERE l.plot_id = p.id
              AND date(l.start_date) <= date(?)
              AND date(l.end_date) >= date(?)
        )
        ORDER BY p.id ASC
    `;

    db.all(sql, [date, date], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        return res.status(200).json({
            success: true,
            date: date,
            count: rows.length,
            availablePlots: rows
        });
    });
};
