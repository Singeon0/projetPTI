const fs = require('fs');
const xlsx = require("xlsx");
require('dotenv').config();
const path = require("path");
const express = require('express');
const fetch = require('node-fetch');
const { devNull } = require('os');
const sqlite3 = require('sqlite3').verbose();

//___________save JSON__________________
const bodyParser = require("body-parser");
//_____________________________________________

var statut_response = false;
const app = express();

//___________save JSON__________________
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//_____________________________________________

const port = process.env.PORT || 5500;

//variables globales
const databaseName = 'main.db';
const nombreDeTest = 3;
//connection to localhost at port 3100
app.listen(port, () => console.log('listening at ' + port));
// localhost use the 'public' repertory 
app.use(express.static('public'));
app.use(express.json({ limit: '20mb' }));

const timerCheckGoogleSheet = 300000;

// requetes sur les profs pour afficher les questionnaires dans profs.html
// Ajoutez cette route à votre fichier index.js
app.get('/api/questionnaires/:idProf', (req, res) => {
  const idProf = req.params.idProf;
  const db = new sqlite3.Database(databaseName);

  const query = `
  SELECT q.nom, q.details_questionnaire, q.Id
  FROM questionnaires AS q
  INNER JOIN utilisateurs AS u ON q.Id_utilisateurs = u.Id
  WHERE u.Id = ?;
  `;

  db.all(query, [idProf], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erreur lors de la récupération des questionnaires");
    } else {
      res.json(rows);
    }
  });

  db.close();
});


//---------------------------------Gestion des questionnaires--------------------------------------------------------------

// Gestion des id questionnaires : permet de créer un id sur base du nom du questionnaire
function sumNumbers(numbers) {
  return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}


function stringToNumbers(input) {
  let result = [];
  for (let i = 0; i < input.length; i++) {
    result.push(input.charCodeAt(i));
  }
  return sumNumbers(result);
}



app.get("/api/types_de_questions", (req, res) => {
  const db = new sqlite3.Database(databaseName);

  const query = "SELECT type_question FROM types_de_questions";

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erreur lors de la récupération des types de questions");
    } else {
      res.json(rows);
    }
  });

  db.close();
});


app.post("/api/save_questionnaire", (req, res) => {
  const { idProf, nom, questions } = req.body;
  const db = new sqlite3.Database(databaseName);

  const query = `
    INSERT INTO questionnaires (Id, nom, Id_utilisateurs, details_questionnaire)
    VALUES (?, ?, ?, ?);
  `;

  db.run(query, [idQuestionnaire, nom, idProf, nom], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erreur lors de la sauvegarde du questionnaire");
    } else {
      saveAllQuestions(db, questions, idQuestionnaire, 0, (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).send("Erreur lors de la sauvegarde des questions");
        } else {
          res.status(200).send("Questionnaire et questions sauvegardés");
        }
      });
    }
  });

  function saveQuestion(db, question, idQuestionnaire, callback) {
    const { nom, numero_question } = question;
    const query = `
      INSERT INTO questions (nom, id_questionnaire, numero_question, infos_question)
      VALUES (?, ?, ?, ?);
    `;

    var details_js;
    console.log("ICICICICICCICI");

    if (question.nom == "Relier les bonnes propositions") {

      console.log(req.body.nom + "relier");
      const pathJS = req.body.nom + "relier";
      const filePath = "public/templates_questions/relier/JSON_question/" + stringToNumbers(pathJS) + ".json";

      fs.readFile(filePath, 'utf8', (err, jsonString) => {
        if (err) {
          console.error('Erreur lors de la lecture du fichier:', err);
          return;
        }
        try {
          details_js = JSON.parse(jsonString);
          // Utilisez la variable 'details_js' ici pour effectuer des opérations avec les données JSON
        } catch (error) {
          console.error('Erreur lors de la conversion du JSON en objet:', error);
        }
      });

    }

    console.log(details_js);

    db.run(query, [nom, idQuestionnaire, numero_question, details_js], (err) => {
      callback(err);
    });
  }

  function saveAllQuestions(db, questions, idQuestionnaire, index, finalCallback) {
    if (index < questions.length) {
      saveQuestion(db, questions[index], idQuestionnaire, (err) => {
        if (err) {
          finalCallback(err);
        } else {
          saveAllQuestions(db, questions, idQuestionnaire, index + 1, finalCallback);
        }
      });
    } else {
      finalCallback(null);
    }
  }

  db.close();
});

//__________________________________________Sauvegarde fichier JSON_____________________________

app.post("/api/save_question", (req, res) => {
  const questionJSON = req.body;
  const questionId = stringToNumbers(questionJSON.questionnaireName + "relier"); // afin de différencier l'id de la question relier des autres questions
  console.log(questionJSON.questionnaireName + "relier");
  console.log(questionId);
  const fileName = `${questionId}.json`;
  const filePath = path.join(__dirname, "public/templates_questions/relier/JSON_question", fileName);

  fs.open(filePath, 'w', (err, file) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erreur lors de la création du fichier de question");
    } else {
      fs.writeFile(filePath, JSON.stringify(questionJSON, null, 2), (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).send("Erreur lors de la sauvegarde de la question");
        } else {
          res.status(200).send("Question sauvegardée");
        }
      });
    }
  });
});


app.get("/api/get_question/:id", (req, res) => {
  const questionId = req.params.id;
  const fileName = `question_${questionId}.json`;
  const filePath = path.join(__dirname, "public/templates_questions/JSON_question", fileName);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err.message);
      res.status(404).send("Question introuvable");
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(data);
    }
  });
});

// créez une route pour gérer la requête POST et enregistrer le fichier JSON dans le dossier "JSON_question"
app.post("/api/save_json", (req, res) => {
  const questionJSON = req.body;
  const questionId = Math.floor(Math.random() * (10 ** 6));
  const fileName = `fichier_reponse_${questionId}.json`;
  const filePath = path.join(__dirname, "public/templates_questions/relier/JSON_question", fileName);

  fs.open(filePath, 'w', (err, file) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erreur lors de la création du fichier de question");
    } else {
      fs.writeFile(filePath, JSON.stringify(questionJSON, null, 2), (err) => {
        if (err) {
          console.error(err.message);
          res.status(500).send("Erreur lors de la sauvegarde de la question");
        } else {
          res.status(200).send("Question sauvegardée");
        }
      });
    }
  });
});


//__________________________________________Partie étudiant_____________________________
app.get('/api/get_questionnaire_id', (req, res) => {
  const name = req.query.name;
  const db = new sqlite3.Database(databaseName);

  const query = `
    SELECT Id
    FROM questionnaires
    WHERE nom = ?;
  `;

  db.get(query, [name], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erreur lors de la récupération de l'ID du questionnaire");
    } else {
      if (row) {
        res.json({ questionnaire_id: row.Id });
      } else {
        res.status(404).send("Aucun questionnaire trouvé avec ce nom.");
      }
    }
  });

  db.close();
});

app.get('/api/get_questions', (req, res) => {
  const id = req.query.id;
  const db = new sqlite3.Database(databaseName);

  const query = `
    SELECT nom, infos_question
    FROM questions
    WHERE id_questionnaire = ?;
  `;

  db.all(query, [id], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erreur lors de la récupération des questions");
    } else {
      res.json({ questions: rows });
    }
  });

  db.close();
});
