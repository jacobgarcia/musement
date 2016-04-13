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

  /* User id */
  var userid;

  $.getJSON("api/user_data", function(user) {
      // Make sure the data contains the username as expected before using it
      userid = user.userid;

      // jQuery AJAX call for JSON
      $.getJSON(momentlist, function(data) {
        // For each item in our JSON, add an 'article.moment'
        $.each(data, function() {
          /* Replace undefined hearts with zeroes */
          if(this.heart == null)
            this.heart = 0;

          var usersHeart = this.usersHeart;
          var specifiedClass = "icon-heart_white";

          /* Class depending if it was clickable or not */
         for(var i in usersHeart){
              var id = usersHeart[i];
              if(id == userid)
                specifiedClass = "icon-heart_red";
          }

          wallContent += '<article class="moment">';
          wallContent += '<div class="has">';
          wallContent += '<div class="heart" onClick="addHref(\''+ this._id +'\')">';


          wallContent += '<div id=' + this._id + "c" + ' class=' + specifiedClass + '></div>';

          wallContent += '<div id=' + this._id + ' class="heart-number">' + this.heart + '</div></div>';
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

          // Inject the whole content string into our existing HTML section
          $('#wall').html(wallContent);

          //================================== CHANGE COLOR HEART ===============================
          $(".icon-heart_white").click(function(){
          /*  $(this).removeClass("icon-heart_white");
            $(this).addClass("icon-heart_red");*/
          });
        });
      });
  });



  // If we are in profile
  if(momentlist === '/profile/momentList'){
    if(Object.keys(data).length === 0)
        $('#momentsQuantity').html("Es hora de idear. ¡Inicia un nuevo momento!");
    else{
      $('#momentsQuantity').html(Object.keys(data).length + " momentos logrados");
      $('#ipsos').html(ipsos + ' ipsos');
    }
  }
};

function addHref(clickedID){
  if($("#" + clickedID + "c").prop('className') == "icon-heart_white"){
    $.post('home/vote/' + clickedID, function(){

    });
    $("#" + clickedID).html(parseInt($("#" + clickedID).html()) + 1);

    $("#" + clickedID + "c").removeClass("icon-heart_white");
    $("#" + clickedID + "c").addClass("icon-heart_red");
  }
}
