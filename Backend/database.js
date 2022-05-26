"use strict"; // untuk menjalankan semua data yang hanya pada file ini

const mysql = require("mysql");

// connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "course_node",
});

module.exports = db;
