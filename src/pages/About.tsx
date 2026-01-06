import Background from '../components/Background/Background';
import Header from '../components/Header';
import CurriculumVitae from '../components/CurriculumVitae/CurriculumVitae';
import Layout from '../components/Layout';
import { css } from '@linaria/core';

const About = () => {
  return (
    <Background className={aboutClass}>
      <Header />
      <Layout className="layout">
        <CurriculumVitae />
      </Layout>
    </Background>
  );
};

export default About;

const aboutClass = css`
  .layout {
    grid-template-columns: minmax(auto, 900px);
  }
`;
