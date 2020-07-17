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
    addInputEventListener();
    addContactClickListener()
    addTestListener();
    addChatContactClickListener()
  }

    // FUNZIONE CHE GESTISCE L'INPUT CON ID=MESSAGGIO
    function addInputEventListener() {

      var target = $("#messaggio");
      target.keyup(sendKeyup);

      var button = $(".fa-paper-plane");
      button.click(sendClick);

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
          var textSms = $("#templete > .sms");

          textSms.children("div").removeClass("sms-amico");
          textSms.children("div").addClass("sms-proprio");

          textSms = textSms.clone();

          textSms.find(".txt-sms").html(txt);
          textSms.find(".orario").html(getActualHour());

          smsNuovo.append(textSms);

          setTimeout((sendMessageContact), 1000);
        }

          function getActualHour() {

            var date = new Date();
            return date.getHours() + ":" + date.getMinutes();

          }

          function sendMessageContact() {

            var textContact = "ok";
            var smsNuovoContact = $("#nuovoSms:not(.non-visibile)");
            var textSmsContact = $("#templete > .sms");

            textSmsContact.children("div").removeClass("sms-proprio");
            textSmsContact.children("div").addClass("sms-amico");

            textSmsContact = textSmsContact.clone();

            textSmsContact.find(".txt-sms").html(textContact);
            textSmsContact.find(".orario").html(getActualHour());

            smsNuovoContact.append(textSmsContact);

          }

    // FUNZIONE CHE GESTISCE L'INPUT CON ID= CERCA-PERSONE
    function addContactClickListener() {

      var targetCerca = $("#cerca-persone");
      targetCerca.keyup(sendKeyupCerca);

    }

      function sendKeyupCerca() {

        var input = $ (this);
        var txt = input.val();

        var nomeContacts = $(".amici h4");
        nomeContacts.each(function() {
          var nomeContactCorrente = $(this).html();

          // trasformo tutte le lettere  in lettere maiuscole
          nomeContactCorrente = nomeContactCorrente.toLocaleUpperCase();
          txt = txt.toLocaleUpperCase();

            if (!nomeContactCorrente.includes(txt) && txt.length > 0) {
              $(this).parents(".amici").addClass("non-visibile");
            } else {
              $(this).parents(".amici").removeClass("non-visibile");
            }

        });
      }

    // FUNZIONE CHE MOSTRA/NASCONDE IL MENU DI OGNI SINGOLO MESSAGGIO.INOLTRE E'POSSIBILE ELIMINARE IL MESSAGGIO CLICCANDO SU "CANCELLA MESSAGGIO"
    function addTestListener() {

      $(document).on("click", ".sms-options", function() {

        if ($(this).hasClass("non-visibile")){
          $(".sms-options").addClass("non-visibile");
          $(".sms-options").next(".sms-options-panel").addClass("non-visibile");
          $(this).removeClass("non-visibile");
          $(this).next(".sms-options-panel").removeClass("non-visibile");
        } else {
          $(".sms-options").addClass("non-visibile");
          $(".sms-options").next(".sms-options-panel").addClass("non-visibile");
        }

      });

      $(document).on("click", ".sms-cancella", function() {
        $(this).parents(".sms").addClass("non-visibile")
      });

      $(document).on("click", function(event) {

        if (!$(event.target).hasClass("sms-options")) {
          $(".sms-options").addClass("non-visibile");
          $(".sms-options").next(".sms-options-panel").addClass("non-visibile");
        }
      });

    }

    // FUNZIONE CHE MOSTRA LA CHAT DEL CONTATTO CORRISPONDENTE
    function addChatContactClickListener() {

      $(document).on("click", ".amici", function() {

        $(".amici").removeClass("sfondo-amici");
        $(".chat-amico").removeClass("non-visibile");
        $(".col-bottom-right").removeClass("non-visibile");

        var contact = $(this);
        contact.addClass("sfondo-amici");

        var chat = $(".chat-amico");
        chat.each(function() {
          if (contact.attr("data-id") == $(this).attr("data-id")) {
            $(this).removeClass("non-visibile");
            $(this).children("#nuovoSms").removeClass("non-visibile");
          } else {
            $(this).addClass("non-visibile");
            $(this).children("#nuovoSms").addClass("non-visibile");
          }
        });

      });
    }
