const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient // le pilote 

app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public')) // pour utiliser le dossier public

/* on associe le moteur de vue au module «ejs» */
app.set('view engine', 'ejs'); // générateur de template

let db // variable qui contiendra le lien sur la BD


///////////////////////////////////////////////////// Connexion à mongoDB et au serveur Node.js
MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
 if (err) return console.log(err)
 db = database.db('carnet_adresse');

app.listen(8081, () => {
 console.log('connexion à la BD et on écoute sur le port 8081')
 })
})

app.get('/', (req, res) => {
 	res.render('accueil.ejs') 

 })
app.get('/list', (req, res) => {
    let cursor = db.collection('adresse')
                .find().toArray(function(err, resultat){
 	if (err) return console.log(err)	
 	console.log(JSON.stringify(resultat))	
 	// transfert du contenu vers la vue index.ejs (renders)
 	// affiche le contenu de la BD
 	res.render('adresses.ejs', {adresses: resultat}) 

 })    
    
app.post('/ajouter', (req, res) => {
 		db.collection('adresse').save(req.body, (err, result) => {
 		if (err) return console.log(err)
 			console.log('sauvegarder dans la BD')
 			res.redirect('/')
 		})
	})                                
})