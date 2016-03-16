// Momentlist data array for filling in info box
var momentListData = [];

//================================== DOM READY ===============================
$(document).ready(function() {
  // Populate the moments wall on initial page load
  var momentList;
  if ($(document).find("title").text() === 'Musement Collective - Home')
      momentList = '/home/momentList';
  else
      momentList = '/profile/momentList'

  populateWall(momentList);
});

//================================== FUNCTIONS ===============================

// Fill wall with data
function populateWall(momentlist) {
  // Empty content string
  var wallContent = '';
  /* Ipsos Counter */
  var ipsos = 0;

  /* Temporal computation for speed purposes */
  var timelapse = 0;

  // jQuery AJAX call for JSON
  $.getJSON(momentlist, function(data) {
    // For each item in our JSON, add an 'article.moment'
    $.each(data, function() {
      wallContent += '<article class="moment">';
      wallContent += '<div class="has">';
      wallContent += '<div class="heart">'
      wallContent += '<div class="icon-heart_white"></div>'
      wallContent += '<div class="heart-number">10</div></div>'
      wallContent += '<img src="' + this.user.image + '" alt=""/>';
      wallContent += '<div class="text_has">';
      wallContent += this.user.username ;
      wallContent += ' <span class="transparent"> tuvo un </span>';
      wallContent += ' momento <span class="transparent"> de </span>' ;

      timelapse = Math.floor(this.timelapse/30);
      ipsos += timelapse;
      wallContent += timelapse;
      wallContent += ' ipsos</div></div>'
      wallContent += '<div class="right_moment">';

      if(this.attachement != ''){
        wallContent += '<div class="tipe_moment image">';
        wallContent += '<img src="' + this.attachement[0] + '".jpg alt=""/>';
      }

      wallContent += '<div class="tipe_moment text"><span class="icon-Comillas-10"></span>' + this.description + '</div></div></article>';
    });

    // Inject the whole content string into our existing HTML section
    $('#wall').html(wallContent);

    // If we are in profile
    if(momentlist === '/profile/momentList'){
      if(Object.keys(data).length === 0)
          $('#momentsQuantity').html("Es hora de idear. ¡Inicia un nuevo momento!");
      else{
        $('#momentsQuantity').html(Object.keys(data).length + " momentos logrados");
        $('#ipsos').html(ipsos + ' ipsos');
      }
    }

    //================================== CHANGE COLOR HEART ===============================
    $(".icon-heart_white").click(function(){
      $(this).removeClass("icon-heart_white");
      $(this).addClass("icon-heart_red");
    });
  });
};
