import { css, cx } from '@linaria/core';
import TextInput from './TextInput';
import Button from '../Button';
import { mediaMin } from '../../utils/css';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Alert, { AlertTypes } from '../Alert';
import { useState, type JSX } from 'react';
import TextArea from './TextArea';

interface ContactFormProps {
  className?: string;
}

type Inputs = {
  name: string;
  email: string;
  message: string;
};

type AlertState = {
  type: AlertTypes;
  message: React.ReactNode;
};

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [alertState, setAlertState] = useState<AlertState | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, touchedFields, isDirty, isValid },
  } = useForm<Inputs>({
    shouldFocusError: false,
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setAlertState(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value),
      );

      const response = await fetch(
        'https://formsubmit.co/ajax/innap85@gmail.com',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        },
      );

      if (!response.ok) {
        setAlertState({
          type: AlertTypes.ERROR,
          message: (
            <p className="message-error">
              {'Something went wrong. Please try again.'}
            </p>
          ),
        });
        return;
      }

      setAlertState({
        type: AlertTypes.SUCCESS,
        message: (
          <p className="message-succes">
            Dear <span>{data.name}</span>, your message is sent!
          </p>
        ),
      });
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setAlertState({
        type: AlertTypes.ERROR,
        message: (
          <p className="message-error">{`Failed to submit form. Error: ${message}`}</p>
        ),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cx(contactFormClass, className)}
    >
      <Alert
        className="alert"
        type={alertState?.type}
        message={alertState?.message}
        open={!!alertState}
        hide={() => setAlertState(null)}
      />

      <div className="contact-info">
        <TextInput
          id="name"
          label="name"
          helperText="your name"
          {...register('name', { required: 'This field is required.' })}
          error={touchedFields.name ? errors.name?.message : ''}
        />
        <TextInput
          id="email"
          label="email"
          helperText="example@mail.com"
          {...register('email', {
            required: 'This field is required.',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: 'Please enter a valid email address.',
            },
          })}
          error={touchedFields.email ? errors.email?.message : ''}
        />
      </div>
      <TextArea
        id="message"
        label="message"
        helperText="your message"
        {...register('message', {
          required: 'This field is required.',
          minLength: { value: 10, message: 'Your message is too short.' },
          maxLength: { value: 100, message: 'Your message is too long.' },
        })}
        error={touchedFields.message ? errors.message?.message : ''}
      />
      <Button
        className="submit-btn"
        type="submit"
        hasBorder
        disabled={!isDirty || !isValid || isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Submit'}
      </Button>
    </form>
  );
};

export default ContactForm;

export const contactFormClass = css`
  .alert {
    position: absolute;
    top: 4.5rem;
    left: 50%;
    transform: translateX(-50%);

    .message-succes span {
      font-family: Roboto-Bold;
    }
  }

  .contact-info {
    display: grid;
  }

  .submit-btn {
    margin: 0 0 0 auto;
  }

  ${mediaMin.sm} {
    .contact-info {
      grid-template-columns: repeat(2, 1fr);
      column-gap: 1rem;
    }
  }
`;
