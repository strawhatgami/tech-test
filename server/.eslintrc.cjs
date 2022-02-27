module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-param-reassign': 'warn', // slows dev
    'consistent-return': 'off', // prevents to write "return next(err);" (even if this return value is undefined)
    'eqeqeq': 'off', // highly slows dev (but maybe not for the devs that don't know all subtilities of JS ? )
    'import/extensions': 'off', // breaks imports in raw node.js
    'quote-props': 'off', // slows dev
    'no-console': 'off', // slows dev
    'func-names': 'off', // breaks mongoose schemas methods
    'import/prefer-default-export': 'off', // not compatible with modules that are functions collections (misc libs, controllers, ...)
    'no-restricted-globals': 'off', // this restricts the use of isNaN, WTF?
    'no-use-before-define': 'off', // breaks models initialisation when statics use model ref
  },
};
