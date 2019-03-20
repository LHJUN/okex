import request from '@/utils/request'


export function getNameList() {
  return request({
    url: '/api/babyName/list',
    method: 'get'
  })
}

export function getNameListByPage({ pageIndex, pageSize }) {
  return request({
    url: `/api/babyName/page/${pageIndex}?size=${pageSize}`,
    method: 'get'
  })
}

export function findAllByNameLike(nameContains) {
  return request({
    url: `/api/babyname/search?nameContains=${nameContains}`,
    method: 'get'
  })
}
