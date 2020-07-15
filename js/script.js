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
    addTestListener();
    addAmicoListener();
  }

  function addInputEventLisstener() {

    var target = $("#messaggio");
    target.keyup(sendKeyup);

    var button = $(".fa-paper-plane");
    button.click(sendClick);

    var targetCerca = $("#cerca-persone");
    targetCerca.keyup(sendKeyupCerca);

  }

  function sendKeyup(event) {

    var  key = event.which;
    var input = $ (this);
    var txt = input.val();

    $(".fa-paper-plane").addClass("non-visibile");
    $(".fa-microphone").removeClass("non-visibile");

    if (key == 13 && txt.length > 0) {

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

    var smsNuovo = $("#nuovoSms:not(.non-visibile)");
    var textSms = $("#templete > .sms").clone();

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
    var smsNuovoAmico = $("#nuovoSms:not(.non-visibile)");
    var textSmsAmico = $("#templete1 > .sms").clone();

    textSmsAmico.children(".sms-amico").children(".txt-sms").html(textAmico);
    textSmsAmico.children(".sms-amico").children(".orario").html(getActualHour());

    smsNuovoAmico.append(textSmsAmico);

  }

  function sendKeyupCerca() {

    var input = $ (this);
    var txt = input.val();

    var nomeAmici = $(".amici h4");
    nomeAmici.each(function() {
      var nomeAmicoCorrente = $(this).html();

      // trasformo tutte le lettere  in lettere maiuscole
      nomeAmicoCorrente = nomeAmicoCorrente.toLocaleUpperCase();
      txt = txt.toLocaleUpperCase();

        if (!nomeAmicoCorrente.includes(txt) && txt.length > 0) {
          $(this).parent(".dati").parent(".profilo").parent(".amici").addClass("non-visibile");
        } else {
          $(this).parent(".dati").parent(".profilo").parent(".amici").removeClass("non-visibile");
        }

    });
  }

  function addTestListener() {

    $(document).on("click", ".sms-options", function() {

      $(".sms-options").addClass("non-visibile");
      $(".sms-options").next(".sms-options-panel").addClass("non-visibile");


      $(this).removeClass("non-visibile");
      $(this).next(".sms-options-panel").removeClass("non-visibile");

    });

    $(document).on("click", ".sms-cancella", function() {
      $(this).parent().parent().parent(".sms").addClass("non-visibile")
    });

    $(document).on("click", function(event) {

      console.log(event.target);
      if (!$(event.target).hasClass("sms-options")) {
        $(".sms-options").addClass("non-visibile");
        $(".sms-options").next(".sms-options-panel").addClass("non-visibile");
      }
    });

  }

  function addAmicoListener() {

    $(document).on("click", ".amici", function() {

      $(".amici").removeClass("sfondo-amici");
      $(".chat-amico").removeClass("non-visibile");
      $(".col-bottom-right").removeClass("non-visibile");

      var contatto = $(this);
      contatto.addClass("sfondo-amici");

      var chat = $(".chat-amico");
      chat.each(function() {
        if (contatto.attr("data-id") == $(this).attr("data-id")) {
          $(this).removeClass("non-visibile");
          $(this).children("#nuovoSms").removeClass("non-visibile");
        } else {
          $(this).addClass("non-visibile");
          $(this).children("#nuovoSms").addClass("non-visibile");
        }
      });


    });
  }
