import { css } from '@linaria/core';
import Background from '../components/Background/Background';
import PageHeadline from '../components/PageHeadline';
import Layout from '../components/Layout';
import Header from '../components/Header';

const NotFound = () => {
  return (
    <Background className={notFoundClass}>
      <Header />
      <Layout className="layout">
        <PageHeadline className="headline">Page is not found</PageHeadline>
      </Layout>
    </Background>
  );
};

export default NotFound;

const notFoundClass = css`
  .layout {
    height: 100vh;
    grid-template-columns: minmax(auto, 900px);
  }
`;
