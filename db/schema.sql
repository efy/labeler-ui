-- Task table
CREATE TABLE IF NOT EXISTS Task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- task data
    data BLOB NOT NULL,
    annotations BLOB,

    -- label template to use
    template TEXT
);
