
esc.server.insertDisableApiSetting = function() {

    Meteor.appConfig.remove({})

    Meteor.appConfig.insert(
        {
            name: 'disable-google-api',
            typ: "boolean",
            value: true
        }
    )
}


esc.server.evolutions.ONE = function() {
    esc.server.insertDisableApiSetting()
}

Meteor.methods({

    'applySchema': function() {
        esc.server.evolutions.ONE();
    }
})