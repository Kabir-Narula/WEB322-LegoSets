/******************************************************************************** 
*  BTI325 – Assignment 02 
*  
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html 
*  
*  Name: Kabir Narula Student ID: 127962223 Date: 25 September 2023
* 
********************************************************************************/ 
// INSTRUCTIONS TO CONNECT TO SERVER---
// 1) Open the terminal and type:  node server.js
// 2) It should display port server running on port 3000
// 3) Open Local Browser like Chrome or Firefox

/* To access the Lego sets route, use:
http://localhost:3000/lego/sets  */

/* To access the num-demo route, use:
http://localhost:3000/lego/sets/num-demo */

/*To access the theme-demo route, use:
http://localhost:3000/lego/sets/theme-demo */

const express = require("express");
const app = express();
const port = 3000; 
const path = require("path"); 

const legoData = require("./modules/legoSets");

app.use(express.static(path.join(__dirname, "public")));

//legoData.initialize().then(() => {
  // Routes
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
  });

  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
  });
  
  app.get("/", (req, res) => {
    res.send("Assignment 2: Kabir Narula - 127962223");
  });

  // app.get("/lego/sets", async (req, res) => {
  //   const sets = await legoData.getAllSets();
  //   res.json(sets);
  // });

  // app.get("/lego/sets/num-demo", async (req, res) => {
  //   const setNum = "VP-1"; 
  //   try {
  //     const set = await legoData.getSetByNum(setNum);
  //     res.json(set);
  //   } catch (error) {
  //     res.status(404).send(error);
  //   }
  // });

  app.get("/lego/sets/", (req, res) => {
    const theme = req.query.theme; 
    if (theme)
    {
        legoData.initialize().then(() => {
            legoData.getSetsByTheme(theme).then((sets)=> {
                res.send(sets); 
            });
        });
    }
    else 
    {
        legoData.initialize().then(() => {
            legoData.getAllSets().then((sets)=> {
                res.send(sets); 
            });
        }); 
    }
}); 

app.get("/lego/sets/:set_num", (req, res) => {

  legoData.initialize().then(() => {
      legoData.getSetByNum(req.params.set_num).then((sets=> {
          res.send(sets); 
      }))
      .catch((err) => {
          res.send(err); 
      }); 
  }); 
}); 

  // app.get("/lego/sets/", async (req, res) => {
  //   const theme = req.query.theme; 
  //   try {
  //     const sets = await legoData.getSetsByTheme(theme);
  //     res.json(sets);
  //   } catch (error) {
  //     res.status(404).send(error);
  //   }
  // });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
//});
