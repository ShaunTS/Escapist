Router.configure({layoutTemplate: "layout"})

Router.route('/', {
    name: "index",
    subscriptions: function() {
        return [Meteor.subscribe('disableMapConfig')]
    },
    data: function() {

        let data = {}

        data.enableMaps = Meteor.appConfig.findOne({name: 'disable-google-api'})
        return data
    }
,    action: function() {
        if(this.ready())
            this.render()
    }
})