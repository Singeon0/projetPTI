var options_symbole;
var reponse_symbole;
var left_symbole;
var top_symbole;
var NOMBRE_symbole, image_symbole, data_number_symbole, data_question_symbole,next_symbole ;
var rep0A_symbole, rep0B_symbole;
function interval_symbole(rep, left,top, img, quest, question, next, rep0A, rep0B, option){
left_symbole = left;
reponse_symbole = rep;
NOMBRE_symbole = reponse_symbole.length;
image_symbole = img;
data_number_symbole = quest;
data_question_symbole = question;
next_symbole = next;
top_symbole = top;
options_symbole = option;
rep0A_symbole = rep0A;
rep0B_symbole = rep0B;
document.getElementById("next_arrow").onclick = score_symbole;
document.getElementById("espace").textContent = "Complète par le symbole adéquat";
document.getElementById("canvas").setAttribute("ondrop","drop_droite_grad(event)" );
document.getElementById("canvas").setAttribute("ondragover","allowDrop_droite_grad(event)" );
canv.addEventListener("click", click_droite_grad);
document.getElementById("canvas").style.height = "700px";
document.getElementById("body").style.height= "1000px";
document.getElementById('next_arrow').style.bottom = "10rem";
HEIGHT = 700;
canv.height = HEIGHT;
canv.width = WIDTH;
drawBoard();
drawImage_symbole();
drawImput_sign_multiple();

//swal("Consignes : ", "Fais glisser le nombre de ton choix, puis lache le sur la droite gradué à l'endroit qui lui correspond. Tu peux supprimer ton choix en cliquant dessus !    ");
//fonction à faiire apparaitre pour bypass le vrai_faux (utile pour test la fonction suivante sans se taper le vrai faux à chaque fois)
//nettoyer_droite_grad();

}

function drawImage_symbole(){
  var symbole_img = document.getElementById(image_symbole);
  ctx.drawImage(symbole_img, 25, 50, 1150, 400);
}

function drawImput_sign_multiple(){

for (let i =0; i < NOMBRE_symbole ;i++ ){
    var temp;
    temp = document.createElement("SELECT");
    temp.setAttribute("id", "select"+i+"_symbole");
    temp.setAttribute("CLASS", "select_signe_multiple");
    document.getElementById("canvas").appendChild(temp);
    for(let j=0; j<4;j++){
        var c = document.createElement("option");
        c.text = options_symbole[j];
        temp.options.add(c, 1);
        }
    var left = left_symbole[i];
    var top = top_symbole[0];
    temp.style.top = top+ "px";
    temp.style.left = left+"px";
    
}
}
function score_symbole(){
for(let i =0; i< NOMBRE_symbole ; i++){
    if(document.getElementById("select"+i+"_symbole").value === ""){
        sendData(9, data_question_symbole, data_number_symbole, (i+1));
    }else{
        if(document.getElementById("select"+i+"_symbole").value == reponse_symbole[i] ){
            sendData(1, data_question_symbole, data_number_symbole, (i+1));
        }else{
            if(document.getElementById("select"+i+"_symbole").value == rep0A_symbole[i] && rep0A_symbole[i] != ""){
                sendData("0A", data_question_symbole, data_number_symbole, (i+1));
            }else{
                if(document.getElementById("select"+i+"_symbole").value == rep0B_symbole[i] && rep0B_symbole[i] != ""){
                    sendData("0B", data_question_symbole, data_number_symbole, (i+1));
                }else{
                    sendData(0, data_question_symbole  , data_number_symbole, (i+1));
                }
            }
        }
    }
    
}
nettoyer_symbole();
}

function nettoyer_symbole(){
    for(let i =0; i< NOMBRE_symbole; i++){
        document.getElementById("select"+i+"_symbole").parentNode.removeChild(document.getElementById("select"+i+"_symbole"));
    }
drawBoard();
reference_liste(next_symbole);
}