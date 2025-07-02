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
    // CHAMPION TABLES
    db.query(
        `CREATE TABLE IF NOT EXISTS champions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(16) NOT NULL UNIQUE,
            imgPath VARCHAR(255),
            about TEXT
    )`,
    (err, result) => {
        if (err) console.error("ERROR CREATING champion TABLE", err);
        else console.log("CHAMPIONS TABLE CREATED");
    }
    );
    // MATCHUP TABLES
    db.query(
        `CREATE TABLE IF NOT EXISTS matchups (
            id INT AUTO_INCREMENT PRIMARY KEY,
            playerId INT NOT NULL,
            opponentId INT NOT NULL,
            difficulty TINYINT UNSIGNED NOT NULL CHECK (difficulty BETWEEN 1 AND 9),
            notes TEXT,
            UNIQUE (playerId, opponentId),
            FOREIGN KEY (playerId) REFERENCES champions(id),
            FOREIGN KEY (opponentId) REFERENCES champions(id)
    )`,
    (err, result) => {
        if (err) console.error("ERROR CREATING champion TABLE", err);
        else console.log("MATCHUPS TABLE CREATED");
    }
    );
}

app.get("/champions", (req, res) => {
    db.query("SELECT name FROM champions", (err, results) => {
        if (err) {
            console.error("ERROR FETCHING champion DATA", err);
            return res.status(500).json({error: "DATABASE ERROR"});
        }
        res.json(results);
    });
});

// app.use(express.static(__dirname));

app.listen(PORT, HOST);
console.log("RUNNING");