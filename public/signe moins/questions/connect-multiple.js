
 var NOMBRE_QUESTION_MULTIPLE = 6;
var NOMBRE_REPONSE_MULTIPLE = 3;
var NOMBRE_TAB_MULTIPLE = [NOMBRE_QUESTION_MULTIPLE, NOMBRE_REPONSE_MULTIPLE];
var NOMBRE_MULTIPLE = Math.max(NOMBRE_QUESTION_MULTIPLE, NOMBRE_REPONSE_MULTIPLE);
var NOMBRE2_MULTIPLE = Math.min(NOMBRE_QUESTION_MULTIPLE, NOMBRE_REPONSE_MULTIPLE);
var last_connect_mutliple = [];
var select_connect_multiple = false;
var highlight2_connect_multiple = false;
 //texte
 var QUESTION_MULTIPLE = ["- (4 + 7)","7 + (-5)"," 7 - 5","- (3 x 5)","(-5) + 2","1 - 6"];
 var REPONSE_MULTIPLE = ["Le signe “-” est utilisé pour indiquer une soustraction","Le signe “-” est utilisés pour indiquer un nombre négatif","Le signe “-” est utilisés pour indiquer un opposé"];
 var text_multiple = [QUESTION_MULTIPLE, REPONSE_MULTIPLE];
var value_connect_multiple= [[3,2,1,3,2,1],[1,2,3]];

function interval_connect_multiple(){
    ctx.lineWidth = STROKE;
//set up the canvas
  document.getElementById("espace").textContent = "Relie les questions aux réponses qui leurs corresponds";
  document.getElementById("canvas").style.width = WIDTH + "px";
  document.getElementById("canvas").style.height = '41rem';
  

 //start a new game
 newGame_multiple();
 drawBoard();
 drawQuestion_connect_multiple(NOMBRE_QUESTION_MULTIPLE, NOMBRE_REPONSE_MULTIPLE); 
 drawTEXT_connect_multiple();
 // event handlers
 canv.addEventListener("mousemove", highlightLine_connect_multiple);
 canv.addEventListener("click", click_connect_multiple);

 var retour = document.createElement("label");
 retour.setAttribute("id","retour_connect_multiple");
 retour.textContent = "Retour !";
 retour.onclick = retour_connect_multiple;
 document.getElementById("canvas").appendChild(retour);
 document.getElementById("next_arrow").onclick = score_connect_multiple;



//swal("Consignes : ", "Clique sur deux boules que tu souhaite relier, tu peux supprimer la dernière ligne que tu as tracé en appuyant sur ''retour !''. Quand tu as fini, clique sur la fléche rouge en bas à droite pour passer à la question suivante ! ");
//à supprimer (pour tester plus rapidement)
//nettoyer(); 
 
}


 //highlight avant de séléctionner
 function highlightLine_connect_multiple(/** @type {MouseEvent} */ ev){
      
    //get mouse position relative to the canvas
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-30;
    var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;
    
    //highlight the square's side
    highlightSide_connect_multiple(x, y);
    if(select_connect_multiple == true){
        highlightDot(temp_i, temp_j);
    }
   
    }
    
    function highlightSide_connect_multiple(x, y){
    
    
         //check each cell
      
         
         OUTER:  for(let i =0; i < 2; i++){
                 for (let j =0; j < NOMBRE_TAB_MULTIPLE[i]; j++){
                 if(squares_connect_the_dots[i][j].contains(x,y)){
                  if(highlight2_connect_multiple == true && squares_connect_the_dots[i][j] != squares_connect_the_dots[high_i][high_j] ){
                    clear_connect_multiple();
    
                 }
                     if(select_connect_multiple == true && i != temp_i && squares_connect_the_dots[i][j] != squares_connect_the_dots[temp_i][temp_j] ){
                         
                         drawLine(squares_connect_the_dots[temp_i][temp_j].x,squares_connect_the_dots[temp_i][temp_j].y, squares_connect_the_dots[i][j].x, squares_connect_the_dots[i][j].y, COLOR_PLAYER_LIT);
                         high_i = i;
                         high_j = j;
                         if(highlight2_connect_multiple == false){
                             highlight2_connect_multiple = true;
                         }
                     }
                     break OUTER;
                 
             }
         }
         }       
     } 

 // détecte un click
 function click_connect_multiple(/** @type {MouseEvent} */ ev){
   //get mouse position relative to the canvas
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var x = parseInt(ev.pageX - offsetX)-30;
var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;



    selectSide_connect_multiple(x, y);
 }
 //function effectué à chaque clic de l'utilisateur
 function selectSide_connect_multiple(x, y){
     OUTER:  for(let i =0; i < 2; i++){
             for (let j =0; j < NOMBRE_TAB_MULTIPLE[i]; j++){
      //il commence par repérer dans quelle case est le curseur
             if(squares_connect_the_dots[i][j].contains(x,y)){
           //si un carré est déja sélectionné, que le carré sur lequel on vient de cliquer est différent du précédent et qu'il n'est pas déjà utilisé alors trace une ligne depuis le carré déjà séléctionné jusqu'à celui que l'on vient de cliquer
                 if(select_connect_multiple == true && i != temp_i ){
                  if(temp_i == 0){
                      squares_connect_the_dots[i][j].pair_i.push(temp_i);
                      squares_connect_the_dots[i][j].pair_j.push(temp_j);
                      ++squares_connect_the_dots[temp_i][temp_j].used;
                      last_connect_mutliple.push(j);
                  }else{
                    squares_connect_the_dots[temp_i][temp_j].pair_i.push(i);
                    squares_connect_the_dots[temp_i][temp_j].pair_j.push(j);
                    ++ squares_connect_the_dots[i][j].used;
                    last_connect_mutliple.push(temp_j);
                  }
                  drawLine(squares_connect_the_dots[temp_i][temp_j].x,squares_connect_the_dots[temp_i][temp_j].y, squares_connect_the_dots[i][j].x, squares_connect_the_dots[i][j].y, COLOR_PLAYER);
                     select_connect_multiple = false;
                         break OUTER; 
                     }
                     if(select_connect_multiple == false){
                    //si on a pas de carré déjà sélectionné et que le carré sur lequel on a cliqué n'est pas utilisé alors on le sélectionne et la variable 'select_connect_multiple' devient true pour indiquer qu'on a une sélection en cours
                     select_connect_multiple = true;
                     drawQuestion_connect_multiple(NOMBRE_QUESTION_MULTIPLE, NOMBRE_REPONSE_MULTIPLE); 
                     //on met le point sélectionné en évidence
                     highlightDot(i, j);
                  temp_i = i;
                  temp_j = j;
                 }
                
             }
         }
     }
 }

 //fonction qui redraw tout le canvas pour appliquer les changements (lignes enlevée...)
 function clear_connect_multiple(){
     drawBoard();
                
                for(let i =0; i < NOMBRE_REPONSE_MULTIPLE; i++){
            for (let j =0; j < squares_connect_the_dots[1][i].pair_j.length; j++){
               
                    drawLine(squares_connect_the_dots[1][i].x,squares_connect_the_dots[1][i].y,squares_connect_the_dots[0][squares_connect_the_dots[1][i].pair_j[j]].x ,squares_connect_the_dots[0][squares_connect_the_dots[1][i].pair_j[j]].y, COLOR_PLAYER);
            }}
            drawQuestion_connect_multiple(NOMBRE_QUESTION_MULTIPLE, NOMBRE_REPONSE_MULTIPLE); 
            drawTEXT_connect_multiple();
 }

 // fait apparaitre les points pour les questions et les réponses
 function drawQuestion_connect_multiple(quest, rep){
     for(let i = 0; i < quest ; i++){
         drawDot_connect_the_dots(BORDURE*0.6, getGridY_connect_the_dots(i, NOMBRE_QUESTION_MULTIPLE));
     }
     for (let j = 0; j < rep; j++){
         drawDot_connect_the_dots(WIDTH - BORDURE*1.5, getGridY_connect_the_dots(j, NOMBRE_REPONSE_MULTIPLE));
     }

 } 

 function drawTEXT_connect_multiple(){
     for(let i = 0; i < NOMBRE_QUESTION_MULTIPLE ; i++){
         drawText_connect_the_dots(text_multiple[0][i], CELL, getGridY_connect_the_dots(i, NOMBRE_QUESTION_MULTIPLE), COLOR_DOT_HIGH, TEXT_SIZE_CELL*1.5 );
     } 
     for (let j = 0; j < NOMBRE_REPONSE_MULTIPLE; j++){
         drawText_connect_the_dots(text_multiple[1][j],WIDTH - CELL*7 ,getGridY_connect_the_dots(j, NOMBRE_REPONSE_MULTIPLE), COLOR_DOT_HIGH, TEXT_SIZE_CELL*1.5);
     }


 }

 function retour_connect_multiple(){
     if(last_connect_mutliple.length > 0){
var t = last_connect_mutliple.length-1;
squares_connect_the_dots[1][last_connect_mutliple[t]].pair_j.splice(-1);
last_connect_mutliple.splice(-1);
clear_connect_multiple();}
}



// affichage des scores
 function score_connect_multiple(){
    
    for(let k =1; k< NOMBRE_QUESTION_MULTIPLE+1; k++){
var found = false;
       for(let l=0; l < NOMBRE_REPONSE_MULTIPLE; l++ ){
            for(let m=0; m<squares_connect_the_dots[1][l].pair_j.length;m++){
                if(squares_connect_the_dots[0][squares_connect_the_dots[1][l].pair_j[m]].ref == k){
                    found =true;
                }

            }}
            if(found == false){
                sendData(9, 'connect the dots multiple', 7, k);
            }

    }
for(let i=0; i < NOMBRE_REPONSE_MULTIPLE; i++ ){
    for(let j=0; j<squares_connect_the_dots[1][i].pair_j.length;j++){
        if(squares_connect_the_dots[0][squares_connect_the_dots[1][i].pair_j[j]].used != 1){
            sendData(9, 'connect the dots multiple', 7, squares_connect_the_dots[0][squares_connect_the_dots[1][i].pair_j[j]].ref);
          
        }else{ 
            if(squares_connect_the_dots[1][i].value === squares_connect_the_dots[0][squares_connect_the_dots[1][i].pair_j[j]].value){
            //envoie des données au serveur
             sendData(1, 'connect the dots multiple', 7,  squares_connect_the_dots[0][squares_connect_the_dots[1][i].pair_j[j]].ref);
        
    }
    if(squares_connect_the_dots[1][i].value != squares_connect_the_dots[0][squares_connect_the_dots[1][i].pair_j[j]].value){
        //envoie des données au serveur
         sendData(0, 'connect the dots multiple', 7,  squares_connect_the_dots[0][squares_connect_the_dots[1][i].pair_j[j]].ref);
} }
   
}}
            //clear le canvas
               nettoyer_connect_multiple();
            
 }
 

 function nettoyer_connect_multiple(){

//remove event handlers
canv.removeEventListener("mousemove", highlightLine_connect_multiple);
canv.removeEventListener("click", click_connect_multiple);
drawBoard();
document.getElementById("canvas").style.height = "auto";
document.getElementById("retour_connect_multiple").style.display = "none";
document.getElementById("retour_connect_multiple").parentNode.removeChild(document.getElementById("retour_connect_multiple"));

//call for next question
 reference_liste(8);
 }
//début du quizz

function newGame_multiple(){

     //set up the squares_connect_the_dots
     squares_connect_the_dots = [];
     for(let i = 0; i < 2; i++){
         squares_connect_the_dots[i] = [];
         for(let j = 0; j < NOMBRE_TAB_MULTIPLE[i]; j++){
             squares_connect_the_dots[i][j] = new Square_connect_multiple(i, getGridY_connect_the_dots(j, NOMBRE_TAB_MULTIPLE[i]), CELL2, CELL2, (j+1));
             squares_connect_the_dots[i][j].value = value_connect_multiple[i][j];
            
         }
      }

 }

//create the Square object constructor, va permettre de créer des carré virtuels qui seront placé là où on veut un input
function Square_connect_multiple(x, y, w, h, ref){

   //x == 0 lorsque on a une question, qui va se placer à gauche d'une décalage égal à 'BORDURE' et à droite les réponse 
     if(x == 0){
         x = BORDURE*0.6;
     }else{
         x = WIDTH - BORDURE*1.5;
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
     
     
     this.used = 0; //est-ce que le point a déjà été utilisé (relié à un autre)
    
     //coordonnés de la box associé
     this.pair_x =[];
     this.pair_y = [];
     //position, dans la matrice d'objet box(classe Square), de la box associé
     this.pair_i = [];
     this.pair_j = [];
     //valeur associé à la box et qui doit être similaire à celle d'une autre box afin de faire les scores (but étant de relier les boxes qui ont la même value)
     this.value;
     //numéro de la sous question
     this.ref = ref;
     // fonction qui return true quand on lui donne un point qui appartient au carré 
     this.contains  = function (x,y){
         return x >= this.left && x < this.right && y >= this.top && y < this.bot;
     }

     

   

}