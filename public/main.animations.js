// Adding arrow scroll down animation using scrollTop jQuery animation
$(function() {
    $('.fa-angle-double-down').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $('#main-view').offset().top}, 700, 'swing');
    });
});

// Adding resizing for arraos
$(function() {
    $('.fa-angle-double-down').hover(
        function() {
            $(this).animate({ "font-size" : "+=5px" }, 200, 'swing');
            //$(this).animate({width : "+=50px"},2000);
        }, function() {
            $(this).animate({ "font-size" : "-=5px" }, 200);
        }
    )
});
