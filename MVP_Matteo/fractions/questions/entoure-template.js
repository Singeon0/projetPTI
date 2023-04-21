var x_entoure_template;
var y_entoure_template;
var img_entoure_template, imgStyle_entoure_template = [];
var rep_entoure_template;
var selection_entoure_template;
var select_entoure_template = 1;
var margin_entourer_template;
var next_entourer_template;
var data_question;
var data_number;
function interval_entoure_template(x, y, img,Rep, imgHeight, imgWidth, select, marg, next, quest_number, quest_name){
 x_entoure_template = x;
 y_entoure_template = y;
 img_entoure_template = img;
 rep_entoure_template = Rep;
 imgStyle_entoure_template[0] = imgHeight;
 imgStyle_entoure_template[1] = imgWidth;
 selection_entoure_template = select;
 margin_entourer_template = marg;
 next_entourer_template = next;
 data_question = quest_name;
 data_number = quest_number;
 document.getElementById("espace").textContent = "Entoure les expressions correctes, barre les incorrectes";
 document.getElementById("canvas").style.height = "700px";
 document.getElementById("body").style.height= "1000px";
 document.getElementById('next_arrow').style.bottom = "10rem";
 document.getElementById("next_arrow").onclick = score_entoure_template;
 HEIGHT = 700;
 canv.height = HEIGHT;
 canv.width = WIDTH;
 drawBoard();
 drawImage_entoure_template();
 rond_entoure_template = document.createElement("i");
croix_entoure_template = document.createElement("i");
document.getElementById("canvas").style.height = "auto";
rond_entoure_template.style.display = "block";
rond_entoure_template.setAttribute("id", "rond_entoure");
rond_entoure_template.setAttribute("class", "far fa-circle");
rond_entoure_template.setAttribute("aria-hidden", "false");
rond_entoure_template.onclick = highlight_entoure_template0;
rond_entoure_template.style.bottom = "3.5rem";
document.getElementById("canvas").appendChild(rond_entoure_template);
croix_entoure_template.style.display= "block";
croix_entoure_template.setAttribute("id", "croix_entoure");
croix_entoure_template.setAttribute("aria-hidden", "false");
croix_entoure_template.setAttribute("class", "far fa-times-circle");
croix_entoure_template.onclick = highlight_entoure_template1;
croix_entoure_template.style.bottom = "3.5rem";
document.getElementById("canvas").appendChild(croix_entoure_template);
document.getElementById("canv").addEventListener("click", entoureReponse_entoure_template);

}
function drawImage_entoure_template(){
    var temp_image = document.getElementById(img_entoure_template);
    ctx.drawImage(temp_image, 5, margin_entourer_template, imgStyle_entoure_template[1], imgStyle_entoure_template[0]);
}
function highlight_entoure_template0(){
    document.getElementById("rond_entoure").style.fontSize = "6rem";
    document.getElementById("croix_entoure").style.fontSize = "4rem";
    document.getElementById("croix_entoure").style.bottom = "3rem";
    document.getElementById("rond_entoure").style.bottom = "1.5rem";
    select_entoure_template = true;
    }
function highlight_entoure_template1(){
    document.getElementById("croix_entoure").style.fontSize = "6rem";
    document.getElementById("rond_entoure").style.fontSize = "4rem";
    document.getElementById("croix_entoure").style.bottom = "1.5rem";
    document.getElementById("rond_entoure").style.bottom = "3rem";
    select_entoure_template = false;
    }
function entoureReponse_entoure_template(ev){
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var x = parseInt(ev.pageX - offsetX)-35;
        var y = parseInt(ev.pageY - offsetY) - 20;
        for(j = 0; j < y_entoure_template.length; j++){
            for(let i =0; i< x_entoure_template[j].length; i++){
                if(x <(x_entoure_template[j][i] + 95) && x > (x_entoure_template[j][i] - 95)){ 
                    if(y < (y_entoure_template[j]+40) && y > (y_entoure_template[j] -40)){
                        logique_entoure_template(i , j);
                    }
                }
        }
    }
    
}
function logique_entoure_template(i,j){
    if(selection_entoure_template[j][i] === false){
        if(select_entoure_template === true){
            selection_entoure_template[j][i] = 1;
        }
        if(select_entoure_template === false){
            selection_entoure_template[j][i] = 0
        }
    }else{
        selection_entoure_template[j][i] = false;
    }
    drawBoard();
    drawImage_entoure_template();
    drawSelection_entoure_template();
}
function drawSelection_entoure_template(){
    for(let j = 0; j < y_entoure_template.length; j++){
        for(let i =0; i< x_entoure_template[j].length; i++){
            if(selection_entoure_template[j][i] === 0){
                drawCross_entoure_template(x_entoure_template[j][i], y_entoure_template[j])
            }
            if(selection_entoure_template[j][i] === 1){
                drawCircle_entoure_template(x_entoure_template[j][i], y_entoure_template[j])
            }
    }
}
}
function drawCircle_entoure_template(x, y){
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.scale(1.5, 1);
    ctx.beginPath();
    ctx.arc(x/1.5, y, 45, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.scale(1/1.5, 1);
}
function drawCross_entoure_template(x, y){
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
function score_entoure_template(){
    for(j = 0; j < y_entoure_template.length; j++){
        for(let i =0; i< x_entoure_template[j].length; i++){
            if(j > 0){
                var t = ((j*x_entoure_template[j-1].length)+(i+1))
            }else{
                var t = i+1;
            }
          
            if(selection_entoure_template[j][i] === rep_entoure_template[j][i]){
               sendData(1, data_question, data_number, t)
            }else{
                if(selection_entoure_template[j][i] === false){
                    sendData(9, data_question, data_number, t)
                 }else{
                    sendData(0, data_question, data_number, t)
                 }
            }
        }   
    }
    nettoyer_entoure_template();
}
function nettoyer_entoure_template(){
    document.getElementById("croix_entoure").parentNode.removeChild(document.getElementById("croix_entoure"));
    document.getElementById("rond_entoure").parentNode.removeChild(document.getElementById("rond_entoure"));
    document.getElementById("canv").removeEventListener("click", entoureReponse_entoure_template);
    drawBoard();
    reference_liste(next_entourer_template);
}