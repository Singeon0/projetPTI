
// table des matières des différentes questions, permet de les appeller de manière centralisé (utilse par exemple pour en passer). Les fonctions qui commencent par "interval_" servent à démarrer une question, celles qui comment par "nettoyer_" servent terminer une question. 'Swal' c'est pour les alertes pop-up
//les lignes avant le switch case initialisent des éléments utilisé de manière récurrente à travers les différentes questions 
canv = document.createElement("canvas");
canv.addEventListener("click",getcoord);

window.onresize = function()
{
resizeBackground();
}
function resizeBackground()
{
   document.getElementById("background").style.width =  Math.max(document.getElementById("canvas").getBoundingClientRect().width+(document.getElementById("canvas").getBoundingClientRect().left + document.documentElement.scrollLeft) +(document.getElementById("next_arrow").getBoundingClientRect().width * 2), window.innerWidth)+ "px";
}


var reference_x, reference_y;
//Une fonction pour le développement, permet de connaitre la position du curseur quand on veut placer des éléments. 
function getcoord(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    reference_x = parseInt(ev.pageX - offsetX)-35;
    reference_y = parseInt(ev.pageY - offsetY) - 20;
    console.log("x: "+ reference_x);
    console.log("y: "+ reference_y);
}
var passer = 1;
var HEIGHT = 600; //pixel
var WIDTH = HEIGHT * 2;
const STROKE =  (HEIGHT / (7))/ 12; // stroke width
var TEXT_SIZE_CELL = 10;
 //colours
 const COLOR_BOARD = "white";
 const COLOR_BORDER = "#00abcc";
 const COLOR_DOT = "#a80039";
 const COLOR_DOT_HIGH = "black";
 const COLOR_PLAYER = "royalblue";
 const COLOR_PLAYER_LIT = "lightsteelblue";
 
 //canv attribute
canv.setAttribute("id", "canv");
canv.height = HEIGHT;
canv.width = WIDTH;
var div = document.getElementById("canvas")
div.appendChild(canv);

//set up the context
ctx = canv.getContext("2d");
canvRect = canv.getBoundingClientRect();   
//dessine le canvas
function drawBoard(){
    ctx.fillStyle = COLOR_BOARD;
    ctx.strokeStyle = COLOR_BORDER 
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeRect(STROKE / 2, STROKE / 2, WIDTH - STROKE, HEIGHT - STROKE);
}
var swalRepeat = false;
// envoie le score au serveur 
async function sendData(Score, quest, quest_numb, sous_quest_numb){
    //option pour la fonction fetch
    const Score_data = {Score, local_class, local_Id,question: quest, quest_numb: quest_numb, sous_quest_numb: sous_quest_numb, version : 2};
    const options ={
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Score_data)
    };
    //async function pour poster le score au serveur
   const response = await fetch('/api', options);
   //reçois une réponse du serveur
   const server_data = await response.json();
}
function reference_liste(n){
    switch(n){
        case 1: reference_question1(n);
        break;
        case 2: reference_question2(n);
        break;
        case 3: reference_question3(n);
        break;
        case 4: reference_question4(n);
        break;
        case 5: reference_question5(n);
        break;
        case 6: reference_question6(n);
        break;
        case 7: reference_question7(n);
        break;
        case 8: reference_question8(n);
        break;
        case 9: reference_question9(n);
        break;
        case 10: reference_question10(n);
        break;
        case 11: reference_question11(n);
        break;
        case 12: reference_question12(n);
        break;
        case 13: reference_question13(n);
        break;
        case 14: reference_question14(n);
        break;
        case 15: reference_question15(n);
        break;
        case 16: reference_question16(n);
        break;
        case 17: reference_question17(n);
        break;
        case 18: reference_question18(n);
        break;
        case 19: reference_question19(n);
        break;
        case 20: reference_question20(n);
        break;
        case 21: reference_question21(n);
        break;
        case 22: reference_question22(n);
        break;
        case 23: reference_question23(n);
        break;
        case 24: reference_question24(n);
        break;
        case 25: reference_question25(n);
        break;
        case 26: reference_question26(n);
        break;
    }
    atWhichQuestionIAm = p;
    resizeBackground();
}
function reference_question1(p){
if(passer <= p){swal("Consignes : ", "Clique sur le petit rond, relâche et fais glisser la souris pour colorer la fraction demandée de la figure proposée. ");
if(swalRepeat == true){
    swalRepeat = false;
    return;
}
}
  interval_hachure1();
 
  if(passer > p){ nettoyer_hachure1();}
}
function reference_question2(p){
if(passer < p){swal("Consignes : ", "Pour chaque fraction de la colonne de gauche, clique sur le petit point et glisse ton trait jusqu’à la fraction équivalente de la colonne de droite. Si tu penses t’être trompé, tu peux changer ton trait en répétant la même opération, mais cette fois avec la bonne fraction de la colonne de droite ! ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

    var col1 = 4;
    var col2 = 5;
  var  Q = [["10/6", "9/12","6/10","20/15" ],["3/5","3/4", "2/5", "4/3","5/3"]]
  var  R = [[5,2,1,4],[1,2,3,4,5]];
  var  q = "connect the dots";
    var n = 2;
interval_connect_the_dots(Q, R, q, col1, col2, n)
if(passer >p){nettoyer_connect_the_dots();}
 
}
function reference_question3(p){
    if(passer < p){swal("Consignes : ", "Clique sur le rond rouge rempli d’une croix et ensuite sur une case du tableau pour la barrer ou clique sur le rond vert vide et ensuite sur une case du tableau pour l’entourer. Si tu penses t’être trompé, reclique sur la case et ce que tu y avais mis disparaitra. ");
}  
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

 interval_entoure_addition();
if(passer > p){nettoyer_entoure_addition();}
}
function reference_question4(p){
    if(passer < p){swal("Consignes : ", "Clique sur la fraction, laisse le bouton de la souris enfoncé et tire la fraction au bon endroit sur la droite graduée. Lorsque tu penses l’avoir bien placée, lâche le bouton de la souris. Si tu t’es trompé, tu peux cliquer sur la fraction déjà placée sur la droite graduée pour l’effacer et pouvoir la replacer au bon endroit. ");
  } 
  if(swalRepeat == true){
    swalRepeat = false;
    return;
}

  var REP = [["5/6",380],["13/6",860],["4/3",540],["3/12",170]];
  var img = "droite_grad_img";
  var q = "droite graduée";
var n = 4;
var ref = 5;
var ver= 1;
  interval_droite_grad(REP, img,q ,n, ref, ver);
if(passer > p){nettoyer_droite_grad();}

}

function reference_question5(p){  
    if(passer < p){swal("Consignes : ", "Clique dans la case qui correspond à la figure et entre sa valeur fractionnaire à l’aide du clavier. Ta réponse doit prendre la forme suivante : « nombre/nombre ». Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne. ");} 
    if(swalRepeat == true){
        swalRepeat = false;
        return;
    }
    
    interval_trouver_fraction();
    if(passer > p){ nettoyer_trouver_fraction();}
}

function reference_question6(p){
    if(passer < p){swal("Consignes : ", "Repasse sur le contour qui correspond à l’aide de la souris. ");}
    if(swalRepeat == true){
        swalRepeat = false;
        return;
    }
    
    interval_dessin_distraction();
    if(passer > p){ nettoyer_dessin_distraction();}
}

function reference_question7(p){
   
    if(passer < p){swal("Consignes : ", "Clique dans la case et entre ta réponse à l’aide du clavier. Ta réponse doit prendre la forme suivante : « nombre/nombre ». Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne. ");
  }
  if(swalRepeat == true){
    swalRepeat = false;
    return;
}

    interval_irreductible();
    if(passer > p){ nettoyer_irreductible(); }
}

function reference_question8(p){
    if(passer < p){swal("Consignes : ", "Clique sur le rond rouge rempli d’une croix et ensuite sur une figure pour la barrer ou clique sur le rond vert vide et ensuite sur une figure pour l’entourer. Si tu penses t’être trompé, reclique sur la figure et ce que tu y avais mis disparaitra.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

interval_representations();
    if(passer > p){nettoyer_representations();}
}
function reference_question9(p){
    if(passer < p){swal("Consignes : ", "Clique dans la case et entre ta réponse à l’aide du clavier. Ta réponse doit prendre la forme suivante : « nombre/nombre ». Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne. ");    
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var left = [210,660];
var top = [184,271,363,457];
var n = 9;
var col = 2;
var row = 4;
var q = "résous et simplifie"
var R = ["5/7","4/11","13/14","7/20","2/9","7/3","17/15","11/10"]
var R0A = ["5/14","24/10","8/21","2/1","2/0","3/4","5/8","12/5"]
var R0B = ["","24/9","","","","3/5","",""]
var img = "resous_simplifie_img";
var titre = "Resous les calculs et simplifie si nécessaire";
var imgHeight = 500;
interval_resous_simplifie( R, q, n,col,row, 10, left, top, img, R0A, R0B, titre, imgHeight); 
    if(passer > p){nettoyer_resous_simplifie(); }
}
function reference_question10(p){
    if(passer < p){swal("Consignes : ", "Clique sur la fraction, laisse le bouton de la souris enfoncé et tire la fraction au bon endroit sur la droite graduée. Lorsque tu penses l’avoir bien placée, lâche le bouton de la souris. Si tu t’es trompé, tu peux cliquer sur la fraction déjà placée sur la droite graduée pour l’effacer et pouvoir la replacer au bon endroit. ");
} 
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var REP = [["7/12",307],["23/12",718],["9/4",823],["30/24",514]];
var img = "droite_grad2_img";
var q = "droite graduée 2";
var n = 10;
var ref = 11;
var ver= 5;
interval_droite_grad(REP, img, q, n, ref, ver);
if(passer > p){nettoyer_droite_grad();}
}
function reference_question11(p){
    if(passer < p){swal("Consignes : ", "Clique dans la case et entre ta réponse à l’aide du clavier. Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

interval_droite_distraction();
 if(passer > p){nettoyer_droite_distraction();}
} 
function reference_question12(p){
    if(passer < p){swal("Consignes : ", "Clique sur le petit point de la fraction de la colonne de gauche et ensuite sur celui de la réglette de la colonne de droite que tu penses être la bonne. Si tu penses t’être trompé, clique sur le trait pour l’effacer. Ensuite, clique sur le bouton sous la réglette, glisse ta souris jusqu’où tu penses devoir colorier et clique à nouveau pour arrêter le coloriage. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

interval_reglette();
 if(passer > p){nettoyer_reglette();}
} 
function reference_question13(p){
    if(passer < p){swal("Consignes : ", "Sélectionne la bonne traduction et la bonne résolution à l’aide des menus déroulants. Si tu penses t’être trompé, tu peux toujours recommencer et sélectionner une autre réponse. Ensuite, clique dans la case et entre ta réponse à l’aide du clavier. Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne. ");
}if(swalRepeat == true){
    swalRepeat = false;
    return;
}

interval_traduction_probleme();
 if(passer > p){nettoyer_traduction_probleme();}
} 

function reference_question14(p){
    if(passer < p){swal("Consignes : ", "Clique sur les fractionnements de chaque figure afin de les colorier. Si tu t’es trompé, tu peux cliquer sur le fractionnement colorié une seconde fois et la couleur disparaitra. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

interval_hachure2();
if(passer > p ){nettoyer_hachure2();}
} 
function reference_question15(p){
    if(passer < p){swal("Consignes : ", "Clique dans les objets pour les colorier. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

interval_colorie_etoiles();
 if(passer > p){nettoyer_colorie_etoiles();}
} 

function reference_question16(p){
    if(passer < p){swal("Consignes : ", "Pour chaque proposition de la colonne de gauche, clique sur le petit point et glisse ton trait jusqu’à la fraction équivalente de la colonne de droite. Si tu penses t’être trompé, tu peux changer ton trait en répétant la même opération, mais cette fois avec la bonne fraction de la colonne de droite ! ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

interval_connect_multiple();
 if(passer > p){nettoyer_connect_multiple();}
} 
function reference_question17(p){
    if(passer < p){swal("Consignes : ", "Clique sur le rond rouge rempli d’une croix et ensuite sur une case pour la barrer ou clique sur le rond vert vide et ensuite sur une case pour l’entourer. Si tu penses t’être trompé, reclique sur la case et ce que tu y avais mis disparaitra. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var x = [[132,366,581,806,1020]];
var y = [406];
var img = "entoure_template1_img"
var Rep = [[0,1,0,1,0]]
var imgHeight = 450;
var imgWidth = 1150;
var select = [[false,false,false,false,false]];
var marg = 50;
var next = 18;
var quest_name = "ordre de grandeur des fractions";
var quest_number = 17;
interval_entoure_template(x,y,img,Rep, imgHeight, imgWidth, select, marg, next, quest_number, quest_name);
 if(passer > p){nettoyer_entoure_template();}
} 
function reference_question18(p){
    if(passer < p){swal("Consignes : ", "Clique sur le rond rouge rempli d’une croix et ensuite sur une case pour la barrer ou clique sur le rond vert vide et ensuite sur une case pour l’entourer. Si tu penses t’être trompé, reclique sur la case et ce que tu y avais mis disparaitra. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var x = [[314,601,879]];
var y = [353];
var img = "entoure_template2_img"
var Rep = [[1,0,0]]
var imgHeight = 350;
var imgWidth = 1100;
var select = [[false,false,false]];
var marg = 120;
var next = 19;
var quest_name = "entoure les calculs corrects";
var quest_number = 18;
interval_entoure_template(x,y,img,Rep, imgHeight, imgWidth, select, marg, next, quest_number,quest_name);
 if(passer > p){nettoyer_entoure_template();}
} 
function reference_question19(p){
    if(passer < p){swal("Consignes : ", "Dessine à l’aide de la souris pour entourer les bonnes figures. Clique sur le bouton « effacer » si tu penses t’être trompé et recommence. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

    interval_entoure_distraction();
    if(passer > p){nettoyer_entoure_distraction();}
}
function reference_question20(p){
    if(passer < p){swal("Consignes : ", "Clique sur le rond rouge rempli d’une croix et ensuite sur une écriture pour la barrer ou clique sur le rond vert vide et ensuite sur une écriture pour l’entourer. Si tu penses t’être trompé, reclique sur l’écriture et ce que tu y avais mis disparaitra. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var x = [[398,626,892],[388,626,892],[398,626,892],[370,560,749,957]];
var y = [191,298,404,510];
var img = "entoure_template4_img"
var Rep = [[1,0,0],[0,0,1],[1,0,0],[0,1,0,1]]
var imgHeight = 550;
var imgWidth = 1100;
var select = [[false,false,false],[false,false,false],[false,false,false],[false,false,false,false]];
var marg = 20;
var next = 21;
var quest_name = "fractions de départ";
var quest_number = 20;
interval_entoure_template(x,y,img,Rep, imgHeight, imgWidth, select, marg, next, quest_number,quest_name);
    if(passer > p){nettoyer_entoure_template();}
}
function reference_question21(p){
    if(passer < p){swal("Consignes : ", "Clique dans la case et entre ta réponse à l’aide du clavier. Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var left = [190,505,880];
var top = [333];
var n = 21;
var col = 3;
var row = 1;
var q = "résous et simplifie"
var R = ["3/4","3/8","12/3"]
var R0A = ["3/2","3/4","12"]
var R0B = ["","",""]
var img = "resous21_img";
var titre = "Resous les calculs et simplifie si nécessaire"
var imgHeight = 500;
interval_resous_simplifie( R, q, n,col,row, 22, left, top, img, R0A, R0B, titre, imgHeight); 
    if(passer > p){nettoyer_resous_simplifie(); }
}
function reference_question22(p){
    if(passer < p){swal("Consignes : ", "Sélectionne le bon signe pour chaque comparaison à l’aide des menus déroulants. Si tu penses t’être trompé, tu peux toujours recommencer et sélectionner une autre réponse.  ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var rep = ["<",">","<",">",">"];
var rep0A = ["","","","=",""];
var rep0B = ["","","","<",""]
var left =[235, 445, 661, 844, 1012];
var top = [349];
var img = "symbole_img";
var quest = 22;
var question = "symbole";
var next = 23;
var option = ["","<",">","="]
interval_symbole(rep, left, top, img, quest, question, next, rep0A, rep0B, option);
    if(passer > p){nettoyer_symbole();}
}
function reference_question23(p){
    if(passer < p){swal("Consignes : ", "Clique dans la case et entre ta réponse à l’aide du clavier. Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

    interval_soustraction_distraction();
    if(passer > p){nettoyer_soustraction_distraction();}
}
function reference_question24(p){
    if(passer < p){swal("Consignes : ", " Sélectionne la bonne résolution à l’aide du menu déroulant. Si tu penses t’être trompé, tu peux toujours recommencer et sélectionner une autre réponse. Ensuite, clique dans la case et entre ta réponse à l’aide du clavier. Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

    interval_traduction_probleme2();
    if(passer > p){nettoyer_traduction_probleme2();}
}
function reference_question25(p){
    if(passer < p){swal("Consignes : ", "Clique dans la case et entre ta réponse à l’aide du clavier. Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var left = [167,428,672, 900];
var top = [217];
var n = 25;
var col = 4;
var row = 1;
var q = "résous et simplifie"
var R = ["1","4","6","9"]
var R0A = ["","",""]
var R0B = ["","",""]
var img = "resous25_img";
var titre = "Resous les calculs suivants";
var imgHeight = 300;
interval_resous_simplifie( R, q, n,col,row, 26, left, top, img, R0A, R0B, titre, imgHeight); 
    if(passer > p){nettoyer_resous_simplifie(); }
}
function reference_question26(p){
    document.getElementById("swalRe").style.display = "none";
    document.getElementById("espace").style.display= "initial";
    interval_graph_student();
}