var case_x_photographie = [59, 429, 800];
var case_y_photographie = [426, 481, 535];
var tolerance_photographie = 20;
var rep1_photographie = [[0,1,1],[0,1,0],[0,0,0]];
var rep0A_photographie = [[1,1,1],[0,1,1],[1,0,1]];
var rep0B_photographie = [[0,1,1],[0,1,0],[0,1,0]];
var rep0C_photographie = [[1,1,1],[1,1,1],[1,1,1]];
var rep0D_photographie = [[],[],[]];
var used_photographie = [[0,0,0], [0,0,0], [0,0,0]];
function interval_photographie(){
    HEIGHT = 600;
    document.getElementById("canvas").style.height = "600px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById("espace").textContent = "Test sur la phylogénétique";
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_photographie;
    canv.height = HEIGHT;
canv.width = WIDTH;
drawBoard();
drawImage_photographie();
canv.addEventListener("click",coche_photographie);

}
function drawImage_photographie(){
    var formes_image = document.getElementById("photographie_img");
ctx.drawImage(formes_image, 25, 25, 1100, 560);
}
function coche_photographie(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
      x = parseInt(ev.pageX - offsetX)-35;
      y = parseInt(ev.pageY - offsetY) - 20;
      for(let i =0; i<3; i++){
          for(let j=0; j<3; j++){
              if(x < case_x_photographie[i]+tolerance_photographie && x > case_x_photographie[i]-tolerance_photographie ){
                if(y < case_y_photographie[j]+tolerance_photographie && y > case_y_photographie[j]-tolerance_photographie ){
                    if(used_photographie[j][i] === 0){
                        drawcross_photographie(case_x_photographie[i],  case_y_photographie[j])
                        used_photographie[j][i] = 1;
                    }else{
                        if(used_photographie[j][i] == 1){
                            used_photographie[j][i] = 0;
                        }
                        drawBoard();
                        drawImage_photographie();
                        for(let k =0; k<3; k++){
                            for(let q = 0; q < 3; q++){
                                if(used_photographie[k][q] == 1){
                                    drawcross_photographie(case_x_photographie[q],  case_y_photographie[k])
                                }
                            }
                           
                        }
                    }
                    }
                
              }
          }
      }
}

function drawcross_photographie(x, y){
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
function score_photographie(){

        if(JSON.stringify(used_photographie) == JSON.stringify(rep1_photographie)){
           sendData(1, "photographie", 4, 1);
        }else{
            if(JSON.stringify(used_photographie) == JSON.stringify(rep0A_photographie)){
                sendData("0A", "photographie", 4, 1);
             }else{
                if(JSON.stringify(used_photographie) == JSON.stringify(rep0B_photographie)){
                    sendData("0B", "photographie", 4, 1);
                 }else{
                    if(JSON.stringify(used_photographie) == JSON.stringify(rep0C_photographie)){
                        sendData("0C", "photographie", 4, 1);
                     }else{
                        sendData("0D", "photographie", 4, 1);
                     }
                 }
             }
        }
       
        sendData(9, "photographie", 4, 2);
    nettoyer_photographie();
}
function nettoyer_photographie(){
    drawBoard();
    canv.removeEventListener("click",coche_photographie);
    reference_liste(5);
}