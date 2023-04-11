//dessine une droite, fait apparaitre des les éléments <i> à drag and drop, une fois déposé les éléments disparraissent et on dessine le contenu (une fraction) sur la droite, on peut enlever une fraction en cliquant dessus
var text_droite_grad = [];
var reponse_droite_grad, img_droite_grad, data_question_droite_grad, data_number_droite_grad, ref_droite_grad, version_droite_grad;
var shiftX, shiftY;
function interval_droite_grad(rep, img, q, n, ref, ver){
    text_droite_grad = [];
reponse_droite_grad = rep;
img_droite_grad = img;
data_question_droite_grad = q;
data_number_droite_grad = n;
ref_droite_grad = ref;
version_droite_grad = ver;
    document.getElementById("next_arrow").onclick = score_droite_grad;
    document.getElementById("espace").textContent = "Place les nombres sur cette droite graduée";
    document.getElementById("canvas").setAttribute("ondrop","drop_droite_grad(event)" );
    document.getElementById("canvas").setAttribute("ondragover","allowDrop_droite_grad(event)" );
    canv.addEventListener("click", click_droite_grad);
    document.getElementById("canvas").style.height = "600px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById('next_arrow').style.bottom = "10rem";
    document.body.addEventListener('drop', drop, true)
   
    HEIGHT = 600;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    drawDroite_droit_grad();
    for(let i = 0; i<4; i++){
        createLabel_droite_grad(reponse_droite_grad[i][0],i);
    }
    }
     //nécessaire sur firefox de désactiver l'action par défaut sinon il redirige la page vers l'image quand on la drop
 function drop(e){
     if(e.preventDefault) { e.preventDefault(); }
  
 }
     
    function drawDroite_droit_grad(){
        var temp = document.getElementById(img_droite_grad);
        ctx.drawImage(temp, 25, 50, 1150, 400);
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(510, 125, 250,120)
        ctx.beginPath();
      }
      function drop_droite_grad(ev){
        var data = ev.dataTransfer.getData("text");
    
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var x = parseInt(ev.pageX - offsetX)-35;
        var y = parseInt(ev.pageY - offsetY) - 20;
   
            drawText_droite_grad(document.getElementById(data).textContent, x - shiftX, y - shiftY,  "black", TEXT_SIZE_CELL*2);
            document.getElementById(data).style.display = "none";
            text_droite_grad.push([document.getElementById(data).textContent,  x - shiftX, y - shiftY, data])
            // pour tester la zone de tolérance à //commenter sinon
            test_drop_droite_grad();
    
    }
    function test_drop_droite_grad(){
        for(let i =0; i<4; i++){
                    for(let j =0; j< text_droite_grad.length; j++){
                         if( text_droite_grad[j][0] === reponse_droite_grad[i][0]){
                             if(text_droite_grad[j][1] < reponse_droite_grad[i][1] + 40 && text_droite_grad[j][1] > reponse_droite_grad[i][1] - 40){
                             }else{
                             }
                         } 
            }   
        }
    }
    function allowDrop_droite_grad(ev){
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var x = parseInt(ev.pageX - offsetX)-35;
        var y = parseInt(ev.pageY - offsetY) - 20;
        if( 200<y && y<411){
        ev.preventDefault();
        }
    }
    function drag_droite_grad(ev){
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var x = parseInt(ev.pageX - offsetX)-35;
        var y = parseInt(ev.pageY - offsetY) - 20;
        ev.dataTransfer.setData("text", ev.target.id);
         shiftX = x-( ev.target.offsetLeft- 30)-25;
        shiftY = y - (ev.target.offsetTop+30)-40;

    }
    function createLabel_droite_grad(e, i){
        var drag1;
        drag1 = document.createElement("IMG");
        drag1.src = "fractions/questions/images/drag"+(i+version_droite_grad)+".PNG";
        drag1.setAttribute("id","droite_grad_label"+i);
        drag1.textContent = e;
        drag1.style.position = "relative";
      // drag1.setAttribute("class", "drag");
        drag1.setAttribute("draggable", "true");
        drag1.setAttribute("ondragstart","drag_droite_grad(event)");
        document.getElementById("canvas").appendChild(drag1);
        document.getElementById("droite_grad_label"+i).style.bottom = "8rem";
        document.getElementById("droite_grad_label"+i).style.fontSize = "2rem";
        document.getElementById("droite_grad_label"+i).style.marginLeft = "2rem";
    }
    function click_droite_grad(ev){
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var x = parseInt(ev.pageX - offsetX)-35;
        var y = parseInt(ev.pageY - offsetY) - 20; 
    for(let i =0; i<text_droite_grad.length; i++){
    if(x <text_droite_grad[i][1]+30 && x >text_droite_grad[i][1]-40){
        if(y <text_droite_grad[i][2]+15 && y >text_droite_grad[i][2]-85){
            document.getElementById(text_droite_grad[i][3]).style.display = "initial";
            text_droite_grad.splice(i,1);
            drawBoard();
drawDroite_droit_grad();
for(let k = 0; k< text_droite_grad.length; k++){
    drawText_droite_grad(text_droite_grad[k][0], text_droite_grad[k][1],text_droite_grad[k][2] , "black", TEXT_SIZE_CELL*2);
}

        }   
    }
    } 
    }
function drawText_droite_grad(text, x, y, color, size){
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
            ctx.font = size + "px dejavu sans mono";
            ctx.fillText(text, x-20, y-45);
} 
    
function score_droite_grad(){
        for(let i =0; i<4; i++){
            var present = false;
                    for(let j =0; j< text_droite_grad.length; j++){
                         if( text_droite_grad[j][0] === reponse_droite_grad[i][0]){
                             present = true;
                             if(text_droite_grad[j][1] < reponse_droite_grad[i][1] + 40 && text_droite_grad[j][1] > reponse_droite_grad[i][1] - 40){
                                sendData(1, data_question_droite_grad, data_number_droite_grad, (i+1))
                             }else{
                                sendData(0, data_question_droite_grad, data_number_droite_grad, (i+1))
                             }
                         } 
            }   
            if(present === false){
                sendData(9, data_question_droite_grad, data_number_droite_grad, (i+1))
            }
        }
        nettoyer_droite_grad();
    }
    function nettoyer_droite_grad(){
        for(let i =0; i < 4; i++){
            document.getElementById("droite_grad_label"+i).parentNode.removeChild(document.getElementById("droite_grad_label"+i));
        }
        text_droite_grad = [];
drawBoard();
reference_liste(ref_droite_grad);
    }
