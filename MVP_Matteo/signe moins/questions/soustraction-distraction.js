
function interval_soustraction_distraction(){
    document.getElementById("espace").textContent = "Complète la soustraction";
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = nettoyer_soustraction_distraction;
    HEIGHT = 700;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_soustraction_distraction();
    var temp;
    temp = document.createElement("input");
    temp.setAttribute("placeholder", "...........")
    temp.setAttribute("id", "soustraction_distraction");
    document.getElementById("canvas").appendChild(temp);
}
function drawImage_soustraction_distraction(){
    var temp_image = document.getElementById("soustraction_distraction_img");
    ctx.drawImage(temp_image, 50, 150, 1100, 400);
}
function nettoyer_soustraction_distraction(){
    drawBoard();
    reference_liste(18);
    document.getElementById("soustraction_distraction").parentNode.removeChild( document.getElementById("soustraction_distraction"));
}