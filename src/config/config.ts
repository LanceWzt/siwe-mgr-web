const devBaseURL = 'http://127.0.0.1:8080';
const prodBaseURL = 'http://www.baidu.com';

export const BASEURL = process.env.NODE_ENV === 'development' ? devBaseURL : prodBaseURL;

export const TIMEOUT = 5000;

export const IconFontCnURL = '//at.alicdn.com/t/c/font_4100155_spvzybzikm.js';
