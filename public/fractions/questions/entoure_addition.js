var x_entoure_addition = [194, 472,756,1028];
var y_entoure_addition = [295,382];
var select_entoure_addition = 5;
var selection_entoure_addition = [[false,false,false,false],[false,false,false,false]];
var reponse_entoure_addition = [[0,1,1,0],[0,1,0,0]];
function interval_entoure_addition(){
    document.getElementById("espace").textContent = "Entoure les calculs corrects, barre les mauvais";
    document.getElementById("canvas").style.height = "520px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_entoure_addition;
    HEIGHT = 600;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_entoure_addition();
    rond_entoure_addition = document.createElement("i");
croix_entoure_addition = document.createElement("i");
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
document.getElementById("canv").addEventListener("click", entoureReponse_entoure_addition);

}
function drawImage_entoure_addition(){
    var temp_image = document.getElementById("entoure_addition_img");
    ctx.drawImage(temp_image, 5, 150, 1180, 300);
}
function highlight_entoure_addition0(){
    document.getElementById("rond_entoure").style.fontSize = "6rem";
    document.getElementById("croix_entoure").style.fontSize = "4rem";
    select_entoure_addition = true;
    }
function highlight_entoure_addition1(){
        document.getElementById("croix_entoure").style.fontSize = "6rem";
        document.getElementById("rond_entoure").style.fontSize = "4rem";
        select_entoure_addition = false;
    }
function entoureReponse_entoure_addition(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    for(j = 0; j < 2; j++){
        for(let i =0; i< 4; i++){
            if(x <(x_entoure_addition[i] + 120) && x > (x_entoure_addition[i] - 120)){  
                if(y < (y_entoure_addition[j]+40) && y > (y_entoure_addition[j] -40)){
                    logique_entoure_addition(i , j);
                }
            }
    }
}
}
function logique_entoure_addition(i,j){
    if(selection_entoure_addition[j][i] === false){
        if(select_entoure_addition === true){
            selection_entoure_addition[j][i] = 1;
        }
        if(select_entoure_addition === false){
            selection_entoure_addition[j][i] = 0
        }
    }else{
        selection_entoure_addition[j][i] = false;
    }
    drawBoard();
    drawImage_entoure_addition();
    drawSelection_entoure_addition();
}
function drawSelection_entoure_addition(){
    for(j = 0; j < 2; j++){
        for(let i =0; i< 4; i++){
            if(selection_entoure_addition[j][i] === 0){
                drawCross_entoure_addition(x_entoure_addition[i], y_entoure_addition[j], WIDTH/4)
            }
            if(selection_entoure_addition[j][i] === 1){
                drawCircle_entoure_addition(x_entoure_addition[i], y_entoure_addition[j], WIDTH/4)
            }
    }
}
}
function drawCircle_entoure_addition(x, y, W){
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.scale(2, 1);
    ctx.beginPath();
    ctx.arc(x/2, y, 39, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.scale(1/2, 1);
}
function drawCross_entoure_addition(x, y, w){
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.beginPath();
     ctx.moveTo(x-36, y-36);
     ctx.lineTo(x+36, y+36);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(x+36, y-36);
     ctx.lineTo(x-36, y+36);
     ctx.stroke();

}
function score_entoure_addition(){
    for(j = 0; j < 2; j++){
        for(let i =0; i< 4; i++){
            var t = ((j*4)+(i+1))
            if(selection_entoure_addition[j][i] === reponse_entoure_addition[j][i]){
               sendData(1, "entoure addition", 3, t)
            }else{
                if(selection_entoure_addition[j][i] === false){
                    sendData(9, "entoure addition", 3, t)
                 }else{
                    sendData(0, "entoure addition", 3, t)
                 }
            }
    }
}
nettoyer_entoure_addition();
}
function nettoyer_entoure_addition(){
    document.getElementById("croix_entoure").parentNode.removeChild(document.getElementById("croix_entoure"));
    document.getElementById("rond_entoure").parentNode.removeChild(document.getElementById("rond_entoure"));
    document.getElementById("canv").removeEventListener("click", entoureReponse_entoure_addition);
    drawBoard();
    reference_liste(4);
}