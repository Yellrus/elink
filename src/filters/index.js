import dayjs from 'dayjs';

import { getCategories } from '@/utils/profile';

/**
 * @param {String} date
 */
export function formatDateOnlyYear(date) {
  if (!date) {
    return null;
  }

  return dayjs(date).format('YYYY');
}

/**
 * @param {String} date
 */
export function humansDateFormat(date) {
  if (!date) {
    return null;
  }

  return dayjs(date).format('D MMMM YYYY');
}


/**
 * @param {String} date
 */
export function formatDateDayMonth(date) {
  if (!date) {
    return null;
  }

  return dayjs(date).format('D MMM');
}

/**
 * @param {String} date
 */
export function formatDateYear(date) {
  if (!date) {
    return null;
  }

  let currentYear = dayjs(new Date()).format('YYYY');
  let getYear = dayjs(date).format('YYYY');

  return currentYear === getYear
    ? dayjs(date).format('HH:mm')
    : dayjs(date).format('YYYY');
}

/**
 * @param {String} date
 */
export function relativeDateFromNow(date) {
  if (!date) {
    return null;
  }

  return dayjs(date).fromNow();
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Upper case first char
 * @param {number} id
 */
export function getCategoryName(id) {
  if (!id) return;

  return getCategories(id).Name;
}

/**
 * 10000 => "10.000,00"
 * @param {number} value
 */

export const toThousandFilter = (value) => {
  let val = (+value || 0).toFixed(2).replace('.', ',');
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
