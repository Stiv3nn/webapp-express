const express = require('express')
const app = express()
const port = process.env.PORT

// IMPORTIAMO IL MIDDLEWARE DI GESTIONE ERRORE SERVER
const errorHandler = require("./middleware/errorHandler");

// IMOPRTIAMO IL MIDDLEWARE DI GESTIONE ERRORE 404
const notFound = require("./middleware/notFound");

// DEFINIAMO L'USO DI UNA CARTELLA PER I FILE STATICI
app.use(express.static('public'));

// REGISTRO IL BODY-PARSER PER "application/json"
app.use(express.json());


// DEFINIAMO LA ROTTA HOME
app.get('/', (req, res) => {
    res.send("Sono la rotta home, dell'app di recensione film");
})

// UTILIZZO MIDDLEWARE DI GESTIONE ERRORE SERVER
app.use(errorHandler);

// UTILIZZO MIDDLEWARE DI GESTIONE NOT FOUND 404
app.use(notFound);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})