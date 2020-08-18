import request from '@/utils/request';
import { handleDataReceived } from '@/utils/common';

export function getInfo() {
  return request({
    url: 'api/Profile',
    method: 'get',
  }).then(handleDataReceived);
}

export function getPassportDataLink() {
  return request({
    url: 'api/profile/GetAddPassportDataLink',
    method: 'get',
  }).then(handleDataReceived);
}

export function addNewPaymethod(data) {
  return request({
    url: 'api/profile/AddPurse',
    method: 'post',
    data,
  }).then(handleDataReceived);
}

export function removePaymethod(id) {
  return request({
    url: 'api/profile/RemovePurse',
    method: 'get',
    params: { id },
  }).then(handleDataReceived);
}
