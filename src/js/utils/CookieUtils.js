const tag = '[CookieUtils]';

const CookieUtils = class {
  constructor() {}

  // 인터페이스

  // 쿠키 설정
  setCookie = (name, value, options = {}) => {
    options = {
      path: '/',
      // 필요한 경우, 옵션 기본값을 설정할 수도 있다
      ...options,
    };
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
      updatedCookie += '; ' + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += '=' + optionValue;
      }
    }
    document.cookie = updatedCookie;
  };
  // 쿠키 가져오기
  getCookie = name => {
    // 주어진 이름의 쿠키를 반환하는데, 조건에 맞는 쿠키가 없다면 undefined를 반환
    let matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
  // 쿠키 삭제
  deleteCookie = name => {
    this.setCookie(name, '', {
      'max-age': -1,
    });
  };
};

export default CookieUtils;
