
esc.server.snapshots.testAddress = function() {

    let testAddr = [
        {
            name: "Southbury Library",
            street: "100 Poverty Rd",
            city: "Southbury",
            state: { "_id" : "fwnHnxhimg68iYoEc", "id" : 7, "name" : "Connecticut", "abbr" : "CT" },
            zip: "06488",
            formDefault: true
        }
    ]

    _.each(testAddr, function(addr) {
        Meteor.addr.update(
            {name: addr.name},
            {$set:
                {
                    street: addr.street,
                    city: addr.city,
                    state: addr.state,
                    zip: addr.zip,
                    formDefault: addr.formDefault
                }
            },
            {upsert: true}
        )
    })
}

Meteor.methods({

    'testAddr': function() {

        esc.server.snapshots.testAddress()
    }
})