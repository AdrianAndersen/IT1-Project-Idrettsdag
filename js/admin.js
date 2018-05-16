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

const knappVisSkjemaNyIdrett = document.getElementById("knappVisSkjemaNyIdrett");
const knappLeggTilNyIdrett = document.getElementById("knappLeggTilNyIdrett");
const knappAvbrytNyIdrett = document.getElementById("knappAvbrytNyIdrett");

const lagliste = document.getElementById("lagliste");

function visSkjemaNyIdrett(event) {
    skjemaNyIdrett.style.display = "grid";
    skjemaEndreIdretter.style.display = "none";
    knappVisSkjemaNyIdrett.style.display = "none";
}
function skjulSkjemaNyIdrett(event) {
    skjemaNyIdrett.style.display = "none";
    skjemaEndreIdretter.style.display = "block";
    knappVisSkjemaNyIdrett.style.display = "block";
}

function nyIdrett(event) {
    event.preventDefault();
    let navn = inpIdrettAdmin.value;
    let oppmotested = inpOppmotested.value;
    let oppmotetid = inpOppmotetid.value;
    idretter.push(
        {
            "oppmotested": oppmotested,
            "oppmotetid": oppmotetid
        }
        )
}

function leggTilIdretter(snapshot) {
    let idrett = snapshot.key;
    let option = `<option value="${idrett}">${idrett}</option>`;
    selIdrettAdmin.innerHTML += option;
}

function leggTilSkoler(snapshot) {
    let skole = snapshot.key;
    let option = `<option value="${skole}">${skole}</option>`;
    selSkoleAdmin.innerHTML += option;
}

function leggTilLag(snapshot) {
    let lag = snapshot.key;
    let option = `<option value="${lag}">${lag}</option>`;
    selLagAdmin.innerHTML += option;
}

// Viser bestillingene, sortert og filtrert
function visSorterteLag() {
    let romtypeId = document.getElementById("selRomtypeOversikt").value;
    let orderby = document.getElementById("orderby").value;
    lagliste.innerHTML = "";
    // Sorterer etter valgt felt ved å bruke en anonym funksjon
    lag.orderByChild(orderby).on("child_added", (snapshot) => {
        let nyttLag = snapshot.val();
        let lagnavn = snapshot.key;
        // Filtrer slik at enten alle eller valgt romtype vises
        if (romtypeId == "" || nyttLag.romtype === romtypeId) {
            lagliste.innerHTML += `
            <div class="kol-2"></div>
            <p class="kol-2">${lagnavn}</p>
            <p class="kol-2">${nyttLag.idrett}</p>
            <p class="kol-2">${nyttLag.skole}</p>
            <p class="kol-2">${nyttLag.skole}</p>
            <div class="kol-2"></div>`;
        }
        // Viser overskriftene ettersom det finnes bestillinger
        laglisteOverskrift.style.display = "grid";
    });
}

// Lyttefunskjoner
knappLeggTilNyIdrett.addEventListener("click", nyIdrett);
knappVisSkjemaNyIdrett.addEventListener("click", visSkjemaNyIdrett);
knappAvbrytNyIdrett.addEventListener("click", skjulSkjemaNyIdrett);
idretter.on("child_added", leggTilIdretter);
skoler.on("child_added", leggTilSkoler);
lag.on("child_added", leggTilLag);
// Viser lagene når du går inn på siden
visSorterteLag();
