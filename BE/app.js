const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const User = require("./routes/reslog");

app.use("/api", User);

// Router khi người dùng nhập sai Endpoint
app.use((req, res, next) => {
  res
    .status(404)
    .send(
      "<h1>404 Not Found</h1><p>The requested URL was not found on this server.</p>"
    );
});

mongoose
  .connect(
    "mongodb+srv://nguyenphat2412:phatdeptrai123@nodejsudemy.hdztbvu.mongodb.net/assignment2?retryWrites=true&w=majority&appName=nodejsudemy"
  )
  .then((result) => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
