import Model from '../core/Model';

const tag = '[UserServiceModel]';

const UserServiceModel = class extends Model {
  constructor() {
    super();
  }
  // 에러 코드
  errorCode = {
    EMPTY_TEXT_AREA: 1,
  };
  // 중복 실행 방지
  _isWorking = false;

  // 인터페이스

  // 문의하기 (로그인 안해도 상관 없음)
  sendQuestion = async (question, callInfo) => {
    if (this._isWorking) return;
    if (question.length === 0)
      return {
        isSuccess: false,
        body: {},
        message: '문의할 내용을 입력해주세요',
        errorCode: this.errorCode.EMPTY_TEXT_AREA,
      };
    this._isWorking = true;

    // todo: 문의하기 api 작성먼저 시작하면 됨
    const reqData = {};
  };
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
};

export default UserModel;
