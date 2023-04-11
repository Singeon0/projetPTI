var left_traduction_probleme = [90,90, 542, 390], top_traduction_probleme = [160, 414, 239 , 482];
var REPONSE_TRADUCTION_PROBLEME = ["3–5","-5+8",-2,3];
var data_numb_traduction_probleme = [1,3,2,4];
var trad_traduction_probleme = [["","3 – 5","3 + 5","5 + 3","5 - 3"],["","-5 + 8","8 - 5","-5 - 8","8 + 5"]];
function interval_traduction_probleme(){
document.getElementById("canvas").style.height = "auto";
document.getElementById("espace").textContent = "Traduit les énoncés en calculs puis donne la bonne réponse"
document.getElementById("next_arrow").onclick = score_traduction_probleme;
drawImage_traduction_probleme();
drawImput_traduction_probleme();
}
function drawImage_traduction_probleme(){
    var traduction_probleme_img = document.getElementById("traduction_probleme");
    ctx.drawImage(traduction_probleme_img, 10, 10, 1170, 530);
  }
  function drawImput_traduction_probleme(){
      for (let i = 0; i < 2; i++){
          var temp;
            temp =  document.createElement("SELECT");
            temp.setAttribute("id", "select"+i+"_traduction_probleme")
            temp.setAttribute("CLASS", "select_signe_multiple");
            document.getElementById("canvas").appendChild(temp);
            for(let j=0; j<5;j++){
                var c = document.createElement("option");
                c.text = trad_traduction_probleme[i][j];
                temp.options.add(c, 1);
                }
                var left = left_traduction_probleme[i];
                var top = top_traduction_probleme[i]+document.getElementById("titreQuestions").height;
                temp.style.top = top+ "px";
                temp.style.left = left+"px";
                temp.style.width = "6rem";
      }
      for (let i = 2; i < 4; i++){
        var temp;
          temp =  document.createElement("input");
          temp.setAttribute("id", "select"+i+"_traduction_probleme")
          temp.setAttribute("CLASS", "select_signe_multiple");
          document.getElementById("canvas").appendChild(temp);
              var left = left_traduction_probleme[i];
              var top = top_traduction_probleme[i]+document.getElementById("titreQuestions").height;
              temp.style.top = top+ "px";
              temp.style.left = left+"px";
    }
     
  }

  function score_traduction_probleme(){
    for (let i =0 ; i < 4; i++){
        if(document.getElementById("select"+i+"_traduction_probleme").value === ""){
            sendData(9, "traduction problème", 19, data_numb_traduction_probleme[i]);
        }else{
            if(document.getElementById("select"+i+"_traduction_probleme").value.replace(/\s+/g, '') == REPONSE_TRADUCTION_PROBLEME[i]){
                sendData(1, "traduction problème", 19, data_numb_traduction_probleme[i]);
            }else{
                sendData(0, "traduction problème", 19, data_numb_traduction_probleme[i]); 
            }

        }
    }
    nettoyer_traduction_probleme();
  }
  function nettoyer_traduction_probleme(){
    for (let i =0; i < 4 ;i++ ){
        document.getElementById("select"+i+"_traduction_probleme").parentNode.removeChild(document.getElementById("select"+i+"_traduction_probleme"))
    } 
     drawBoard();
    reference_liste(20);
  
  }