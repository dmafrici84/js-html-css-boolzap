// Milestone 1
// ● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
// dall’interlocutore (bianco) assegnando due classi CSS diverse
// ● Aggiunta di un messaggio : l’utente scrive un testo nella parte bassa e cliccando
// “invia” il testo viene aggiunto al thread sopra, come messaggio verde

// Milestone 2
// ● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
// un “ok” come risposta, che apparirà dopo 1 secondo.
// ● Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i
// contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo
// “mar” rimangono solo Marco e Martina)

// Milestone 3
// ● Click sul contatto mostra la conversazione del contatto cliccato, è possibile inserire
// nuovi messaggi per ogni conversazione
// ● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
// permette di cancellare il messaggio selezionato

$(document).ready(init);

// FUNZIONI

  function init(){
    addInputEventLisstener();
  }

  function addInputEventLisstener() {

    var target = $("#messaggio");
    target.keyup(sendKeyup);

    var button = $(".fa-paper-plane");
    button.click(sendClick);

  }

  function sendKeyup(event) {
    console.log("hello");
    var  key = event.which;
    var input = $ (this);
    var txt = input.val();

    $(".fa-paper-plane").addClass("non-visibile");
    $(".fa-microphone").removeClass("non-visibile");

    if (event.which == 13 && txt.length > 0) {

      input.val("");
      sendMessage(txt);

    } else if (txt.length > 0) {

      $(".fa-paper-plane").removeClass("non-visibile");
      $(".fa-microphone").addClass("non-visibile");

    }

  }

  function sendClick() {

    $(".fa-paper-plane").addClass("non-visibile");
    $(".fa-microphone").removeClass("non-visibile");

    var input = $("#messaggio");
    var txt = input.val();

    if (txt.length > 0) {
      input.val("");
      sendMessage(txt);
    }

  }

  function sendMessage(txt) {

    var smsNuovo = $("#nuovoSms");
    var textSms = $("#templete > .sms");
    textSms.clone();

    textSms.children(".sms-proprio").children(".txt-sms").html(txt);
    textSms.children(".sms-proprio").children(".orario").html(getActualHour());

    smsNuovo.append(textSms);

    setTimeout((sendMessageAmico), 1000);
  }

  function getActualHour() {

    var date = new Date();
    return date.getHours() + ":" + date.getMinutes();

  }

  function sendMessageAmico() {

    var textAmico = "ok";
    var smsNuovoAmico = $("#nuovoSms");
    var textSmsAmico = $("#templete1 > .sms");
    textSmsAmico.clone();

    textSmsAmico.children(".sms-amico").children(".txt-sms").html(textAmico);
    textSmsAmico.children(".sms-amico").children(".orario").html(getActualHour());

    smsNuovoAmico.append(textSmsAmico);

  }
