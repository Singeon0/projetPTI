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
  const idQuestionnaire = parseInt(stringToNumbers(nom), 10);

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

  async function saveQuestion(db, question, idQuestionnaire, callback) {
    const { nom, numero_question } = question;
    const query = `
      INSERT INTO questions (nom, id_questionnaire, numero_question, infos_question)
      VALUES (?, ?, ?, ?);
    `;

    let details_js = {
      titre_question: nom
    }; // Initialise details_js avec une valeur par défaut

    if (question.nom == "Relier les bonnes propositions") {
      // CODE ICI tu dois charger la question depuis la table json_question

      console.log(req.body.nom + "relier");
      const pathJS = req.body.nom + "relier";
      const id_question = stringToNumbers(pathJS);

      // CODE ICI complètes le if
      const queryLoad = "SELECT json FROM json_questions WHERE id_question = ?";
      details_js = await new Promise((resolve, reject) => {
        db.get(queryLoad, [id_question], (err, row) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            if (row) {
              resolve(JSON.parse(row.json));
            } else {
              console.error("Question introuvable");
              reject(new Error("Question introuvable"));
            }
          }
        });
      });
    }

    else if (question.nom == "Hâchure fractions") {
      // CODE ICI tu dois charger la question depuis la table json_question

      console.log(req.body.nom + "hacher");
      const pathJS = req.body.nom + "hacher";
      const id_question = stringToNumbers(pathJS);

      // CODE ICI complètes le if
      const queryLoad = "SELECT json FROM json_questions WHERE id_question = ?";
      details_js = await new Promise((resolve, reject) => {
        db.get(queryLoad, [id_question], (err, row) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            if (row) {
              resolve(JSON.parse(row.json));
            } else {
              console.error("Question introuvable");
              reject(new Error("Question introuvable"));
            }
          }
        });
      });

    }

    console.log(details_js);

    // Convertir l'objet questionJSON en chaîne JSON
    const jsonString = JSON.stringify(details_js, null, 2);

    if (details_js) {
      db.run(query, [details_js.titre_question, idQuestionnaire, numero_question, jsonString], (err) => {
        callback(err);
      });
    } else {
      callback(new Error("Erreur lors de la récupération des détails de la question."));
    }
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

});
//__________________________________________Sauvegarde fichier JSON_____________________________

function isJSON(str) {  // vérifier que qu'une variable est au format JSON
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


app.post("/api/save_question", (req, res) => {
  const questionJSON = req.body;
  console.log(req.body);
  const questionId = stringToNumbers(questionJSON.questionnaireName + questionJSON.questionnaireType); // afin de différencier l'id de la question relier des autres questions
  const db = new sqlite3.Database(databaseName);

  // Convertir l'objet questionJSON en chaîne JSON
  const jsonString = JSON.stringify(questionJSON, null, 2);

  // Vérifier si les données sont au format JSON valide
  if (!isJSON(jsonString)) {
    res.status(400).send("Les données fournies ne sont pas au format JSON valide.");
    return;
  }

  // Requête SQL pour insérer les données dans la table json_questions
  const query = `
    INSERT INTO json_questions (id_question, json)
    VALUES (?, ?);
  `;

  // Exécuter la requête SQL pour insérer les données
  db.run(query, [questionId, jsonString], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erreur lors de l'enregistrement de la question JSON");
    } else {
      res.status(200).send("Question JSON enregistrée");
    }
  });

  // Fermer la connexion à la base de données
  db.close();
});


app.get("/api/get_question/:id", (req, res) => {
  const questionId = req.params.id;
  const db = new sqlite3.Database(databaseName);

  // Requête SQL pour sélectionner les données JSON à partir de l'id_question
  const query = `
    SELECT json
    FROM json_questions
    WHERE id_question = ?;
  `;

  // Exécuter la requête SQL pour récupérer les données JSON
  db.get(query, [questionId], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erreur lors de la récupération de la question");
    } else if (row) {
      res.setHeader("Content-Type", "application/json");
      res.send(row.json);
    } else {
      res.status(404).send("Question introuvable");
    }
  });

  // Fermer la connexion à la base de données
  db.close();
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


app.post('/api/create_notes_eleves_entry', (req, res) => {
  const { nomPrenom, questionnaireId } = req.body;
  const db = new sqlite3.Database(databaseName);
  console.log(req.body)

  const query = `
    INSERT INTO notes_eleves (nom_prenom, id_questionnaire)
    VALUES (?, ?);
  `;

  db.run(query, [nomPrenom, questionnaireId], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Erreur lors de la création de l'entrée dans la table notes_eleves");
    } else {
      //res.status(200).send("Entrée créée avec succès dans la table notes_eleves");
      res.json({ message: "Entrée créée avec succès dans la table notes_eleves" });
    }
  });

  db.close();
});


app.post("/api/save-note", (req, res) => {
  console.log(req.body);
  const { nomPrenom_idQuestionnaire, nom_question, note_obtenu, id_notes_questions } = req.body;
  const db = new sqlite3.Database(databaseName);

  // Insérez les données dans la base de données
  const query = `
    INSERT INTO notes (nomPrenom_idQuestionnaire, nom_question, note_obtenu, id_notes_questions)
    VALUES (?, ?, ?, ?);
  `;

  db.run(query, [nomPrenom_idQuestionnaire, nom_question, note_obtenu, id_notes_questions], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erreur lors de l'enregistrement de la note" });
    } else {
      res.status(200).json({ message: "Note enregistrée avec succès" });
    }
  });

  db.close();
});

