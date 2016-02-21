// Momentlist data array for filling in info box
var momentListData = [];

//================================== DOM READY ===============================
$(document).ready(function() {
  // Populate the moments wall on initial page load
  populateWall();
});

//================================== FUNCTIONS ===============================

// Fill wall with data
function populateWall() {
  // Empty content string
  var wallContent = '';

  // jQuery AJAX call for JSON
  $.getJSON('/home/momentlist', function(data) {
    // For each item in our JSON, add an 'article.moment'
    $.each(data, function() {
      wallContent += '<article class="moment">';
      wallContent += '<div class="has">';
      wallContent += '<img src="' + this.user.image + '" alt=""/>';
      wallContent += '<span class="bold">' + this.user.username  + '</span>';
      wallContent += 'tuvo un ';
      wallContent += '<span class="bold">momento</span></div>';
      wallContent += '<div class="right_moment">';

      if(this.attachement != ''){
        wallContent += '<div class="tipe_moment.image">';
        wallContent += '<img src="' + this.attachement[0] + '".jpg alt=""/>';
      }

      wallContent += '<div class="tipe_moment text">' + this.description + '</div></div></article>';
    });

    // Inject the whole content string into our existing HTML section
    $('#wall').html(wallContent);
  });
};
