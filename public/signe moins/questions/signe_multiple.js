var options_signe_multiple = ["","S","N","O"];
var reponse_signe_multiple = ["O","S","N","S","O","N"];
var left_signe_multiple = [150, 275, 530, 660, 880, 1062];
var top_signe_multiple = [258];
var NOMBRE_SIGNE_MULTIPLE, image_signe_multiple, data_number_signe_multiple, data_question_signe_multiple,next_signe_multiple ;

function interval_signe_multiple(rep, left, img, quest, question, next){
    left_signe_multiple = left;
    reponse_signe_multiple = rep;
NOMBRE_SIGNE_MULTIPLE = reponse_signe_multiple.length;
image_signe_multiple = img;
data_number_signe_multiple = quest;
data_question_signe_multiple = question;
next_signe_multiple = next;
document.getElementById("next_arrow").onclick = score_signe_multiple;
document.getElementById("espace").textContent = "Ecris S pour soustraction, N pour négatif et O pour opposé en dessous des signes moins";
document.getElementById("canvas").setAttribute("ondrop","drop_droite_grad(event)" );
document.getElementById("canvas").setAttribute("ondragover","allowDrop_droite_grad(event)" );
canv.addEventListener("click", click_droite_grad);

drawImage_signe_multiple();
drawImput_sign_multiple();

//swal("Consignes : ", "Fais glisser le nombre de ton choix, puis lache le sur la droite gradué à l'endroit qui lui correspond. Tu peux supprimer ton choix en cliquant dessus !    ");
//fonction à faiire apparaitre pour bypass le vrai_faux (utile pour test la fonction suivante sans se taper le vrai faux à chaque fois)
//nettoyer_droite_grad();

}

function drawImage_signe_multiple(){
  var signe_multiple_img = document.getElementById(image_signe_multiple);
  ctx.drawImage(signe_multiple_img, 25, 150, 1150, 200);
}

function drawImput_sign_multiple(){

for (let i =0; i < NOMBRE_SIGNE_MULTIPLE ;i++ ){
    var temp;
    temp = document.createElement("SELECT");
    temp.setAttribute("id", "select"+i+"_signe_multiple");
    temp.setAttribute("CLASS", "select_signe_multiple");
    document.getElementById("canvas").appendChild(temp);
    for(let j=0; j<4;j++){
        var c = document.createElement("option");
        c.text = options_signe_multiple[j];
        temp.options.add(c, 1);
        }
    var left = left_signe_multiple[i];
    var top = top_signe_multiple[0]+document.getElementById("titreQuestions").height;
    temp.style.top = top+ "px";
    temp.style.left = left+"px";
    
}
}
function score_signe_multiple(){
for(let i =0; i< NOMBRE_SIGNE_MULTIPLE ; i++){
    if(document.getElementById("select"+i+"_signe_multiple").value === ""){
        sendData(9, data_question_signe_multiple, data_number_signe_multiple, (i+1));
    }else{
        if(document.getElementById("select"+i+"_signe_multiple").value == reponse_signe_multiple[i] ){
            sendData(1, data_question_signe_multiple, data_number_signe_multiple, (i+1));
        }else{
            sendData(0, data_question_signe_multiple  , data_number_signe_multiple, (i+1));
        }
    }
    
}
nettoyer_signe_multiple();
}

function nettoyer_signe_multiple(){
    for(let i =0; i< NOMBRE_SIGNE_MULTIPLE; i++){
        document.getElementById("select"+i+"_signe_multiple").parentNode.removeChild(document.getElementById("select"+i+"_signe_multiple"));
    }
drawBoard();
reference_liste(next_signe_multiple);
}