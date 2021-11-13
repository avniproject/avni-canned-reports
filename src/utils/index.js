export const getQueryString = (obj) => Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
