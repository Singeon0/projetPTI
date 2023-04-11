
function interval_droite_distraction(){
    document.getElementById("next_arrow").onclick = score_droite_distraction;
    document.getElementById("espace").textContent = "Complète la case par le nombre adéquat";
    document.getElementById("canvas").style.height = "600px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById('next_arrow').style.bottom = "10rem";
    HEIGHT = 600;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawDroite_droite_distraction();
    var temp;
    temp = document.createElement("input");
    temp.setAttribute("placeholder", ".......")
    temp.setAttribute("id", "input_droite_simplifie");
    document.getElementById("canvas").appendChild(temp);
    temp.style.top = 294+ "px";
    temp.style.left = 522+"px";
}
function drawDroite_droite_distraction(){
    var temp = document.getElementById("droite_distraction_img");
    ctx.drawImage(temp, 25, 50, 1150, 400);
}
function score_droite_distraction(){
nettoyer_droite_distraction();
}
function nettoyer_droite_distraction(){
    document.getElementById("input_droite_simplifie").parentNode.removeChild(document.getElementById("input_droite_simplifie"));
    drawBoard();
    reference_liste(12);
}