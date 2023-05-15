var coordX_select_construit = [110,460,460,840,840,840,840];
var coordY_select_construit = [340,164,464,70,220,420,580];
var position_construit = 1;
var selected_construit = [false,false,false,false,false,false];
var pair_construit = [0,2,1,4,3,6,5];
let options_construit = [];
const defaultValue = "............";
let choix;
ctx = document.getElementById('canvas').getContext("2d");
canvRect = document.getElementById('canvas').getBoundingClientRect();   
function interval_construit(prop){
     choix = prop["choix"];
    let m = 0;
    for(let j = 0; j < 3; j++){
        for(let i =0; i < (2**j); i++){
            function triAleatoire() {
                return Math.random() - 0.5;
              }
            options_construit[m] = choix[j].split(',');
            options_construit[m] = options_construit[m].sort(triAleatoire);
            options_construit[m].unshift(defaultValue);
            m++;
        } 
    }
    console.log('options_construit :>> ', options_construit);
drawBoard();
//drawImage_construit();
var temp = document.createElement("SELECT");
temp.style.height ="80px";
temp.style.width ="200px";
temp.style.position ="absolute";
temp.setAttribute("id", "select_construit0");
temp.setAttribute("CLASS", "select_construit");
for(let k = 0; k < options_construit[0].length; k++){
    var option = document.createElement("option");
    option.text = options_construit[0][k]
    option.setAttribute("CLASS", "select_construit_options");
    option.style.wordBreak = "break-all";
    option.style.overflow = "visible";
    temp.add(option);
}
document.getElementById("divCanvas").appendChild(temp);
temp.style.left =coordX_select_construit[0]+"px";
temp.style.top = coordY_select_construit[0]+"px";
temp.addEventListener('change', select_construit);
}
function select_construit(){
if(selected_construit[0] === false && document.getElementById("select_construit0").value !==defaultValue){
    createSelect_construit(1);
    createSelect_construit(2);
    selected_construit[0] = true;
}
if(selected_construit[1] === false && document.getElementById("select_construit1").value !==defaultValue ){
    createSelect_construit(3);
    createSelect_construit(4);
    selected_construit[1] = true;
}
if(selected_construit[2] === false && document.getElementById("select_construit2").value !==defaultValue){
    createSelect_construit(5);
    createSelect_construit(6);
    selected_construit[2] = true;
}
if(selected_construit[1] === true && document.getElementById("select_construit1").value ==defaultValue){
    selected_construit[1] = false;
    selected_construit[3] = false;
    selected_construit[4] = false;
    document.getElementById("select_construit3").parentNode.removeChild(  document.getElementById("select_construit3"));
    document.getElementById("select_construit4").parentNode.removeChild(  document.getElementById("select_construit4"));
}
if(selected_construit[2] === true && document.getElementById("select_construit2").value ==defaultValue){
    selected_construit[2] = false;
    selected_construit[5] = false;
    selected_construit[6] = false;
    document.getElementById("select_construit5").parentNode.removeChild(  document.getElementById("select_construit5"));
    document.getElementById("select_construit6").parentNode.removeChild(  document.getElementById("select_construit6"));
}
if(selected_construit[0] === true && document.getElementById("select_construit0").value ==defaultValue){
    if(selected_construit[1] === true){
        selected_construit[1] = false;
        selected_construit[3] = false;
        selected_construit[4] = false;
        document.getElementById("select_construit3").parentNode.removeChild(  document.getElementById("select_construit3"));
        document.getElementById("select_construit4").parentNode.removeChild(  document.getElementById("select_construit4"));
    }
    if(selected_construit[2] === true ){
        selected_construit[2] = false;
        selected_construit[5] = false;
        selected_construit[6] = false;
        document.getElementById("select_construit5").parentNode.removeChild(  document.getElementById("select_construit5"));
        document.getElementById("select_construit6").parentNode.removeChild(  document.getElementById("select_construit6"));
    }
    selected_construit[0] = false;
    selected_construit[1] = false;
    selected_construit[2] = false;
    document.getElementById("select_construit1").parentNode.removeChild(  document.getElementById("select_construit1"));
    document.getElementById("select_construit2").parentNode.removeChild(  document.getElementById("select_construit2"));
}
drawLine_construit();
}
function createSelect_construit(i){
    var temp = document.createElement("SELECT");
    temp.setAttribute("id", "select_construit"+i);
    temp.setAttribute("CLASS", "select_construit");
    temp.style.height ="80px";
    temp.style.width ="200px";
    temp.style.position ="absolute";
    console.log('options_construit :>> ', options_construit);
    for(let k = 0; k < options_construit[i].length; k++){
        var option = document.createElement("option");
        option.text = options_construit[i][k]
        option.setAttribute("CLASS", "select_construit_options");
        temp.add(option);
    }
    temp.addEventListener('change', ()=>{   if(document.getElementById("select_construit"+pair_construit[i]).value == document.getElementById("select_construit"+i).value){option_construit(pair_construit[i])}});
    document.getElementById("divCanvas").appendChild(temp);
    temp.style.left =coordX_select_construit[i]+"px";
    temp.style.top = coordY_select_construit[i]+"px";
    temp.addEventListener('change', select_construit);
}
function option_construit(i){
 document.getElementById("select_construit"+i).innerHTML = "";
for(let k = 0; k < options_construit[i].length; k++){
    var option = document.createElement("option");
    option.text = options_construit[i][k]
    option.setAttribute("CLASS", "select_construit_options");
    document.getElementById("select_construit"+i).add(option);}
}
function drawLine_construit(){
    drawBoard();
    //drawImage_construit();  
 if(selected_construit[0] ===true){
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[0]+200, coordY_select_construit[0]+30);
    ctx.lineTo(coordX_select_construit[1]-15, coordY_select_construit[1]+15);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[0]+200, coordY_select_construit[0]+30);
    ctx.lineTo(coordX_select_construit[2]-15, coordY_select_construit[2]+40);
    ctx.stroke();
 }
 if(selected_construit[1] ===true){
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[1]+200, coordY_select_construit[1]+30);
    ctx.lineTo(coordX_select_construit[3]-15, coordY_select_construit[3]+15);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[1]+200, coordY_select_construit[1]+30);
    ctx.lineTo(coordX_select_construit[4]-15, coordY_select_construit[4]+40);
    ctx.stroke();
 }
 if(selected_construit[2] ===true){
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[2]+200, coordY_select_construit[2]+30);
    ctx.lineTo(coordX_select_construit[5]-15, coordY_select_construit[5]+15);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coordX_select_construit[2]+200, coordY_select_construit[2]+30);
    ctx.lineTo(coordX_select_construit[6]-15, coordY_select_construit[6]+40);
    ctx.stroke();
 }
}
function score_construit(){
    var temp9=0;
    var bilan1 = 0, bilan2 = 0;
    if(document.getElementById("select_construit"+0).value == "Tête/yeux/bouche"){
        sendData(1,"construit",15,3);
        ++bilan1;
    }else{  
        if(document.getElementById("select_construit"+0).value == defaultValue){
            sendData(9,"construit",15,3);
            ++bilan2;
        }else{  
            sendData(0,"construit",15,3);
        }
    }
    if(document.getElementById("select_construit"+0).value !== defaultValue){
    var temp1 = 0, temp2 = 0;
    for(let i = 1; i < 3; i++){
        if(document.getElementById("select_construit"+i).value == "Squelette interne"){
            temp1 = i;
        }else{
            if(document.getElementById("select_construit"+i).value == defaultValue){
                ++temp2;
            }
        }
    }
    if(temp1 != 0 ){
        sendData(1,"construit",15,5);
        ++bilan1;
        }else{  
            if(temp2 == 2){
                sendData(9,"construit",15,5);
            }else{  
                sendData(0,"construit",15,5);
            }
        }
        if(temp2 != 2 && temp1 != 0){
        var temp3= 0, temp4 = 0;
     for(let i = 1+2*temp1; i <3+2*temp1;i++){
        if(document.getElementById("select_construit"+i).value == "Plumes"){
            temp3 = i;
        }else{
            if(document.getElementById("select_construit"+i).value == defaultValue){
                ++temp4;
            }
        }
    }
    if(temp3 != 0 ){
        sendData(1,"construit",15,7);
        }else{  
            if(temp4 == 2){
                sendData(9,"construit",15,7);
                temp9 = 1;
            }else{  
                sendData(0,"construit",15,7);
            }
        }
    }else{ sendData(9,"construit",15,7);temp9 = 1}
    }else{sendData(9,"construit",15,5); sendData(9,"construit",15,7);temp9 = 1}
    if(temp9 == 1){
        sendData(9,"construit",15,1);
    }else{
        if(document.getElementById("select_construit"+pair_construit[temp1]).value == "N'a pas de squelette interne") {
            if(document.getElementById("select_construit"+pair_construit[temp3]).value == "Pas de plumes"){
                sendData(1,"construit",15,1);
                ++bilan1;
            }else{
                sendData(0,"construit",15,1);
            }
        }else{
            sendData(0,"construit",15,1);
        }
    }
    if(bilan1 == 3){
        sendData(1,"construit",15,9);
    }else{
        if(bilan2 ==1){
            sendData(9,"construit",15,9);
        }else{
            sendData(0,"construit",15,9);
        }
    }
    //item de précision, ignoré
    sendData(9,"construit",15,2);
    sendData(9,"construit",15,4);
    sendData(9,"construit",15,6);
    sendData(9,"construit",15,8);
    nettoyer_construit();

}
canvas.addEventListener('click',(e)=>{
    console.log(canvas.offsetTop)
    console.log("x : " + (e.clientX  -parseInt(canvas.offsetLeft)))
    console.log("y : " + (e.clientY - parseInt(canvas.offsetTop)))
})


function drawBoard(){
    ctx.lineWidth = 2;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "#00abcc" 
    let HEIGHT = document.getElementById("canvas").clientHeight;
    let WIDTH = document.getElementById("canvas").clientWidth;
    console.log('HEIGHT :>> ', HEIGHT);
    console.log('WIDTH :>> ', WIDTH);
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeRect(5, 5, WIDTH - 10, HEIGHT - 10);
}

