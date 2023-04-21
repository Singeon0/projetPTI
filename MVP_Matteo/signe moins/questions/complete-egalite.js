var image_complete_egalite;
var REPONSE_COMPLETE_EGALITE, NOMBRE_COMPLETE_EGALITE;
var left_complete_egalite = [], top_complete_egalite = [];
var next_complete_egalite, data_question_complete_egalite, data_numb_complete_egalite;
function interval_complete_egalite(img, R, Q, quest,question, next, left, top){
    document.getElementById("espace").textContent = "Complète le calcul de façon à respecter l'égalité";
    document.getElementById("next_arrow").onclick = score_complete_egalite;
    canv.addEventListener("click", click_complete_multiple);

    left_complete_egalite = left;
    top_complete_egalite = top;
    data_numb_complete_egalite = quest;
    data_question_complete_egalite = question;
    next_complete_egalite = next;
    NOMBRE_COMPLETE_EGALITE = Q;
    REPONSE_COMPLETE_EGALITE = R;
    image_complete_egalite = img;
    drawImput_complete_egalite();
    drawImage_complete_multiple();
}
function click_complete_multiple(ev){
    var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var x = parseInt(ev.pageX - offsetX)-30;
var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;
}
function drawImage_complete_multiple(){
    var complete_egalite_img = document.getElementById(image_complete_egalite);
    ctx.drawImage(complete_egalite_img, 10, 10, 1160, 530);
  }
function drawImput_complete_egalite(){
    for (let i =0; i < NOMBRE_COMPLETE_EGALITE ;i++ ){
        var temp;
    temp = document.createElement("input");
    temp.setAttribute("id", "select"+i+"_complete_egalite");
    temp.setAttribute("CLASS", "select_complete_egalite");
    document.getElementById("canvas").appendChild(temp);
    var left = left_complete_egalite[i];
    var top = top_complete_egalite[i]+document.getElementById("titreQuestions").height;
    temp.style.top = top+ "px";
    temp.style.left = left+"px";
    }
}
function score_complete_egalite(){
for(let i =0; i < NOMBRE_COMPLETE_EGALITE; i++){
    if(document.getElementById("select"+i+"_complete_egalite").value === ""){
    sendData(9, data_question_complete_egalite, data_numb_complete_egalite, (i+1))
    }else{
    if(document.getElementById("select"+i+"_complete_egalite").value.replace(/\s+/g, '') == REPONSE_COMPLETE_EGALITE[i]){
        sendData(1, data_question_complete_egalite, data_numb_complete_egalite, (i+1))
    }else{
        sendData(0, data_question_complete_egalite, data_numb_complete_egalite, (i+1))
    }
    
}}
nettoyer_complete_egalite();
}
function nettoyer_complete_egalite(){
    for (let i =0; i < NOMBRE_COMPLETE_EGALITE ;i++ ){
        document.getElementById("select"+i+"_complete_egalite").parentNode.removeChild(document.getElementById("select"+i+"_complete_egalite"))
    }
    drawBoard();
    reference_liste(next_complete_egalite);
    canv.removeEventListener("click", click_complete_multiple);
}