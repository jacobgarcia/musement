$( "#submit-button" ).on("click",function() {
  $.getJSON("api/user/locale", function(userLocal) {
    var locale = userLocal.locale;
    var email = $("#email-input").val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var isemail = regex.test(email);
    if (isemail) {
      var data = {"email": email};
      $.post( "/api/invitation", data)
      .done(function( data ) {
        console.log("RESPONSE:");
        console.dir(data);
        $("#result").html( data );
      });
      if(locale === "es")
          $('.thanks-email').text('Gracias, revisa tu correo :)');
      else
        $('.thanks-email').text('Thanks, please check your email :)');
    }else{
      if(locale === "es")
          $('.thanks-email').text('Tu correo no es válido :(');
      else
        $('.thanks-email').text('Your email is not valid :(');
    }
  });
});

$( "#submit-button2" ).on("click",function() {
  $.getJSON("api/user/locale", function(userLocal) {
    var locale = userLocal.locale;
    var email = $("#email-input2").val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var isemail = regex.test(email);
    if (isemail) {
      var data = {"email": email};
      $.post( "/api/invitation", data)
      .done(function( data ) {
        console.log("RESPONSE:");
        console.dir(data);
        $("#result").html( data );
      });
      if(locale === "es")
          $('.thanks-email').text('Gracias, revisa tu correo :)');
      else
        $('.thanks-email').text('Thanks, please check your email :)');
    }else{
      if(locale === "es")
          $('.thanks-email').text('Tu correo no es válido :(');
      else
        $('.thanks-email').text('Your email is not valid :(');
    }
  });
});

$('img.svg').each(function(){
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function(data) {
        var $svg = jQuery(data).find('svg');

        if(typeof imgID !== 'undefined') {
            $svg = $svg.attr('id', imgID);
        }
        if(typeof imgClass !== 'undefined') {
            $svg = $svg.attr('class', imgClass+' replaced-svg');
        }

        $svg = $svg.removeAttr('xmlns:a');

        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        $img.replaceWith($svg);

    }, 'xml');
});
