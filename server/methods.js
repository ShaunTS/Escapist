Meteor.methods({


    'modifyAdminSetting': function(clientArg) {

        let setting = _.defaults(clientArg, esc.schemaTypes.appSetting())

        if(!setting.verify()) return
            _II.println('client set', clientArg)
            _II.println('set', setting)
        _.each(Meteor.appConfig.find({name: setting.name}).fetch(), function(current) {
            Meteor.appConfig.update(
                {name: current.name},
                setting,
                {upsert: false}
            )
        })
    }
})