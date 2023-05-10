function parseQuestionnaireName() {
  const urlParams = new URLSearchParams(window.location.search);
  const questionnaireName = urlParams.get("questionnaireName");
  return questionnaireName;
}

document.getElementById("create-question-form").addEventListener("submit", createQuestionJSON);

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
  const formu= document.getElementById("form").value;
  const fraction_num = document.getElementById("fraction_num").value;
  const fraction_den = document.getElementById("fraction_den").value;
  
  const questionJSON = {
    titre_question: questionName,
    forme: formu,
    fraction_numerateur: fraction_num,
    fraction_denominateur: fraction_den,
    questionnaireName: questionnaireName
  };

  saveQuestionToServer(questionJSON);
}

