import request from '@/utils/request';
import { handleDataReceived } from '@/utils/common';

export function getCommission(amount) {
  return request({
    url: 'api/Commission',
    method: 'get',
    params: { amount },
  }).then(handleDataReceived);
}

export function getContracts(data) {
  const { offset, limit } = data;
  return request({
    url: 'api/Contracts',
    method: 'get',
    params: { offset, limit },
  }).then(handleDataReceived);
}

export function getContract(id) {
  return request({
    url: `api/Contracts/${id}`,
    method: 'get',
  }).then(handleDataReceived);
}

export function getContractExtended(id) {
  return request({
    url: `api/Contracts/${id}/extended`,
    method: 'get',
  }).then(handleDataReceived);
}

export function createDeal(data) {
  return request({
    url: 'api/Contracts',
    method: 'post',
    data,
  }).then(handleDataReceived);
}
