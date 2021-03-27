import View from '../core/View';

const tag = '[TopMenuView]';

const TopMenuView = class extends View {
  constructor() {
    super();
  }

  /* 인터페이스 */
  setup = element => {
    this.init(element);

    this._toggleBtn = element.querySelector('[data-toggle-btn]');
    this._userImg = element.querySelector('[data-user-img]');
    this._list = element.querySelector('[data-menu-list]');

    return this;
  };
  // 프로필 이미지 세팅
  setProfileImg = imgUrl => this._userImg.setAttribute('src', imgUrl);

  /* 메서드 */

  // 로그인 여부에 따라 메뉴 세팅 (프로필 이미지가 있다면 로그인 상태)
  setMenu = isLogged => {
    // 필요없는 메뉴 리스트 제거
    if (isLogged) {
      this._list.querySelector('[data-menu-item=logIn]').remove();
      this._list.querySelector('[data-menu-item=signUp]').remove();
    } else {
      this._list.querySelector('[data-menu-item=mypage]').remove();
      this._list.querySelector('[data-menu-item=follow]').remove();
      this._list.querySelector('[data-menu-item=logOut]').remove();
    }
    this._bindMenuEvents();
  };
  // 이벤트 바인딩
  _bindMenuEvents = () => {
    // 메뉴 아이템들
    const menuItems = this._list.querySelectorAll('[data-menu-item]');
    menuItems.forEach(menu => {
      if (menu.dataset.menuItem !== 'follow' && menu.dataset.menuItem !== 'mypage') {
        menu.addEventListener('click', event => this._onMenuClick(event));
      }
    });
    // 메뉴 토글 버튼
    this._toggleBtn.addEventListener('click', this._toggleList);
  };
  // 메뉴 눌렀을 때 어떤 메뉴 눌렀는지 컨트롤러에 알리기
  _onMenuClick = event => {
    const menuName = event.currentTarget.dataset.menuItem;
    this._hideList();
    this.emit('@topMenuClick', { name: menuName });
  };
  // 토글버튼 눌렀을 때 리스트 열고 닫기
  _toggleList = () => {
    if (this._list.classList.contains('active')) this._list.classList.remove('active');
    else this._list.classList.add('active');
  };
  // 리스트 감추기
  _hideList = () => {
    this._list.classList.remove('active');
  };
};

export default TopMenuView;
