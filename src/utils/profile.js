import Cookies from 'js-cookie';
import store from '../store';

const PaymethodKey = 'Added-Paymethod';

export const getUserWMAvatar = wmid => {
  const URL_WM_AVATAR =
    'https://events.webmoney.ru/open/avatar.aspx?t=Url&s=Large&w=';

  return wmid && `${URL_WM_AVATAR}${wmid}`;
};

export function setLastAddedPaymethod(paymethod) {
  return Cookies.set(PaymethodKey, paymethod);
}

export function getLastAddedPaymethod() {
  return Cookies.get(PaymethodKey);
}

export function removeLastAddedPaymethod() {
  return Cookies.remove(PaymethodKey);
}

export function getCategories(id) {
  return store.state.dictionary.categories.find(x => x.Id === id);
}
