var input1_nombres_opposes, input2_nombres_opposes;
var in1_nombres_opposes, in2_nombres_opposes;
function interval_nombres_opposes(){

    document.getElementById("next_arrow").onclick = score_nombres_opposes;
    document.getElementById("espace").textContent = "Donne deux nombres opposés";
    document.getElementById("canvas").style.display = "auto";
    input1_nombres_opposes = document.createElement("input");
    input1_nombres_opposes.setAttribute("id", "input1_nombres_opposes");
    input1_nombres_opposes.setAttribute("placeholder", ".......")
    document.getElementById("canvas").appendChild(input1_nombres_opposes);
    input2_nombres_opposes = document.createElement("input");
    input2_nombres_opposes.setAttribute("id", "input2_nombres_opposes");
    input2_nombres_opposes.setAttribute("placeholder", ".......")
    document.getElementById("canvas").appendChild(input2_nombres_opposes);
    drawText_connect_the_dots(" et ", 580, 265, "black", TEXT_SIZE_CELL*2);
    input1_nombres_opposes.addEventListener("input", Input1_nombres_opposes);
    input2_nombres_opposes.addEventListener("input", Input2_nombres_opposes);

}
function Input1_nombres_opposes(){
    in1_nombres_opposes = input1_nombres_opposes.value;

}
function Input2_nombres_opposes(){
    in2_nombres_opposes = input2_nombres_opposes.value;

}
function score_nombres_opposes(){
    in1_nombres_opposes = parseFloat(in1_nombres_opposes);
    in2_nombres_opposes = parseFloat(in2_nombres_opposes);
if(isNaN(in1_nombres_opposes) == false && isNaN(in1_nombres_opposes) == false ){
    if(Math.abs(in1_nombres_opposes)==Math.abs(in2_nombres_opposes) && in1_nombres_opposes * in2_nombres_opposes < 0){
        sendData(1, "nombres opposés",13,1 );
    }else{
        sendData(0, "nombres opposés", 13, 1);
    }
}else{
    sendData(9, "nombres opposés",13,1 );
}
  nettoyer_nombres_opposes();
}

function nettoyer_nombres_opposes(){
    input1_nombres_opposes.removeEventListener("input", Input1_nombres_opposes);
    input2_nombres_opposes.removeEventListener("input", Input2_nombres_opposes);
    input1_nombres_opposes.parentNode.removeChild( input1_nombres_opposes);
    input2_nombres_opposes.parentNode.removeChild( input2_nombres_opposes);
    drawBoard();
    reference_liste(14);


}