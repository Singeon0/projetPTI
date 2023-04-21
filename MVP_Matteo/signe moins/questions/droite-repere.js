var text_droite_repere = [];
var shiftX, shiftY;
function interval_droite_repere(){

    document.getElementById("next_arrow").onclick = score_droite_repere;
    document.getElementById("espace").textContent = "Place les nombre -3, -7 et 4 sur cette droite graduée munie d'un repère";
    document.getElementById("canvas").setAttribute("ondrop","drop_droite_repere(event)" );
    document.getElementById("canvas").setAttribute("ondragover","allowDrop_droite_repere(event)" );
    canv.addEventListener("click", click_droite_repere);
    document.body.addEventListener('drop', drop, true)
    drawDroite_droit_repere();
    createLabel_droite_repere(-3, 0);
    createLabel_droite_repere(-7, 1);
    createLabel_droite_repere(4, 2);
   //nécessaire sur firefox de désactiver l'action par défaut sinon il redirige la page vers l'image quand on la drop
function drop(e){
    if(e.preventDefault) { e.preventDefault(); }
 
}
    }
function drawDroite_droit_repere(){
    var droite_repere_img = document.getElementById("droite_repere");
    ctx.drawImage(droite_repere_img, 25, 150, 1150, 200);
}

    function createLabel_droite_repere(e, i){
        var drag1 = e;
        drag1 = document.createElement("IMG");
        drag1.src = "signe moins/questions/images/drag"+(i+3)+".PNG";
        drag1.setAttribute("id","droite_grad_label"+i);
        drag1.textContent = e;
        drag1.style.position = "relative";
        drag1.setAttribute("draggable", "true");
        drag1.setAttribute("ondragstart","drag_droite_repere(event)");
        document.getElementById("canvas").appendChild(drag1);
        document.getElementById("droite_grad_label"+i).style.bottom = "8rem";
        document.getElementById("droite_grad_label"+i).style.fontSize = "2rem";
        document.getElementById("droite_grad_label"+i).style.marginLeft = "2rem";
    }

    function drop_droite_repere(ev){
        var data = ev.dataTransfer.getData("text");

        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var x = parseInt(ev.pageX - offsetX)-35;
        var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;
        var X = parseInt(x);
        var Y = parseInt(y); 
    
        drawText_droite_repere(document.getElementById(data).textContent, x - shiftX, y - shiftY, "black", TEXT_SIZE_CELL*3);
            document.getElementById(data).style.display = "none";
            text_droite_repere.push([document.getElementById(data).textContent, x - shiftX, y - shiftY, data]);
    }
    function allowDrop_droite_repere(ev){
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var x = parseInt(ev.pageX - offsetX)-35;
        var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;
        var X = parseInt(x);
        var Y = parseInt(y); 
     
        if( 120<y && y<320){
        ev.preventDefault();
        }
    }
    function click_droite_repere(ev){
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var x = parseInt(ev.pageX - offsetX)-35;
        var y = parseInt(ev.pageY - offsetY) - 20-document.getElementById("titreQuestions").height;
        var X = parseInt(x);
        var Y = parseInt(y); 
    for(let i =0; i<text_droite_repere.length; i++){
        if(x <text_droite_repere[i][1]+20 && x >text_droite_repere[i][1]-30){
            if(y <text_droite_repere[i][2]-25 && y >text_droite_repere[i][2]-85){
                document.getElementById(text_droite_repere[i][3]).style.display = "initial";
                text_droite_repere.splice(i,1);     
            }
        }
    }
    drawBoard();
    drawDroite_droit_repere();
    for(let j =0;j < text_droite_repere.length; j++){
        drawText_droite_repere(text_droite_repere[j][0], text_droite_repere[j][1],text_droite_repere[j][2] , "black", TEXT_SIZE_CELL*3);
    }
    }
    function drawText_droite_repere(text, x, y, color, size){
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.lineTo(x-30, y-25);
        ctx.lineTo(x+30 ,y-25);
        ctx.closePath();
        ctx.fillStyle = "#00abcc";
        ctx.fill();
        ctx.fillStyle = "#00abcc";
        ctx.fillRect(x-30,y-85, 60,60)
        ctx.fillStyle = color;
        if(text.length == 1){
            ctx.font = size + "px dejavu sans mono";
            ctx.fillText(text, x-15, y-45);
        }else{
            ctx.font = size + "px dejavu sans mono";
            ctx.fillText(text, x-25, y-45);
        } 
    } 
    function drag_droite_repere(ev){
        var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    ev.dataTransfer.setData("text", ev.target.id);
     shiftX = x-( ev.target.offsetLeft- 30)-25;
    shiftY = y - (ev.target.offsetTop+30)-40;
    }

    function score_droite_repere(){
        var used1 = false, used2 = false, used3 =false;
        var used1X, used2X;
        for(let i =0;i < text_droite_repere.length; i++){
            if(text_droite_repere[i][0]== -7){  
                   used1 =true;
                    used1X = text_droite_repere[i][1];
                if(text_droite_repere[i][1] > 75 && text_droite_repere[i][1]< 188){
                        sendData(1, "droite repère", 14, 2)
                }else{
                        if(text_droite_repere[i][1] <548 ){
                            sendData(0+"A", "droite repère", 14, 2);
                        }else{
                            if(text_droite_repere[i][1] >= 548){
                            sendData(0+"B", "droite repère", 14, 2);}
                        }
                    }
                }
            
            if(text_droite_repere[i][0]== -3){  
                   used2 =true;
                   used2X = text_droite_repere[i][1];
                if(text_droite_repere[i][1] > 315 && text_droite_repere[i][1]< 428){
                        sendData(1, "droite repère", 14, 1)
                }else{
                        if(text_droite_repere[i][1] <548 ){
                            sendData(0+"A", "droite repère", 14, 1);
                        }else{
                            if(text_droite_repere[i][1] >= 548){
                            sendData(0+"B", "droite repère", 14, 1);}
                        }
                    }
                }
            
            if(text_droite_repere[i][0]== 4){     used3 =true;
                if(text_droite_repere[i][1] > 740 && text_droite_repere[i][1]< 853){
                        sendData(1, "droite repère", 14, 3)
                }else{
                            sendData(0, "droite repère", 14, 3);
                    }
                }
            }
            if(used1 == false){
                sendData(9, "droite repère", 14, 2)
            }
            if(used2 == false){
                sendData(9, "droite repère", 14, 1)
            }
            if(used3 == false){
                sendData(9, "droite repère", 14, 3)
            }
            if(used1 == true && used2 == true){
                if(used1X <= used2X){
                    sendData(1, "droite repère", 14, 4)
                }else{
                    sendData(0, "droite repère", 14, 4)
                }
                
            }else{
                sendData(9, "droite repère", 14, 4)
            }
            nettoyer_droite_repere();
        }

        function nettoyer_droite_repere(){

            for(let i = 0; i<3; i++){
                document.getElementById("droite_grad_label"+i).parentNode.removeChild( document.getElementById("droite_grad_label"+i));
            }
            canv.removeEventListener("click", click_droite_repere);
            drawBoard();
            reference_liste(15);
          
        }    