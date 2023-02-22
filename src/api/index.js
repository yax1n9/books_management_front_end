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

/**
 * 修改图书
 * @param params
 * @returns {*}
 */
export const modifyBook = (params) => {
  return service({
    url: '/books',
    method: 'put',
    data: params
  })
}

/**
 * 新增图书
 * @param params
 * @returns {*}
 */
export const insertBook = (params) => {
  return service({
    url: '/books',
    method: 'post',
    data: params
  })
}

/**
 * 删除图书
 * @param bookId
 * @returns {*}
 */
export const removeBook = (bookId) => {
  return service({
    url: `/books/${bookId}`,
    method: 'delete'
  })
}

/**
 * 查询借阅记录
 * @param params
 * @returns {*}
 */
export const getBorrowLog = (params) => {
  return service({
    url: `/borrowLogs/${params.currentPage}/${params.pageSize}`,
    method: 'get',
    params: params.borrowLog
  })
}

/**
 * 新增借阅记录
 * @param params
 * @returns {*}
 */
export const insertBorrowLog = (params) => {
  return service({
    url: '/borrowLogs',
    method: 'post',
    data: params
  })
}

export const modifyBorrowLog = (params) => {
  return service({
    url: '/borrowLogs',
    method: 'put',
    data: params
  })
}


/**
 * 查询用户列表页
 * @param params
 * @returns {*}
 */
export const getUserPage = (params) => {
  return service({
    url: `/users/${params.currentPage}/${params.pageSize}`,
    method: 'get',
    params: params.user
  })
}


/**
 * 修改用户
 * @param params
 * @returns {*}
 */
export const modifyUser = (params) => {
  return service({
    url: `/users`,
    method: 'put',
    data: params
  })
}

export const getDepartmentList = () => {
  return service({
    url: '/departments',
    methods: 'get'
  })
}

export const getEducationList = () => {
  return service({
    url: '/educations',
    method: 'get'
  })
}

export const getPositionList = () => {
  return service({
    url: '/positions',
    method: 'get'
  })
}

export const getMajorList = () => {
  return service({
    url: '/majors',
    method: 'get'
  })
}

export const getProfessionalTitleList = () => {
  return service({
    url: '/professionalTitles',
    method: 'get'
  })
}

