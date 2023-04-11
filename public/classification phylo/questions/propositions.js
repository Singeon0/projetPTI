var case_x_propositions = [56];
var case_y_propositions = [158,251,344,434,528];
var tolerance_propositions = 25;
var used_propositions = [false, false, false, false, false];
var rep1_propositions = [false, 0, 0, 0, false];
function interval_propositions(){
    HEIGHT = 600;
    document.getElementById("canvas").style.height = "600px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById("espace").textContent = "Test sur la phylogénétique"
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_propositions;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_propositions();
    canv.addEventListener("click",coche_propositions);
}
function drawImage_propositions(){
    var formes_image = document.getElementById("propositions_img");
    ctx.drawImage(formes_image, 25, 25, 1100, 600);
}

function coche_propositions(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
      x = parseInt(ev.pageX - offsetX)-35;
      y = parseInt(ev.pageY - offsetY) - 20;
      for(let i =0; i<1; i++){
          for(let j=0; j<5; j++){
              if(x < case_x_propositions[i]+tolerance_propositions && x > case_x_propositions[i]-tolerance_propositions ){
                if(y < case_y_propositions[j]+tolerance_propositions && y > case_y_propositions[j]-tolerance_propositions ){
                    if(used_propositions[j] === false){
                        drawcross_propositions(case_x_propositions[i],  case_y_propositions[j])
                        used_propositions[j] = i;
                    }else{
                        if(used_propositions[j] == i){
                            used_propositions[j] = false;
                        }else{
                            used_propositions[j] = i;
                        }
                        drawBoard();
                        drawImage_propositions();
                        for(let k =0; k<5; k++){
                            if(used_propositions[k] !== false){
                                drawcross_propositions(case_x_propositions[used_propositions[k]],  case_y_propositions[k])
                            }
                        }
                    }
                    }
                
              }
          }
      }
}
function drawcross_propositions(x, y){
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
function score_propositions(){
    var noRep = 0;
    for(let i = 0; i<5; i++){
        if(used_propositions[i] === false){
            ++noRep;
        }
    }
    if(noRep == 5){
        for(let i = 0; i<5; i++){
        sendData(9, "propositions", 3, (i+1));}
    }else{
    for(let i = 0; i<5; i++){
        if(used_propositions[i] === rep1_propositions[i]){
            sendData(1, "propositions", 3, (i+1));
        }else{
            sendData(0, "propositions", 3, (i+1));
        }}
    }
    nettoyer_propositions();
}
function nettoyer_propositions(){
    drawBoard();
    canv.removeEventListener("click",coche_propositions);
    reference_liste(4);
}