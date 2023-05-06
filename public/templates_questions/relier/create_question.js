let questionnaireName;

function parseQuestionnaireName() {
  const urlParams = new URLSearchParams(window.location.search);
  questionnaireName = urlParams.get("questionnaireName");
  console.log(questionnaireName)
  return questionnaireName;
}

window.onload = function () {
  questionnaireName = parseQuestionnaireName();
}

document.getElementById("num-propositions").addEventListener("change", createPropositionsForm);
document.getElementById("create-question-form").addEventListener("submit", createQuestionJSON);

function createPropositionsForm() {
  const numPropositions = document.getElementById("num-propositions").value;
  const container = document.getElementById("propositions-container");
  container.innerHTML = "";
  
  for (let i = 1; i <= numPropositions; i++) {
    const labelLeft = document.createElement("label");
    labelLeft.innerHTML = `Proposition gauche ${i} : `;
    const inputLeft = document.createElement("input");
    inputLeft.type = "text";
    inputLeft.id = `proposition-left-${i}`;
    
    const labelRight = document.createElement("label");
    labelRight.innerHTML = `Proposition droite ${i} : `;
    const inputRight = document.createElement("input");
    inputRight.type = "text";
    inputRight.id = `proposition-right-${i}`;
    
    container.appendChild(labelLeft);
    container.appendChild(inputLeft);
    container.appendChild(labelRight);
    container.appendChild(inputRight);
  }
}

function saveQuestionToServer(questionJSON) {
  fetch("/api/save_question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(questionJSON)
  }).then((response) => {
    if (response.ok) {
      alert("Question sauvegardée avec succès !");
    } else {
      alert("Erreur lors de la sauvegarde de la question.");
    }
  });
}


function createQuestionJSON(event) {
  event.preventDefault();
  
  const questionnaireName = parseQuestionnaireName();

  const questionName = document.getElementById("question-name").value;
  const numPropositions = document.getElementById("num-propositions").value;
  const propositionsLeft = [];
  const propositionsRight = [];
  const correctMatches = {};
  
  for (let i = 1; i <= numPropositions; i++) {
    const propLeft = document.getElementById(`proposition-left-${i}`).value;
    const propRight = document.getElementById(`proposition-right-${i}`).value;
    propositionsLeft.push(propLeft);
    propositionsRight.push(propRight);
    correctMatches[propLeft] = propRight;
  }

  const questionJSON = {
    titre_question: questionName,
    propositions_gauche_ecran: propositionsLeft,
    propositions_droite_ecran: propositionsRight,
    correspondances_correctes: correctMatches,
    questionnaireName: questionnaireName
  };

  saveQuestionToServer(questionJSON);
}

