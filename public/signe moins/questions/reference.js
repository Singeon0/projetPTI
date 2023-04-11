
canv = document.createElement("canvas");
canv.addEventListener("mousemove",getcoord);

window.onresize = function()
{
resizeBackground();
}
function resizeBackground()
{
   document.getElementById("background").style.width =  Math.max(document.getElementById("canvas").getBoundingClientRect().width+(document.getElementById("canvas").getBoundingClientRect().left + document.documentElement.scrollLeft) +(document.getElementById("next_arrow").getBoundingClientRect().width * 2), window.innerWidth)+ "px";
}

var reference_x, reference_y;
var passer = 1;
function getcoord(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    reference_x = parseInt(ev.pageX - offsetX)-35;
    reference_y = parseInt(ev.pageY - offsetY) - 20;
}

function getX(ev){
return reference_x;
  
}
function getY(ev){
return reference_y;

}
var swalRepeat = false;
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
    }
    atWhichQuestionIAm = n;
    resizeBackground()
}
function reference_question1(p){
if(passer <= p){swal("Consignes : ", "Clique sur les petites boules à côté de vrai/faux pour sélectionnée la réponse correspondante. Tu peux supprimer ta réponse en cliquant sur une boule déjà sélectionnée ! \n Ensuite, sélectionne la bonne justification à l’aide du menu déroulant. Si tu penses t’être trompé, tu peux toujours recommencer et sélectionner une autre réponse !");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
  document.getElementById("titreQuestions").onload = ()=>{interval_vrai_faux();}

    if(passer > p){ nettoyer_vrai_faux();}
}
function reference_question2(p){
    var Q =  [" - 5 + 6 = 1", "-15 + 3 = -18","-7 + (- 2) = -5", "4 - (-3) = 7", "   4 - 7 = 3", "  - 7 - 4 = 11", "5 + (-7) = -2", "7 + (-4) = -11", "-2 - (- 8) = -10", "  13 – 5 = 8" ,"  5 + 7 = 12" ,"- 10 - (-3) = -13", "          -4 – (-6) – 5 = -3", "           5 + (-2) + 3 = 6"];
    var R = [[true, false, false, true, false, false],[true, false, false, true, true, false],[true, true]];
    var q ="entoure ou barre pour l'addition";
    var n = 2;
    var col = 6;
     if(passer < p){swal("Consignes : ", " Clique sur le rond rouge rempli d’une croix et ensuite sur une case du tableau pour la barrer ou clique sur le rond vert vide et ensuite sur une case du tableau pour l’entourer. Si tu penses t’être trompé, reclique sur la case et ce que tu y avais mis disparaitra.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_entoure_addition(Q, R, q, n,col, 3)}
if(passer >p){nettoyer_entoure_addition();}
 
}
function reference_question3(p){
    if(passer < p){swal("Consignes : ", "Clique sur le nombre, laisse le bouton de la souris enfoncé et tire le nombre au bon endroit sur la droite graduée. Lorsque tu penses l’avoir bien placée, lâche le bouton de la souris. Si tu t’es trompé, tu peux cliquer sur le nombre déjà placé sur la droite graduée pour l’effacer et pouvoir le replacer au bon endroit.");
}  
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
 document.getElementById("titreQuestions").onload = ()=>{interval_droite_grad();}
if(passer > p){nettoyer_droite_grad();}
}
function reference_question4(p){
    var Q =[ "(-3) . (-3) = -9", "(-2) x 7 = -14", "(-5) . 1 = -5", "7 . (-1) = 7", "4 x 6 = 24", "8 x (-2) = 16", "(-3) x (-4) = 12", "5 . 5 = 25", "     (-3) . (2) . (-2) = -12", "     (-2) . (-3) . (-10) = -60"]
    
    var R =[[false, true, true, false],[true, false, true, true],[false, true]];
    var q ="entoure ou barre pour la multiplication";
    var n = 4;
    var col = 4;
    if(passer < p){swal("Consignes : ", "Clique sur le rond rouge rempli d’une croix et ensuite sur une case du tableau pour la barrer ou clique sur le rond vert vide et ensuite sur une case du tableau pour l’entourer. Si tu penses t’être trompé, reclique sur la case et ce que tu y avais mis disparaitra. ");
  } 
  if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
 document.getElementById("titreQuestions").onload = ()=>{interval_entoure_addition(Q, R, q, n,col, 5);}
if(passer > p){nettoyer_entoure_addition();}

}

function reference_question5(p){
 
    
    if(passer < p){swal("Consignes : ", "Clique dans la case à côté du nombre et tapes-y son opposé à l'aide du clavier. Si tu t’es trompé, tu peux effacer le nombre et en mettre un autre.");}
    if(swalRepeat == true){
        swalRepeat = false;
        return;
    }
    
    document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
    document.getElementById("titreQuestions").onload = ()=>{interval_donne_oppose();}
    if(passer > p){ nettoyer_donne_oppose();}
}

function reference_question6(p){
var Q = [[" 5 + 3 = ","3 - 5 =","  (-5) + 8 =  ","3 + (-5) = "],["-5 + 3 = "," 5 + (-3) = "," -5 + (-3) = "," -5 - (-3) = "],[" 5 - 3 = "," -3 - 5 = "," 5 - (-3) = "," -3 - (-5) = "],["3 – 2 – (-5) = "," -3 + 5 + (-1) = " ]];
var n = 6;
var col = 4;
var row = 4;
var q = "résous pour l'addition"
var R = [8,-2,3,-2,-2,2,-8,-2,2,-8,8,2,6,1]
var left = 130;
if(passer < p){swal("Consignes : ", "Clique dans la case à côté du calcul et tapes-y ta réponse à l'aide du clavier. Si tu t’es trompé, tu peux effacer la réponse et en mettre une autre.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_resous_addition(Q, R, q, n,col,row, 7, left);}
if(passer > p){nettoyer_resous_addition();}

}
function reference_question7(p){
    if(passer < p){swal("Consignes : ", "Pour chaque opération de la colonne de gauche, clique sur le petit point et glisse ton trait jusqu’à la phrase correspondante de la colonne de droite. Si tu penses t’être trompé, tu peux changer ton trait en répétant la même opération, mais cette fois avec la bonne phrase de la colonne de droite ! ");
} 
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_connect_multiple();}
    if(passer > p){ nettoyer_connect_multiple(); }
}

function reference_question8(p){
    if(passer < p){swal("Consignes : ", "Clique dans la case et entre ta réponse à l’aide du clavier. Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

interval_parasite1();
document.getElementById("titreQuestions").style.display = "none";
 if(passer > p){nettoyer_parasite1();}
}

function reference_question9(p){
    var Q = [[" 5 . (-2) = ","(-5) x (-3) =","  (4) x (-2) =  ","(5) . (6) = "],["(-4) x (5) = "," (3) x (6) = ","(-4) . (3) = "," (-4) . (-2) = "],["(4) . (-3) . (-2) = ","(-5) . (-2) . (-2) = " ]];
    var n = 9;
    var col = 4;
    var row = 3;
    var q = "résous pour la multiplication"
    var R = [-10,15,-8,30,-20,18,-12,8,24,-20];
    var left = 150;
    if(passer < p){swal("Consignes : ", " Clique dans la case à côté du calcul et tapes-y ta réponse à l'aide du clavier. Si tu t’es trompé, tu peux effacer la réponse et en mettre une autre.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").style.display = "initial";
document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_resous_addition(Q, R, q, n,col,row, 10, left);}
    if(passer > p){nettoyer_resous_addition();}
}
function reference_question10(p){
    var col1 = 2;
    var col2 = 4;
    Q = [["- (4 + 7)", "- (-4 - 7)" ],["4 + 7","4 – 7", "-4 + 7", "-4 – 7"]]
    R = [[4,1],[1,2,3,4]];
    q = "connect the dots";
    var n = 10;
    if(passer < p){swal("Consignes : ", " Pour chaque opération avec parenthèse de la colonne de gauche, clique sur le petit point et glisse ton trait jusqu’à l’opération sans parenthèse correspondante de la colonne de droite. Si tu penses t’être trompé, tu peux changer ton trait en répétant la même action, mais cette fois avec la bonne opération sans parenthèse de la colonne de droite !");    
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_connect_the_dots(Q, R, q, col1, col2, n);}
    if(passer > p){nettoyer_connect_the_dots(); }
}
function reference_question11(p){
    if(passer < p){swal("Consignes : ", "Clique sur la couleur avec laquelle tu désires entourer le nombre et clique ensuite sur le nombre pour l’entourer. Le bouton « enlever » permet de retirer une réponse si tu penses t’être trompé.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";

document.getElementById("titreQuestions").onload = ()=>{interval_entoure_couleurs();}
 if(passer > p){nettoyer_entoure_couleurs();}
} 

function reference_question12(p){
    if(passer < p){swal("Consignes : ", "Sélectionne la bonne réponse à l’aide des menus déroulants. Si tu penses t’être trompé, tu peux toujours recommencer et sélectionner une autre réponse.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var rep = ["O","S","N","S","O","N"];
var left =[150, 275, 530, 660, 880, 1062];
var img = "signe_multiple";
var quest = 12;
var question = "signe multiple";
var next = 13;
document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_signe_multiple(rep, left, img, quest, question, next);}
 if(passer > p){nettoyer_signe_multiple();}
} 
function reference_question13(p){
    if(passer < p){swal("Consignes : ", "Clique dans la case et tapes-y ta réponse à l'aide du clavier. Si tu t’es trompé, tu peux effacer la réponse et en mettre une autre.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_nombres_opposes();}
 if(passer > p){nettoyer_nombres_opposes();}
} 
function reference_question14(p){
    if(passer < p){swal("Consignes : ", "Clique sur le nombre, laisse le bouton de la souris enfoncé et tire le nombre au bon endroit sur la droite graduée. Lorsque tu penses l’avoir bien placée, lâche le bouton de la souris. Si tu t’es trompé, tu peux cliquer sur le nombre déjà placée sur la droite graduée pour l’effacer et pouvoir le replacer au bon endroit.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_droite_repere();}
 if(passer > p){nettoyer_droite_repere();}
} 

function reference_question15(p){
    if(passer < p){swal("Consignes : ", "Sélectionne la bonne réponse à l’aide des menus déroulants. Si tu penses t’être trompé, tu peux toujours recommencer et sélectionner une autre réponse.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var rep =["O", "S", "N", "N", "S"];
var left = [421,501,584,664,742];
var img = "signe_single";
var quest = 15;
var question = "signe single";
var next = 16;
document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_signe_multiple(rep, left, img, quest, question, next);}
if(passer > p ){nettoyer_signe_multiple();}
} 
function reference_question16(p){
    if(passer < p){swal("Consignes : ", "Clique dans la case et tapes-y ta réponse à l'aide du clavier. Si tu t’es trompé, tu peux effacer la réponse et en mettre une autre.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var img = "complete_egalite_addition";
var R = [6,-8,-3,-2,5,2,-4,-2,-6,7,3,9,-5,2];
var Q = 14;
var quest =16;
var question = "complete égalité addition";
var next = 17;
var left = [160,434,734,1018,170,448,735,1013,173,435,725,1022,340,890];
var top = [94,94,94,94,210,210,210,210,326,326,326,326,441,441];
document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_complete_egalite(img, R, Q, quest, question, next, left, top);}
 if(passer > p){nettoyer_complete_egalite();}
} 
function reference_question17(p){
    if(passer < p){swal("Consignes : ", "Clique dans la case et entre ta réponse à l’aide du clavier. Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne. ");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

    interval_soustraction_distraction();
    document.getElementById("titreQuestions").style.display = "none";
    if(passer > p){nettoyer_soustraction_distraction();}
}
function reference_question18(p){
    if(passer < p){swal("Consignes : ", "Clique dans la case et tapes-y ta réponse à l'aide du clavier. Si tu t’es trompé, tu peux effacer la réponse et en mettre une autre.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

var img = "complete_egalite_multiplication";
var R = [8,3,6,3,-5,-3,-3,-8,-3,2];
var Q = 10;
var quest =18;
var question = "complete égalité multiplication";
var next = 19;
var left = [160,439,727,1018,154,434,735,1017,332,908];
var top = [106,106,106,106,258,258,258,258,410,410];
document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_complete_egalite(img, R, Q, quest, question, next, left, top);}
document.getElementById("titreQuestions").style.display = "initial";
 if(passer > p){nettoyer_complete_egalite();}
} 
function reference_question19(p){
    if(passer < p){swal("Consignes : ", "Sélectionne le bon énoncé à l’aide du menu déroulant. Si tu penses t’être trompé, tu peux toujours recommencer et sélectionner une autre réponse. Ensuite, clique dans la case et entre ta réponse à l’aide du clavier. Si tu penses t’être trompé, tu peux toujours effacer ta réponse et réécrire la bonne.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_traduction_probleme();}

 if(passer > p){nettoyer_traduction_probleme();}
} 
function reference_question20(p){
    if(passer < p){swal("Consignes : ", " Clique sur le nombre, laisse le bouton de la souris enfoncé et tire le nombre dans la case dans laquelle tu as choisi de le placer. Lorsque tu penses l’avoir bien placé, lâche le bouton de la souris. Si tu t’es trompé, tu peux cliquer sur le nombre déjà placée sur la droite graduée pour l’effacer et pouvoir le replacer au bon endroit.");
}
if(swalRepeat == true){
    swalRepeat = false;
    return;
}

document.getElementById("titreQuestions").src ="signe moins/questions/images/titre"+p+".PNG";
document.getElementById("titreQuestions").onload = ()=>{interval_range_croissant();}
 if(passer > p){nettoyer_range_croissant();}
} 

function reference_question21(p){
    document.getElementById("titreQuestions").style.display = "none";
    document.getElementById("swalRe").style.display = "none";
    document.getElementById("espace").style.display= "initial";
    interval_graph_student();
}
//pas dans cette enquête 
//interval_drag_drop();