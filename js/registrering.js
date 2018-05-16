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

// Populerer selectmenyen for skole
function leggTilSkole(snapshot) {
    let skolenavn = snapshot.key;
    let option = `<option value="${skolenavn}">${skolenavn}</option>`;
    selSkole.innerHTML += option;
}

// Populerer selectmenyen for klasse
function leggTilKlasse(snapshot) {
    let klassenavn = snapshot.key;
    let option = `<option value="${klassenavn}">${klassenavn}</option>`;
    selKlasse.innerHTML += option;
}

// Populerer selectmenyen for Idrett
function leggTilIdrett(snapshot) {
    let idrettsnavn = snapshot.key;
    let option = `<option value="${idrettsnavn}">${idrettsnavn}</option>`;
    selIdrett.innerHTML += option;
}

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
skoler.on("child_added", leggTilSkole);
idretter.on("child_added", leggTilIdrett);