const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// Mongodb connection
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw console.log(err);

    console.log("Mongodb connected!");
  }
);

// BodyParser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route middleware
app.use("/api/users", require("./routes/users"));
app.use("/api/post", require("./routes/posts"));

app.listen(PORT, console.log(`Server running on port ${PORT}`));
