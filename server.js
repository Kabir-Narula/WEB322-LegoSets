/********************************************************************************
* WEB322 – Assignment 05
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
* Name: Kabir Narula Student ID: 127962223 Date: November 15, 2023
*
* Published URL: https://sleepy-hare-suspenders.cyclic.app
*
********************************************************************************/

const clientSessions = require("client-sessions");
const authData = require("./modules/auth-service");
const express = require("express");
const app = express();
const port = process.env.PORT ||3000;
const path = require("path");
const legoData = require("./modules/legoSets");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use(
  clientSessions({
    cookieName: "session",
    secret: "Chaewon",
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5,
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

app.get("/register", (req, res) => {
  res.render("register", {
    errorMessage: "",
    successMessage: "",
    userName: "",
  });
});

app.post("/register", async (req, res) => {
  try {
    await authData.registerUser(req.body);
    res.render("register", {
      successMessage: "User created",
      errorMessage: "",
      userName: req.body.userName,
    });
  } catch (err) {
    res.render("register", {
      errorMessage: err.message,
      userName: req.body.userName,
      successMessage: "",
    });
  }
});

app.get("/login", (req, res) => {
  res.render("login", { errorMessage: "", userName: "" });
});

app.post("/login", async (req, res) => {
  try {
    req.body.userAgent = req.get("User-Agent");
    const user = await authData.checkUser(req.body);
    req.session.user = {
      userName: user.userName,
      email: user.email,
      loginHistory: user.loginHistory,
    };
    res.redirect("/lego/sets");
  } catch (err) {
    res.render("login", { errorMessage: err, userName: req.body.userName });
  }
});

app.get("/", (req, res) => res.render("home"));

app.get("/about", (req, res) => res.render("about"));

app.get("/lego/sets/", async (req, res) => {
  const theme = req.query.theme;
  try {
    const sets = theme
      ? await legoData.getSetsByTheme(theme)
      : await legoData.getAllSets();
    if (sets.length === 0) {
      res
        .status(404)
        .render("404", { message: "No sets found for a matching theme" });
    } else {
      res.render("sets", { sets });
    }
  } catch (error) {
    res.status(500).render("500", { message: "Internal Server Error" });
  }
});

app.get("/lego/sets/:set_num", async (req, res) => {
  try {
    const set = await legoData.getSetByNum(req.params.set_num);
    if (set) {
      res.render("set", { set });
    } else {
      res
        .status(404)
        .render("404", { message: "The requested Lego set was not found" });
    }
  } catch (error) {
    res.status(500).render("500", { message: "Internal Server Error" });
  }
});

app.get("/lego/addSet", ensureLogin, async (req, res) => {
  try {
    const themes = await legoData.getAllThemes();
    res.render("addSet", { themes });
  } catch (err) {
    res.render("500", { message: `Error: ${err.message}` });
  }
});

app.post("/lego/addSet", ensureLogin, async (req, res) => {
  try {
    await legoData.addSet(req.body);
    res.redirect("/lego/sets");
  } catch (err) {
    res.render("500", {
      message: `I'm sorry, but we have encountered the following error: ${err}`,
    });
  }
});

app.get("/lego/editSet/:set_num", ensureLogin, async (req, res) => {
  try {
    const set = await legoData.getSetByNum(req.params.set_num);
    const themes = await legoData.getAllThemes();
    res.render("editSet", { themes, set });
  } catch (err) {
    res.status(404).render("404", { message: err.message });
  }
});

app.post("/lego/editSet", ensureLogin, async (req, res) => {
  try {
    await legoData.editSet(req.body.set_num, req.body);
    res.redirect("/lego/sets");
  } catch (err) {
    res.status(500).render("500", {
      message: `I'm sorry, but we have encountered the following error: ${err}`,
    });
  }
});

app.get("/lego/deleteSet/:set_num", ensureLogin, async (req, res) => {
  try {
    await legoData.deleteSet(req.params.set_num);
    res.redirect("/lego/sets");
  } catch (err) {
    res.status(500).render("500", {
      message: `I'm sorry, but we have encountered the following error: ${err}`,
    });
  }
});

app.get("/logout", (req, res) => {
  req.session.reset();
  res.redirect("/");
});

app.get("/userHistory", ensureLogin, (req, res) => {
  res.render("userHistory");
});

app.use((req, res) =>
  res.status(404).render("404", { message: "Page not found" })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.status === 404) {
    res.status(404).render("404", { message: "Page not found" });
  } else {
    res.status(500).render("500", { message: "Internal Server Error" });
  }
});

async function startServer() {
  try {
    await legoData.initialize();
    await authData.initialize();
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
}

startServer();
