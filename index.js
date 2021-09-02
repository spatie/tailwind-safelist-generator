const fs = require('fs')
const plugin = require('tailwindcss/plugin')
const generator = require('./src/generator')

module.exports = plugin.withOptions(({ path = 'safelist.txt', patterns = [] }) => ({ theme }) =>
    fs.writeFileSync(path, generator(theme)(patterns).join('\n')))
