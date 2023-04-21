var in1_donne_oppose, in2_donne_oppose;
function interval_donne_oppose(){
    document.getElementById("next_arrow").onclick = score_donne_oppose;
    document.getElementById("espace").textContent = "Donne l'opposé";
    input1_donne_oppose = document.createElement("input");
    input1_donne_oppose.setAttribute("id", "input1_donne_oppose");
    input1_donne_oppose.setAttribute("placeholder", ".......")
    document.getElementById("canvas").appendChild(input1_donne_oppose);
    input2_donne_oppose = document.createElement("input");
    input2_donne_oppose.setAttribute("id", "input2_donne_oppose");
    input2_donne_oppose.setAttribute("placeholder", ".......")
    document.getElementById("canvas").appendChild(input2_donne_oppose);
    drawText_connect_the_dots("2:", 220, 265, "black", TEXT_SIZE_CELL*2);
    drawText_connect_the_dots("-6:", 750, 265, "black", TEXT_SIZE_CELL*2);
    input1_donne_oppose.addEventListener("input", Input1_donne_oppose);
    input2_donne_oppose.addEventListener("input", Input2_donne_oppose);

}

function Input1_donne_oppose(){
    in1_donne_oppose = input1_donne_oppose.value
}
function Input2_donne_oppose(){
    in2_donne_oppose = input2_donne_oppose.value
}
function score_donne_oppose(){
    Input1_donne_oppose();
    Input2_donne_oppose();
    if(in1_donne_oppose == -2){
        sendData(1, "donne l'opposé", 5, 1);
    }else{
    if(in1_donne_oppose.length == 0){
        sendData(9, "donne l'opposé", 5, 1);
    }else{
        sendData(0, "donne l'opposé", 5, 1);
    }
}
if(in2_donne_oppose == 6){
    sendData(1, "donne l'opposé", 5, 2);
}else{
if(in2_donne_oppose.length == 0){
    sendData(9, "donne l'opposé", 5, 2);
}else{
    sendData(0, "donne l'opposé", 5, 2);
}
}
nettoyer_donne_oppose();
}

function nettoyer_donne_oppose(){
    input1_donne_oppose.removeEventListener("input", Input1_donne_oppose);
    input2_donne_oppose.removeEventListener("input", Input2_donne_oppose);
    input1_donne_oppose.parentNode.removeChild( input1_donne_oppose);
    input2_donne_oppose.parentNode.removeChild( input2_donne_oppose);
    drawBoard();
    reference_liste(6);
}