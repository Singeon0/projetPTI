var label_attributs = [false,false,false,false,false,false,false,false,false];
var coord_attributs = [[290,842,300],[750,842,300],[290,901,300],[704,904,190],[904,904,190],[234,975,210],[457,975,210],[290,1155,300],[750,1096,300]];
var options_attributs = ["8 pattes articulées","Squelette externe","Plumes","4 membres","Squelette interne","6 pattes articulées","Nageoire à rayons","Corps mou avec coquille","Poils et mamelles"];
var cross_attributs = [false,false];
var temp_attributs;
var human_attributs = [false,false,false,false,false,false];
var rep_attributs = ["Squelette interne","Squelette externe","4 membres","6 pattes articulées","8 pattes articulées","Poils et mamelles","Plumes","Nageoire à rayons","Corps mou avec coquille",];
var coordBox_attributs = [[506,1018,190,100],[739,1018,190,100],[980,940,170,100],[1177,947,170,100],[510,1196,400,50],[985,1132,380,120]];
function interval_attributs(){
    HEIGHT = 1500;
    WIDTH = WIDTH +300;
    document.getElementById("canvas").style.height = "1500px";
    document.getElementById("body").style.height= "1800px";
    document.getElementById("canvas").style.width = "1500px";
    document.getElementById("canvas").style.left = "5%";
    document.getElementById("espace").textContent = "Test sur la phylogénétique"
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.getElementById('next_arrow').style.left = "105rem";
    document.getElementById("next_arrow").onclick = score_attributs;
    document.getElementById("canv").addEventListener("click",selectHuman_attributs );
    document.getElementById("canv").addEventListener("click",removeOption_attributs );
    document.getElementById("canvas").setAttribute("ondrop","drop_attributs(event)" );
    document.getElementById("canvas").setAttribute("ondragover","allowDrop_attributs(event)" );
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawImage_attributs();
    document.body.addEventListener('drop', drop, true)
    //nécessaire sur firefox de désactiver l'action par défaut sinon il redirige la page vers l'image quand on la drop
 function drop(e){
     if(e.preventDefault) { e.preventDefault(); }
  
 }
 for(let i =0; i< options_attributs.length;i++){
    createLabel_attributs(options_attributs[i],i);
    coord_attributs[i][0] = coord_attributs[i][0] + 300;
    coord_attributs[i][1] = coord_attributs[i][1] -10;
 }
 var drag1;
 drag1 = document.createElement("label");
 drag1.setAttribute("id","attributs_label"+options_attributs.length);
 drag1.style.top = 90+"rem";
 drag1.style.left = 62+"rem";
 drag1.style.fontSize = "1rem";
 drag1.style.marginLeft = "1.5rem";
 drag1.textContent = "homme";
 drag1.setAttribute("class", "drag");
 drag1.setAttribute("draggable", "true");
 drag1.setAttribute("ondragstart","drag_attributs(event)");
 document.getElementById("canvas").appendChild(drag1);
}
function drawImage_attributs(){
    var formes_image = document.getElementById("attributs_img");
    ctx.drawImage(formes_image, 325, 25, 1150, 1450);
}
function createLabel_attributs(e, i){
    var drag1;
    drag1 = document.createElement("label");
    drag1.setAttribute("id","attributs_label"+i);
    drag1.style.top = (45+i*4)+"rem";
    drag1.style.fontSize = "0.95rem";
    drag1.style.marginLeft = "1.5rem";
    drag1.textContent = e;
    drag1.setAttribute("class", "drag");
    drag1.setAttribute("draggable", "true");
    drag1.setAttribute("ondragstart","drag_attributs(event)");
    document.getElementById("canvas").appendChild(drag1);
}
function drag_attributs(ev){
    ev.dataTransfer.setData("text", ev.target.id);
    temp_attributs = ev.target.id;
}
function allowDrop_attributs(ev){
    var data = ev.dataTransfer.getData("text");
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    for(let i =0; i< label_attributs.length; i++){
        if(x > coord_attributs[i][0] && x < coord_attributs[i][0]+coord_attributs[i][2] && temp_attributs !=("attributs_label"+options_attributs.length) ){
            if(y > coord_attributs[i][1] && y < coord_attributs[i][1]+64 ){
                ev.preventDefault();
            }
        }
    }
    for(let i =0; i < coordBox_attributs.length; i++){
        if(x > coordBox_attributs[i][0] && x < coordBox_attributs[i][0]+coordBox_attributs[i][2] && temp_attributs ==("attributs_label"+options_attributs.length) ){
            if(y > coordBox_attributs[i][1] && y < coordBox_attributs[i][1]+coordBox_attributs[i][3] ){
                ev.preventDefault();
            }
        }
    }
}
function drop_attributs(ev){
    var data = ev.dataTransfer.getData("text");
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    for(let i =0; i< label_attributs.length; i++){
        if(x > coord_attributs[i][0] && x < coord_attributs[i][0]+coord_attributs[i][2] &&  temp_attributs !=("attributs_label"+options_attributs.length)){
            if(y > coord_attributs[i][1] && y < coord_attributs[i][1]+64 ){
                var temp = data.slice(15,16);
                temp = parseInt(temp);
                label_attributs[i]=temp;
            }
        }
    }
    for(let i =0; i < coordBox_attributs.length; i++){
        if(x > coordBox_attributs[i][0] && x < coordBox_attributs[i][0]+coordBox_attributs[i][2] && temp_attributs ==("attributs_label"+options_attributs.length) ){
            if(y > coordBox_attributs[i][1] && y < coordBox_attributs[i][1]+coordBox_attributs[i][3] ){
                human_attributs[i] = [x,y];
            }
        }
    }
    drawBoard();
    drawImage_attributs();
        drawLabel_attributs();
        drawcross_attributs(cross_attributs[0],cross_attributs[1]);
}
function drawLabel_attributs(){
    for(let i =0; i< label_attributs.length;i++){
        if(label_attributs[i] !== false){
            drawText_attributs(options_attributs[label_attributs[i]],coord_attributs[i][0],coord_attributs[i][1], "white",15,i);
        }
    }
    for(let i = 0; i < human_attributs.length;i++){
        if(human_attributs[i] !==false){
            drawText_attributs("homme",human_attributs[i][0],human_attributs[i][1], "white",15,i);
        }
    }
}
function drawText_attributs(text, x, y, color, size,i){
    if(text == "homme"){
        var width = document.getElementById("attributs_label"+9).offsetWidth;
        ctx.fillStyle = "#00abcc";
        ctx.fillRect(x-15, y-5, width, 35);
        ctx.fillStyle = color;
        ctx.font = size + "px Andika, Arial";
        ctx.textTransform = "uppercase";
        text = text.toUpperCase();
        ctx.fillText(text, x-5, y+20);
    }else{
    var width = document.getElementById("attributs_label"+label_attributs[i]).offsetWidth;
    ctx.fillStyle = "#00abcc";
    ctx.fillRect(x+(coord_attributs[i][2]/3-width/2), y+7, width, 35);
    ctx.fillStyle = color;
    ctx.font = size + "px Andika, Arial";
    ctx.textTransform = "uppercase";
    text = text.toUpperCase();
    ctx.fillText(text, x+(coord_attributs[i][2]/3-width/2)+10, y+30);
    }

} 
function selectHuman_attributs(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
      x = parseInt(ev.pageX - offsetX)-35;
      y = parseInt(ev.pageY - offsetY) - 20;
      for(let i = 0; i < 2; i++){
          if(x > 961-20+(93*i) &&x < 961+20+(93*i) ){
              if(y > 1374 -20 && y < 1374 +20){
                  cross_attributs = [961+(i*93),1374];
                  drawBoard();
                  drawImage_attributs();
                drawcross_attributs(961+(i*93), 1374)
                drawLabel_attributs();  
              }
          }
      }
}
function drawcross_attributs(x, y){
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
function removeOption_attributs(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    for(let i =0; i< label_attributs.length; i++){
        if(x > coord_attributs[i][0] && x < coord_attributs[i][0]+coord_attributs[i][2] ){
            if(y > coord_attributs[i][1] && y < coord_attributs[i][1]+64 ){
                label_attributs[i] = false;
                drawImage_attributs();
                drawLabel_attributs();
                drawcross_attributs(cross_attributs[0],cross_attributs[1]);
            }
        }
    }
    for(let i =0; i < coordBox_attributs.length; i++){
        if(x > coordBox_attributs[i][0] && x < coordBox_attributs[i][0]+coordBox_attributs[i][2]){
            if(y > coordBox_attributs[i][1] && y < coordBox_attributs[i][1]+coordBox_attributs[i][3] ){
               human_attributs[i] = false;  
                drawImage_attributs();
                drawLabel_attributs();
                drawcross_attributs(cross_attributs[0],cross_attributs[1]);
            }
        }
    }
}
function score_attributs(){

 // item 11.A
 var score = 0;
for(let i =0; i < coord_attributs.length; i++){
    if(label_attributs[i] === false){
        sendData(9,"attributs",11,(i+1)*2-1);
    }else{
        if(document.getElementById("attributs_label"+label_attributs[i]).textContent  === rep_attributs[i]){
            sendData(1,"attributs",11,(i+1)*2-1);
            ++score;
        }
       else{
            sendData(0,"attributs",11,(i+1)*2-1);
        }
    }
    sendData(9,"attributs",11,(i+1)*2);
}
if(score == coord_attributs.length){
    sendData(1,"attributs",11,((coord_attributs.length * 2)+1));
}else{
    sendData(0,"attributs",11,((coord_attributs.length * 2)+1));
}

// item 11.B
if(cross_attributs[0] == 961){
    sendData(1,"attributs",11,((coord_attributs.length * 2)+2));
}else{
    if(cross_attributs[0] == 961+93){
        sendData(0,"attributs",11,((coord_attributs.length * 2)+2));
    }else{
        sendData(9,"attributs",11,((coord_attributs.length * 2)+2));
    }
   
}
if(human_attributs[0] !== false){
    sendData(1,"attributs",11,((coord_attributs.length * 2)+3));
}else{
   var temp = 0;
   
for(let i =0; i< human_attributs.length;i++){
if(human_attributs[i] === false){
    ++temp;
}
}

if(temp == human_attributs.length){
    sendData(9,"attributs",11,((coord_attributs.length * 2)+3));
}else{
    sendData(0,"attributs",11,((coord_attributs.length * 2)+3));
}
}
nettoyer_attributs();
}


function nettoyer_attributs(){
for(let i=0; i< label_attributs.length+1;i++){
    document.getElementById("attributs_label"+i).parentNode.removeChild(document.getElementById("attributs_label"+i))
}
    WIDTH = WIDTH -300;
document.getElementById("canvas").style.width = WIDTH + "px";
document.getElementById("canvas").style.left = "16%";
document.getElementById('next_arrow').style.left = "100rem";
drawBoard();
reference_liste(12);
document.getElementById("canv").removeEventListener("click",selectHuman_attributs );
document.getElementById("canv").removeEventListener("click",removeOption_attributs );
}