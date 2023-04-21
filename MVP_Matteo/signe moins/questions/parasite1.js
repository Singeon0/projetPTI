
function interval_parasite1(){
    document.getElementById("next_arrow").onclick = score_parasite1;
    document.getElementById("espace").textContent = "Complète la case par le nombre adéquat";
    document.getElementById('next_arrow').style.bottom = "10rem";
    HEIGHT = 600;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawDroite_parasite1();
    var temp;
    temp = document.createElement("input");
    temp.setAttribute("placeholder", ".......")
    temp.setAttribute("id", "input_parasite1");
    document.getElementById("canvas").appendChild(temp);
    temp.style.top = 260+ "px";
    temp.style.left = 515+"px";
}
function drawDroite_parasite1(){
    var temp = document.getElementById("parasite1_img");
    ctx.drawImage(temp, 25, 50, 1150, 350);
}
function score_parasite1(){
nettoyer_parasite1();
}
function nettoyer_parasite1(){
    document.getElementById("input_parasite1").parentNode.removeChild(document.getElementById("input_parasite1"));
    drawBoard();
    reference_liste(9);
}