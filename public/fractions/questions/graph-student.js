var donnéesGraph = [];
var waiting_title;
async function sendCompleted(){
 
    //option pour la fonction fetch
    const Score_data = {local_class, local_Id, completed: true, version:2};
    const options ={
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Score_data)
    };
    //async function pour poster le score au serveur
   const response = await fetch('/completed', options);
   //reçois une réponse du serveur
   const server_data = await response.json();
donnéesGraph = server_data.données;
}

async function interval_graph_student(){
  document.getElementById("body").style.height= "1000px";
    document.getElementById("espace").textContent = "Graphe en radar :  chargement"
    document.getElementById("next_arrow").style.display = "none";
    document.getElementById("next_arrow").onclick = "";
    document.getElementById("canvas").style.height ="700px";
    document.getElementById("canvas").style.width ="800px";
   document.getElementById("canvas").style.left = "520px";
   document.getElementById("canvas").style.top = "12rem";
   document.getElementById("canv").style.display = "none";
   document.getElementById("canv").style.position = "absolute";
   var p = 0;
   waiting_title = setInterval(()=>{
switch(p){
    case 0 :  document.getElementById("espace").textContent = "Graphe en radar :  chargement"
    p = 1;
    break;
    case 1 :  document.getElementById("espace").textContent = "Graphe en radar :  chargement."
    p = 2;
    break;
    case 2 :  document.getElementById("espace").textContent = "Graphe en radar :  chargement.."
    p = 3;
    break;
    case 3 :  document.getElementById("espace").textContent = "Graphe en radar :  chargement..."
    p = 0;
    break;
}
   }, 250)
await sendCompleted();
initialiseChart();
}
function initialiseChart(){
    const data_chart = {
        labels: [
          'Représentations géométriques des fractions',
          'Fractions équivalentes et réduction de fractions',
          "Ordre de grandeur des fractions",
          'Placement de fraction sur une droite graduée',
          'Résolution de problème',
          'Addition et soustraction de fractions',
          'Multiplication de fraction',
        ],
        datasets: [{
          label: 'Vos compétences',
          data: [donnéesGraph[0], donnéesGraph[1], donnéesGraph[2], donnéesGraph[3], donnéesGraph[4],donnéesGraph[5],donnéesGraph[6]],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
      };
      drawChart(data_chart);
}
function drawChart(data_chart){
    const config_chart = {
        type: 'radar',
        data: data_chart,
        options: {
            clip: {left: 5, top: false, right: 5, bottom: 0},
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 1
                }
            },
          elements: {
            line: {
              borderWidth: 3
            }
          },
          scales: {
            r: {
              suggestedMin: 0,
              suggestedMax: 1,
             ticks:{
               display:false
             }
            }
          }
         
        },
      };
    
  var myChart = new Chart(
    document.getElementById('canv'),
    config_chart
  );
  document.getElementById("canv").style.display = "block";
  document.getElementById("espace").textContent = "Graphe en radar"
  document.getElementById("canvas").style.backgroundColor = "white";
  clearInterval(waiting_title)
}