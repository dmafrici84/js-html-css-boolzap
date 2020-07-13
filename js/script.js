// Milestone 1
// ● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
// dall’interlocutore (bianco) assegnando due classi CSS diverse
// ● Aggiunta di un messaggio : l’utente scrive un testo nella parte bassa e cliccando
// “invia” il testo viene aggiunto al thread sopra, come messaggio verde

$(document).ready(init);

// FUNZIONI
  function init(){
    addInputEventLisstener();
  }

  function addInputEventLisstener() {

    var target = $("#messaggio");

    target.keyup(function(){
      var input = $ (this);
      var txt = input.val();
      console.log(txt);
      console.log(txt.length);
      if (txt.length = 1) {
        $(".fa-paper-plane").removeClass("non-visibile");
        $(".fa-microphone").addClass("non-visibile");
      }

      $(".fa-paper-plane").click(function() {
        var sms = $(".sms:last-child").clone();
        var textSms = $(".sms .sms-proprio > p").clone();
        textSms.text(txt);
        sms.append(sms.append(textSms));
      });


    });
  }
