// IMPORTA MULTER, UN MIDDLEWARE PER GESTIRE L'UPLOAD DEI FILE
const multer = require("multer");

// CONFIGURA IL MIDDLEWARE PER IL SALVATAGGIO DEI FILE
const storage = multer.diskStorage({

    // SPECIFICA LA CARTELLA IN CUI SALVARE I FILE CARICATI
    destination: ".public/img/movies",

    // GENERA UN NOME UNIVOCO PER OGNI FILE
    filename: (req, file, cb) => {
        //USA LA DATA ATTUALE PER EVITARE SOVRASCRITTURE DI FILE CON LO STESSO NOME
        const uniqueName = `${Date.now()}-${file.originalname}`;

        // PASSA IL NOME DEL FILE ALLA CALLBACK PER IL SALVATAGGIO
        cb(null, uniqueName);
    }
})

// CREA UN'ISTANZA DI MULTER USANDO LA CONFIGURAZIONE DEFINITA SOPRA
const upload = multer({storage})

// ESPORTA LA CONFIGURAZIONE PER POTERLA USARE IN ALTRI FILE 
module.export = upload;
