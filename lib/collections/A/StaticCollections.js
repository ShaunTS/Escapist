

Meteor.googleApis = new Mongo.Collection('googleApis')

Meteor.appConfig = new Mongo.Collection('config')

if(Meteor.isServer) {

    Meteor.publish('disableMapConfig', function() {
        return Meteor.appConfig.find({name: "disable-google-api"})
    })

    Meteor.publish('googleApis', function() {
        return Meteor.googleApis.find()
    })
}
if(Meteor.isClient) {

    Meteor.subscribe('googleApis')
}