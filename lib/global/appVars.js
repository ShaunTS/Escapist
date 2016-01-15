

esc.api.getMapsUrl = function() {

    let api = Meteor.googleApis.findOne({app: "maps"})

    let url = _II.getString(api, 'url'),
        key = _II.getString(api, 'key');

    return [url, key].join("")
}

esc.api.isEnabled = function() {

    _.each(Meteor.appConfig.find({name: 'disable-google-api'}).fetch(), function(setting) {

        return !(_II.getOrElse(setting, 'value', false))
    })
}