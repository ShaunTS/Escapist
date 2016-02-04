esc.client = {}

esc.client.maps = []

esc.client.getMap = function(mapId) {

    return _.chain(esc.client.maps)
    .where({id: mapId})
    .pluck('mapObj')
    .head()
    .value()
}

esc.client.setMap = function(mapId, map) {
    if(!_II.nonEmptyString(mapId)) return

    esc.client.maps = _.reject(esc.client.maps, function(mapToken) {
        return mapToken.id === mapId;
    })

    esc.client.maps.push({id: mapId, mapObj: map})
}