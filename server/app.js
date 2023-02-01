const express = require("express");
const app = express();
const MONGOOSE = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const collections = require("./collections");

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
const jwt = require("jsonwebtoken");
const CLIENT_URL = process.env.CLIENT_URL

app.use(
  cors({
    origin: [CLIENT_URL],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.set("view engine", "hbs");
app.set("views", "");

MONGOOSE.set("strictQuery", false);
MONGOOSE.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((res) => {
    console.log("mongodb connection established");
  })
  .catch((err) => {
    console.log(`error : ${err.message}`);
  });

const userSchema = new MONGOOSE.Schema({
  userrole: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: new Date() },
});

const User = MONGOOSE.model("User", userSchema);

const db = MONGOOSE.connection
app.post("/signup", urlencodedParser, (req, res) => {
  const user = new User(req.body);
  db.collection(collections.USER_COLLECTIONS).insertOne(user, (err, coll) => {
    if (err){
      console.log(`error ${err}`);
      res.status(500).json("failed")
    }
    else {
      const token = jwt.sign({user},JWT_SECRET)
      console.log("successfully inserted");
      res.status(200).json({token,user:user});
    }
  });
});

app.post("/login", urlencodedParser, (req, res) => {
  db.collection(collections.USER_COLLECTIONS).findOne(
    { username: req.body.username },
    (err, user) => {
      if (user && user.password === req.body.password) {
        const token = jwt.sign({ user }, JWT_SECRET);
        console.log("Login successful");
        res.status(200).json({ token, user: user });
      } else {
        console.log("Invalid password");
        res.status(500).json("failed");
      }
    }
  );
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.redirect("/login");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
