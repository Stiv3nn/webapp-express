// IMPORTIAMO IL FILE DI CONNESSIONE AAL DATABASE
const connection = require('../data/db');

// GRUPPO DELLE FUNZIONI DELLA LOGICA RELATIVA ALLE ROTTE DELLE FILM
function index(req, res) {

    // QUERY DI RICHIESTA FILM
    const moviesSql = "SELECT * FROM movies";

    connection.query(moviesSql, (err, result) => {

        if (err) return res.serverStatus(500).json({ error: 'Database query failed' });
        res.json(result);

    });
}

function show(req, res) {

    // RECUPERIAMO L'ID DAI PARAMS
    const {id} = req.params;

    // QUERY DI RICHIESTA
    const detailMovie = "SELECT * FROM movies WHERE movies.id = ?";

    // QUERY DI RICHIESTA
    const reviewSql = "SELECT * FROM reviews WHERE movies_id = ?";


    // RICHIEDIAMO I DATI DEL SINGOLO FILM
    connection.query(detailMovie, [id], (err, movieResult) => {

        if (err) return res.serverStatus(500).json({ error: 'Database query failed' });

        if (movieResult.length === 0) return res.serverStatus(404).json({ error: 'Movie not found' });

        // res.json(result[0]);
        const movie = movieResult[0];

        connection.query(reviewSql, [id], (err, reviewResult) => {

            if (err) return res.serverStatus(500).json({ error: 'Database query failed' });
            
            // AGGIORNIAMO L'OGGETTO MOVIE CON LE REVIEW RITORNATE
            movie.reviews = reviewResult;

            // RITONIAMO L'OGGETTO COMPLETO
            res.json(movie);
        });

    });
    
}

// ESPORTIAMO LE ROTTE
module.exports = {index, show}