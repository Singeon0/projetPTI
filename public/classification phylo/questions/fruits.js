var case_x_fruits = [281,472,661,830,994];
var case_y_fruits = [319];
var tolerance_fruits = 80;
var used_fruits = [false, false, false, false,false];
function interval_fruits(){
    HEIGHT = 600;
    document.getElementById("canvas").style.height = "600px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById("espace").textContent = "Test sur la phylogénétique"
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_fruits;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_fruits();
    canv.addEventListener("click",coche_fruits);
}
function drawImage_fruits(){
    var formes_image = document.getElementById("fruits_img");
    ctx.drawImage(formes_image, 40, 100, 1100, 400)
}

function coche_fruits(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
      x = parseInt(ev.pageX - offsetX)-35;
      y = parseInt(ev.pageY - offsetY) - 20;
      for(let i =0; i<5; i++){
          for(let j=0; j<1; j++){
              if(x < case_x_fruits[i]+tolerance_fruits && x > case_x_fruits[i]-tolerance_fruits ){
                if(y < case_y_fruits[j]+tolerance_fruits && y > case_y_fruits[j]-tolerance_fruits ){
                    if(used_fruits[i] === false){
                        drawCircle_fruits(case_x_fruits[i],  case_y_fruits[j])
                        used_fruits[i] = 1;
                    }else{
                        if(used_fruits[i] == 1){
                            used_fruits[i] = false;
                        }
                        drawBoard();
                        drawImage_fruits();
                        for(let k =0; k<5; k++){
                            if(used_fruits[k] == 1){
                                drawCircle_fruits(case_x_fruits[k],  case_y_fruits[0])
                            }
                        }
                    }
                    }
                
              }
          }
      }
}
function drawCircle_fruits(x, y){
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.scale(2, 1);
    ctx.beginPath();
    ctx.arc(x/2, y, 37, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.scale(0.5, 1);
}
function score_fruits(){
    nettoyer_fruits();
}
function nettoyer_fruits(){
    drawBoard();
    canv.removeEventListener("click",coche_fruits);
    reference_liste(6);
}