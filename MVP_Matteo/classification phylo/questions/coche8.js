var case_x_coche8 = [103,487,872];
var case_y_coche8 = [398];
var tolerance_coche8 = 25;
var used_coche8 = [false];
var rep1_coche8 = [2];
var rep0A_coche8 = [0];
var rep0B_coche8 = [1];
function interval_coche8(){
    HEIGHT = 600;
    document.getElementById("canvas").style.height = "600px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById("espace").textContent = "Test diagnostique"
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_coche8;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_coche8();
    canv.addEventListener("click",coche_coche8);
}
function drawImage_coche8(){
    var formes_image = document.getElementById("coche8_img");
    ctx.drawImage(formes_image, 25, 125, 1050, 400);
}

function coche_coche8(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
      x = parseInt(ev.pageX - offsetX)-35;
      y = parseInt(ev.pageY - offsetY) - 20;
      for(let i =0; i<3; i++){
          for(let j=0; j<1; j++){
              if(x < case_x_coche8[i]+tolerance_coche8 && x > case_x_coche8[i]-tolerance_coche8 ){
                if(y < case_y_coche8[j]+tolerance_coche8 && y > case_y_coche8[j]-tolerance_coche8 ){
                    if(used_coche8[j] === false){
                        drawcross_coche8(case_x_coche8[i],  case_y_coche8[j])
                        used_coche8[j] = i;
                    }else{
                        if(used_coche8[j] == i){
                            used_coche8[j] = false;
                        }else{
                            used_coche8[j] = i;
                        }
                        drawBoard();
                        drawImage_coche8();
                        for(let k =0; k<3; k++){
                            if(used_coche8[k] !== false){
                                drawcross_coche8(case_x_coche8[used_coche8[k]],  case_y_coche8[k])
                            }
                        }
                    }
                    }
                
              }
          }
      }
}
function drawcross_coche8(x, y){
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 6;
    ctx.beginPath();
     ctx.moveTo(x-15, y-15);
     ctx.lineTo(x+15, y+15);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(x+15, y-15);
     ctx.lineTo(x-15, y+15);
     ctx.stroke();
}
function score_coche8(){
    for(let i = 0; i<1; i++){
        if(used_coche8[i] === rep1_coche8[i]){
            sendData(1, "coche 8", 8, (i+1));
        }
        if(used_coche8[i] === rep0A_coche8[i]){
            sendData("0A", "coche 8", 8, (i+1));
        }
        if(used_coche8[i] === rep0B_coche8[i]){
            sendData("0B", "coche 8", 8, (i+1));
        }
        if(used_coche8[i] === false){
            sendData(9, "coche 8", 8, (i+1));
        }
    }
    nettoyer_coche8();
}
function nettoyer_coche8(){
    drawBoard();
    canv.removeEventListener("click",coche_coche8);
    reference_liste(9);
}