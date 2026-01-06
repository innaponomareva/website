import { beforeAll, describe, expect, it, vi } from 'vitest';
import TextInput, { textInputClass } from './TextInput';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';
import { labelClass } from './Label';
import { errorMessageClass } from './ErrorMessage';
import { render, screen, within } from '../../utils/tests/setupTests';
import { colors } from '../../common';

vi.mock('../../hooks/useThemeContext');
const mockedUseThemeContext = vi.mocked(useThemeContext);
mockedUseThemeContext.mockReturnValue({
  theme: Themes.LIGHT,
  changeTheme: vi.fn(),
});

describe('<TextInput />', () => {
  const textInputProps = {
    className: 'sample-class-name',
    label: 'Email',
    id: 'email',
    type: 'email',
    name: 'email',
    helperText: 'Enter your email',
    error: 'This field is required',
  };

  const element = <TextInput {...textInputProps} />;

  let view: ReturnType<typeof render>;
  let textInputElem: HTMLDivElement;

  beforeAll(() => {
    view = render(element);
    textInputElem = view.container.firstChild as HTMLDivElement;
  });

  it('should render once', () => {
    expect(textInputElem).toBeInTheDocument();
    screen.debug();
  });
  it('should have textInputClass to apply custom styles', () => {
    expect(textInputElem).toHaveClass(textInputClass);
  });
  it('should add the className provided', () => {
    expect(textInputElem).toHaveClass(textInputProps.className);
  });
  it('should render with "light" class when in light mode', () => {
    expect(textInputElem).toHaveClass(Themes.LIGHT);
    expect(textInputElem).not.toHaveClass(Themes.DARK);
  });

  describe('label', () => {
    describe('when label is provided', () => {
      let labelElem: HTMLLabelElement;

      beforeAll(() => {
        labelElem = within(textInputElem).getByText(
          textInputProps.label
        ) as HTMLLabelElement;
      });

      it('should render once', () => {
        expect(labelElem).toBeInTheDocument();
      });
      it('should render as the 1st child', () => {
        expect(textInputElem.firstChild).toEqual(labelElem);
      });
      it('should be rendered as <Label /> component', () => {
        expect(labelElem).toHaveClass(labelClass);
      });
      it('should have correct "for" attriute', () => {
        expect(labelElem).toHaveAttribute('for', textInputProps.id);
      });
    });

    describe('when label is NOT provided', () => {
      it('should not render any label element', () => {
        view.rerender(<TextInput {...textInputProps} label="" />);
        textInputElem = view.container.firstChild as HTMLDivElement;
        const labelElem = within(textInputElem).queryByText(
          textInputProps.label
        );
        expect(labelElem).not.toBeInTheDocument();
      });
    });
  });

  describe('input', () => {
    let inputElem: HTMLInputElement;

    beforeAll(() => {
      view.rerender(element);
      textInputElem = view.container.firstChild as HTMLDivElement;
      inputElem = within(textInputElem).getByRole(
        'textbox'
      ) as HTMLInputElement;
    });

    it('should render once', () => {
      expect(inputElem).toBeInTheDocument();
    });
    it('should come as the second child after label', () => {
      expect(inputElem).toEqual(textInputElem.children[1]);
    });
    it('should have correct attributes', () => {
      expect(inputElem).toHaveAttribute('autocomplete', 'off');
      expect(inputElem).toHaveAttribute('id', textInputProps.id);
      expect(inputElem).toHaveAttribute('type', textInputProps.type);
      expect(inputElem).toHaveAttribute('name', textInputProps.name);
      expect(inputElem).toHaveAttribute(
        'placeholder',
        textInputProps.helperText
      );
    });
  });

  describe('error message', () => {
    describe('when error is provided', () => {
      let errorMessageElem: HTMLParagraphElement;

      beforeAll(() => {
        errorMessageElem = within(textInputElem).getByText(
          textInputProps.error
        ) as HTMLParagraphElement;
      });

      it('should render once', () => {
        expect(errorMessageElem).toBeInTheDocument();
      });
      it('should come as the last child', () => {
        expect(errorMessageElem).toEqual(textInputElem.lastChild);
      });
      it('should render as <ErrorMessage />', () => {
        expect(errorMessageElem).toHaveClass(errorMessageClass);
      });
    });

    describe('when error is NOT provided', () => {
      it('should render an empty paragraph element', () => {
        view.rerender(<TextInput {...textInputProps} error={undefined} />);
        textInputElem = view.container.firstChild as HTMLDivElement;
        const errorMessageElem =
          textInputElem.lastChild as HTMLParagraphElement;
        expect(errorMessageElem).toBeInTheDocument();
        expect(errorMessageElem).toHaveTextContent('');
      });
    });
  });

  describe('when in dark mode', () => {
    it('should apply "dark" class', () => {
      mockedUseThemeContext.mockReturnValue({
        theme: Themes.DARK,
        changeTheme: vi.fn(),
      });
      const { container } = render(element);
      textInputElem = container.firstChild as HTMLDivElement;
      expect(textInputElem).toHaveClass(Themes.DARK);
      expect(textInputElem).not.toHaveClass(Themes.LIGHT);
    });
  });

  describe('when testing styles', () => {
    describe('textInputClass', () => {
      it('should render as grid container', () => {
        expect(textInputClass).toHaveStyleRule('display', 'grid');
      });

      describe('input', () => {
        const inputModifier = 'input';

        it('should not have default border styles', () => {
          expect(textInputClass).toHaveStyleRule('border', 'none', {
            modifier: inputModifier,
          });
        });
        it('should have correct border-bottom', () => {
          expect(textInputClass).toHaveStyleRule(
            'border-bottom',
            `0.075rem solid ${colors.WHITE_100}`,
            {
              modifier: inputModifier,
            }
          );
        });
        it('should have a transparent background', () => {
          expect(textInputClass).toHaveStyleRule('background', 'transparent', {
            modifier: inputModifier,
          });
        });
        it('should have correct padding', () => {
          expect(textInputClass).toHaveStyleRule('padding', '1rem', {
            modifier: inputModifier,
          });
        });
        it('should apply correct text color', () => {
          expect(textInputClass).toHaveStyleRule('color', colors.BLUE_2, {
            modifier: inputModifier,
          });
        });
        it('should have correct font-size', () => {
          expect(textInputClass).toHaveStyleRule('font-size', '1.07rem', {
            modifier: inputModifier,
          });
        });
        it('should have correct font-weight', () => {
          expect(textInputClass).toHaveStyleRule('font-weight', '300', {
            modifier: inputModifier,
          });
        });
        it('should not have outline by focus', () => {
          expect(textInputClass).toHaveStyleRule('outline', 'none', {
            modifier: `${inputModifier}:focus`,
          });
        });
        it('should have correct styles for placeholder text', () => {
          expect(textInputClass).toHaveStyleRule('color', colors.BLUE_2, {
            modifier: `${inputModifier}::placeholder`,
          });
          expect(textInputClass).toHaveStyleRule('opacity', '0.4', {
            modifier: `${inputModifier}::placeholder`,
          });
        });
        it('should have correct styles for autofill (no background and correct color)', () => {
          expect(textInputClass).toHaveStyleRule(
            '-webkit-background-clip',
            'text',
            {
              modifier: `${inputModifier}:-webkit-autofill`,
            }
          );
          expect(textInputClass).toHaveStyleRule(
            '-webkit-text-fill-color',
            colors.BLUE_2,
            {
              modifier: `${inputModifier}:-webkit-autofill`,
            }
          );
        });
      });

      describe('for dark mode', () => {
        const darkModifier = '&.dark';

        describe('input', () => {
          const darkInputModifier = `${darkModifier} input`;

          it('should have correct border-bottom color', () => {
            expect(textInputClass).toHaveStyleRule(
              'border-bottom-color',
              colors.WHITE_80,
              {
                modifier: darkInputModifier,
              }
            );
          });
          it('should have correct text color', () => {
            expect(textInputClass).toHaveStyleRule('color', colors.WHITE_80, {
              modifier: darkInputModifier,
            });
          });
          it('should have correct styles for placeholder text', () => {
            expect(textInputClass).toHaveStyleRule('color', colors.WHITE_20, {
              modifier: `${darkInputModifier}::placeholder`,
            });
            expect(textInputClass).toHaveStyleRule('opacity', '1', {
              modifier: `${darkInputModifier}::placeholder`,
            });
          });
          it('should have correct color for autofill text', () => {
            expect(textInputClass).toHaveStyleRule(
              '-webkit-text-fill-color',
              colors.WHITE_80,
              {
                modifier: `${darkInputModifier}:-webkit-autofill`,
              }
            );
          });
        });
      });
    });
  });
});
