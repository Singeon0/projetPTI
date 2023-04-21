
var left_trouve_fraction = [555,683,788];
var top_trouve_fraction = 522;
var reponse_trouve_fraction = ["1/8","1/4","1/2"];
function interval_trouver_fraction(){

    document.getElementById("next_arrow").onclick = score_trouver_fraction;
    document.getElementById("espace").textContent = "Trouve la valeur des figures A, B et C";
    document.getElementById("canvas").style.height = "600px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById('next_arrow').style.bottom = "10rem";
    HEIGHT = 600;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImg_trouver_fraction();
    for(let i = 0; i<3; i++){
    var temp;
    temp = document.createElement("input");
    temp.setAttribute("placeholder", ".....")
    temp.setAttribute("id", "input"+i+"_trouver_fraction");
    temp.setAttribute("CLASS", "input_trouver_fraction");
    document.getElementById("canvas").appendChild(temp);
    temp.style.top = top_trouve_fraction+ "px";
    temp.style.left = left_trouve_fraction[i]+"px";
    }
}
function drawImg_trouver_fraction(){
    var temp = document.getElementById("trouver_fraction_img");
    ctx.drawImage(temp, 25, 50, 1150, 520);
}

function score_trouver_fraction(){
for(let i = 0; i < 3; i++){
    if(document.getElementById("input"+i+"_trouver_fraction").value == ""){
      sendData(9, "trouve fraction", 5, (i+1));
    }else{
       if(document.getElementById("input"+i+"_trouver_fraction").value.replace(/\s+/g, '') == reponse_trouve_fraction[i]){
        sendData(1, "trouve fraction", 5, (i+1));
       }else{
           if(document.getElementById("input"+i+"_trouver_fraction").value.replace(/\s+/g, '') == 1/5){
            sendData("0A", "trouve fraction", 5, (i+1));
           }else{
            sendData(0, "trouve fraction", 5, (i+1));
           }
       }
    }
}
nettoyer_trouver_fraction();
}
function nettoyer_trouver_fraction(){
    for(let i = 0; i< 3; i++){
        document.getElementById("input"+i+"_trouver_fraction").parentNode.removeChild(document.getElementById("input"+i+"_trouver_fraction"));
    }
    drawBoard();
    reference_liste(6);
}