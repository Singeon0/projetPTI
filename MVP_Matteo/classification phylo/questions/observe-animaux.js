var case_x_observe_animaux = [471,792,950];
var case_y_observe_animaux = [751,987];
var tolerance_observe_animaux = 25;
var used_observe_animaux = [false, false];
var rep1_observe_animaux = [1,2];
var rep0A_observe_animaux = [0,0];
var rep0B_observe_animaux = [2,1];
function interval_observe_animaux(){
    HEIGHT = 1200;
    document.getElementById("canvas").style.height = "1200px";
    document.getElementById("body").style.height= "1500px";
    document.getElementById("espace").textContent = "Test sur la phylogénétique"
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_observe_animaux;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_observe_animaux();
    canv.addEventListener("click",coche_observe_animaux);
}
function drawImage_observe_animaux(){
    var formes_image = document.getElementById("observe_animaux_img");
    ctx.drawImage(formes_image, 25, 25, 1150, 1000);
}

function coche_observe_animaux(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
      x = parseInt(ev.pageX - offsetX)-35;
      y = parseInt(ev.pageY - offsetY) - 20;
      for(let i =0; i<3; i++){
          for(let j=0; j<2; j++){
              if(x < case_x_observe_animaux[i]+tolerance_observe_animaux && x > case_x_observe_animaux[i]-tolerance_observe_animaux ){
                if(y < case_y_observe_animaux[j]+tolerance_observe_animaux && y > case_y_observe_animaux[j]-tolerance_observe_animaux ){
                    if(used_observe_animaux[j] === false){
                        drawcross_observe_animaux(case_x_observe_animaux[i],  case_y_observe_animaux[j])
                        used_observe_animaux[j] = i;
                    }else{
                        if(used_observe_animaux[j] == i){
                            used_observe_animaux[j] = false;
                        }else{
                            used_observe_animaux[j] = i;
                        }
                        drawBoard();
                        drawImage_observe_animaux();
                        for(let k =0; k<3; k++){
                            if(used_observe_animaux[k] !== false){
                                drawcross_observe_animaux(case_x_observe_animaux[used_observe_animaux[k]],  case_y_observe_animaux[k])
                            }
                        }
                    }
                    }
                
              }
          }
      }
}
function drawcross_observe_animaux(x, y){
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
function score_observe_animaux(){
    for(let i = 0; i<2; i++){
        if(used_observe_animaux[i] === rep1_observe_animaux[i]){
            sendData(1, "observe animaux", 2, (i+1));
        }
        if(used_observe_animaux[i] === rep0A_observe_animaux[i]){
            sendData("0A", "observe animaux", 2, (i+1));
        }
        if(used_observe_animaux[i] === rep0B_observe_animaux[i]){
            sendData("0B", "observe animaux", 2, (i+1));
        }
        if(used_observe_animaux[i] === false){
            sendData(9, "observe animaux", 2, (i+1));
        }
    }
    nettoyer_observe_animaux();
}
function nettoyer_observe_animaux(){
    drawBoard();
    canv.removeEventListener("click",coche_observe_animaux);
    reference_liste(3);
}