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
  const idQuestionnaire = Math.floor(Math.random() * (10 ** 6));

  const query = `
    INSERT INTO questionnaires (Id, nom, Id_utilisateurs, fileName)
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

    db.run(query, [nom, idQuestionnaire, numero_question, null], (err) => {
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
  const questionId = Math.floor(Math.random() * (10 ** 6));
  const fileName = `question_${questionId}.json`;
  const filePath = path.join(__dirname, "public/templates_questions/JSON_question", fileName);

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

