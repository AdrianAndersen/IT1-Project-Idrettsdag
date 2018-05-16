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

const contentBox = document.getElementById("contentBox")

// Populerer selectmenyen for skole
function leggTilSkole(snapshot) {
    let skolenavn = snapshot.key;
    let option = `<option value="${skolenavn}">${skolenavn}</option>`;
    selSkole.innerHTML += option;
}

// Populerer klasse-dropdown med verdier fra den valgte skolen
function velgSkole(event) {
    selKlasse.innerHTML = "";
    const skole = event.target.value;
    if (!skole) {
        return;
    }
    const klasser = database.ref(`skoler/${skole}`);
    klasser.once("child_added", (snapshotData) => {
        snapshotData.forEach(function (childSnapshot) {
            selKlasse.innerHTML += `<option value="${childSnapshot.key}">${childSnapshot.key}</option>`;
        });
    })

}

// Populerer selectmenyen for Idrett
function leggTilIdrett(snapshot) {
    let idrettsnavn = snapshot.key;
    let option = `<option value="${idrettsnavn}">${idrettsnavn}</option>`;
    selIdrett.innerHTML += option;
}

// Sjekker om det finnes et lag med det valgte lagnavnet, dersom det ikke gjør det, legges det til et nytt lag
function nyttLag(event) {
    event.preventDefault();
    const lagnavn = inpLagnavn.value;

    lag.once("value", function (snapshotData) {
        const finnesFraFor = snapshotData.hasChild(lagnavn);
        if (finnesFraFor) {
            alert(`"${lagnavn}" er allerede registrert.`);
            return;
        }

        let skole = selSkole.value;
        let klasse = selKlasse.value;
        let idrett = selIdrett.value;

        // Sjekker at brukeren faktisk velger det vi ønsker. 
        if (skole == "ugyldig") {
            alert("Du må velge en skole!");
            return;
        }
        if (klasse == "ugyldig") {
            alert("Du må velge en klasse!");
            return;
        }
        if (idrett == "ugyldig") {
            alert("Du må velge en idrett!");
            return;
        }


        let nyttLag = database.ref("lag/" + lagnavn);
        nyttLag.set(
            {
                "skole": skole,
                "klasse": klasse,
                "idrett": idrett
            }
        );
        // Gir brukeren en bekreftelse på at laget er registrert
        inpLagnavn.value = "";
        contentBox.style.textAlign = "center";
        contentBox.innerHTML = `<h1>Ditt lag er registrert!</h1></br><p>Du blir straks sendt tilbake til hovedsiden...</p>`;
        setTimeout(function () {
            location.reload();
        }, 3000);
    });
}

// Lyttefunksjoner
selSkole.onchange = velgSkole;
skjemaRegistrering.addEventListener("submit", nyttLag)
skoler.on("child_added", leggTilSkole);
idretter.on("child_added", leggTilIdrett);

