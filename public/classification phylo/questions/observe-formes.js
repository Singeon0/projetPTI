
var case_x_observe_formes = [462, 768, 925];
var case_y_observe_formes = [502, 727, 990];
var tolerance_observe_formes = 15;
var rep1_observe_formes = [1,2,0];
var rep0A_observe_formes = [0,0,1];
var rep0B_observe_formes = [2,1,2];
var used_observe_formes = [false, false, false];
function interval_observe_forme(){
    HEIGHT = 1200;
    document.getElementById("canvas").style.height = "1200px";
    document.getElementById("body").style.height= "1500px";
    document.getElementById("espace").textContent = "Test sur la phylogénétique";
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_observe_formes;
    canv.height = HEIGHT;
canv.width = WIDTH;
drawBoard();
drawImage_observe_formes();
canv.addEventListener("click",coche_observe_formes);

}
function drawImage_observe_formes(){
    var formes_image = document.getElementById("formes_img");
ctx.drawImage(formes_image, 25, 25, 1150, 1000);
}
function coche_observe_formes(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
      x = parseInt(ev.pageX - offsetX)-35;
      y = parseInt(ev.pageY - offsetY) - 20;
      for(let i =0; i<3; i++){
          for(let j=0; j<3; j++){
              if(x < case_x_observe_formes[i]+tolerance_observe_formes && x > case_x_observe_formes[i]-tolerance_observe_formes ){
                if(y < case_y_observe_formes[j]+tolerance_observe_formes && y > case_y_observe_formes[j]-tolerance_observe_formes ){
                    if(used_observe_formes[j] === false){
                        drawcross_observe_formes(case_x_observe_formes[i],  case_y_observe_formes[j])
                        used_observe_formes[j] = i;
                    }else{
                        if(used_observe_formes[j] == i){
                            used_observe_formes[j] = false;
                        }else{
                            used_observe_formes[j] = i;
                        }
                        drawBoard();
                        drawImage_observe_formes();
                        for(let k =0; k<3; k++){
                            if(used_observe_formes[k] !== false){
                                drawcross_observe_formes(case_x_observe_formes[used_observe_formes[k]],  case_y_observe_formes[k])
                            }
                        }
                    }
                    }
                
              }
          }
      }
}

function drawcross_observe_formes(x, y){
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 6;
    ctx.beginPath();
     ctx.moveTo(x-10, y-10);
     ctx.lineTo(x+10, y+10);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(x+10, y-10);
     ctx.lineTo(x-10, y+10);
     ctx.stroke();
}
function score_observe_formes(){
    for(let i = 0; i<3; i++){
        if(used_observe_formes[i] === rep1_observe_formes[i]){
            sendData(1, "observe formes", 1, (i+1));
        }
        if(used_observe_formes[i] === rep0A_observe_formes[i]){
            sendData("0A", "observe formes", 1, (i+1));
        }
        if(used_observe_formes[i] === rep0B_observe_formes[i]){
            sendData("0B", "observe formes", 1, (i+1));
        }
        if(used_observe_formes[i] === false){
            sendData(9, "observe formes", 1, (i+1));
        }
    }
    nettoyer_observe_forme();
}
function nettoyer_observe_forme(){
    drawBoard();
    canv.removeEventListener("click",coche_observe_formes);
    reference_liste(2);
}