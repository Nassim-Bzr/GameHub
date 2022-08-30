const express = require("express");
// on récupére les données contenues dans games.json
const games = require("./games.json");

// on instancie notre application
const app = express();

// on déclare une variable pour définir mle port d'écoute de notre serveur
const PORT = 3200;

// mise en place du moteur de rendu des vues
app.set("view engine", "ejs");
// on spécifie le dossier qui contient les vues de
app.set("views", "./views");

// Toutes les routes utilisent la variables games
// plutot que de la passer à chaque fois qu'on appelle la méthode render
// on l'ajoute à l'objet app.locals (http://expressjs.com/en/5x/api.html#app.locals))
app.locals.games = games;


// mise en place du middleware static
app.use(express.static("public"));

//mise en place d'un middelware de journalisation
app.use((req, res, next)=>{
  // on affiche les infos voulues dans la console
  console.log(`${new Date().toISOString()} - ${req.ip} - ${req.path}`);
  // on passe au middleware suiva
  next()
})

// définition de la route "/" pour la page d'accueil
app.get("/", (req, res) => {
  res.render("index");
});

// définition de la route pour Dice Roller
// app.get("/game/diceRoller", (req, res) => {
//   res.render("diceRoller");
// })

app.get("/game/:gameName",(req, res, next)=>{
  const gameName = req.params.gameName;
  const currentGame = games.find((game) => game.name === gameName);
  // si currentGame est undefined (falsy)
  // on renvoie une 404
  if(!currentGame){
    res.statusCode = 404;
    // si on souhaitait passer ds le middleware des 404
    // on appélerais reutn next() pour stopper l'execution du middleware
    // et passer au middleware suivant
    // return next()
  }
  // on utilise un template intermédiaire pour afficher le jeu
  // il nous sert pour l'inclusion du fichier js/css et l'affichage
  // de l'erreur 404
  res.render("game", {game: currentGame});
})

// mise en place d'une route pour affichage du formulaire de recherche
app.get("/search", (req, res) => {
  res.render("search");
})

// mise en place de la route pour affichage des résultats de la recherche
app.get("/search/results", (req, res) => {
  const searchString = req.query.search;
  const gamesFound = games.filter((game) => game.title.toLowerCase().includes(searchString.toLowerCase()))
  res.render("searchResults", {gamesFound});
})

// middleware final pour affichage des 404
app.use((req, res)=>{
  res.status(404).render('404');
})

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});


