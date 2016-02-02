
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

esc.server.insertStates = function() {

    Meteor.states.remove({})

    _.each([
        {id: 1, name: "Alabama", abbr: "AL"},
        {id: 2, name: "Alaska", abbr: "AK"},
        {id: 3, name: "Arizona", abbr: "AZ"},
        {id: 4, name: "Arkansas", abbr: "AR"},
        {id: 5, name: "California", abbr: "CA"},
        {id: 6, name: "Colorado", abbr: "CO"},
        {id: 7, name: "Connecticut", abbr: "CT"},
        {id: 8, name: "Delaware", abbr: "DE"},
        {id: 9, name: "Florida", abbr: "FL"},
        {id: 10, name: "Georgia", abbr: "GA"},
        {id: 11, name: "Hawaii", abbr: "HI"},
        {id: 12, name: "Idaho", abbr: "ID"},
        {id: 13, name: "Illinois", abbr: "IL"},
        {id: 14, name: "Indiana", abbr: "IN"},
        {id: 15, name: "Iowa", abbr: "IA"},
        {id: 16, name: "Kansas", abbr: "KS"},
        {id: 17, name: "Kentucky", abbr: "KY"},
        {id: 18, name: "Louisiana", abbr: "LA"},
        {id: 19, name: "Maine", abbr: "ME"},
        {id: 20, name: "Maryland", abbr: "MD"},
        {id: 21, name: "Massachusetts", abbr: "MA"},
        {id: 22, name: "Michigan", abbr: "MI"},
        {id: 23, name: "Minnesota", abbr: "MN"},
        {id: 24, name: "Mississippi", abbr: "MS"},
        {id: 25, name: "Missouri", abbr: "MO"},
        {id: 26, name: "Montana", abbr: "MT"},
        {id: 27, name: "Nebraska", abbr: "NE"},
        {id: 28, name: "Nevada", abbr: "NV"},
        {id: 29, name: "New Hampshire", abbr: "NH"},
        {id: 30, name: "New Jersey", abbr: "NJ"},
        {id: 31, name: "New Mexico", abbr: "NM"},
        {id: 32, name: "New York", abbr: "NY"},
        {id: 33, name: "North Carolina", abbr: "NC"},
        {id: 34, name: "North Dakota", abbr: "ND"},
        {id: 35, name: "Ohio", abbr: "OH"},
        {id: 36, name: "Oklahoma", abbr: "OK"},
        {id: 37, name: "Oregon", abbr: "OR"},
        {id: 38, name: "Pennsylvania", abbr: "PA"},
        {id: 39, name: "Rhode Island", abbr: "RI"},
        {id: 40, name: "South Carolina", abbr: "SC"},
        {id: 41, name: "South Dakota", abbr: "SD"},
        {id: 42, name: "Tennessee", abbr: "TN"},
        {id: 43, name: "Texas", abbr: "TX"},
        {id: 44, name: "Utah", abbr: "UT"},
        {id: 45, name: "Vermont", abbr: "VT"},
        {id: 46, name: "Virginia", abbr: "VA"},
        {id: 47, name: "Washington", abbr: "WA"},
        {id: 48, name: "West Virginia", abbr: "WV"},
        {id: 49, name: "Wisconsin", abbr: "WI"},
        {id: 50, name: "Wyoming", abbr: "WY"}
    ], function(state) {
        Meteor.states.insert(state)
    })
}


esc.server.evolutions.ONE = function() {
    esc.server.insertDisableApiSetting()
    esc.server.insertStates()
}

Meteor.methods({

    'applySchema': function() {
        esc.server.evolutions.ONE();
    }
})