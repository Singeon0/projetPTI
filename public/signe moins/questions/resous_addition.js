var QUESTION_RESOUS_ADDITION, REPONSE_RESOUS_ADDITION;
var NOMBRE_COL_RESOUS_QUESTION, NOMBRE_ROW_RESOUS_QUESTION;
var ref_resous_addition, tab_resous_addition;
var WIDTH_CELL_RESOUS_ADDITION, HEIGHT_CELL_RESOUS_ADDITION;
var tab_input_resous_addition =[];
var NOMBRE_RESOUS_QUESTION;
var left_resous_addition;
function interval_resous_addition(Q, R, q, n,col,row, ref, left){
    //tous les paramètres donné lors de l'appel de la fonction dans le fichier reference
    QUESTION_RESOUS_ADDITION = Q;
    REPONSE_RESOUS_ADDITION = R
    data_question = q;
    data_number = n;
    NOMBRE_COL_RESOUS_QUESTION = col;
    NOMBRE_ROW_RESOUS_QUESTION = row;
    ref_resous_addition = ref;
    tab_resous_addition = [col, col, 2];
    left_resous_addition = left;
    NOMBRE_RESOUS_QUESTION = NOMBRE_COL_RESOUS_QUESTION*(NOMBRE_ROW_RESOUS_QUESTION-1)+2;
    WIDTH_CELL_RESOUS_ADDITION = WIDTH/NOMBRE_COL_RESOUS_QUESTION;
    HEIGHT_CELL_RESOUS_ADDITION = HEIGHT/NOMBRE_ROW_RESOUS_QUESTION;
    
    
    document.getElementById("espace").textContent = "Résous les calculs suivants :";
    document.getElementById("next_arrow").onclick = score_resous_addition;
    call_drawRect_resous_addition();

 //swal("Consignes : ", "Résous les calculs suivants. Pour cela entre ta réponse sur les pointillés, pas besoin de valider ! Quand tu as tout fini clique sur la fléche en bas à droite !");
//fonction à faiire apparaitre pour bypass le vrai_faux (utile pour test la fonction suivante sans se taper le vrai faux à chaque fois)
//nettoyer_resous_addition();

}

function call_drawRect_resous_addition(){
    var k =0;
    var t = 0, l =left_resous_addition; 
    for(let j = 0; j<NOMBRE_ROW_RESOUS_QUESTION; j++){
    for(let i =0;i < QUESTION_RESOUS_ADDITION[j].length; i++){
    drawRect_resous_addition(i*WIDTH/QUESTION_RESOUS_ADDITION[j].length, HEIGHT_CELL_RESOUS_ADDITION*j, WIDTH/QUESTION_RESOUS_ADDITION[j].length,HEIGHT_CELL_RESOUS_ADDITION, COLOR_BORDER);
    drawText_vrai_faux(QUESTION_RESOUS_ADDITION[j][i], i*WIDTH/QUESTION_RESOUS_ADDITION[j].length+WIDTH_CELL_RESOUS_ADDITION/24, HEIGHT_CELL_RESOUS_ADDITION*j+HEIGHT_CELL_RESOUS_ADDITION/2, "black", TEXT_SIZE_CELL*1.5);
    var temp;
    temp = document.createElement("input");
    temp.setAttribute("placeholder", ".......")
    temp.setAttribute("id", "input"+k+"_resous_addition");
    temp.setAttribute("CLASS", "input_resous_addition");
    document.getElementById("canvas").appendChild(temp);
    tab_input_resous_addition.push();
    var left = l+i*WIDTH/QUESTION_RESOUS_ADDITION[j].length+WIDTH_CELL_RESOUS_ADDITION/(2*QUESTION_RESOUS_ADDITION[j].length);
    var top = (t+HEIGHT_CELL_RESOUS_ADDITION*j+HEIGHT_CELL_RESOUS_ADDITION/2)+document.getElementById("titreQuestions").height-10;
    temp.style.top = top+ "px";
    temp.style.left = left+"px";
    ++k;
}}}

function drawRect_resous_addition(x, y, WIDTH, HEIGHT, COLOR_BORDER){
    ctx.fillStyle = COLOR_BOARD;
    ctx.lineWidth = 2;
    ctx.strokeStyle = COLOR_BORDER 
    ctx.fillRect(x, y, WIDTH, HEIGHT);
    ctx.strokeRect(STROKE / 2+x, STROKE / 2+y, WIDTH - STROKE, HEIGHT - STROKE);
  }

function Input_resous_addition(){
    var k =0;
    for(let j = 0; j<NOMBRE_ROW_RESOUS_QUESTION; j++){
        for(let i =0;i < QUESTION_RESOUS_ADDITION[j].length; i++){
tab_input_resous_addition[k]=document.getElementById("input"+k+"_resous_addition").value
++k;
        }}
    
}

function score_resous_addition(){
    Input_resous_addition();
    
    for(let j = 0; j<NOMBRE_RESOUS_QUESTION; j++){
       var quest_numb = data_number;
            if(tab_input_resous_addition[j].length == 0){
                sendData(9, data_question, quest_numb, (j+1) );
            }else{
                if(tab_input_resous_addition[j].replace(/\s+/g, '') ==REPONSE_RESOUS_ADDITION[j]){
                    sendData(1, data_question, quest_numb, (j+1) );
                }else{
                    sendData(0, data_question, quest_numb, (j+1) );
                }
            }

        }
        nettoyer_resous_addition();
}

function nettoyer_resous_addition(){
    for(let j = 0; j<NOMBRE_RESOUS_QUESTION; j++){
document.getElementById("input"+j+"_resous_addition").parentNode.removeChild(document.getElementById("input"+j+"_resous_addition"));

        }
    drawBoard();
    reference_liste(ref_resous_addition);
}