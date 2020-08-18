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
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}
