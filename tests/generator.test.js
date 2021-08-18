const generator = require('../generator');

function theme(key, fallback) {
    return {
        spacing: { 0: '0', 1: '0.25rem', 2: '0.5rem', 4: '1rem' },
        colors: { white: 'white', black: 'black' },
        borderWidth: { 0: '0', DEFAULT: '1px' },
        screens: { sm: '640px', lg: '1024px' }
    }[key] || fallback;
}

it('generates a safelist without tokens', function () {
    expect(generator(theme)(['m-0'])).toEqual(['m-0']);
});

it('generates a safelist with a token', function () {
    expect(generator(theme)(['border-{colors}'])).toEqual(['border-white', 'border-black']);
});

it('generates a safelist with multiple tokens', function () {
    expect(generator(theme)(['{screens}:border-{colors}'])).toEqual(['sm:border-white', 'lg:border-white', 'sm:border-black', 'lg:border-black']);
});

it('strips "DEFAULT" keys', function () {
    expect(generator(theme)(['border-{borderWidth}'])).toEqual(['border-0', 'border']);
});
