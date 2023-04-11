var terminer_vrai_faux = 0;
//variables pour la structure de la question
const NOMBRE_VRAI_FAUX = 2;
const QUESTION_VRAI_FAUX = [
  "Zéro est le plus petit nombre qui existe.",
 "Le nombre ''-5'' est un nombre négatif"
];
const options_vrai_faux = ["....................","Les nombres négatifs sont inférieurs à 0","Les nombres décimaux sont inférieurs à 0 "," Les nombres négatifs sont inférieurs ou égaux à 0"];
const options2_vrai_faux = ["....................","Car il est précédé du signe moins","Car 5 est plus grand que 0","Car il est supérieur à 0"];
const REP_JUST_VRAi_FAUX = ["Les nombres négatifs sont inférieurs à 0","Car il est précédé du signe moins"];
const top_vrai_faux = [275,475];
const REP_VRAI_FAUX = ["1", "0", "1"];
const TAB_REP_VRAi_FAUX = [true, false, false];
const TAB_POSITION_VRAI_FAUX = [MARGIN * 1.5, MARGIN * 4];
const TAB_REPONSE = ["vrai", "faux"];
const SQUARE_WEIDTH = DOT * 3;
const SQUARE_HEIGHT = DOT * 3;

function interval_vrai_faux() {
  document.getElementById("espace").style.height = "140px";
  document.getElementById("background").style.height = "60rem";
  document.getElementById("canvas").style.width = WIDTH + "px";
  document.getElementById("next_arrow").style.display = "flex"; 
  HEIGHT = 550;
  document.getElementById("espace").style.height = "100px";
  document.getElementById("espace").textContent =
    "Réponds aux question en cochant vrai ou faux";
  document.getElementById("next_arrow").onclick = score_vrai_faux;
  canv.height = HEIGHT;
  drawBoard();
  canv.addEventListener("mousemove", highlightLine_vrai_faux);
  canv.addEventListener("click", click_vrai_faux);
  drawQuestion_vrai_faux();
  textQuestions_vrai_faux();
  drawReponse_vrai_faux();
  textReponse_vrai_faux();
  input_vrai_faux();
  for (let i = 0; i < 2; i++){
    var temp;
      temp =  document.createElement("SELECT");
      temp.setAttribute("id", "select_vrai_faux"+i);
      temp.setAttribute("CLASS", "select_vrai_faux");
      document.getElementById("canvas").appendChild(temp);
      for(let j=0; j<4;j++){
          var c = document.createElement("option");
          if(i == 0 ){
            c.text = options_vrai_faux[j];
          }else{
            c.text = options2_vrai_faux[j];
          }
          temp.options.add(c, 1);
          }
          var left = 3*MARGIN;
          var top = top_vrai_faux[i];
          temp.style.top = top+ "px";
          temp.style.left = left+"px";
}
  
  //swal("Consignes : ", "clique sur les petits boules à côtès de vrai/faux pour sélectionner la réponse correspondante. Tu peux supprimer ta réponse en cliquant sur une boule déjà sélectionné !    ");
  //fonction à faiire apparaitre pour bypass le vrai_faux (utile pour test la fonction suivante sans se taper le vrai faux à chaque fois)
  //nettoyer_vrai_faux();
}
//retourne la coordonné y de chaque point
function getGridY_vrai_faux(row) {
  return MARGIN + ((HEIGHT - MARGIN * 4) / (NOMBRE_VRAI_FAUX - 1)) * row;
}
//appelle la fonction pour dessiner les points, afin de dessiner les points des questions
function drawQuestion_vrai_faux() {
  for (let i = 0; i < NOMBRE_VRAI_FAUX; i++) {
    drawDot_vrai_faux(MARGIN, getGridY_vrai_faux(i), "royalblue");
  }
}
//fonction pour dessiner les points (on lui passe en paramétre les coordonnés)
function drawDot_vrai_faux(x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, DOT, 0, Math.PI * 2);
  ctx.fill();
}
//fonction pour dessiner du text lorsqu'on lui passe en paramétre une paire de coordoné, du texte, une couleur et une taille
function drawText_vrai_faux(text, x, y, color, size) {
  ctx.fillStyle = color;
  ctx.font = size + "px sans-serif";
  ctx.fillText(text, x, y);

}
//appel la fonction drawText pour afficher le texte des questions
function textQuestions_vrai_faux() {
  for (let i = 0; i < NOMBRE_VRAI_FAUX; i++) {
    drawText_vrai_faux(
      QUESTION_VRAI_FAUX[i],
      MARGIN + 2 * DOT,
      getGridY_vrai_faux(i) + DOT / 2,
      "black",
      TEXT_SIZE_CELL
    );
  }
  drawText_vrai_faux("Justification : ", MARGIN + 2 * DOT, 200, "black", TEXT_SIZE_CELL );
  drawText_vrai_faux("Justification : ", MARGIN + 2 * DOT, 400, "black", TEXT_SIZE_CELL );
}
//appelle la fonction pour dessiner les points, afin de dessiner les points des répnses
function drawReponse_vrai_faux() {
  for (let i = 0; i < NOMBRE_VRAI_FAUX; i++) {
    for (let j = 0; j < 2; j++) {
      drawDot_vrai_faux(
        TAB_POSITION_VRAI_FAUX[j],
        getGridY_vrai_faux(i) + TEXT_SIZE_CELL * 3,
        COLOR_DOT
      );
    }
  }
}
//appel la fonction drawText pour afficher le texte des réponses
function textReponse_vrai_faux() {
  for (let i = 0; i < NOMBRE_VRAI_FAUX; i++) {
    for (let j = 0; j < 2; j++) {
      drawText_vrai_faux(
        TAB_REPONSE[j],
        TAB_POSITION_VRAI_FAUX[j] + DOT * 1.5,
        getGridY_vrai_faux(i) + TEXT_SIZE_CELL * 3 + DOT / 2,
        "black",
        TEXT_SIZE_CELL
      );
    }
  }
}
function input_vrai_faux() {
  //set up the squares
  squares_vrai_faux = [];
  for (let i = 0; i < NOMBRE_VRAI_FAUX; i++) {
    squares_vrai_faux[i] = [];
    for (let j = 0; j < 2; j++) {
      squares_vrai_faux[i][j] = new Square_vrai_faux(
        TAB_POSITION_VRAI_FAUX[j],
        getGridY_vrai_faux(i) + TEXT_SIZE_CELL * 3,
        SQUARE_HEIGHT,
        SQUARE_WEIDTH,
        TAB_REPONSE[j]
      );
      squares_vrai_faux[i][j].rep = j;
    }
  }
}
function highlightLine_vrai_faux() {}
function click_vrai_faux(/** @type {MouseEvent} */ ev) {
  //get mouse position relative to the canvas
  var canvasOffset = $("#canvas").offset();
  var offsetX = canvasOffset.left;
  var offsetY = canvasOffset.top;
  var x = parseInt(ev.pageX - offsetX) - 35;
  var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;
 

  selectSide_vrai_faux(x, y);
}
function selectSide_vrai_faux(x, y) {
  OUTER: for (let i = 0; i < NOMBRE_VRAI_FAUX; i++) {
    for (let j = 0; j < 2; j++) {
      //il commence par repérer dans quelle case est le curseur
      if (squares_vrai_faux[i][j].contains(x, y)) {
        //si un carré est déja sélectionné, que le carré sur lequel on vient de cliquer est différent du précédent et qu'il n'est pas déjà utilisé alors trace une ligne depuis le carré déjà séléctionné jusqu'à celui que l'on vient de cliquer
        if (
          squares_vrai_faux[i][j].used != true &&
          squares_vrai_faux[i][j].pair_used != true
        ) {
          squares_vrai_faux[i][j].used = true;
          if (j == 0) {
            squares_vrai_faux[i][1].pair_used = true;
          } else {
            squares_vrai_faux[i][0].pair_used = true;
          }
          //function pour tracer le point
          drawDot_vrai_faux(
            squares_vrai_faux[i][j].x,
            squares_vrai_faux[i][j].y,
            "black"
          );
          //la variable terminer indique le nombre de question répondue
          ++terminer_vrai_faux;
          //si on a autant de ligne tracé que le plus petit nombre entre le nombre de question et réponse alors on fait le score
          if (terminer_vrai_faux >= NOMBRE_VRAI_FAUX) {
            //score_vrai_faux();
          }
          break OUTER;
        } else {
          //si on clique sur un carré déjà utilisé, on le clear (redessine, enléve un point à terminer, used = false)
          if (squares_vrai_faux[i][j].used) {
            squares_vrai_faux[i][j].used = false;
            if (j == 0) {
              squares_vrai_faux[i][1].pair_used = false;
            } else {
              squares_vrai_faux[i][0].pair_used = false;
            }
            drawDot_vrai_faux(
              squares_vrai_faux[i][j].x,
              squares_vrai_faux[i][j].y,
              COLOR_DOT
            );
            --terminer_vrai_faux;
            break OUTER;
          }
          if (squares_vrai_faux[i][j].pair_used) {
            //si on a pas de carré déjà sélectionné et mais que sa paire est sélectionné alors on change la selection
            squares_vrai_faux[i][j].used = true;
            squares_vrai_faux[i][j].pair_used = false;
            if (j == 0) {
              squares_vrai_faux[i][1].used = false;
              squares_vrai_faux[i][1].pair_used = true;
              drawDot_vrai_faux(
                squares_vrai_faux[i][1].x,
                squares_vrai_faux[i][j].y,
                COLOR_DOT
              );
            } else {
              squares_vrai_faux[i][0].used = false;
              squares_vrai_faux[i][0].pair_used = true;
              drawDot_vrai_faux(
                squares_vrai_faux[i][0].x,
                squares_vrai_faux[i][j].y,
                COLOR_DOT
              );
            }

            drawDot_vrai_faux(
              squares_vrai_faux[i][j].x,
              squares_vrai_faux[i][j].y,
              "black"
            );
            break OUTER;
          }
        }
      }
    }
  }
}

function score_vrai_faux() {
  var tempJust = [0,0];
  var fauxCoche = [9,9];
  var fauxJustification = [9,9];
  for (let i = 0; i < NOMBRE_VRAI_FAUX; i++) {
    var tempU = 0;
    for (let j = 0; j < 2; j++) {
      if (squares_vrai_faux[i][j].used == true) {
        tempU = 1, tempV = 0;
        if (REP_VRAI_FAUX[i] == squares_vrai_faux[i][j].rep) {
          sendData(1, "vrai ou faux", 1, (4*i+1));
          tempV = 1;
          tempJust[i] = 1;
          fauxCoche[i] = 1;
        }
      }
    }
    if(tempU == 0){
      sendData(9, "vrai ou faux", 1, (4*i+1));
    }else{
      if(tempV == 0){
        sendData(0, "vrai ou faux", 1, (4*i+1));
        fauxCoche[i] = 0;
      }
    }
  }
  for(let i = 0; i < 2; i++){
      if(document.getElementById("select_vrai_faux"+i).value == "...................."){
        sendData(9, "vrai ou faux", 1, (4*i+2));
      }else{
        if(document.getElementById("select_vrai_faux"+i).value == REP_JUST_VRAi_FAUX[i]){
          sendData(1, "vrai ou faux", 1, (4*i+2));
          fauxJustification[i] = 1;
        }else{
          sendData(0, "vrai ou faux", 1, (4*i+2));
          fauxJustification[i] = 0;
        }
      }

  }
  for(let i = 0; i < 2; i++){
    switch(fauxCoche[i]){
      case 9 : sendData(9, "vrai ou faux", 1, (4*i+4)); 
      break;
      case 1 : 
      switch(fauxJustification[i]){
        case 1 :  sendData(1, "vrai ou faux", 1, (4*i+4));  break;
        case 0:  sendData("0A", "vrai ou faux", 1, (4*i+4)); break;
        case 9 : sendData(9, "vrai ou faux", 1, (4*i+4)); break;
      }break;
      case 0 :
        switch(fauxJustification[i]){
          case 1 :  sendData("0B", "vrai ou faux", 1, (4*i+4));  break;
          case 0:  sendData("0C", "vrai ou faux", 1, (4*i+4)); break;
          case 9 : sendData(9, "vrai ou faux", 1, (4*i+4)); break;
        }break;
    }
    sendData("Do not consider this column", "vrai ou faux", 1, 3);
    sendData("Do not consider this column", "vrai ou faux", 1, 7);
    }
  
  nettoyer_vrai_faux();
 
}
function nettoyer_vrai_faux() {
  for(let i = 0; i < 2; i++){
    document.getElementById("select_vrai_faux"+i).parentNode.removeChild(document.getElementById("select_vrai_faux"+i));
  }
  canv.removeEventListener("mousemove", highlightLine_vrai_faux);
  canv.removeEventListener("click", click_vrai_faux);
  drawBoard();
 reference_liste(2);
}

//create the Square object constructor,  va permettre de créer des carré virtuels qui seront placé là où on veut un input
function Square_vrai_faux(x, y, w, h, value) {
  this.x = x;
  this.y = y;
  this.w = w + DOT * 3;
  this.h = h + DOT * 3;
  //les 4 suivants indiquent les coordonés des bords du carré
  this.left = x - (w * 3) / 2 - DOT;
  this.right = x + (w * 3) / 2 - DOT;
  this.top = y - (h * 3) / 2;
  this.bot = y + (h * 3) / 2;

  this.used = false; //est-ce que le point a déjà été utilisé
  //est-ce que l'autre point est utilisé (vrai/faux)
  this.pair_used = false;
  //valeur associé à la box et qui doit être similaire à celle d'une autre box afin de faire les scores (but étant de relier les boxes qui ont la même value)
  this.value = value;
  // fonction qui return true quand on lui donne un point qui appartient au carré
  this.contains = function(x, y) {
    return x >= this.left && x < this.right && y >= this.top && y < this.bot;
  };
  // lorsque qu'on va crééer des carrés pour les points vrai et faux, vrai va avoir un .rep = à 0 et les faux un .rep = 1; il suffira lorsqu'on entre les question de leurs associé soit 0, soit 1 en fonction de leur réponse
  this.rep = 0;
}
