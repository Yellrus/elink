import request from '@/utils/request';

export function fetchCardInfo(query) {
  const API_KEY = '500b979514582b182ededdbea7026daf';
  return request({
    url: `https://api.cardinfo.online?apiKey=${API_KEY}&input=${query}`,
    method: 'get',
    params: query,
  });
}
