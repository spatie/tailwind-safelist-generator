const { cartesian, deepKeys } = require('./util')

const extractTokens = pattern =>
    pattern.split(/(?={[^}]+})|(?<={[^}]+})/)

const expandTokens = theme => tokens =>
    tokens.map(token =>
        token.startsWith('{')
            ? deepKeys(theme(token.replace(/{|}/g, ''), {}), '-')
            : [token])

const mapToClasses = expanded =>
    expanded.map(values =>
        values.join('').replace('-DEFAULT', ''))

module.exports = theme => patterns =>
    patterns                       // ["text-{gray}", …]
        .map(extractTokens)        // [["text", "{gray}"], …]
        .map(expandTokens(theme))  // [[["text"], ["gray-100", "gray-200",…]], …]
        .map(cartesian)            // [[["text", "gray-100"], ["text", "gray-200"], …], …]
        .flatMap(mapToClasses)     // ["text-gray-100", "text-gray-200",…]
