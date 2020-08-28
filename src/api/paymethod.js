import request from '@/utils/request';

export function fetchCardInfo(firstSixLetters) {
  return request({
    url: `api/cardinfo`,
    method: 'get',
    params: { firstSixLetters },
  });
}
