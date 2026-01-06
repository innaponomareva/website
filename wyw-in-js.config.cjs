const { shaker } = require('@wyw-in-js/transform');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  evaluate: true,
  displayName: !isProd,
  classNameSlug: isProd ? '[hash]' : '[title]',
  rules: [
    { action: shaker },
    { test: /^\/@/, action: 'ignore' },
    { test: /^\0/, action: 'ignore' },
    { test: /^virtual:/, action: 'ignore' },
    { test: /^virtual:/, action: 'ignore' },
    { test: /[\\/]node_modules[\\/]/, action: 'ignore' },
  ],
};
