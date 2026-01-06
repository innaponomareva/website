import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, within } from '../../utils/tests/setupTests';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';
import { colors } from '../../common';
import ErrorMessage, { errorMessageClass } from './ErrorMessage';

vi.mock('../../hooks/useThemeContext');
const mockedUseThemeContext = vi.mocked(useThemeContext);
mockedUseThemeContext.mockReturnValue({
  theme: Themes.LIGHT,
  changeTheme: vi.fn(),
});

describe('<ErrorMessage />', () => {
  const errorMessageProps = {
    text: 'error',
    className: 'sample-class-name',
  };

  const element = <ErrorMessage {...errorMessageProps} />;

  let errorMessageElem: HTMLParagraphElement;

  beforeAll(() => {
    const { container } = render(element);
    errorMessageElem = within(container).getByText(
      errorMessageProps.text
    ) as HTMLParagraphElement;
  });

  it('should render once', () => {
    expect(errorMessageElem).toBeInTheDocument();
  });
  it('should have errorMessageClass to apply custom styles', () => {
    expect(errorMessageElem).toHaveClass(errorMessageClass);
  });
  it('should add the className provided', () => {
    expect(errorMessageElem).toHaveClass(errorMessageProps.className);
  });

  describe('when testing styles', () => {
    describe('errorMessageClass', () => {
      it('should have correct height', () => {
        expect(errorMessageClass).toHaveStyleRule('height', '3rem');
      });
      it('should have correct correct padding-top', () => {
        expect(errorMessageClass).toHaveStyleRule('padding-top', '0.25rem');
      });

      it('should have correct correct font-family', () => {
        expect(errorMessageClass).toHaveStyleRule(
          'font-family',
          'Roboto-Light'
        );
      });
      it('should have correct correct font-size', () => {
        expect(errorMessageClass).toHaveStyleRule('font-size', '0.9rem');
      });
      it('should have correct correct text color', () => {
        expect(errorMessageClass).toHaveStyleRule('color', colors.WHITE_60);
      });
    });
  });
});
