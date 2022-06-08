const express = require("express");
 
const port = 3200
const app = express()


app.set("view engine", "ejs");

app.set("views", "./views");

app.use(express.static("public"));

const jsonGame = require('./games.json');
console.log (jsonGame)

app.get("/", (req, res) => {
    // on demande à express de générer le html à renvoyer au client sur
    // a partir d'un template donné
    res.locals.pageTitle = "Accueil"
    res.render("index");
  });
  app.get("/game/diceRoller", (req, res) => {
    // on demande à express de générer le html à renvoyer au client sur
    // a partir d'un template donné
    res.locals.pageTitle = "DiceRoller"
    res.render("diceRoller");
  });
  app.get("/game/fourchette", (req, res) => {
    // on demande à express de générer le html à renvoyer au client sur
    // a partir d'un template donné
    res.locals.pageTitle = "Fourchette"
    res.render("fourchette");
  });

  app.get("/game/jeuxRPG", (req, res) => {
    // on demande à express de générer le html à renvoyer au client sur
    // a partir d'un template donné
    res.locals.pageTitle = "Jeux Rpg"
    res.render("app");
  }); 


  // On crée la route dynamique qui nous permet de récupérer le nom de la ville à partir de l'url

  
  // On crée la route dynamique qui nous permet de récupérer le nom de la ville à partir de l'url
  

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
 