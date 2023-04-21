var x_caractere = [191,297,426,548,667,770,905,1041];
var y_caractere = [617,722,825,930,1037,1140];
var select_caractere = [[false,false,false,false,false,false,false],[false,false,false,false,false,false,false],[false,false,false,false,false,false,false],[false,false,false,false,false,false,false],[false,false,false,false,false,false,false]];
var Rep_caractere = [[true,true,true,true,false,false,false],[true,true,true,true,false,false,false],[true,true,true,true,false,false,false],[true,true,true,true,true,false,false],[true,false,false,false,false,true,true],]
function interval_caractere(){
    HEIGHT = 1200;
    document.getElementById("canvas").style.height = "1200px";
    document.getElementById("body").style.height= "1500px";
    document.getElementById("espace").textContent = "Test diagnostique"
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_caractere;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_caractere();
    canv.addEventListener("click",coche_caractere);
}
function drawImage_caractere(){
    var formes_image = document.getElementById("caractere_img");
    ctx.drawImage(formes_image, 25, 50, 1050, 1100);
}
function coche_caractere(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    x = parseInt(ev.pageX - offsetX)-35;
      y = parseInt(ev.pageY - offsetY) - 20;
for(let i =0; i< x_caractere.length-1; i++){
    for(let j =0; j < y_caractere.length-1; j++){
        if(x > x_caractere[i]+10 && x < (x_caractere[i+1]-20)){
            if(y > y_caractere[j]+10 && y < y_caractere[j+1]-10){
                if(select_caractere[j][i] === false){
                    select_caractere[j][i] = true;
                }else{
                    select_caractere[j][i] = false;
                }
          
            }
        }
    }
}
drawCross_caractere();
}
function drawCross_caractere(){
    drawBoard();
    drawImage_caractere();
    for(let i =0; i< x_caractere.length-1; i++){
        for(let j =0; j < y_caractere.length-1; j++){
            if(select_caractere[j][i] === true){
                var x = (x_caractere[i]+x_caractere[i+1])/2;
                var y = (y_caractere[j]+y_caractere[j+1])/2
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 6;
                ctx.beginPath();
                 ctx.moveTo(x-25, y-25);
                 ctx.lineTo(x+25, y+25);
                 ctx.stroke();
                 ctx.beginPath();
                 ctx.moveTo(x+25, y-25);
                 ctx.lineTo(x-25, y+25);
                 ctx.stroke();
            }}}
       
}
function score_caractere(){
    var temp = 0;
    for(let i =0; i< x_caractere.length-1; i++){
        for(let j =0; j < y_caractere.length-1; j++){
            if(select_caractere[j][i]===true){
                ++temp;
            }
        }}
        if(temp == 0 ){
            for(let k =0; k < 35; k++){
                sendData(9, "caractere", 10, (k+1));
            }
            sendData(9, "caractere", 10, 36);
        }else{
            var score = 0;
    for(let i =0; i< x_caractere.length-1; i++){
        for(let j =0; j < y_caractere.length-1; j++){
            var sousQuestNum = (j+1)+(i*5)
            if(select_caractere[j][i] == Rep_caractere[j][i]){
                ++score;
                sendData(1, "caractere", 10, sousQuestNum);
            }else{
                sendData(0, "caractere", 10, sousQuestNum);
            }
        }}
        if(score == 35){
            sendData(1, "caractere", 10, 36);
        }else{
            sendData(0, "caractere", 10, 36);
        }
    }
    nettoyer_caractere();
}
function nettoyer_caractere(){
    canv.removeEventListener("click",coche_caractere);
    drawBoard();
    reference_liste(11)
}