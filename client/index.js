Template.index.onRendered(function() {

    let mapsEnabled = !_II.getBoolean(this, 'data.enableMaps.value')

    let loc = {}

    loc.lat = $(this.find('.esc-map')).data('maps-lat')
    loc.lng = $(this.find('.esc-map')).data('maps-lng')

    Session.set('maps-aaa', loc)
})

Template.index.helpers({

    requestLoadMap: function() {
        let loc = Session.get('maps-aaa')

        if(!esc.containsLatLng(loc)) return

        esc.api.forEach(function() {
            $.ajax({
                url: esc.api.getMapsUrl(),
                dataType: 'script',
                success: function(data, status, response) {

                    var map = new google.maps.Map(
                        $('.esc-map')[0],
                        {
                            center: loc,
                            zoom: 8
                        }
                    );

                },
                error: function(response, status, error) {
                    _II.println('error', [response, status, error])
                }
            })
        })
    }
})