
var xRect_hachure2 = [[65,109],[225,269]];
var yRect_hachure2 = [218,260,302]
var centre_hachure2 = [[428,255],[626,259],[829,263],[1048,263]]
var radDecalage_hachure2 = [0.523,0.523,0,0]
var hexaCoord_hachure2 = [[[908,263,871,335],[871,335,791,335],[791,335,748,263],[748,263,790,190],[790,190,867,190],[867,190,907,263]],[[1127,263,1090,335],[1090,335,1010,335],[1011,335,969,263],[969,263,1009,189],[1009,189,1089,189],[1089,189,1125,263]]]
var selectRect_hachure2 = [[[false,false,false],[false,false,false]],[[false,false,false],[false,false,false]]]
var selectRond_hachure2 = [[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false],[false,false,false,false,false,false]]
var rep_hachure2 = [5,4,5,4,5,4];
function interval_hachure2(){
    HEIGHT = 650;
    document.getElementById("canvas").style.height = "650px";
    document.getElementById("body").style.height= "1100px";
    document.getElementById("espace").textContent = "Colorie la fraction indiqué pour chaque forme";
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_hachure2;
    document.getElementById("canv").addEventListener("click", select_hachure2);
canv.height = HEIGHT;
canv.width = WIDTH;
drawBoard();
drawImage_hachure2();
}
function drawImage_hachure2(){
    var temp_image = document.getElementById("hachure2_img");
    ctx.drawImage(temp_image, 5, 80, 1180, 450);
}
function select_hachure2(e){
    var canvasOffset = $("#canvas").offset();
    var x = parseInt(e.pageX - canvasOffset.left)-35;
    var y = parseInt(e.pageY - canvasOffset.top)-20;
for(let i = 0; i < 2; i++){
    for(let j = 0; j < 2; j++){
        for(let k =0; k< 3; k++){
            if(x < xRect_hachure2[i][j] + 20 && x > xRect_hachure2[i][j] - 20){
                if(y < yRect_hachure2[k] + 20 && y > yRect_hachure2[k] - 20){
                    if(selectRect_hachure2[i][j][k] === false){
                        selectRect_hachure2[i][j][k] = true;
                    }else{
                        selectRect_hachure2[i][j][k] = false;
                    }
                   
                }
            }
        }
    }
}
for(let i =0; i < 4; i++){
    if(Math.pow((x-centre_hachure2[i][0]),2)+Math.pow((y-centre_hachure2[i][1]),2) < Math.pow(73,2)){
        var rads_rond = Math.atan2(y - centre_hachure2[i][1],x - centre_hachure2[i][0]);
        var cote;
        if(rads_rond < 0){
           cote = parseInt((rads_rond + Math.PI*2)/1.0472+radDecalage_hachure2[i])%6;
        }else{cote = parseInt(rads_rond/1.0472+radDecalage_hachure2[i]);}
    if(selectRond_hachure2[i][cote] === false){
        selectRond_hachure2[i][cote] = true;
    }else{
        selectRond_hachure2[i][cote] = false;
    }
    }
}
drawImage_hachure2();
drawRect_hachure2();
drawRond_hachure2();
drawHexa_hachure2();
}
function drawRect_hachure2(){
    for(let i = 0; i < 2; i++){
        for(let j = 0; j < 2; j++){
            for(let k =0; k< 3; k++){
                if(selectRect_hachure2[i][j][k] === true){
                    ctx.globalAlpha = 0.5;
                    ctx.beginPath();
                    ctx.fillStyle = "green";
                    ctx.fillRect(xRect_hachure2[i][j]-25, yRect_hachure2[k]-25, 47,41)
                    ctx.globalAlpha = 1;
                }
            }}}
}
function drawRond_hachure2(){
for(let i = 0; i<2; i++){
    for(let j =0; j < 6; j++){
        if(selectRond_hachure2[i][j] === true){
            var startAngle=(j*Math.PI/3)-radDecalage_hachure2[i];
            var endAngle=startAngle+((1)*Math.PI/3);
            var radius = 73;
            var colors = "green";
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.moveTo(centre_hachure2[i][0],centre_hachure2[i][1]);
            ctx.arc(centre_hachure2[i][0],centre_hachure2[i][1],radius,startAngle,endAngle);
            ctx.closePath();
            ctx.fillStyle=colors;
            ctx.fill();
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }
}
}
function drawHexa_hachure2(){
for(let i = 2; i<4; i++){
    for(let j =0; j < 6; j++){
        if(selectRond_hachure2[i][j] === true){
        ctx.globalAlpha = 0.5
        ctx.beginPath();
        ctx.moveTo(centre_hachure2[i][0], centre_hachure2[i][1]);
        ctx.lineTo(hexaCoord_hachure2[(i-2)][j][0], hexaCoord_hachure2[(i-2)][j][1]);
        ctx.lineTo(hexaCoord_hachure2[(i-2)][j][2], hexaCoord_hachure2[(i-2)][j][3]);
        ctx.closePath();
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.globalAlpha = 1
        }
    }
}
}
function score_hachure2(){
for(let i = 0; i < 2; i++){
    var temp = 0;
    for(let j = 0; j < 3; j++){
        for(let k =0; k < 2; k++){
            if(selectRect_hachure2[i][k][j] === true){
                ++temp;
            }
        }
    }
    if(temp == rep_hachure2[i]){
        sendData(1, "hachure 2 ", 14, (i+1));
    }else{
        if(temp === 0){
            sendData(9, "hachure 2 ", 14, (i+1));
        }else{
            sendData(0, "hachure 2 ", 14, (i+1));
        }
    }
}
for(let i = 0; i < 4; i++){
    var temp = 0;
    for(let j = 0; j < 6; j++){
        if(selectRond_hachure2[i][j] === true){
            ++temp;
        }
    }
    if(temp == rep_hachure2[i]){
        sendData(1, "hachure 2 ", 14, (i+3));
    }else{
        if(temp === 0){
            sendData(9, "hachure 2 ", 14, (i+3));
        }else{
            sendData(0, "hachure 2 ", 14, (i+3));
        }
    }
}
nettoyer_hachure2();
}
function nettoyer_hachure2(){
    document.getElementById("canv").removeEventListener("click", select_hachure2);
    document.getElementById("body").style.height = "60rem";
    document.getElementById("next_arrow").style.display = "none";
    document.getElementById("canvas").style.display = "none";
    var temp = document.createElement("label");
    temp.setAttribute("id", "Partie_debut");
    temp.textContent = "Partie 2 "
    document.getElementById("body").appendChild(temp);
    var int = setInterval(()=>{debutQuestion2();clearInterval(int);}, 1500);
    
  }

function debutQuestion2(){
document.getElementById("Partie_debut").parentNode.removeChild(document.getElementById("Partie_debut"));
document.getElementById("next_arrow").style.display = "flex";
document.getElementById("canvas").style.display = "block";
drawBoard();
reference_liste(15);

}
