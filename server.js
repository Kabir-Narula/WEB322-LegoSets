
/********************************************************************************
* WEB322 – Assignment 04
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
* Name: Kabir Narula Student ID: 127962223 Date: November 5, 2023
*
* Published URL: ___________________________________________________________
*
********************************************************************************/

const express = require("express");
const app = express();
app.set('view engine', 'ejs');
const port = 3000;
const path = require("path");

const legoData = require("./modules/legoSets");

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/lego/sets/", (req, res) => {
  const theme = req.query.theme;
  legoData.initialize().then(() => {
    if (theme) {
      legoData.getSetsByTheme(theme).then((sets) => {
        if (sets.length === 0) {
          res.status(404).render("404", { message: "No Sets found for a matching theme" });
        } else {
          res.render("sets", { sets: sets });
        }
      });
    } else {
      legoData.getAllSets().then((sets) => {
        res.render("sets", { sets: sets });
      });
    }
  }).catch((error) => {
    res.status(500).render("500", { message: "Internal Server Error" });
  });
});

app.get("/lego/sets/:set_num", (req, res) => {
  legoData.initialize().then(() => {
    legoData.getSetByNum(req.params.set_num).then((set) => {
      if (set) {
        res.render("set", { set: set });
      } else {
        res.status(404).render("404", { message: "The requested Lego set was not found" });
      }
    }).catch((err) => {
      res.status(404).render("404", { message: "The requested Lego set was not found" });
    });
  }).catch((error) => {
    res.status(500).render("500", { message: "Internal Server Error" });
  });
});

// Custom 404 route
app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found" });
});

// Custom error handling middleware for internal server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
