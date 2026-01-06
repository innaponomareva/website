import { useLocation } from 'react-router';

export enum Pages {
  ABOUT = 'about',
  CONTACT = 'contact',
  START = 'start',
  NOT_FOUND = 'not-found',
}

export enum RouteTypes {
  ABOUT = '/about',
  CONTACT = '/contact',
  START = '/',
  NOT_FOUND = '/not-found',
}

const usePage = () => {
  const location = useLocation();

  return {
    isAboutPage: location.pathname === RouteTypes.ABOUT,
    isContactPage: location.pathname === RouteTypes.CONTACT,
    isStartPage: location.pathname === RouteTypes.START,
    isNotFoundPage: location.pathname === RouteTypes.NOT_FOUND,
  };
};

export default usePage;
