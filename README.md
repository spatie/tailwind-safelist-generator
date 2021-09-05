# Tailwind plugin to generate safelist.txt files

[![Latest Version on NPM](https://img.shields.io/npm/v/tailwind-safelist-generator.svg?style=flat-square)](https://npmjs.com/package/tailwind-safelist-generator)

With `tailwind-safelist-generator`, you can generate a `safelist.txt` file for your theme based on a set of patterns.

```js
module.exports = {
  mode: 'jit'
  purge: [
    './**/*.html',
    './safelist.txt',
  ],
  plugins: [
    require('tailwind-safelist-generator')({
      path: 'safelist.txt',
      patterns: [
        'text-{colors}',
        'border-{borderWidth}',
        '{screens}:gap-{gap}',
      ],
    }),
  ],
};
```

Before you consider this plugin, we recommend reading Tailwind's [purgeable HTML docs](https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html). If this isn't an option—like when you need to generate Tailwind classes with dynamic data from a CMS—this is for you.

Tailwind's JIT mode scans your codebase for class names, and generates CSS based on what it finds. If a class name is not listed explicitly, like `text-${error ? 'red' : 'green'}-500`, Tailwind won't discover it. To ensure these utilities are generated, you can maintain a file that lists them explicitly, like a `safelist.txt` file in the root of your project.

```txt
text-red-100
text-red-200
```

```js
module.exports = {
  mode: 'jit'
  purge: [
    './**/*.html',
    './safelist.txt',
  ],
};
```

Maintaining this list can become cumbersome, because whenever you update your theme you need to update the safelist. That's why we created `tailwind-safelist-generator`, so you can declare a set of classes you don't want to purge that stay in sync with your theme.

## Support us

[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/tailwind-safelist-generator.jpg?t=1" width="419px" />](https://spatie.be/github-ad-click/tailwind-safelist-generator)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## Installation

You can install the package via npm or yarn:

```bash
npm i tailwind-safelist-generator
```

Next, register the plugin in your Tailwind configuration file and specify the patterns you want to safelist. Don't forget to add `./safelist.txt` to Tailwind's `purge` option.

```js
module.exports = {
  mode: 'jit'
  purge: [
    './**/*.html',
    './safelist.txt',
  ],
  plugins: [
    require('tailwind-safelist-generator')({
      patterns: [
        'text-{colors}',
        'border-{borderWidth}',
        '{screens}:gap-{gap}',
      ],
    }),
  ],
};
```

We recommend adding `safelist.txt` to your `.gitignore` file, since it's an artifact that gets generated whenever Tailwind generates CSS.

## Options

### `path`

The path and filename where `safelist.txt` will be generated. By default, it's placed in the root of your project.

```js
module.exports = {
  plugins: [
    require('tailwind-safelist-generator')({
      path: 'resources/css/safelist.txt',
      patterns: [
        // …
      ],
    }),
  ],
};
```

### `patterns`

The patterns to generate the list from.

```js
module.exports = {
  plugins: [
    require('tailwind-safelist-generator')({
      patterns: [
        'text-{color}',
        'border-{borderWidth}',
        '{screens}:gap-{gap}',
      ],
    }),
  ],
};
```

Each token wrapped in `{}` will be passed through Tailwind's `theme()` helper to retrieve all possible values. Then the plugin generates a list of all combinations.

List of all available tokens can be found [here](https://tailwindcss.com/docs/theme#configuration-reference).

```txt
text-{colors} → text-{red-100,red-200,…}

text-red-100
text-red-200
```

Using more than one token may generate a long list of combinations:

```txt
{screens}:gap-{gap} → {sm,lg}:gap-{0,1,2,4,…}

sm:gap-0
sm:gap-1
sm:gap-2
sm:gap-4
md:gap-0
md:gap-1
md:gap-2
md:gap-4
```

## Testing

Tests are written with Jest.

```bash
npm run test
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
