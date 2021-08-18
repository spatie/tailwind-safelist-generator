const fs = require('fs');
const plugin = require('tailwindcss/plugin');
const generator = require('./generator')

module.exports = plugin.withOptions(function ({ path = 'safelist.txt', patterns = [] }) {
    return function ({ theme }) {
        fs.writeFileSync(path, generator(theme)(patterns).join('\n'));
    };
});
