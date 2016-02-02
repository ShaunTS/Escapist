

Meteor.googleApis = new Mongo.Collection('googleApis')

Meteor.appConfig = new Mongo.Collection('config')

Meteor.states = new Mongo.Collection('states')

if(Meteor.isServer) {

    Meteor.publish('disableMapConfig', function() {
        return Meteor.appConfig.find({name: "disable-google-api"})
    })

    Meteor.publish('googleApis', function() {
        return Meteor.googleApis.find()
    })

    Meteor.publish('states', function() {
        return Meteor.states.find()
    })
}
if(Meteor.isClient) {

    Meteor.subscribe('googleApis')
    Meteor.subscribe('states')
    Meteor.subscribe('disabledMapConfig')
}