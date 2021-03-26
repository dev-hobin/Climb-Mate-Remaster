import View from '../core/View';

const tag = '[ModalView]';

const ModalView = class extends View {
  _modalSort = {
    LOG_IN: 'logIn',
    SIGN_UP: 'signUp',
    QUESTION: 'question',
    AGREEMENT: 'agreement',
    USER_REGISTER: 'user-register',
  };
  constructor() {
    super();
  }

  // 인터페이스

  setup = element => {
    this.init(element);
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

  // 모달 생성
  _makeModal = sort => {
    const modalEl = this._addModalElement();
    let html;
    switch (true) {
      case sort === this._modalSort.LOG_IN:
        html = this._getLogInHtml();
        modalEl.innerHTML = html;
        break;

      case sort === this._modalSort.SIGN_UP:
        html = this._getSignUpHtml();
        modalEl.innerHTML = html;
        break;

      case sort === this._modalSort.QUESTION:
        html = this._getQuestionHtml();
        modalEl.innerHTML = html;
        break;
      case sort === this._modalSort.AGREEMENT:
        html = this._getAgreementHtml();
        modalEl.innerHTML = html;
        break;
      case sort === this._modalSort.USER_REGISTER:
        html = this._getRegisterUserInfoHtml();
        modalEl.innerHTML = html;
        break;

      default:
        throw `${tag} 모달 생성에 실패했습니다`;
    }
  };
  // 모달 컨텐츠 변경
  _changeContents = sort => {
    console.log(sort, '모달 컨텐츠 변경');
  };
  // 배경 클릭 이벤트 설정
  _setBackgroundEvent = sort => {
    console.log(sort, '배경 클릭 이벤트');
  };
  // 이벤트 바인딩
  _bindEvents = () => {};
  // 모달 엘리먼트 추가
  _addModalElement = () => {
    // 모달 엘리먼트 생성
    const modalEl = document.createElement('div');
    modalEl.setAttribute('class', 'modal');
    modalEl.setAttribute('data-modal', '');
    // 모달 엘리먼트 <main> 태그 안에 추가
    this._element.append(modalEl);
    // 추가한 모달 엘리먼트 반환
    return modalEl;
  };

  // 로그인 모달 html 생성
  _getLogInHtml = () => {
    return `<div class="modal__contents" data-contents="logIn">
        <header class="modal__header">
          <span class="modal__title">로그인</span>
          <button class="icon-btn icon-btn-times modal__close-btn"></button>
        </header>
        <div class="modal__body">
          <button class="kakao-btn modal__kakao-btn">
            <img src="assets/icon/kakao/kakao-symbol.png" alt="카카오 심볼" class="kakao-btn__symbol-img" />
            <span class="kakao-btn__text">카카오 로그인</span>
          </button>
          <div class="horizontal-line modal__line">
            <div class="horizontal-line__line"></div>
            <span class="horizontal-line__text">또는</span>
          </div>
          <div class="margin-bottom-container">
            <div class="input-box">
              <div class="icon icon-email input-box__icon"></div>
              <input type="email" class="input-box__input" placeholder="이메일을 입력해주세요" />
            </div>
          </div>
          <div class="input-box modal__input-box--has-content">
            <div class="icon icon-password input-box__icon"></div>
            <input type="password" class="input-box__input" placeholder="비밀번호를 입력해주세요" />
          </div>
          <div class="flex-end-container modal__btn-container">
            <button class="modal__sub-btn">비밀번호 찾기</button>
          </div>
          <div class="flex-full-container">
            <button class="modal__main-btn">로그인</button>
          </div>
        </div>
        <footer class="modal__footer">
          <div class="flex-container">
            <p class="modal__footer-text">Climb:Mate 계정이 없으신가요?</p>
            <button class="modal__sub-btn">회원가입</button>
          </div>
        </footer>
      </div>`;
  };
  // 회원가입 모달 html 생성
  _getSignUpHtml = () => {
    return `<div class="modal__contents" data-contents="signUp">
        <header class="modal__header">
          <span class="modal__title">회원 가입</span>
          <button class="icon-btn icon-btn-times modal__close-btn"></button>
        </header>
        <div class="modal__body">
          <button class="kakao-btn modal__kakao-btn">
            <img src="assets/icon/kakao/kakao-symbol.png" alt="카카오 심볼" class="kakao-btn__symbol-img" />
            <span class="kakao-btn__text">카카오로 회원가입</span>
          </button>
          <div class="horizontal-line modal__line">
            <div class="horizontal-line__line"></div>
            <span class="horizontal-line__text">또는</span>
          </div>
          <div class="flex-full-container">
            <button class="modal__main-btn">이메일로 회원가입</button>
          </div>
        </div>
        <footer class="modal__footer">
          <div class="flex-container">
            <p class="modal__footer-text">이미 Climb:Mate 계정이 있나요?</p>
            <button class="modal__sub-btn">로그인</button>
          </div>
        </footer>
      </div>`;
  };
  // 문의하기 모달 html 생성
  _getQuestionHtml = () => {
    return `<div class="modal__contents" data-contents="question">
        <header class="modal__header">
          <span class="modal__title">문의하기</span>
          <button class="icon-btn icon-btn-times modal__close-btn"></button>
        </header>
        <div class="modal__body">
          <div class="modal__content-title">문의 내용</div>
          <textarea
            class="modal__content-question-text-box"
            placeholder="서비스 이용 중 궁금한 내용이나 불편한 사항 또는 추가되었으면 하는 기능 등, 문의할 내용을 자유롭게 적어주세요"
          ></textarea>
          <div class="modal__content-title">연락처</div>
          <div class="input-box modal__input-box modal__input-box--has-content">
            <div class="icon icon-phone input-box__icon"></div>
            <input type="text" class="input-box__input" placeholder="답변받을 연락처를 입력해주세요" />
          </div>
          <div class="margin-bottom-container">
            <p class="modal__content-sub-text">이메일, 휴대폰 번호 등 연락 받으실 연락처를 적어주세요.</p>
            <p class="modal__content-sub-text modal__content-sub-text--red">
              연락처를 적지 않을 시 답변을 받으실 수 없습니다.
            </p>
          </div>
          <div class="flex-full-container">
            <button class="modal__main-btn">문의하기</button>
          </div>
        </div>
      </div>`;
  };
  // 약관동의 모달 html 생성
  _getAgreementHtml = () => {
    return `<div class="modal__contents" data-contents="agreement">
        <header class="modal__header">
          <span class="modal__title">회원가입</span>
          <button class="icon-btn icon-btn-times modal__close-btn"></button>
        </header>
        <div class="modal__body">
          <ol class="modal__agreement-list modal__block-container">
            <li class="modal__agreement-item">
              <label for="agreement-private" class="modal__agreement-label">
                <div class="flex-container">
                  <span class="modal__agreement-text-icon">[필수]</span>
                  <a href="#" class="modal__agreement-link" target="_blank">개인정보 수집 및 이용 동의</a>
                </div>
                <div class="flex-center-container">
                  <input
                    type="checkbox"
                    id="agreement-private"
                    name="agreement"
                    value="private"
                    class="checkbox-input"
                  />
                  <span class="checkbox-icon"></span>
                </div>
              </label>
            </li>
            <li class="modal__agreement-item">
              <label for="agreement-use" class="modal__agreement-label">
                <div class="flex-container">
                  <span class="modal__agreement-text-icon">[필수]</span>
                  <a href="#" class="modal__agreement-link" target="_blank">이용 약관 동의</a>
                </div>
                <div class="flex-center-container">
                  <input type="checkbox" id="agreement-use" name="agreement" value="use" class="checkbox-input" />
                  <span class="checkbox-icon"></span>
                </div>
              </label>
            </li>
          </ol>
          <div class="flex-end-container margin-container">
            <label for="agreement-all" class="modal__agreement-label modal__agreement-label--left">
              <div class="flex-center-container">
                <input type="checkbox" id="agreement-all" name="agreement" value="all" class="checkbox-input" />
                <span class="checkbox-icon checkbox-icon--left"></span>
              </div>
              <div class="flex-container">
                <span class="modal__agreement-text">모두 동의</span>
              </div>
            </label>
          </div>
          <div class="flex-full-container">
            <button class="modal__main-btn">다음</button>
          </div>
        </div>
      </div>`;
  };
  // 회원 정보 등록 모달 html 생성
  _getRegisterUserInfoHtml = () => {
    return `<div class="modal__contents" data-contents="user-register">
        <header class="modal__header">
          <span class="modal__title">회원정보 등록</span>
          <button class="icon-btn icon-btn-times modal__close-btn"></button>
        </header>
        <div class="modal__body">
          <div class="margin-bottom-container">
            <div class="flex-container">
              <div class="input-box modal__input-box modal__input-box--has-sibling-btn">
                <div class="icon icon-email input-box__icon"></div>
                <input type="email" class="input-box__input" placeholder="이메일 주소" />
              </div>
              <button class="modal__secondary-btn modal__send-email-btn">인증메일 전송</button>
            </div>
            <div class="modal__info-text modal__info-text--error">이메일 형식이 올바르지 않습니다</div>
          </div>
          <div class="margin-bottom-container">
            <div class="input-box modal__input-box disabled">
              <div class="icon icon-check-square input-box__icon"></div>
              <input type="text" class="input-box__input" placeholder="인증번호" disabled />
            </div>
          </div>
          <div class="margin-bottom-container">
            <div class="input-box modal__input-box">
              <div class="icon icon-user input-box__icon"></div>
              <input type="text" class="input-box__input" placeholder="닉네임" />
            </div>
          </div>
          <div class="margin-bottom-container">
            <div class="input-box modal__input-box">
              <div class="icon icon-password input-box__icon"></div>
              <input type="password" class="input-box__input" placeholder="비밀번호" />
            </div>
          </div>
          <div class="margin-bottom-container">
            <div class="input-box modal__input-box">
              <div class="icon icon-password input-box__icon"></div>
              <input type="password" class="input-box__input" placeholder="비밀번호 확인" />
            </div>
          </div>
          <div class="flex-full-container">
            <button class="modal__main-btn">회원가입</button>
          </div>
        </div>
      </div>`;
  };
};

export default ModalView;
