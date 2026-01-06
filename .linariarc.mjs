const isProd = process.env.NODE_ENV === 'production';

export default {
  evaluate: true,
  displayName: !isProd,
  classNameSlug: isProd ? '[hash]' : '[title]_[hash]',
};
