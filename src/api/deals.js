import request from '@/utils/request';
import { handleDataReceived } from '@/utils/common';

export function getCommission(amount) {
  return request({
    url: 'api/Commission',
    method: 'get',
    params: { amount },
  }).then(handleDataReceived);
}

export function createDeal(data) {
  return request({
    url: 'api/Contracts',
    method: 'post',
    data,
  }).then(handleDataReceived);
}
