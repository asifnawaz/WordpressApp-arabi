<?php

/// connessione al database mysql
function dbConnect() {
    // 1) connessione al server mysql
    $link = mysqli_connect(
        "localhost", // server mysql (di solito, localhost)
        "root", // nome utente mysql
        "root", // password mysql
        "bootstraptheme" // database al quale connettersi
    );

    // 2) impostazione charset di comunicazione
    mysqli_set_charset($link, "UTF8");
    
    return $link;
}




?>