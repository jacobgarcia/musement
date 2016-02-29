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

  // jQuery AJAX call for JSON
  $.getJSON(momentlist, function(data) {
    // For each item in our JSON, add an 'article.moment'
    $.each(data, function() {
      wallContent += '<article class="moment">';
      wallContent += '<div class="has">';
      wallContent += '<img src="' + this.user.image + '" alt=""/>';
      wallContent += this.user.username ;
      wallContent += ' <span class="transparent"> tuvo un </span>';
      wallContent += ' momento</div>';
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
    if(momentlist === '/profile/momentList')
      $('#momentsQuantity').html("¡" + Object.keys(data).length + " momentos logrados!");
  });
};
