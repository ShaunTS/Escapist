esc.schemaTypes.apiKey = function() {
    return {
        app: "",
        type: "",
        name: "",
        key: "",
        url: ""
    }
}

esc.schemaTypes.appSetting = function() {

    return {
        name: "",
        typ: "boolean",
        value: false,
        verify: function() {

            return (
                _II.nonEmptyStrings([this.name, this.typ]) &&
                (typeof this.value === this.typ)
            )
        }
    }
}

esc.schemaTypes.addr = function() {

    return {
        name: "",
        street: "",
        city: "",
        state: null,
        zip: "",
        formDefault: false
    }
}

esc.schemaTypes.geo = function() {

    return {
        place_id: ""
        lat: NaN,
        lng: NaN,
        ne: {
            lat: NaN,
            lng: NaN
        },
        sw: {
            lat: NaN,
            lng: NaN
        }
    }
}