
esc.errors.missingApiKey = function(apiName) {
    let name = apiName || ""
    let msg = ["Missing", apiName, "api key url parameter"].join(" ")

    throw Error(msg)
}

esc.errors.ajaxEmptyUrl = function(op) {
    let name = op || ""
    let msg = [name, "ajax request missing url"].join(" ")

    throw Error(msg)
}

esc.errors.ajaxNoQuery = function(op) {
    let name = op || ""
    let msg = [name, "ajax request missing query string"].join(" ")

    throw Error(msg)
}

esc.queryStrings.address = function(addr) {
    let fields = []

    fields.push(_II.getString(addr, 'street'))
    fields.push(_II.getString(addr, 'city'))
    fields.push(_II.getString(addr, 'state'))

    if(!_II.nonEmptyStrings(fields)) return ""

    return fields.join(", ").split(" ").join("+")
}

esc.api.getMapsUrl = function() {

    let api = Meteor.googleApis.findOne({app: "maps"})

    let url = _II.getString(api, 'url'),
        key = _II.getString(api, 'key');

    return [url, key].join("")
}

esc.api.geocodeKey = function() {
    let api = Meteor.googleApis.findOne({app: "geocode"})

    return _II.getString(api, 'key')
}

esc.api.mkGeocodeUrl = function(addr) {

    let addrQuery = esc.queryStrings.address(addr)
    if(!_II.nonEmptyString(addrQuery))
        esc.errors.ajaxNoQuery('geocode')

    let key = esc.api.geocodeKey()
    if(!_II.nonEmptyString(key))
        esc.errors.missingApiKey('geocode')

    return [
        "https://maps.googleapis.com/maps/api/geocode/json?",
            "address=", addrQuery, "&key=", key
    ].join("")
}

esc.api.geocodeOk = function(bag, callback) {

    let results = _II.getArray(bag, 'results')

    let res = _.head(results)

    let loc = {}
    loc.lat = _II.getOrElse(res, 'geometry.location.lat', 0.0)
    loc.lng = _II.getOrElse(res, 'geometry.location.lng', 0.0)

    Session.set('geocode-result', loc)
    return loc;
}

esc.ajaxDefaults = function(bag) {
    return _.defaults(bag, {
        onSuccess: function(suc) {
            console.warn("unimplemented ajax callback (onSuccess)")
        },
        onError: function(err) {
            console.warn("unimplemented ajax callback (onError)")
        }
    })
}

esc.api.ajaxGeocode = function(addr, options) {
    let opt = esc.ajaxDefaults(options)
    let geoUrl = esc.api.mkGeocodeUrl(addr)

    $.ajax({
        url: geoUrl,
        success: function(data, status, response) {
            let coords = esc.api.geocodeOk(data)
            opt.onSuccess(coords, data)
        },
        error: function(response, status, error) {
            _II.println('geo error', [response, status, error])
        }
    })
}

esc.api.isEnabled = function() {

    _.each(Meteor.appConfig.find({name: 'disable-google-api'}).fetch(), function(setting) {

        return !(_II.getOrElse(setting, 'value', false))
    })
}

esc.api.forEach = function(op) {

    if(_II.isNone(op))
        throw Error(
            "Undefined arguemnt type for 'esc.api.forEach': " +
            (typeof op)
        )

    if(typeof op !== 'function')
        throw Error("Wrong arguement type for 'esc.api.forEach', expected: 'function' " +
            "found: " + (typeof op)
        )

    _.chain(Meteor.appConfig.find({name: 'disable-google-api'}).fetch())
        .first(1)
        .filter(function(setting) {
            return (setting.value === false)
        })
        .each(op).value()
}

esc.containsLatLng = function(loc) {

    if(!_II.nonEmpty(loc)) return false

    if(!_II.hasKeys(loc, ['lat', 'lng'])) return false

    let verified = {
        lat: loc.lat,
        lng: loc.lng
    }

    if(!_.every(verified, function(n) { return _.isNumber(n) })) return false

    return true
}