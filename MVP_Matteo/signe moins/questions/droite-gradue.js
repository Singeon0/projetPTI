var text_droite_grad= [];
var shiftX, shiftY;
function interval_droite_grad(){

document.getElementById("next_arrow").onclick = score_droite_grad;
document.getElementById("espace").textContent = "Place le nombre -4 et le nombre 5 sur cette droite graduée";
document.getElementById("canvas").setAttribute("ondrop","drop_droite_grad(event)" );
document.getElementById("canvas").setAttribute("ondragover","allowDrop_droite_grad(event)" );
document.body.addEventListener('drop', drop, true);
canv.addEventListener("click", click_droite_grad);

drawDroite_droit_grad();
createLabel_droite_grad(-4, 0);
createLabel_droite_grad(5, 1);
}
//nécessaire sur firefox de désactiver l'action par défaut sinon il redirige la page vers l'image quand on la drop
function drop(e){
    if(e.preventDefault) { e.preventDefault(); }
 
}
function drawDroite_droit_grad(){
  var droite_grad_img = document.getElementById("droite_grad");
  ctx.drawImage(droite_grad_img, 25, 150, 1150, 200);
}

function drop_droite_grad(ev){
    var data = ev.dataTransfer.getData("text");

    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;
    var X = parseInt(x);
    var Y = parseInt(y); 

    drawText_droite_gradue(document.getElementById(data).textContent, x - shiftX, y - shiftY, "black", TEXT_SIZE_CELL*3);
        document.getElementById(data).style.display = "none";
        text_droite_grad.push([document.getElementById(data).textContent, x - shiftX, y - shiftY, data])
}
function allowDrop_droite_grad(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;
    var X = parseInt(x);
    var Y = parseInt(y); 
 
    if( 120<y && y<320){
    ev.preventDefault();
    }
}
function drag_droite_grad(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    ev.dataTransfer.setData("text", ev.target.id);
     shiftX = x-( ev.target.offsetLeft- 30)-25;
    shiftY = y - (ev.target.offsetTop+30)-40;
    
}


function createLabel_droite_grad(e, i){
    
    drag1 = document.createElement("IMG");
    drag1.src = "signe moins/questions/images/drag"+(i+1)+".PNG";
    drag1.setAttribute("id","droite_grad_label"+i);
    drag1.textContent = e;
    drag1.style.position = "relative";
    drag1.setAttribute("draggable", "true");
    drag1.setAttribute("ondragstart","drag_droite_grad(event)");
    drag1.setAttribute("ondragend",()=>{});
    drag1.setAttribute("ondrop",()=>{});
    document.getElementById("canvas").appendChild(drag1);
    document.getElementById("droite_grad_label"+i).style.bottom = "8rem";
    document.getElementById("droite_grad_label"+i).style.fontSize = "2rem";
    document.getElementById("droite_grad_label"+i).style.marginLeft = "2rem";
}

function click_droite_grad(ev){
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var x = parseInt(ev.pageX - offsetX)-35;
        var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;
        var X = parseInt(x);
        var Y = parseInt(y); 
    for(let i =0; i<text_droite_grad.length; i++){
    if(x <text_droite_grad[i][1]+20 && x >text_droite_grad[i][1]-30){
        if(y <text_droite_grad[i][2]-25 && y >text_droite_grad[i][2]-85){
            document.getElementById(text_droite_grad[i][3]).style.display = "initial";
            text_droite_grad.splice(i,1);
            ctx.clearRect(0, 0, 600, 1200);
            drawBoard();
            drawDroite_droit_grad();
            drawBoard();
            drawDroite_droit_grad();
            for(let k = 0; k< text_droite_grad.length; k++){
                drawText_droite_gradue(text_droite_grad[k][0], text_droite_grad[k][1],text_droite_grad[k][2] , "black", TEXT_SIZE_CELL*3);
            }
        }   
    }
    }
}
function drawText_droite_gradue(text, x, y, color, size){
   
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x-30, y-25);
    ctx.lineTo(x+30 ,y-25);
    ctx.closePath();
    ctx.fillStyle = "#00abcc";
    ctx.fill();
    ctx.fillStyle = "#00abcc";
    ctx.fillRect(x-30,y-85, 60,60)
    ctx.fillStyle = color;
    if(text.length == 1){
        ctx.font = size + "px dejavu sans mono";
        ctx.fillText(text, x-15, y-45);
    }else{
        ctx.font = size + "px dejavu sans mono";
        ctx.fillText(text, x-25, y-45);
    }        
} 
function score_droite_grad(){
    var score = null;

    if(text_droite_grad.length <2 || text_droite_grad.length == undefined){
        score = 9;
        
    }else{
        if(text_droite_grad[0][0]== -4){
            if(text_droite_grad[0][1] <=text_droite_grad[1][1]){
               score = 1;
            }else{
               score = 0;
            }
        }
        if(text_droite_grad[0][0]== 5){
            if(text_droite_grad[0][1] >=text_droite_grad[1][1]){
            score = 1;
            }else{
               score = 0;
            }
        }
    }
sendData(score, "droite gradué", 3, 1);
nettoyer_droite_grad();

}
function nettoyer_droite_grad(){
    canv.removeEventListener("click", click_droite_grad);
    document.getElementById("droite_grad_label0").parentNode.removeChild(document.getElementById("droite_grad_label0"));
    document.getElementById("droite_grad_label1").parentNode.removeChild(document.getElementById("droite_grad_label1"));
    drawBoard();
 
    reference_liste(4);
}