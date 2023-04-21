
var connectTheDot_debut = false, connectTheDot_debut_class = false, condition_connect_the_dot =false;

var text_id, text_class;
var local_Id = false, local_class = false;
var removeImput, first_debut =true;
var server_data_statut = false;
var server_data_wrong = true;
var server_data_passer = 1;
var partie_prof = false;
var atWhichQuestionIAm = 1;
document.getElementById("espace").style.backgroundColor = "transparent";

const btn_class = document.getElementById("btn_class");
btn_class.addEventListener("click", input_local_class);
document.getElementById("icon_professor").addEventListener("click", switch_to_prof);
//swal("Consignes : ", "Entre le code classe que ton professeur t'a donné dans le champ ''classe'' et ton Id, également attribué par ton professeur, dans le champ Id ");

function input_local_class(){
        local_class = input_class.value;
        interval_remover();
  if(!connectTheDot_debut){
     document.getElementById("Id_wrong").style.display = "block";
  } 
}

const btn_id = document.getElementById("btn_id");
btn_id.addEventListener("click", input_local_id);

function input_local_id(){
       local_Id = input_id.value;
        interval_remover();
  if(!connectTheDot_debut_class){
     document.getElementById("class_wrong").style.display = "block";
  }
      
}

function interval_remover(){
  if(local_class == "codeR" ){
    window.open("/recher?num=1");
  }else{
    if(first_debut){
      send_Id_class();
  }
  }}


function modify_href(){
    var ref = "/download?name="+input_class.value+"&sheet=1";
    document.getElementById("download").href = ref;
}
function switch_to_prof(){
  if(!partie_prof){
    swal("Si vous avez déjà crée une classe, vous pouvez entrer votre code personnel pour télécharger le fichier excel avec les données de vos élèves. Sinon, vous pouvez cliquer sur le second bouton pour faire votre demande de création de classe.");
    document.getElementById("greetings").textContent ="Partie Prof";
    document.getElementById("span_champ_class").textContent ="Entrez votre code personnel";
    document.getElementById("input2").style.display ="none";
    document.getElementById("btn_id").style.display ="none";
    document.getElementById("btn_class").textContent ="Appuyez ici pour télécharger !";
    document.getElementById("input_class").addEventListener('input', modify_href);
    document.getElementById("btn_class").style.display = "none";
    document.getElementById("download").style.display = "block";
    document.getElementById("forms_prof").style.display = "block";
    //document.getElementById("icon_download").style.display = "block";
    input_class.value = "";
    partie_prof = true;
  }else{
    document.getElementById("greetings").textContent ="Bienvenue à ce test diagnostique sur la phylogénétique";
    document.getElementById("span_champ_class").textContent ="Entrez votre classe";
    document.getElementById("input2").style.display ="initial";
    document.getElementById("btn_id").style.display ="initial";
    document.getElementById("btn_class").textContent ="Appuyez ici pour valider !";
    document.getElementById("btn_class").style.display = "initial";
    document.getElementById("input_class").removeEventListener('input', modify_href);
    document.getElementById("download").style.display = "none";
    document.getElementById("forms_prof").style.display = "none";
    document.getElementById("icon_download").style.display = "none";
    input_class.value = "";
    partie_prof = false;
  }
 
}


//fonction pour passer à la question suivante, appelé depuis send_Id_class et n'agis que si le statut de la réponse au fetch est = à true
function clear_debut(){
  if(!server_data_statut){
    if(server_data_wrong){ 
    document.getElementById("class_wrong").style.display = "block";
      document.getElementById("Id_wrong").style.display = "none";
      document.getElementById("class_check").style.display = "none";
     
    }
    if(!server_data_wrong){
      
        document.getElementById("Id_wrong").style.display = "block";
       document.getElementById("class_check").style.display = "block";
        document.getElementById("class_wrong").style.display = "none";
    }
  }
    if( server_data_statut){
        
        btn_id.removeEventListener('click', input_local_id);
        btn_class.removeEventListener('click', input_local_class);
    
        document.getElementById("btn_id").style.display = "none";
        document.getElementById("btn_class").style.display = "none";
      //  document.getElementById("label_id").style.display = "none";
        //document.getElementById("label_class").style.display = "none";
        //document.getElementById("input_id").style.display = "none";
        document.getElementById("input1").style.display = "none";
        document.getElementById("input2").style.display = "none";
        document.getElementById("titre_questionnaire").style.display = "none";
        document.getElementById("question_id").style.display = "none";
       document.getElementById("canvas").style.display = "flex";
       document.getElementById("class_wrong").style.display = "none";
      document.getElementById("Id_wrong").style.display = "none";
      document.getElementById("class_check").style.display = "none";
        document.getElementById("margin").style.display = "block";
        document.getElementById("espace").style.backgroundColor = "#00abcc";
        document.getElementById("espace").style.boxShadow = "0 5px 15px #193047";
        document.getElementById("icon_professor").style.display = "none";
        document.getElementById("espace").style.height = "140px";
        document.getElementById("background").style.height = "100%";
        document.getElementById("canvas").style.width = WIDTH + "px";
        document.getElementById("next_arrow").style.display = "flex"; 
        document.getElementById("espace").style.height = "100px";
        document.getElementById("espace").style.display = "none";
        document.getElementById("canvas").style.overflow = 'visible';
        document.getElementById("background").style.backgroundImage= 'none';
        document.getElementById("background").style.backgroundColor= '#76B4B2';
        var swalRe = document.createElement("label");
        swalRe.setAttribute("id","swalRe");
        swalRe.textContent = "Consigne";
        swalRe.onclick = swalRe_debut;
        document.getElementById("body").appendChild(swalRe);
        //drawBoard();
        first_debut = false;
 
       reference_liste(server_data_passer);
     
      
    
      }
}
function swalRe_debut(){
  swalRepeat = true;
reference_liste(atWhichQuestionIAm);
}
async function send_Id_class(){
    //option pour la fonction fetch
    const data_id_class = {local_class,local_Id, version: 1};
    const options ={
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_id_class)
    };
    //async function pour poster l'Id et la classe au serveur
   const response = await fetch('/login', options);
   //reçois une réponse du serveur
    const server_data = await response.json();
    server_data_statut = server_data.statut;
    server_data_wrong = server_data.class_wrong;
    server_data_passer = server_data.passer;
  clear_debut();

}

  




