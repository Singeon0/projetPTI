var case_x_pattes = [193,452,670,908];
var case_y_pattes = [319,385];
var tolerance_pattes = [80,30];
var used_pattes = [[false,false], [false,false], [false,false], [false,false]];
function interval_pattes(){
    HEIGHT = 600;
    document.getElementById("canvas").style.height = "600px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById("espace").textContent = "Test sur la phylogénétique"
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_pattes;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_pattes();
    canv.addEventListener("click",coche_pattes);
}
function drawImage_pattes(){
    var formes_image = document.getElementById("pattes_img");
    ctx.drawImage(formes_image, 80, 100, 1100, 350)
}

function coche_pattes(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
      x = parseInt(ev.pageX - offsetX)-35;
      y = parseInt(ev.pageY - offsetY) - 20;
      for(let i =0; i<4; i++){
          for(let j=0; j<2; j++){
              if(x < case_x_pattes[i]+tolerance_pattes[0] && x > case_x_pattes[i]-tolerance_pattes[0] ){
                if(y < case_y_pattes[j]+tolerance_pattes[1] && y > case_y_pattes[j]-tolerance_pattes[1] ){
                    if(used_pattes[i][j] === false){
                        drawCircle_pattes(case_x_pattes[i],  case_y_pattes[j])
                        used_pattes[i][j] = 1;
                    }else{
                        if(used_pattes[i][j] == 1){
                            used_pattes[i][j] = false;
                        }
                    }
                    }
                
              }
          }
      }
      drawBoard();
      drawImage_pattes();
      for(let k =0; k<4; k++){
          for(let i =0; i < 2; i++){
            if(used_pattes[k][i] == 1){
                drawCircle_pattes(case_x_pattes[k],  case_y_pattes[i])
            }
          }
      }
}
function drawCircle_pattes(x, y){
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.scale(2, 1);
    ctx.beginPath();
    ctx.arc(x/2, y, 37, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.scale(0.5, 1);
}
function score_pattes(){
   nettoyer_pattes();
}
function nettoyer_pattes(){
    drawBoard();
    canv.removeEventListener("click",coche_pattes);
    reference_liste(13);
}