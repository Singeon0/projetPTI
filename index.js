const fs = require('fs');
const xlsx = require("xlsx");
require('dotenv').config();
const path = require("path");
const express = require('express');
const fetch = require('node-fetch');
const { devNull } = require('os');
const sqlite3 = require('sqlite3').verbose();

var statut_response = false;
const app = express();
const port = process.env.PORT || 3100;

//variables globales
const databaseName = 'main.db';
const nombreDeTest = 3;
//connection to localhost at port 3100
app.listen(port, () => console.log('listening at 3100'));
// localhost use the 'public' repertory 
app.use(express.static('public'));
app.use(express.json({ limit: '20mb' }));


const timerCheckGoogleSheet = 300000;
//------------Outils de développement------------------------------------------------------------------------------------
//outilsDeDeveloppement()
function outilsDeDeveloppement() {
  var doc = {
    prof: "axiome",
    nombre_eleve: "19",
    etablissement: "qfsd",
    classe: "qsdf",
    code_personnel: "axiome@",
    excelFile: false,
    position: false,
    version: 2
  }
  let db2 = new sqlite3.Database(databaseName, err =>{
    if(err)
        throw err;
       db.run("DROP TABLE utilisateurs ")
        db.run("DROP TABLE role ")
        db.run("CREATE TABLE roles (Id INTEGER PRIMARY KEY AUTOINCREMENT, nom varchar(50) NOT NULL)")
          db.run("CREATE TABLE utilisateurs (Id INTEGER PRIMARY KEY AUTOINCREMENT, nom varchar(50) NOT NULL,prenom varchar(50) NOT NULL,nombreQuestionnaire INTEGER, role varchar(50) NOT NULL,FOREIGN KEY(role) REFERENCES roles(Id))")
  
          db.run("CREATE TABLE questionnaires (Id INTEGER PRIMARY KEY AUTOINCREMENT, nom varchar(150) NOT NULL,Id_utilisateurs INTEGER, fileName varchar(150) NOT NULL,FOREIGN KEY(Id_utilisateurs) REFERENCES utilisateurs(Id))")
          db.close()
      console.log("database sur "+databaseName);
        });
  
  
  let db = new sqlite3.Database(databaseName, err =>{
    if(err)
        throw err;
       
        db.serialize((
          
        ) => {
          db.run("CREATE TABLE countClasse (versionTest INTEGER, numberEleve INTEGER,numberProf INTEGER,versionExcel INTEGER)",(err) => {
            if(err)
            throw err;
          });
          db.run("INSERT INTO countClasse (versionTest,numberEleve,numberProf,versionExcel) VALUES (0,0,0,1)",(err) => {
            if(err)
            throw err;
          });
          db.run("INSERT INTO countClasse (versionTest,numberEleve,numberProf,versionExcel) VALUES (1,0,0,1)",(err) => {
            if(err)
            throw err;
          });
          db.run("INSERT INTO countClasse (versionTest,numberEleve,numberProf,versionExcel) VALUES (2,0,0,1)",(err) => {
            if(err)
            throw err;
          });
          db.run("CREATE TABLE excelStatut (ligneExcelActuelle INTEGER)",(err) => {
            if(err)
            throw err;
          });
          db.run("CREATE TABLE eleve (ID INTEGER PRIMARY KEY AUTOINCREMENT , class varchar(50) NOT NULL, IDPersonnelle int NOT NULL,version INTEGER, questionStage int, complet BOOL )",(err) => {
            if(err)
            throw err;
          });
          db.run("CREATE TABLE score (ID INTEGER NOT NULL, numQuestion INTEGER, scoreQuestion varchar(50),versionTest INTEGER,FOREIGN KEY(ID) REFERENCES eleve(ID))",(err) => {
            if(err)
            throw err;
          });
          db.run("CREATE TABLE prof (ID INTEGER PRIMARY KEY AUTOINCREMENT,code varchar(50),nombreEleve INTEGER, etablissement varchar(50),class varchar(50),codePersonelle varchar(50),position INTEGRER, version INTEGRER, excelFile INTEGER)",(err) => {
            if(err)
            throw err;
          });
          db.all("INSERT INTO excelStatut (ligneExcelActuelle) VALUES (1)",(err) => {
            if(err)
            throw err;
          }); 
      console.log("database sur "+databaseName);
        });
  
  });
  console.log("outil effectué");
}

//------------Gestion des points de l'élève------------------------------------------------------------------------------------


// partie api pour les points 
var quest_pos_excel = [];
app.post('/api', (request, response) => {
  const data = request.body.Score;
  const Id_student = request.body.local_Id;
  const question = request.body.question;
  var quest_numb = request.body.quest_numb;
  const sous_quest_numb = request.body.sous_quest_numb;
  const class_student = request.body.local_class;
  const version = request.body.version;
  response.json({
    status: 'success',
    score: data,
    class: class_student,
    Id: Id_student,
    question: question,
    quest_numb: quest_numb,
    sous_quest_numb: sous_quest_numb,
    version: version
  });
  switch (version) {
    case 0:
      quest_pos_excel = [7, 15, 29, 30, 40, 42, 56, "", 62, 72, 74, 80, 86, 87, 91, 96, "", 110, 120, 124];
      break;
    case 1:
      quest_pos_excel = [7, 10, 12, 17,"", 19, 22, 40, 41, 42, 78,"", 99, 111, 123];
      break;
    case 2:
      quest_pos_excel = [7, 10, 14, 22, 26, "", 29, 33, 45, 53, "", 57, 63, 66, 72, 76, 88, 93, "", 96, 109, 112, "", 117, 120];
      break;

  }
  var quest = quest_pos_excel[quest_numb - 1] + sous_quest_numb - 1;
  let db = new sqlite3.Database(databaseName, err =>{
    if(err)
        throw err;
        db.run("INSERT INTO score (ID, numQuestion, scoreQuestion,versionTest) VALUES ((SELECT ID FROM eleve WHERE class = '"+class_student+"' AND IDPersonnelle = "+Id_student+" AND version = "+ version+"),"+quest +",'"+data+"',"+version+" )");
     db.run("UPDATE eleve SET questionStage ="+(quest_numb+1)+" WHERE class = '"+class_student+"' AND IDPersonnelle = "+Id_student+" AND version ="+version);

  

  });
  db.close((err) => {
    if(err)
    throw err;
  });
});


//----------------------------Calcul des points finaux de l'élève------------------------------------------------------------------------------------

app.post('/completed', (request, response) => {
  const class_student = request.body.local_class;
  const Id_student = parseInt(request.body.local_Id);
  const complet = request.body.completed;
  const version = parseInt(request.body.version);

  

    let db = new sqlite3.Database(databaseName, err =>{
      if(err)
          throw err;
            db.run("UPDATE eleve SET complet = true WHERE class = '"+class_student+"' AND IDPersonnelle = "+Id_student+" AND version = "+version);
            db.all("SELECT * FROM score WHERE ID = (SELECT ID FROM eleve WHERE class = '"+class_student+"' AND IDPersonnelle = "+Id_student+") AND versionTest = "+version, (err,data) => {
              graphResponse(response, complet, class_student, Id_student, version,data);

            })
          
    });
  db.close((err) => {
    if(err)
    throw err;
  })
  

  async function graphResponse(response, complet, class_student, Id_student, version,data) {
    //référer à la documentation xlsx npm
    const workbookName2 = ["signe - encodage append to - eleve.xlsx", "phylogénétique - encodage append to - eleve.xlsx", "fractions - encodage append to - eleve.xlsx"]
    var wb2 = xlsx.readFile("sheet template folder/" + workbookName2[version], { cellFormula: true });
    var ws = wb2.Sheets["Analyse détaillé"];
    const stopExcelColumn = ["EF","FS","HB"];
    const startExcelColumn = ["G","H","H"];
    const excelLigneEncode = ["3","4","3"];
    const excelLigneFormule = ["4","5","4"];


   


        await excelFunction_completed(ws, class_student, Id_student, version, data,excelLigneEncode[version]); // On entre les données dans le fichier excel

        ws = excelNewCalc(ws, stopExcelColumn[version], startExcelColumn[version],excelLigneFormule[version],excelLigneEncode[version]);

        var données = extraireResultatExcel(ws, version);

        await response.json({
          status: 'success',
          complet: complet,
          class: class_student,
          Id: Id_student,
          version: version,
          données: données
        }); //fin response.json
      } 

});//fin app.POST


async function excelFunction_completed(ws, class_student, Id_student, version, data,excelLigneEncode) {
  //on itére pour chaque question de l'élève ("question" est une matrice contenant touts les points avec pour chaque entrée le score et le numéro de la question)
  await data.forEach(sousFunction)
  function sousFunction(num) {
    //excel pour le prof
    var b = (num.numQuestion % 26 + 10).toString(36).toUpperCase();
    var c = parseInt(num.numQuestion / 26);
    var d;
    switch (c) {
      case 0: d = '';
        break;
      case 1: d = 'A';
        break;
      case 2: d = 'B';
        break;
      case 3: d = 'C';
        break;
      case 4: d = 'D';
        break;
      case 5: d = 'E';
        break;
      case 6: d = 'F';
        break;
      case 7: d = 'G';
        break;
      case 8: d = 'H';
        break;
      case 9: d = 'I';
        break;

    }
    var Var = d + b + excelLigneEncode; //titre de la colonne dans la fiche excel
    ws[Var].v = parseInt(num.scoreQuestion).toString(); // on accéde à la valeur de la case (.v) et on lui passe le score
    
  } //fin sousFunction
  //fin find
  ;
} //fin excelFunction




//--------------------------------- gestion des formules excels ----------------------------------------------------------------------------------------


function excelNewCalc(ws, stopExcelColumn, startExcelColumn,excelLigneFormule,excelLigneEncode) {
  var column = 0;
  var start = false;
  // génére les noms de colonnes excel (A,B,...,AA,AB,...) jusqu'à stop, si stop = EA, on génére jusque EA
  for (var i = 0; i < 10; i++) {
    if (column == stopExcelColumn) { break; }
    for (var j = 1; j < 27; j++) {
      column = String.fromCharCode(96 + j);
      if (i != 0) { column = String.fromCharCode(96 + i) + column; }
      column = column.toUpperCase();
      if (column == startExcelColumn) { start = true; }
      if (start) {
        //pour chaque colonne, on effectue la formule
        var formule = ws[column + excelLigneFormule].f;
        var valeur = executeExcelFormula(formule, ws,excelLigneFormule,excelLigneEncode);
        ws[column + excelLigneFormule].v = valeur;               //encode la formule
      }
      if (column == stopExcelColumn) { break; }
    }
  }
  return ws;
}



function executeExcelFormula(formule, ws,excelLigneFormule,excelLigneEncode) {
  //gére quand il n'y a pas de formules
  if (formule == "0") { return 0; }

  //gére les countif
  if (formule.includes("COUNTIF")) {
    var value = 0;
    formule = formule.replace(new RegExp(" ", 'g'), "");
    const splitFormule = formule.split("+");
    
    for (var i = 0; i < splitFormule.length; i++) {
  
      splitFormule[i] = splitFormule[i].slice(8);
      splitFormule[i] = splitFormule[i].replace(')', '');
      splitFormule[i] = splitFormule[i].replace('(', '');
      splitFormule[i] = splitFormule[i].replace(new RegExp(" ", 'g'), "");
      const conditions = splitFormule[i].split(",");
      conditions[1] = conditions[1].replace(new RegExp('"', 'g'), '');
      //----------------------gérer différement si on a un ":"----------------------------------------------------------------
      if (splitFormule[i].includes(":")) {

        const splitCondition = conditions[0].split(":");
        const stopExcelColumn = splitCondition[1];


        const startExcelColumn = splitCondition[0];

        var start = false;
        var column = 0;
        for (var k = 0; k < 10; k++) {
          if (column == stopExcelColumn) { break; }
          for (var j = 1; j < 27; j++) {
            column = String.fromCharCode(96 + j);
            if (k != 0) { column = String.fromCharCode(96 + k) + column; }
            column = column.toUpperCase() + excelLigneEncode;


            if (column == startExcelColumn) { start = true; }
            if (start) {

              // pour chaque colonne on vérifie la condition

              const valeur = ws[column].v;

              if (valeur == conditions[1]) {
                value = value + 1;
              }
            }
            if (column == stopExcelColumn) { break; }
          }
        }
      }
      //----------------------------------------------------------------------------------
      else {
        const valeur = ws[conditions[0]].v;
        if (valeur == conditions[1]) {
          value = value + 1;
        }
      }


    }
    return value;
  }
  //----------------------gére les division---------------------------------------------------------
  if (formule.indexOf('/') !== -1) {
    const splitFormule = formule.split("/");

    var valeur = parseInt(ws[splitFormule[0]].v);
    var num = parseInt(splitFormule[1]);
    var valeurfinale = valeur / num;

    return valeurfinale.toString();

  }
  //----------------------gére les additions----------------------------------------------------------
  if (formule.indexOf('+') !== -1) {
    const splitFormule = formule.split("+");

    var valeur = 0;
    for (var i = 0; i < splitFormule.length; i++) {

      valeur = valeur + parseInt(ws[splitFormule[i]].v);
    }
    return valeur.toString();
  }
}

function extraireResultatExcel(ws, version) {
  var dataPosition = [["S4", "BO4", "CY4", "DL4", "EF4"], ["S5","AN5","AR5","DB5","FS5"], ["AT4", "CF4", "CR4", "DR4", "FJ4", "GL4", "HB4"]];
  var données = [];
  for (let i = 0; i < dataPosition[version].length; i++) {
    données[i] = ws[dataPosition[version][i]].v;
  }
  return données
}


//--------------------------Partie login étudiant----------------------------------------------------------------------------

app.post('/login', (request, response) => {
 
  var test2;

  const Id_student = request.body.local_Id;
  const class_student = request.body.local_class;
  const version = request.body.version;
  let db = new sqlite3.Database(databaseName, err =>{
    if(err)
        throw err;
       db.get("SELECT * FROM prof WHERE code = '"+class_student+"'AND version = "+version,(err,data) => {
        if(data !== undefined){
        var a = parseFloat(Id_student);
        var b = parseInt(data.nombreEleve);
        //Si l'Id de l'éléve est compris entre 0 (non inclus) et le nombre d'éléve du prof et que l'Id est un integer (sinon on peut avoir des problémes avec les virgules ou les codes asccii)
        if (b >= a && a > 0 && Number.isInteger(a) == true) {
           // sinon on a déjà une entrée, on la cherche afin de récupérer stage_numb (elle indique à quelle question se trouve l'élève, comme ça si il quitte la page il peut reprendre snas recommencer de 0)
              var passer = 1;
              db.get("SELECT * FROM eleve WHERE class = '"+class_student+"' AND IDPersonnelle = "+Id_student+" AND version ="+version, (err, data) => {
                passer = data.questionStage;
                statut_response = true;
                response.json({
                  statut: statut_response,
                  class: class_student,
                  Id: Id_student,
                  class_wrong: false,
                  passer: passer
                });
                passer = 1;
                statut_response = false;
              })
            }
          //si l'Id n'est pas dans les bornes spécifiés alors on renvoie une erreur avec class_wrong = false pour indiquer que le problème vient de l'Id
          else {
          statut_response = false;
          response.json({
            statut: statut_response,
            class: class_student,
            Id: Id_student,
            class_wrong: false,
            passer: 1
          });
        }
      }
      // on n'a pas 1 compte prof (0 ou plus de 1) alors on renvoie comme statut = false dans la réponse + class_wrong = true (qui indique que le problème vient du code classe)
     else {
      statut_response = false;
      response.json({
        statut: statut_response,
        class: class_student,
        Id: Id_student,
        class_wrong: true,
        passer: 1
      });
    }
  })
  });
  db.close((err) => {
    if(err)
    throw err;
  })
  
});



//-------------------Gestion de la création de classe---------------------------------------------------------------------------------------------------------

// toutes les 10mins, on appelle l'api du ficher google sheet contenant les infos sur la création d'une classe et on reçoit un fichier json
setInterval(connect_to_googleSheet, timerCheckGoogleSheet);
//-----------------------------------------------------------------------------------------
// connecter à la google sheet dans laquelle sont stocké les demdandes de créations de classes,
//on récupére les nouvelles lignes pour créer une classe

function connect_to_googleSheet() {
  const sheetId = '1-skGN-Q1-7ZPyEmPF7o6Gbec7NwnUeKuOE50EJApXpQ';
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = 'Test pédagogiques : création des classes';
  const query = encodeURIComponent('Select *')
  const url = `${base}&sheet=${sheetName}&tq=${query}`
  fetch(url)
    .then(res => res.text())
    .then(rep => {
      //Remove additional text and extract only JSON:
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      // se connecte à la base de donnée
      let db = new sqlite3.Database(databaseName, err =>{
        if(err)
            throw err;
    
        // on récupére la position dans le fichier excel
         db.all("SELECT * FROM excelStatut ", (err,data) => {
          var statutExcelClasse = data[0].ligneExcelActuelle
          while (jsonData.table.rows[statutExcelClasse] != undefined) {
            const data = jsonData.table.rows[statutExcelClasse].c;
            const code_prof = data[9].v;
            const nombre_eleve = data[7].v;
            const etablissement = data[5].v;
            const classe = data[6].v;
            const code_personnel = data[10].v;
            // on regardre dans la base de donné si il y a déjà un prof avec le même code 
            db.get("SELECT * FROM prof WHERE code = '"+code_prof+"'",(err,data2) => {
              console.log('data2 :>> ', data2);
              if(data2 === undefined){
                //si on a pas de prof, on crée une entrée prof pour chaque test et on crée ses élèves
                  for(var i = 0; i < nombreDeTest; i++){
                    db.run("INSERT INTO prof(code,nombreEleve,etablissement,class,codePersonelle,position,version,excelFile) VALUES ('"+code_prof+"','"+nombre_eleve +"','"+etablissement+"','"+classe+"','"+code_personnel+"',"+0+","+i+","+0+")")
                    for (var j = 0; j < nombre_eleve; j++){
                      db.run("INSERT INTO eleve (class, IDPersonnelle,version,questionStage,complet) VALUES ('"+code_prof+"',"+(j+1)+","+i+",1,false)");
                    }
                  }
              }
            })
            statutExcelClasse++;
  
          }
          //on update la position dans le fichier excel
          db.run("UPDATE excelStatut SET ligneExcelActuelle ="+statutExcelClasse, () => {
            db.close((err) => {
              if(err)
              throw err;
            })
            
          });
        }) 
      });

    }
    )
  }

  //---------------partie fichier excel du prof------------------------------------------

  app.get('/download', function (req, res) {
    console.time("download called");
    var codePersonnel = req.query.name; //on récupère le code personnel du prof 
    var workbookProf = Number(req.query.sheet); //on récupére le numéro du workbook (chaque test à un workbook différent)
    const workbookName2 = ["signe - encodage append to - prof.xlsx", "phylogénétique - encodage append to - prof.xlsx", "fractions - encodage append to - prof.xlsx"]
    const workbookName4 = ["signe - encodage - out - recherche.xlsx", "phylogénétique - encodage out - recherche.xlsx", "fractions - encodage - out - recherche.xlsx"]
    let db = new sqlite3.Database(databaseName, err =>{
      if(err)
          throw err;
          // on cherche une classe qui correspond au code entré
        db.get("SELECT * FROM prof WHERE codePersonelle = '"+codePersonnel+"' AND version = "+workbookProf,(err,data_classe) => {

          if(err)
          throw err;
      if (data_classe !== undefined) { //si on a une entrée ...
        var position = parseInt(data_classe.position);
        var class_excelFile = parseInt(data_classe.excelFile);
        console.log('class_excelFile :>> ', class_excelFile);
        var nombreEleve = data_classe.nombreEleve;
        var classe_name = data_classe.code;//on récupére le code classe du prof en question          
          //on lit le fichier contenant la structure pour les données 
          var wb2 = xlsx.readFile("sheet template folder/" + workbookName2[workbookProf]);
          var wb4 = xlsx.readFile("sheet folder/" + workbookName4[workbookProf]);
          //on prend la sheet pour stocker les données
          var ws2 = wb2.Sheets["résultats bruts"]               
          var ws4 = wb4.Sheets["résultats bruts"]
       
          // on itére pour chaque entrée (= 1 élève)
          var firstTime;
          // on récupére les info du fichier de recherche
          db.get("SELECT * FROM countClasse WHERE versionTest = "+workbookProf,(err,doc_workbook) => {
            if(err)
            throw err;
            var excelFile = doc_workbook.versionExcel;
            var eleve_count = Number(doc_workbook.numberEleve);
            // on récupére les points de tous les élèves de la classe
                 writeExcelFile(class_excelFile,position,excelFile, ws2,wb2,ws4,wb4, firstTime, eleve_count, nombreEleve, workbookName4, workbookProf, classe_name,res,db);
              
            })
          
        }
      });
    });
  });


 function writeExcelFile(class_excelFile,position, excelFile, ws2, wb2,ws4,wb4, firstTime, eleve_count, nombreEleve, workbookName4, workbookProf, classe_name,res,db) {
  

  
  //On fait un join pour avoir tous les points des élèves qui ont fini le test et qui appartiennent à la classe
  db.all("SELECT * FROM score JOIN eleve ON eleve.ID = score.ID WHERE eleve.class = '"+classe_name+"' AND eleve.complet = true AND score.versionTest = "+ workbookProf+" AND eleve.version = " +workbookProf,(err,liste_score) => {
    if(err)
    throw err;
    for(let i = 0; i < liste_score.length;i++){
    firstTime = insertScoreInExcelFile(liste_score[i].IDPersonnelle, liste_score[i],ws2,ws4,firstTime,class_excelFile,position,excelFile,eleve_count);
    }
    var colonneClasse = "D";
    var colonneId = "E";
    if (firstTime == true) { //si c'est la première fois que la classe est ajouté au fichier excel de recherche alors on rajoute leur classe et leur Id devant les lignes dédié à cette classe dans le fichier
      for (let i = 0; i < nombreEleve; i++) {
        console.log(colonneClasse+(parseInt(eleve_count) + i).toString());
        ws4[colonneClasse+(parseInt(eleve_count) + i).toString()].t = "s";
        ws4[colonneClasse+(parseInt(eleve_count) + i).toString()].v = classe_name;
        ws4[colonneId+(parseInt(eleve_count) + i).toString()].v = i+1;
      }
      //on update la base de donnée pour avoir la position de la classe dans le fichier excel de recherche et on défini la version du fichier à laquelle la classe a été ajouté (excelFile)
      excelFile = 1;
      db.run("UPDATE prof SET excelFile = "+excelFile+" , position = "+ eleve_count+" WHERE version = "+workbookProf + " AND code = '"+classe_name+"'", (err) => {
        if(err)
        throw err;
      });
      var nouveauNombreEleve = parseInt(eleve_count) + parseInt(nombreEleve);
      //on update le nombre d'élève dans le fichier de recherche 
      db.run("UPDATE countClasse SET numberEleve = "+ nouveauNombreEleve, (err) => {
        if(err)
        throw err;
      });
    } 
    try{
          out =xlsx.writeFile(wb2, 'sheet folder/out_' + classe_name + '.xlsx');
          xlsx.writeFile(wb4, 'sheet folder/' + workbookName4[workbookProf]);// on crée un fichier avec le workbook
    }
 catch(err){
  console.log('err :>> ', err);
 }
    res.download('sheet folder/out_' + classe_name + '.xlsx', function (error) {
        if (error) {
          console.log("Error : ", error);
        }
        fs.unlink('sheet folder/out_' + classe_name + '.xlsx', (err) => {
          if (err) {
            throw err;
          }
        })
        db.close((err) => {
          if(err)
          throw err;
        })
        res.end();
      });
    });// on crée un fichier avec le workbook  
    
    // on laisse 1sec pour être sur que le fichier excel soit fini d'être écris et puis on le télécharge côté client
    //await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  
    
  }

  function insertScoreInExcelFile(Id,num,ws2,ws4,firstTime,class_excelFile,position,excelFile,eleve_count)
  {               
     var cellule = makeColonneNameFromANumber(num,Id);
     console.log('cellule[0]+cellule[1] :>> ', cellule[0]+cellule[1]);
      ws2[cellule[0]+cellule[1]].v = num.scoreQuestion // ws2[cellule[0]+cellule[1]] correspond à une cellule du tableau excel              
     // dans le cas où la valeur qui est passée est un string, il faut changer le type de la cellule excel en string (t = "s") sinon on a des fichiers corrompus
      if(num.scoreQuestion == "0A" || num.scoreQuestion == "0B" || num.scoreQuestion == "0C" || num.scoreQuestion == "0D" || num.scoreQuestion == "0E" ||num.scoreQuestion == "0F"|| num.scoreQuestion == "1A"|| num.scoreQuestion == "1B"|| num.scoreQuestion == "1C"|| num.scoreQuestion == "Do not consider this column" )
      {
        ws2[cellule[0]+cellule[1]].t = "s";
      }
      //excel pour l'équipe de recherche (on ajoute toutes les classes dans le même fichier, les une après les autres)
  
     if (class_excelFile !== 0) { //si la classe a déjà été traduit en fichier excel alors on utilise la position par rapport au document qu'on lui a attribué (position)
      if(class_excelFile == excelFile ){
       var temp = (parseInt(Id) + parseInt(position) - 1);
       ws4[cellule[0]+temp.toString()].v = num.scoreQuestion;
       if(num.scoreQuestion == "0A" || num.scoreQuestion == "0B" || num.scoreQuestion == "0C" || num.scoreQuestion == "0D" || num.scoreQuestion == "0E" ||num.scoreQuestion == "0F"|| num.scoreQuestion == "1A"|| num.scoreQuestion == "1B"|| num.scoreQuestion == "1C"|| num.scoreQuestion == "Do not consider this column" )
       {
         ws4[cellule[0]+temp.toString()].t = "s";
       }
     }
       firstTime = false;
     } else { //si la classe n'a jamais été traduit en fichier excel, on utilise la derniére ligne à laquelle on est arrivé dans le fichier(sauvegardé dans la database) et on l'utilise comme ligne de départ
       var temp = (parseInt(Id) + parseInt(eleve_count) - 1);
       ws4[cellule[0]+temp.toString()].v = num.scoreQuestion;
       if(num.scoreQuestion == "0A" || num.scoreQuestion == "0B" || num.scoreQuestion == "0C" || num.scoreQuestion == "0D" || num.scoreQuestion == "0E" ||num.scoreQuestion == "0F"|| num.scoreQuestion == "1A"|| num.scoreQuestion == "1B"|| num.scoreQuestion == "1C"|| num.scoreQuestion == "Do not consider this column" )
       {
         ws4[cellule[0]+temp.toString()].t = "s";
       }
       firstTime = true;
     }
     return firstTime
   }

function makeColonneNameFromANumber(num, Id){
     var Var = [] ;                
     var numero = num.numQuestion;                
     if (numero <= 25){                
      Var[0]  =  String.fromCharCode(97 + numero);                
     }
     else
     {
      Var[0]  =  String.fromCharCode(96 + Math.floor(numero/26));              
       Var[0]  +=  String.fromCharCode(97 + ((numero)% 26));               
     }
     Var[0] =  Var[0].toUpperCase();               
      Var[1] = (parseInt(Id)+2).toString();    
  return Var
}


  //------------------------------Partie fichier excel de la recherche---------------------------------------------------------------------------
  app.get('/recher', (req, res) => {
    var num = req.query.num;
    var TabExcelName = ['signe - encodage - out - recherche.xlsx', "phylogénétique - encodage - out - recherche.xlsx", "fractions - encodage - out - recherche.xlsx"]
    res.download("sheet folder/" + TabExcelName[num], function (error) {
      if (error) {
        console.log("Error : ", error);
      } else {
        res.end();
      }
    });
  });
  //renvoie le fichier html du test choisi (passe par l'URL)
  app.get('/signe', (req, res) => {
    var num = Number(req.query.num);
    switch (num) {
      case 1:
        res.sendFile(path.join(__dirname, 'public/signe moins/index_signe.html'), (err) => {
          if (err) {
            console.log(err);
          } else {
          }
          res.end();
        });
        break;
      case 2: res.sendFile(path.join(__dirname, 'public/classification phylo/index_phylo.html'), (err) => {
        if (err) {
          console.log(err);
        } else {
        }
        res.end();
      });
        break;
      case 3:
        res.sendFile(path.join(__dirname, 'public/fractions/index_fractions.html'), (err) => {
          if (err) {
            console.log(err);
          } else {
          }
          res.end();
        });
        break;
    }

  });

