var REPONSE_resous_simplifie, R0A_resous_simplifie, R0B_resous_simplifie;
var NOMBRE_COL_RESOUS_QUESTION, NOMBRE_ROW_RESOUS_QUESTION;
var ref_resous_simplifie;
var NOMBRE_RESOUS_QUESTION;
var left_resous_simplifie = [];
var top_resous_simplifie = [];
var image_resous_simplifie;
var titre_resous_simplifie;
var imgHeight_resous_simplifie;
function interval_resous_simplifie(R, q, n,col,row, ref, left, top, img, R0A, R0B,titre,imgHeight){
    //tous les paramètres donné lors de l'appel de la fonction dans le fichier reference
    REPONSE_resous_simplifie = R
    data_question = q;
    data_number = n;
    NOMBRE_COL_RESOUS_QUESTION = col;
    NOMBRE_ROW_RESOUS_QUESTION = row;
    ref_resous_simplifie = ref;
    left_resous_simplifie = left;
    top_resous_simplifie = top;
    image_resous_simplifie = img;
    R0A_resous_simplifie = R0A;
    R0B_resous_simplifie = R0B;
    NOMBRE_RESOUS_QUESTION = NOMBRE_COL_RESOUS_QUESTION*NOMBRE_ROW_RESOUS_QUESTION;
    titre_resous_simplifie = titre;
    imgHeight_resous_simplifie = imgHeight;
    document.getElementById("next_arrow").onclick = score_resous_simplifie;
    document.getElementById("espace").textContent = titre_resous_simplifie;
    document.getElementById("canvas").style.height = "600px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById('next_arrow').style.bottom = "10rem";
    HEIGHT = 600;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    document.getElementById("espace").textContent = "Résous les calculs suivants :";
    document.getElementById("next_arrow").onclick = score_resous_simplifie;
    drawImg_resous_simplifie(image_resous_simplifie);
    var k =0;
   
    for(let j = 0; j<NOMBRE_ROW_RESOUS_QUESTION; j++){
    for(let i =0;i < NOMBRE_COL_RESOUS_QUESTION ; i++){
    var temp;
    temp = document.createElement("input");
    temp.setAttribute("placeholder", ".......")
    temp.setAttribute("id", "input"+k+"_resous_simplifie");
    temp.setAttribute("CLASS", "input_irreductible");
    document.getElementById("canvas").appendChild(temp);
    temp.style.top = top_resous_simplifie[j]+ "px";
    temp.style.left = left_resous_simplifie[i]+"px";
    ++k;

    }}
}

function drawImg_resous_simplifie(img){
        var temp = document.getElementById(img);
        ctx.drawImage(temp, 40, 50, 1000, imgHeight_resous_simplifie);
}

function score_resous_simplifie(){ 
    var k = 0;
    for(let j = 0; j<NOMBRE_ROW_RESOUS_QUESTION; j++){
    for(let i =0;i < NOMBRE_COL_RESOUS_QUESTION; i++){
        if(document.getElementById("input"+k+"_resous_simplifie").value == ""){
            sendData(9, data_question, data_number, (k+1));
        }else{
            if(document.getElementById("input"+k+"_resous_simplifie").value.replace(/\s+/g, '') == REPONSE_resous_simplifie[k]){
                sendData(1, data_question, data_number, (k+1));            }else{
                if(document.getElementById("input"+k+"_resous_simplifie").value.replace(/\s+/g, '') == R0A_resous_simplifie[k]){
                    sendData("0A", data_question, data_number, (k+1));                }else{
                    if(document.getElementById("input"+k+"_resous_simplifie").value.replace(/\s+/g, '') == R0B_resous_simplifie[k]){
                        sendData("0B", data_question, data_number, (k+1));                    }else{
                            sendData(0, data_question, data_number, (k+1));                    }
                }
            }
        }
++k;
    }}
        nettoyer_resous_simplifie();
}

function nettoyer_resous_simplifie(){
    for(let j = 0; j<NOMBRE_RESOUS_QUESTION; j++){
document.getElementById("input"+j+"_resous_simplifie").parentNode.removeChild(document.getElementById("input"+j+"_resous_simplifie"));

        }
    drawBoard();
    reference_liste(ref_resous_simplifie);
}