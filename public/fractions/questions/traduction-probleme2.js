var left_traduction_probleme2 = [258,933], top_traduction_probleme2 = [278, 419];
var trad_traduction_probleme2 = "24/60";
var reponse_traduction_probleme2 = ["4/10", "40%","0,4","0.4"];
var options_trad_traduction_probleme2 = ["","24/60","60/24","60/100 + 24/100", "60-24"];
function interval_traduction_probleme2(){
document.getElementById("canvas").style.height = "auto";
document.getElementById("espace").textContent = "Traduit les énoncés en calculs puis donne la bonne réponse"
HEIGHT = 600;
document.getElementById("body").style.height= "1100px";
document.getElementById("espace").textContent = "Resous le problème";
document.getElementById('next_arrow').style.bottom = "10rem";
canv.height = HEIGHT;
canv.width = WIDTH;
drawBoard();
document.getElementById("next_arrow").onclick = score_traduction_probleme2;
drawImage_traduction_probleme2();
drawImput_traduction_probleme2();
}
function drawImage_traduction_probleme2(){
    var traduction_probleme2_img = document.getElementById("traduction_probleme2_img");
    ctx.drawImage(traduction_probleme2_img, 10, 10, 1170, 530);
  }
  function drawImput_traduction_probleme2(){
      for (let i = 0; i < 1; i++){
          var temp;
            temp =  document.createElement("SELECT");
            temp.setAttribute("id", "select"+i+"_traduction_probleme")
            temp.setAttribute("CLASS", "select_traduction_probleme");
            document.getElementById("canvas").appendChild(temp);
            for(let j=0; j<5;j++){
                var c = document.createElement("option");
                if(i == 0 ){
                  c.text = options_trad_traduction_probleme2[j];
                }else{
                  c.text = options_resol_traduction_probleme2[j];
                }
                temp.options.add(c, 1);
                }
                var left = left_traduction_probleme2[i];
                var top = top_traduction_probleme2[i];
                temp.style.top = top+ "px";
                temp.style.left = left+"px";
      }
        var temp;
          temp =  document.createElement("input");
          temp.setAttribute("id", "select"+1+"_traduction_probleme")
          temp.setAttribute("placeholder", "............");
          temp.setAttribute("CLASS", "input_traduction_probleme");
          document.getElementById("canvas").appendChild(temp);
              var left = left_traduction_probleme2[1];
              var top = top_traduction_probleme2[1];
              temp.style.top = top+ "px";
              temp.style.left = left+"px";
     
  }

  function score_traduction_probleme2(){
            if(document.getElementById("select"+0+"_traduction_probleme").value === ""){
            sendData(9, "traduction problème", 24, 1);
        }else{
            if(document.getElementById("select"+0+"_traduction_probleme").value == trad_traduction_probleme2){
                sendData(1, "traduction problème", 24, 1);
            }else{
                sendData(0, "traduction problème", 24, 1); 
            }
        }  
      /*  if(document.getElementById("select"+1+"_traduction_probleme2").value === ""){
          sendData(9, "traduction problème", 13, 2);
      }else{ 
        if(document.getElementById("select"+1+"_traduction_probleme2").value == resolution_traduction_probleme2){
          sendData(1, "traduction problème", 13, 2);
       }else{
          sendData(0, "traduction problème", 13, 2); 
        }
      } */
      if(document.getElementById("select"+1+"_traduction_probleme").value === ""){
        sendData(9, "traduction problème", 24, 2);
    }else{ 
      if(document.getElementById("select"+1+"_traduction_probleme").value.replace(/\s+/g, '') == reponse_traduction_probleme2[0] ||document.getElementById("select"+1+"_traduction_probleme").value.replace(/\s+/g, '') == reponse_traduction_probleme2[1]|| document.getElementById("select"+1+"_traduction_probleme").value.replace(/\s+/g, '') == reponse_traduction_probleme2[2]||document.getElementById("select"+1+"_traduction_probleme").value.replace(/\s+/g, '') == reponse_traduction_probleme2[3]){
        sendData(1, "traduction problème", 24, 2);
     }else{
        sendData(0, "traduction problème", 24, 2); 
      }
    }
  nettoyer_traduction_probleme2();
  }
  function nettoyer_traduction_probleme2(){
    for (let i =0; i < 2 ;i++ ){
        document.getElementById("select"+i+"_traduction_probleme").parentNode.removeChild(document.getElementById("select"+i+"_traduction_probleme"))
    } 
     drawBoard();
    reference_liste(25);
  
  }