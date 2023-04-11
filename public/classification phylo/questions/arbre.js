var option_arbre = ["...........","Erable champêtre", "Chêne vert", "Tilleul commun","Marronier d'inde","Pin pleureur de l'Himalaya","Fougère-aigle","Polytric élégant"];
function interval_arbre(){
    HEIGHT = 1350;
    document.getElementById("canvas").style.height = "1350px";
    document.getElementById("body").style.height= "1800px";
    document.getElementById("espace").textContent = "Test sur la phylogénétique"
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_arbre;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_arbre();
    var temp = document.createElement("select")
    temp.setAttribute("id", "input_arbre");
    for(let k = 0; k < option_arbre.length; k++){
        var option = document.createElement("option");
        option.text = option_arbre[k]
        temp.add(option);
    }
    document.getElementById("canvas").appendChild(temp);
    temp.style.left ="370px";
    temp.style.top ="1227px";
}
function drawImage_arbre(){
    var formes_image = document.getElementById("arbre_img");
    ctx.drawImage(formes_image, 25, 25, 1150, 1300);
}
function score_arbre(){
switch( document.getElementById("input_arbre").value){
    case "Erable champêtre":
        sendData(1, "arbre", 9, 1);
        break;
    case "Chêne vert":
        sendData("0A", "arbre", 9, 1);
        break;
    case "Tilleul commun":
        sendData("0B", "arbre", 9, 1);
        break;
    case "Marronier d'inde":
        sendData("0C", "arbre", 9, 1);
        break;
    case "Pin pleureur de l'Himalaya":
        sendData("0D", "arbre", 9, 1);
        break;
    case "Fougère-aigle":
        sendData("0E", "arbre", 9, 1);
        break;
    case "Polytric élégant":
        sendData("0F", "arbre", 9, 1);
        break;
    case "...........":
        sendData(9, "arbre", 9, 1);
        break;
}
nettoyer_arbre();
}
function nettoyer_arbre(){
    document.getElementById("input_arbre").parentNode.removeChild(document.getElementById('input_arbre'));
    drawBoard();
    reference_liste(10);
}