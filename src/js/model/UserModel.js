import Model from '../core/Model';

import CookieUtils from '../utils/CookieUtils';

const tag = '[UserModel]';

const UserModel = class extends Model {
  constructor() {
    super();

    this._cookieUtils = new CookieUtils();
  }
  // 에러 코드
  errorCode = {
    EMAIL_IS_EMPTY: 1,
    PASSWORD_IS_EMPTY: 2,
    FROM_SERVER: 3,
    NOT_LOGGED: 4,
  };
  // 플랫폼 코드
  _platform = {
    CLIMBMATE: 1,
    KAKAO: 2,
  };
  // 중복 실행 방지
  _isWorking = false;

  // 인터페이스

  // 현재 로그인 상태 체크
  checkState = () => {
    if (this._cookieUtils.getCookie('accessToken')) return true;
    else return false;
  };
  // 액세스 토큰 가져오기
  getAccessToken = () => this._cookieUtils.getCookie('accessToken');
  // 유저 정보 가져오기
  getUserInfo = async () => {
    if (this._isWorking) return;
    if (!this.getAccessToken())
      return {
        isSuccess: false,
        body: {},
        message: '로그인 상태가 아닙니다, 다시 로그인 해주세요',
        errorCode: this.errorCode.NOT_LOGGED,
      };
    this._isWorking = true;

    const reqData = {
      reqCode: 502,
      reqBody: {
        accessKey: this.getAccessToken(),
      },
    };

    const { resBody, resCode, resErr } = await this.postRequest(this._hosts.SERVER, this._paths.SERVER_MAIN, reqData);
    this._isWorking = false;

    if (resCode == 200) {
      // 로그인 성공
      const userInfoObj = resBody[0];
      console.log(userInfoObj);
      return { isSuccess: true, body: userInfoObj, message: '' };
    } else {
      console.log(tag, resErr);
      return { isSuccess: false, body: {}, message: resErr };
    }
  };
  // 이메일 로그인
  emailLogIn = async (email, password) => {
    if (this._isWorking) return;
    if (email.trim().length === 0)
      return {
        isSuccess: false,
        body: {},
        message: '이메일을 입력해주세요',
        errorCode: this.errorCode.EMAIL_IS_EMPTY,
      };
    if (password.trim().length === 0)
      return {
        isSuccess: false,
        body: {},
        message: '비밀번호를 입력해주세요',
        errorCode: this.errorCode.PASSWORD_IS_EMPTY,
      };
    this._isWorking = true;

    const reqData = {
      reqCode: 501,
      reqBody: {
        userEmail: email,
        userPassword: password,
        userPlatform: this._platform.CLIMBMATE,
      },
    };

    const { resBody, resCode, resErr } = await this.postRequest(this._hosts.SERVER, this._paths.SERVER_MAIN, reqData);
    this._isWorking = false;

    if (resCode == 200) {
      // 로그인 성공
      const accessToken = resBody[0]['accessKey'];
      this._cookieUtils.setCookie('accessToken', accessToken, { 'max-age': 36000 });
      return { isSuccess: true, body: { accessToken }, message: '' };
    } else {
      console.log(tag, resErr);
      return { isSuccess: false, body: {}, message: resErr, errorCode: this.errorCode.FROM_SERVER };
    }
  };
  // 로그아웃
  logOut = () => {
    this._cookieUtils.deleteCookie('accessToken');
    location.reload();
  };
};

export default UserModel;
