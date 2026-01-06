import { css, cx } from '@linaria/core';
import TextInput from './TextInput';
import Button from '../Button';
import { mediaMin } from '../../utils/css';
import { useForm, type SubmitHandler } from 'react-hook-form';
import Alert, { AlertTypes } from '../Alert';
import { useState } from 'react';
import TextArea from './TextArea';

interface ContactFormProps {
  className?: string;
}

type Inputs = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      touchedFields,
      isDirty,
      isValid,
    },
  } = useForm<Inputs>({
    shouldFocusError: false,
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) =>
        formData.append(key, value)
      );

      const response = await fetch(
        'https://formsubmit.co/ajax/innap85@gmail.com',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        }
      );

      if (!response.ok) {
        setError('root', {
          message: 'Something went wrong. Please try again.',
        });
        return;
      }
      setSubmittedName(data.name);
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setError('root', { message: `Failed to submit form. Error: ${message}` });
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cx(contactFormClass, className)}
    >
      {(isSubmitSuccessful || errors.root) && (
        <Alert
          type={isSubmitSuccessful ? AlertTypes.SUCCESS : AlertTypes.ERROR}
          className="alert"
          open={true}
        >
          {isSubmitSuccessful && (
            <p className="message-succes">
              Dear <span>{submittedName}</span>, your message is sent!
            </p>
          )}
          {errors.root && (
            <p className="message-error">{errors.root.message}</p>
          )}
        </Alert>
      )}
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
