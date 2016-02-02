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