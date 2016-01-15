Template.adminNav.onRendered(function() {
    let self = this

    _.each(Meteor.appConfig.find({name: 'disable-google-api'}).fetch(), function(setting) {

        $(self.find('.disable-api input')).prop('checked', setting.value)
    })
})

Template.adminNav.events({

    'click .disable-api': function(event, template) {
        let setting = _.defaults({
            name: "disable-google-api",
            typ: "boolean"
        }, esc.schemaTypes.appSetting())

        setting.value = $(template.find('.disable-api input')).prop("checked")
        Meteor.call('modifyAdminSetting', setting)
    }
})