import request from '@/utils/request';
import { handleDataReceived } from '@/utils/common';

export function getInfo() {
  return request({
    url: 'api/Profile',
    method: 'get',
  }).then(handleDataReceived);
}
