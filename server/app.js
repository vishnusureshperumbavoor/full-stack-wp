const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connection;
const dotenv = require("dotenv");
dotenv.config();
const mongodb_uri = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cors = require("cors");
//const jwt = require("jsonwebtoken");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    key: "userId",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//app.use(
//  express.session({
//    cookie: {
//      path: "/",
//      httpOnly: false,
//      maxAge: 24 * 60 * 60 * 1000,
//    },
//    secret: "1234567890QWERT",
//  })
//);

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

db.on("connected", () => {
  console.log("mongodb connection established");
});

db.on("error", (err) => {
  console.log(`mongodb connection error`);
  console.log(`${err}`);
});
mongoose.set("strictQuery", false);

mongoose.connect(mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  createdAt: { type: Date, default: new Date() },
});

const User = mongoose.model("User", userSchema);

app.get("/login", (req, res) => {
  console.log("vsp is a legend");
  console.log(req.session.user);
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/signup", urlencodedParser, (req, res) => {
  const user = new User(req.body);
  db.collection("userdetails").insertOne(user, (err, coll) => {
    if (err) console.log(`error ${err}`);
    else {
      console.log("successfully inserted");
    }
  });
});

app.post("/login", urlencodedParser, (req, res) => {
  db.collection("userdetails").findOne(
    { username: req.body.username },
    (err, user) => {
      if (user && user.password === req.body.password) {
        res.cookie("user", "username", {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        });
        req.session.user = user;
        req.session.save()
        console.log(req.session.user);
        console.log("Login successful");
      } else {
        console.log("Invalid username or password");
      }
    }
  );
});

app.post("/logout", (req, res) => {
  res.clearCookie(req.session.user.username);
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.clearCookie("connect.sid");
      //res.redirect("/login");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
