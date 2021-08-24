const generator = require('../src/generator')

const theme = (key, fallback) =>
    ({
        spacing: { 0: '0', 1: '0.25rem' },
        colors: { white: 'white', black: 'black', red: { 100: '#fee2e2', 900: '#7f1d1d' } },
        borderWidth: { 0: '0', DEFAULT: '1px' },
        screens: { sm: '640px', lg: '1024px' }
    }[key] || fallback)

it('generates a safelist without tokens', () =>
    expect(generator(theme)(['m-0'])).toEqual(['m-0']))

it('generates a safelist with a token', () =>
    expect(generator(theme)(['border-{colors}'])).toEqual(['border-white', 'border-black', 'border-red-100', 'border-red-900']))

it('generates a safelist with multiple tokens', () =>
    expect(generator(theme)(['{screens}:m-{spacing}'])).toEqual(['sm:m-0', 'lg:m-0', 'sm:m-1', 'lg:m-1']))

it('strips "DEFAULT" keys', () =>
    expect(generator(theme)(['border-{borderWidth}'])).toEqual(['border-0', 'border']))
