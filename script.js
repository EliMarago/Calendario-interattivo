document.addEventListener("DOMContentLoaded", function () {
  const calendario = document.getElementById("calendario");
  const meseAnno = document.getElementById("mese-anno");
  const mesePrecedenteBtn = document.getElementById("mese-precedente");
  const meseSuccessivoBtn = document.getElementById("mese-successivo");
  const calcolo = document.querySelector(".calcolo-giorni");

  let dataCorrente = new Date();

  function aggiornaCalendario() {
    calendario.innerHTML = "";
    const mese = dataCorrente.getMonth();
    const anno = dataCorrente.getFullYear();
    const primoGiorno = new Date(anno, mese, 1).getDay();
    const giorniInMese = new Date(anno, mese + 1, 0).getDate();

    const giorniSettimana = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
    const mesi = [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ];
    meseAnno.textContent = `${mesi[mese]} ${anno}`;

    const chiaveStorage = `${anno}-${mese}`;
    const selezionati = JSON.parse(localStorage.getItem(chiaveStorage)) || [];

    for (const giorno of giorniSettimana) {
      const giornoHeader = document.createElement("div");
      giornoHeader.classList.add("giorno-settimana");
      giornoHeader.textContent = giorno;
      calendario.appendChild(giornoHeader);
    }
    const offset = primoGiorno === 0 ? 6 : primoGiorno - 1;

    for (let i = 0; i < offset; i++) {
      const giornoVuoto = document.createElement("div");
      calendario.appendChild(giornoVuoto);
    }

    for (let i = 1; i <= giorniInMese; i++) {
      const giorno = document.createElement("div");
      giorno.classList.add("giorno");
      giorno.textContent = i;

      if (selezionati.includes(i)) {
        giorno.classList.add("selezionato");
        giorno.textContent = "X";
      }

      giorno.addEventListener("click", function () {
        if (giorno.classList.contains("selezionato")) {
          giorno.classList.remove("selezionato");
          giorno.textContent = i;
          rimuoviGiorno(chiaveStorage, i);
        } else {
          giorno.classList.add("selezionato");
          salvaGiorno(chiaveStorage, i);
          giorno.textContent = "X";
        }
      });
      calendario.appendChild(giorno);
    }
  }
  function salvaGiorno(chiave, giorno) {
    const selezionati = JSON.parse(localStorage.getItem(chiave)) || [];
    if (!selezionati.includes(giorno)) {
      selezionati.push(giorno);
      localStorage.setItem(chiave, JSON.stringify(selezionati));
    }
  }
  function rimuoviGiorno(chiave, giorno) {
    let selezionati = JSON.parse(localStorage.getItem(chiave)) || [];
    selezionati = selezionati.filter((g) => g !== giorno);
    localStorage.setItem(chiave, JSON.stringify(selezionati));
  }
  mesePrecedenteBtn.addEventListener("click", function () {
    dataCorrente.setMonth(dataCorrente.getMonth() - 1);
    aggiornaCalendario();
  });
  meseSuccessivoBtn.addEventListener("click", function () {
    dataCorrente.setMonth(dataCorrente.getMonth() + 1);
    aggiornaCalendario();
  });

  aggiornaCalendario();

//Calcolo giorno corrente

  function calcoloGiorni() {
    const dataCorrente = new Date();
    const formato = new Intl.DateTimeFormat("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dataCorrente);
    return formato;
  }

  const message = `Oggi è ${calcoloGiorni()}`;
  calcolo.textContent = message;
});
