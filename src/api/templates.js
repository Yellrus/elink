import request from '@/utils/request';
import { handleDataReceived } from '@/utils/common';

export function getTemplates() {
  return request({
    url: 'api/templates',
    method: 'get',
  }).then(handleDataReceived);
}

export function deleteTemplate(id) {
  return request({
    url: `api/templates/${id}/delete`,
    method: 'delete',
  }).then(handleDataReceived);
}
