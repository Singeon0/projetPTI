var QUESTION_RANGE_CROISSANT = [5,3,0,-6,-11,-1,10];
var temp_range_croissant = ["","","","","","",""];
var REPONSE_RANGE_CROISSANT = [-11,-6,-1,0,3,5,10];
var REPONSE_DECROISSANT_RANGE_CROISSANT = [10,5,3,0,-1,-6,-11];
var HEIGHT = 600; //pixel
var WIDTH = HEIGHT * 2;
const STROKE =  (HEIGHT / (7))/ 12; // stroke width
var TEXT_SIZE_CELL = 10;
 //colours
 const COLOR_BOARD = "white";
 const COLOR_BORDER = "#00abcc";
 const COLOR_DOT = "#a80039";
 const COLOR_DOT_HIGH = "black";
 const COLOR_PLAYER = "royalblue";
 const COLOR_PLAYER_LIT = "lightsteelblue";
 canv = document.getElementById("canvas");    
 canv.height = HEIGHT;
 canv.width = WIDTH;
    //set up the context
    ctx = canv.getContext("2d");
    canvRect = canv.getBoundingClientRect();   
    canv.addEventListener("click",getcoord);
    canv.addEventListener("click", click_range_croissant);
    ctx.strokeRect(50,50,100,100, "black")
console.log(canv.offsetHeight);
function interval_range_croissant(){

    
    //document.getElementById("next_arrow").onclick = score_range_croissant;
    document.getElementById("canvas").setAttribute("ondrop","drop_range_croissant(event)" );
    document.getElementById("canvas").setAttribute("ondragover","allowDrop_range_croissant(event)" );
    for(let i =0; i< QUESTION_RANGE_CROISSANT.length; i++){
        var drag1
      drag1 = document.createElement("label");
      drag1.setAttribute("id",QUESTION_RANGE_CROISSANT[i]);
      drag1.textContent = QUESTION_RANGE_CROISSANT[i];
      drag1.setAttribute("class", "range_croissant");
      drag1.setAttribute("draggable", "true");
      drag1.setAttribute("ondragstart","drag_range_croissant(event)");
      drag1.style.left = 430+i*55+"px";
      drag1.style.top = "300px";
      document.getElementById("canvas").appendChild(drag1);
    }
    drawRect_range_croissant();
}
function drawRect_range_croissant(){
for(let i = 0; i < QUESTION_RANGE_CROISSANT.length; i++){
    drawRect_entoure_addition(400+i*55, 300, 50,70, "black");
}

}

function getX(ev){
    return reference_x;
      
    }
    function getY(ev){
    return reference_y;
    
    }
function getcoord(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    reference_x = parseInt(ev.pageX - offsetX)-35;
    reference_y = parseInt(ev.pageY - offsetY) - 20;
    console.log("x : "+ reference_x);
    console.log("Y : "+ reference_y);
    ctx.strokeRect(reference_x , reference_y , 100,  100)
}
function drag_range_croissant(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop_range_croissant(ev){
    var data = ev.dataTransfer.getData("text");
   
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var x = parseInt(ev.pageX - offsetX)-35;
var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;
for(let i = 0; i < QUESTION_RANGE_CROISSANT.length; i++){
    if(x > 400+i*55 && x < 450+i*55 && y > 300 && y < 370){
            ev.preventDefault();
            temp_range_croissant[i] = data;
            drawBoard();
            drawRect_range_croissant();
            drawTEXT_range_croissant();
    }
}

}

function drawRect_entoure_addition(x, y, WIDTH, HEIGHT, COLOR_BORDER){
    ctx.fillStyle = COLOR_BOARD;
    ctx.lineWidth = 2;
    ctx.strokeStyle = COLOR_BORDER 
    ctx.fillRect(x, y, WIDTH, HEIGHT);
    ctx.strokeRect(STROKE / 2+x, STROKE / 2+y, WIDTH - STROKE, HEIGHT - STROKE);
  }
function allowDrop_range_croissant(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;
    var X = parseInt(x);
    var Y = parseInt(y);
    for(let i = 0; i < QUESTION_RANGE_CROISSANT.length; i++){
        if(x > 400+i*55 && x < 450+i*55 && y > 300 && y < 370){
            ev.preventDefault();
        }
    }
      
    

}

function click_range_croissant(ev){
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var x = parseInt(ev.pageX - offsetX)-35;
var y = parseInt(ev.pageY - offsetY) - 20;
for(let i = 0; i < QUESTION_RANGE_CROISSANT.length; i++){
    if(x > 400+i*55 && x < 450+i*55 && y > 300 && y < 370){
           
            temp_range_croissant[i] = "";
            drawBoard();
            drawRect_range_croissant();
            drawTEXT_range_croissant();
    }
}
}

function drawTEXT_range_croissant(){

for(let i =0 ; i < QUESTION_RANGE_CROISSANT.length; i++){
    if(temp_range_croissant[i] !==""){
        drawText_connect_the_dots(temp_range_croissant[i], 411+i*55, 342, "black", TEXT_SIZE_CELL*1.5);
    }
}

}
function score_range_croissant(){
    var complet = true;
for(let i = 0; i < QUESTION_RANGE_CROISSANT.length; i++){
    if(temp_range_croissant[i] === ""){
        complet = false;
    }}
if(complet == false){
    sendData(9, "range croissant", 20, 1);
}else{
if(temp_range_croissant.toString() === REPONSE_RANGE_CROISSANT.toString()){
    sendData(1, "range croissant", 20, 1);
}else{
    if(temp_range_croissant.toString() === REPONSE_DECROISSANT_RANGE_CROISSANT.toString()){
        sendData(0+"A", "range croissant", 20, 1);
    }else{
        if(temp_range_croissant[3].toString()===REPONSE_RANGE_CROISSANT[3].toString() && temp_range_croissant[4].toString()===REPONSE_RANGE_CROISSANT[4].toString() && temp_range_croissant[5].toString()===REPONSE_RANGE_CROISSANT[5].toString() && temp_range_croissant[6].toString()===REPONSE_RANGE_CROISSANT[6].toString()){
            sendData(0+"B", "range croissant", 20, 1);
        }else{
            sendData(0+"C", "range croissant", 20, 1);
             }
        }
    }
}
nettoyer_range_croissant();
}
function nettoyer_range_croissant(){
    for (let i =0; i < REPONSE_RANGE_CROISSANT.length ;i++ ){
        document.getElementById(QUESTION_RANGE_CROISSANT[i]).parentNode.removeChild(document.getElementById(QUESTION_RANGE_CROISSANT[i]));
    }
    drawBoard();
    reference_liste(21);
}