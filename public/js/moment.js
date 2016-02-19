// Animation moment
var click = true;
$('#moment').click(function(){
  if (! click) {
    $('#moment').removeClass('loading').addClass('loading-click');
    click = true;
  }else{
    $('#moment').removeClass('loading-click').addClass('loading');
    click = false;
  }

  console.log("Click");
});
