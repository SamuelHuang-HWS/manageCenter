import axios from '../utils/axios'

function request (functionId, body) {
  let data = {
    functionId,
    body
  }
  return axios.request({
    data: data,
    method: 'post'
  })
}
//文章-查询文章详情
export function queryArticleById (body) {
  return request('health_cmp_queryArticleById', body);
}
//文章-获取标签(type: 1：文章 4：疾病)
export function queryLabels (body) {
  return request('health_cmp_queryLabels', body);
}
//文章-获取疾病
export function queryDiseases (body) {
  return request('health_cmp_queryDiseases', body);
}
//文章-获取渠道
export function queryBusinesses (body) {
  return request('health_cmp_queryBusinesses', body);
}
//文章-添加或者更新文章
export function addOrUpdateArticle (body) {
  return request('health_cmp_addOrUpdateArticle', body);
}
//文章-添加或者更新文章
export function queryCountOfStatus (body) {
  return request('health_cmp_queryCountOfStatus', body);
}
//文章-查询文章列表
export function queryArticles (body) {
  return request('health_cmp_queryArticles', body);
}
//文章-查询文章列表
export function deleteArticle (body) {
  return request('health_cmp_deleteArticle', body);
}
//文章-查询文章列表
export function previewArticle (body) {
  return request('health_cmp_previewArticle', body);
}
//文章-查询文章列表
export function queryOriginalAuthor (body) {
  return request('health_cmp_queryOriginalAuthor', body);
}
//文章-查询文章列表
export function passArticle (body) {
  return request('health_cmp_passArticle', body);
}
//文章-查询文章列表
export function rejectArticle (body) {
  return request('health_cmp_rejectArticle', body);
}
//文章-查询文章列表
export function queryUserWriterInfo (body) {
  return request('health_cmp_queryUserWriterInfo', body);
}
//文章-驳回
export function offlineArticle (body) {
  return request('health_cmp_offlineArticle', body);
}

//视频-获取地址
export function getVodUploadUrl (body) {
  return request('health_cmp_getVodUploadUrl', body);
}

//视频-获取地址
export function deleteUploadedVod (body) {
  return request('health_cmp_deleteUploadedVod', body);
}


