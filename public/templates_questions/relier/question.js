let left = []; // tableau des points à gauche -> permet d'accèder au contenu hors du main

// Charger le fichier JSON
async function loadJSON() {
    try {
        const response = await fetch('JSON_question/664.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erreur lors du chargement du fichier JSON:', error);
    }
}

async function main() {
    propositions = await loadJSON();

    // Récupérer le contexte du canvas
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // Définir les paramètres des points
    let radius = 10; // rayon des points
    let gap = 30; // espace entre les points
    let right = []; // tableau des points à droite
    let selected = null; // point sélectionné
    const decalage = 200;
    const prop_gauche = propositions.propositions_gauche_ecran;
    const prop_droite = propositions.propositions_droite_ecran;
    const nbrePropositions = prop_droite.length;

    // Créer les points à gauche et à droite
    for (let i = 0; i < nbrePropositions; i++) {
        // Calculer la position y du point
        let y = gap + (i * (radius * 2 + gap));

        // Créer un objet point avec ses propriétés
        let pointLeft = {
            x: gap + radius + decalage, // position x du point à gauche
            y: y, // position y du point à gauche
            color: "blue", // couleur du point à gauche
            side: "left", // côté du point à gauche
            connectedTo: null, // point auquel il est connecté
            propLinked: null // proposition liée au point
        };

        let pointRight = {
            x: canvas.width - (gap + radius + decalage), // position x du point à droite
            y: y, // position y du point à droite
            color: "red", // couleur du point à droite
            side: "right", // côté du point à droite
            connectedTo: null, // point auquel il est connecté
            propLinked: null // proposition liée au point
        };

        // Ajouter le point au tableau correspondant
        left.push(pointLeft);
        right.push(pointRight);
    }

    // Fonction pour afficher dans un ordre aléatoire les propositions gauche et droite
    function genererTableauAleatoire(nbrePropositions) {
        const tableauAleatoire = [];

        while (tableauAleatoire.length < nbrePropositions) {
            const valeurAleatoire = Math.floor(Math.random() * nbrePropositions);
            if (!tableauAleatoire.includes(valeurAleatoire)) {
                tableauAleatoire.push(valeurAleatoire);
            }
        }

        return tableauAleatoire;
    }

    // Dessiner les points sur le canvas
    function drawPoints() {
        // Générer un tableau aléatoire
        const tableauAleatoireGauche = genererTableauAleatoire(nbrePropositions);
        const tableauAleatoireDroite = genererTableauAleatoire(nbrePropositions);

        // Itérateur pour parcourir les tableaux de propositions aléatoire
        let itGauche = 0;
        let itDroite = 0;

        // Parcourir les tableaux de points
        for (let point of left.concat(right)) {
            // Définir la couleur du point
            ctx.fillStyle = point.color;

            // Commencer un tracé de cercle
            ctx.beginPath();
            ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);

            // Remplir le cercle
            ctx.fill();

            // Ajouter du texte à côté des points
            ctx.font = "15px sans-serif";
            ctx.fillStyle = "black";
            if (point.side === "left") {
                ctx.fillText(prop_gauche[tableauAleatoireGauche[itGauche]], point.x - decalage, point.y + 5);
                point.propLinked = prop_gauche[tableauAleatoireGauche[itGauche]];
                itGauche++;
            } else {
                ctx.fillText(prop_droite[tableauAleatoireDroite[itDroite]], canvas.width - decalage, point.y + 5);
                point.propLinked = prop_droite[tableauAleatoireDroite[itDroite]];
                itDroite++;
            }
        }
    }

    // Dessiner une ligne entre deux points
    function drawLine(point1, point2) {
        // Définir la couleur de la ligne
        ctx.strokeStyle = "black";

        // Commencer un tracé de ligne
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);

        // Dessiner la ligne
        ctx.stroke();
    }

    // Gérer le clic sur le canvas
    function handleClick(event) {
        // Récupérer les coordonnées du clic
        let x = event.offsetX;
        let y = event.offsetY;

        // Parcourir les tableaux de points
        for (let point of left.concat(right)) {
            // Calculer la distance entre le clic et le point
            let distance = Math.sqrt(Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2));

            // Vérifier si le clic est dans le rayon du point
            if (distance <= radius) {
                // Si aucun point n'est sélectionné
                if (selected == null) {
                    // Si le point est déjà connecté à un autre point
                    if (point.connectedTo != null) {
                        // Supprimer la connexion
                        point.connectedTo.connectedTo = null;
                        point.connectedTo = null;

                        // Redessiner les points et les lignes
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        drawPoints();
                        for (let p of left.concat(right)) {
                            if (p.connectedTo != null) {
                                drawLine(p, p.connectedTo);
                            }
                        }
                    } else {
                        // Sélectionner le point cliqué
                        selected = point;
                    }
                }
                // Si un point est déjà sélectionné et qu'il est de l'autre côté
                else if (selected.side != point.side) {
                    // Dessiner une ligne entre les deux points
                    drawLine(selected, point);

                    // Mettre à jour les connexions
                    selected.connectedTo = point;
                    point.connectedTo = selected;

                    // Désélectionner le premier point
                    selected = null;
                }
                break;
            }
        }
    }

    // Ajouter un écouteur d'événement sur le clic du canvas
    canvas.addEventListener("click", handleClick);

    // Dessiner les points au chargement de la page
    drawPoints();

    // Ajoutez cet écouteur d'événement pour le bouton "Valider l'appariement" à la fin de la fonction main()
    document.getElementById("validateButton").addEventListener("click", saveResults);

}

function saveQuestionToServer(questionJSON) {
    fetch("/api/save_json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(questionJSON) // Convertir l'objet en chaîne JSON
    }).then((response) => {
      if (response.ok) {
        alert("Question sauvegardée avec succès !");
      } else {
        alert("Erreur lors de la sauvegarde de la question.");
      }
    });
  }
  

// Ajoutez cette fonction pour enregistrer les résultats
function saveResults() {
    const results = {};

    for (const point of left) {
        if (point.connectedTo) {
            results[point.propLinked] = point.connectedTo.propLinked;
        }
    }

    // Télécharger le fichier JSON
    saveQuestionToServer(results);
}

main();