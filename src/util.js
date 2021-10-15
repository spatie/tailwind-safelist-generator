// See https://stackoverflow.com/a/44338759
module.exports.cartesian = function cartesian(array) {
    function* cartesian(head, ...tail) {
        let remainder = tail.length ? cartesian(...tail) : [[]]
        for (let r of remainder) for (let h of head) yield [h, ...r]
    }

    return [...cartesian(...array)]
}

// See https://stackoverflow.com/a/47063174
module.exports.deepKeys = function deepKeys(object, separator = '.', prefix = '') {
    return Object.keys(object).reduce((result, key) => {
        if (Array.isArray(object[key])) {
            return [...result, prefix + key];
        } else if (typeof object[key] === 'object' && object[key] !== null) {
            return [...result, ...deepKeys(object[key], separator, prefix + key + separator)];
        }

        return [...result, prefix + key];
  }, []);
}
