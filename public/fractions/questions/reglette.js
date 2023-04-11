var x_reglette = [168,441];
var y_reglette = [[369,511],[200,339,483,624]]
var info_reglette = [[[false, "", ""],[false, "", ""]],[[false, "", ""],[false, "", ""],[false, "", ""],[false, "", ""]]];
var selected_reglette = [false, "", ""];
var repondu_reglette = 0;
var yDot_reglette = [224,368,510,660];
var xDot_reglette = [488,488,488,488];
var choixDot_reglette = false;
function interval_reglette(){   
    HEIGHT = 750;
    document.getElementById("canvas").style.height = "750px";
    document.getElementById("body").style.height= "1100px";
    document.getElementById("espace").textContent = "Relie la fraction à la vignette la plus adéquate et colorie cette fraction sur la vignette choisie";
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_reglette;
    document.getElementById("canv").addEventListener("click", select_reglette);
    document.getElementById("canv").addEventListener("click", selectColorie_reglette);
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_reglette();
    initialiseDot_reglette();
}
function drawImage_reglette(){
    var temp_image = document.getElementById("reglette_img");
    ctx.drawImage(temp_image, 5, 40, 1180, 700);
}
function select_reglette(e){
    var canvasOffset = $("#canvas").offset();
    var x = parseInt(e.pageX - canvasOffset.left)-35;
    var y = parseInt(e.pageY - canvasOffset.top)-20;
for(let i = 0; i < 2 ; i++){
    for(let j =0; j < y_reglette[i].length; j++){
        if(x < x_reglette[i]+30 && x > x_reglette[i] - 30){
            if(y < y_reglette[i][j] +30 && y > y_reglette[i][j] -30){
                if(selected_reglette[0] === false && repondu_reglette < 2 && info_reglette[i][j][0] === false ){
                    selected_reglette = [true,i,j] 
                    info_reglette[i][j][0] = "temp";
                }else{
                    if(selected_reglette[0] === true && info_reglette[i][j][0] === false && info_reglette[i][j][0]!="temp"&& selected_reglette[1] != i){
                        info_reglette[i][j][0] = true;
                        info_reglette[i][j][1] = selected_reglette[1];
                        info_reglette[i][j][2] = selected_reglette[2];
                        info_reglette[selected_reglette[1]][selected_reglette[2]][0] = true;
                        info_reglette[selected_reglette[1]][selected_reglette[2]][1] = i;
                        info_reglette[selected_reglette[1]][selected_reglette[2]][2] = j;
                        selected_reglette[0] = false;
                        selected_reglette[1] = "";
                        selected_reglette[2] = "";
                        ++repondu_reglette; 
                    }else{
                        if(info_reglette[i][j][0] === true){
                            info_reglette[info_reglette[i][j][1]][info_reglette[i][j][2]][0] = false;
                            info_reglette[info_reglette[i][j][1]][info_reglette[i][j][2]][1] = "";
                            info_reglette[info_reglette[i][j][1]][info_reglette[i][j][2]][2] = "";
                            info_reglette[i][j][0] = false;
                            info_reglette[i][j][1] = "";
                            info_reglette[i][j][2] = "";
                            --repondu_reglette;
                        }
                    }
                }
            }
        }
    }
}
for(let i =0; i< 4; i++){
    if(info_reglette[1][i][0] == false){
        xDot_reglette[i] = 488;
    }
}
drawBoard();
drawImage_reglette();
drawLink_reglette();
if(selected_reglette[0] === true){
highlight_reglette(x_reglette[selected_reglette[1]],y_reglette[selected_reglette[1]][selected_reglette[2]]);
}
    rect_reglette(false);
choixDot_reglette = false;
}
function highlight_reglette(x,y){
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x ,y, 13, 0, Math.PI*2);
    ctx.stroke();
}
function drawLink_reglette(){
    for(let i = 0; i < 2;i++){
        if(info_reglette[0][i][0] === true){
            ctx.strokeStyle = "black";
            ctx.beginPath();
            ctx.moveTo(x_reglette[0], y_reglette[0][i]);
            ctx.lineTo(x_reglette[info_reglette[0][i][1]], y_reglette[info_reglette[0][i][1]][info_reglette[0][i][2]]);
            ctx.stroke();
        }
    }
}
function initialiseDot_reglette(){
    for(let i =0; i < 4; i++){
        ctx.beginPath();
        ctx.arc(xDot_reglette[i], yDot_reglette[i], 20, 0, 200, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(xDot_reglette[i], yDot_reglette[i], 17, 0, 200, false);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}
function selectColorie_reglette(e){
    var canvasOffset = $("#canvas").offset();
    var x = parseInt(e.pageX - canvasOffset.left)-35;
    var y = parseInt(e.pageY - canvasOffset.top)-20;
    for(let i =0; i < 4; i++){
        if(x < xDot_reglette[i]+30 && x > xDot_reglette[i] - 30 && info_reglette[1][i][0] == true){
            if(y < yDot_reglette[i] +30 && y > yDot_reglette[i] -30){
                document.getElementById("canv").addEventListener("mousemove", rect_reglette)
                document.getElementById("canv").removeEventListener("click", selectColorie_reglette);
                document.getElementById("canv").addEventListener("click", stopRect_reglette);
                document.getElementById("canv").removeEventListener("click", select_reglette);
                choixDot_reglette = i;
            }}
    }
}
function rect_reglette(e){
    var canvasOffset = $("#canvas").offset();
    mouseX = parseInt(e.pageX - canvasOffset.left)-35;
    mouseY = parseInt(e.pageY - canvasOffset.top)-20;
    if(e !== false){
        xDot_reglette[choixDot_reglette] = mouseX;
        if( xDot_reglette[choixDot_reglette] < 488){
            xDot_reglette[choixDot_reglette] = 488;
        }
        if( xDot_reglette[choixDot_reglette] > 1110){
            xDot_reglette[choixDot_reglette] = 1110;
        }   
        drawImage_reglette();
        drawLink_reglette();
        initialiseDot_reglette();
    }
    for(let i = 0; i < 4; i++){
        ctx.globalAlpha = 0.3;  //merci stackOverflow
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(488, yDot_reglette[i]-56, xDot_reglette[i]-488,56)
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(xDot_reglette[i], yDot_reglette[i], 20, 0, 200, false);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(xDot_reglette[i], yDot_reglette[i], 17, 0, 200, false);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}
function stopRect_reglette(){
    document.getElementById("canv").removeEventListener("mousemove", rect_reglette)
    document.getElementById("canv").addEventListener("click", selectColorie_reglette);
    document.getElementById("canv").removeEventListener("click", stopRect_reglette);
    document.getElementById("canv").addEventListener("click", select_reglette);
    choixDot_reglette = false;
}
function score_reglette(){
    var bon = [2,0], A0 = [1,1];
    var bon2 = [855,1048]
    var rep1 = [];
    var rep2 = [];
for(let i =0; i<2; i++){
    if( info_reglette[0][i][2] === bon[i]){
        sendData(1,"reglette", 12, (1+3*i));
        rep1[i] = 1;
    }else{
        if( info_reglette[0][i][0] === false || info_reglette[0][i][0] === "temp"){
            sendData(9,"reglette", 12, (1+3*i));
            rep1[i] = 9;
        }else{
            if(info_reglette[0][i][2] == A0[i]){
                sendData("0A","reglette", 12, (1+3*i));
                rep1[i] = 0;
            }else{
                sendData("0B","reglette", 12, (1+3*i));
                rep1[i] = 0;
            }
        }
    } 
    if(xDot_reglette[(2-2*i)] < 495){
        sendData(9,"reglette", 12, (2+3*i));
        rep2[i] = 9;
    }else{
        if(xDot_reglette[(2-2*i)] > bon2[i]-20 && xDot_reglette[(2-2*i)] < bon2[i]+20 ){
            sendData(1,"reglette", 12, (2+3*i));
            rep2[i] = 1;
        }else{
            sendData(0,"reglette", 12, (2+3*i));
            rep2[i] = 0;
        }
    }
    if(rep1[i] === 1 && rep2[i] === 1){
        sendData(1,"reglette", 12, (3+3*i));
    }else{
        if(rep1[i] === 1 && rep2[i] === 0){
            sendData("0A","reglette", 12, (3+3*i));
                }else{
                    if(rep1[i] === 0 && rep2[i] === 1){
                        sendData("0B","reglette", 12, (3+3*i));
                            }else{
                                if(rep1[i] === 0 && rep2[i] === 0){
                                    sendData("0C","reglette", 12, (3+3*i));
                                        }else{
                                            sendData(9,"reglette", 12, (3+3*i));
                                        }
                            }
                }
    }
}
nettoyer_reglette();
}
function nettoyer_reglette(){
    document.getElementById("canv").removeEventListener("mousemove", rect_reglette)
    document.getElementById("canv").removeEventListener("click", selectColorie_reglette);
    document.getElementById("canv").removeEventListener("click", stopRect_reglette);
    document.getElementById("canv").removeEventListener("click", select_reglette);
    drawBoard();
    reference_liste(13);
}