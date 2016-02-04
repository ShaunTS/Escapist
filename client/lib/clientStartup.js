Meteor.startup(function() {
    console.log("\n      CLIENT startup")
    Session.set('loc-stack', [])

    if('geolocation' in navigator) {

        navigator.geolocation.getCurrentPosition(

            function(pos) {
                console.log("\n      POS callback")

                let loc = {}
                loc.lat = _II.getInt(pos, 'coords.latitude')
                loc.lng = _II.getInt(pos, 'coords.longitude')
                loc.timestamp = _II.getString(pos, 'timestamp')

                esc.locStack.push("startup-user-loc", loc)
            },
            function(err) {
                _II.println("geoloc err", err)
            }
        )
    }
    else {
        _II.println('start no geo', navigator)
    }
})