function loadChart(scores, titres){
    console.log('titres :>> ', titres);
    console.log('scores :>> ', scores);
    // Données d'entrée pour le graphe radar
    var data = {
      labels: titres,
      datasets: [{
        label: 'Valeurs',
        data: scores,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
      }]
    };
  
    // Configuration du graphe radar
    var options = {
      responsive: true,
      maintainAspectRatio: false,
      scale: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 1,
          stepSize: 0.2
        }
      }
    };
  
    // Création du graphe radar
    var ctx = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx, {
      type: 'radar',
      data: data,
      options: options
    });
  }