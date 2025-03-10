function setImagePath(req, res, next) {

    // CREAIAMO IL PATH ASSOLUTO DELLA IMMAGINE
    req.imagePath = `${req.protocol}://${req.get('host')}/img/movies/`;


    next()
}

module.exports = setImagePath;