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
    $.getJSON( '/api/moment/json', function( data ) {

        // For each item in our JSON, add an 'article.moment'
        $.each(data, function(){
            wallContent += '<article class="moment">';
            wallContent += '<div class="has">';
            wallContent += '<img src="/static/assets/img/dontavo.jpeg" alt=""/>';
            wallContent += '<span class="bold">' + 
            wallContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            wallContent += '<td>' + this.email + '</td>';
            wallContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            wallContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML section
        $('#wall').html(wallContent);
    });
};
