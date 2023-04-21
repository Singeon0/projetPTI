function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function loadQuestion(questionId) {
  fetch(`/api/get_question/${questionId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement de la question");
      }
      return response.json();
    })
    .then((questionJSON) => {
      displayQuestion(questionJSON);
    })
    .catch((error) => {
      console.error(error.message);
      alert("Impossible de charger la question.");
    });
}

function displayQuestion(questionJSON) {
  document.getElementById("question-name").textContent = questionJSON.titre_question;
  const container = document.getElementById("propositions-container");

  // Mélanger les propositions
  shuffleArray(questionJSON.propositions_gauche_ecran);
  shuffleArray(questionJSON.propositions_droite_ecran);

  // Créer un conteneur pour les propositions gauche et droite
  const leftContainer = document.createElement("div");
  leftContainer.className = "proposition-container gauche";
  const rightContainer = document.createElement("div");
  rightContainer.className = "proposition-container droite";

  questionJSON.propositions_gauche_ecran.forEach((prop, index) => {
    const div = document.createElement("div");
    div.className = "proposition gauche";
    div.id = `proposition-gauche-${index}`;
    div.textContent = prop;
    leftContainer.appendChild(div);
  });

  questionJSON.propositions_droite_ecran.forEach((prop, index) => {
    const div = document.createElement("div");
    div.className = "proposition droite";
    div.id = `proposition-droite-${index}`;
    div.textContent = prop;
    rightContainer.appendChild(div);
  });

  container.appendChild(leftContainer);
  container.appendChild(rightContainer);

  setupDragAndDrop(); // Ajoutez cette ligne à la fin de la fonction displayQuestion

}

// Remplacez 'YOUR_QUESTION_ID' par l'ID de la question que vous souhaitez charger
const questionId = '89981';

window.addEventListener("DOMContentLoaded", () => {
  loadQuestion(questionId);
});


// Ajoutez ce code à la fin de votre fichier question.js
function handleDragStart(e) {
  this.style.opacity = "0.4";
  e.dataTransfer.setData("text/plain", this.id);
}

function handleDragEnd(e) {
  this.style.opacity = "1";
}

function handleDrop(e) {
  e.preventDefault();
  const sourceId = e.dataTransfer.getData("text/plain");
  const sourceElement = document.getElementById(sourceId);
  // Dessiner la ligne ici
}

function handleDragOver(e) {
  e.preventDefault();
}

function setupDragAndDrop() {
  const leftPropositions = document.querySelectorAll(".proposition.gauche");
  const rightPropositions = document.querySelectorAll(".proposition.droite");

  leftPropositions.forEach((prop) => {
    prop.setAttribute("draggable", "true");
    prop.addEventListener("dragstart", handleDragStart);
    prop.addEventListener("dragend", handleDragEnd);
  });

  rightPropositions.forEach((prop) => {
    prop.setAttribute("draggable", "true");
    prop.addEventListener("dragstart", handleDragStart);
    prop.addEventListener("dragend", handleDragEnd);
  });

  leftPropositions.forEach((prop) => {
    prop.addEventListener("drop", handleDrop);
    prop.addEventListener("dragover", handleDragOver);
  });

  rightPropositions.forEach((prop) => {
    prop.addEventListener("drop", handleDrop);
    prop.addEventListener("dragover", handleDragOver);
  });
}

function drawLineBetweenElements(sourceElement, targetElement) {
  const canvas = document.getElementById("line-canvas");
  const ctx = canvas.getContext("2d");

  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();

  const startX = sourceRect.right;
  const startY = sourceRect.top + sourceRect.height / 2;
  const endX = targetRect.left;
  const endY = targetRect.top + targetRect.height / 2;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function handleDrop(e) {
  e.preventDefault();
  const sourceId = e.dataTransfer.getData("text/plain");
  const sourceElement = document.getElementById(sourceId);

  if (sourceElement.classList.contains("gauche") && e.target.classList.contains("droite")) {
    drawLineBetweenElements(sourceElement, e.target);
  }
}

// Ajouter un canvas pour dessiner les lignes
function addCanvas() {
  const canvas = document.createElement("canvas");
  canvas.id = "line-canvas";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "absolute";
  canvas.style.zIndex = "-1";
  document.body.appendChild(canvas);
}

window.addEventListener("DOMContentLoaded", () => {
  loadQuestion(questionId);
  addCanvas();
});

window.addEventListener("resize", () => {
  const canvas = document.getElementById("line-canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
