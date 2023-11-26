/********************************************************************************
* WEB322 – Assignment 05
* 
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
* 
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*
*
* Published URL: https://sleepy-hare-suspenders.cyclic.app
*
********************************************************************************/


const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const legoData = require("./modules/legoSets");

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // Add this line for form data parsing

// Routes
app.get("/", (req, res) => res.render("home"));

app.get("/about", (req, res) => res.render("about"));

app.get("/lego/sets/", async (req, res) => {
  const theme = req.query.theme;

  try {
    const sets = theme ? await legoData.getSetsByTheme(theme) : await legoData.getAllSets();

    if (sets.length === 0) {
      res.status(404).render("404", { message: "No sets found for a matching theme" });
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
      res.status(404).render("404", { message: "The requested Lego set was not found" });
    }
  } catch (error) {
    res.status(500).render("500", { message: "Internal Server Error" });
  }
});


// Render the addSet form
app.get("/lego/addSet", async (req, res) => {
  try {
    const themes = await legoData.getAllThemes();
    res.render("addSet", { themes });
  } catch (err) {
    res.render("500", { message: `Error: ${err.message}` });
  }
});

// Handle the submission of the addSet form
app.post('/lego/addSet', async (req, res) => {
  try {
    const themes = await legoData.getAllThemes();
    await legoData.addSet(req.body);
    res.redirect('/lego/sets');
  } catch (err) {
    res.render("500", { message: `I'm sorry, but we have encountered the following error: ${err}` });
  }
});



// Render the editSet form
app.get("/lego/editSet/:set_num", async (req, res) => {
  try {
    const set = await legoData.getSetByNum(req.params.set_num);
    const themes = await legoData.getAllThemes();

    res.render("editSet", { themes, set });
  } catch (err) {
    res.status(404).render("404", { message: err.message });
  }
});

// Handle the submission of the editSet form
app.post('/lego/editSet', async (req, res) => {
  try {
    await legoData.editSet(req.body.set_num, req.body);
    res.redirect('/lego/sets');
  } catch (err) {
    res.status(500).render('500', { message: `I'm sorry, but we have encountered the following error: ${err.errors[0].message || err}` });
  }
});

app.get("/lego/deleteSet/:set_num", async (req, res) => {
  try {
    await legoData.deleteSet(req.params.set_num);
    res.redirect('/lego/sets');
  } catch (err) {
    res.status(500).render('500', { message: `I'm sorry, but we have encountered the following error: ${err.errors[0].message || err}` });
  }
});

// Custom 404 route
app.use((req, res) => res.status(404).render("404", { message: "Page not found" }));

// Custom error handling middleware for internal server errors
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.status === 404) {
    // Render the 404 view
    res.status(404).render("404", { message: "Page not found" });
  } else {
    // Render the 500 view for other errors
    res.status(500).render("500", { message: "Internal Server Error" });
  }
});

async function startServer() {
  try {
    await legoData.initialize();
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
}

startServer();
