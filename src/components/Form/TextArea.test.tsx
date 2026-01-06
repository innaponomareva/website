import { beforeAll, describe, expect, it, vi } from 'vitest';
import TextAria, { textAreaClass } from './TextArea';
import { render, within } from '../../utils/tests/setupTests';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';
import { labelClass } from './Label';
import { errorMessageClass } from './ErrorMessage';
import TextArea from './TextArea';
import { colors } from '../../common';

vi.mock('../../hooks/useThemeContext');
const mockedUseThemeContext = vi.mocked(useThemeContext);
mockedUseThemeContext.mockReturnValue({
  theme: Themes.LIGHT,
  changeTheme: vi.fn(),
});

describe('<TextArea />', () => {
  const textAreaProps = {
    className: 'sample-class-name',
    label: 'Message',
    id: 'message',
    name: 'message',
    helperText: 'Your message',
    maxlength: '1500',
    tabindex: '1',
    error: 'This field is required',
  };

  const element = <TextArea {...textAreaProps} />;

  let view: ReturnType<typeof render>;
  let textAreaElem: HTMLDivElement;

  beforeAll(() => {
    view = render(element);
    textAreaElem = view.container.firstChild as HTMLDivElement;
  });

  it('should render once', () => {
    expect(textAreaElem).toBeInTheDocument();
  });
  it('should have textAreaClass to apply custom styles', () => {
    expect(textAreaElem).toHaveClass(textAreaClass);
  });
  it('should add the className provided', () => {
    expect(textAreaElem).toHaveClass(textAreaProps.className);
  });
  it('should render with "light" class when in light mode', () => {
    expect(textAreaElem).toHaveClass(Themes.LIGHT);
    expect(textAreaElem).not.toHaveClass(Themes.DARK);
  });

  describe('label', () => {
    describe('when label is provided', () => {
      let labelElem: HTMLLabelElement;

      beforeAll(() => {
        labelElem = within(textAreaElem).getByText(
          textAreaProps.label
        ) as HTMLLabelElement;
      });

      it('should render once', () => {
        expect(labelElem).toBeInTheDocument();
      });
      it('should render as the 1st child', () => {
        expect(textAreaElem.firstChild).toEqual(labelElem);
      });
      it('should be rendered as <Label /> component', () => {
        expect(labelElem).toHaveClass(labelClass);
      });
      it('should have correct "for" attriute', () => {
        expect(labelElem).toHaveAttribute('for', textAreaProps.id);
      });
    });

    describe('when label is NOT provided', () => {
      it('should not render any label element', () => {
        view.rerender(<TextAria {...textAreaProps} label="" />);
        textAreaElem = view.container.firstChild as HTMLDivElement;
        const labelElem = within(textAreaElem).queryByText(textAreaProps.label);
        expect(labelElem).not.toBeInTheDocument();
      });
    });
  });

  describe('textarea', () => {
    let textareaElem: HTMLTextAreaElement;

    beforeAll(() => {
      view.rerender(element);
      textAreaElem = view.container.firstChild as HTMLDivElement;
      textareaElem = within(textAreaElem).getByRole(
        'textbox'
      ) as HTMLTextAreaElement;
    });

    it('should render once', () => {
      expect(textareaElem).toBeInTheDocument();
    });
    it('should come as the second child after label', () => {
      expect(textareaElem).toEqual(textAreaElem.children[1]);
    });
    it('should have correct attributes', () => {
      expect(textareaElem).toHaveAttribute('id', textAreaProps.id);
      expect(textareaElem).toHaveAttribute('name', textAreaProps.name);
      expect(textareaElem).toHaveAttribute(
        'placeholder',
        textAreaProps.helperText
      );
      expect(textareaElem).toHaveAttribute(
        'maxlength',
        textAreaProps.maxlength
      );
      expect(textareaElem).toHaveAttribute('tabindex', textAreaProps.tabindex);
    });
  });

  describe('error message', () => {
    describe('when error is provided', () => {
      let errorMessageElem: HTMLParagraphElement;

      beforeAll(() => {
        errorMessageElem = within(textAreaElem).getByText(
          textAreaProps.error
        ) as HTMLParagraphElement;
      });

      it('should render once', () => {
        expect(errorMessageElem).toBeInTheDocument();
      });
      it('should come as the last child', () => {
        expect(errorMessageElem).toEqual(textAreaElem.lastChild);
      });
      it('should render as <ErrorMessage />', () => {
        expect(errorMessageElem).toHaveClass(errorMessageClass);
      });
    });

    describe('when error is NOT provided', () => {
      it('should render an empty paragraph element', () => {
        view.rerender(<TextAria {...textAreaProps} error={undefined} />);
        textAreaElem = view.container.firstChild as HTMLDivElement;
        const errorMessageElem = textAreaElem.lastChild as HTMLParagraphElement;
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
      textAreaElem = container.firstChild as HTMLDivElement;
      expect(textAreaElem).toHaveClass(Themes.DARK);
      expect(textAreaElem).not.toHaveClass(Themes.LIGHT);
    });
  });

  describe('when testing styles', () => {
    describe('textAreaClass', () => {
      it('should render as grid container', () => {
        expect(textAreaClass).toHaveStyleRule('display', 'grid');
      });
    });

    describe('textarea', () => {
      const textareaModifier = 'textarea';

      it('should not have default border styles', () => {
        expect(textAreaClass).toHaveStyleRule('border', 'none', {
          modifier: textareaModifier,
        });
      });
      it('should have a transparent background', () => {
        expect(textAreaClass).toHaveStyleRule('background', 'transparent', {
          modifier: textareaModifier,
        });
      });
      it('should not be resizable', () => {
        expect(textAreaClass).toHaveStyleRule('resize', 'none', {
          modifier: textareaModifier,
        });
      });
      it('should correct height', () => {
        expect(textAreaClass).toHaveStyleRule('height', '12rem', {
          modifier: textareaModifier,
        });
      });
      it('should correct padding', () => {
        expect(textAreaClass).toHaveStyleRule('padding', '1rem', {
          modifier: textareaModifier,
        });
      });
      it('should correct border-bottom styles', () => {
        expect(textAreaClass).toHaveStyleRule(
          'border-bottom',
          `0.075rem solid ${colors.WHITE_100}`,
          {
            modifier: textareaModifier,
          }
        );
      });
      it('should correct text color', () => {
        expect(textAreaClass).toHaveStyleRule('color', colors.BLUE_2, {
          modifier: textareaModifier,
        });
      });
      it('should correct font-size', () => {
        expect(textAreaClass).toHaveStyleRule('font-size', '1.07rem', {
          modifier: textareaModifier,
        });
      });
      it('should correct font-weight', () => {
        expect(textAreaClass).toHaveStyleRule('font-weight', '300', {
          modifier: textareaModifier,
        });
      });
      it('should not have outline by focus', () => {
        expect(textAreaClass).toHaveStyleRule('outline', 'none', {
          modifier: `${textareaModifier}:focus`,
        });
      });

      it('should have correct styles for placeholder text', () => {
        expect(textAreaClass).toHaveStyleRule('color', colors.BLUE_2, {
          modifier: `${textareaModifier}::placeholder`,
        });
        expect(textAreaClass).toHaveStyleRule('opacity', '0.4', {
          modifier: `${textareaModifier}::placeholder`,
        });
      });
    });

    describe('for dark mode', () => {
      const darkModifier = '&.dark';

      describe('textarea', () => {
        const darkTextareaModifier = `${darkModifier} textarea`;

        it('should have correct border-bottom color', () => {
          expect(textAreaClass).toHaveStyleRule(
            'border-bottom-color',
            colors.WHITE_80,
            {
              modifier: darkTextareaModifier,
            }
          );
        });
        it('should have correct text color', () => {
          expect(textAreaClass).toHaveStyleRule('color', colors.WHITE_80, {
            modifier: darkTextareaModifier,
          });
        });
        it('should have correct styles for placeholder text', () => {
          expect(textAreaClass).toHaveStyleRule('color', colors.WHITE_20, {
            modifier: `${darkTextareaModifier}::placeholder`,
          });
          expect(textAreaClass).toHaveStyleRule('opacity', '1', {
            modifier: `${darkTextareaModifier}::placeholder`,
          });
        });
      });
    });
  });
});
