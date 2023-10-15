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


const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

let sets = []; 

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      sets = setData.map((set) => {
        const theme = themeData.find((theme) => theme.id === set.theme_id);
        return { ...set, theme: theme ? theme.name : "Unknown" };
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}


function getAllSets() {
  return new Promise((resolve, reject) => {
    try {
      resolve(sets);
    } catch (error) {
      reject(error);
    }
  });
}


function getSetByNum(setNum) {
  return new Promise((resolve, reject) => {
    try {
      const set = sets.find((s) => s.set_num === setNum);
      if (set) {
        resolve(set);
      } else {
        reject(`Set not found with set_num: ${setNum}`);
      }
    } catch (error) {
      reject(error);
    }
  });
}

function getSetsByTheme(theme) {
  return new Promise((resolve, reject) => {
    try {
      const lowercaseTheme = theme.toLowerCase();
      const matchingSets = sets.filter((set) =>
        set.theme.toLowerCase().includes(lowercaseTheme)
      );
      if (matchingSets.length > 0) {
        resolve(matchingSets);
      } else {
        reject(`No sets found for theme: ${theme}`);
      }
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };

// Testing the functions
/*async function test() {
  try {
    await initialize();
    const allSets = await getAllSets();
    console.log("Choosen Sets:", allSets);

    const setByNum = await getSetByNum("VP-1");
    console.log("Set by Number:", setByNum);

    const setsByTheme = await getSetsByTheme("Video Games");
    console.log("Sets by Theme ():", setsByTheme);
  } catch (error) {
    console.error("Error:", error);
  }
}


test();*/
