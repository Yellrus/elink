import request from '@/utils/request';
import { handleDataReceived } from '@/utils/common';

export function getDictionary() {
  return request({
    url: 'api/Categories',
    method: 'get',
  }).then(handleDataReceived);
}
