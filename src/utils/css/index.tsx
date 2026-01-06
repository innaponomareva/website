import { breakpoints } from '../../common';

export const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }).map(
    (_, i) => `:nth-child(${start + i})`
  );

export const nthChild = (value: number | string) => `:nth-child(${value})`;

type BreakpointKey = keyof typeof breakpoints;

export const mediaMin = (Object.keys(breakpoints) as BreakpointKey[]).reduce(
  (acc, key) => {
    acc[key] = `@media (min-width: ${breakpoints[key]}px)`;
    return acc;
  },
  {} as Record<BreakpointKey, string>
);
