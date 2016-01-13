Template.index.onRendered(function() {

    var map;

    $.ajax({
        url: "https://maps.googleapis.com/",
        dataType: 'script',
        cache: true,
        complete:     function() {
          map = new google.maps.Map(
            $('.esc-map')[0],
            {
              center: {lat: -34.397, lng: 150.644},
              zoom: 8
            }
          );
        }
    })
})