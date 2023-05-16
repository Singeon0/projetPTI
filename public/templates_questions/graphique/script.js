function loadChart(){document.addEventListener('DOMContentLoaded', function() {
    // Données d'entrée pour le graphe radar
    var data = {
      labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4'],
      datasets: [{
        label: 'Valeurs',
        data: [0.8, 0.6, 0.4, 0.2],
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
  });}