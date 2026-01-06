import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, within } from '../../utils/tests/setupTests';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';
import Label, { labelClass } from './Label';
import { colors } from '../../common';

vi.mock('../../hooks/useThemeContext');
const mockedUseThemeContext = vi.mocked(useThemeContext);
mockedUseThemeContext.mockReturnValue({
  theme: Themes.LIGHT,
  changeTheme: vi.fn(),
});

describe('<Label />', () => {
  const labelProps = {
    text: 'email',
    htmlFor: 'email',
    className: 'sample-class-name',
  };

  const element = <Label {...labelProps} />;

  let labelElem: HTMLLabelElement;

  beforeAll(() => {
    const { container } = render(element);
    labelElem = within(container).getByText(
      labelProps.text
    ) as HTMLLabelElement;
  });

  it('should render once', () => {
    expect(labelElem).toBeInTheDocument();
  });
  it('should have labelClass to apply custom styles', () => {
    expect(labelElem).toHaveClass(labelClass);
  });
  it('should add the className provided', () => {
    expect(labelElem).toHaveClass(labelProps.className);
  });
  it('should have correct "for" attribute', () => {
    expect(labelElem).toHaveAttribute('for', labelProps.htmlFor);
  });
  it('should render with "light" class when in light mode', () => {
    expect(labelElem).toHaveClass(Themes.LIGHT);
    expect(labelElem).not.toHaveClass(Themes.DARK);
  });

  describe('when in dark mode', () => {
    it('should apply "dark" class', () => {
      mockedUseThemeContext.mockReturnValue({
        theme: Themes.DARK,
        changeTheme: vi.fn(),
      });
      const { container } = render(element);
      labelElem = within(container).getByText(
        labelProps.text
      ) as HTMLLabelElement;
      expect(labelElem).toHaveClass(Themes.DARK);
      expect(labelElem).not.toHaveClass(Themes.LIGHT);
    });
  });

  describe('when testing styles', () => {
    describe('labelClass', () => {
      it('should have correct font-size', () => {
        expect(labelClass).toHaveStyleRule('font-size', '0.95rem');
      });
      it('should have correct font-weight', () => {
        expect(labelClass).toHaveStyleRule('font-weight', '300');
      });
      it('should have correct letter-spacing', () => {
        expect(labelClass).toHaveStyleRule('letter-spacing', '0.2rem');
      });
      it('should render in uppercase', () => {
        expect(labelClass).toHaveStyleRule('text-transform', 'uppercase');
      });
      it('should have correct text color', () => {
        expect(labelClass).toHaveStyleRule('color', colors.WHITE_100);
      });
      it('should have correct text color', () => {
        expect(labelClass).toHaveStyleRule('color', colors.WHITE_100);
      });
    });

    describe('for dark mode', () => {
      it('should have correct text color', () => {
        expect(labelClass).toHaveStyleRule('color', colors.WHITE_80, {
          modifier: '&.dark',
        });
      });
    });
  });
});
