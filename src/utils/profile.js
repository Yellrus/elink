export const getUserWMAvatar = wmid => {
  const URL_WM_AVATAR =
    'https://events.webmoney.ru/open/avatar.aspx?t=Url&s=Large&w=';

  return wmid && `${URL_WM_AVATAR}${wmid}`;
};
