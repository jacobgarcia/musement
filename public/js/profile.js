$(document).ready(function(){
    if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".img").click(function(e){
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img").hasClass("hover")) {
                $(this).closest(".img").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $(".img").mouseenter(function(){
            $(this).addClass("hover");
        })
        // handle the mouseleave functionality
        .mouseleave(function(){
            $(this).removeClass("hover");
        });
    }
});

function verifySize() {
    const SIZELIMIT = 15728640; /* This is in bytes for 15 MB */
    var size = document.getElementById('attachement').files[0].size;


    if (size > SIZELIMIT) {
      document.getElementById('fileError').text = "Tu imagen no puede ser mayor a 15 MB"
      document.getElementById('attachement').value = null;
    }
}
