import request from '@/utils/request';
import { handleDataReceived } from '@/utils/common';

export function getCommission(data) {
  const { amount, payMethod } = data;
  return request({
    url: 'api/Commission',
    method: 'get',
    params: { amount, payMethod },
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

export function closeContract(contractId) {
  return request({
    url: `api/contracts/${contractId}/close`,
    method: 'get',
  }).then(handleDataReceived);
}

export function getContractExtended(id) {
  return request({
    url: `api/Contracts/${id}/extended`,
    method: 'get',
  }).then(handleDataReceived);
}

export function createContract(data) {
  return request({
    url: 'api/Contracts',
    method: 'post',
    data,
  }).then(handleDataReceived);
}
