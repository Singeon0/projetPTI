
var selected_entoure_distraction = false;
function interval_entoure_distraction(){
    
    document.getElementById("next_arrow").onclick = nettoyer_entoure_distraction;
    document.getElementById("espace").textContent = "Trouve la valeur des figures A, B et C";
    document.getElementById("canvas").style.height = "600px";
    document.getElementById("body").style.height= "1000px";
    document.getElementById('next_arrow').style.bottom = "10rem";
    HEIGHT = 600;
    canv.height = HEIGHT;
    canv.width = WIDTH;
    drawBoard();
    document.getElementById("canv").onmousedown = draw_entoure_distraction;
    document.getElementById("canv").onmousemove = Draw_entoure_distraction;
    document.getElementById("canv").onmouseup = stop_entoure_distraction;
    var drag1;
    drag1 = document.createElement("label");
    drag1.setAttribute("id","effacer_entoure_distraction");
    drag1.textContent = "effacer";
    drag1.setAttribute("class", "drag");
    drag1.onclick = effacer_entoureg_distraction;
    document.getElementById("canvas").appendChild(drag1);
    document.getElementById("effacer_entoure_distraction").style.bottom = "4.5rem";
    document.getElementById("effacer_entoure_distraction").style.fontSize = "2rem";
    document.getElementById("effacer_entoure_distraction").style.marginLeft = "2rem";
drawImg_entoure_distraction();
}
function drawImg_entoure_distraction(){
    var temp = document.getElementById("entoure_distraction_img");
    ctx.drawImage(temp, 25, 50, 1150, 520);
}
function effacer_entoureg_distraction(){
    drawBoard();
    drawImg_entoure_distraction();
}
function draw_entoure_distraction(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    selected_entoure_distraction = true;
}
function stop_entoure_distraction(){
    selected_entoure_distraction = false;
}
function Draw_entoure_distraction(ev){
    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    var x = parseInt(ev.pageX - offsetX)-35;
    var y = parseInt(ev.pageY - offsetY) - 20;
    if (selected_entoure_distraction) {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function nettoyer_entoure_distraction(){
    document.getElementById("effacer_entoure_distraction").parentNode.removeChild(document.getElementById("effacer_entoure_distraction"));
    document.getElementById("canv").onmousedown = "";
    document.getElementById("canv").onmousemove = "";
    document.getElementById("canv").onmouseup = "";
drawBoard();
reference_liste(20);
}