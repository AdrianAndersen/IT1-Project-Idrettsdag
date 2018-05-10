// Henter referansene til databasene
const database = firebase.database();
const idretter = database.ref("idretter/");
const skoler = database.ref("skoler/");
const lag = database.ref("lag/");
// Henter HTML-elementer fra siden
const skjemaNyIdrett = document.getElementById("skjemaNyIdrett");
const skjemaEndreIdretter = document.getElementById("skjemaEndreIdretter");
const selIdrettAdmin = document.getElementById("selIdrettAdmin");
const skjemaEndreSkoler = document.getElementById("skjemaEndreSkoler");
const selSkoleAdmin = document.getElementById("selSkoleAdmin");
const skjemaEndreLag = document.getElementById("skjemaEndreLag");
const selLagAdmin = document.getElementById("selLagAdmin");

const knappNyIdrett = document.getElementById("knappNyIdrett");

function visSkjemaNyIdrett(event) {
    console.log("Viser skjema");
    skjemaNyIdrett.style.display = "block";
}

// Lyttefunskjoner
knappNyIdrett.addEventListener("click", visSkjemaNyIdrett);