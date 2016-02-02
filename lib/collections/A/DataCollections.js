Meteor.addr = new Mongo.Collection('addr')

if(Meteor.isServer) {
    Meteor.publish('addr', function() {

        return Meteor.addr.find()
    })
}

if(Meteor.isClient) {

    Meteor.subscribe('addr')
}