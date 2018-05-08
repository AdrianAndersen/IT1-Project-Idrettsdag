// Henter referansene til databasene
const database = firebase.database();
const idretter = database.ref("idretter/");
const skoler = database.ref("skoler/");
const lag = database.ref("lag/");
// Henter HTML-elementer fra siden
const skjemaRegistrering = document.getElementById("skjemaRegistrering");
const inpLagnavn = document.getElementById("inpLagnavn");
const selSkole = document.getElementById("selSkole");
const selKlasse = document.getElementById("selKlasse");
const selIdrett = document.getElementById("selIdrett");


function nyttLag (event) {
    event.preventDefault();
    let lagnavn = inpLagnavn.value;
    let skole = selSkole.value;
    let klasse = selKlasse.value;
    let idrett = selIdrett.value;
    lag.push(
        {
            "lagnavn": lagnavn,
            "skole": skole,
            "klasse": klasse,
            "idrett": idrett 
        }
    );
    inpLagnavn.value = "";
}
// Lyttefunksjoner
skjemaRegistrering.onsubmit = nyttLag;