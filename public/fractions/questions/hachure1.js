var rads_rond = 0, rads_hexa = 0;
var selectX_rond = 756, selectY_rond = 260, selectX_rect = 82, selectY_rect = 342, selectX_hexa = 1110, selectY_hexa = 258;
var tolerance_hachure1 = 25;

var r, hexaCoord = [[1108, 260,1041,383],[1041,383,912,383],[912,383,847,263],[847,263,914,143],[914,143,1039,143],[1039,143,1100,260]];
function interval_hachure1(){
    HEIGHT = 650;
    document.getElementById("canvas").style.height = "650px";
    document.getElementById("body").style.height= "1100px";
    document.getElementById("espace").textContent = "Colorie la fraction indiqué";
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_hachure1;
    document.getElementById("canv").addEventListener("click", select_hachure1);
 
    
canv.height = HEIGHT;
canv.width = WIDTH;
drawBoard();
drawImage_hachure1();
initialisation_hachure1();
}
function drawImage_hachure1(){
    var temp_image = document.getElementById("hachure1_img");
    ctx.drawImage(temp_image, 5, 40, 1180, 500);
    var temp_image = document.getElementById("latte_hachure_img");
    ctx.drawImage(temp_image, 80, 350, 382, 40);
}
function initialisation_hachure1(){
    ctx.beginPath();
    ctx.arc(641+120, 263, 20, 0, 200, false);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(641+120, 263, 17, 0, 200, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(82, 342, 20, 0, 200, false);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(82, 342, 17, 0, 200, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(1110, 258, 20, 0, 200, false);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(1110, 258, 17, 0, 200, false);
    ctx.fillStyle = "white";
    ctx.fill();
}
function select_hachure1(e){
    var canvasOffset = $("#canvas").offset();
    var x = parseInt(e.pageX - canvasOffset.left)-35;
    var y = parseInt(e.pageY - canvasOffset.top)-20;
    if(x > (selectX_rond -tolerance_hachure1) && x < (selectX_rond + tolerance_hachure1)){
        if((y > selectY_rond - tolerance_hachure1) && (y < selectY_rond + tolerance_hachure1)){
             document.getElementById("canv").addEventListener("mousemove", hachure1_rond)
             document.getElementById("canv").removeEventListener("click", select_hachure1);
             document.getElementById("canv").addEventListener("click", hachure1_rond_stop);
        }
    }
    if(x > selectX_rect -tolerance_hachure1 && x < selectX_rect + tolerance_hachure1){
        if(y > selectY_rect - tolerance_hachure1 && y < selectY_rect + tolerance_hachure1){
            document.getElementById("canv").addEventListener("mousemove", hachure1_rect)
            document.getElementById("canv").removeEventListener("click", select_hachure1);
            document.getElementById("canv").addEventListener("click", hachure1_rect_stop);
        }}
        if(x > selectX_hexa -tolerance_hachure1 && x < selectX_hexa + tolerance_hachure1){
            if(y > selectY_hexa - tolerance_hachure1 && y < selectY_hexa + tolerance_hachure1){
                document.getElementById("canv").addEventListener("mousemove", hachure1_hexagone)
                document.getElementById("canv").removeEventListener("click", select_hachure1);
                document.getElementById("canv").addEventListener("click", hachure1_hexagone_stop);
            }}
}
function hachure1_rond(e) {

    var centerx = 641;
    var centery = 263;
    var canvasOffset = $("#canvas").offset();
    mouseX = parseInt(e.pageX - canvasOffset.left)-35;
    mouseY = parseInt(e.pageY - canvasOffset.top)-20;
    if(e !==false){
        rads_rond = Math.atan2(mouseY - centery, mouseX - centerx);
        var x = 120 * Math.cos(rads_rond) + centerx;
        var y = 120 * Math.sin(rads_rond) + centery;
        selectX_rond = x;
        selectY_rond = y;
        drawImage_hachure1();
        hachure1_rect(false);
        hachure1_hexagone(false);
    }
    var startAngle=0*Math.PI/2;
    var endAngle=startAngle+rads_rond;
    var radius = 119;
    var colors = "green";
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(centerx,centery);
    ctx.arc(centerx,centery,radius,startAngle,endAngle);
    ctx.closePath();
    ctx.fillStyle=colors;
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(selectX_rond, selectY_rond, 20, 0, 200, false);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(selectX_rond, selectY_rond, 17, 0, 200, false);
    ctx.fillStyle = "white";
    ctx.fill();
}
function hachure1_rond_stop(){
 document.getElementById("canv").removeEventListener("mousemove", hachure1_rond)
 document.getElementById("canv").removeEventListener("click", hachure1_rond_stop);
 document.getElementById("canv").addEventListener("click", select_hachure1);
}
function hachure1_rect(e){
  
    var canvasOffset = $("#canvas").offset();
    mouseX = parseInt(e.pageX - canvasOffset.left)-35;
    mouseY = parseInt(e.pageY - canvasOffset.top)-20;
    if(e !== false){
        selectX_rect = mouseX;
        if(selectX_rect < 82){
            selectX_rect = 82;
        }
        if(selectX_rect > 443){
            selectX_rect = 443;
        }   
        drawImage_hachure1();
        hachure1_rond(false);
        hachure1_hexagone(false);
    }
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(85, 167, selectX_rect-85,180)
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(selectX_rect, selectY_rect, 20, 0, 200, false);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(selectX_rect, selectY_rect, 17, 0, 200, false);
    ctx.fillStyle = "white";
    ctx.fill();

}
function hachure1_rect_stop(){
    document.getElementById("canv").removeEventListener("mousemove", hachure1_rect)
 document.getElementById("canv").removeEventListener("click", hachure1_rect_stop);
 document.getElementById("canv").addEventListener("click", select_hachure1);
}
function hachure1_hexagone(e){
    var centerx = 979;
    var centery = 263;
    var canvasOffset = $("#canvas").offset();
    mouseX = parseInt(e.pageX - canvasOffset.left)-35;
    mouseY = parseInt(e.pageY - canvasOffset.top)-20;
    if(e !==false){
        rads_hexa = Math.atan2(mouseY - centery, mouseX - centerx);
        var x = 125 * Math.cos(rads_hexa) + centerx;
        var y = 125 * Math.sin(rads_hexa) + centery;
        selectX_hexa = x;
        selectY_hexa = y;
        drawImage_hachure1();
        hachure1_rect(false);
        hachure1_rond(false);
    }
    var modulo = rads_hexa%1.0472;
    if(rads_hexa < 0){
        cote = parseInt((rads_hexa + Math.PI*2)/1.0472);
    }else{cote = parseInt(rads_hexa/1.0472);}
   
for(let i =0; i <= cote; i++){
    if(i == cote){
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.moveTo(centerx, centery);
        ctx.lineTo(hexaCoord[i][0], hexaCoord[i][1]);
        ctx.lineTo(selectX_hexa ,selectY_hexa);
        ctx.closePath();
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.globalAlpha = 1;
      
    }else{
        ctx.globalAlpha = 0.5
        ctx.beginPath();
        ctx.moveTo(centerx, centery);
        ctx.lineTo(hexaCoord[i][0], hexaCoord[i][1]);
        ctx.lineTo(hexaCoord[i][2], hexaCoord[i][3]);
        ctx.closePath();
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.globalAlpha = 1
    }
  
}
    ctx.beginPath();
    ctx.arc(selectX_hexa, selectY_hexa, 20, 0, 200, false);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(selectX_hexa, selectY_hexa, 17, 0, 200, false);
    ctx.fillStyle = "white";
    ctx.fill();
}
function hachure1_hexagone_stop(){
    document.getElementById("canv").removeEventListener("mousemove", hachure1_hexagone)
    document.getElementById("canv").removeEventListener("click", hachure1_hexagone_stop);
    document.getElementById("canv").addEventListener("click", select_hachure1);
}
function score_hachure1(){
 
if(selectX_rect > 115 && selectX_rect < 165){
    sendData(1, "hachure", 1, 1)
}else{
    if(selectX_rect < 85){
        sendData(9, "hachure", 1, 1)
    }else{
        sendData(0, "hachure", 1, 1)
    }
}
if(rads_hexa < -0.87 && rads_hexa > -1.3){
    sendData(1, "hachure", 1, 3)

}else{
    if(rads_hexa < 0.02 && rads_hexa > -0.02){
        sendData(9, "hachure", 1, 3)
    }else{
        sendData(0, "hachure", 1, 3)
    }}
if(rads_rond > -1.82 && rads_rond < -1.18){
    sendData(1, "hachure", 1, 2)

}else{
    if(rads_rond < 0.02 && rads_rond > -0.02){
        sendData(9, "hachure", 1, 2)
    }else{
        sendData(0, "hachure", 1, 2)
    }}
    nettoyer_hachure1();
}
function nettoyer_hachure1(){
    document.getElementById("canv").removeEventListener("mousemove", hachure1_rond)
    document.getElementById("canv").removeEventListener("click", hachure1_rond_stop);
    document.getElementById("canv").removeEventListener("mousemove", hachure1_rect)
    document.getElementById("canv").removeEventListener("click", hachure1_rect_stop);
    document.getElementById("canv").removeEventListener("mousemove", hachure1_hexagone)
    document.getElementById("canv").removeEventListener("click", hachure1_hexagone_stop);
    document.getElementById("canv").removeEventListener("click", select_hachure1);
    drawBoard();
    reference_liste(2);
}