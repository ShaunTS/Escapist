esc = {}

esc.schemaTypes = {}
esc.api = {}

esc.api.getMapsUrl = function() {

    let api = Meteor.googleApis.findOne({app: "maps"})

    let url = _II.getString(api, 'url'),
        key = _II.getString(api, 'key');

    return [url, key].join("")
}