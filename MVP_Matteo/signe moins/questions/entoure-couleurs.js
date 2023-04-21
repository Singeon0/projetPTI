var selected_entoure_couleurs = null;
var text_entoure_couleurs = [-8, 6, 15, -3];
var squares_entoure_couleurs = [];
var rep_entoure_couleurs = ["bleu", "green","green","bleu"];
function interval_entoure_couleurs(){


    var bleu = document.createElement("label");
    bleu.setAttribute("id","bleu_entoure_couleurs");
    bleu.textContent = "BLEU";
    bleu.onclick = retour_connect_multiple;
    document.getElementById("canvas").appendChild(bleu);
    var vert = document.createElement("label");
    vert.setAttribute("id","vert_entoure_couleurs");
    vert.textContent = "VERT";
    vert.onclick = retour_connect_multiple;
    document.getElementById("canvas").appendChild(vert);
    var enlever = document.createElement("label");
    enlever.setAttribute("id","enlever_entoure_couleurs");
    enlever.textContent = "ENLEVER";
    enlever.onclick = retour_connect_multiple;
    document.getElementById("canvas").appendChild(enlever);
    document.getElementById("next_arrow").onclick = score_entoure_couleurs;
    bleu.onclick = function(){set_entoure_couleurs("bleu");}
    vert.onclick = function(){set_entoure_couleurs("vert");}
    enlever.onclick = function(){set_entoure_couleurs("enlever");}
    document.getElementById("espace").textContent = "Entoure en vert les nombres positifs, en bleu les négatifs";
    drawText_entoure_couleurs();
    newSquare_entoure_couleurs();
    canv.addEventListener("click", click_entoure_couleurs);
//swal("Consignes : ", "Tu dois entourer en vert les nombres positifs et en bleu les nombres négatifs. Sélectionne la couleur avec laquelle tu désire entourer en cliquant sur les boutons en bas. Le bouton ''enlever'' permet d'effacer une réponse !");
 //fonction à faiire apparaitre pour bypass le vrai_faux (utile pour test la fonction suivante sans se taper le vrai faux à chaque fois)
 //nettoyer_entoure_couleurs();

}

function set_entoure_couleurs(c){
    if(c == "bleu"){
        selected_entoure_couleurs = "bleu";
    }
    if(c == "vert"){
        selected_entoure_couleurs = "green";
    }
    if(c == "enlever"){
        selected_entoure_couleurs = "enlever";
    }
}
function drawText_entoure_couleurs(){
    for(let i =0; i <4; i++){
        drawText_connect_the_dots(text_entoure_couleurs[i],MARGIN*2+(WIDTH-MARGIN*2)*i/4, 250, "black", TEXT_SIZE_CELL*3);
    }
}

function newSquare_entoure_couleurs(){
    for(let i =0; i <4; i++){
        squares_entoure_couleurs[i] = new Square_entoure_couleurs(MARGIN*2+(WIDTH-MARGIN*2)*i/4, 250,TEXT_SIZE_CELL*3, TEXT_SIZE_CELL*3 );
        squares_entoure_couleurs[i].value = rep_entoure_couleurs[i];
    }


}
function click_entoure_couleurs(ev){
      //get mouse position relative to the canvas
      
var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;
var x = parseInt(ev.pageX - offsetX)-30;
var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;

    for(let i =0; i <4; i++){
       if(squares_entoure_couleurs[i].contains(x, y)){
           squares_entoure_couleurs[i].couleur = selected_entoure_couleurs;
       }
    }
    drawCIRCLE_entoure_couleurs();
    
}

function drawCIRCLE_entoure_couleurs(){
    drawBoard();
    for(let i =0; i <4; i++){
            if(squares_entoure_couleurs[i].couleur === "green" ){
                drawCircle_entoure_couleurs(squares_entoure_couleurs[i].x,squares_entoure_couleurs[i].y, "green" );
            }
            if(squares_entoure_couleurs[i].couleur === "bleu" ){
                drawCircle_entoure_couleurs(squares_entoure_couleurs[i].x,squares_entoure_couleurs[i].y, "blue" );
            }
     }
     drawText_entoure_couleurs();

}
function drawCircle_entoure_couleurs(x, y, c){
    ctx.strokeStyle = c;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI);
    ctx.stroke();
}
function score_entoure_couleurs(){
    var total = 1;
    //points pour chaque réponse si elle a la bonne couleur
for(let i =0; i < 4; i++){
    if(squares_entoure_couleurs[i].couleur === "enlever"){
        sendData(9, "entoure en couleur", 11, (i+1));
        total = total * 0;
    }else{
    if(squares_entoure_couleurs[i].couleur === rep_entoure_couleurs[i]){
        sendData(1, "entoure en couleur", 11, (i+1));
      
    }else{
        sendData(0, "entoure en couleur", 11, (i+1));
          total = total * 2;
    }}
}
// un total avec 1 si il a tout bon sinon 0 ou 9 si un truc pas complété
if(total == 0){
    sendData(9, "entoure en couleur", 11, 5);
}else{
    if(total == 1){
        sendData(1, "entoure en couleur", 11, 5);
    }else{
        sendData(0, "entoure en couleur", 11, 5);
    }
}
// score spécial si il a entouré en bleu les 2premiers et en vert les deux second puis inversément
if(total == 0){
    sendData("9", "entoure en couleur", 11, 6);
}else{
if(squares_entoure_couleurs[0].couleur === "bleu" && squares_entoure_couleurs[1].couleur === "bleu" && squares_entoure_couleurs[2].couleur === "green" && squares_entoure_couleurs[3].couleur === "green"){
    sendData("1A", "entoure en couleur", 11, 6);
}else{
if(squares_entoure_couleurs[0].couleur === "green" && squares_entoure_couleurs[1].couleur === "green" && squares_entoure_couleurs[2].couleur === "bleu" && squares_entoure_couleurs[3].couleur === "bleu"){
    sendData("1B", "entoure en couleur", 11, 6);
}else{
    sendData("0", "entoure en couleur", 11, 6);
}
}
}
nettoyer_entoure_couleurs();
}

function nettoyer_entoure_couleurs(){
    drawBoard();
    document.getElementById("bleu_entoure_couleurs").parentNode.removeChild(document.getElementById("bleu_entoure_couleurs"));
    document.getElementById("vert_entoure_couleurs").parentNode.removeChild(document.getElementById("vert_entoure_couleurs"));
    document.getElementById("enlever_entoure_couleurs").parentNode.removeChild(document.getElementById("enlever_entoure_couleurs"));
    canv.removeEventListener("click", click_entoure_couleurs);
    reference_liste(12);
}


//create the Square object constructor, va permettre de créer des carré virtuels qui seront placé là où on veut un input
function Square_entoure_couleurs(x, y, w, h, ref){
      this.x = x+20;
      this.y = y-15;
      this.w = w*2;
      this.h = h*2;
      //les 4 suivants indiquent les coordonés des bords du carré
      this.left = x+20 - w;
      this.right = x+20 + w;
      this.top = y-15 - h;
      this.bot = y-15 + h;
      this.used = 0; //est-ce que le point a déjà été utilisé (relié à un autre)
      this.couleur = "enlever";  
      this.value;
    
      // fonction qui return true quand on lui donne un point qui appartient au carré 
      this.contains  = function (x,y){
          return x >= this.left && x < this.right && y >= this.top && y < this.bot;
      }
 
      
 
    
 
 }