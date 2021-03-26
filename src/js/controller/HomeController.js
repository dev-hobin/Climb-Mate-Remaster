import ModalView from '../view/ModalView';
import TopMenuView from '../view/TopMenuView';

const tag = '[HomeController]';

const HomeController = class {
  constructor() {
    this._topMenuView = new TopMenuView('');
    this._modalView = new ModalView();
  }

  // 인터페이스
  init = () => {
    this._modalView //
      .setup(document.querySelector('main'));

    this._topMenuView //
      .setup(document.querySelector('[data-top-menu]'))
      .on('@topMenuClick', event => this._onTopMenuClick(event.detail.name));
  };

  // 메서드
  _onTopMenuClick = menuName => {
    if (menuName === 'logOut') return console.log('로그아웃');
    console.log(menuName, '모달 띄우기');
    this._modalView.showModal(menuName);
  };
};

export default HomeController;
