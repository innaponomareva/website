import { css } from '@linaria/core';
import Background from '../components/Background/Background';
import Header from '../components/Header';
import ContactForm from '../components/Form/ContactForm';
import Layout from '../components/Layout';

const Contact = () => {
  return (
    <Background className={contactClass}>
      <Header />
      <Layout className="layout">
        <ContactForm />
      </Layout>
    </Background>
  );
};

export default Contact;

const contactClass = css`
  min-height: 100vh;
  min-height: 100svh;

  .layout {
    min-height: 100vh;
    min-height: 100svh;
    grid-template-columns: minmax(auto, 700px);
  }
`;
