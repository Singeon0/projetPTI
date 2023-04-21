var x_colorie_etoiles = [[300,365],[715,780,839,903,962,1026],[211,276,338,402,465],[808,872,933]];
var y_colorie_etoiles = [[213,263],[210,260],[405,455],[420,469]]
var selected_colorie_etoiles = [[[false,false],[false,false]],[[false,false,false,false,false,false],[false,false,false,false,false,false]],[[false,false,false,false,false],[false,false,false,false,false]],[[false,false,false],[false,false,false]]];
var rep_colorie_etoiles = [1,4,6,4];
function interval_colorie_etoiles(){
    HEIGHT = 650;
    document.getElementById("canvas").style.height = "650px";
    document.getElementById("body").style.height= "1100px";
    document.getElementById("espace").textContent = "Colorie le nombre d'objets demandés";
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_colorie_etoiles;
    document.getElementById("canv").addEventListener("click", select_colorie_etoiles);
canv.height = HEIGHT;
canv.width = WIDTH;
drawBoard();
drawImage_colorie_etoiles();
}
function drawImage_colorie_etoiles(){
    var temp_image = document.getElementById("colorie_etoiles_img");
    ctx.drawImage(temp_image, 5, 80, 1180, 450);
}
function select_colorie_etoiles(e){
    var canvasOffset = $("#canvas").offset();
    var x = parseInt(e.pageX - canvasOffset.left)-35;
    var y = parseInt(e.pageY - canvasOffset.top)-20;
    for(let i = 0; i < 4; i++){
        for(let j =0; j < y_colorie_etoiles[i].length; j++){
            for(let k = 0; k < x_colorie_etoiles[i].length; k++){
                if(x < x_colorie_etoiles[i][k]+35 && x > x_colorie_etoiles[i][k]-7){
                    if(y < y_colorie_etoiles[i][j]+31 && y > y_colorie_etoiles[i][j]-10){
                        if(selected_colorie_etoiles[i][j][k] === false){
                            selected_colorie_etoiles[i][j][k] = true;
                        }else{
                            selected_colorie_etoiles[i][j][k] = false;
                        }
                    }
                }
            }
        }
    }
drawImage_colorie_etoiles();
drawStars_colorie_etoiles();
} 
function drawStars_colorie_etoiles(){
    for(let i = 0; i < 4; i++){
        for(let j =0; j < y_colorie_etoiles[i].length; j++){
            for(let k = 0; k < x_colorie_etoiles[i].length; k++){
                        if(selected_colorie_etoiles[i][j][k] === true){
                            var x = x_colorie_etoiles[i][k];
                            var y = y_colorie_etoiles[i][j];
                            ctx.beginPath();
                            ctx.moveTo(x,y);
                            ctx.lineTo(x+41,y);
                            ctx.lineTo(x+33,y+32);
                            ctx.lineTo(x-5,y+17);
                            ctx.lineTo(x+22,y-6);
                            ctx.lineTo(x+46,y+18);
                            ctx.lineTo(x+9,y+31);
                            ctx.closePath();
                            ctx.fillStyle = "#8FBEAD";
                            ctx.fill();
                         }
            }
        }
    }
}
function score_colorie_etoiles(){
    for(let i = 0; i < 4; i++){
        var temp = 0;
        for(let j =0; j < y_colorie_etoiles[i].length; j++){
            for(let k = 0; k < x_colorie_etoiles[i].length; k++){
                if(selected_colorie_etoiles[i][j][k] === true){
                    ++temp;
                }
            }}
        if(temp == rep_colorie_etoiles[i]){
            sendData(1,"colorie étoiles",15,(i+1));
        }else{
            if(temp === 0){
                sendData(9,"colorie étoiles",15,(i+1));
            }else{
                sendData(0,"colorie étoiles",15,(i+1));
            }
        }
        }
        nettoyer_colorie_etoiles();
}
function nettoyer_colorie_etoiles(){
document.getElementById("canv").removeEventListener("click", select_colorie_etoiles);
drawBoard();
reference_liste(16);
}
