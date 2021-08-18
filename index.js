const fs = require('fs');
const plugin = require('tailwindcss/plugin');
const generator = require('./generator')

module.exports = plugin.withOptions(function ({ path = 'purge-safe.txt', patterns = [] }) {
    return function ({ theme }) {
        fs.writeFileSync(path, generator(theme)(patterns).join('\n'));
    };
});

// Trigger actions…
