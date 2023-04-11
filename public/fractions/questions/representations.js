
var x_representations = [290, 508,714,921];
var y_representations = [254,384,525];
var select_representations = 5;
var selection_representations = [[false,false,false,false],[false,false,false,false], [false,false,false,false]];
var reponse_representations = [[0,1,1,0],[1,0,0,1],[1,1,0,0]];
function interval_representations(){
    document.getElementById("espace").textContent = "Entoure les calculs corrects, barre les mauvais";
    document.getElementById("canvas").style.height = "520px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_representations;
    HEIGHT = 610;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_representations();
    rond_representations = document.createElement("i");
croix_representations = document.createElement("i");
document.getElementById("canvas").style.height = "720px";
rond_representations.style.display = "block";
rond_representations.setAttribute("id", "rond_entoure");
rond_representations.setAttribute("class", "far fa-circle");
rond_representations.setAttribute("aria-hidden", "false");
rond_representations.onclick = highlight_representations0;
rond_representations.style.bottom = "3rem";
document.getElementById("canvas").appendChild(rond_representations);
croix_representations.style.display= "block";
croix_representations.setAttribute("id", "croix_entoure");
croix_representations.setAttribute("aria-hidden", "false");
croix_representations.setAttribute("class", "far fa-times-circle");
croix_representations.onclick = highlight_representations1;
croix_representations.style.bottom = "3rem";
document.getElementById("canvas").appendChild(croix_representations);
document.getElementById("canv").addEventListener("click", entoureReponse_representations);

}
function drawImage_representations(){
    var temp_image = document.getElementById("representations_img");
    ctx.drawImage(temp_image, 5, 15, 1180, 600);
}
function highlight_representations0(){
    document.getElementById("rond_entoure").style.fontSize = "6rem";
    document.getElementById("croix_entoure").style.fontSize = "4rem";
    document.getElementById("croix_entoure").style.bottom = "3rem";
    document.getElementById("rond_entoure").style.bottom = "1.5rem";
    select_representations = true;
    }
function highlight_representations1(){
        document.getElementById("croix_entoure").style.fontSize = "6rem";
        document.getElementById("rond_entoure").style.fontSize = "4rem";
        document.getElementById("croix_entoure").style.bottom = "1.5rem";
        document.getElementById("rond_entoure").style.bottom = "3rem";
        select_representations = false;
    }
function entoureReponse_representations(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    for(j = 0; j < 3; j++){
        for(let i =0; i< 4; i++){
            if(x <(x_representations[i] + 125) && x > (x_representations[i] - 125)){ 
                if(y < (y_representations[j]+60) && y > (y_representations[j] -60)){
                    logique_representations(i , j);
                }
            }
    }
}
}
function logique_representations(i,j){
    if(selection_representations[j][i] === false){
        if(select_representations === true){
            selection_representations[j][i] = 1;
        }
        if(select_representations === false){
            selection_representations[j][i] = 0
        }
    }else{
        selection_representations[j][i] = false;
    }
    drawBoard();
    drawImage_representations();
    drawSelection_representations();
}
function drawSelection_representations(){
    for(j = 0; j < 3; j++){
        for(let i =0; i< 4; i++){
            if(selection_representations[j][i] === 0){
                drawCross_representations(x_representations[i], y_representations[j], WIDTH/4)
            }
            if(selection_representations[j][i] === 1){
                drawCircle_representations(x_representations[i], y_representations[j], WIDTH/4)
            }
    }
}
}
function drawCircle_representations(x, y, W){
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.scale(1.5, 1);
    ctx.beginPath();
    ctx.arc(x/1.5, y, 55, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.scale(1/1.5, 1);
}
function drawCross_representations(x, y, w){
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
function score_representations(){
    for(j = 0; j < 3; j++){
        for(let i =0; i< 4; i++){
            var t = ((j*4)+(i+1))
            if(selection_representations[j][i] === reponse_representations[j][i]){
               sendData(1, "entoure addition", 8, t)
            }else{
                if(selection_representations[j][i] === false){
                    sendData(9, "entoure addition", 8, t)
                 }else{
                    sendData(0, "entoure addition", 8, t)
                 }
            }
    }
}
nettoyer_representations();
}
function nettoyer_representations(){
    document.getElementById("croix_entoure").parentNode.removeChild(document.getElementById("croix_entoure"));
    document.getElementById("rond_entoure").parentNode.removeChild(document.getElementById("rond_entoure"));
    document.getElementById("canv").removeEventListener("click", entoureReponse_representations);
    drawBoard();
    reference_liste(9);
}