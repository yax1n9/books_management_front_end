import service from "../utils/service.js";

/**
 * 登录
 * @param params
 * @returns {*}
 */
export const login = (params) => {
  return service({
    url: '/login',
    method: 'post',
    data: params
  })
}


/**
 * 图书列表
 * @param params
 * @returns {*}
 */
export const getBooksPage = (params) => {
  return service({
    url: `/books/${params.currentPage}/${params.pageSize}`,
    method: 'get',
    params: params.book
  })
}

/**
 * 类型列表
 * @returns {*}
 */
export const getTypes = () => {
  return service({
    url: '/types',
    method: 'get'
  })
}
