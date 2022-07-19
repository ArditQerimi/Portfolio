const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { check, validationResult } = require("express-validator");
const Contact = require("./models/contact");

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(cookieParser("NotSoSecret"));
app.use(
  session({
    secret: "something",
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.post(
  "/contact",
  [
    check("name", "Name must me 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
    check("message", "Message must be at least 10+ characters long")
      .exists()
      .isLength({ min: 10 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    const alert = errors.array();
    if (!errors.isEmpty()) {
      res.render("contact", {
        alert,
        page_name: "contact",
      });
    }

    let newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    newContact.save();
    res.redirect("/contact");
  }
);

app.post(
  "/",
  [
    check("name", "Name must me 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
    check("message", "Message must be at least 10+ characters long")
      .exists()
      .isLength({ min: 10 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    const alert = errors.array();
    if (!errors.isEmpty()) {
      res.render("index", {
        alert,
        page_name: "/",
      });
    }

    let newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    newContact.save();
    res.redirect("/");
  }
);

const routes = require("./routes/portfolioRoutes.js");
app.use("/", routes);

mongoose
  .connect(
    "mongodb+srv://ardit:12321@cluster0.aanxm.mongodb.net/portfolio?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    app.listen(port);
    console.log(`listening on ${port}`);
  })
  .catch((err) => {
    console.log(err);
  });
