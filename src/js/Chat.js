import ChatAPI from "./api/ChatAPI";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI();
    this.websocket = null;
  }

  init() {
    this.showLoginForm = this.showLoginForm.bind(this);
    document.addEventListener('DOMContentLoaded', this.showLoginForm)

  }
  showLoginForm() {
    function createLoginForm() {
     return `<div class = 'modal__background'>
        <form class="modal__form"  novalidate>
          <div class="modal__content  ">
            <div class="modal__header  ">
              <label class = "form__label" for="login">Выберете псевдоним</label>
            </div >
            <div class="modal__body ">
              <input name="login" id="login" class="form__input" type="text" required autofocus>
            </div >
            <div class="modal__footer" >
              <button type="submit" class="modal__ok">Продолжить</button>
              <button type="reset" class="modal__close">Закрыть</button>
            </div>
          </div>
        </form>
      </div>`
    }
    const loginForm = document.createElement('form');
    this.container.appendChild(loginForm);
    loginForm.outerHTML = createLoginForm();
    const loginForm1 = document.querySelector('form.modal__form');
    loginForm1.addEventListener('submit', (e) => {
      e.preventDefault();
      // const api = new ChatAPI('http://localhost:3000');
      // const response = api.create('name');
      // const result = response.text()
      (async() => {
        const resp = await fetch('http://localhost:3000/new-user',
        {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
              },
          body: {
              name: 'имя из инпута'
            }
          }
        )
        const result = await resp.json();
      })();

     })
  }

  bindToDOM() {

  }

  registerEvents() {
    
   
  }

  subscribeOnEvents(element, event, handler) {
    element.addEventListener(event, handler)
  }

  onEnterChatHandler() { }

  sendMessage() { }

  renderMessage() { }
}
