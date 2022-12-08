const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", false);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
