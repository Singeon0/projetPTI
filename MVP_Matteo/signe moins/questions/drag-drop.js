var text_drag_drop = [];  
var rep_drag_drop = [];
var NOMBRE_TAB_DRAG_DROP = 3;
var TITLE_DRAG_DROP= ["négatif", "positif", "null"];
var NOMBRE_QUESTION_DRAG_DROP = 6;
function interval_drag_drop(){
  
  document.getElementById("espace").textContent =
    "Fait glisser les réponses dans le bon cadre";
  document.getElementById("canvas").style.height = '42rem';
canv.addEventListener("click", click_drag_drop);
document.getElementById("next_arrow").onclick = score_drag_drop;
document.getElementById("canvas").setAttribute("ondrop","drop_drag_drop(event)" );
document.getElementById("canvas").setAttribute("ondragover","allowDrop_drag_drop(event)" );
for(let i =0; i< NOMBRE_QUESTION_DRAG_DROP; i++){
  drag1 = drag + i;
  drag1 = document.createElement("label");
  drag1.setAttribute("id","drag_me"+i);
  rep_drag_drop.push(["drag_me"+i,Math.floor(Math.random() * 3) ])
  drag1.textContent = "drag me"+i+"!";
  drag1.setAttribute("class", "drag");
  drag1.setAttribute("draggable", "true");
  drag1.setAttribute("ondragstart","drag_drag_drop(event)");
  document.getElementById("canvas").appendChild(drag1);
}
call_drawRect_drag_drop();
drawTitle_drag_drop(TITLE_DRAG_DROP);
swal("Consignes : ", "Fais glisser les rectangles bleus dans la case qui leur correspond, tu peux enlever un mot mal placé en cliquant dessus !   ");
//à ajouter pour bypass la question
//nettoyer_drag_drop();

}
function drawTitle_drag_drop(TITLE_DRAG_DROP){
  for(let i =0;i < NOMBRE_TAB_DRAG_DROP; i++){
    drawText_vrai_faux(TITLE_DRAG_DROP[i], i*WIDTH/NOMBRE_TAB_DRAG_DROP+WIDTH/NOMBRE_TAB_DRAG_DROP/2.5, MARGIN/2, "black", TEXT_SIZE_CELL*2);
 
    }
}
function call_drawRect_drag_drop(){
for(let i =0;i < NOMBRE_TAB_DRAG_DROP; i++){
drawRect_drag_drop(0+(i*WIDTH/NOMBRE_TAB_DRAG_DROP), MARGIN, WIDTH/NOMBRE_TAB_DRAG_DROP, HEIGHT-MARGIN, COLOR_BORDER);
}


}  
function drawRect_drag_drop(x, y, WIDTH, HEIGHT, COLOR_BORDER){
  ctx.fillStyle = COLOR_BOARD;
  ctx.strokeStyle = COLOR_BORDER 
  ctx.fillRect(x, y, WIDTH, HEIGHT);
  ctx.strokeRect(STROKE / 2+x, STROKE / 2+y, WIDTH - STROKE, HEIGHT - STROKE);
}
  function allowDrop_drag_drop(ev) {
    var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
  var x = parseInt(ev.pageX - offsetX)-35;
var y = parseInt(ev.pageY - offsetY) - 20;
  var X = parseInt(x);
  var Y = parseInt(y);

  

    for(let i = 0; i < NOMBRE_TAB_DRAG_DROP; i++){
    if(i*WIDTH/NOMBRE_TAB_DRAG_DROP+DOT*3 < X && X <(i+1)*WIDTH/NOMBRE_TAB_DRAG_DROP-DOT*13){
      if(MARGIN+DOT*3 < Y && Y <HEIGHT-DOT*3){
  ev.preventDefault();}}
}}

function drag_drag_drop(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop_drag_drop(ev) {
 
 var data = ev.dataTransfer.getData("text");
  //ev.target.appendChild(document.getElementById(data));
  var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
  var x = parseInt(ev.pageX - offsetX)-35;
var y = parseInt(ev.pageY - offsetY) - 20;
  drawText_connect_the_dots(document.getElementById(data).textContent, x, y, "black", TEXT_SIZE_CELL*1.5);
  var X = parseInt(x);
  var Y = parseInt(y);
    ev.preventDefault();
    for(let i = 0; i < NOMBRE_TAB_DRAG_DROP; i++){
      if(i*WIDTH/NOMBRE_TAB_DRAG_DROP+DOT*3 < X && X <(i+1)*WIDTH/NOMBRE_TAB_DRAG_DROP-DOT*10){
        if(MARGIN+DOT*3 < Y && Y <HEIGHT-DOT*3){
          var pos = i;
    addText_drag_drop(data, X, Y, pos);
    document.getElementById(data).style.display = "none";
        }}}
}

function addText_drag_drop(data, x, y, pos){
  
  text_drag_drop.push([document.getElementById(data).textContent, x, y, data, pos])

  
  
  
}


function click_drag_drop(ev){
  var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
  var x = parseInt(ev.pageX - offsetX)-35;
var y = parseInt(ev.pageY - offsetY) - 20;
  for(let i =0; i < text_drag_drop.length; i++){
    if(position_drag_drop(x, y, i)){
      document.getElementById(text_drag_drop[i][3]).style.display = "initial";
      text_drag_drop.splice(i,1);
      
    }
    
}

call_drawRect_drag_drop();
  drawText_drag_drop();
 
}


function position_drag_drop(x,y,i){
  
  if(x > text_drag_drop[i][1] - 20 && x < text_drag_drop[i][1] + 100 ){
    if(y > text_drag_drop[i][2]-20 && y < text_drag_drop[i][2]+20){
      return true;
     
    }else{
      return false;
    }
  }else{
    return false;
  }
  
  
}

function drawText_drag_drop(){
   drawBoard();
   call_drawRect_drag_drop();
   drawTitle_drag_drop(TITLE_DRAG_DROP);
  for(let i =0; i < text_drag_drop.length; i++){
    drawText_connect_the_dots(text_drag_drop[i][0] ,text_drag_drop[i][1] , text_drag_drop[i][2], "black", TEXT_SIZE_CELL*1.5)
    
  }  
  
  
}

function score_drag_drop(){
  var score = 0;
  for(let j = 0; j< text_drag_drop.length; j++){
    for(let i = 0; i < NOMBRE_QUESTION_DRAG_DROP; i++){
     if(text_drag_drop[j][3]== rep_drag_drop[i][0]){
       if(text_drag_drop[j][4]== rep_drag_drop[i][1]){
         ++score;
       }
       }
     }
    }
nettoyer_drag_drop();

}

function nettoyer_drag_drop(){
  canv.removeEventListener("click", click_drag_drop);
for (let i =0; i < NOMBRE_QUESTION_DRAG_DROP; i++){
  document.getElementById("drag_me"+i).parentNode.removeChild(document.getElementById("drag_me"+i));
  drawBoard();
  document.getElementById("canvas").style.height = "auto";
}
reference_entoure_addition();
}

 