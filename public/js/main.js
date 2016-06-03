$( "#submit-button" ).on("click",function() {
  var email = $("#email-input").val();
  console.log("JQUERY EMAIL: "+email);
  var data = {"email": email};
  $.post( "/api/invitation", data)
  .done(function( data ) {
    console.log("RESPONSE:");
    console.dir(data);
    $("#result").html( data );
  });
});
