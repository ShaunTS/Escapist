Template.basicGeoForm.helpers({

    getLatitude: function() {
        return _II.getOrElse(Session.get('geocode-result'), 'lat', "")
    },

    getLongitude: function() {
        return _II.getOrElse(Session.get('geocode-result'), 'lng', "")
    }
})