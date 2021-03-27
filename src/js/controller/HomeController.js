import TopMenuView from '../view/TopMenuView';
import ModalView from '../view/ModalView';
import AlertView from '../view/AlertView';

import UserModel from '../model/UserModel';

const tag = '[HomeController]';

const HomeController = class {
  constructor() {
    this._topMenuView = new TopMenuView('');
    this._modalView = new ModalView();
    this._alertView = new AlertView();

    this._userModel = new UserModel();
  }

  // 인터페이스

  // 초기화
  init = () => {
    this._modalView //
      .setup(document.querySelector('main'))
      .on('@emailLogIn', event => this._emailLogIn(event.detail.email, event.detail.password));

    this._topMenuView //
      .setup(document.querySelector('[data-top-menu]'))
      .on('@topMenuClick', event => this._onTopMenuClick(event.detail.name));

    this._lifeCycle();
  };

  // 메서드

  // 라이프 사이클 (처음에 초기화 할 때 뷰 설정하고 바로 실행되는 것)
  _lifeCycle = async () => {
    const isLogged = this._userModel.getAccessToken() ? true : false;
    // 상단 메뉴 설정
    this._setTopMenu(isLogged);
  };

  // 상단 메뉴 세팅
  _setTopMenu = async isLogged => {
    // 헤더 메뉴 리스트 아이템 설정
    this._topMenuView.setMenu(isLogged);
    if (isLogged) {
      // 로그인 상태
      const { isSuccess, body, message, errorCode = 0 } = await this._userModel.getUserInfo();
      if (!isSuccess) return console.log(message);
      // 헤더 메뉴 버튼에 프로필 이미지 설정
      const profileImgUrl = body.userProfileImageUrl;
      this._topMenuView.setProfileImg(profileImgUrl);
    }
  };
  // 상단 메뉴 클릭
  _onTopMenuClick = menuName => {
    if (menuName === 'logOut') return this._userModel.logOut();
    this._modalView.showModal(menuName);
  };
  // 이메일로 로그인
  _emailLogIn = async (email, password) => {
    const response = await this._userModel.emailLogIn(email, password);
    if (!response) return;

    const { isSuccess, body, message, errorCode = null } = response;
    // 로그인 성공했다면 새로 고침
    if (isSuccess) {
      // location.reload();
      console.log(body);
    } else {
      if (errorCode === this._userModel.errorCode.EMAIL_IS_EMPTY)
        return this._alertView.showErrorAlert('로그인 실패', message);
      if (errorCode === this._userModel.errorCode.PASSWORD_IS_EMPTY)
        return this._alertView.showErrorAlert('로그인 실패', message);
      this._alertView.showErrorAlert('로그인 실패', message);
    }
  };
};

export default HomeController;
