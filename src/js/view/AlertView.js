import View from '../core/View';

const tag = '[AlertView]';

const AlertView = class extends View {
  _alertSort = {
    SUCCESS: 'success',
    ERROR: 'error',
    CAUTION: 'caution',
  };
  constructor() {
    super();
  }

  // 인터페이스
  showSuccessAlert = (title = '', message = '') => {
    // 에러 처리
    if (!document.querySelector('[data-modal] [data-header]')) throw `${tag} 모달이 없습니다`;
    if (document.querySelector('[data-alert-box]')) document.querySelector('[data-alert-box]').remove();
    this._makeAlertBox(this._alertSort.SUCCESS, title, message);
  };
  showErrorAlert = (title = '', message = '') => {
    // 에러 처리
    if (!document.querySelector('[data-modal] [data-header]')) throw `${tag} 모달이 없습니다`;
    if (document.querySelector('[data-alert-box]')) document.querySelector('[data-alert-box]').remove();
    this._makeAlertBox(this._alertSort.ERROR, title, message);
  };
  showCautionAlert = (title = '', message = '') => {
    // 에러 처리
    if (!document.querySelector('[data-modal] [data-header]')) throw `${tag} 모달이 없습니다`;
    if (document.querySelector('[data-alert-box]')) document.querySelector('[data-alert-box]').remove();
    this._makeAlertBox(this._alertSort.CAUTION, title, message);
  };

  // 메서드

  // alertBox 생성
  _makeAlertBox = (sort, title, message) => {
    const alertBoxEl = this._addAlertBoxElement();
    let html;
    switch (true) {
      case sort === this._alertSort.SUCCESS:
      case sort === this._alertSort.ERROR:
      case sort === this._alertSort.CAUTION:
        html = this._getHtml(sort, title, message);
        alertBoxEl.innerHTML = html;
        break;
      default:
        throw `${tag} alert 생성에 실패했습니다`;
    }
  };
  // 이벤트 바인딩
  _bindEvents = () => {};

  // alertBox 엘리먼트 추가
  _addAlertBoxElement = () => {
    const alertBoxEl = document.createElement('div');
    alertBoxEl.setAttribute('class', 'alert-box');
    alertBoxEl.setAttribute('data-alert-box', '');

    document.querySelector('[data-modal] [data-header]').append(alertBoxEl);
    // 추가한 엘리먼트 반환
    return alertBoxEl;
  };

  // alertBox html 생성
  _getHtml = (sort, title, message) => {
    return `<div class="alert-box__contents alert-box__contents--${sort}">
          <div class="icon icon-${sort} alert-box__icon"></div>
          <div class="alert-box__body">
            <span class="alert-box__title">${title}</span>
            <p class="alert-box__description">${message}</p>
          </div>
          <button class="icon-btn icon-btn-times alert-box__close-btn"></button>
        </div>`;
  };
};

export default AlertView;
