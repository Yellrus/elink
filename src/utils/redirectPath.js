import Cookies from 'js-cookie';

const RedirectPath = 'Redirect-Path';

export function getRedirectPath() {
  return Cookies.get(RedirectPath);
}

export function setRedirectPath(path) {
  return Cookies.set(RedirectPath, path);
}
