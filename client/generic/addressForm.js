Template.addressForm.rendered = function() {

    var self = this
    _.each(Meteor.addr.find({formDefault: true}).fetch(), function(addr) {

        $(self.find('.addr-street-row input')).val(addr.street)
        $(self.find('.addr-city-row input')).val(addr.city)
        $(self.find('.addr-state-row select')).val(addr.state.abbr)
        $(self.find('.addr-zip-row input')).val(addr.zip)
    })
}

Template.addressForm.helpers({

    getStates: function() {

        return Meteor.states.find().fetch();
    }
})

Template.addressForm.events({

    'click .esc-addr-form button': function(event, template) {

        let formTable = $(event.target).parents('.form-as-table')[0]

        let addr = {}
        addr.street = $(formTable).find('.addr-street-row input').val()

        addr.city = $(formTable).find('.addr-city-row input').val()
        addr.state = $(formTable).find('.addr-state-row select').val()
        addr.zip = $(formTable).find('.addr-zip-row input').val()

        esc.api.ajaxGeocode(addr, {
            onSuccess: function(coords, data) {
                _II.println('addr onSucess', coords)
                $(formTable).find('.esc-input-lat input').val(coords.lat)
                $(formTable).find('.esc-input-lng input').val(coords.lng)
            },
            onError: function(data) {

            }
        })
    }
})