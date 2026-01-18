import { beforeAll, describe, expect, it, vi } from 'vitest';
import { render, within } from '../../utils/tests/setupTests';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { Themes, useThemeContext } from '../../hooks/useThemeContext';
import ContactForm, { contactFormClass } from './ContactForm';
import { textInputClass } from './TextInput';
import { errorMessageClass } from './ErrorMessage';
import { textAreaClass } from './TextArea';
import { buttonClass } from '../Button';
import { AlertTypes } from '../Alert';

vi.mock('../../hooks/useThemeContext');
const mockedUseThemeContext = vi.mocked(useThemeContext);
mockedUseThemeContext.mockReturnValue({
  theme: Themes.LIGHT,
  changeTheme: vi.fn(),
});

const fetchMock = vi.spyOn(globalThis, 'fetch');

describe('<ContactForm />', () => {
  const sampleClassName = 'sample-class-name';
  const element = <ContactForm className={sampleClassName} />;

  let view: ReturnType<typeof render>;
  let contactFormElem: HTMLFormElement;

  beforeAll(() => {
    view = render(element);
    contactFormElem = view.container.firstChild as HTMLFormElement;
  });

  it('should render once', () => {
    expect(contactFormElem).toBeInTheDocument();
  });
  it('should have contactFormClass to apply custom styles', () => {
    expect(contactFormElem).toHaveClass(contactFormClass);
  });

  describe('when testing structure', () => {
    describe('alert', () => {
      it('should not render any alert', () => {
        expect(contactFormElem.querySelector('.alert')).toEqual(null);
      });
    });

    describe('contact info', () => {
      let contactInfoElem: HTMLDivElement;

      beforeAll(() => {
        contactInfoElem = contactFormElem.firstChild as HTMLDivElement;
      });

      it('should have "contact-info" class', () => {
        expect(contactInfoElem).toHaveClass('contact-info');
      });

      describe('for name TextInput', () => {
        let nameTextInputElem: HTMLDivElement;

        beforeAll(() => {
          nameTextInputElem = contactInfoElem.firstChild as HTMLDivElement;
        });

        it('should render as TextInput component', () => {
          expect(nameTextInputElem).toHaveClass(textInputClass);
        });
        it('should have a label element with correct text and attributes', () => {
          const labelElem = within(nameTextInputElem).getByText(
            'name',
          ) as HTMLLabelElement;

          expect(labelElem).toBeInTheDocument();
          expect(labelElem).toHaveAttribute('for', 'name');
        });
        it('should have an input element with correct attributes', () => {
          const inputElem = within(nameTextInputElem).getByRole(
            'textbox',
          ) as HTMLInputElement;

          expect(inputElem).toBeInTheDocument();
          expect(inputElem).toHaveAttribute('name', 'name');
          expect(inputElem).toHaveAttribute('placeholder', 'your name');
        });
        it('should render a paragraph element for error messages with no text content by default', () => {
          const errorMessageElem =
            nameTextInputElem.lastChild as HTMLParagraphElement;

          expect(errorMessageElem).toHaveClass(errorMessageClass);
          expect(errorMessageElem).toHaveTextContent('');
        });
      });

      describe('for email TextInput', () => {
        let emailInputElem: HTMLDivElement;

        beforeAll(() => {
          emailInputElem = contactInfoElem.lastChild as HTMLDivElement;
        });

        it('should render as TextInput component', () => {
          expect(emailInputElem).toHaveClass(textInputClass);
        });
        it('should have a label element with correct text and attributes', () => {
          const labelElem = within(emailInputElem).getByText(
            'email',
          ) as HTMLLabelElement;

          expect(labelElem).toBeInTheDocument();
          expect(labelElem).toHaveAttribute('for', 'email');
        });
        it('should have an input element with correct attributes', () => {
          const inputElem = within(emailInputElem).getByRole(
            'textbox',
          ) as HTMLInputElement;

          expect(inputElem).toBeInTheDocument();
          expect(inputElem).toHaveAttribute('name', 'email');
          expect(inputElem).toHaveAttribute('placeholder', 'example@mail.com');
        });
        it('should render a paragraph element for error messages with no text content by default', () => {
          const errorMessageElem =
            emailInputElem.lastChild as HTMLParagraphElement;

          expect(errorMessageElem).toHaveClass(errorMessageClass);
          expect(errorMessageElem).toHaveTextContent('');
        });
      });
    });

    describe('textarea', () => {
      let textAreaElem: HTMLDivElement;

      beforeAll(() => {
        textAreaElem = contactFormElem.children[1] as HTMLDivElement;
      });

      it('should render as TextArea component', () => {
        expect(textAreaElem).toHaveClass(textAreaClass);
      });
      it('should have a label element with correct text and attributes', () => {
        const labelElem = within(textAreaElem).getByText(
          'message',
        ) as HTMLLabelElement;

        expect(labelElem).toBeInTheDocument();
        expect(labelElem).toHaveAttribute('for', 'message');
      });
      it('should have a textarea element with correct attributes', () => {
        const textareaElem = within(textAreaElem).getByRole(
          'textbox',
        ) as HTMLInputElement;

        expect(textareaElem).toBeInTheDocument();
        expect(textareaElem).toHaveAttribute('name', 'message');
        expect(textareaElem).toHaveAttribute('placeholder', 'your message');
      });
      it('should render a paragraph element for error messages with no text content by default', () => {
        const errorMessageElem = textAreaElem.lastChild as HTMLParagraphElement;

        expect(errorMessageElem).toHaveClass(errorMessageClass);
        expect(errorMessageElem).toHaveTextContent('');
      });
    });

    describe('submit button', () => {
      let submitButtonElem: HTMLButtonElement;

      beforeAll(() => {
        submitButtonElem = contactFormElem.children[2] as HTMLButtonElement;
      });

      it('should render as Button component', () => {
        expect(submitButtonElem).toHaveClass(buttonClass);
      });
      it('should have "submit-btn" class for custom styles', () => {
        expect(submitButtonElem).toHaveClass('submit-btn');
      });
      it('should have "border" class to apply border styles', () => {
        expect(submitButtonElem).toHaveClass('border');
      });
      it('should be disabled by default and have "disabled" class to apply correct styles', () => {
        expect(submitButtonElem).toBeDisabled();
        expect(submitButtonElem).toHaveClass('disabled');
      });
      it('should have text content "Submit" by default', () => {
        expect(submitButtonElem).toHaveTextContent('Submit');
      });
      it('should have type submit', () => {
        expect(submitButtonElem).toHaveAttribute('type', 'submit');
      });
    });
  });

  describe('when testing user interaction', () => {
    const setup = () => ({
      user: userEvent.setup(),
      ...render(element),
    });
    const sampleName = 'Fred';
    const sampleValidEmail = 'fred@example.com';
    const sampleValidMessage = 'a'.repeat(12);

    const fillValidForm = async (user: UserEvent, container: HTMLElement) => {
      const [nameInputElem, emailInputElem, textAreaElem] =
        within(container).getAllByRole('textbox');

      await user.type(nameInputElem, sampleName);
      await user.type(emailInputElem, sampleValidEmail);
      await user.type(textAreaElem, sampleValidMessage);
    };

    describe('validation', () => {
      it('should show validation errors for empty required fields after they are touched', async () => {
        const { user, container } = setup();
        const [nameInputElem, emailInputElem, textAreaElem] =
          within(container).getAllByRole('textbox');

        await user.type(nameInputElem, sampleName);
        await user.type(emailInputElem, sampleValidEmail);
        await user.type(textAreaElem, sampleValidMessage);

        within(container)
          .queryAllByText('This field is required.')
          .forEach((errorElem) => expect(errorElem).not.toBeInTheDocument());

        await user.clear(nameInputElem);
        await user.clear(emailInputElem);
        await user.clear(textAreaElem);

        const errorMessageElements = within(container).getAllByText(
          'This field is required.',
        );

        errorMessageElements.forEach((errorElem) =>
          expect(errorElem).toBeInTheDocument(),
        );
        expect(errorMessageElements.length).toEqual(3);
      });
      it('should show validation error for invalid email', async () => {
        const { user, container } = setup();
        const [nameInputElem, emailInputElem] =
          within(container).getAllByRole('textbox');

        expect(emailInputElem).toBeInTheDocument();

        await user.type(emailInputElem, 'not-an-email');
        await user.click(nameInputElem);

        expect(
          within(container).getByText('Please enter a valid email address.'),
        ).toBeInTheDocument();

        await user.type(emailInputElem, sampleValidEmail);
        await user.click(nameInputElem);

        expect(
          within(container).queryByText('Please enter a valid email address.'),
        ).not.toBeInTheDocument();
      });
      it('should show validation error when the message is shorter than 10 chars', async () => {
        const { user, container } = setup();
        const [nameInputElem, _, textAreaElem] =
          within(container).getAllByRole('textbox');

        await user.type(textAreaElem, 'a'.repeat(9));
        await user.click(nameInputElem);

        expect(
          within(container).getByText('Your message is too short.'),
        ).toBeInTheDocument();

        await user.type(textAreaElem, sampleValidMessage);
        await user.click(nameInputElem);

        expect(
          within(container).queryByText('Your message is too short.'),
        ).not.toBeInTheDocument();
      });
      it('should show validation error when the message is longer than 100 chars', async () => {
        const { user, container } = setup();
        const [nameInputElem, _, textAreaElem] =
          within(container).getAllByRole('textbox');

        await user.type(textAreaElem, 'a'.repeat(101));
        await user.click(nameInputElem);

        expect(
          within(container).getByText('Your message is too long.'),
        ).toBeInTheDocument();
      });
    });

    describe('submit button', () => {
      it('should be enabled when form is dirty and valid', async () => {
        const { user, container } = setup();
        const submitButtonElem = within(container).getByRole('button');

        expect(submitButtonElem).toBeDisabled();

        await fillValidForm(user, container);

        expect(submitButtonElem).toBeEnabled();
      });
      it('should be disabled and change text content from "Submit" to "Sending..." when form is being submitted', async () => {
        const { user, container } = setup();
        const submitButtonElem = within(container).getByRole('button');

        expect(submitButtonElem).toBeDisabled();
        expect(submitButtonElem).toHaveTextContent('Submit');

        await fillValidForm(user, container);

        expect(submitButtonElem).toBeEnabled();
        await user.click(submitButtonElem);

        expect(submitButtonElem).toBeDisabled();
        expect(submitButtonElem).toHaveTextContent('Sending...');
      });
    });

    describe('alert', () => {
      it('should show success alert with correct text content and classes applied when response is ok', async () => {
        const { user, container } = setup();
        const submitButtonElem = within(container).getByRole('button');

        await fillValidForm(user, container);

        fetchMock.mockResolvedValueOnce({ ok: true, status: 200 } as any);

        await user.click(submitButtonElem);

        const alertElem = await within(container).findByRole('alert');
        expect(alertElem).toBeInTheDocument();
        expect(alertElem).toHaveTextContent(
          `Dear ${sampleName}, your message is sent!`,
        );
        expect(alertElem).toHaveClass('alert');
        expect(alertElem).toHaveClass(AlertTypes.SUCCESS);
      });
      it('should show error alert with correct text content and classes applied when response is NOT ok', async () => {
        const { user, container } = setup();
        const submitButtonElem = within(container).getByRole('button');

        await fillValidForm(user, container);

        fetchMock.mockResolvedValueOnce({ ok: false, status: 500 } as any);

        await user.click(submitButtonElem);

        const alertElem = await within(container).findByRole('alert');
        expect(alertElem).toBeInTheDocument();
        expect(alertElem).toHaveTextContent(
          'Something went wrong. Please try again.',
        );
        expect(alertElem).toHaveClass('alert');
        expect(alertElem).toHaveClass(AlertTypes.ERROR);
      });
      it('should show error alert when fetch throws', async () => {
        const { user, container } = setup();
        const submitButtonElem = within(container).getByRole('button');
        const sampleErrorMessage = 'Network is down.';

        await fillValidForm(user, container);

        fetchMock.mockRejectedValueOnce(new Error(sampleErrorMessage));

        await user.click(submitButtonElem);

        const alertElem = await within(container).findByRole('alert');
        expect(alertElem).toBeInTheDocument();
        expect(alertElem).toHaveClass('alert');
        expect(alertElem).toHaveClass(AlertTypes.ERROR);
        expect(alertElem).toHaveTextContent(
          `Failed to submit form. Error: ${sampleErrorMessage}`,
        );
      });
    });

    it('should call fetch function with correct data', async () => {
      const { user, container } = setup();
      const submitButtonElem = within(container).getByRole('button');

      await fillValidForm(user, container);

      fetchMock.mockResolvedValueOnce({ ok: true, status: 200 } as any);

      await user.click(submitButtonElem);

      expect(fetchMock).toHaveBeenCalled();
      expect(fetchMock).toHaveBeenCalledWith(
        'https://formsubmit.co/ajax/innap85@gmail.com',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: expect.any(FormData),
        },
      );

      const [, options] = fetchMock.mock.calls[0];
      const body = options?.body as FormData;

      expect(body.get('name')).toEqual(sampleName);
      expect(body.get('email')).toEqual(sampleValidEmail);
      expect(body.get('message')).toEqual(sampleValidMessage);
    });
  });

  describe('when testing styles', () => {
    describe('contactFormClass', () => {
      describe('alert', () => {
        const alertModifier = '.alert';

        it('should have position absolute', () => {
          expect(contactFormClass).toHaveStyleRule('position', 'absolute', {
            modifier: alertModifier,
          });
        });
        it('should be correctly positioned from the top', () => {
          expect(contactFormClass).toHaveStyleRule('top', '4.5rem', {
            modifier: alertModifier,
          });
        });
        it('should be centered horizontally', () => {
          expect(contactFormClass).toHaveStyleRule('left', '50%', {
            modifier: alertModifier,
          });
          expect(contactFormClass).toHaveStyleRule(
            'transform',
            'translateX(-50%)',
            {
              modifier: alertModifier,
            },
          );
        });
        it('should render name in bold in success message', () => {
          expect(contactFormClass).toHaveStyleRule(
            'font-family',
            'Roboto-Bold',
            {
              modifier: `${alertModifier} .message-succes span`,
            },
          );
        });
      });
    });
  });
});
