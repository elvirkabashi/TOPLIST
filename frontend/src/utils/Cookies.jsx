import Cookies from 'js-cookie';

export const getAuthToken = () => {
  const cookieToken = Cookies.get('jwt');
  if (cookieToken) {
    return cookieToken;
  }

  return null;
};
