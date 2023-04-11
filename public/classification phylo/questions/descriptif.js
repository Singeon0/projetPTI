

var titleX_descriptif = [704,453,789,1107];
var titleY_descriptif = [772,857,857,857];
var corpsX_descriptif = [432,767,1096];
var corpsY_descriptif = [948,948,948];
var options_descriptif = ["La chouette effraie", "La truite saumonée", "Le renard roux", "Le canard colvert", "La souris commune"]
var options2_descriptif = ["Yeux et bouche", "Plumes", "Ecailles", "Poils", "Ovipares", "Vivipare", "Carnivores", "Omnivore"]
var corrA1_descriptif = [["Yeux et bouche","Plumes", "Ecailles", "Poils" ],["Ovipares", "Vivipare"],["Carnivores", "Omnivore"],[],[],[],[]]
var selectedTitle_descriptif = [false,false,false,false];
var corpsContenu_descriptif = [[],[],[]];
var crossSelected_descriptif =false;
var positionHomme_desrciptif = false;
function interval_descriptif(){
    HEIGHT = 1500;
    WIDTH = WIDTH +300;
    document.getElementById("canvas").style.height = "1500px";
    document.getElementById("body").style.height= "1700px";
    document.getElementById("canvas").style.width = "1500px";
    document.getElementById("canvas").style.left = "6%";
    document.getElementById("espace").textContent = "Test sur la phylogénétique"
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById('next_arrow').style.left = "107rem";
    document.getElementById("next_arrow").onclick = score_descriptif;
    document.getElementById("canvas").setAttribute("ondrop","drop_descriptif(event)" );
    document.getElementById("canvas").setAttribute("ondragover","allowDrop_descriptif(event)" );
    document.getElementById("canv").addEventListener("click",selectHuman_descriptif )
      document.body.addEventListener('drop', drop, true)
   //nécessaire sur firefox de désactiver l'action par défaut sinon il redirige la page vers l'image quand on la drop
function drop(e){
    if(e.preventDefault) { e.preventDefault(); }
 
}
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_descriptif();
    for(let i = 0; i < options_descriptif.length;i++){
        createLabel_descriptif(options_descriptif[i], i);
    }
    for(let i = options_descriptif.length; i < options2_descriptif.length+options_descriptif.length;i++){
        createLabel_descriptif(options2_descriptif[i-options_descriptif.length], i);
    }
    createLabel_descriptif("Homme", 13);
    document.getElementById('descriptif_label13').style.left = "40rem";
    document.getElementById('descriptif_label13').style.top = "83rem";
    document.getElementById('descriptif_label13').style.display = "none";
   
}
function drawImage_descriptif(){
    var formes_image = document.getElementById("descriptif_img");
    ctx.drawImage(formes_image, 325, 25, 1150, 1300);
    for(let i = 0; i<3;i++){
        ctx.fillStyle = COLOR_BOARD;
        ctx.fillRect(464+(i*332), 865, 230, 80);
    }
    ctx.fillStyle = COLOR_BOARD;
    ctx.fillRect(712, 782, 390, 40);
}
function createLabel_descriptif(e, i){
    var drag1;
    drag1 = document.createElement("label");
    drag1.setAttribute("id","descriptif_label"+i);
    drag1.style.top = (42+i*3.5)+"rem";
    drag1.style.fontSize = "1.2rem";
    drag1.style.marginLeft = "1.5rem";
    drag1.textContent = e;
    drag1.setAttribute("class", "drag");
    drag1.setAttribute("draggable", "true");
    drag1.setAttribute("ondragstart","drag_descriptif(event)");
    document.getElementById("canvas").appendChild(drag1);
}
function drag_descriptif(ev){
    ev.dataTransfer.setData("text", ev.target.id);
}
function allowDrop_descriptif(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    for(let i = 0; i < titleX_descriptif.length; i++){
        if (i === 0 ){
            if(x > titleX_descriptif[i] && x < titleX_descriptif[i]+400 ){
                if(y > titleY_descriptif[i] && y < titleY_descriptif[i]+50 ){
                    ev.preventDefault();
                }
            }
        }
        else{
            if(x > titleX_descriptif[i] && x < titleX_descriptif[i]+260 ){
                if(y > titleY_descriptif[i] && y < titleY_descriptif[i]+90 ){
                    ev.preventDefault();
                }
            }
        }
       
    }
    for(let i = 0; i < corpsX_descriptif.length; i++){
        if(x > corpsX_descriptif[i] && x < corpsX_descriptif[i]+300 ){
            if(y > corpsY_descriptif[i]+15 && y < corpsY_descriptif[i]+210 ){
                ev.preventDefault();
            }
        }
    }
    }

function drop_descriptif(ev){
    var data = ev.dataTransfer.getData("text");
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    for(let i = 0; i < titleX_descriptif.length; i++){
    if (i === 0 ){
        if(x > titleX_descriptif[i] && x < titleX_descriptif[i]+400 ){
            if(y > titleY_descriptif[i] && y < titleY_descriptif[i]+50 ){
                if(data == "descriptif_label13"){return;}
                if( selectedTitle_descriptif[i] != false){
                    document.getElementById(selectedTitle_descriptif[i]).style.display = "block";
                }
                selectedTitle_descriptif[i] = data;
            }
        }
    }
    else{
        if(x > titleX_descriptif[i] && x < titleX_descriptif[i]+260 ){
            if(y > titleY_descriptif[i] && y < titleY_descriptif[i]+90 ){
                if(data == "descriptif_label13"){return;}

                if( selectedTitle_descriptif[i] != false){
                    document.getElementById(selectedTitle_descriptif[i]).style.display = "block";
                }
                selectedTitle_descriptif[i] = data;
            }
        }
    }
}
    for(let i = 0; i < corpsX_descriptif.length; i++){
        if(x > corpsX_descriptif[i] && x < corpsX_descriptif[i]+300 ){
            if(y > corpsY_descriptif[i]+15 && y < corpsY_descriptif[i]+210 ){
                if( corpsContenu_descriptif[i].length >= 5){return;}
                corpsContenu_descriptif[i].push(data)
                if(data == "descriptif_label13"){positionHomme_desrciptif = i;}
            }
        }
    }


   
        document.getElementById(data).style.display = "none";
        DrawAll_descriptif();
}

function drawText_descriptif(text, x, y, color, size){
    ctx.fillStyle = color;
    ctx.font = size*2 + "px dejavu sans mono";
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
} 
function DrawAll_descriptif(){
    drawImage_descriptif();
    for(let i =0; i < selectedTitle_descriptif.length; i++){
        if(selectedTitle_descriptif[i] !== false){
            var decalageY = 35;
            var decalageX = 200;
            if (i !== 0){
                decalageY = 50;
                decalageX = 130;
            }
            drawText_descriptif(document.getElementById(selectedTitle_descriptif[i]).textContent,titleX_descriptif[i]+ decalageX, titleY_descriptif[i]+decalageY, "blue", 15);
        }
    }
    for (var i = 0; i < corpsContenu_descriptif.length; i++){
        for (var j = 0; j < corpsContenu_descriptif[i].length; j++){
            var decalageY = 38;
            var decalageX = 145;
            drawText_descriptif(document.getElementById(corpsContenu_descriptif[i][j]).textContent,corpsX_descriptif[i]+ decalageX, corpsY_descriptif[i]+decalageY*(j+1), "blue", 15);

        }
    }
    if (crossSelected_descriptif !== false){
        drawcross_descriptif(966+(crossSelected_descriptif*95  ), 1238)
    }
}
function selectHuman_descriptif(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
      x = parseInt(ev.pageX - offsetX)-35;
      y = parseInt(ev.pageY - offsetY) - 20;
      for(let i = 0; i < 2; i++){
          if(x > 966-20+(94*i) && x < 966+20+(94*i) ){
              if(y > 1238 -20 && y < 1238 +20){
                crossSelected_descriptif = i;
                if(i == 0){
                    document.getElementById('descriptif_label13').style.display = "block";
                }
                else {
                    document.getElementById('descriptif_label13').style.display = "none";
                    if(positionHomme_desrciptif !== false){
                     corpsContenu_descriptif[positionHomme_desrciptif].splice(corpsContenu_descriptif[positionHomme_desrciptif].indexOf("descriptif_label13"),1);
                    positionHomme_desrciptif = false;
                    }
                   
                }
                  drawBoard();
                  drawImage_descriptif();
               
              }
          }
      }
      for(let i = 0; i < titleX_descriptif.length; i++){
        if (i === 0 ){
            if(x > titleX_descriptif[i] && x < titleX_descriptif[i]+400 ){
                if(y > titleY_descriptif[i] && y < titleY_descriptif[i]+50 ){
                    if( selectedTitle_descriptif[i] != false){
                        document.getElementById(selectedTitle_descriptif[i]).style.display = "block";
                    }
                    selectedTitle_descriptif[i] = false;
                }
            }
        }
        else{
            if(x > titleX_descriptif[i] && x < titleX_descriptif[i]+260 ){
                if(y > titleY_descriptif[i] && y < titleY_descriptif[i]+90 ){
                    if( selectedTitle_descriptif[i] != false){
                        document.getElementById(selectedTitle_descriptif[i]).style.display = "block";
                    }
                    selectedTitle_descriptif[i] = false;
                }
            }
        }
    }
      for(let i = 0; i < corpsX_descriptif.length; i++){
        if(x > corpsX_descriptif[i] && x < corpsX_descriptif[i]+300 ){
            if(y > corpsY_descriptif[i]+15 && y < corpsY_descriptif[i]+210 ){
             for(let k = 0; k <corpsContenu_descriptif[i].length; k ++ ){
                document.getElementById( corpsContenu_descriptif[i][k]).style.display = "block";
                if( corpsContenu_descriptif[i][k] =="descriptif_label13" ){positionHomme_desrciptif = false;}
             }
             corpsContenu_descriptif[i] = [];
            }
            DrawAll_descriptif();
        }
    }
    
}
function drawcross_descriptif(x, y){
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 4;
    ctx.beginPath();
     ctx.moveTo(x-10, y-10);
     ctx.lineTo(x+10, y+10);
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(x+10, y-10);
     ctx.lineTo(x-10, y+10);
     ctx.stroke();
}
function score_descriptif(){
    var temp1 = 0;
    var scorePouritem7A9 = 0;
    //Item 7.A.1 (titre pas pris en compte)
    const setOfTitle = new Set(); 
    for (var i =1;i < selectedTitle_descriptif.length; i++){
        if(selectedTitle_descriptif[i] !== false){
            const numero = parseInt(selectedTitle_descriptif[i].substr(16));
            // 1 = caractéristique physique, 2 = mode de reproduction, 3 = régime alimentaire
            if (numero > 4   && numero < 9 ){
                setOfTitle.add(1);
            }
           if(numero > 8   && numero < 11){
            setOfTitle.add(2);
           }
           if(numero > 10 && numero <13){
            setOfTitle.add(3);
           }
           
        }
   
    }
   var score7A1 = correction7A1_descriptif(setOfTitle);
 const scoreToScore = [1,"0A","0B","0C","0D","0E","0F"];
 if(score7A1 === false){
score7A1 = 9;
 }else{
    score7A1 = scoreToScore[score7A1];
 }
 if(score7A1 ==1){
    scorePouritem7A9++;
 }
 sendData(score7A1, "descriptif", 7, 1);

 // item 7.A.1.1 (résidu des test versions papier, pas utile pour les test version informatique)
 sendData(9, "descriptif", 7, 2);
// item 7.A.2  (titre pas pris en compte)
   setOfTitle.clear();
   for (var i = 1; i < selectedTitle_descriptif.length; i++){
    if(selectedTitle_descriptif[i] !== false){
        setOfTitle.add(parseInt(selectedTitle_descriptif[i].substr(16)));
    }
}
const score7A2 = correction7A2_descriptif(setOfTitle);
if(score7A2 == 1){
    scorePouritem7A9 ++;
}
 sendData(score7A2, "descriptif", 7, 3);

//item 7.B.1-4
scorePouritem7A9= scorePouritem7A9 +correction7B1_descriptif(5,4);
scorePouritem7A9= scorePouritem7A9 + correction7B234_descriptif(6,5);
scorePouritem7A9= scorePouritem7A9 + correction7B234_descriptif(7,6);
scorePouritem7A9= scorePouritem7A9 + correction7B234_descriptif(8,7);
// item 7.A.3
const score7A3 =  correction7A3_descriptif();
if (score7A3 == 1){
    scorePouritem7A9 ++;
}
// item 7.A.3.1 (résidu des test versions papier, pas utile pour les test version informatique)
 sendData(9, "descriptif", 7, 9);
//item 7.A.4-8
    //poils
    scorePouritem7A9= scorePouritem7A9 + correction7A48_descriptif(2,12,"descriptif_label8");
    scorePouritem7A9= scorePouritem7A9 + correction7A48_descriptif(4,14,"descriptif_label8");
    //plumes
    scorePouritem7A9= scorePouritem7A9 + correction7A48_descriptif(0,10,"descriptif_label6");
    scorePouritem7A9= scorePouritem7A9 + correction7A48_descriptif(3,13,"descriptif_label6");
    
    //écailles
    scorePouritem7A9= scorePouritem7A9 + correction7A48_descriptif(1,11,"descriptif_label7");
    
// item 7.A.9
    correction7A9_descriptif(scorePouritem7A9,score7A1,score7A2,score7A3);
// item 7.A.9.1 (résidu des test versions papier, pas utile pour les test version informatique)
    sendData(9, "descriptif", 7, 16);

// item 7.C.1
if(crossSelected_descriptif === 0){
      sendData(1, "descriptif", 7, 17);
}

if(crossSelected_descriptif === 1){
    sendData(0, "descriptif", 7, 17);
}
if(crossSelected_descriptif === false){
    sendData(9, "descriptif", 7, 17);
}

// item 7.C.2
if(crossSelected_descriptif === 0 && document.getElementById('descriptif_label13').style.display == "none"){
    correction7C2();
}else{
      sendData(9, "descriptif", 7, 18);
}

nettoyer_descriptif();
}

function correction7A1_descriptif(setOfTitle){
    if(setOfTitle.size == 0){
        return false;
    }
    const set1 = new Set([1]);
    const set2 = new Set([2]);
    const set3 = new Set([3]);
    const set4 = new Set([1,2,3]);
    const set5 = new Set([1,2]);
    const set6 = new Set([1,3]);
    const set7 = new Set([2,3]);
   const arrayOfSet = [set1, set2,set3,set4,set5,set6,set7]
for (var i = 0; i < arrayOfSet.length; i++){
    const tempSet = new Set([...setOfTitle,...arrayOfSet[i]]);
    if(tempSet.size == arrayOfSet[i].size && arrayOfSet[i].size == setOfTitle.size) {
        return i;
    }
}
return false
}


function correction7A2_descriptif(setOfTitle){
    if(setOfTitle.size == 0){
        return 9;
    }
    if(setOfTitle.has(0)||setOfTitle.has(1) || setOfTitle.has(2) || setOfTitle.has(3)||setOfTitle.has(4)||setOfTitle.has(13)){
        return "0D";
    }
    var tempAttributsDansLesEtiquettes = 0
if(setOfTitle.has(5)) tempAttributsDansLesEtiquettes++;
if(setOfTitle.has(6) )tempAttributsDansLesEtiquettes++;
if(setOfTitle.has(7) )tempAttributsDansLesEtiquettes++;
if(setOfTitle.has(8) )tempAttributsDansLesEtiquettes++;
if(tempAttributsDansLesEtiquettes == 3){
    return 1;
}
if(setOfTitle.has(9) && setOfTitle.has(10)){
    return "0A";
}
if(setOfTitle.has(11) && setOfTitle.has(12)){
    return "0B";
}
return 9
}
function correction7B1_descriptif( valeur,i){
    if(document.getElementById("descriptif_label5").style.display !== "none" ){
        sendData(9, "descriptif", 7, i);
        return 0;
    }
    if(selectedTitle_descriptif[0] !== false && parseInt(selectedTitle_descriptif[0].substr(16)) == valeur ){
        sendData(1, "descriptif", 7, i);
        return 1;
    }
    sendData(0, "descriptif", 7, i);
    return 0;
}
function correction7B234_descriptif(valeur,i){
    if(document.getElementById("descriptif_label"+(valeur)).style.display !== "none"){
        sendData(9, "descriptif", 7, i);
        return 0;
    }
    for (var k = 1; k < 4; k++){
           if(selectedTitle_descriptif[k] !== false && parseInt(selectedTitle_descriptif[k].substr(16)) == valeur ){
        sendData(1, "descriptif", 7, i);
        return 1;
    }
    }
    sendData(0, "descriptif", 7, i);
    return 0 ;
}
function correction7A48_descriptif(valeur,i,title){
    if(document.getElementById("descriptif_label"+(valeur)).style.display !== "none"){
        sendData(9, "descriptif", 7, i);
        return 0;
    }
    for (var k = 0; k < 3; k++){
        for (var j = 0; j < corpsContenu_descriptif[k].length; j++){
            if(corpsContenu_descriptif[k][j] =="descriptif_label"+valeur && selectedTitle_descriptif[k+1] == title){
                sendData(1, "descriptif", 7, i);
                return 1;
            }
        } 
    }
    sendData(0, "descriptif", 7, i);
    return 0;
}
function correction7A3_descriptif(){
    var TitreCaracteristiquePhysique = [];
    var TitreModeReproduction = [];
    var TitreRegimeAlimentaire = [];
    if(corpsContenu_descriptif[0].length ==0 && corpsContenu_descriptif[1].length ==0 && corpsContenu_descriptif[2].length ==0 ){
        sendData(9, "descriptif", 7,8 );
        return 0;
    }
for(var i = 1; i < 4; i++){
    if(selectedTitle_descriptif[i] !== false ){
        switch(parseInt(selectedTitle_descriptif[i].substr(16))){
            case 6:TitreCaracteristiquePhysique.push([i-1,0]);break;
            case 7 :TitreCaracteristiquePhysique.push([i-1,1]);break;
            case 8 :TitreCaracteristiquePhysique.push([i-1,2]);break;
            case 9 :TitreModeReproduction.push([i-1,0]);break;
            case 10 :TitreModeReproduction.push([i-1,1]);break;
            case 11 : TitreRegimeAlimentaire.push([i-1,0]);break;
            case 12 :TitreRegimeAlimentaire.push([i-1,1]);break;
          }
    }
}

//test caractéristiques physiques
if(TitreCaracteristiquePhysique.length > 0){
var scoreBonRemplissageDuCorps = 0;
const CorrectionCOrpsPourCaracteristiquePhysique= [[0,3],[1],[2,4]]; //poils puis plumes puis ecailles
for (var i = 0; i <TitreCaracteristiquePhysique.length; i++ ){
var colonneCorps = TitreCaracteristiquePhysique[i][0];
var scoreCorpsActuel = 0;
    for(var j = 0; j < CorrectionCOrpsPourCaracteristiquePhysique[i].length;j++){
        if(corpsContenu_descriptif[colonneCorps].includes("descriptif_label"+CorrectionCOrpsPourCaracteristiquePhysique[i][j])) scoreCorpsActuel++;
    }

    if(scoreCorpsActuel ==CorrectionCOrpsPourCaracteristiquePhysique[i].length)scoreBonRemplissageDuCorps++;
}
switch(scoreBonRemplissageDuCorps){
    case 0: sendData("0D", "descriptif", 7,8 );
    break;
    case 1 : sendData("1B", "descriptif", 7,8 );
    return "1B";
    break;
    case 2 : sendData("1A", "descriptif", 7,8 );
    return "1A";
    break;
    case 3 : sendData(1, "descriptif", 7,8 );
    return 1;
    break;
}
 
return 0
}
//test mode de reproduction

if(TitreModeReproduction.length == 2){
    var scoreBonRemplissageDuCorps = 0;
    const CorrectionCOrpsPourModeReproduction= [[0,1,3],[2,4]]; //poils puis plumes puis ecailles
    for (var i = 0; i <TitreModeReproduction.length; i++ ){
    var colonneCorps = TitreModeReproduction[i][0];
    var scoreCorpsActuel = 0;
        for(var j = 0; j < CorrectionCOrpsPourModeReproduction[i].length;j++){
            if(corpsContenu_descriptif[colonneCorps].includes("descriptif_label"+CorrectionCOrpsPourModeReproduction[i][j])) scoreCorpsActuel++;
        }
        if(scoreCorpsActuel ==CorrectionCOrpsPourModeReproduction[i].length)scoreBonRemplissageDuCorps++;
    }
    if(scoreBonRemplissageDuCorps == 2){
        sendData("0A", "descriptif", 7,8 );
        return "0A";
    }
    else{
         sendData("0D", "descriptif", 7,8 );
    }
     
    return 0;
    }

//test mode du regime alimentaire

if(TitreRegimeAlimentaire.length == 2){
    var scoreBonRemplissageDuCorps = 0;
    const CorrectionCOrpsPourModeReproduction= [[0,1],[2,3,4]]; //poils puis plumes puis ecailles
    for (var i = 0; i <TitreRegimeAlimentaire.length; i++ ){
    var colonneCorps = TitreRegimeAlimentaire[i][0];
    var scoreCorpsActuel = 0;
        for(var j = 0; j < CorrectionCOrpsPourModeReproduction[i].length;j++){
            if(corpsContenu_descriptif[colonneCorps].includes("descriptif_label"+CorrectionCOrpsPourModeReproduction[i][j])) scoreCorpsActuel++;
        }
        if(scoreCorpsActuel ==CorrectionCOrpsPourModeReproduction[i].length)scoreBonRemplissageDuCorps++;
    }
    if(scoreBonRemplissageDuCorps == 2){
        sendData("0B", "descriptif", 7,8 );
        return "0B";
    }  else{
        sendData("0D", "descriptif", 7,8 );
   }
     
    return 0;
    }
}
function correction7A9_descriptif(score,score7A1,score7A2,score7A3){
    if (score == 12){
          sendData(1, "descriptif", 7,15 )
          return;
    }
    if(score7A1 == "0A"&&score7A2 == "0A"&&score7A3 == "0A"){
         sendData("1A", "descriptif", 7,15 )
         return;
    }
    if(score7A1 == "0B"&& score7A2 == "0B"&& score7A3 == "0B"){
        sendData("1B", "descriptif", 7,15 )
        return;
   }
    sendData(9, "descriptif", 7,15 )
    return;
}
function correction7C2(){
    const correctionPositionHomme = [8,10,12];
    if( selectedTitle_descriptif[positionHomme_desrciptif+1] !== false && correctionPositionHomme.includes(parseInt(selectedTitle_descriptif[positionHomme_desrciptif+1].substr(16)))){
         sendData(1, "descriptif", 7,18 )
    }else{
         sendData(0, "descriptif", 7,15 )
    }
}
function nettoyer_descriptif(){
    WIDTH = WIDTH -300;
    document.getElementById("canvas").style.width = "1200px";
    document.getElementById("canvas").style.left = "16%";
    document.getElementById('next_arrow').style.left = "100rem";
    for (var i = 0; i < 14; i++){
        document.getElementById('descriptif_label'+i).parentNode.removeChild( document.getElementById('descriptif_label'+i));
    }
    document.getElementById("canv").removeEventListener("click",selectHuman_descriptif )
    drawBoard();
    reference_liste(8);
}