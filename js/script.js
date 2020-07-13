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

      if (txt.length > 0) {
        $(".fa-paper-plane").removeClass("non-visibile");
        $(".fa-microphone").addClass("non-visibile");
      } else {
        $(".fa-paper-plane").addClass("non-visibile");
        $(".fa-microphone").removeClass("non-visibile");
      }

    });

    $(".fa-paper-plane").click(function() {

      var txt = target.val();
      var smsNuovo = $("#nuovoSms");
      var textSms = $(".templete > .sms");
      textSms.clone();
      textSms.children(".sms-proprio").children("p").html(txt);
      smsNuovo.append(textSms);

      setTimeout(function() {
      var textAmico = "ok";
      var smsNuovoAmico = $("#nuovoSms");
      var textSmsAmico = $(".templete1 > .sms");
      textSmsAmico.clone();
      textSmsAmico.children(".sms-amico").children("p").html(textAmico);
      smsNuovoAmico.append(textSmsAmico);
    }, 60000);
    });

  }
