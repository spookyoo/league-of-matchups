"use strict";

const cors = require("cors");
const express = require("express");

const PORT = 3000;
const HOST = "0.0.0.0";
const app = express();

app.use(express.json());
app.use(cors());


// app.use(express.static(__dirname));

app.listen(PORT, HOST);
console.log("RUNNING");