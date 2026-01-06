import { expect } from 'vitest';

const collectRules = (
  ruleList: CSSRuleList,
  acc: CSSStyleRule[] = []
): CSSStyleRule[] => {
  for (const rule of Array.from(ruleList)) {
    if (rule instanceof CSSStyleRule) {
      acc.push(rule);
    } else if (rule instanceof CSSGroupingRule) {
      collectRules(rule.cssRules, acc);
    }
  }
  return acc;
};

const buildSelector = (className: string, modifier?: string): string => {
  const root = `.${className}`;

  if (!modifier) return root;

  return modifier.includes('&')
    ? modifier.replace(/&/g, root)
    : `${root} ${modifier}`;
};

const normalizeCSSValue = (value: string): string => {
  // Values that should be treated as empty
  const emptyEquivalents = ['none', 'text'];

  if (emptyEquivalents.includes(value)) return '';
  return value;
};

type ModifierOptions = { modifier?: string };

expect.extend({
  toHaveStyleRule(
    className: string,
    property: string,
    expected: string,
    options?: ModifierOptions
  ) {
    const selector = buildSelector(className, options?.modifier);
    let allRules: CSSStyleRule[] = [];

    for (const sheet of Array.from(document.styleSheets)) {
      if (sheet.cssRules) {
        allRules = allRules.concat(collectRules(sheet.cssRules));
      }
    }

    const matchingRule = allRules.find(
      (rule) => rule.selectorText === selector
    );

    if (!matchingRule) {
      return {
        pass: false,
        message: () =>
          `\nNo CSS rule found for selector: ${selector}\n(property: ${property})\n`,
      };
    }

    const received = matchingRule.style.getPropertyValue(property).trim();
    const modifierText = options?.modifier ?? 'none';
    const pass = normalizeCSSValue(received) === normalizeCSSValue(expected);

    return {
      pass,
      message: () =>
        pass
          ? `Received ${property}: ${received}, modifier: ${modifierText}\n`
          : `Received ${property}: ${received}, modifier: ${modifierText}\n`,
    };
  },
});

declare module 'vitest' {
  interface Assertion<T = any> {
    toHaveStyleRule(
      property: string,
      expected: string,
      options?: { modifier?: string }
    ): T;
  }
}
