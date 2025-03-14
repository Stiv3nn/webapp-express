// IMPORTIAMO IL FILE DI CONNESSIONE AAL DATABASE
const connection = require('../data/db');

// GRUPPO DELLE FUNZIONI DELLA LOGICA RELATIVA ALLE ROTTE DELLE FILM
function index(req, res) {

    // QUERY DI RICHIESTA FILM
    const moviesSql = "SELECT * FROM movies";

    connection.query(moviesSql, (err, result) => {

        if (err) return res.serverStatus(500).json({ error: 'Database query failed' });

        // VERSIONE MAPPATA DEL RISULTATO
        const movies = result.map(movie => {
            return {
                
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        res.json(movies);

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

            // AGGIUNGIAMO IL VALORE
            movie.image = req.imagePath + movie.image

            // RITONIAMO L'OGGETTO COMPLETO
            res.json(movie);
        });

        
    });
    
}



// INSERIMENTO NUOVO FILM
function store(req, res, next) {

    const {title, director, abstract} = req.body;

    // GESTIAMO IL VALORE DEL NOME FILE CREATO DAL MIDDLEWARE
    const imageName = `${req.file.filename}`;

    // CRE4AIMO LA QUERY DI INSERT
    const query = "INSERT INTO movies (title, director, image, abstract) VALUES (?,?,?,?)";

    connection.query(query,
        [title, director, imageName, abstract],
        (err, results) => {
            if (err) {
                console.log(err)
                return next(new Error("Errore interno del server"))
            }

            res.status(201).json({
                status: "success",
                message: "Film create con successo!"
            });
        }
    )
}


// INSERIMENTO NUOVA REVIEW
function storeReview(req, res) {


    // ID PRESO DAI PARAMETRI
    const {id} = req.params;

    // LE ALTRE INFO DAL BODY, CHE CI DARA' IL FRONTEND
    const {text, name, vote} = req.body;

    // CREAZIONE DELLA SQL
    const insertReviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ? ,?, ?)'

    // ESEGUIAMO LA QUERY
    connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {

        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId});

    });


}



// ESPORTIAMO LE ROTTE
module.exports = {index, show, store, storeReview}