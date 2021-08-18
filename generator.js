module.exports = function (theme) {
    return function (patterns) {
        function getTokenValues(token) {
            if (!token.startsWith('{')) {
                return [token];
            }

            return Object.keys(theme(token.replace(/{|}/g, ''), {}));
        }

        return patterns
            .map((pattern) => pattern.split(/(?={[^}]+})|(?<={[^}]+})/))
            .map((tokens) => tokens.map(getTokenValues))
            .map(cartesian)
            .flatMap((expanded) => expanded.map((values) => values.join('').replace('-DEFAULT', '')));
    }
}

// See https://stackoverflow.com/a/44338759
function cartesian(array) {
    function* cartesian(head, ...tail) {
        let remainder = tail.length ? cartesian(...tail) : [[]];
        for (let r of remainder) for (let h of head) yield [h, ...r];
    }

    return [...cartesian(...array)];
}
