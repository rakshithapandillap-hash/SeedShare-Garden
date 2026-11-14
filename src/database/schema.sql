
-- =====================================
-- SEEDSHARE GARDEN DATABASE
-- =====================================

-- GARDENERS TABLE
CREATE TABLE IF NOT EXISTS gardeners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- LEASES TABLE
CREATE TABLE IF NOT EXISTS leases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    gardener_id INTEGER NOT NULL,
    plot_id INTEGER NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,

    FOREIGN KEY (gardener_id)
        REFERENCES gardeners(id)
        ON DELETE CASCADE,

    FOREIGN KEY (plot_id)
        REFERENCES plots(id)
        ON DELETE RESTRICT,

    CHECK (date(end_date) >= date(start_date))
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_leases_gardener
ON leases(gardener_id);

CREATE INDEX IF NOT EXISTS idx_leases_plot
ON leases(plot_id);
-- GARDEN PLOTS TABLE
CREATE TABLE IF NOT EXISTS plots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    soil_type TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);