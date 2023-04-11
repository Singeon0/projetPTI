

 //question parameters

 const GRID_SIZE = 5; //number of rows (and colums)
 var HEIGHT = 600; //pixel
 var NOMBRE_QUESTION = 7;
 var NOMBRE_REPONSE = 6;
 var NOMBRE_TAB = [NOMBRE_QUESTION, NOMBRE_REPONSE];
 var NOMBRE = Math.max(NOMBRE_QUESTION, NOMBRE_REPONSE);
 var NOMBRE2 = Math.min(NOMBRE_QUESTION, NOMBRE_REPONSE);
var data_question, data_numb,selected =0 ;
 //derived dimensions
 const WIDTH = HEIGHT * 2;
 const CELL = HEIGHT / (GRID_SIZE+2);// size of cells (as well as left and right margin)
 const MARGIN = HEIGHT - (GRID_SIZE+1)*CELL; // top margin for score...
 const CELL2 = (HEIGHT - (MARGIN*2))/(NOMBRE-1); //size of the cell to click
 const STROKE =  (HEIGHT / (GRID_SIZE+2))/ 12; // stroke width
 const DOT = STROKE; // dot radius
 const BORDURE = CELL*5;

 //texte
 var QUESTION;
 var REPONSE;
 var text = [QUESTION, REPONSE];
 var TEXT_SIZE_CELL = 16;


 //colours
 const COLOR_BOARD = "white";
 const COLOR_BORDER = "#00abcc";
 const COLOR_DOT = "#a80039";
 const COLOR_DOT_HIGH = "black";
 const COLOR_PLAYER = "royalblue";
 const COLOR_PLAYER_LIT = "lightsteelblue";
 

 //variable
 var squares_connect_the_dots, select = false, temp_i, temp_j, high_i, high_j, highlight2 = false;
 var Score = 0, terminer_connect_the_dots = 0;
 var ctx, canv, canvRect;

//canv attribute
 canv.setAttribute("id", "canv");
canv.height = HEIGHT;
canv.width = WIDTH;
var div = document.getElementById("canvas")
div.appendChild(canv);

//set up the context
ctx = canv.getContext("2d");
ctx.font = TEXT_SIZE_CELL+"px sans-serif";
canvRect = canv.getBoundingClientRect();   



function interval_connect_the_dots(Q, R, q, col1, col2, n){
    NOMBRE_QUESTION = col1;
    NOMBRE_REPONSE = col2;
    QUESTION = Q;
    REPONSE = R;
    data_question = q;
    data_numb = n;
    NOMBRE_TAB = [NOMBRE_QUESTION, NOMBRE_REPONSE];
    ctx.lineWidth = STROKE;
//set up the canvas
  document.getElementById("espace").textContent = "Relie les questions à la réponse qui leur correspond";
 
 //start a new game
 newGame();
 drawBoard();
 drawQuestion_connect_the_dots(NOMBRE_QUESTION, NOMBRE_REPONSE); 
 drawTEXT_connect_the_dots();
 // event handlers
 canv.addEventListener("mousemove", highlightLine_connect_the_dots);
 canv.addEventListener("click", click_connect_the_dots);
 document.getElementById("next_arrow").onclick = score_connect_the_dots;

//swal("Consignes : ", "Clique sur les deux boules que tu souhaite relier, tu peux supprimer une ligne que tu as tracé en cliquant sur une des deux boules de cette ligne. Quand tu as fini clique sur la fléche rouge en bas à droite pour passer à la question suivante ! ");
//à supprimer (pour tester plus rapidement)
//nettoyer_connect_the_dots(); 
 
}

 //highlight avant de séléctionner
 function highlightLine_connect_the_dots(/** @type {MouseEvent} */ ev){
      
//get mouse position relative to the canvas
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var x = parseInt(ev.pageX - offsetX)-30;
var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;

//highlight the square's side
highlightSide_connect_the_dots(x, y);
if(temp_i !== undefined){
highlightDot(temp_i, temp_j);
}
}

function highlightSide_connect_the_dots(x, y){


     //check each cell
  
     
     OUTER:  for(let i =0; i < 2; i++){
             for (let j =0; j < NOMBRE_TAB[i]; j++){
             if(squares_connect_the_dots[i][j].contains(x,y)){
              if(highlight2 == true && squares_connect_the_dots[i][j] != squares_connect_the_dots[high_i][high_j] && squares_connect_the_dots[high_i][high_j].used == false){
                clear_connect_the_dots();

             }
                 if(select == true && i != temp_i && squares_connect_the_dots[i][j] != squares_connect_the_dots[temp_i][temp_j] && squares_connect_the_dots[i][j].used != true){
                     
                     drawLine(squares_connect_the_dots[temp_i][temp_j].x,squares_connect_the_dots[temp_i][temp_j].y, squares_connect_the_dots[i][j].x, squares_connect_the_dots[i][j].y, COLOR_PLAYER_LIT);
                     high_i = i;
                     high_j = j;
                     if(highlight2 == false){
                         highlight2 = true;
                     }
                 }
                 break OUTER;
             
         }
     }
     }       
 }
 // détecte un click
 function click_connect_the_dots(/** @type {MouseEvent} */ ev){
   //get mouse position relative to the canvas
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var x = parseInt(ev.pageX - offsetX)-30;
var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;


    selectSide_connect_the_dots(x, y);
 }
 //function effectué à chaque clic de l'utilisateur
 function selectSide_connect_the_dots(x, y){
     OUTER:  for(let i =0; i < 2; i++){
             for (let j =0; j < NOMBRE_TAB[i]; j++){
      //il commence par repérer dans quelle case est le curseur
             if(squares_connect_the_dots[i][j].contains(x,y)){
           //si un carré est déja sélectionné, que le carré sur lequel on vient de cliquer est différent du précédent et qu'il n'est pas déjà utilisé alors trace une ligne depuis le carré déjà séléctionné jusqu'à celui que l'on vient de cliquer
                 if(select == true && selected < 2 && i != temp_i && squares_connect_the_dots[i][j] != squares_connect_the_dots[temp_i][temp_j] && squares_connect_the_dots[i][j].used != true){
                   squares_connect_the_dots[i][j].paired = true;
                   squares_connect_the_dots[i][j].pair_slave = false;
                   squares_connect_the_dots[temp_i][temp_j].paired = true;
                   squares_connect_the_dots[temp_i][temp_j].pair_slave = true;
                   squares_connect_the_dots[temp_i][temp_j].pair_i = i;
                   squares_connect_the_dots[temp_i][temp_j].pair_j= j;
                   squares_connect_the_dots[i][j].pair_x =squares_connect_the_dots[temp_i][temp_j].x;
                   squares_connect_the_dots[i][j].pair_y =squares_connect_the_dots[temp_i][temp_j].y;
                   squares_connect_the_dots[i][j].pair_i =temp_i;
                   squares_connect_the_dots[i][j].pair_j =temp_j;
                     //function pour tracer la ligne
                     drawLine(squares_connect_the_dots[temp_i][temp_j].x,squares_connect_the_dots[temp_i][temp_j].y, squares_connect_the_dots[i][j].x, squares_connect_the_dots[i][j].y, COLOR_PLAYER)
                     //variable qui indique qu'on a plus de carré sélectionné 
                     select = false;
                     squares_connect_the_dots[temp_i][temp_j].used  = true;
                     squares_connect_the_dots[i][j].used = true
                     ++selected;
                    
                     break OUTER;
                 }else{
                     //si on clique sur un carré déjà utilisé, alors on vérifié qu'il est apparaillé à un carré esclave, si oui alors on les clear pour enlever la ligne entre les deux
                     if (squares_connect_the_dots[i][j].used){
                         if(squares_connect_the_dots[i][j].pair_slave){
                         
                             squares_connect_the_dots[i][j].pair_slave = false;
                             squares_connect_the_dots[i][j].used = false;
                             squares_connect_the_dots[i][j].paired = false;
                             squares_connect_the_dots[ squares_connect_the_dots[i][j].pair_i][ squares_connect_the_dots[i][j].pair_j].paired = false;
                             squares_connect_the_dots[ squares_connect_the_dots[i][j].pair_i][ squares_connect_the_dots[i][j].pair_j].used = false;
                             squares_connect_the_dots[ squares_connect_the_dots[i][j].pair_i][ squares_connect_the_dots[i][j].pair_j].pair_slave = false;
                             clear_connect_the_dots();
                             --selected;
                          break OUTER;
                         }
                            //si on clique sur un carré déjà utilisé, alors on vérifié qu'il est esclave d'un autre, si oui alors on les clear pour enlever la ligne entre les deux
                         if(squares_connect_the_dots[i][j].pair_slave ==false && squares_connect_the_dots[i][j].paired){
                             squares_connect_the_dots[i][j].paired = false;
                             squares_connect_the_dots[i][j].used = false;
                             squares_connect_the_dots[ squares_connect_the_dots[i][j].pair_i][ squares_connect_the_dots[i][j].pair_j].pair_slave = false;
                             squares_connect_the_dots[ squares_connect_the_dots[i][j].pair_i][ squares_connect_the_dots[i][j].pair_j].used = false;
                             squares_connect_the_dots[ squares_connect_the_dots[i][j].pair_i][ squares_connect_the_dots[i][j].pair_j].paired = false;
                             clear_connect_the_dots();
                             --selected;
                        
                            
                         }
                         break OUTER;
                     }
                     if(selected < 2 ){
                    //si on a pas de carré déjà sélectionné et que le carré sur lequel on a cliqué n'est pas utilisé alors on le sélectionne et la variable 'select' devient true pour indiquer qu'on a une sélection en cours
                     select = true;
                     drawQuestion_connect_the_dots(NOMBRE_QUESTION, NOMBRE_REPONSE); 
                     //on met le point sélectionné en évidence
                     highlightDot(i, j);
                  temp_i = i;
                  temp_j = j;
                 }
                 break OUTER;}
             }
         }
     }
 }

 //fonction qui redraw tout le canvas pour appliquer les changements (lignes enlevée...)
 function clear_connect_the_dots(){
     drawBoard();
                
                for(let i =0; i < 2; i++){
            for (let j =0; j < NOMBRE_TAB[i]; j++){
                if(squares_connect_the_dots[i][j].paired == true){
                    drawLine(squares_connect_the_dots[i][j].x,squares_connect_the_dots[i][j].y, squares_connect_the_dots[i][j].pair_x, squares_connect_the_dots[i][j].pair_y, COLOR_PLAYER);
                }
                 
            }}
            drawQuestion_connect_the_dots(NOMBRE_QUESTION, NOMBRE_REPONSE); 
            drawTEXT_connect_the_dots();
 }

 // fait apparaitre les points pour les questions et les réponses
 function drawQuestion_connect_the_dots(quest, rep){
     for(let i = 0; i < quest ; i++){
         drawDot_connect_the_dots(BORDURE, getGridY_connect_the_dots(i, NOMBRE_QUESTION));
     }
     for (let j = 0; j < rep; j++){
         drawDot_connect_the_dots(WIDTH - BORDURE, getGridY_connect_the_dots(j, NOMBRE_REPONSE));
     }

 }
 //donne le y des points à dessiner 
function getGridY_connect_the_dots(row, N){

     return MARGIN + ((HEIGHT -(MARGIN)*2) / (N - 1))* row;
 }

 //dessine le rectangle du fond
 function drawBoard(){
     ctx.fillStyle = COLOR_BOARD;
     ctx.strokeStyle = COLOR_BORDER 
     ctx.fillRect(0, 0, WIDTH, HEIGHT);
     ctx.strokeRect(STROKE / 2, STROKE / 2, WIDTH - STROKE, HEIGHT - STROKE);
 }
 // dessine les points
 function drawDot_connect_the_dots(x, y){
     ctx.fillStyle = COLOR_DOT;
     ctx.beginPath();
     ctx.arc(x, y, DOT, 0, Math.PI*2);
     ctx.fill();
 }
 //ecris le texte pour une ligne
 function drawText_connect_the_dots(text, x, y, color, size){
     ctx.fillStyle = color;
     ctx.font = size + "px sans-serif";
    // "px dejavu sans mono";
     ctx.fillText(text, x, y);
 } 
 // itére la function drawText pour toutes les boules
 function drawTEXT_connect_the_dots(){
     for(let i = 0; i < NOMBRE_QUESTION ; i++){
         drawText_connect_the_dots(QUESTION[0][i], CELL, getGridY_connect_the_dots(i, NOMBRE_QUESTION), COLOR_DOT_HIGH, TEXT_SIZE_CELL*2 );
     }
     for (let j = 0; j < NOMBRE_REPONSE; j++){
         drawText_connect_the_dots(QUESTION[1][j],WIDTH - CELL*3 ,getGridY_connect_the_dots(j, NOMBRE_REPONSE), COLOR_DOT_HIGH, TEXT_SIZE_CELL*2);
     }


 }
 // highight le dot sélectionné
 function highlightDot(i, j){
     ctx.fillStyle = COLOR_DOT_HIGH;
     ctx.beginPath();
     ctx.arc(squares_connect_the_dots[i][j].x ,squares_connect_the_dots[i][j].y, DOT/2, 0, Math.PI*2);
     ctx.fill();
 }

 // trace les lignes
 function drawLine(x0, y0, x1, y1, color){
     ctx.strokeStyle = color;
     ctx.beginPath();
     ctx.moveTo(x0, y0);
     ctx.lineTo(x1, y1);
     ctx.stroke();
 }
// affichage des scores
 function score_connect_the_dots(){
     Score = 0;
  
     for (let j =0; j < NOMBRE_TAB[0]; j++){
         if(squares_connect_the_dots[0][j].paired){
          if(squares_connect_the_dots[0][j].value == squares_connect_the_dots[squares_connect_the_dots[0][j].pair_i][squares_connect_the_dots[0][j].pair_j].value ){
                   //envoie des données au serveur
                   sendData(1, data_question, data_numb, (j+1));
            }else{
                 //envoie des données au serveur
                 sendData(0, data_question, data_numb, (j+1));
            }
             }else{
                  //envoie des données au serveur
                  sendData(9, data_question, data_numb, (j+1));
             }
     }
            //clear le canvas
               nettoyer_connect_the_dots();
            
 }

 async function sendData(Score, quest, quest_numb, sous_quest_numb){
      //option pour la fonction fetch
      const Score_data = {Score, local_class, local_Id,question: quest, quest_numb: quest_numb, sous_quest_numb: sous_quest_numb,version : 0};
      const options ={
          method: 'POST',
          headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(Score_data)
      };
      //async function pour poster le score au serveur
     const response = await fetch('/api', options);
     //reçois une réponse du serveur
     const server_data = await response.json();
 }

 function nettoyer_connect_the_dots(){

//remove event handlers

canv.removeEventListener("mousemove", highlightLine_connect_the_dots);
canv.removeEventListener("click", click_connect_the_dots);
drawBoard();
reference_liste(11);

 }
//début du quizz
function newGame(){

     //set up the squares_connect_the_dots
     squares_connect_the_dots = [];
     for(let i = 0; i < 2; i++){
         squares_connect_the_dots[i] = [];
         for(let j = 0; j < NOMBRE_TAB[i]; j++){
             squares_connect_the_dots[i][j] = new Square_connect_the_dots(i, getGridY_connect_the_dots(j, NOMBRE_TAB[i]), CELL2, CELL2);
             squares_connect_the_dots[i][j].value = REPONSE[i][j];
         }
      }

 }

//create the Square object constructor, va permettre de créer des carré virtuels qui seront placé là où on veut un input
function Square_connect_the_dots(x, y, w, h){

   //x == 0 lorsque on a une question, qui va se placer à gauche d'une décalage égal à 'BORDURE' et à droite les réponse 
     if(x == 0){
         x = BORDURE;
     }else{
         x = WIDTH - BORDURE;
     } 
     this.x = x;
     this.y = y;
     this.w = w;
     this.h = h;
     //les 4 suivants indiquent les coordonés des bords du carré
     this.left = x - w/2;
     this.right = x + w/2;
     this.top = y - h/2;
     this.bot = y + h/2;
     this.highlight = null;//est-ce qu'il a déjà été surligné
     this.selected = false;//est-ce que le point est utilisé actuellement
     this.used = false; //est-ce que le point a déjà été utilisé
     //est-ce que la box est associé à une autre (en tant que maitre)
     this.paired = false;
     //est-ce que la box est associé à une autre (en tant qu'esclave)
     this.pair_slave = false;
     //coordonnés de la box associé
     this.pair_x;
     this.pair_y;
     //position, dans la matrice d'objet box(classe Square), de la box associé
     this.pair_i;
     this.pair_j;
     //valeur associé à la box et qui doit être similaire à celle d'une autre box afin de faire les scores (but étant de relier les boxes qui ont la même value)
     this.value;
     // fonction qui return true quand on lui donne un point qui appartient au carré 
     this.contains  = function (x,y){
         return x >= this.left && x < this.right && y >= this.top && y < this.bot;
     }

     

   

}