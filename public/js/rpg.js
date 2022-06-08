const app = {
  // On crée notre propriété player
  player: {
    x: 0,
    y: 0,
    direction: 'right'
  },

  // On ajoute une clé targetCell qui contient les coordonnées de la case d'arrivée
  targetCell: {
    x: 5,
    y: 3
  },

  // On va stocker dans une propriété dédiée le nombre de mouvements
  movesCount: 0,

  // On a besoin d'un booléen pour gérer le statut de la partie
  // Tant que gameOver === false, la partie continue
  gameOver: false,

  drawBoard: function() {
    // SCOPE drawBoard
    const boardHTMLElement = document.getElementById('board');

    // BOUCLE 1
    for(let rowIndex = 0; rowIndex < 4; rowIndex++) {
      const rowHTMLElement = document.createElement('div');

      rowHTMLElement.classList.add('row');

      // BOUCLE 2
      for(let cellIndex = 0; cellIndex < 6; cellIndex++) {
        const cellHTMLElement = document.createElement('div');
        
        cellHTMLElement.classList.add('cell');

        // Si la case courante a les mêmes coordonnées (x ET y) que la variable targetCell
        if(rowIndex === app.targetCell.y && cellIndex === app.targetCell.x) {
          // on ajoute la classe CSS targetCell 
          cellHTMLElement.classList.add('target-cell');
        }

        // Si la case courante a les mêmes coordonnées (x ET y) que la variable targetCell
        if(rowIndex === app.player.y && cellIndex === app.player.x) {
          // ATTENTION petite différence d'énoncé par rapport à la case targetCell
          const playerHTMLElement = document.createElement('div');

          playerHTMLElement.classList.add('player', `player--${app.player.direction}`);

          cellHTMLElement.appendChild(playerHTMLElement);
        }

        //  que la variable targetCell, on ajoute la classe CSS targetCell à la case. Cette classe CSS est a créer pour que la case soit verte.
        
        rowHTMLElement.appendChild(cellHTMLElement);
      }

      boardHTMLElement.appendChild(rowHTMLElement);
    }

    // Après chaque actualisation de notre grille, on en profite pour vérifier si notre joueur
    // a atteint la case d'arrivée
    app.checkGameOver();
  },

  // pour l'exemple ici on utilise une arrow function, cependant cette syntaxe est moins souvent
  // utilisée pour les méthodes, elle est même déconseillée par MDN
  clearBoard: () => {
    // SCOPE clearBoard
    const boardHTMLElement = document.getElementById('board');

    boardHTMLElement.innerHTML = '';
  },

  redrawBoard: function() {
    app.clearBoard();

    app.drawBoard();
  },

  turnLeft: function() {
    // On contrôle à chaque mouvement que la partie n'est pas terminée
    // Si la partie est finie
    if(app.gameOver === true) {
      // On empêche le mouvement en sortant directement de la méthode avec un return
      return;
    }

    // On augmente le compteur de mouvements
    app.movesCount++;

    // On va utiliser un switch pour faire ça
    switch(app.player.direction) {

      case 'right':
        app.player.direction = 'up';
        break;

      case 'up':
        app.player.direction = 'left';
        break;

      case 'left':
        app.player.direction = 'down';
        break;

      case 'down':
        app.player.direction = 'right';
        break;

      default:
        console.log('turnLeft() impossible de tourner');
    }

    // On aurait pu faire exactement la même chose avec un if/else de cette manière:
    // if(app.player.direction === 'right') {
    //   app.player.direction = 'up';

    // } else if(app.player.direction === 'up') {
    //   app.player.direction = 'left';

    // } else if(app.player.direction === 'left') {
    //   app.player.direction = 'down';

    // } else if(app.player.direction === 'down') {
    //   app.player.direction = 'right';

    // } else {
    //   console.log('impossible de tourner');
    // }

    // On pense bien après chaque changement de direction à redessiner la grille
    // pour que l'information soit également appliquée visuellement au joueur 
    app.redrawBoard();
  },

  turnRight: function() {

    if(app.gameOver === true) {

      return;
    }

    app.movesCount++;

    switch(app.player.direction) {

      case 'right':
        app.player.direction = 'down';
        break;

      case 'up':
        app.player.direction = 'right';
        break;

      case 'left':
        app.player.direction = 'up';
        break;

      case 'down':
        app.player.direction = 'left';
        break;

      default:
        console.log('turnRight() impossible de tourner');
    }

    app.redrawBoard();
  },

  moveForward: function() {

    if(app.gameOver === true) {

      return;
    }

    app.movesCount++;

    switch(app.player.direction) {

      // Si mon joueur regarde à droite
      case 'right':
        // On ne fait avancer le joueur QUE si la valeur de x est inférieure à 5 (sinon il sortirait de la grille)
        if(app.player.x < 5) {
          // L'action d'avancer revient à ajouter 1 à sa position x
          app.player.x += 1;
        } else {
          console.log("Impossible d'avancer, limite de la grille atteinte")
        }
        break;
        
        // Si le joueur regarde vers le haut
      case 'up':
        if(app.player.y > 0) {
          // L'action d'avancer revient à retrancher 1 à sa position y
          app.player.y -= 1;
        } else {
          console.log("Impossible d'avancer, limite de la grille atteinte")
        }
        break;

      // Si le joueur regarde vers le bas
      case 'left':
        // On ne fait avancer le joueur QUE si la valeur de x est supérieure à 0 (sinon il sortirait de la grille)
        if(app.player.x > 0) {
          // L'action d'avance revient à retrancher 1 à sa position x
          app.player.x -= 1;
        } else {
          console.log("Impossible d'avancer, limite de la grille atteinte")
        }
        break;

        // Si le joueur regarde vers le bas
      case 'down':
        if(app.player.y < 3) {
          app.player.y += 1;
          // L'action d'avancer revient à ajouter 1 à sa position y
        } else {
          console.log("Impossible d'avancer, limite de la grille atteinte")
        }
        break;

      default:
        console.log("moveForward() impossible d'avancer");
    }

    app.redrawBoard();
  },

  listenKeyboardEvents: function() {
    document.addEventListener('keyup', (event) => {
    
      switch(event.key) {
    
        case 'ArrowLeft':
          app.turnLeft();
          break;
        
        case 'ArrowRight':
          app.turnRight();
          break;
    
        case 'ArrowUp':
          app.moveForward();
          break;
      }
    })
  },

  checkGameOver: function() {
    // Si le joueur a atteint la case cible
    // En terme de code, cela revient à vérifier que les coordonnées du joueur sont identiques 
    // à celles de la case qui possède la classe 'targetCell':
    if(app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {

      // Alors on passe la valeur de la propriété "gameOver" de notre app à 'true'
      app.gameOver = true;

      // On peut utiliser la méthode setTimeout pour retarder l'exécution du alert
      // 1er argument: la callback du code à exécuter
      // 2ème argument: le temps à attendre avant d'exécuter la callback (en millisecondes)
      setTimeout(() => {
        alert(`Bravo, tu as gagné! Tu as effectué ${app.movesCount} mouvements.`);
      }, 500);
    }

  },

  init: function () {
    console.log('init !');

    app.drawBoard();

    // On oublie pas de "brancher" l'écouteur d'évènement du clavier au démarrage
    app.listenKeyboardEvents();
  }
};

document.addEventListener('DOMContentLoaded', app.init);