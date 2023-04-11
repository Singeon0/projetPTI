
 var NOMBRE_QUESTION_MULTIPLE = 12;
var NOMBRE_REPONSE_MULTIPLE = 4;
var NOMBRE_TAB_MULTIPLE = [NOMBRE_QUESTION_MULTIPLE, NOMBRE_REPONSE_MULTIPLE];
var NOMBRE_MULTIPLE = Math.max(NOMBRE_QUESTION_MULTIPLE, NOMBRE_REPONSE_MULTIPLE);
var NOMBRE2_MULTIPLE = Math.min(NOMBRE_QUESTION_MULTIPLE, NOMBRE_REPONSE_MULTIPLE);
var last_connect_mutliple = [];

 //texte
 var QUESTION_MULTIPLE = ["Quatre","Deux cinquièmes","Cinq demis","Quatre centièmes","0,04","2,5","4",'0,4',"4%","40%","250%","400%"];
 var REPONSE_MULTIPLE = ["4/1","2/5","4/100","5/2"];
 var text_multiple = [QUESTION_MULTIPLE, REPONSE_MULTIPLE];
var value_connect_multiple= [[1,2,4,3,3,4,1,2,3,2,4,1],[1,2,3,4]];

function interval_connect_multiple(){
    ctx.lineWidth = STROKE*3;
//set up the canvas
  document.getElementById("espace").textContent = "Relie les questions aux réponses qui leurs corresponds";
  HEIGHT = 850;
    document.getElementById("canvas").style.height = "850px";
    document.getElementById("body").style.height= "1100px";
    document.getElementById('next_arrow').style.bottom = "5rem";
canv.height = HEIGHT;
canv.width = WIDTH;

 //start a new game
 newGame_multiple();
 drawBoard();
 drawConsigne_connect_multiple();
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
function drawConsigne_connect_multiple(){
    var temp_image = document.getElementById("consignes_connect_img");
    ctx.drawImage(temp_image, 25, 10, 1130, 100);
}

 //highlight avant de séléctionner
 function highlightLine_connect_multiple(/** @type {MouseEvent} */ ev){
      
    //get mouse position relative to the canvas
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-30;
    var y = parseInt(ev.pageY - offsetY) - 20;
    
    //highlight the square's side
    highlightSide_connect_multiple(x, y);
    if(select == true){
        highlightDot(temp_i, temp_j);
    }
   
    }
    
    function highlightSide_connect_multiple(x, y){
    
    
         //check each cell
      
         
         OUTER:  for(let i =0; i < 2; i++){
                 for (let j =0; j < NOMBRE_TAB_MULTIPLE[i]; j++){
                 if(squares_connect_the_dots[i][j].contains(x,y)){
                  if(highlight2 == true && squares_connect_the_dots[i][j] != squares_connect_the_dots[high_i][high_j] ){
                    clear_connect_multiple();
    
                 }
                     if(select == true && i != temp_i && squares_connect_the_dots[i][j] != squares_connect_the_dots[temp_i][temp_j] &&squares_connect_the_dots[i][j].used != true){
                         
                         drawLine_connect_multiple(squares_connect_the_dots[temp_i][temp_j].x,squares_connect_the_dots[temp_i][temp_j].y, squares_connect_the_dots[i][j].x, squares_connect_the_dots[i][j].y, COLOR_PLAYER_LIT);
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
 function click_connect_multiple(/** @type {MouseEvent} */ ev){
   //get mouse position relative to the canvas
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var x = parseInt(ev.pageX - offsetX)-30;
var y = parseInt(ev.pageY - offsetY) - 20;



    selectSide_connect_multiple(x, y);
 }
 //function effectué à chaque clic de l'utilisateur
 function selectSide_connect_multiple(x, y){
     OUTER:  for(let i =0; i < 2; i++){
             for (let j =0; j < NOMBRE_TAB_MULTIPLE[i]; j++){
      //il commence par repérer dans quelle case est le curseur
             if(squares_connect_the_dots[i][j].contains(x,y)){
           //si un carré est déja sélectionné, que le carré sur lequel on vient de cliquer est différent du précédent et qu'il n'est pas déjà utilisé alors trace une ligne depuis le carré déjà séléctionné jusqu'à celui que l'on vient de cliquer
                 if(select == true && i != temp_i && squares_connect_the_dots[i][j].used != true){
                  if(temp_i == 0){
                    squares_connect_the_dots[temp_i][temp_j].pair_i = i;
                    squares_connect_the_dots[temp_i][temp_j].pair_j = j;
                    squares_connect_the_dots[temp_i][temp_j].used = true;
                    last_connect_mutliple.push(temp_j);
                    
                  }else{
                    squares_connect_the_dots[i][j].pair_i = temp_i;
                    squares_connect_the_dots[i][j].pair_j = temp_j;
                    squares_connect_the_dots[i][j].used = true;
                    last_connect_mutliple.push(j);
                  }
                  drawLine_connect_multiple(squares_connect_the_dots[temp_i][temp_j].x,squares_connect_the_dots[temp_i][temp_j].y, squares_connect_the_dots[i][j].x, squares_connect_the_dots[i][j].y, COLOR_PLAYER);
                     select = false;
                         break OUTER; 
                     }else{
                         if(squares_connect_the_dots[i][j].used != true){
                        //si on a pas de carré déjà sélectionné et que le carré sur lequel on a cliqué n'est pas utilisé alors on le sélectionne et la variable 'select' devient true pour indiquer qu'on a une sélection en cours
                        select = true;
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
 }

 //fonction qui redraw tout le canvas pour appliquer les changements (lignes enlevée...)
 function clear_connect_multiple(){
     drawBoard();
     drawConsigne_connect_multiple();
                
                for(let i =0; i < NOMBRE_QUESTION_MULTIPLE; i++){
                    if(squares_connect_the_dots[0][i].used == true){
                        drawLine_connect_multiple(squares_connect_the_dots[0][i].x,squares_connect_the_dots[0][i].y,squares_connect_the_dots[1][squares_connect_the_dots[0][i].pair_j].x ,squares_connect_the_dots[1][squares_connect_the_dots[0][i].pair_j].y, COLOR_PLAYER);
                    }
            }
            drawQuestion_connect_multiple(NOMBRE_QUESTION_MULTIPLE, NOMBRE_REPONSE_MULTIPLE); 
            drawTEXT_connect_multiple();
 }

 // fait apparaitre les points pour les questions et les réponses
 function drawQuestion_connect_multiple(quest, rep){
     for(let i = 0; i < quest ; i++){
         drawDot_connect_the_dots(BORDURE, getGridY_connect_the_dots(i, NOMBRE_QUESTION_MULTIPLE)+50);
     }
     for (let j = 0; j < rep; j++){
         drawDot_connect_the_dots(WIDTH - BORDURE, getGridY_connect_the_dots(j, NOMBRE_REPONSE_MULTIPLE)+50);
     }

 } 

 function drawTEXT_connect_multiple(){
     for(let i = 0; i < NOMBRE_QUESTION_MULTIPLE ; i++){
         drawText_connect_the_dots(text_multiple[0][i], CELL*3, getGridY_connect_the_dots(i, NOMBRE_QUESTION_MULTIPLE)+50, COLOR_DOT_HIGH, TEXT_SIZE_CELL*2.2 );
     } 
     for (let j = 0; j < NOMBRE_REPONSE_MULTIPLE; j++){
         drawText_connect_the_dots(text_multiple[1][j],WIDTH - CELL*3 ,getGridY_connect_the_dots(j, NOMBRE_REPONSE_MULTIPLE)+50, COLOR_DOT_HIGH, TEXT_SIZE_CELL*2.2);
     }


 }
 function drawLine_connect_multiple(x0, y0, x1, y1, color){
    ctx.strokeStyle = color;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
}
 function retour_connect_multiple(){
     if(last_connect_mutliple.length > 0){
var t = last_connect_mutliple.length-1;
squares_connect_the_dots[0][last_connect_mutliple[t]].pair_j = false;
squares_connect_the_dots[0][last_connect_mutliple[t]].used = false;
last_connect_mutliple.splice(-1);
clear_connect_multiple();}
}



// affichage des scores
 function score_connect_multiple(){
     //chaque question contient l'info de la réponse à laquelle elle est relié, donc on itére à travers les questions et on compare la valeur de la réponse qui leur est associé avec la valeur de reférence
    for(let i =0;i < NOMBRE_QUESTION_MULTIPLE; i++){
        if(squares_connect_the_dots[0][i].used == true){
            if(squares_connect_the_dots[1][squares_connect_the_dots[0][i].pair_j].ref == value_connect_multiple[0][i]){
                sendData(1, 'connect the dots multiple', 16,  (i+1));
            }else{
                sendData(0, 'connect the dots multiple', 16, (i+1));
            }
        }else{
            sendData(9, 'connect the dots multiple', 16, (i+1));
        }
    }

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
 reference_liste(17);
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
         x = BORDURE;
     }else{
         x = WIDTH - BORDURE;
     } 
     this.x = x;
     this.y = y+50;
     this.w = w;
     this.h = h;
     //les 4 suivants indiquent les coordonés des bords du carré
     this.left = x - w/2;
     this.right = x + w/2;
     this.top = y - h/2;
     this.bot = y + h/2;
     
     
     this.used = false; //est-ce que le point a déjà été utilisé (relié à un autre)
    
     //coordonnés de la box associé
     this.pair_x;
     this.pair_y;
     //position, dans la matrice d'objet box(classe Square), de la box associé
     this.pair_i;
     this.pair_j;
     //valeur associé à la box et qui doit être similaire à celle d'une autre box afin de faire les scores (but étant de relier les boxes qui ont la même value)
     this.value;
     //numéro de la sous question
     this.ref = ref;
     // fonction qui return true quand on lui donne un point qui appartient au carré 
     this.contains  = function (x,y){
         return x >= this.left && x < this.right && y-50 >= this.top && y-50 < this.bot;
     }

     

   

}