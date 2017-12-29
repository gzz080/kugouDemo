const prod=false;
const proxy=prod?'http://m.kugou.com':'/proxy';
const aproxy=prod?'http://mobilecdn.kugou.com':'/aproxy';
const bproxy=prod?'http://www.kugou.com':'/bproxy';
export {proxy,aproxy,bproxy}