_II = {};

(function(_ii) {

    if(_.isUndefined(_ii)) {
        _ii = {};
    }

    _ii.errors = {};

    _ii.errors.failedGet = function(obj, keyString) {
        throw Error(
            [
                '(_II ERROR) Failed get on obj[', obj, '] for keystring(', keyString, ') '
            ].join("")
        );
    };

    _ii.errors.failedGetType = function(obj, keyString, typ) {
        throw Error(
            [
                '(_II ERROR) Failed get on obj[', obj,
                '] for keystring(', keyString, ') ',
                'not of type(', typ, ')'
            ].join("")
        );
    };

    _ii.isNone = function(arg) {
        return (
            _.isUndefined(arg) || _.isNull(arg) || _.isNaN(arg)
        );
    };

    _ii.nonEmpty = function(obj) {
        return !(_ii.isNone(obj) || _.isEmpty(obj));
    };

    _ii.nonEmptyObj = function(obj) {
        return (_ii.nonEmpty() && _.isObject(obj));
    };

    _ii.nonEmptyArray = function(arr) {
        return (
            _ii.nonEmpty(arr) && (arr instanceof Array)
        );
    };

    _ii.nonEmptyStrings = function(obj) {

        return (
            _ii.nonEmpty(obj) &&
            _.every(obj, function(field) { return !(_.isNull(field) || _.isUndefined(field)) }) &&
            _.every(obj, function(field) { return (typeof field == 'string') }) &&
            _.every(obj, function(field) { return field.length > 0 })
        );
    };

    _ii.sameElements = function(argA, argB) {
        if(_.any([argA, argB], function(arg) {
                return !((arg instanceof Array) || (arg instanceof Object));
            })
        ) throw Error("'sameElements' function requires two arguements that are either an Array or object");

        let listA = _.values(argA);
        let listB = _.values(argB);

        if(listA.length !== listB.length) return false;

        return _.every(listA, function(element) { return listB.includes(element) });
    };

    _ii.hasKey = function(obj, keyString) {
        if(!_ii.nonEmptyString(keyString)) return false;

        try {
            var tryVal = obj;

            let nested = _.initial(keyString.split("."));
            let test = _.last(keyString.split("."));

            _.each(nested, function(key) {
                tryVal = tryVal[key];
            });

            return _.has(tryVal, test);
        }
        catch(e) {
            return false;
        }
    };

    _ii.hasKeys = function(obj, keys) {
        if(!(obj instanceof Object))
            throw Error("First arguement of 'hasKeys' must be an Object");

        if(!(keys instanceof Array))
            throw Error("Second arguement of 'hasKeys' must be an Array");

        return _.every(keys, function(key) {
            return _ii.hasKey(obj, key);
        });
    };

    _ii.isMissing = function(obj, key) {
        return !_ii.hasKey(obj, key)
    };

    _ii.isMissingAny = function(obj, keys) {

        if(!(obj instanceof Object))
            throw Error("First arguement of 'isMissingAny' must be an Object");

        if(!(keys instanceof Array))
            throw Error("Second arguement of 'isMissingAny' must be an Array");

        return _.any(keys, function(key) {
            return _ii.isMissing(obj, key);
        });
    };

    _ii.nonEmptyString = function(str) {
        return (
            !(_.isNull(str) || _.isUndefined(str)) &&
            (typeof str == 'string') &&
            (str.length > 0)
        );
    }

    _ii.nonEmptyNumber = function(n) {
        return (
            !(_.isNull(n) || _.isUndefined(n) || _.isNaN(n)) && _.isNumber(n)
        );
    };

    _ii.greaterThanZero = function(n) {
        return (!_ii.nonEmptyNumber(n) && n > 0);
    };


    _ii.println = function(tag, val) {
        console.log("\n-------------------- " +tag);
        console.log(val);
        console.log("--------------------\n");
    };

    _ii.dateTypeOrNull = function(date) {

        if(date instanceof Date) return date;

        if(_ii.nonEmptyString(date)) return (new Date(date));

        return null;
    };

    _ii.urlLeadingSlash = function(url) {

        if(!_ii.nonEmptyString(url)) return url;

        let fix = [url];

        if(url.charAt(0) !== "/")
            fix.unshift("/");

        return fix.join("");
    }




    _ii.get = function(obj, keyString) {

        if(!_ii.nonEmptyString(keyString))
            _ii.errors.failedGet(obj, keyString)

        try {
            var tryVal = obj;

            _.each(keyString.split("."), function(key) {
                tryVal = tryVal[key];
            });

            return tryVal;
        }
        catch(e) {
            _ii.errors.failedGet(obj, keyString)
        }
    }

    _ii.getBoolean = function(obj, keyString) {
        let getVal = _ii.get(obj, keyString);

        if(typeof getVal !== 'boolean')
            _ii.errors.failedGetType();

        return getVal;
    }

    _ii.getOrElse = function(obj, keyString, fallback) {

        if(!_ii.nonEmptyString(keyString)) return fallback;

        try {

            var tryVal = obj;

            _.each(keyString.split("."), function(key) {
                tryVal = tryVal[key];
            });

            if(_ii.isNone(tryVal)) return fallback;

            return tryVal;
        }
        catch(e) {
            return fallback;
        }
    }

    _ii.getArray = function(obj, keyString) {

        let tryGet = _ii.getOrElse(obj, keyString, []);

        let result = (tryGet instanceof Array) ? tryGet : [];

        return result;
    }

    _ii.getString = function(obj, keyString) {

        if(!_ii.nonEmptyString(keyString)) return "";

        try {

            var tryVal = obj;

            _.each(keyString.split("."), function(key) {
                tryVal = tryVal[key];
            })

            let result = (_ii.nonEmptyString(tryVal)) ? tryVal : "";

            return result;
        }
        catch(e) {
            return "";
        }
    }

    _ii.getStringOrElse = function(obj, keyString, fallback) {

        if(!_ii.nonEmptyString(keyString)) return fallback;

        try {

            var tryVal = obj;

            _.each(keyString.split("."), function(key) {
                tryVal = tryVal[key];
            });

            let result = (_ii.nonEmptyString(tryVal)) ? tryVal : fallback;

            return result;
        }
        catch(e) {
            return fallback;
        }
    }

    _ii.getInt = function(obj, keyString, fallback) {

        if(!_ii.nonEmptyString(keyString)) return "";

        try {
            var tryVal = obj;

            _.each(keyString.split("."), function(key) {
                tryVal = tryVal[key];
            });

            let result = (_ii.nonEmptyNumber(tryVal)) ? tryVal : NaN;

            return result;
        }
        catch(e) {
            return NaN;
        }
    };

    _ii.getIntOrElse = function(obj, keyString, fallback) {

        if(!_ii.nonEmptyString(keyString)) return "";

        try {

            var tryVal = obj;

            _.each(keyString.split("."), function(key) {
                tryVal = tryVal[key];
            });

            let result = (_ii.nonEmptyNumber(tryVal)) ? tryVal : fallback;

            return result;
        }
        catch(e) {
            return fallback;
        }
    };

    _ii.parseIntOrElse = function(num, fallback) {
        try {
            let n = parseInt(num);
            if(!_ii.nonEmptyNumber(n)) return fallback;

            return n;
        }
        catch(e) {
            return fallback;
        }
    };

})(_II);