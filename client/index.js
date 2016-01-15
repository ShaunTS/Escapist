Template.index.onRendered(function() {

    if(_.isUndefined(this.data.enableMaps))
      throw Error('API settings UNDEFINED')

    let mapsEnabled = !_II.getBoolean(this, 'data.enableMaps.value')

    if(mapsEnabled) {
        $.ajax({
            url: esc.api.getMapsUrl(),
            dataType: 'script',
            success: function(data, status, response) {
                _II.println('success google', google)

                var map = new google.maps.Map(
                    $('.esc-map')[0],
                    {
                        center: {lat: -34.397, lng: 150.644},
                        zoom: 8
                    }
                );

            },
            error: function(response, status, error) {
                _II.println('error', [response, status, error])
            }
        })
    }
})