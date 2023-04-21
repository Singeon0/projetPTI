var left_irreductible = [175,420,698,962];
var top_irreductible = 296;
var reponse_irreductible = ["3/4","3/2","10/3","4/7"];
function interval_irreductible(){

    document.getElementById("next_arrow").onclick = score_irreductible;
    document.getElementById("espace").textContent = "Trouve la valeur des figures A, B et C";
    document.getElementById("canvas").style.height = "600px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById('next_arrow').style.bottom = "10rem";
    HEIGHT = 600;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImg_irreductible();
    for(let i = 0; i<4; i++){
    var temp;
    temp = document.createElement("input");
    temp.setAttribute("placeholder", ".....")
    temp.setAttribute("id", "input"+i+"_irreductible");
    temp.setAttribute("CLASS", "input_irreductible");
    document.getElementById("canvas").appendChild(temp);
    temp.style.top = top_irreductible+ "px";
    temp.style.left = left_irreductible[i]+"px";
    }
}
function drawImg_irreductible(){
    var temp = document.getElementById("irreductible_img");
    ctx.drawImage(temp, 40, 50, 1100, 450);
}
function score_irreductible(){
    for(let i = 0; i < 4; i++){
        if(document.getElementById("input"+i+"_irreductible").value == ""){
          sendData(9, "irreductible", 7, (i+1));
        }else{
           if(document.getElementById("input"+i+"_irreductible").value.replace(/\s+/g, '') == reponse_irreductible[i]){
           sendData(1, "irreductible", 7, (i+1));
           }else{
                sendData(0, "irreductible", 7, (i+1));
           }
        }
    }
    nettoyer_irreductible();
}
function nettoyer_irreductible(){
    for(let i = 0; i< 4; i++){
        document.getElementById("input"+i+"_irreductible").parentNode.removeChild(document.getElementById("input"+i+"_irreductible"));
    }
drawBoard();
reference_liste(8);
}