// inisialisasi
const express = require("express");
const cors = require('cors')

// implementasi
const app = express();
app.use(express.json());
app.use(express.static(__dirname))


app.use(cors())
// connection to database
const db = require("./database");
db.connect((error) => {
  if (error) throw error;
  console.log("Mysql Connected");
});

// endpoint
app.get("/", (req, res) => {
  res.send({
    message: "Berhasil menjalankan GET",
    data: {
      description: "Endpoint ini untuk menampilkan data",
    },
  });
});

app.use("/course", require("./routes/course.route"));
app.use("/admin", require("./routes/admin.route"));
app.use("/user", require("./routes/user.route"));
app.use("/class", require("./routes/class.route"));
app.use("/transaksi", require("./routes/transaksi.route"));

const port = 8000;
app.listen(port, () => console.log(`App running ${port}`));
