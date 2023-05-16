var coordX_select_construit = [110,460,460,840,840,840,840];
var coordY_select_construit = [340,164,464,70,220,420,580];
var position_construit = 1;
var selected_construit = [false,false,false,false,false,false];
var pair_construit = [0,2,1,4,3,6,5];
let options_construit;
const defaultValue = "............";
let choix;
let bonChoix;
let mauvaisChoix;
let animal;
ctx = document.getElementById('canvas').getContext("2d");
canvRect = document.getElementById('canvas').getBoundingClientRect();  
let props; 
function interval_construit(prop){
    props = prop;
     bonChoix = prop["bonChoix"];
     mauvaisChoix = prop["mauvaisChoix"];
     choix = [];
     options_construit = [];
     animal = prop["animal"];
     document.getElementById("titre").textContent = (document.getElementById("titre").textContent + " "+animal);
     for(let i = 0; i < 3; i++){
        choix[i] = bonChoix[i] +','+mauvaisChoix[i];
        choix[i] = choix[i].split(',');
        choix[i] = choix[i].map((element) => element.trimStart());
        bonChoix[i] = bonChoix[i].split(',');
        mauvaisChoix[i] = mauvaisChoix[i].split(',');
          // Trim les éléments des listes bonChoix[i] et mauvaisChoix[i]
        bonChoix[i] = bonChoix[i].map((element) => element.trimStart());
        mauvaisChoix[i] = mauvaisChoix[i].map((element) => element.trimStart());
     }
    let m = 0;
    for(let j = 0; j < 3; j++){
        for(let i =0; i < (2**j); i++){
            function triAleatoire() {
                return Math.random() - 0.5;
              }
            options_construit[m] = [...choix[j]];
            options_construit[m] = options_construit[m].sort(triAleatoire)
            options_construit[m].unshift(defaultValue);
            console.log('m :>> ', m);
            console.log('options_construit[m] :>> ', options_construit[m]);
            console.log('choix[j] :>> ', choix[j]);
            m++;
        } 
    }
drawBoard();
//drawImage_construit();
var temp = document.createElement("SELECT");
temp.style.height ="80px";
temp.style.width ="200px";
temp.style.position ="absolute";
temp.setAttribute("id", "select_construit0");
temp.setAttribute("CLASS", "select_construit");
for(let k = 0; k < options_construit[0].length; k++){
    var option = document.createElement("option");
    option.text = options_construit[0][k]
    option.setAttribute("CLASS", "select_construit_options");
    option.style.wordBreak = "break-all";
    option.style.overflow = "visible";
    temp.add(option);
}
document.getElementById("divCanvas").appendChild(temp);
temp.style.left =coordX_select_construit[0]+"px";
temp.style.top = coordY_select_construit[0]+"px";
temp.addEventListener('change', select_construit);
}
function select_construit(){
if(selected_construit[0] === false && document.getElementById("select_construit0").value !==defaultValue){
    createSelect_construit(1);
    createSelect_construit(2);
    selected_construit[0] = true;
}
if(selected_construit[1] === false && document.getElementById("select_construit1").value !==defaultValue ){
    createSelect_construit(3);
    createSelect_construit(4);
    selected_construit[1] = true;
}
if(selected_construit[2] === false && document.getElementById("select_construit2").value !==defaultValue){
    createSelect_construit(5);
    createSelect_construit(6);
    selected_construit[2] = true;
}
if(selected_construit[1] === true && document.getElementById("select_construit1").value ==defaultValue){
    selected_construit[1] = false;
    selected_construit[3] = false;
    selected_construit[4] = false;
    document.getElementById("select_construit3").parentNode.removeChild(  document.getElementById("select_construit3"));
    document.getElementById("select_construit4").parentNode.removeChild(  document.getElementById("select_construit4"));
}
if(selected_construit[2] === true && document.getElementById("select_construit2").value ==defaultValue){
    selected_construit[2] = false;
    selected_construit[5] = false;
    selected_construit[6] = false;
    document.getElementById("select_construit5").parentNode.removeChild(  document.getElementById("select_construit5"));
    document.getElementById("select_construit6").parentNode.removeChild(  document.getElementById("select_construit6"));
}
if(selected_construit[0] === true && document.getElementById("select_construit0").value ==defaultValue){
    if(selected_construit[1] === true){
        selected_construit[1] = false;
        selected_construit[3] = false;
        selected_construit[4] = false;
        document.getElementById("select_construit3").parentNode.removeChild(  document.getElementById("select_construit3"));
        document.getElementById("select_construit4").parentNode.removeChild(  document.getElementById("select_construit4"));
    }
    if(selected_construit[2] === true ){
        selected_construit[2] = false;
        selected_construit[5] = false;
        selected_construit[6] = false;
        document.getElementById("select_construit5").parentNode.removeChild(  document.getElementById("select_construit5"));
        document.getElementById("select_construit6").parentNode.removeChild(  document.getElementById("select_construit6"));
    }
    selected_construit[0] = false;
    selected_construit[1] = false;
    selected_construit[2] = false;
    document.getElementById("select_construit1").parentNode.removeChild(  document.getElementById("select_construit1"));
    document.getElementById("select_construit2").parentNode.removeChild(  document.getElementById("select_construit2"));
}
drawLine_construit();
}
function createSelect_construit(i){
    var temp = document.createElement("SELECT");
    temp.setAttribute("id", "select_construit"+i);
    temp.setAttribute("CLASS", "select_construit");
    temp.style.height ="80px";
    temp.style.width ="200px";
    temp.style.position ="absolute";
    for(let k = 0; k < options_construit[i].length; k++){
        var option = document.createElement("option");
        option.text = options_construit[i][k]
        option.setAttribute("CLASS", "select_construit_options");
        temp.add(option);
    }
    temp.addEventListener('change', ()=>{   if(document.getElementById("select_construit"+pair_construit[i]).value == document.getElementById("select_construit"+i).value){option_construit(pair_construit[i])}});
    document.getElementById("divCanvas").appendChild(temp);
    temp.style.left =coordX_select_construit[i]+"px";
    temp.style.top = coordY_select_construit[i]+"px";
    temp.addEventListener('change', select_construit);
}
function option_construit(i){
 document.getElementById("select_construit"+i).innerHTML = "";
for(let k = 0; k < options_construit[i].length; k++){
    var option = document.createElement("option");
    option.text = options_construit[i][k]
    option.setAttribute("CLASS", "select_construit_options");
    document.getElementById("select_construit"+i).add(option);}
}
function drawLine_construit(){
    drawBoard();
    //drawImage_construit();  
 if(selected_construit[0] ===true){
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[0]+200, coordY_select_construit[0]+30);
    ctx.lineTo(coordX_select_construit[1]-15, coordY_select_construit[1]+15);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[0]+200, coordY_select_construit[0]+30);
    ctx.lineTo(coordX_select_construit[2]-15, coordY_select_construit[2]+40);
    ctx.stroke();
 }
 if(selected_construit[1] ===true){
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[1]+200, coordY_select_construit[1]+30);
    ctx.lineTo(coordX_select_construit[3]-15, coordY_select_construit[3]+15);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[1]+200, coordY_select_construit[1]+30);
    ctx.lineTo(coordX_select_construit[4]-15, coordY_select_construit[4]+40);
    ctx.stroke();
 }
 if(selected_construit[2] ===true){
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[2]+200, coordY_select_construit[2]+30);
    ctx.lineTo(coordX_select_construit[5]-15, coordY_select_construit[5]+15);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[2]+200, coordY_select_construit[2]+30);
    ctx.lineTo(coordX_select_construit[6]-15, coordY_select_construit[6]+40);
    ctx.stroke();
 }
}
function score_construit(){
    var temp9=0;
    var bilan1 = 0, bilan2 = 0;
    let score = [,[],,[]]
    //score premier niveau
    if(document.getElementById("select_construit"+0).value == choix[0][0]){
        score[0] = 1;
        ++bilan1;
    }else{  
        if(document.getElementById("select_construit"+0).value == defaultValue){
            score[0] = 0;
            ++bilan2;
        }else{  
            score[0] = 0;
        }
    }
 // score second niveau
 for(let i =1; i<3;i++){
    if( bonChoix[1].includes(document.getElementById("select_construit"+i).value)){
        score[1][i-1] = 1;
        ++bilan1;
    }else{  
        if(document.getElementById("select_construit"+i).value == defaultValue){
            score[1][i-1] = 0;
            ++bilan2;
        }else{  
            score[1][i-1] = 0;
        }
    }
 }
score[2] = 0;
if(score[1][0] == 1 && score[1][1] == 1){
    score[2] = 1;
}
if(score[1][0] == 0 && score[1][1] == 0){
    score[2] = 0;
}
 for(let i =3; i<7;i++){
    if( bonChoix[2].includes(document.getElementById("select_construit"+i).value)){
        score[3][i-3] = 1;
        ++bilan1;
    }else{  
        if(document.getElementById("select_construit"+i).value == defaultValue){
            score[3][i-3] = 0;
            ++bilan2;
        }else{  
            score[3][i-3] = 0;
        }
 }
 score[4] = 0;
 if(score[3][0] == 1 && score[3][1] == 1  && score[3][2] == 1  && score[3][3] == 1){
     score[4] = 1;
 }
 if(score[3][0] == 0 && score[3][1] == 0  && score[3][2] == 0  && score[3][3] == 0){
     score[4] = 0;
 }
 if (score[0] ==1 && score[2] == 1 && score[4] == 1){
    score[5] == 1;
 }

 }
 score = score[0] + score[2] + score[4] + score[5];
 score = score/4;
 saveNoteToServer(score, props);
 nextQuestion()
}
canvas.addEventListener('click',(e)=>{
    // console.log(canvas.offsetTop)
    // console.log("x : " + (e.clientX  -parseInt(canvas.offsetLeft)))
    // console.log("y : " + (e.clientY - parseInt(canvas.offsetTop)))
})

function saveNoteToServer(note, propositions) {
    console.log(propositions);
    const nomPrenom_idQuestionnaire = propositions.nomPrenom + "_" + (propositions.questionnaireId);

    fetch("/api/save-note", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomPrenom_idQuestionnaire: nomPrenom_idQuestionnaire,
            nom_question: propositions.titre_question,
            note_obtenu: note,
            id_notes_questions: propositions.questionnaireId
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
}

function drawBoard(){
    ctx.lineWidth = 2;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "#00abcc" 
    let HEIGHT = document.getElementById("canvas").clientHeight;
    let WIDTH = document.getElementById("canvas").clientWidth;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeRect(5, 5, WIDTH - 10, HEIGHT - 10);
}

function nextQuestion() {
    // Incrémenter l'index de la question actuelle
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex + 1);

    const questions2 = JSON.parse(localStorage.getItem('questions'));
    const currentQuestionIndex2 = parseInt(localStorage.getItem('currentQuestionIndex'));

    if (currentQuestionIndex2 < (questions.length)) {
        const question2 = questions2[currentQuestionIndex2];
        const propositions2 = JSON.parse(question2.infos_question);

        window.location.href = `../${propositions2.questionnaireType}/question.html`;
    }

    else {
        console.log("currentindex = "+ currentQuestionIndex2);
        console.log(questions2);
        console.log("len quest" + (questions2.length - 1));
        // Recharger la page pour charger la prochaine question
        window.location.href = `../graphique/graphique.html`;

    }
}