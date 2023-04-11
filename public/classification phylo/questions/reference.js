

canv = document.createElement("canvas");
canv.addEventListener("click",getcoord);

var reference_x, reference_y;
var passer = 1;


 window.onresize = function()
 {
 resizeBackground();
}
function resizeBackground()
{
    document.getElementById("background").style.width =  Math.max(document.getElementById("canvas").getBoundingClientRect().width+(document.getElementById("canvas").getBoundingClientRect().left + document.documentElement.scrollLeft) +(document.getElementById("next_arrow").getBoundingClientRect().width * 2), window.innerWidth)+ "px";
}

function getcoord(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    reference_x = parseInt(ev.pageX - offsetX)-35;
    reference_y = parseInt(ev.pageY - offsetY) - 20;
    console.log("x: "+ reference_x);
    console.log("y: "+ reference_y);

}
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

function drawBoard(){
    ctx.lineWidth = 2;
    ctx.fillStyle = COLOR_BOARD;
    ctx.strokeStyle = COLOR_BORDER 
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeRect(STROKE / 2, STROKE / 2, WIDTH - STROKE, HEIGHT - STROKE);
}
var swalRepeat = false;
async function sendData(Score, quest, quest_numb, sous_quest_numb){
    //option pour la fonction fetch
    const Score_data = {Score, local_class, local_Id,question: quest, quest_numb: quest_numb, sous_quest_numb: sous_quest_numb, version: 1};
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

   resizeBackground()
}
function getX(ev){
return reference_x;
  
}
function getY(ev){
return reference_y;

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
    }
    
    atWhichQuestionIAm = n;
    resizeBackground();
}
function reference_question1(p){
if(passer <= p){swal("Consignes : ", "Choisis la seule réponse correcte pour chaque question, tu peux décocher une case en recliquant dessus. Une fois que tu as terminé, tu peux passer à la question suivante en cliquant sur la fléche rouge à droite de l'écran.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}
  interval_observe_forme();

  if(passer > p){ nettoyer_observe_forme();}
}
function reference_question2(p){
if(passer < p){swal("Consignes : ", "Choisis la seule réponse correcte pour chaque question, tu peux décocher une case en recliquant dessus.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}
interval_observe_animaux()
if(passer >p){nettoyer_observe_animaux();}
 
}
function reference_question3(p){
    if(passer < p){swal("Consignes : ", "Coche les propositions qui sont correctes selon toi, tu peux décocher une case en recliquant dessus");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}   interval_propositions();
if(passer > p){nettoyer_propositions();}
}
function reference_question4(p){
    if(passer < p){swal("Consignes : ", "Coche les éléments que tu pourrais utiliser pour classer cet animal dans une classification des êtres vivants, tu peux décocher une case en recliquant dessus.   ");
  }
  if(swalRepeat == true){
    swalRepeat = false;
    return;
}  interval_photographie();
if(passer > p){nettoyer_photographie();}

}

function reference_question5(p){
 
    
    if(passer < p){swal("Consignes : ", "Clique sur un mot pour l'entourer, clique à nouveau pour le désentourer");}
    if(swalRepeat == true){
        swalRepeat = false;
        return;
    }
    interval_fruits();
    if(passer > p){ nettoyer_fruits();}
}

function reference_question6(p){
    if(passer < p){swal("Consignes : ", "Clique sur un mot pour l'entourer, clique à nouveau pour le désentourer");}
    if(swalRepeat == true){
        swalRepeat = false;
        return;
    }
    interval_trier_vivant();
    if(passer > p){ nettoyer_trier_vivant();}
}

function reference_question7(p){
   
    if(passer < p){swal("Consignes : ", "Clique sur deux boules que tu souhaite relier, tu peux supprimer la dernière ligne que tu as tracé en appuyant sur ''retour !''. Quand tu as fini, clique sur la fléche rouge en bas à droite pour passer à la question suivante ! ");
  }  if(swalRepeat == true){
    swalRepeat = false;
    return;
}
  interval_descriptif();
    if(passer > p){ nettoyer_descriptif(); }
}

function reference_question8(p){
    if(passer < p){swal("Consignes : ", "Résous les calculs suivants. Pour cela entre ta réponse sur les pointillés, pas besoin de valider ! Quand tu as tout fini clique sur la fléche en bas à droite !");
}if(swalRepeat == true){
    swalRepeat = false;
    return;
}
interval_coche8();
    if(passer > p){nettoyer_coche8;}
}
function reference_question9(p){
   
    if(passer < p){swal("Consignes : ", "Clique sur les deux boules que tu souhaite relier, tu peux supprimer une ligne que tu as tracé en cliquant sur une des deux boules de cette ligne. Quand tu as fini clique sur la fléche rouge en bas à droite pour passer à la question suivante ! ");    
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}
interval_arbre(); 
    if(passer > p){nettoyer_arbre(); }
}
function reference_question10(p){
    if(passer < p){swal("Consignes : ", "Tu dois entourer en vert les nombres positifs et en bleu les nombres négatifs. Sélectionne la couleur avec laquelle tu désire entourer en cliquant sur les boutons en bas. Le bouton ''enlever'' permet d'effacer une réponse !");
}

if(swalRepeat == true){
    swalRepeat = false;
    return;
}interval_caractere();
 if(passer > p){nettoyer_caractere();}
} 

function reference_question11(p){
    if(passer < p){swal("Consignes : ", "Ecris dans les bulles un S si le signe moins indique une soustraction, un N si il indique un nombre négatif et un O si il indique l'opposé. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}
interval_attributs();
 if(passer > p){nettoyer_attributs();}
} 
function reference_question12(p){
    if(passer < p){swal("Consignes : ", "Ecris deux nombres opposés sur les pointillés. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}
interval_pattes();
 if(passer > p){nettoyer_pattes();}
} 
function reference_question13(p){
    if(passer < p){swal("Consignes : ", "Place les nombres -3, -7 et 4 sur cette droite gradué munie d'un repère. Tu peux annuler ton choix en cliquant sur un nombre que tu as placé");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}
coordX_vrai_faux = [1026,1095];
coordY_vrai_faux = [969,1159,1325];
coordX_select_vrai_faux = [252,252,252];   
coordY_select_vrai_faux = [985,1173,1324];   
selected_vrai_faux = [false,false,false];
tolerance_vrai_faux = 20;
options_vrai_faux = [["................",  "La mésange et l’araignée n’ont rien en commun.", "La mésange à un squelette interne et pas externe.", "L’araignée à un squelette interne et pas externe.", "La mésange a des plumes et un squelette interne."],["................","L’abeille possède tout ce qui est dit (tête, bouche, yeux, squelette externe, 6 pattes et 2 antennes)","L’abeille ne possède pas 6 pattes et 2 antennes mais 8 pattes ","L’abeille à un corps mou et pas un squelette externe. ","L’abeille possède une tête, une bouche, des yeux, un squelette externe et 6 pattes."],["................","L’huitre ne possède pas de corps mou avec anneaux.","L’huitre ne possède pas de coquille.","L’huitre ne possède pas de corps mou.","L’huitre possède un corps mou et une coquille."]]
selectWidth_vrai_faux = [740,740,740];
rect_vrai_faux = [60,[1030,1220,1360],900,40]
rep_vrai_faux = [[1,"La mésange à un squelette interne et pas externe."],[0,"L’abeille possède tout ce qui est dit (tête, bouche, yeux, squelette externe, 6 pattes et 2 antennes)"],[1,"L’huitre possède un corps mou et une coquille."]];
quest_name_vrai_faux = "vrai faux 1";
quest_numb_vrai_faux = 13;
image_vrai_faux = "vrai_faux1_img";
interval_vrai_faux();
 if(passer > p){nettoyer_vrai_faux();}
} 

function reference_question14(p){
    if(passer < p){swal("Consignes : ", "Ecris dans les bulles un S si le signe moins indique une soustraction, un N si il indique un nombre négatif et un O si il indique l'opposé.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}
coordX_vrai_faux = [1010,1077];
coordY_vrai_faux = [1035,1202,1345];
coordX_select_vrai_faux = [252,252,252];   
coordY_select_vrai_faux = [1054,1218,1344];   
selected_vrai_faux = [false,false,false];
tolerance_vrai_faux = 20;
options_vrai_faux = [["................","Le pin noir et le pommier ne possède pas de graine(s) et bois" , "Le pin noir et le pommier possèdent des graines et du bois.",  "Le pin noir possède des aiguilles et cônes et le pommier possède des fleurs", "Le pommier ne possède pas de bois"],["................","Le polypode possède des feuilles composées en fronde.","Le polypode commun ne comporte que des feuilles composées en fronde.","Le polytric ne possède pas de feuilles nervurées."],["................","Le pommier ne possède que des graines et du bois. ","Le pommier ne possède que des fleurs","Le pommier possède des feuilles nervurées, des graines et du bois et des fleurs.","Le pommier n’est pas dans la boite « feuilles nervurées » "]]
selectWidth_vrai_faux = [720,720,720];
rect_vrai_faux = [40,[1090,1260,1380],895,30]
rep_vrai_faux = [[0,"Le pin noir et le pommier possèdent des graines et du bois."],[1,"Le polytric ne possède pas de feuilles nervurées."],[1,"Le pommier possède des feuilles nervurées, des graines et du bois et des fleurs."]];
quest_name_vrai_faux = "vrai faux 2";
quest_numb_vrai_faux = 14;
image_vrai_faux = "vrai_faux2_img";
interval_vrai_faux();
 if(passer > p){nettoyer_vrai_faux();}
} 
function reference_question15(p){
    if(passer < p){swal("Consignes : ", "Complète les calculs de façon à respecter l'égalité.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}
interval_construit();
 if(passer > p){nettoyer_construit();}
} 

function reference_question16(p){
   // document.getElementById("titreQuestions").style.display = "none";
    document.getElementById("swalRe").style.display = "none";
    document.getElementById("espace").style.display= "initial";
    interval_graph_student();
}
