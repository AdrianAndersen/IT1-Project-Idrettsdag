// Henter referansene til databasene
const database = firebase.database();
const idretter = database.ref("idretter/");
const skoler = database.ref("skoler/");
const lag = database.ref("lag/");

// Henter HTML-elementer fra siden

// Skjemaer
const skjemaNyIdrett = document.getElementById("skjemaNyIdrett");
const skjemaVelgEndreIdretter = document.getElementById("skjemaVelgEndreIdretter");
const skjemaEndreSkoler = document.getElementById("skjemaEndreSkoler");
const skjemaEndreLag = document.getElementById("skjemaEndreLag");
const skjemaVelgEndreLag = document.getElementById("skjemaVelgEndreLag");

// Select-elementer
const selIdrettAdmin = document.getElementById("selIdrettAdmin");
const selSkoleAdmin = document.getElementById("selSkoleAdmin");
const selLagAdmin = document.getElementById("selLagAdmin");

// Knapper
const knappVisSkjemaNyIdrett = document.getElementById("knappVisSkjemaNyIdrett");
const knappLeggTilNyIdrett = document.getElementById("knappLeggTilNyIdrett");
const knappAvbrytNyIdrett = document.getElementById("knappAvbrytNyIdrett");
const knappFjernIdrett = document.getElementById("knappFjernIdrett");
const knappVelgEndreIdrett = document.getElementById("knappVelgEndreIdrett");
const knappAvbrytEndreIdrett = document.getElementById("knappAvbrytEndreIdrett");
const knappFjernSkole = document.getElementById("knappFjernSkole");
const knappSlettLag = document.getElementById("knappSlettLag");
const knappEndreLag = document.getElementById("knappEndreLag");
const knappVisEndreLag = document.getElementById("knappVisEndreLag");
const knappEndreIdrett = document.getElementById("knappEndreIdrett");
const knappAvbrytEndreLag = document.getElementById("knappAvbrytEndreLag");

const inpEndretIdrettsnavn = document.getElementById("inpEndretIdrettsnavn");
const inpEndretSted = document.getElementById("inpEndretSted");
const inpEndretTid = document.getElementById("inpEndretTid");
const inpEndretLagnavn = document.getElementById("inpEndretLagnavn");
const inpGammeltIdrettsnavn = document.getElementById("inpGammeltIdrettsnavn");
const inpGammeltLagnavn = document.getElementById("inpGammeltLagnavn");

const lagliste = document.getElementById("lagliste");

// Legger til en ny idrett i databasen
function nyIdrett(event) {
    event.preventDefault();
    let navn = inpIdrettAdmin.value;
    let oppmotested = inpOppmotested.value;
    let oppmotetid = inpOppmotetid.value;

    let nyIdrett = database.ref("idretter/" + navn);
    nyIdrett.set(
        {
            "oppmotested": oppmotested,
            "oppmotetid": oppmotetid
        }
    )
    skjulSkjemaNyIdrett(event);
}

// Viser skjema for å lage ny idrett
function visSkjemaNyIdrett(event) {
    skjemaNyIdrett.style.display = "grid";
    skjemaVelgEndreIdretter.style.display = "none";
    knappVisSkjemaNyIdrett.style.display = "none";
}
// Skjuler skjema for å lage ny idrett
function skjulSkjemaNyIdrett(event) {
    skjemaNyIdrett.style.display = "none";
    skjemaVelgEndreIdretter.style.display = "block";
    knappVisSkjemaNyIdrett.style.display = "block";
}

// Viser skjema for å endre idrett og skriver inn verdiene fra databasen
function visSkjemaEndreIdrett(event) {
    event.preventDefault();

    const navn = selIdrettAdmin.value;
    const idrettRef = idretter.child(navn);
    idrettRef.once("value", (sd) => {
        const idrett = sd.val(); 
        if (!idrett) {
            return;
        }
        inpGammeltIdrettsnavn.value = navn;
        inpEndretIdrettsnavn.value = navn;
        inpEndretSted.value = idrett.oppmotested;
        inpEndretTid.value = idrett.oppmotetid;
    })
    skjemaEndreIdrett.style.display = "grid";
    skjemaVelgEndreIdretter.style.display = "none";
    knappVisSkjemaNyIdrett.style.display = "none";
}

function oppdaterIdrett(event) {
    event.preventDefault();
    let navn = inpEndretIdrettsnavn.value;
    let oppmotested = inpEndretSted.value;
    let oppmotetid = inpEndretTid.value;

    let nyIdrett = database.ref("idretter/" + navn);
    nyIdrett.set(
        {
            "oppmotested": oppmotested,
            "oppmotetid": oppmotetid
        }
    )
    idretter.child(inpGammeltIdrettsnavn.value).remove();
    skjulSkjemaEndreIdrett(event);
}

// Skjuler skjema for å endre idretter
function skjulSkjemaEndreIdrett(event) {
    event.preventDefault();
    skjemaEndreIdrett.style.display = "none";
    skjemaVelgEndreIdretter.style.display = "block";
    knappVisSkjemaNyIdrett.style.display = "block";
}

// Populerer select-elementet i "Administrer idretter"
function leggTilIdretter(snapshot) {
    let idrett = snapshot.key;
    let option = `<option value="${idrett}">${idrett}</option>`;
    selIdrettAdmin.innerHTML += option;
}

// Fjerner valgt idrett
function fjernIdrett(event) {
    event.preventDefault();
    const idrett = selIdrettAdmin.value;
    idretter.child(idrett).remove();
    selIdrettAdmin.innerHTML = "";
    idretter.off("child_added");
    idretter.on("child_added", leggTilIdretter);
}
// Fjerner valgt skole
function fjernSkole(event) {
    event.preventDefault();
    const skole = selSkoleAdmin.value;
    skoler.child(skole).remove();
    selSkoleAdmin.innerHTML = "";
    skoler.off("child_added");
    skoler.on("child_added", leggTilSkoler);
}


// Populerer select-elementet i "Administrer skoler"
function leggTilSkoler(snapshot) {
    let skole = snapshot.key;
    let option = `<option value="${skole}">${skole}</option>`;
    selSkoleAdmin.innerHTML += option;
}

// Populerer select-elementet i "Administrer lag"
function leggTilLag(snapshot) {
    let lag = snapshot.key;
    let option = `<option value="${lag}">${lag}</option>`;
    selLagAdmin.innerHTML += option;
}

function visSkjemaEndreLag(event) {
    event.preventDefault();

    const lagnavn = selLagAdmin.value;
    const lagRef = lag.child(lagnavn);
    lagRef.once("value", (sd) => {
        const lag = sd.val();
        if (!lag) {
            return;
        }
        inpEndretLagnavn.value = lagnavn;
        inpGammeltLagnavn.value = lagnavn;
    });
    skjemaEndreLag.style.display = "grid";
    skjemaVelgEndreLag.style.display = "none";

}

function oppdaterLag(event) {
    event.preventDefault();
    let gammeltLagnavn = inpGammeltLagnavn.value;
    const lagRef = lag.child(gammeltLagnavn);
    lagRef.once("value", (sd) => {
        const gammeltLag = sd.val();
        if (!gammeltLag) {
            return;
        }
        const lagnavn = inpEndretLagnavn.value;
        const nyttLag = database.ref("lag/" + lagnavn);
        nyttLag.set(gammeltLag);
    });
    fjernLagMedNavn(gammeltLagnavn);
    lagliste.innerHTML = "";
    lag.off("child_added");
    lag.on("child_added", visLag);
    skjulSkjemaEndreLag(event);
}

// Skjuler skjema for å endre lag
function skjulSkjemaEndreLag(event) {
    event.preventDefault();
    skjemaEndreLag.style.display = "none";
    skjemaVelgEndreLag.style.display = "block";
}

function fjernLagMedNavn(navn) {
    lag.child(navn).remove();
    selLagAdmin.innerHTML = "";
    lag.off("child_added");
    lag.on("child_added", leggTilLag);
}

function fjernLag(event) {
    event.preventDefault();
    const valgtLag = selLagAdmin.value;
    fjernLagMedNavn(valgtLag);
}

// Viser lagene i oversikten
function visLag(snapshot) {
    let nyttLag = snapshot.val();
    let lagnavn = snapshot.key;
    lagliste.innerHTML += `
            <div class="kol-2"></div>
            <p class="kol-2">${lagnavn}</p>
            <p class="kol-2">${nyttLag.idrett}</p>
            <p class="kol-2">${nyttLag.skole}</p>
            <p class="kol-2">${nyttLag.klasse}</p>
            <div class="kol-2"></div>`;
}

// Lyttefunskjoner
idretter.on("child_added", leggTilIdretter);
skoler.on("child_added", leggTilSkoler);
lag.on("child_added", leggTilLag);
lag.on("child_added", visLag);
knappLeggTilNyIdrett.addEventListener("click", nyIdrett);
knappVisSkjemaNyIdrett.addEventListener("click", visSkjemaNyIdrett);
knappAvbrytNyIdrett.addEventListener("click", skjulSkjemaNyIdrett);
knappFjernIdrett.addEventListener("click", fjernIdrett);
knappVelgEndreIdrett.addEventListener("click", visSkjemaEndreIdrett);
knappAvbrytEndreIdrett.addEventListener("click", skjulSkjemaEndreIdrett);
knappEndreIdrett.addEventListener("click", oppdaterIdrett);
knappFjernSkole.addEventListener("click", fjernSkole);
knappSlettLag.addEventListener("click", fjernLag);
knappVisEndreLag.addEventListener("click", visSkjemaEndreLag);
knappEndreLag.addEventListener("click", oppdaterLag);
knappAvbrytEndreLag.addEventListener("click", skjulSkjemaEndreLag);