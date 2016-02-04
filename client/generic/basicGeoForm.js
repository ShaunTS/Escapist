Template.basicGeoForm.helpers({

    getLatitude: function() {
        return _II.getOrElse(Session.get('geocode-result'), 'lat', "")
    },

    getLongitude: function() {
        return _II.getOrElse(Session.get('geocode-result'), 'lng', "")
    },

    getGeo: function() {
        let geo = Session.get('geocode-result') || esc.schemaTypes.geo()

        return JSON.stringify(geo)
    }
})