var coordX_vrai_faux;
var coordY_vrai_faux;
var coordX_select_vrai_faux;   
var coordY_select_vrai_faux; 
var selected_vrai_faux;
var tolerance_vrai_faux;
var options_vrai_faux;
var selectWidth_vrai_faux;
var rect_vrai_faux;
var rep_vrai_faux;
var quest_name_vrai_faux;
var quest_numb_vrai_faux;
var image_vrai_faux;
function interval_vrai_faux(){
 HEIGHT = 1500;
 document.getElementById("canvas").style.height = "1500px";
 document.getElementById("body").style.height= "1800px";
 document.getElementById("espace").textContent = "Test sur la phylogénétique"
 document.getElementById('next_arrow').style.bottom = "10rem";
 document.getElementById("next_arrow").onclick = score_vrai_faux;
 document.getElementById("canv").addEventListener("click",select_vrai_faux )
 canv.height = HEIGHT;
 canv.width = WIDTH;
 drawBoard();
 drawImage_vrai_faux();
 createSelect_vrai_faux();
}
function drawImage_vrai_faux(){
    var formes_image = document.getElementById(image_vrai_faux);
    ctx.drawImage(formes_image, 25, 25, 1150, 1400);
    for(let i = 0; i < rect_vrai_faux[1].length;i++ ){
        ctx.fillStyle = "white";
        ctx.fillRect(rect_vrai_faux[0], rect_vrai_faux[1][i], rect_vrai_faux[2],rect_vrai_faux[3]);
    }
}
function createSelect_vrai_faux(){
    for(let i = 0; i < coordY_vrai_faux.length; i++){
            var temp = document.createElement("SELECT");
            temp.setAttribute("id", "select_vrai_faux"+i);
            temp.setAttribute("CLASS", "select2_descriptif");
            for(let k = 0; k < options_vrai_faux[i].length; k++){
                var option = document.createElement("option");
                option.text = options_vrai_faux[i][k]
                temp.add(option);
            }
            document.getElementById("canvas").appendChild(temp);
            temp.style.left =coordX_select_vrai_faux[i]+"px";
            temp.style.top = coordY_select_vrai_faux[i]+"px";
            temp.style.width = selectWidth_vrai_faux[i]+"px";
        }
}
function select_vrai_faux(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
      x = parseInt(ev.pageX - offsetX)-35;
      y = parseInt(ev.pageY - offsetY) - 20;
      for(let i =0; i < coordX_vrai_faux.length; i++){
          for(let j =0; j < coordY_vrai_faux.length; j++){
              if(x > coordX_vrai_faux[i] - tolerance_vrai_faux && x < coordX_vrai_faux[i] + tolerance_vrai_faux){
                  if(y > coordY_vrai_faux[j] - tolerance_vrai_faux && y < coordY_vrai_faux[j] + tolerance_vrai_faux){
                    selected_vrai_faux[j] = i;
                  }
              }
          }
      }
      drawAllCircle_vrai_faux();
}
function drawAllCircle_vrai_faux(){
    drawImage_vrai_faux();
    for(let j =0; j < coordY_vrai_faux.length; j++){
        if(selected_vrai_faux[j] !== false){
            drawCircle_vrai_faux(coordX_vrai_faux[selected_vrai_faux[j]], coordY_vrai_faux[j]);
        }
    }
}
function drawCircle_vrai_faux(x, y){
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.scale(2, 1);
    ctx.beginPath();
    ctx.arc(x/2, y, 19, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.scale(0.5, 1);
}
function score_vrai_faux(){
for(let i = 0; i <rep_vrai_faux.length; i++){
    var score  = [false,false];
    if(selected_vrai_faux[i] === false){
        sendData(9,quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+1));
    }else{
        if(selected_vrai_faux[i] === rep_vrai_faux[i][0]){
            sendData(1,quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+1));
            score[0] = 1;
        }else{
            sendData(0,quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+1));
            score[0] = 0;
        }
    }
    if(document.getElementById("select_vrai_faux"+i).value === "................" ){
        sendData(9,quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+2));
    }else{
        var temp = 0;
        for(let j = 1; j < rep_vrai_faux[i].length;j++){
            if(document.getElementById("select_vrai_faux"+i).value == rep_vrai_faux[i][j]){
                sendData(1,quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+2));
                score[1] = 1;
                ++temp;
            }
        }
        if(temp == 0){
            sendData(0,quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+2));
            score[1] = 0;
        }
    }
//item de précision, ignoré
sendData(9,quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+3));
if(score[0] === false ||score[1 ] === false ){
    sendData(9,quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+4));
}else{
    if(score[0] === 1 && score[1] === 1 ){
        sendData(1,quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+4));
    }else{
        if(score[0] === 1 && score[1] === 0 ){
            sendData("0A",quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+4));
        }else{
            if(score[0] === 0 && score[1] === 1 ){
                sendData("0B",quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+4));
            }else{
                sendData("0C",quest_name_vrai_faux, quest_numb_vrai_faux, (i*4+4));
            }
        }
    }
}


}
nettoyer_vrai_faux();
}
function nettoyer_vrai_faux(){
    document.getElementById("canv").removeEventListener("click",select_vrai_faux )
    for(let i = 0; i < coordY_vrai_faux.length; i++){
        document.getElementById("select_vrai_faux"+i).parentNode.removeChild(document.getElementById("select_vrai_faux"+i));
    }
    drawBoard();
    reference_liste(quest_numb_vrai_faux+1);
}