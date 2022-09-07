// Importe le module Express
const express = require('express');
// Importe le module de Mongoose
const mongoose = require('mongoose');
// Importe le module Morgan
const morgan = require('morgan');

const dotenv = require('dotenv');
const result = dotenv.config();

// Constantes des routes
const userRoutes = require('./routes/user');
//const saucesRoutes = require('./routes/sauces')

// Crée une app express
const app = express();
// Importe le module Body-parser
const bodyParser = require('body-parser');
// Logger les 'request' & 'response'
app.use(morgan('dev'));


// Permet de communiquer entre les deux serveurs
mongoose.connect('mongodb+srv://MDI93:dNj7ZVw1gHAv0gaT@cluster0.u6qamku.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// Si on a utilisé mongoose.connect()
mongoose.connection.close();

// CORS (Cross-Origin Request Sharing)
app.use((req, res, next) => {
// Ce header permet d'accéder à notre API depuis n'importe quelle origine ( '*' )
  res.setHeader('Access-Control-Allow-Origin', '*');
// Ce header permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
// Ce header permet d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use((req, res, next) => {
//   console.log(res);
//   res.json({ message: 'Test réussi !' }); 
//   next();
// });
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
//app.use('/api/sauces', saucesRoutes);


module.exports = app;