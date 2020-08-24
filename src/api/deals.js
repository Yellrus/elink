import request from '@/utils/request';
import { handleDataReceived } from '@/utils/common';

export function getDeals(data) {
  const {
    offset,
    limit,
    startDate,
    endDate,
    search,
    statuses,
    payMethod,
    contractId,
  } = data;
  return request({
    url: `api/Deals`,
    method: 'get',
    params: {
      offset,
      limit,
      startDate,
      endDate,
      search,
      statuses,
      payMethod,
      contractId,
    },
  }).then(handleDataReceived);
}

export function getDeal(id) {
  return request({
    url: `api/deals/${id}`,
    method: 'get',
  }).then(handleDataReceived);
}

export function getDealDetails(id) {
  return request({
    url: `api/deals/${id}/deal-details`,
    method: 'get',
  }).then(handleDataReceived);
}

export function getDealsStatus() {
  return request({
    url: 'api/deals/statuses',
    method: 'get',
  }).then(handleDataReceived);
}

export function getByDisputeDeal(disputeGuid) {
  return request({
    url: `api/deals/${disputeGuid}/get-by-dispute-guid`,
    method: 'get',
  }).then(handleDataReceived);
}

export function sendClaimLink({ id, email }) {
  return request({
    url: `api/deals/${id}/send-claim-link`,
    method: 'get',
    params: { email },
  }).then(handleDataReceived);
}

export function createClaim({ disputeGuid, email, message }) {
  return request({
    url: `api/deals/${disputeGuid}/create-claim`,
    method: 'get',
    params: { email, message },
  }).then(handleDataReceived);
}
