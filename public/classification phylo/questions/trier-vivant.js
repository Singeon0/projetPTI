var coordSelect_trier_vivant = [[189,129],[465,129],[189,251],[465,251]];
var options_trier_vivant = ["...........","Grenouille","Homme","Chien","Oiseau","Panier","Poisson","Papillon","Rocher","Chameau","Canard","Vache","Chat","Lapin"]
var options2_trier_vivant = [".................", "aile / pas ailes", "vit dans l'eau / vit pas dans l'eau", "corne / pas corne",
 "poil / pas poil", "écailles / pas écailles", " pattes / pas pattes", "mammifère / pas mammifère","insecte / pas insecte",
  " vivipare / ovipare", "queue / pas queue"," nageoire / pas nageoire"];
  var faussesOptions2_trier_vivant = ["carnivore / herbivore / omnivore", " pas de pattes / 2 pattes / 4 pattes / 6 pattes"
  ,"poil / écailles / plumes", "mammifère", "vole"];
var bonElements_trier_vivant = ["Homme", "Lapin","oiseau","Canard","Poisson","Papillon"];

var coordBox_trier_vivant = [[203,336],[449,336],[203,487],[449,487]];
var NumberBox_trier_vivant = 0;
var nombreOptionVivante = 0;
var contenuBox_trier_vivant = [[],[],[],[]]
var optionUsed = [false,false,false,false];
var bonCritere_trier_vivant = ["est un chien", "comme ça"];
var mauvaisCritere_trier_vivant = [ "ainsi", "autrement"];

function interval_trier_vivant(){
    HEIGHT = 950;
    WIDTH = WIDTH +100;
    document.getElementById("canvas").style.height = "1000px";
    document.getElementById("canvas").style.width = "1300px";
    document.getElementById("canvas").style.left = "10%";
    document.getElementById("body").style.height= "1300px";
    document.getElementById("espace").textContent = "Test sur la phylogénétique"
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById("next_arrow").onclick = score_trier_vivant;
    document.getElementById("canvas").setAttribute("ondrop","drop_trier_vivant(event)" );
    document.getElementById("canvas").setAttribute("ondragover","allowDrop_trier_vivant(event)" );
    document.body.addEventListener('drop', drop, true)
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_trier_vivant();
    //select déroulant pour citer les êtres vivants 
    for(let i = 0; i <4; i++){
        var temp = document.createElement("SELECT");
        temp.setAttribute("id", "select_trier_vivant_"+(i));
        temp.setAttribute("CLASS", "select_trier_vivant");
        temp.addEventListener('change', changeDragDropOption_trier_vivant)
        for(let k = 0; k < options_trier_vivant.length; k++){
            var option = document.createElement("option");
            option.text = options_trier_vivant[k]
            temp.add(option);
        }
        document.getElementById("canvas").appendChild(temp);
        temp.style.left =coordSelect_trier_vivant[i][0]+"px"; 
        temp.style.top = coordSelect_trier_vivant[i][1]+"px";
    }
    //bouton pour ajouter un groupe
    var temp = document.createElement("label");
    temp.setAttribute("id", "button_trier_vivant");
    document.getElementById("canvas").appendChild(temp);
    temp.textContent = "clique ici pour ajouter un groupe !";
    temp.onclick = addGroupe_trier_vivant;
    temp.style.left ="230px"; 
    temp.style.top = "680px";
    //bouton pour enlever un groupe
    var temp = document.createElement("label");
    temp.setAttribute("id", "button2_trier_vivant");
    document.getElementById("canvas").appendChild(temp);
    temp.textContent = "clique pour enlever un groupe!";
    temp.onclick = removeGroupe_trier_vivant;
    temp.style.left ="490px"; 
    temp.style.top = "680px";
    //select pour préciser comment le tri a été effectué
    var temp = document.createElement("SELECT");
        temp.setAttribute("id", "select2_trier_vivant");
        temp.setAttribute("CLASS", "select_trier_vivant");
        options2_trier_vivant.shift();
        var randomizeOption2 = [...options2_trier_vivant,...faussesOptions2_trier_vivant].sort((a, b) => a.localeCompare(b));
        randomizeOption2.unshift(".................");
        options2_trier_vivant.unshift(".................");
        for(let k = 0; k < randomizeOption2.length; k++){
            var option = document.createElement("option");
            option.text = randomizeOption2[k]
            option.style.maxWidth = "600px";
            temp.add(option);
        }
        
        document.getElementById("canvas").appendChild(temp);
        temp.style.left ="42px"; 
        temp.style.top = "807px";
}
//nécessaire sur firefox de désactiver l'action par défaut sinon il redirige la page vers l'image quand on la drop
function drop(e){
    if(e.preventDefault) { e.preventDefault(); }
 
}
function drawImage_trier_vivant(){
    var formes_image = document.getElementById("trier_vivant_img");
    ctx.drawImage(formes_image, 125, 25, 1150, 900);
}
function addGroupe_trier_vivant(){
    if(NumberBox_trier_vivant < 4){
        ++NumberBox_trier_vivant;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        for(let i =0; i < NumberBox_trier_vivant; i++){
            ctx.strokeRect(coordBox_trier_vivant[i][0],coordBox_trier_vivant[i][1], 220, 140);
        }
    }
}
function removeGroupe_trier_vivant(){
    if(NumberBox_trier_vivant > 0){
        --NumberBox_trier_vivant;
        for(let i = 0; i < contenuBox_trier_vivant[NumberBox_trier_vivant].length; i++){
            optionUsed[contenuBox_trier_vivant[NumberBox_trier_vivant][i][4]] = false;
        }
        contenuBox_trier_vivant[NumberBox_trier_vivant] = [];
        drawBoard();
        drawImage_trier_vivant();
        drawContenuBox_trier_vivant();
        changeDragDropOption_trier_vivant();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        for(let i =0; i < NumberBox_trier_vivant; i++){
            ctx.strokeRect(coordBox_trier_vivant[i][0],coordBox_trier_vivant[i][1], 220, 140);
        }
    }
}
function drawGroupe_trier_vivant(){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    for(let i =0; i < NumberBox_trier_vivant; i++){
        ctx.strokeRect(coordBox_trier_vivant[i][0],coordBox_trier_vivant[i][1], 220, 140);
    }
}
function changeDragDropOption_trier_vivant(){
    for(let i=0; i < 4; i++){
        if(document.getElementById("trier_vivant_label"+i) != undefined){
            document.getElementById("trier_vivant_label"+i).parentNode.removeChild(document.getElementById("trier_vivant_label"+i));
        }
    }
    nombreOptionVivante = 0;
    for(let i = 0; i < 4 ; i++){
        if(document.getElementById("select_trier_vivant_"+i).value != "..........." && optionUsed[i] == false){
            createLabel_trier_vivant(document.getElementById("select_trier_vivant_"+i).value, i);
            ++nombreOptionVivante;
        }else{
            if(optionUsed[i] == true){
                for(let k = 0; k < 4; k++){
                    for(let j = 0; j < contenuBox_trier_vivant[k].length; j++){
                       if(contenuBox_trier_vivant[k][j][4] == i){
                           if(document.getElementById("select_trier_vivant_"+i).value == "..........."){
                            optionUsed[i] = false;
                            contenuBox_trier_vivant[k].splice(j,1);
                            drawBoard();
                            drawImage_trier_vivant();
                            drawGroupe_trier_vivant();
                            drawContenuBox_trier_vivant();
                           }else{
                           if(contenuBox_trier_vivant[k][j][2] != document.getElementById("select_trier_vivant_"+i).value){
                            optionUsed[i] = false;
                            contenuBox_trier_vivant[k].splice(j,1);
                            drawBoard();
                            drawImage_trier_vivant();
                            drawGroupe_trier_vivant();
                            drawContenuBox_trier_vivant();
                            createLabel_trier_vivant(document.getElementById("select_trier_vivant_"+i).value, i);
                           }}
                       }
                    }}
            }
        }
    }
}
function createLabel_trier_vivant(e, i){
    var drag1;
    drag1 = document.createElement("label");
    drag1.setAttribute("id","trier_vivant_label"+i);
    drag1.style.top = (25+i*4)+"rem";
    drag1.style.fontSize = "1.2rem";
    drag1.style.marginLeft = "1.5rem";
    drag1.textContent = e;
    drag1.setAttribute("class", "drag");
    drag1.setAttribute("draggable", "true");
    drag1.setAttribute("ondragstart","drag_trier_vivant(event)");
    document.getElementById("canvas").appendChild(drag1);
}
function drag_trier_vivant(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}
function allowDrop_trier_vivant(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    for(let i =0; i< NumberBox_trier_vivant; i++){
        if(x > coordBox_trier_vivant[i][0]+10 && x < coordBox_trier_vivant[i][0]+180 ){
            if(y > coordBox_trier_vivant[i][1] && y < coordBox_trier_vivant[i][1]+140 ){
                ev.preventDefault();
            }
        }
    }
}
function drop_trier_vivant(ev){
    var data = ev.dataTransfer.getData("text");
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    for(let i =0; i< NumberBox_trier_vivant; i++){
        if(x > coordBox_trier_vivant[i][0] && x < coordBox_trier_vivant[i][0]+220 ){
            if(y > coordBox_trier_vivant[i][1] && y < coordBox_trier_vivant[i][1]+140 ){
              var temp = data.slice(18,19);
              temp = parseInt(temp);
              optionUsed[temp] = true;
              contenuBox_trier_vivant[i].push([x,y,document.getElementById(data).textContent,data,temp])
            }
        }
    }
        document.getElementById(data).style.display = "none";
        drawContenuBox_trier_vivant();
}
function drawText_trier_vivant(text, x, y, color, size){
    ctx.fillStyle = color;
    ctx.font = size + "px dejavu sans mono";
    ctx.fillText(text, x, y+12);
} 
function drawContenuBox_trier_vivant(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < contenuBox_trier_vivant[i].length; j++){
            drawText_trier_vivant(contenuBox_trier_vivant[i][j][2], contenuBox_trier_vivant[i][j][0]-20, contenuBox_trier_vivant[i][j][1], "blue", TEXT_SIZE_CELL*2);
        }
    }
}
function score_trier_vivant(){
    var scoreAnimaux = 0;
    var rocher = false;
    var listeAnimaux = [];
    //item 6.A
for(let i = 0; i < 4; i++){
    for(let k =0; k < listeAnimaux.length; k++){
    if(document.getElementById("select_trier_vivant_"+i).value == listeAnimaux[k]){
        scoreAnimaux = 100;
    }
}
    for(let j = 0; j < bonElements_trier_vivant.length;j++){
        if(document.getElementById("select_trier_vivant_"+i).value == bonElements_trier_vivant[j]){
            listeAnimaux.push(document.getElementById("select_trier_vivant_"+i).value)
            ++scoreAnimaux;
        }
    }
    if(document.getElementById("select_trier_vivant_"+i).value == "Rocher" || document.getElementById("select_trier_vivant_"+i).value =="Panier"){
        rocher = true;
    }
}
if(rocher == true){
    sendData(0, "trier vivant", 6,1);
}else{
    if(scoreAnimaux == 4){
        sendData(1, "trier vivant", 6,1);
    }else{
        sendData(9, "trier vivant", 6,1);
    }
    
// item 6.B
    correction6B_trier_vivant();
//item 6.C
    correction6C_trier_vivant();
}



nettoyer_trier_vivant();
}

function correction6B_trier_vivant(){
   
    const entreeValable = ["Lapin","Chat","Vache","Canard","Chameau","Papillon","Poisson","Oiseau","Chien","Homme","Grenouille"];
    const classementValable = [[4,6,7,9,10],[4,6,7,9,10],[3,4,6,7,9,10],[1,6,10],[4,6,7,9,10],[1,5,6,8],[2,5,10,11],[1,6,10],[4,6,7,9,10],[4,6,7,9],[2,6]];
    var BoxesNonVide = [];

// vérifie le nombre de boxe remplie 
    for (var i = 0; i < contenuBox_trier_vivant.length; i++){
        if(contenuBox_trier_vivant[i].length > 0){
            BoxesNonVide.push(i);
        }
    }
    if(BoxesNonVide.length === 0 ){
        sendData(9, "trier vivant", 6,2);
        return;
    }
    if(BoxesNonVide.length > 2 ){
        sendData("0B", "trier vivant", 6,2);
        return;
    }
    if(BoxesNonVide.length ===1 ){
        sendData("0D", "trier vivant", 6,2);
        return;
    }

// vérifie que tous les éléments ont été utilisé et que ont a bien 4 réponse qui ont été séléctionné au point A
var nombreDElementUtilise = 0;
    for(var i = 0; i < 4; i++){
        nombreDElementUtilise += contenuBox_trier_vivant[i].length;
        if(document.getElementById("select_trier_vivant_"+i).value == "................." ){
              sendData("0E", "trier vivant", 6,2);
              return;
        }
    }
    if(nombreDElementUtilise !=4){
        sendData("0E", "trier vivant", 6,2);
        return;
    }
// vérifie qu'il n'y a pas de doublon 
var animauxUniques = [];
for (var i = 0; i < 4; i++){
const animalTemp = document.getElementById("select_trier_vivant_"+i).value;
if(animauxUniques.includes(animalTemp)){
    sendData("0E", "trier vivant", 6,2);
    return;
}
animauxUniques.push(animalTemp);
}

// on vérifie qu'un critére binaire a bien été séléctionné 
    const criteriaNumero = options2_trier_vivant.indexOf((document.getElementById("select2_trier_vivant").value));
    if(criteriaNumero === 0 || criteriaNumero === -1 ){
         sendData("0E", "trier vivant", 6,2);
        return;
    }

// on vérifie que le tri est valide par rapport au critére
    var elementBienPlace = [0,0];
    for(var i = 0; i < BoxesNonVide.length; i++){
        for(var j = 0; j < contenuBox_trier_vivant[BoxesNonVide[i]].length; j++){
            const animalName = contenuBox_trier_vivant[BoxesNonVide[i]][j][2];
            const positionAnimal = entreeValable.indexOf(animalName);
            if(positionAnimal === -1 ){
                sendData("0E", "trier vivant", 6,2);
                return;
            }
            const caracteristiquesDelAnimal = classementValable[positionAnimal];
            if(caracteristiquesDelAnimal.includes(criteriaNumero) ){
                elementBienPlace[i]++;
            }
        }
    }
    if(elementBienPlace[0] == contenuBox_trier_vivant[BoxesNonVide[0]].length && elementBienPlace[1] === 0 ){
    sendData(1, "trier vivant", 6,2);
    return;
    }
    if(elementBienPlace[1] == contenuBox_trier_vivant[BoxesNonVide[1]].length && elementBienPlace[0] === 0 ){
        sendData(1, "trier vivant", 6,2);
        return;
    }
      sendData("0E", "trier vivant", 6,2);
      return;
}
function correction6C_trier_vivant(){
    
    const criteriaNumero = options2_trier_vivant.indexOf((document.getElementById("select2_trier_vivant").value));
    if(criteriaNumero === 0 ){
           sendData(9, "trier vivant", 6,3);
        return;
}
if(criteriaNumero === -1){
       sendData(0, "trier vivant", 6,3);
       return;
    }
   sendData(1, "trier vivant", 6,3);
   return;
}

  function nettoyer_trier_vivant(){
    for(let i=0; i < 4; i++){
        if(document.getElementById("trier_vivant_label"+i) != undefined){
            document.getElementById("trier_vivant_label"+i).parentNode.removeChild(document.getElementById("trier_vivant_label"+i));
        }
    }
for(let i =0; i<4; i++){
    document.getElementById("select_trier_vivant_"+(i)).parentNode.removeChild(document.getElementById("select_trier_vivant_"+(i)));
}
document.getElementById("button_trier_vivant").parentNode.removeChild(document.getElementById("button_trier_vivant"));
document.getElementById("button2_trier_vivant").parentNode.removeChild(document.getElementById("button2_trier_vivant"));
document.getElementById("select2_trier_vivant").parentNode.removeChild(document.getElementById("select2_trier_vivant"));
WIDTH = WIDTH -100;
document.getElementById("canvas").style.width = WIDTH + "px";       
document.getElementById("canvas").style.left = "16%";
drawBoard();
reference_liste(7);
}