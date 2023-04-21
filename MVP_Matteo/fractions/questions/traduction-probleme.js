var left_traduction_probleme = [370,245,710], top_traduction_probleme = [268, 360, 482];
var REPONSE_TRADUCTION_PROBLEME = ["3-5","-5+8",-2,3];
var trad_traduction_probleme = "2/5 + 3/10";
var resolution_traduction_probleme = "7/10";
var resolution0A_traduction_probleme = "5/15";
var reponse_traduction_probleme = ["7/10", "70%","0,7","0.7"];
var options_trad_traduction_probleme = ["","2/5 + 3/10","2/5 x 3/10","2/5 : 3/10","2/5 – 3/10"];
var options_resol_traduction_probleme = ["","5/15","7/10","6/50", "6/10"];
function interval_traduction_probleme(){
document.getElementById("canvas").style.height = "auto";
document.getElementById("espace").textContent = "Traduit les énoncés en calculs puis donne la bonne réponse"
HEIGHT = 600;
document.getElementById("body").style.height= "1100px";
document.getElementById("espace").textContent = "Resous le problème";
document.getElementById('next_arrow').style.bottom = "10rem";
canv.height = HEIGHT;
canv.width = WIDTH;
drawBoard();
document.getElementById("next_arrow").onclick = score_traduction_probleme;
drawImage_traduction_probleme();
drawImput_traduction_probleme();
}
function drawImage_traduction_probleme(){
    var traduction_probleme_img = document.getElementById("traduis_img");
    ctx.drawImage(traduction_probleme_img, 10, 10, 1170, 530);
  }
  function drawImput_traduction_probleme(){
      for (let i = 0; i < 2; i++){
          var temp;
            temp =  document.createElement("SELECT");
            temp.setAttribute("id", "select"+i+"_traduction_probleme")
            temp.setAttribute("CLASS", "select_traduction_probleme");
            document.getElementById("canvas").appendChild(temp);
            for(let j=0; j<5;j++){
                var c = document.createElement("option");
                if(i == 0 ){
                  c.text = options_trad_traduction_probleme[j];
                }else{
                  c.text = options_resol_traduction_probleme[j];
                }
                temp.options.add(c, 1);
                }
                var left = left_traduction_probleme[i];
                var top = top_traduction_probleme[i];
                temp.style.top = top+ "px";
                temp.style.left = left+"px";
      }
        var temp;
          temp =  document.createElement("input");
          temp.setAttribute("id", "select"+2+"_traduction_probleme")
          temp.setAttribute("placeholder", "............");
          temp.setAttribute("CLASS", "input_traduction_probleme");
          document.getElementById("canvas").appendChild(temp);
              var left = left_traduction_probleme[2];
              var top = top_traduction_probleme[2];
              temp.style.top = top+ "px";
              temp.style.left = left+"px";
     
  }

  function score_traduction_probleme(){
            if(document.getElementById("select"+0+"_traduction_probleme").value === ""){
            sendData(9, "traduction problème", 13, 1);
        }else{
            if(document.getElementById("select"+0+"_traduction_probleme").value == trad_traduction_probleme){
                sendData(1, "traduction problème", 13, 1);
            }else{
                sendData(0, "traduction problème", 13, 1); 
            }
        }  
        if(document.getElementById("select"+1+"_traduction_probleme").value === ""){
          sendData(9, "traduction problème", 13, 2);
      }else{ 
        if(document.getElementById("select"+1+"_traduction_probleme").value == resolution_traduction_probleme){
          sendData(1, "traduction problème", 13, 2);
       }else{
        if(document.getElementById("select"+1+"_traduction_probleme").value == resolution0A_traduction_probleme){
          sendData("0A", "traduction problème", 13, 2);
       }else{
          sendData(0, "traduction problème", 13, 2); 
        }}
      }
      if(document.getElementById("select"+2+"_traduction_probleme").value === ""){
        sendData(9, "traduction problème", 13, 3);
    }else{ 
      if(document.getElementById("select"+2+"_traduction_probleme").value.replace(/\s+/g, '') == reponse_traduction_probleme[0] ||document.getElementById("select"+2+"_traduction_probleme").value.replace(/\s+/g, '') == reponse_traduction_probleme[1]|| document.getElementById("select"+2+"_traduction_probleme").value.replace(/\s+/g, '') == reponse_traduction_probleme[2]||document.getElementById("select"+2+"_traduction_probleme").value.replace(/\s+/g, '') == reponse_traduction_probleme[3]){
        sendData(1, "traduction problème", 13, 3);
     }else{
        sendData(0, "traduction problème", 13, 3); 
      }
    }
  nettoyer_traduction_probleme();
  }
  function nettoyer_traduction_probleme(){
    for (let i =0; i < 3 ;i++ ){
        document.getElementById("select"+i+"_traduction_probleme").parentNode.removeChild(document.getElementById("select"+i+"_traduction_probleme"))
    } 
     drawBoard();
    reference_liste(14);
  
  }