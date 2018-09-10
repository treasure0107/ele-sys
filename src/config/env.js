/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl;
if (process.env.NODE_ENV == 'development') {
  // baseUrl = 'localhost:8080/';
  // baseUrl = 'http://adminapi.gfc.1903.love/api/';
  baseUrl = 'http://admin.bihe.1903.love/api/';   //开发
  // baseUrl = 'http://192.168.3.169:5000/api/';   //开发
  // baseUrl = 'http://192.168.3.170:5000/api/';   //本地
} else if (process.env.NODE_ENV == 'production') {
  // baseUrl = 'http://adminapi.gfc.1903.love/api/';
  baseUrl = 'http://admin.bihe.1903.love/api/';    //开发
  // baseUrl = 'http://192.168.3.170:5000/api/';   //本地
}
export {
  baseUrl,
  routerMode,
  imgBaseUrl
}
