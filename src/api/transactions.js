import request from '@/utils/request';
import { handleDataReceived } from '@/utils/common';

export function getTransactions(data) {
  const { offset, limit, purseName } = data;
  return request({
    url: `api/transactions`,
    method: 'get',
    params: {
      offset,
      limit,
      purseName,
    },
  }).then(handleDataReceived);
}
