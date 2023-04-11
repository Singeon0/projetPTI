var NOMBRE_COL_ENTOURE_QUESTION ;
var NOMBRE_RAW_ENTOURE_QUESTION = 2;
var HEIGHT_CELL_ENTOURE_ADDITION = HEIGHT/4;
var WIDTH_CELL_ENTOURE_ADDITION;
var select_entoure_addition = 0;
var squares_entoure_addition = 0;
var tab_entoure_addition;
var QUESTION_ENTOURE_ADDITION
var REPONSE_ENTOURE_ADDITION;
var first_entoure_addition = true;
var data_question, data_number;
var ref_entoure_addition;
rond_entoure_addition = document.createElement("i");
croix_entoure_addition = document.createElement("i");
function interval_entoure_addition(Q, R, q, n, col, ref){
    QUESTION_ENTOURE_ADDITION = Q;
    REPONSE_ENTOURE_ADDITION = R
    data_question = q;
    data_number = n;
    NOMBRE_COL_ENTOURE_QUESTION = col;
    ref_entoure_addition = ref;
    tab_entoure_addition = [col, col, 2];
    WIDTH_CELL_ENTOURE_ADDITION = WIDTH/NOMBRE_COL_ENTOURE_QUESTION;
create_squares_entoure_addition();
call_drawRect_entoure_addition();

document.getElementById("canvas").style.height = "auto";
rond_entoure_addition.style.display = "block";
rond_entoure_addition.setAttribute("id", "rond_entoure");
rond_entoure_addition.setAttribute("class", "far fa-circle");
rond_entoure_addition.setAttribute("aria-hidden", "false");
rond_entoure_addition.onclick = highlight_entoure_addition0;
document.getElementById("canvas").appendChild(rond_entoure_addition);
croix_entoure_addition.style.display= "block";
croix_entoure_addition.setAttribute("id", "croix_entoure");
croix_entoure_addition.setAttribute("aria-hidden", "false");
croix_entoure_addition.setAttribute("class", "far fa-times-circle");
croix_entoure_addition.onclick = highlight_entoure_addition1;
document.getElementById("canvas").appendChild(croix_entoure_addition);
document.getElementById("next_arrow").onclick = score_entoure_addition;
document.getElementById("espace").textContent = "Entoure les calculs corrects, barre les mauvais";



canv.addEventListener("click", click_entoure_addition);
//swal("Consignes : ", "clique sur le rond vert pour sélectioner ''entourer'' et clique sur le rond rouge avec une croix pour sélectionner ''barrer'' !    ");
 //fonction à faiire apparaitre pour bypass le vrai_faux (utile pour test la fonction suivante sans se taper le vrai faux à chaque fois)
 //nettoyer_entoure_addition();


}



function call_drawRect_entoure_addition(){
    var k = 0;
    for(let j = 0; j<NOMBRE_RAW_ENTOURE_QUESTION; j++){
    for(let i =0;i < NOMBRE_COL_ENTOURE_QUESTION; i++){
    drawRect_entoure_addition(i*WIDTH/NOMBRE_COL_ENTOURE_QUESTION, HEIGHT_CELL_ENTOURE_ADDITION*j, WIDTH_CELL_ENTOURE_ADDITION,HEIGHT_CELL_ENTOURE_ADDITION, COLOR_BORDER);
    drawText_vrai_faux(QUESTION_ENTOURE_ADDITION[k], i*WIDTH/NOMBRE_COL_ENTOURE_QUESTION+WIDTH_CELL_ENTOURE_ADDITION/8, HEIGHT_CELL_ENTOURE_ADDITION*j+HEIGHT_CELL_ENTOURE_ADDITION/2, "black", TEXT_SIZE_CELL*1.5);
    ++k;    
    if(squares_entoure_addition[j][i].used == true){
        if(squares_entoure_addition[j][i].selected ===true){
            drawCircle_entoure_addition(squares_entoure_addition[j][i].x, squares_entoure_addition[j][i].y, WIDTH_CELL_ENTOURE_ADDITION/2);
        }
        if(squares_entoure_addition[j][i].selected === false){
            drawCross_entoure_addition(squares_entoure_addition[j][i].x, squares_entoure_addition[j][i].y, WIDTH_CELL_ENTOURE_ADDITION/2);
        }
    }
}}
    drawRect_entoure_addition(0, HEIGHT_CELL_ENTOURE_ADDITION*2, WIDTH/2,HEIGHT_CELL_ENTOURE_ADDITION, COLOR_BORDER);
    drawRect_entoure_addition((NOMBRE_COL_ENTOURE_QUESTION/2)*WIDTH/NOMBRE_COL_ENTOURE_QUESTION, HEIGHT_CELL_ENTOURE_ADDITION*2, WIDTH/2,HEIGHT_CELL_ENTOURE_ADDITION, COLOR_BORDER);
    drawText_vrai_faux(QUESTION_ENTOURE_ADDITION[2*NOMBRE_COL_ENTOURE_QUESTION], (WIDTH/4)/2, HEIGHT_CELL_ENTOURE_ADDITION*2+HEIGHT_CELL_ENTOURE_ADDITION/2, "black", TEXT_SIZE_CELL*1.5);
    drawText_vrai_faux(QUESTION_ENTOURE_ADDITION[2*NOMBRE_COL_ENTOURE_QUESTION+1],(1/2)*WIDTH+ (WIDTH/2)/4, HEIGHT_CELL_ENTOURE_ADDITION*2+HEIGHT_CELL_ENTOURE_ADDITION/2, "black", TEXT_SIZE_CELL*1.5);
if(squares_entoure_addition[2][0].used == true){
    if(squares_entoure_addition[2][0].selected ===true){
        drawCircle_entoure_addition(squares_entoure_addition[2][0].x, squares_entoure_addition[2][0].y, WIDTH/4);
      
    }if(squares_entoure_addition[2][0].selected === false){
        drawCross_entoure_addition(squares_entoure_addition[2][0].x, squares_entoure_addition[2][0].y, WIDTH/4);
    }

}if(squares_entoure_addition[2][1].used == true){
    if(squares_entoure_addition[2][1].selected === true){
        drawCircle_entoure_addition(squares_entoure_addition[2][1].x, squares_entoure_addition[2][1].y, WIDTH/4);
      
    }if(squares_entoure_addition[2][1].selected === false){
        drawCross_entoure_addition(squares_entoure_addition[2][1].x, squares_entoure_addition[2][1].y, WIDTH/4);
    }

}}
      
function drawRect_entoure_addition(x, y, WIDTH, HEIGHT, COLOR_BORDER){
      ctx.fillStyle = COLOR_BOARD;
      ctx.lineWidth = 2;
      ctx.strokeStyle = COLOR_BORDER 
      ctx.fillRect(x, y, WIDTH, HEIGHT);
      ctx.strokeRect(STROKE / 2+x, STROKE / 2+y, WIDTH - STROKE, HEIGHT - STROKE);
    }

function highlight_entoure_addition0(){
   
    document.getElementById("rond_entoure").style.fontSize = "6rem";
    document.getElementById("croix_entoure").style.fontSize = "4rem";
    document.getElementById("canvas").style.cursor = "url('images/téléchargé.png'), auto";
    select_entoure_addition = true;
    }
function highlight_entoure_addition1(){
        document.getElementById("croix_entoure").style.fontSize = "6rem";
        document.getElementById("rond_entoure").style.fontSize = "4rem";
        select_entoure_addition = false;
    }

function click_entoure_addition(){
    call_drawRect_entoure_addition();
var x = getX();
var y = getY()-document.getElementById("titreQuestions").height;
OUTER: for(let j = 0; j<NOMBRE_RAW_ENTOURE_QUESTION; j++){
    for(let i =0;i < NOMBRE_COL_ENTOURE_QUESTION; i++){
        if(squares_entoure_addition[j][i].contains(x, y) && squares_entoure_addition[j][i].used != true){
            if(select_entoure_addition){
               
                squares_entoure_addition[j][i].used = true;
                squares_entoure_addition[j][i].selected = true;
                drawCircle_entoure_addition(squares_entoure_addition[j][i].x, squares_entoure_addition[j][i].y, WIDTH_CELL_ENTOURE_ADDITION/2);
                break OUTER;
            }if(select_entoure_addition === false){
               
                squares_entoure_addition[j][i].used = true;
                squares_entoure_addition[j][i].selected = false;
                drawCross_entoure_addition(squares_entoure_addition[j][i].x, squares_entoure_addition[j][i].y, WIDTH_CELL_ENTOURE_ADDITION/2);
                break OUTER;
            }
        }
        if(squares_entoure_addition[j][i].contains(x, y) && squares_entoure_addition[j][i].used == true){
            squares_entoure_addition[j][i].used = false;
            squares_entoure_addition[j][i].selected = null;
            call_drawRect_entoure_addition();
            break OUTER;

        }
    }

}
if(squares_entoure_addition[2][0].contains(x, y) && squares_entoure_addition[2][0].used != true){
    if(select_entoure_addition){
        squares_entoure_addition[2][0].used = true;
        squares_entoure_addition[2][0].selected = true;
        drawCircle_entoure_addition(squares_entoure_addition[2][0].x, squares_entoure_addition[2][0].y, WIDTH/4);
        return;
    }if(select_entoure_addition === false){
        squares_entoure_addition[2][0].used = true;
        squares_entoure_addition[2][0].selected = false;
        drawCross_entoure_addition(squares_entoure_addition[2][0].x, squares_entoure_addition[2][0].y, WIDTH/4);
        return;
    }
}
if(squares_entoure_addition[2][0].contains(x, y) && squares_entoure_addition[2][0].used == true){
    squares_entoure_addition[2][0].used = false;
    squares_entoure_addition[2][0].selected = null;
    call_drawRect_entoure_addition();
   return;

}
if(squares_entoure_addition[2][1].contains(x, y) && squares_entoure_addition[2][1].used != true){
    if(select_entoure_addition){
        squares_entoure_addition[2][1].used = true;
        squares_entoure_addition[2][1].selected = true;
        drawCircle_entoure_addition(squares_entoure_addition[2][1].x, squares_entoure_addition[2][1].y, WIDTH/4);
        return;
    }
    if(select_entoure_addition === false){
        squares_entoure_addition[2][1].used = true;
        squares_entoure_addition[2][1].selected = false;
        drawCross_entoure_addition(squares_entoure_addition[2][1].x, squares_entoure_addition[2][1].y, WIDTH/4);
return;
    }
}
if(squares_entoure_addition[2][1].contains(x, y) && squares_entoure_addition[2][1].used == true){
    squares_entoure_addition[2][1].used = false;
    squares_entoure_addition[2][1].selected = null;
    call_drawRect_entoure_addition();
   return;

}
}

function drawCircle_entoure_addition(x, y, W){
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.scale(5-NOMBRE_COL_ENTOURE_QUESTION/2, 1);
    ctx.beginPath();
    ctx.arc((x+W)/(5-NOMBRE_COL_ENTOURE_QUESTION/2), 1*(y+HEIGHT_CELL_ENTOURE_ADDITION/2), 45, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.scale(1/(5-NOMBRE_COL_ENTOURE_QUESTION/2), 1);
}
function drawCross_entoure_addition(x, y, w){
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.beginPath();
     ctx.moveTo(x+w-40, y+HEIGHT_CELL_ENTOURE_ADDITION/2-40);
     ctx.lineTo(x+w+40, y+HEIGHT_CELL_ENTOURE_ADDITION/2+40);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(x+w+40, y+HEIGHT_CELL_ENTOURE_ADDITION/2-40);
     ctx.lineTo(x+w-40, y+HEIGHT_CELL_ENTOURE_ADDITION/2+40);
     ctx.stroke();

}

function create_squares_entoure_addition(){
    var n = 1;
    squares_entoure_addition = [];
    for(let j = 0; j<NOMBRE_RAW_ENTOURE_QUESTION; j++){
        squares_entoure_addition[j] = [];
        for(let i =0;i < NOMBRE_COL_ENTOURE_QUESTION; i++){
            squares_entoure_addition[j][i] = new Square_entoure_addition(i*WIDTH/NOMBRE_COL_ENTOURE_QUESTION, HEIGHT_CELL_ENTOURE_ADDITION*j,WIDTH_CELL_ENTOURE_ADDITION,HEIGHT_CELL_ENTOURE_ADDITION, REPONSE_ENTOURE_ADDITION[j][i], n );
        ++n;
     
    }
 }
    squares_entoure_addition[2] = [];
    squares_entoure_addition[2][0] = new Square_entoure_addition(0, HEIGHT_CELL_ENTOURE_ADDITION*2, WIDTH/2,HEIGHT_CELL_ENTOURE_ADDITION, REPONSE_ENTOURE_ADDITION[2][0],n);
    ++n;
    squares_entoure_addition[2][1] = new Square_entoure_addition((1/2)*WIDTH, HEIGHT_CELL_ENTOURE_ADDITION*2, WIDTH/2,HEIGHT_CELL_ENTOURE_ADDITION, REPONSE_ENTOURE_ADDITION[2][1],n);
    
   
   
}


function score_entoure_addition(){
 
for(let j = 0; j<NOMBRE_RAW_ENTOURE_QUESTION+1; j++){
    for(let i = 0 ; i < tab_entoure_addition[j]; i++){
        quest_numb = data_number;
        if(squares_entoure_addition[j][i].selected === REPONSE_ENTOURE_ADDITION[j][i]){
            
            sendData(1, data_question, quest_numb,  squares_entoure_addition[j][i].n);
        }if(squares_entoure_addition[j][i].selected != REPONSE_ENTOURE_ADDITION[j][i] && squares_entoure_addition[j][i].used === true){
            sendData(0, data_question, quest_numb,  squares_entoure_addition[j][i].n);
        }if(squares_entoure_addition[j][i].used != true){
            sendData(9, data_question, quest_numb,  squares_entoure_addition[j][i].n);
        }
    }
}
nettoyer_entoure_addition();
}

function nettoyer_entoure_addition(){
    canv.removeEventListener("click", click_entoure_addition);
    document.getElementById("rond_entoure").style.fontSize = "4rem";
    document.getElementById("croix_entoure").style.fontSize = "4rem";
    document.getElementById("croix_entoure").parentNode.removeChild(document.getElementById("croix_entoure"));
    document.getElementById("rond_entoure").parentNode.removeChild(document.getElementById("rond_entoure"));
    drawBoard();
    reference_liste(ref_entoure_addition);
    select_entoure_addition = 0;
}



//create the Square object constructor,  va permettre de créer des carré virtuels qui seront placé là où on veut un input
function Square_entoure_addition(x, y, w, h, value, n) {
    this.x = x;
    this.y = y;
    this.w = w ;
    this.h = h ;
    this.n = n;
    //les 4 suivants indiquent les coordonés des bords de la case
    this.left = x ;
    this.right = x + w;
    this.top = y ;
    this.bot = y + h;
  
    this.used = false; //est-ce que la case a déjà été utilisé
    this.selected = null;
 
    //valeur associé à la box et qui doit être similaire à celle de dus selecteur (entouré = true, barré = false) afin de faire les scores 
    this.value = value;
    // fonction qui return true quand on lui donne un point qui appartient au carré
    this.contains = function(x, y) {
      return x >= this.left && x < this.right && y >= this.top && y < this.bot;
    };
}
