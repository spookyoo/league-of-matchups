"use strict";

require("dotenv").config();

const cors = require("cors");
const express = require("express");
const sqldb = require("mysql2");

const PORT = 3000;
const HOST = "0.0.0.0";
const app = express();

app.use(express.json());
app.use(cors());

console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASSWORD);

const db = sqldb.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// CHECK DB CONNECTION, EXIT IF ERROR
db.connect((err) => {
    if (err) {
        console.error("ERROR CONNECTING TO DB", err);
        process.exit(1);
    }
    console.log("CONNECTED TO DB");
    createTables(db)
});

const createTables = (db) => {
    // MATCHUP TABLES
    db.query(
        `CREATE TABLE IF NOT EXISTS matchups (
            id INT AUTO_INCREMENT PRIMARY KEY,
            playerId INT NOT NULL,
            opponentId INT NOT NULL,
            difficulty TINYINT UNSIGNED NOT NULL CHECK (difficulty BETWEEN 1 AND 9),
            UNIQUE (playerId, opponentId)
    )`,
    (err, result) => {
        if (err) console.error("ERROR CREATING matchup TABLE", err);
        else console.log("MATCHUPS TABLE CREATED");
    }
    );
}

app.get("/matchups", (req, res) => {
    const playerId = req.query.playerdId;

    if (!playerId) {
        return res.status(400).json({ error: "MISSING ID" });
    }

    db.query("SELECT opponentName, difficulty FROM matchups WHERE playerId = ?", [playerId], (err, results) => {
        if (err) {
            console.error("ERROR FETCHING matchups", err);
            return res.status(500).json({error: "DATABASE ERROR"});
        }
        res.json(results);
    });
});

app.post("/matchups", (req, res) => {
    const { playerId, difficulty, opponentName } = req.body;

    if (!playerId || !difficulty || !opponentName) {
        return res.status(400).json({ error: "MISSING FIELDS" });
    }
    if (difficulty < 1 || difficulty > 9) {
        return res.status(400).json({ error: "DIFFICULTY MUST BE BETWEEN 1 AND 9" });
    }

    db.query("INSERT INTO matchups (playerId, difficulty, opponentName) VALUES (?, ?, ?)", [playerId, difficulty, opponentName], (err, result) => {
        if (err) {
            console.error("ERROR INSERTING matchup", err);
            return res.status(500).json({ error: "DATABASE ERROR" });
        }
        res.status(201).json({ message: "MATCHUP ADDED" });
    });
});

// app.use(express.static(__dirname));

app.listen(PORT, HOST);
console.log("RUNNING");