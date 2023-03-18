const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cron = require("node-cron");
const RoutesUsers = require("./routes/user");
const RoutesMessage = require("./routes/message");
const fetchAyah = require("./controlars/fetchAyah");
const localStorag = require("local-storage");
const adminRoutes = require("./routes/admin");
const cookie = require("cookie-parser");
app.use(cookie());
app.use(express.json());
app.use(cors());
require("dotenv").config();
const database_passwords = process.env.DATABASE_PASSWORD;
// set id
localStorag.set("id", 1);

// conect to database
mongoose.set("strictQuery", true);
mongoose
  .connect(
    `mongodb+srv://mahmoud:${database_passwords}@cluster0.e1vy9kw.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected!"))
  .catch((e) => console.log(e));

// user route
RoutesUsers(app);
// Message route
RoutesMessage(app);
// admin route
adminRoutes(app);

// send message every day
app.post("/run", (req, res) => {
  try {
    fetchAyah()
    res.json({ error: false });
  } catch (err) {
    res.json({ error: true });
  }
 
});

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
