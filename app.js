const express = require('express')
const app = express()
const port = process.env.PORT 

// IMPORTIAMO IL MIDDLEWARE DI CORS
var cors = require('cors')

// IMPORTIAMO IL ROUTER DEI FILM
const moviesRouter = require('./routers/movies')

// IMPORTIAMO IL MIDDLEWARE DI GESTIONE ERRORE SERVER
const errorsHandler = require("./middlewares/errorsHandler");

// IMOPRTIAMO IL MIDDLEWARE DI GESTIONE ERRORE 404
const notFound = require("./middlewares/notFound");

// IMPORTIAMO IL MIDDLEWARE DI GESTIONE PATH IMGS
const imagePathMiddleware = require('./middlewares/imagePath');

// DEFINIAMO L'USO DI UNA CARTELLA PER I FILE STATICI
app.use(express.static('public'));

// REGISTRO IL BODY-PARSER PER "application/json"
app.use(express.json());

// REGISTRO IL MIDDLEWARE DI CORS
app.use(cors({ origin: process.env.FE_APP }))

// REGISTRO IL MIDDLEWARE DI PATH IMGS
app.use(imagePathMiddleware);



// DEFINIAMO LA ROTTA HOME
app.get('/api', (req, res) => {
    res.send("Sono la rotta home, dell'app di recensione film");
})


// UTILIZZIAMO LA ROTTA
app.use("/api/movies", moviesRouter);

// UTILIZZO MIDDLEWARE DI GESTIONE ERRORE SERVER
app.use(errorsHandler);

// UTILIZZO MIDDLEWARE DI GESTIONE NOT FOUND 404
app.use(notFound);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})