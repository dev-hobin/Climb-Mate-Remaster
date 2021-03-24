import View from '../core/View';

const tag = '[ModalView]';

const ModalView = class extends View {
  modalSort = {
    LOG_IN: 'logIn',
    SIGN_UP: 'signUp',
    QUESTION: 'question',
  };
  constructor() {
    super();
  }

  // 인터페이스

  setup = element => {
    this.init(element);
    console.log(tag, 'setup()');
    return this;
  };
  showModal = sort => {
    if (this._element.querySelector('[data-modal]')) {
      // 모달이 이미 있으면 안에 있는 내용만 변경
      this._changeContents(sort);
    } else {
      // 모달이 없으면 모달 생성
      this._makeModal(sort);
    }
    // 모달 종류에 따라 배경 클릭 이벤트 설정 (배경 눌렀을 때 모달 닫히게 할건지 안할건지)
    this._setBackgroundEvent(sort);
  };

  // 메서드

  // 이벤트 바인딩
  _bindEvents = () => {};

  // 모달 생성
  _makeModal = sort => {
    console.log(sort, '모달 생성');
  };
  // 모달 컨텐츠 변경
  _changeContents = sort => {
    console.log(sort, '모달 컨텐츠 변경');
  };
  // 배경 클릭 이벤트 설정
  _setBackgroundEvent = sort => {
    console.log(sort, '배경 클릭 이벤트');
  };
};

export default ModalView;
